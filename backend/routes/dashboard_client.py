from fastapi import APIRouter, Depends, Query
from datetime import date, timedelta
from database import supabase
from routes.dashboard_auth import require_role

router = APIRouter(prefix="/dashboard", tags=["dashboard-client"])


@router.get("/client/overview")
async def client_overview(user: dict = Depends(require_role("client", "admin"))):
    try:
        result = supabase.table("business_profiles").select("*").eq("user_id", user["id"]).execute()
        profiles = result.data or []
    except Exception:
        profiles = []

    if not profiles:
        return {"profile": None, "latest_scan": None, "recent_actions": [], "gbp_summary": None}

    profile = profiles[0]

    # Latest scan
    latest_scan = None
    try:
        scan_result = supabase.table("scan_results").select("*").eq("business_profile_id", profile["id"]).order("scan_date", desc=True).limit(1).execute()
        if scan_result.data:
            s = scan_result.data[0]
            latest_scan = {
                "id": s["id"],
                "scan_date": s["scan_date"],
                "local_authority_score": s.get("local_authority_score", 0),
                "grid_data": s.get("grid_data"),
                "metrics": s.get("metrics"),
            }
    except Exception:
        pass

    # Recent actions
    recent_actions = []
    try:
        actions_result = supabase.table("action_feed").select("*").eq("business_profile_id", profile["id"]).order("created_at", desc=True).limit(20).execute()
        recent_actions = [
            {
                "id": a["id"],
                "action_type": a["action_type"],
                "description": a["description"],
                "platform": a.get("platform"),
                "status": a.get("status", "completed"),
                "created_at": a["created_at"],
            } for a in (actions_result.data or [])
        ]
    except Exception:
        pass

    # GBP summary
    gbp_summary = {"calls": 0, "directions": 0, "map_views": 0, "website_clicks": 0}
    try:
        thirty_days_ago = (date.today() - timedelta(days=30)).isoformat()
        gbp_result = supabase.table("gbp_metrics").select("*").eq("business_profile_id", profile["id"]).gte("date", thirty_days_ago).execute()
        for m in (gbp_result.data or []):
            gbp_summary["calls"] += m.get("calls", 0)
            gbp_summary["directions"] += m.get("directions", 0)
            gbp_summary["map_views"] += m.get("map_views", 0)
            gbp_summary["website_clicks"] += m.get("website_clicks", 0)
    except Exception:
        pass

    return {
        "profile": {
            "id": profile["id"],
            "business_name": profile.get("business_name"),
            "address": profile.get("address"),
            "city": profile.get("city"),
            "state": profile.get("state"),
            "zip_code": profile.get("zip_code"),
            "phone": profile.get("phone"),
            "category": profile.get("category"),
            "local_authority_score": profile.get("local_authority_score", 0),
            "subscription_tier": profile.get("subscription_tier", 1),
            "subscription_status": profile.get("subscription_status", "trial"),
        },
        "latest_scan": latest_scan,
        "recent_actions": recent_actions,
        "gbp_summary": gbp_summary,
    }


@router.get("/client/scan-history")
async def client_scan_history(user: dict = Depends(require_role("client", "admin"))):
    try:
        result = supabase.table("business_profiles").select("id").eq("user_id", user["id"]).execute()
        if not result.data:
            return {"scans": []}
        profile_id = result.data[0]["id"]

        scans_result = supabase.table("scan_results").select("*").eq("business_profile_id", profile_id).order("scan_date", desc=True).limit(50).execute()
        return {
            "scans": [
                {
                    "id": s["id"],
                    "scan_date": s["scan_date"],
                    "local_authority_score": s.get("local_authority_score", 0),
                    "grid_data": s.get("grid_data"),
                    "metrics": s.get("metrics"),
                } for s in (scans_result.data or [])
            ]
        }
    except Exception:
        return {"scans": []}


@router.get("/client/gbp-metrics")
async def client_gbp_metrics(
    days: int = Query(30, ge=7, le=365),
    user: dict = Depends(require_role("client", "admin")),
):
    try:
        result = supabase.table("business_profiles").select("id").eq("user_id", user["id"]).execute()
        if not result.data:
            return {"metrics": []}
        profile_id = result.data[0]["id"]

        start_date = (date.today() - timedelta(days=days)).isoformat()
        metrics_result = supabase.table("gbp_metrics").select("*").eq("business_profile_id", profile_id).gte("date", start_date).order("date").execute()
        return {
            "metrics": [
                {
                    "date": m["date"],
                    "calls": m.get("calls", 0),
                    "directions": m.get("directions", 0),
                    "map_views": m.get("map_views", 0),
                    "website_clicks": m.get("website_clicks", 0),
                } for m in (metrics_result.data or [])
            ]
        }
    except Exception:
        return {"metrics": []}
