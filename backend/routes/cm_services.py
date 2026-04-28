"""
Crew Management — Services catalog CRUD.
Each contractor customizes their own menu of services. Jobs and visits
can optionally be tagged with a service (for color-coding, reporting,
and future quoting).

Tenant isolation via get_cm_user / require_role.
"""
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel, Field
from database import supabase
from routes.cm_auth import get_cm_user, require_role
from migrations.service_presets import get_preset, INDUSTRY_CHOICES

router = APIRouter(prefix="/cm", tags=["cm-services"])


# ---------- helpers ----------
def _assert_service_owns(service_id: str, client_id: str) -> dict:
    res = (
        supabase.table("cm_services")
        .select("*")
        .eq("id", service_id)
        .eq("client_id", client_id)
        .limit(1)
        .execute()
    )
    if not res.data:
        raise HTTPException(status_code=404, detail="Service not found")
    return res.data[0]


# ---------- models ----------
class ServiceIn(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    description: Optional[str] = None
    default_duration_hours: Optional[float] = Field(default=None, ge=0, le=240)
    default_price_cents: Optional[int] = Field(default=None, ge=0)
    color: Optional[str] = "#0d9488"
    icon: Optional[str] = None
    is_active: Optional[bool] = True
    sort_order: Optional[int] = 0


class ServiceUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    default_duration_hours: Optional[float] = Field(default=None, ge=0, le=240)
    default_price_cents: Optional[int] = Field(default=None, ge=0)
    color: Optional[str] = None
    icon: Optional[str] = None
    is_active: Optional[bool] = None
    sort_order: Optional[int] = None


# ---------- read ----------
@router.get("/services")
def list_services(
    user: dict = Depends(get_cm_user),
    include_inactive: bool = Query(False),
):
    q = (
        supabase.table("cm_services")
        .select(
            "id, name, description, default_duration_hours, default_price_cents, "
            "color, icon, is_active, sort_order, created_at"
        )
        .eq("client_id", user["client_id"])
    )
    if not include_inactive:
        q = q.eq("is_active", True)
    res = q.order("sort_order").order("name").execute()
    return {"services": res.data or []}


# ---------- write ----------
@router.post("/services")
def create_service(
    body: ServiceIn,
    user: dict = Depends(require_role("owner", "dispatcher")),
):
    payload = {
        "client_id": user["client_id"],
        **body.model_dump(exclude_none=True),
    }
    try:
        res = supabase.table("cm_services").insert(payload).execute()
    except Exception as e:
        # Unique violation on (client_id, name)
        if "duplicate key" in str(e).lower() or "unique" in str(e).lower():
            raise HTTPException(status_code=400, detail="A service with that name already exists")
        raise
    return res.data[0]


@router.patch("/services/{service_id}")
def update_service(
    service_id: str,
    body: ServiceUpdate,
    user: dict = Depends(require_role("owner", "dispatcher")),
):
    _assert_service_owns(service_id, user["client_id"])
    updates = body.model_dump(exclude_unset=True)
    if not updates:
        raise HTTPException(status_code=400, detail="No fields to update")
    try:
        res = supabase.table("cm_services").update(updates).eq("id", service_id).execute()
    except Exception as e:
        if "duplicate key" in str(e).lower() or "unique" in str(e).lower():
            raise HTTPException(status_code=400, detail="A service with that name already exists")
        raise
    return res.data[0]


@router.delete("/services/{service_id}")
def delete_service(
    service_id: str,
    hard: bool = Query(False, description="Hard delete — only allowed if nothing references it"),
    user: dict = Depends(require_role("owner")),
):
    """
    Default: soft-delete (is_active=false) to preserve history on old jobs/visits.
    Pass ?hard=true to permanently delete — only succeeds if no jobs/visits
    reference the service.
    """
    _assert_service_owns(service_id, user["client_id"])

    if not hard:
        res = (
            supabase.table("cm_services")
            .update({"is_active": False})
            .eq("id", service_id)
            .execute()
        )
        return {"ok": True, "archived": True, "service": res.data[0] if res.data else None}

    # Hard delete — check references first so we can return a friendly error
    job_ref = (
        supabase.table("cm_jobs").select("id", count="exact")
        .eq("client_id", user["client_id"]).eq("service_id", service_id).limit(1).execute()
    )
    visit_ref = (
        supabase.table("cm_visits").select("id", count="exact")
        .eq("client_id", user["client_id"]).eq("service_id", service_id).limit(1).execute()
    )
    if (job_ref.count or 0) > 0 or (visit_ref.count or 0) > 0:
        raise HTTPException(
            status_code=400,
            detail="Cannot hard-delete — this service is attached to existing jobs or visits. Archive it instead.",
        )
    supabase.table("cm_services").delete().eq("id", service_id).execute()
    return {"ok": True, "archived": False}


# ---------- seeding ----------
class SeedRequest(BaseModel):
    industry: str  # 'well_drilling' | 'septic' | 'plumbing' | 'hvac' | 'generic'


@router.post("/services/seed-defaults")
def seed_default_services(
    body: SeedRequest,
    user: dict = Depends(require_role("owner")),
):
    """
    Seed the preset catalog for a given industry. Skips names that already
    exist for this tenant (idempotent — safe to call multiple times).
    Also records the chosen industry on cm_clients for future reference.
    """
    preset = get_preset(body.industry)
    if not preset:
        raise HTTPException(status_code=400, detail=f"Unknown industry: {body.industry}")

    # Persist industry choice on the tenant
    supabase.table("cm_clients").update({"industry": body.industry}).eq(
        "id", user["client_id"]
    ).execute()

    # Which names already exist?
    existing_res = (
        supabase.table("cm_services")
        .select("name")
        .eq("client_id", user["client_id"])
        .execute()
    )
    existing_names = {r["name"] for r in (existing_res.data or [])}

    to_insert = [
        {"client_id": user["client_id"], **row}
        for row in preset
        if row["name"] not in existing_names
    ]

    created = []
    if to_insert:
        res = supabase.table("cm_services").insert(to_insert).execute()
        created = res.data or []

    return {
        "ok": True,
        "industry": body.industry,
        "created": len(created),
        "skipped": len(preset) - len(created),
        "services": created,
    }


@router.get("/services/industries")
def list_industries(_user: dict = Depends(get_cm_user)):
    """Exposes the list of seedable industry presets for the UI dropdown."""
    return {"industries": INDUSTRY_CHOICES}
