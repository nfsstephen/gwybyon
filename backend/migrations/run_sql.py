"""
Apply a SQL migration file directly against the Supabase Postgres instance.
Uses DATABASE_URL from .env (bypasses the REST API for DDL).

Usage:
    cd /app/backend && python3 -m migrations.run_sql migrations/002_services_schema.sql
"""
import os
import sys
import psycopg2
from dotenv import load_dotenv

load_dotenv()


def run(sql_path: str) -> None:
    db_url = os.environ.get("DATABASE_URL")
    if not db_url:
        raise RuntimeError("DATABASE_URL not set in environment")

    with open(sql_path, "r", encoding="utf-8") as f:
        sql = f.read()

    conn = psycopg2.connect(db_url)
    conn.autocommit = True
    try:
        with conn.cursor() as cur:
            cur.execute(sql)
        print(f"✓ Applied {sql_path}")
    finally:
        conn.close()


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python -m migrations.run_sql <path/to/file.sql>")
        sys.exit(1)
    run(sys.argv[1])
