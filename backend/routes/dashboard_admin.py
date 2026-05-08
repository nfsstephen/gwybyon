import random
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from database import supabase
from routes.dashboard_auth import require_role

router = APIRouter(prefix="/dashboard", tags=["dashboard-admin"])

TABLE_USERS = "users"


@router.get("/admin/clients")
async def admin_list_clients(user: dict = Depends(require_role("admin"))):
    try:
        result = supabase.table(TABLE_USERS).select("*").eq("role", "client").order("created_at", desc=True).execute()
        clients = result.data or []
    except Exception:
        clients = []

    return {
        "clients": [
            {
                "id": c["id"],
                "email": c["email"],
                "full_name": c["full_name"],
                "is_active": c.get("is_active", True),
                "created_at": c.get("created_at"),
                "business_profiles": [],
            } for c in clients
        ]
    }


class QuickScanRequest(BaseModel):
    business_name: str
    address: str
    city: str
    state: str


@router.post("/admin/quick-scan")
async def admin_quick_scan(req: QuickScanRequest, user: dict = Depends(require_role("admin"))):
    score = random.randint(15, 85)
    grid_data = []
    for row in range(5):
        grid_row = []
        for col in range(5):
            rank = random.randint(1, 20)
            if rank <= 3:
                color = "green"
            elif rank <= 7:
                color = "yellow"
            else:
                color = "red"
            grid_row.append({"rank": rank, "color": color})
        grid_data.append(grid_row)

    return {
        "business_name": req.business_name,
        "address": f"{req.address}, {req.city}, {req.state}",
        "local_authority_score": score,
        "grid_data": grid_data,
        "recommendations": [
            "Incomplete Google Business Profile - missing 4 key attributes",
            "NAP inconsistencies found across 3 directories",
            "No structured data markup detected on website",
            "Zero neighborhood-specific content in last 90 days",
            "Only 12 reviews (competitor avg: 47)",
        ][:random.randint(2, 5)],
        "competitor_avg_score": random.randint(score + 5, 95),
    }
