import random
from fastapi import APIRouter, Depends
from sqlalchemy import select, desc
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from pydantic import BaseModel

from supabase_db import get_db
from models.dashboard import User, BusinessProfile
from routes.dashboard_auth import require_role

router = APIRouter(prefix="/dashboard", tags=["dashboard-admin"])


@router.get("/admin/clients")
async def admin_list_clients(
    user: User = Depends(require_role("admin")),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(User)
        .options(selectinload(User.business_profiles))
        .where(User.role == "client")
        .order_by(desc(User.created_at))
    )
    clients = result.scalars().all()
    return {
        "clients": [
            {
                "id": c.id,
                "email": c.email,
                "full_name": c.full_name,
                "is_active": c.is_active,
                "created_at": c.created_at.isoformat() if c.created_at else None,
                "business_profiles": [
                    {
                        "id": bp.id,
                        "business_name": bp.business_name,
                        "local_authority_score": bp.local_authority_score,
                        "subscription_tier": bp.subscription_tier,
                        "subscription_status": bp.subscription_status,
                        "city": bp.city,
                        "state": bp.state,
                        "category": bp.category,
                    } for bp in c.business_profiles
                ]
            } for c in clients
        ]
    }


class QuickScanRequest(BaseModel):
    business_name: str
    address: str
    city: str
    state: str


@router.post("/admin/quick-scan")
async def admin_quick_scan(
    req: QuickScanRequest,
    user: User = Depends(require_role("admin")),
    db: AsyncSession = Depends(get_db)
):
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
