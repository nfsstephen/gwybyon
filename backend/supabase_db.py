from pathlib import Path
from dotenv import load_dotenv
import os
import uuid

load_dotenv(Path(__file__).parent / '.env')

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase

DATABASE_URL = os.environ.get('DATABASE_URL', 'postgresql://localhost:5432/gwybyon')
ASYNC_DATABASE_URL = DATABASE_URL.replace('postgresql://', 'postgresql+asyncpg://')

engine = create_async_engine(
    ASYNC_DATABASE_URL,
    pool_size=3,
    max_overflow=2,
    pool_timeout=10,
    pool_recycle=300,
    pool_pre_ping=True,
    echo=False,
    connect_args={
        "prepared_statement_name_func": lambda: f"stmt_{uuid.uuid4().hex[:12]}",
        "statement_cache_size": 0,
        "command_timeout": 10,
    }
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False
)


class Base(DeclarativeBase):
    pass


async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
