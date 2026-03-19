from fastapi import APIRouter, Depends
from database import db
from routes.dashboard_auth import require_role

router = APIRouter(prefix="/dashboard", tags=["dashboard-client"])


@router.get("/client/overview")
async def client_overview(user: dict = Depends(require_role("client", "admin"))):
    profile = await db.business_profiles.find_one(
        {"user_id": user["id"]}, {"_id": 0}
    )
    if not profile:
        return {"profile": None, "latest_scan": None, "recent_actions": [], "gbp_summary": {"calls": 0, "directions": 0, "map_views": 0, "website_clicks": 0}}

    latest_scan = await db.scan_results.find_one(
        {"business_profile_id": profile["id"]},
        {"_id": 0},
        sort=[("scan_date", -1)]
    )

    recent_actions = await db.action_feed.find(
        {"business_profile_id": profile["id"]}, {"_id": 0}
    ).sort("created_at", -1).limit(20).to_list(20)

    pipeline = [
        {"$match": {"business_profile_id": profile["id"]}},
        {"$group": {
            "_id": None,
            "total_calls": {"$sum": "$calls"},
            "total_directions": {"$sum": "$directions"},
            "total_map_views": {"$sum": "$map_views"},
            "total_website_clicks": {"$sum": "$website_clicks"},
        }}
    ]
    gbp_agg = await db.gbp_metrics.aggregate(pipeline).to_list(1)
    gbp = gbp_agg[0] if gbp_agg else {}

    return {
        "profile": profile,
        "latest_scan": latest_scan,
        "recent_actions": recent_actions,
        "gbp_summary": {
            "calls": gbp.get("total_calls", 0),
            "directions": gbp.get("total_directions", 0),
            "map_views": gbp.get("total_map_views", 0),
            "website_clicks": gbp.get("total_website_clicks", 0),
        },
    }


@router.get("/client/scan-history")
async def client_scan_history(user: dict = Depends(require_role("client", "admin"))):
    profile = await db.business_profiles.find_one(
        {"user_id": user["id"]}, {"_id": 0}
    )
    if not profile:
        return {"scans": []}

    scans = await db.scan_results.find(
        {"business_profile_id": profile["id"]}, {"_id": 0}
    ).sort("scan_date", -1).limit(50).to_list(50)

    return {"scans": scans}
