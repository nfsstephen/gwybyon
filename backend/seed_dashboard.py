"""Seed script to populate GeoGrid dashboards with mock data in MongoDB."""
import asyncio
import os
import sys
import random
import uuid
from pathlib import Path
from datetime import date, datetime, timezone, timedelta

sys.path.insert(0, str(Path(__file__).parent))
from dotenv import load_dotenv
load_dotenv(Path(__file__).parent / '.env')

import bcrypt
from motor.motor_asyncio import AsyncIOMotorClient

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]


def hash_pw(pw: str) -> str:
    return bcrypt.hashpw(pw.encode(), bcrypt.gensalt()).decode()


async def seed():
    existing = await db.dashboard_users.find_one()
    if existing:
        print("Database already seeded. Dropping and re-seeding...")
        await db.dashboard_users.drop()
        await db.business_profiles.drop()
        await db.scan_results.drop()
        await db.action_feed.drop()
        await db.gbp_metrics.drop()
        await db.api_usage.drop()
        await db.content_queue.drop()

    admin_id = str(uuid.uuid4())
    client_id = str(uuid.uuid4())
    tech_id = str(uuid.uuid4())
    profile_id = str(uuid.uuid4())

    # --- Users ---
    await db.dashboard_users.insert_many([
        {
            "id": admin_id,
            "email": "admin@geogrid.com",
            "password_hash": hash_pw("admin123"),
            "full_name": "Steve Gateway",
            "role": "admin",
            "is_active": True,
            "created_at": datetime.now(timezone.utc).isoformat(),
        },
        {
            "id": client_id,
            "email": "client@geogrid.com",
            "password_hash": hash_pw("client123"),
            "full_name": "Maria Chen",
            "role": "client",
            "is_active": True,
            "created_at": datetime.now(timezone.utc).isoformat(),
        },
        {
            "id": tech_id,
            "email": "tech@geogrid.com",
            "password_hash": hash_pw("tech123"),
            "full_name": "Alex Developer",
            "role": "technical",
            "is_active": True,
            "created_at": datetime.now(timezone.utc).isoformat(),
        },
    ])
    print(f"Created users: admin={admin_id}, client={client_id}, tech={tech_id}")

    # --- Business Profile ---
    await db.business_profiles.insert_one({
        "id": profile_id,
        "user_id": client_id,
        "business_name": "Chen's Family Restaurant",
        "address": "742 Evergreen Terrace",
        "city": "Austin",
        "state": "TX",
        "zip_code": "78701",
        "phone": "(512) 555-0198",
        "website": "https://chensfamilyrestaurant.com",
        "category": "Restaurant",
        "local_authority_score": 62,
        "subscription_tier": 2,
        "subscription_status": "active",
    })
    print(f"Created business profile: {profile_id}")

    # --- Scan Results (last 6 months, weekly) ---
    scans = []
    base_score = 35
    for weeks_ago in range(24, -1, -1):
        scan_date = datetime.now(timezone.utc) - timedelta(weeks=weeks_ago)
        score = min(base_score + (24 - weeks_ago) * random.uniform(0.5, 1.5), 95)
        score = int(score)
        grid = []
        for r in range(5):
            row = []
            for c in range(5):
                dist = abs(r - 2) + abs(c - 2)
                base_rank = max(1, dist * 2 + random.randint(-2, 3))
                rank = min(base_rank, 20)
                color = "green" if rank <= 3 else ("yellow" if rank <= 7 else "red")
                row.append({"rank": rank, "color": color, "lat_offset": (r - 2) * 0.005, "lng_offset": (c - 2) * 0.005})
            grid.append(row)
        scans.append({
            "id": str(uuid.uuid4()),
            "business_profile_id": profile_id,
            "scan_date": scan_date.isoformat(),
            "local_authority_score": score,
            "grid_data": grid,
            "metrics": {
                "nap_consistency": random.randint(60, 95),
                "review_count": random.randint(10, 80),
                "avg_rating": round(random.uniform(3.5, 4.9), 1),
                "citation_count": random.randint(15, 60),
                "website_authority": random.randint(20, 70),
            },
        })
        base_score = score
    await db.scan_results.insert_many(scans)

    # --- Action Feed ---
    actions_data = [
        ("sync", "Synced NAP data to Apple Maps", "apple_maps", "completed", 1),
        ("sync", "Synced NAP data to Google Maps", "google_maps", "completed", 2),
        ("content", "Neighborhood Post: 'Best Brunch Spots in Downtown Austin'", "google_maps", "completed", 3),
        ("sync", "Synced to Yelp Business Directory", "yelp", "completed", 5),
        ("optimization", "Optimized Google Business Profile categories", "google_maps", "completed", 6),
        ("review", "Auto-responded to 3 new Google reviews", "google_maps", "completed", 7),
        ("content", "Created geo-tagged post: 'Austin Food Week Specials'", "google_maps", "completed", 8),
        ("sync", "Verified listing on Bing Places", "bing", "completed", 10),
        ("content", "Neighborhood Post: 'Live Music & Dinner Combo This Weekend'", "google_maps", "completed", 12),
        ("optimization", "Updated structured data markup on website", "website", "completed", 14),
        ("sync", "Synced to TripAdvisor", "tripadvisor", "completed", 15),
        ("review", "Flagged negative review for owner attention", "google_maps", "pending", 16),
        ("content", "Scheduled post: 'Spring Menu Launch at Chen's'", "google_maps", "pending", 0),
    ]
    actions = []
    for atype, desc, platform, status, days_ago in actions_data:
        actions.append({
            "id": str(uuid.uuid4()),
            "business_profile_id": profile_id,
            "action_type": atype,
            "description": desc,
            "platform": platform,
            "status": status,
            "created_at": (datetime.now(timezone.utc) - timedelta(days=days_ago)).isoformat(),
        })
    await db.action_feed.insert_many(actions)

    # --- GBP Metrics (last 90 days) ---
    metrics = []
    for days_ago in range(90, -1, -1):
        d = date.today() - timedelta(days=days_ago)
        is_weekend = d.weekday() >= 5
        base_calls = 8 if is_weekend else 5
        metrics.append({
            "id": str(uuid.uuid4()),
            "business_profile_id": profile_id,
            "date": d.isoformat(),
            "calls": random.randint(base_calls, base_calls + 10),
            "directions": random.randint(3, 15),
            "map_views": random.randint(40, 150),
            "website_clicks": random.randint(5, 30),
        })
    await db.gbp_metrics.insert_many(metrics)

    # --- API Usage (last 30 days) ---
    services = [
        ("DataForSEO", 5, 15, 0.02, 0.05),
        ("SerpApi", 10, 30, 0.01, 0.03),
        ("OpenAI GPT-4", 0, 0, 0.005, 0.015),
        ("Google Places API", 20, 50, 0.005, 0.01),
    ]
    usage_records = []
    for days_ago in range(30, -1, -1):
        d = date.today() - timedelta(days=days_ago)
        for svc_name, min_c, max_c, min_cost, max_cost in services:
            credits = round(random.uniform(min_c, max_c), 2) if max_c > 0 else 0
            tokens = random.randint(500, 5000) if "GPT" in svc_name else 0
            cost = round(random.uniform(min_cost, max_cost), 4)
            usage_records.append({
                "id": str(uuid.uuid4()),
                "service_name": svc_name,
                "credits_used": credits,
                "tokens_consumed": tokens,
                "cost": cost,
                "date": d.isoformat(),
            })
    await db.api_usage.insert_many(usage_records)

    # --- Content Queue ---
    content_items = [
        ("neighborhood_post", "Best Weekend Brunch in East Austin", "Discover the hidden gems of East Austin's brunch scene. From artisan coffee shops to family-owned taquerias, your neighborhood is full of amazing flavors. Chen's Family Restaurant is proud to be part of this vibrant food community, serving up our signature dim sum brunch every Saturday and Sunday from 10am-2pm.", "approved"),
        ("review_response", "Response to John M.'s 5-star review", "Thank you so much, John! We're thrilled you enjoyed the Szechuan peppercorn noodles. Our chef puts tremendous care into sourcing local ingredients. We look forward to welcoming you back - ask about our new tasting menu next time!", "approved"),
        ("neighborhood_post", "Austin Food Week: Our Special Menu", "Austin Food Week is here! Join us at Chen's Family Restaurant for an exclusive 5-course tasting menu that celebrates the fusion of traditional Chinese cooking with Austin's vibrant food culture. Only 30 seats available per night. Book now!", "pending"),
        ("listing_update", "Holiday Hours Update", "Updated holiday hours for Chen's Family Restaurant: Christmas Eve 11am-8pm, Christmas Day CLOSED, New Year's Eve 11am-11pm (special menu available), New Year's Day 12pm-8pm.", "pending"),
        ("neighborhood_post", "Live Music Fridays at Chen's", "We're excited to announce Live Music Fridays! Every Friday evening from 7-9pm, enjoy acoustic performances from local Austin musicians while dining on our award-winning dishes. No cover charge - just great food and great music in the heart of downtown.", "pending"),
    ]
    queue = []
    for ctype, title, text, status in content_items:
        queue.append({
            "id": str(uuid.uuid4()),
            "business_profile_id": profile_id,
            "content_type": ctype,
            "title": title,
            "content_text": text,
            "status": status,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "reviewed_at": (datetime.now(timezone.utc) - timedelta(days=2)).isoformat() if status != "pending" else None,
        })
    await db.content_queue.insert_many(queue)

    print("Seed data created successfully!")
    print("\nTest Credentials:")
    print("  Admin:     admin@geogrid.com / admin123")
    print("  Client:    client@geogrid.com / client123")
    print("  Technical: tech@geogrid.com / tech123")


if __name__ == "__main__":
    asyncio.run(seed())
