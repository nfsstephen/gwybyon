from fastapi import APIRouter, Depends, Query
from sqlalchemy import select, func, desc
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import date, timedelta

from supabase_db import get_db
from models.dashboard import User, BusinessProfile, ScanResult, ActionFeedItem, GBPMetric
from routes.dashboard_auth import require_role

router = APIRouter(prefix="/dashboard", tags=["dashboard-client"])


@router.get("/client/overview")
async def client_overview(
    user: User = Depends(require_role("client", "admin")),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(BusinessProfile).where(BusinessProfile.user_id == user.id)
    )
    profile = result.scalar_one_or_none()
    if not profile:
        return {"profile": None, "latest_scan": None, "recent_actions": [], "gbp_summary": None}

    scan_result = await db.execute(
        select(ScanResult)
        .where(ScanResult.business_profile_id == profile.id)
        .order_by(desc(ScanResult.scan_date))
        .limit(1)
    )
    latest_scan = scan_result.scalar_one_or_none()

    actions_result = await db.execute(
        select(ActionFeedItem)
        .where(ActionFeedItem.business_profile_id == profile.id)
        .order_by(desc(ActionFeedItem.created_at))
        .limit(20)
    )
    recent_actions = actions_result.scalars().all()

    thirty_days_ago = date.today() - timedelta(days=30)
    gbp_result = await db.execute(
        select(
            func.sum(GBPMetric.calls).label('total_calls'),
            func.sum(GBPMetric.directions).label('total_directions'),
            func.sum(GBPMetric.map_views).label('total_map_views'),
            func.sum(GBPMetric.website_clicks).label('total_website_clicks'),
        )
        .where(GBPMetric.business_profile_id == profile.id)
        .where(GBPMetric.date >= thirty_days_ago)
    )
    gbp_row = gbp_result.one()

    return {
        "profile": {
            "id": profile.id,
            "business_name": profile.business_name,
            "address": profile.address,
            "city": profile.city,
            "state": profile.state,
            "zip_code": profile.zip_code,
            "phone": profile.phone,
            "category": profile.category,
            "local_authority_score": profile.local_authority_score,
            "subscription_tier": profile.subscription_tier,
            "subscription_status": profile.subscription_status,
        },
        "latest_scan": {
            "id": latest_scan.id,
            "scan_date": latest_scan.scan_date.isoformat(),
            "local_authority_score": latest_scan.local_authority_score,
            "grid_data": latest_scan.grid_data,
            "metrics": latest_scan.metrics,
        } if latest_scan else None,
        "recent_actions": [
            {
                "id": a.id,
                "action_type": a.action_type,
                "description": a.description,
                "platform": a.platform,
                "status": a.status,
                "created_at": a.created_at.isoformat(),
            } for a in recent_actions
        ],
        "gbp_summary": {
            "calls": int(gbp_row.total_calls or 0),
            "directions": int(gbp_row.total_directions or 0),
            "map_views": int(gbp_row.total_map_views or 0),
            "website_clicks": int(gbp_row.total_website_clicks or 0),
        },
    }


@router.get("/client/scan-history")
async def client_scan_history(
    user: User = Depends(require_role("client", "admin")),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(BusinessProfile).where(BusinessProfile.user_id == user.id)
    )
    profile = result.scalar_one_or_none()
    if not profile:
        return {"scans": []}

    scans_result = await db.execute(
        select(ScanResult)
        .where(ScanResult.business_profile_id == profile.id)
        .order_by(desc(ScanResult.scan_date))
        .limit(50)
    )
    scans = scans_result.scalars().all()
    return {
        "scans": [
            {
                "id": s.id,
                "scan_date": s.scan_date.isoformat(),
                "local_authority_score": s.local_authority_score,
                "grid_data": s.grid_data,
                "metrics": s.metrics,
            } for s in scans
        ]
    }


@router.get("/client/gbp-metrics")
async def client_gbp_metrics(
    days: int = Query(30, ge=7, le=365),
    user: User = Depends(require_role("client", "admin")),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(BusinessProfile).where(BusinessProfile.user_id == user.id)
    )
    profile = result.scalar_one_or_none()
    if not profile:
        return {"metrics": []}

    start_date = date.today() - timedelta(days=days)
    metrics_result = await db.execute(
        select(GBPMetric)
        .where(GBPMetric.business_profile_id == profile.id)
        .where(GBPMetric.date >= start_date)
        .order_by(GBPMetric.date)
    )
    metrics = metrics_result.scalars().all()
    return {
        "metrics": [
            {
                "date": m.date.isoformat(),
                "calls": m.calls,
                "directions": m.directions,
                "map_views": m.map_views,
                "website_clicks": m.website_clicks,
            } for m in metrics
        ]
    }
