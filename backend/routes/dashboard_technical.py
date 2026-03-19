from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select, desc
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel
from typing import Optional
from datetime import date, timedelta, datetime, timezone

from supabase_db import get_db
from models.dashboard import User, APIUsage, ContentQueueItem
from routes.dashboard_auth import require_role

router = APIRouter(prefix="/dashboard", tags=["dashboard-technical"])


@router.get("/technical/api-usage")
async def technical_api_usage(
    days: int = Query(30, ge=7, le=365),
    user: User = Depends(require_role("technical", "admin")),
    db: AsyncSession = Depends(get_db)
):
    try:
        start_date = date.today() - timedelta(days=days)
        result = await db.execute(
            select(APIUsage)
            .where(APIUsage.date >= start_date)
            .order_by(APIUsage.date)
        )
        records = result.scalars().all()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"api-usage error: {type(e).__name__}: {str(e)}")

    by_service = {}
    for r in records:
        if r.service_name not in by_service:
            by_service[r.service_name] = {"credits": 0, "tokens": 0, "cost": 0.0}
        by_service[r.service_name]["credits"] += r.credits_used or 0
        by_service[r.service_name]["tokens"] += r.tokens_consumed or 0
        by_service[r.service_name]["cost"] += float(r.cost or 0)

    return {
        "period_days": days,
        "by_service": by_service,
        "daily": [
            {
                "date": r.date.isoformat(),
                "service_name": r.service_name,
                "credits_used": r.credits_used,
                "tokens_consumed": r.tokens_consumed,
                "cost": float(r.cost or 0),
            } for r in records
        ],
    }


@router.get("/technical/content-queue")
async def technical_content_queue(
    status_filter: Optional[str] = Query(None),
    user: User = Depends(require_role("technical", "admin")),
    db: AsyncSession = Depends(get_db)
):
    query = select(ContentQueueItem).order_by(desc(ContentQueueItem.created_at)).limit(50)
    if status_filter:
        query = query.where(ContentQueueItem.status == status_filter)

    result = await db.execute(query)
    items = result.scalars().all()
    return {
        "items": [
            {
                "id": i.id,
                "business_profile_id": i.business_profile_id,
                "content_type": i.content_type,
                "title": i.title,
                "content_text": i.content_text,
                "status": i.status,
                "created_at": i.created_at.isoformat(),
                "reviewed_at": i.reviewed_at.isoformat() if i.reviewed_at else None,
            } for i in items
        ]
    }


class ContentReviewRequest(BaseModel):
    action: str


@router.put("/technical/content-queue/{item_id}")
async def technical_review_content(
    item_id: str,
    req: ContentReviewRequest,
    user: User = Depends(require_role("technical", "admin")),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(ContentQueueItem).where(ContentQueueItem.id == item_id))
    item = result.scalar_one_or_none()
    if not item:
        raise HTTPException(status_code=404, detail="Content item not found")

    if req.action not in ("approve", "reject"):
        raise HTTPException(status_code=400, detail="Action must be 'approve' or 'reject'")

    item.status = "approved" if req.action == "approve" else "rejected"
    item.reviewed_at = datetime.now(timezone.utc)
    await db.commit()
    return {"status": "ok", "new_status": item.status}
