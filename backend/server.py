from pathlib import Path
from dotenv import load_dotenv

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from fastapi import FastAPI, APIRouter
from starlette.middleware.cors import CORSMiddleware
from database import client
from routes.chat import router as chat_router
from routes.auth import router as auth_router
from routes.status import router as status_router
import os
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI()

api_router = APIRouter(prefix="/api")
api_router.include_router(status_router)
api_router.include_router(chat_router)
api_router.include_router(auth_router)

# Dashboard routes require PostgreSQL - only load if DATABASE_URL is configured
if os.environ.get('DATABASE_URL'):
    try:
        from routes.dashboard_auth import router as dashboard_auth_router
        from routes.dashboard_client import router as dashboard_client_router
        from routes.dashboard_admin import router as dashboard_admin_router
        from routes.dashboard_technical import router as dashboard_technical_router
        from routes.dashboard_config import router as dashboard_config_router
        api_router.include_router(dashboard_auth_router)
        api_router.include_router(dashboard_client_router)
        api_router.include_router(dashboard_admin_router)
        api_router.include_router(dashboard_technical_router)
        api_router.include_router(dashboard_config_router)
        logger.info("Dashboard routes loaded successfully")
    except Exception as e:
        logger.warning(f"Dashboard routes not loaded: {e}")
else:
    logger.info("Dashboard routes skipped - DATABASE_URL not configured")

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
