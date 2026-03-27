from pathlib import Path
from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent / ".env")

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from routes.auth import router as auth_router
from routes.chat import router as chat_router
from routes.status import router as status_router

app.include_router(auth_router, prefix="/api")
app.include_router(chat_router, prefix="/api")
app.include_router(status_router, prefix="/api")

# Dashboard routes require PostgreSQL - only load if DATABASE_URL is configured
if os.environ.get("DATABASE_URL"):
    try:
        from routes.dashboard import router as dashboard_router
        app.include_router(dashboard_router, prefix="/api")
        logger.info("Dashboard routes loaded")
    except Exception as e:
        logger.warning(f"Dashboard routes skipped: {e}")
else:
    logger.info("Dashboard routes skipped - DATABASE_URL not configured")

logger.info("Server started with Supabase database")
