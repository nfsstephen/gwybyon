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

# Dashboard routes — now use Supabase REST client (no SQLAlchemy/asyncpg)
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
    logger.info("Dashboard routes loaded (Supabase REST)")
except Exception as e:
    logger.warning(f"Dashboard routes skipped: {e}")


@app.on_event("startup")
async def seed_dashboard_users():
    """Seed default dashboard users via Supabase REST API."""
    try:
        import bcrypt
        import uuid
        from database import supabase

        seed_users = [
            ("admin@geogrid.com", "admin123", "Admin User", "admin"),
            ("client@geogrid.com", "client123", "Demo Client", "client"),
            ("tech@geogrid.com", "tech123", "Tech User", "technical"),
        ]

        for email, password, name, role in seed_users:
            existing = supabase.table("users").select("id").eq("email", email).execute()
            if not existing.data:
                pw_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
                supabase.table("users").insert({
                    "id": str(uuid.uuid4()),
                    "email": email,
                    "password_hash": pw_hash,
                    "full_name": name,
                    "role": role,
                    "is_active": True,
                }).execute()
                logger.info(f"Seeded dashboard user: {email}")
            else:
                logger.info(f"Dashboard user exists: {email}")

        logger.info("Dashboard user seeding complete")
    except Exception as e:
        logger.warning(f"Dashboard user seeding skipped: {e}")

logger.info("Server started with Supabase REST database")
