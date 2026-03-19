from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, timezone
from database import db
from routes.dashboard_auth import require_role

router = APIRouter(prefix="/dashboard", tags=["dashboard-technical"])


@router.get("/technical/api-usage")
async def technical_api_usage(
    days: int = Query(30, ge=7, le=365),
    user: dict = Depends(require_role("technical", "admin")),
):
    records = await db.api_usage.find(
        {}, {"_id": 0}
    ).sort("date", 1).to_list(5000)

    by_service = {}
    for r in records:
        svc = r["service_name"]
        if svc not in by_service:
            by_service[svc] = {"credits": 0, "tokens": 0, "cost": 0.0}
        by_service[svc]["credits"] += r.get("credits_used", 0)
        by_service[svc]["tokens"] += r.get("tokens_consumed", 0)
        by_service[svc]["cost"] += r.get("cost", 0)

    return {
        "period_days": days,
        "by_service": by_service,
        "daily": records,
    }


@router.get("/technical/content-queue")
async def technical_content_queue(
    status_filter: Optional[str] = Query(None),
    user: dict = Depends(require_role("technical", "admin")),
):
    query = {}
    if status_filter:
        query["status"] = status_filter

    items = await db.content_queue.find(
        query, {"_id": 0}
    ).sort("created_at", -1).limit(50).to_list(50)

    return {"items": items}


class ContentReviewRequest(BaseModel):
    action: str


@router.put("/technical/content-queue/{item_id}")
async def technical_review_content(
    item_id: str,
    req: ContentReviewRequest,
    user: dict = Depends(require_role("technical", "admin")),
):
    item = await db.content_queue.find_one({"id": item_id})
    if not item:
        raise HTTPException(status_code=404, detail="Content item not found")

    if req.action not in ("approve", "reject"):
        raise HTTPException(status_code=400, detail="Action must be 'approve' or 'reject'")

    new_status = "approved" if req.action == "approve" else "rejected"
    await db.content_queue.update_one(
        {"id": item_id},
        {"$set": {"status": new_status, "reviewed_at": datetime.now(timezone.utc).isoformat()}}
    )
    return {"status": "ok", "new_status": new_status}
