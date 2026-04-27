"""
Crew Management — CRUD routes for crews, customers, jobs, visits.
All routes require auth via get_cm_user; tenant isolation enforced.
Write operations require owner or dispatcher role.
"""
from typing import Optional
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from database import supabase
from routes.cm_auth import get_cm_user, require_role

router = APIRouter(prefix="/cm", tags=["cm-crud"])


# =============== helpers ===============
def _assert_owns(table: str, obj_id: str, client_id: str) -> dict:
    res = (
        supabase.table(table)
        .select("*")
        .eq("id", obj_id)
        .eq("client_id", client_id)
        .limit(1)
        .execute()
    )
    if not res.data:
        raise HTTPException(status_code=404, detail=f"{table} not found")
    return res.data[0]


# =============== CREWS ===============
class CrewIn(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    color: Optional[str] = "#0d9488"
    is_active: Optional[bool] = True


@router.post("/crews")
def create_crew(body: CrewIn, user: dict = Depends(require_role("owner", "dispatcher"))):
    res = (
        supabase.table("cm_crews")
        .insert({
            "client_id": user["client_id"],
            "name": body.name,
            "color": body.color or "#0d9488",
            "is_active": body.is_active if body.is_active is not None else True,
        })
        .execute()
    )
    return res.data[0]


@router.patch("/crews/{crew_id}")
def update_crew(crew_id: str, body: CrewIn, user: dict = Depends(require_role("owner", "dispatcher"))):
    _assert_owns("cm_crews", crew_id, user["client_id"])
    updates = body.model_dump(exclude_unset=True)
    res = supabase.table("cm_crews").update(updates).eq("id", crew_id).execute()
    return res.data[0]


@router.delete("/crews/{crew_id}")
def delete_crew(crew_id: str, user: dict = Depends(require_role("owner"))):
    _assert_owns("cm_crews", crew_id, user["client_id"])
    supabase.table("cm_crews").delete().eq("id", crew_id).execute()
    return {"ok": True}


# =============== CUSTOMERS ===============
class CustomerIn(BaseModel):
    full_name: str = Field(min_length=1, max_length=150)
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    notes: Optional[str] = None


@router.post("/customers")
def create_customer(body: CustomerIn, user: dict = Depends(require_role("owner", "dispatcher"))):
    res = (
        supabase.table("cm_customers")
        .insert({
            "client_id": user["client_id"],
            **body.model_dump(exclude_none=True),
        })
        .execute()
    )
    return res.data[0]


@router.patch("/customers/{cid}")
def update_customer(cid: str, body: CustomerIn, user: dict = Depends(require_role("owner", "dispatcher"))):
    _assert_owns("cm_customers", cid, user["client_id"])
    res = supabase.table("cm_customers").update(body.model_dump(exclude_unset=True)).eq("id", cid).execute()
    return res.data[0]


@router.delete("/customers/{cid}")
def delete_customer(cid: str, user: dict = Depends(require_role("owner"))):
    _assert_owns("cm_customers", cid, user["client_id"])
    # Will fail if jobs reference this customer (ON DELETE RESTRICT) — that's intentional
    try:
        supabase.table("cm_customers").delete().eq("id", cid).execute()
    except Exception:
        raise HTTPException(status_code=400, detail="Cannot delete — this customer has jobs")
    return {"ok": True}


# =============== JOBS ===============
class JobIn(BaseModel):
    customer_id: str
    title: str = Field(min_length=1, max_length=200)
    description: Optional[str] = None
    status: Optional[str] = "draft"


@router.post("/jobs")
def create_job(body: JobIn, user: dict = Depends(require_role("owner", "dispatcher"))):
    # Validate customer belongs to this tenant
    _assert_owns("cm_customers", body.customer_id, user["client_id"])
    if body.status and body.status not in {"draft", "scheduled", "in_progress", "completed", "cancelled"}:
        raise HTTPException(status_code=400, detail="Invalid status")
    res = (
        supabase.table("cm_jobs")
        .insert({
            "client_id": user["client_id"],
            "customer_id": body.customer_id,
            "title": body.title,
            "description": body.description,
            "status": body.status or "draft",
        })
        .execute()
    )
    return res.data[0]


class JobUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None


@router.patch("/jobs/{job_id}")
def update_job(job_id: str, body: JobUpdate, user: dict = Depends(require_role("owner", "dispatcher"))):
    _assert_owns("cm_jobs", job_id, user["client_id"])
    updates = body.model_dump(exclude_unset=True)
    if "status" in updates and updates["status"] not in {"draft", "scheduled", "in_progress", "completed", "cancelled"}:
        raise HTTPException(status_code=400, detail="Invalid status")
    if updates.get("status") == "completed":
        updates["completed_at"] = datetime.now(timezone.utc).isoformat()
    res = supabase.table("cm_jobs").update(updates).eq("id", job_id).execute()
    return res.data[0]


@router.delete("/jobs/{job_id}")
def delete_job(job_id: str, user: dict = Depends(require_role("owner"))):
    _assert_owns("cm_jobs", job_id, user["client_id"])
    # CASCADE will delete visits too
    supabase.table("cm_jobs").delete().eq("id", job_id).execute()
    return {"ok": True}


# =============== VISITS ===============
class VisitIn(BaseModel):
    job_id: str
    crew_id: Optional[str] = None
    title: str = Field(min_length=1, max_length=200)
    start_at: str  # ISO
    end_at: str    # ISO
    status: Optional[str] = "scheduled"
    notes_internal: Optional[str] = None
    notes_customer: Optional[str] = None


def _validate_visit_times(start_at: str, end_at: str):
    try:
        s = datetime.fromisoformat(start_at.replace("Z", "+00:00"))
        e = datetime.fromisoformat(end_at.replace("Z", "+00:00"))
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid date/time format")
    if e <= s:
        raise HTTPException(status_code=400, detail="end_at must be after start_at")


@router.post("/visits")
def create_visit(body: VisitIn, user: dict = Depends(require_role("owner", "dispatcher"))):
    _assert_owns("cm_jobs", body.job_id, user["client_id"])
    if body.crew_id:
        _assert_owns("cm_crews", body.crew_id, user["client_id"])
    _validate_visit_times(body.start_at, body.end_at)
    if body.status and body.status not in {"scheduled", "on_site", "completed", "cancelled"}:
        raise HTTPException(status_code=400, detail="Invalid status")
    payload = {
        "client_id": user["client_id"],
        "job_id": body.job_id,
        "crew_id": body.crew_id,
        "title": body.title,
        "start_at": body.start_at,
        "end_at": body.end_at,
        "status": body.status or "scheduled",
        "notes_internal": body.notes_internal,
        "notes_customer": body.notes_customer,
    }
    res = supabase.table("cm_visits").insert(payload).execute()
    # Auto-advance parent job to "scheduled" if it was draft
    try:
        job = _assert_owns("cm_jobs", body.job_id, user["client_id"])
        if job.get("status") == "draft":
            supabase.table("cm_jobs").update({"status": "scheduled"}).eq("id", body.job_id).execute()
    except Exception:
        pass
    return res.data[0]


class VisitUpdate(BaseModel):
    crew_id: Optional[str] = None
    title: Optional[str] = None
    start_at: Optional[str] = None
    end_at: Optional[str] = None
    status: Optional[str] = None
    notes_internal: Optional[str] = None
    notes_customer: Optional[str] = None


@router.patch("/visits/{visit_id}")
def update_visit(visit_id: str, body: VisitUpdate, user: dict = Depends(require_role("owner", "dispatcher"))):
    existing = _assert_owns("cm_visits", visit_id, user["client_id"])
    updates = body.model_dump(exclude_unset=True)
    if "crew_id" in updates and updates["crew_id"]:
        _assert_owns("cm_crews", updates["crew_id"], user["client_id"])
    if "status" in updates and updates["status"] not in {"scheduled", "on_site", "completed", "cancelled"}:
        raise HTTPException(status_code=400, detail="Invalid status")
    new_start = updates.get("start_at", existing["start_at"])
    new_end = updates.get("end_at", existing["end_at"])
    _validate_visit_times(new_start, new_end)
    res = supabase.table("cm_visits").update(updates).eq("id", visit_id).execute()
    return res.data[0]


@router.delete("/visits/{visit_id}")
def delete_visit(visit_id: str, user: dict = Depends(require_role("owner", "dispatcher"))):
    _assert_owns("cm_visits", visit_id, user["client_id"])
    supabase.table("cm_visits").delete().eq("id", visit_id).execute()
    return {"ok": True}
