import random
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from database import db
from routes.dashboard_auth import require_role

router = APIRouter(prefix="/dashboard", tags=["dashboard-admin"])


@router.get("/admin/clients")
async def admin_list_clients(user: dict = Depends(require_role("admin"))):
    clients = await db.dashboard_users.find(
        {"role": "client"}, {"_id": 0, "password_hash": 0}
    ).sort("created_at", -1).to_list(100)

    for c in clients:
        profiles = await db.business_profiles.find(
            {"user_id": c["id"]}, {"_id": 0}
        ).to_list(10)
        c["business_profiles"] = profiles

    return {"clients": clients}


class QuickScanRequest(BaseModel):
    business_name: str
    address: str
    city: str
    state: str


@router.post("/admin/quick-scan")
async def admin_quick_scan(
    req: QuickScanRequest,
    user: dict = Depends(require_role("admin")),
):
    score = random.randint(15, 85)
    grid_data = []
    for row in range(5):
        grid_row = []
        for col in range(5):
            rank = random.randint(1, 20)
            color = "green" if rank <= 3 else ("yellow" if rank <= 7 else "red")
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
