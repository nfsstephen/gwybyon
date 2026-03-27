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
from routes.contracts import router as contracts_router

app.include_router(auth_router, prefix="/api")
app.include_router(chat_router, prefix="/api")
app.include_router(status_router, prefix="/api")
app.include_router(contracts_router, prefix="/api")

# Dashboard routes require PostgreSQL - only load if DATABASE_URL is configured
if os.environ.get("DATABASE_URL"):
    try:
        from routes.dashboard_auth import router as dashboard_auth_router
        from routes.dashboard_admin import router as dashboard_admin_router
        from routes.dashboard_client import router as dashboard_client_router
        from routes.dashboard_technical import router as dashboard_technical_router
        from routes.dashboard_config import router as dashboard_config_router
        app.include_router(dashboard_auth_router, prefix="/api")
        app.include_router(dashboard_admin_router, prefix="/api")
        app.include_router(dashboard_client_router, prefix="/api")
        app.include_router(dashboard_technical_router, prefix="/api")
        app.include_router(dashboard_config_router, prefix="/api")
        logger.info("Dashboard routes loaded")

        @app.on_event("startup")
        async def init_dashboard_db():
            from supabase_db import engine, Base, AsyncSessionLocal
            from models.dashboard import User
            from sqlalchemy import select
            import bcrypt
            async with engine.begin() as conn:
                await conn.run_sync(Base.metadata.create_all)
            async with AsyncSessionLocal() as session:
                for email, password, name, role in [
                    ("admin@geogrid.com", "admin123", "Admin User", "admin"),
                    ("client@geogrid.com", "client123", "Demo Client", "client"),
                    ("tech@geogrid.com", "tech123", "Tech User", "technical"),
                ]:
                    existing = await session.execute(select(User).where(User.email == email))
                    if not existing.scalar_one_or_none():
                        pw_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
                        session.add(User(email=email, password_hash=pw_hash, full_name=name, role=role))
                await session.commit()
            logger.info("Dashboard DB initialized and users seeded")
    except Exception as e:
        logger.warning(f"Dashboard routes skipped: {e}")
else:
    logger.info("Dashboard routes skipped - DATABASE_URL not configured")

logger.info("Server started with Supabase database")
