import os
from fastapi import APIRouter

router = APIRouter(prefix="/dashboard", tags=["dashboard-config"])


@router.get("/config")
async def get_config():
    return {
        "mapbox_token": os.environ.get('MAPBOX_TOKEN', ''),
    }
