"""
Crew Management — Schedule data routes (read-only for v1).
All routes are tenant-scoped via get_cm_user dependency.
"""
from datetime import datetime, timezone
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from database import supabase
from routes.cm_auth import get_cm_user

router = APIRouter(prefix="/cm", tags=["cm-schedule"])


@router.get("/crews")
def list_crews(user: dict = Depends(get_cm_user)):
    res = (
        supabase.table("cm_crews")
        .select("id, name, color, is_active, created_at")
        .eq("client_id", user["client_id"])
        .order("name")
        .execute()
    )
    return {"crews": res.data or []}


@router.get("/customers")
def list_customers(user: dict = Depends(get_cm_user)):
    res = (
        supabase.table("cm_customers")
        .select("id, full_name, email, phone, address, notes, created_at")
        .eq("client_id", user["client_id"])
        .order("full_name")
        .execute()
    )
    return {"customers": res.data or []}


@router.get("/jobs")
def list_jobs(user: dict = Depends(get_cm_user), status_filter: Optional[str] = Query(None, alias="status")):
    q = (
        supabase.table("cm_jobs")
        .select(
            "id, customer_id, service_id, title, description, status, public_token, "
            "created_at, completed_at"
        )
        .eq("client_id", user["client_id"])
    )
    if status_filter:
        q = q.eq("status", status_filter)
    res = q.order("created_at", desc=True).execute()

    jobs = res.data or []
    # Attach customer name + service label for convenience
    if jobs:
        cust_ids = list({j["customer_id"] for j in jobs if j.get("customer_id")})
        cust_res = (
            supabase.table("cm_customers")
            .select("id, full_name")
            .in_("id", cust_ids)
            .eq("client_id", user["client_id"])
            .execute()
        )
        cust_map = {c["id"]: c["full_name"] for c in (cust_res.data or [])}

        svc_ids = list({j["service_id"] for j in jobs if j.get("service_id")})
        svc_map = {}
        if svc_ids:
            svc_res = (
                supabase.table("cm_services")
                .select("id, name, color")
                .in_("id", svc_ids)
                .eq("client_id", user["client_id"])
                .execute()
            )
            svc_map = {s["id"]: s for s in (svc_res.data or [])}

        for j in jobs:
            j["customer_name"] = cust_map.get(j.get("customer_id"))
            svc = svc_map.get(j.get("service_id"))
            j["service_name"] = svc["name"] if svc else None
            j["service_color"] = svc["color"] if svc else None
    return {"jobs": jobs}


@router.get("/jobs/{job_id}")
def get_job(job_id: str, user: dict = Depends(get_cm_user)):
    job_res = (
        supabase.table("cm_jobs")
        .select("*")
        .eq("id", job_id)
        .eq("client_id", user["client_id"])
        .limit(1)
        .execute()
    )
    if not job_res.data:
        raise HTTPException(status_code=404, detail="Job not found")
    job = job_res.data[0]

    cust_res = (
        supabase.table("cm_customers")
        .select("id, full_name, email, phone, address, notes")
        .eq("id", job["customer_id"])
        .eq("client_id", user["client_id"])
        .limit(1)
        .execute()
    )
    visits_res = (
        supabase.table("cm_visits")
        .select("*")
        .eq("job_id", job_id)
        .eq("client_id", user["client_id"])
        .order("start_at")
        .execute()
    )
    return {
        "job": job,
        "customer": cust_res.data[0] if cust_res.data else None,
        "visits": visits_res.data or [],
    }


@router.get("/visits")
def list_visits(
    user: dict = Depends(get_cm_user),
    start: Optional[str] = Query(None, description="ISO start of range (inclusive)"),
    end: Optional[str] = Query(None, description="ISO end of range (exclusive)"),
    crew_id: Optional[str] = Query(None),
):
    """
    Returns visits in [start, end) for this tenant. Each visit includes its
    job title + customer name for calendar display.
    """
    q = (
        supabase.table("cm_visits")
        .select(
            "id, job_id, crew_id, service_id, title, start_at, end_at, status, "
            "notes_internal, notes_customer"
        )
        .eq("client_id", user["client_id"])
    )
    if start:
        q = q.gte("start_at", start)
    if end:
        q = q.lt("start_at", end)
    if crew_id:
        q = q.eq("crew_id", crew_id)
    res = q.order("start_at").execute()
    visits = res.data or []

    # Enrich with job + customer + crew + service info
    if visits:
        job_ids = list({v["job_id"] for v in visits if v.get("job_id")})
        crew_ids = list({v["crew_id"] for v in visits if v.get("crew_id")})
        # service ids come from BOTH the visit override and the parent job
        visit_svc_ids = {v.get("service_id") for v in visits if v.get("service_id")}

        job_res = (
            supabase.table("cm_jobs")
            .select("id, title, customer_id, status, service_id")
            .in_("id", job_ids)
            .eq("client_id", user["client_id"])
            .execute()
        )
        jobs = job_res.data or []
        job_map = {j["id"]: j for j in jobs}
        job_svc_ids = {j.get("service_id") for j in jobs if j.get("service_id")}
        all_svc_ids = list(visit_svc_ids | job_svc_ids)

        cust_ids = list({j["customer_id"] for j in jobs if j.get("customer_id")})
        cust_map = {}
        if cust_ids:
            cust_res = (
                supabase.table("cm_customers")
                .select("id, full_name, address")
                .in_("id", cust_ids)
                .eq("client_id", user["client_id"])
                .execute()
            )
            cust_map = {c["id"]: c for c in (cust_res.data or [])}

        crew_map = {}
        if crew_ids:
            crew_res = (
                supabase.table("cm_crews")
                .select("id, name, color")
                .in_("id", crew_ids)
                .eq("client_id", user["client_id"])
                .execute()
            )
            crew_map = {c["id"]: c for c in (crew_res.data or [])}

        svc_map = {}
        if all_svc_ids:
            svc_res = (
                supabase.table("cm_services")
                .select("id, name, color")
                .in_("id", all_svc_ids)
                .eq("client_id", user["client_id"])
                .execute()
            )
            svc_map = {s["id"]: s for s in (svc_res.data or [])}

        for v in visits:
            j = job_map.get(v.get("job_id")) or {}
            c = cust_map.get(j.get("customer_id")) or {}
            cr = crew_map.get(v.get("crew_id")) or {}
            # visit-level service wins; else fall back to parent job's service
            effective_svc_id = v.get("service_id") or j.get("service_id")
            svc = svc_map.get(effective_svc_id) or {}
            v["job_title"] = j.get("title")
            v["job_status"] = j.get("status")
            v["customer_name"] = c.get("full_name")
            v["customer_address"] = c.get("address")
            v["crew_name"] = cr.get("name")
            v["crew_color"] = cr.get("color")
            v["service_name"] = svc.get("name")
            v["service_color"] = svc.get("color")

    return {"visits": visits}
