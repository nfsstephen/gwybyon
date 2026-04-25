"""
Seed demo data for Crew Management Tool.
Idempotent — safe to run repeatedly. Updates the demo owner password
if DEMO_OWNER_PASSWORD env var (or the default below) has changed.

Usage:
    cd /app/backend && python3 -m migrations.seed_cm_demo
"""
import os
import sys
import uuid
from datetime import datetime, timezone, timedelta

# Make routes/ importable when run as a script
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from dotenv import load_dotenv
load_dotenv()

from database import supabase  # noqa: E402
from routes.cm_auth import hash_password, verify_password  # noqa: E402

DEMO_CLIENT_SLUG = "demo-client"
DEMO_CLIENT_NAME = "Demo Client"
DEMO_OWNER_EMAIL = "demo@gwyai.com"
DEMO_OWNER_PASSWORD = os.environ.get("DEMO_OWNER_PASSWORD", "demo123")
DEMO_OWNER_NAME = "Demo Owner"


def upsert_client():
    res = (
        supabase.table("cm_clients")
        .select("id, business_name")
        .eq("public_slug", DEMO_CLIENT_SLUG)
        .limit(1)
        .execute()
    )
    if res.data:
        print(f"  - client exists: {res.data[0]['id']}")
        return res.data[0]["id"]
    res = (
        supabase.table("cm_clients")
        .insert({
            "business_name": DEMO_CLIENT_NAME,
            "public_slug": DEMO_CLIENT_SLUG,
            "timezone": "America/New_York",
        })
        .execute()
    )
    cid = res.data[0]["id"]
    print(f"  - client created: {cid}")
    return cid


def upsert_owner(client_id):
    res = (
        supabase.table("cm_users")
        .select("id, password_hash")
        .eq("email", DEMO_OWNER_EMAIL)
        .eq("client_id", client_id)
        .limit(1)
        .execute()
    )
    if res.data:
        u = res.data[0]
        if not verify_password(DEMO_OWNER_PASSWORD, u["password_hash"]):
            supabase.table("cm_users").update({
                "password_hash": hash_password(DEMO_OWNER_PASSWORD),
            }).eq("id", u["id"]).execute()
            print(f"  - owner password updated: {u['id']}")
        else:
            print(f"  - owner exists: {u['id']}")
        return u["id"]
    res = (
        supabase.table("cm_users")
        .insert({
            "client_id": client_id,
            "email": DEMO_OWNER_EMAIL,
            "password_hash": hash_password(DEMO_OWNER_PASSWORD),
            "full_name": DEMO_OWNER_NAME,
            "role": "owner",
        })
        .execute()
    )
    uid = res.data[0]["id"]
    print(f"  - owner created: {uid}")
    return uid


def upsert_crews(client_id):
    crew_specs = [
        {"name": "Drill Rig 1", "color": "#0d9488"},
        {"name": "Pump Install Crew", "color": "#2563eb"},
        {"name": "Service Truck", "color": "#d97706"},
    ]
    crews = {}
    for spec in crew_specs:
        res = (
            supabase.table("cm_crews")
            .select("id")
            .eq("client_id", client_id)
            .eq("name", spec["name"])
            .limit(1)
            .execute()
        )
        if res.data:
            crews[spec["name"]] = res.data[0]["id"]
            continue
        res = (
            supabase.table("cm_crews")
            .insert({"client_id": client_id, **spec})
            .execute()
        )
        crews[spec["name"]] = res.data[0]["id"]
    print(f"  - crews ready: {list(crews.keys())}")
    return crews


def upsert_customers(client_id):
    customer_specs = [
        {"full_name": "John Smith", "phone": "555-0101", "address": "421 Cypress Ln, Tampa FL"},
        {"full_name": "Maria Garcia", "phone": "555-0102", "address": "88 Oak Ridge Rd, Lakeland FL"},
        {"full_name": "Robert Chen", "phone": "555-0103", "address": "1209 Sunset Dr, Brandon FL"},
        {"full_name": "Patricia Williams", "phone": "555-0104", "address": "650 Pine Ave, Plant City FL"},
    ]
    customers = {}
    for spec in customer_specs:
        res = (
            supabase.table("cm_customers")
            .select("id")
            .eq("client_id", client_id)
            .eq("full_name", spec["full_name"])
            .limit(1)
            .execute()
        )
        if res.data:
            customers[spec["full_name"]] = res.data[0]["id"]
            continue
        res = (
            supabase.table("cm_customers")
            .insert({"client_id": client_id, **spec})
            .execute()
        )
        customers[spec["full_name"]] = res.data[0]["id"]
    print(f"  - customers ready: {list(customers.keys())}")
    return customers


