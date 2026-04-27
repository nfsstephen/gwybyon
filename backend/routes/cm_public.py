"""
Crew Management — Public customer tracking page.
No authentication. Access via tokenized URL: /api/cm/track/{public_token}.
Returns the customer's job + visits + sanitized surrounding crew context.
"""
import time
from datetime import datetime, timezone, timedelta
from fastapi import APIRouter, HTTPException
from database import supabase

router = APIRouter(prefix="/cm", tags=["cm-public"])

CONTEXT_WINDOW_DAYS = 14


def _retry(fn, attempts=3, delay=0.25):
    """Retry transient Supabase pooler disconnects (RemoteProtocolError, etc.)."""
    last_err = None
    for i in range(attempts):
        try:
            return fn()
        except Exception as e:
            last_err = e
            name = type(e).__name__
            if name in ("RemoteProtocolError", "ReadError", "ConnectError", "ReadTimeout"):
                time.sleep(delay * (i + 1))
                continue
            raise
    raise last_err


@router.get("/track/{token}")
def track_job(token: str):
    # 1) Find job by public_token
    job_res = _retry(lambda: (
        supabase.table("cm_jobs")
        .select(
            "id, client_id, customer_id, title, description, status, "
            "public_token, public_token_expires_at, created_at, completed_at"
        )
        .eq("public_token", token)
        .limit(1)
        .execute()
    ))
    if not job_res.data:
        raise HTTPException(status_code=404, detail="Tracking link not found")
    job = job_res.data[0]

    # 2) Expiry + tenant active check
    if job.get("public_token_expires_at"):
        try:
            exp = datetime.fromisoformat(job["public_token_expires_at"].replace("Z", "+00:00"))
            if exp < datetime.now(timezone.utc):
                raise HTTPException(status_code=410, detail="Tracking link has expired")
        except ValueError:
            pass

    client_res = (
        supabase.table("cm_clients")
        .select("id, business_name, public_slug, timezone, is_active")
        .eq("id", job["client_id"])
        .limit(1)
        .execute()
    )
    if not client_res.data or not client_res.data[0].get("is_active"):
        raise HTTPException(status_code=404, detail="Tracking link not found")
    client = client_res.data[0]

    # 3) Customer (the person viewing — their own full info)
    cust_res = (
        supabase.table("cm_customers")
        .select("id, full_name, email, phone, address")
        .eq("id", job["customer_id"])
        .eq("client_id", job["client_id"])
        .limit(1)
        .execute()
    )
    customer = cust_res.data[0] if cust_res.data else None

    # 4) This job's visits — full detail, customer-safe notes only
    visits_res = (
        supabase.table("cm_visits")
        .select("id, job_id, crew_id, title, start_at, end_at, status, notes_customer")
        .eq("job_id", job["id"])
        .eq("client_id", job["client_id"])
        .order("start_at")
        .execute()
    )
    my_visits = visits_res.data or []

    # 5) Determine which crews + time window we care about for context
    crew_ids = list({v["crew_id"] for v in my_visits if v.get("crew_id")})
    crews = []
    context_visits = []

    if crew_ids and my_visits:
        # Anchor window on the earliest visit start_at
        anchor = datetime.fromisoformat(my_visits[0]["start_at"].replace("Z", "+00:00"))
        window_start = (anchor - timedelta(days=CONTEXT_WINDOW_DAYS)).isoformat()
        window_end = (anchor + timedelta(days=CONTEXT_WINDOW_DAYS)).isoformat()

        crews_res = (
            supabase.table("cm_crews")
            .select("id, name, color")
            .in_("id", crew_ids)
            .eq("client_id", job["client_id"])
            .execute()
        )
        crews = crews_res.data or []

        # Pull ALL visits for these crews in the window (same tenant only)
        ctx_res = (
            supabase.table("cm_visits")
            .select("id, job_id, crew_id, title, start_at, end_at, status")
            .in_("crew_id", crew_ids)
            .eq("client_id", job["client_id"])
            .gte("start_at", window_start)
            .lt("start_at", window_end)
            .order("start_at")
            .execute()
        )
        ctx_all = ctx_res.data or []

        # Enrich: attach job_title for non-mine visits. Hide PII (no customer info).
        other_job_ids = list({v["job_id"] for v in ctx_all if v["job_id"] != job["id"]})
        other_job_titles = {}
        if other_job_ids:
            oj_res = (
                supabase.table("cm_jobs")
                .select("id, title")
                .in_("id", other_job_ids)
                .eq("client_id", job["client_id"])
                .execute()
            )
            for oj in (oj_res.data or []):
                other_job_titles[oj["id"]] = oj["title"]

        crew_color_map = {c["id"]: c["color"] for c in crews}
        crew_name_map = {c["id"]: c["name"] for c in crews}

        for v in ctx_all:
            is_mine = v["job_id"] == job["id"]
            context_visits.append({
                "id": v["id"],
                "is_mine": is_mine,
                "crew_id": v["crew_id"],
                "crew_name": crew_name_map.get(v["crew_id"]),
                "crew_color": crew_color_map.get(v["crew_id"]),
                "title": v["title"] if is_mine else None,
                # For other customers, show anonymized job type only
                "job_label": "Your job" if is_mine else other_job_titles.get(v["job_id"], "Other commitment"),
                "start_at": v["start_at"],
                "end_at": v["end_at"],
                "status": v["status"],
            })

    return {
        "client": {
            "business_name": client["business_name"],
            "timezone": client.get("timezone"),
        },
        "customer": {
            "full_name": customer["full_name"] if customer else None,
            "address": customer.get("address") if customer else None,
        },
        "job": {
            "id": job["id"],
            "title": job["title"],
            "description": job.get("description"),
            "status": job["status"],
            "completed_at": job.get("completed_at"),
        },
        "visits": [
            {
                **v,
                "crew_name": next((c["name"] for c in crews if c["id"] == v.get("crew_id")), None),
                "crew_color": next((c["color"] for c in crews if c["id"] == v.get("crew_id")), None),
            }
            for v in my_visits
        ],
        "context": {
            "window_days": CONTEXT_WINDOW_DAYS,
            "crews": crews,
            "visits": context_visits,
        },
    }
