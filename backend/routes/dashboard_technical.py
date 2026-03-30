from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from typing import Optional
from datetime import date, timedelta, datetime, timezone
from database import supabase
from routes.dashboard_auth import require_role

router = APIRouter(prefix="/dashboard", tags=["dashboard-technical"])


@router.get("/technical/api-usage")
async def technical_api_usage(
    days: int = Query(30, ge=7, le=365),
    user: dict = Depends(require_role("technical", "admin")),
):
    try:
        start_date = (date.today() - timedelta(days=days)).isoformat()
        result = supabase.table("api_usage").select("*").gte("date", start_date).order("date").execute()
        records = result.data or []
    except Exception:
        records = []

    by_service = {}
    for r in records:
        svc = r.get("service_name", "unknown")
        if svc not in by_service:
            by_service[svc] = {"credits": 0, "tokens": 0, "cost": 0.0}
        by_service[svc]["credits"] += r.get("credits_used", 0) or 0
        by_service[svc]["tokens"] += r.get("tokens_consumed", 0) or 0
        by_service[svc]["cost"] += float(r.get("cost", 0) or 0)

    return {
        "period_days": days,
        "by_service": by_service,
        "daily": [
            {
                "date": r["date"],
                "service_name": r.get("service_name"),
                "credits_used": r.get("credits_used", 0),
                "tokens_consumed": r.get("tokens_consumed", 0),
                "cost": float(r.get("cost", 0) or 0),
            } for r in records
        ],
    }


@router.get("/technical/content-queue")
async def technical_content_queue(
    status_filter: Optional[str] = Query(None),
    user: dict = Depends(require_role("technical", "admin")),
):
    try:
        query = supabase.table("content_queue").select("*").order("created_at", desc=True).limit(50)
        if status_filter:
            query = query.eq("status", status_filter)
        result = query.execute()
        items = result.data or []
    except Exception:
        items = []

    return {
        "items": [
            {
                "id": i["id"],
                "business_profile_id": i.get("business_profile_id"),
                "content_type": i.get("content_type"),
                "title": i.get("title"),
                "content_text": i.get("content_text"),
                "status": i.get("status", "pending"),
                "created_at": i.get("created_at"),
                "reviewed_at": i.get("reviewed_at"),
            } for i in items
        ]
    }


class ContentReviewRequest(BaseModel):
    action: str


@router.put("/technical/content-queue/{item_id}")
async def technical_review_content(
    item_id: str,
    req: ContentReviewRequest,
    user: dict = Depends(require_role("technical", "admin")),
):
    if req.action not in ("approve", "reject"):
        raise HTTPException(status_code=400, detail="Action must be 'approve' or 'reject'")

    try:
        result = supabase.table("content_queue").select("id").eq("id", item_id).execute()
        if not result.data:
            raise HTTPException(status_code=404, detail="Content item not found")

        new_status = "approved" if req.action == "approve" else "rejected"
        supabase.table("content_queue").update({
            "status": new_status,
            "reviewed_at": datetime.now(timezone.utc).isoformat(),
        }).eq("id", item_id).execute()

        return {"status": "ok", "new_status": new_status}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