def seed_jobs_and_visits(client_id, crews, customers):
    """
    Creates jobs + visits idempotently. We key on (client_id, title) for jobs.
    Visits are created on a rolling 14-day window relative to today.
    """
    # If demo jobs already exist, skip — keep idempotent (don't duplicate visits)
    res = (
        supabase.table("cm_jobs")
        .select("id, title")
        .eq("client_id", client_id)
        .execute()
    )
    existing_titles = {j["title"] for j in (res.data or [])}

    today = datetime.now(timezone.utc).replace(hour=0, minute=0, second=0, microsecond=0)
    # Anchor to THIS Monday so the demo always has visits in the current week
    monday = today - timedelta(days=today.weekday())

    def at(day_offset, hour, minute=0):
        return (monday + timedelta(days=day_offset, hours=hour, minutes=minute)).isoformat()

    job_specs = [
        {
            "title": "200ft Residential Well + Casing",
            "customer": "John Smith",
            "description": "New well drilling, 200ft target depth, 6\" casing.",
            "status": "scheduled",
            "visits": [
                {"crew": "Drill Rig 1", "title": "Drilling Day 1", "day": 0, "start": 8, "end": 17,
                 "notes_internal": "Gate code 4521. Client will be on site.",
                 "notes_customer": "Drill rig arrives between 8-9 AM Monday."},
                {"crew": "Drill Rig 1", "title": "Drilling Day 2 + Casing", "day": 1, "start": 8, "end": 16,
                 "notes_customer": "Casing installed Tuesday."},
                {"crew": "Pump Install Crew", "title": "Pump & Pressure Tank Install", "day": 3, "start": 9, "end": 14,
                 "notes_customer": "Pump install Thursday morning."},
            ],
        },
        {
            "title": "Septic Pump-Out & Inspection",
            "customer": "Maria Garcia",
            "description": "Routine septic service.",
            "status": "scheduled",
            "visits": [
                {"crew": "Service Truck", "title": "Pump-out", "day": 0, "start": 10, "end": 12,
                 "notes_customer": "Service truck arrives between 10-11 AM."},
            ],
        },
        {
            "title": "Well Pump Replacement",
            "customer": "Robert Chen",
            "description": "Replace failed submersible pump.",
            "status": "scheduled",
            "visits": [
                {"crew": "Pump Install Crew", "title": "Pump replacement", "day": 2, "start": 8, "end": 13,
                 "notes_customer": "Crew arrives 8-9 AM Wednesday."},
            ],
        },
        {
            "title": "New 150ft Irrigation Well",
            "customer": "Patricia Williams",
            "description": "Irrigation well for 5-acre property.",
            "status": "scheduled",
            "visits": [
                {"crew": "Drill Rig 1", "title": "Drilling", "day": 4, "start": 8, "end": 17,
                 "notes_customer": "Friday — drill rig 8 AM."},
                {"crew": "Pump Install Crew", "title": "Pump install", "day": 7, "start": 9, "end": 13,
                 "notes_customer": "Monday week 2 — pump install."},
            ],
        },
    ]

    created = 0
    for spec in job_specs:
        if spec["title"] in existing_titles:
            continue
        cust_id = customers[spec["customer"]]
        job_res = (
            supabase.table("cm_jobs")
            .insert({
                "client_id": client_id,
                "customer_id": cust_id,
                "title": spec["title"],
                "description": spec["description"],
                "status": spec["status"],
            })
            .execute()
        )
        job_id = job_res.data[0]["id"]
        for v in spec["visits"]:
            supabase.table("cm_visits").insert({
                "client_id": client_id,
                "job_id": job_id,
                "crew_id": crews[v["crew"]],
                "title": v["title"],
                "start_at": at(v["day"], v["start"]),
                "end_at": at(v["day"], v["end"]),
                "notes_internal": v.get("notes_internal"),
                "notes_customer": v.get("notes_customer"),
            }).execute()
        created += 1
    print(f"  - jobs+visits seeded: {created} new (others already existed)")


def main():
    print("Seeding Crew Management demo data...")
    print("\n[1/4] Demo Client tenant")
    client_id = upsert_client()

    print("\n[2/4] Demo Owner login")
    upsert_owner(client_id)

    print("\n[3/4] Crews and customers")
    crews = upsert_crews(client_id)
    customers = upsert_customers(client_id)

    print("\n[4/4] Jobs and visits (rolling 2-week window)")
    seed_jobs_and_visits(client_id, crews, customers)

    print("\n" + "=" * 50)
    print("Demo seeded successfully.")
    print(f"  Login email:    {DEMO_OWNER_EMAIL}")
    print(f"  Login password: {DEMO_OWNER_PASSWORD}")
    print("=" * 50)


if __name__ == "__main__":
    main()
