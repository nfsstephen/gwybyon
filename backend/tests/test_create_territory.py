"""Tests for industry-specific territory creation.

Verifies that POST /api/contracts/create-territory:
- Requires `category` (Pydantic 422 if missing)
- Creates Region row with category_id
- CREATES new territory rows with category_id (does NOT touch defaults)
- region-colors with category overlays industry rows on defaults
- region-colors without category returns only defaults

Cleans up created Region rows and industry-specific territory rows.
Default rows (category_id=null) must remain untouched.
"""
import os
import time
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL").rstrip("/")
SUPABASE_URL = "https://wtciaejpiepqkrkaymzg.supabase.co"
SUPABASE_KEY = (
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9."
    "eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0Y2lhZWpwaWVwcWtya2F5bXpnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzQzNjQwMywiZXhwIjoyMDg5MDEyNDAzfQ."
    "wbS_XYKN1idBwim4B5HfzTfDTHl8y9LRhBYrppBI4-0"
)
SB_HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=representation",
}

CREATED_REGION_IDS = []
CREATED_TERRITORY_IDS = []
DEFAULT_SNAPSHOT = []  # list of {id, region_id, category_id} BEFORE tests


@pytest.fixture(scope="module", autouse=True)
def cleanup_after_tests():
    # Snapshot ALL default (category_id=null) rows for Florida BEFORE the tests
    r = requests.get(
        f"{SUPABASE_URL}/rest/v1/territories?state=eq.Florida&category_id=is.null&select=id,region_id,category_id",
        headers=SB_HEADERS, timeout=15,
    )
    if r.status_code == 200:
        DEFAULT_SNAPSHOT.extend(r.json())
    print(f"\n[setup] snapshotted {len(DEFAULT_SNAPSHOT)} default Florida rows")

    yield

    # Delete industry-specific territory rows pointing to created regions
    if CREATED_REGION_IDS:
        ids_csv = ",".join(str(i) for i in CREATED_REGION_IDS)
        r = requests.get(
            f"{SUPABASE_URL}/rest/v1/territories?region_id=in.({ids_csv})&select=id,category_id",
            headers=SB_HEADERS, timeout=15,
        )
        if r.status_code == 200:
            for row in r.json():
                # Only delete industry-specific rows (category_id not null)
                if row.get("category_id") is not None:
                    requests.delete(
                        f"{SUPABASE_URL}/rest/v1/territories?id=eq.{row['id']}",
                        headers=SB_HEADERS, timeout=10,
                    )

    # Delete created Region rows
    for rid in CREATED_REGION_IDS:
        requests.delete(
            f"{SUPABASE_URL}/rest/v1/Region?id=eq.{rid}",
            headers=SB_HEADERS, timeout=10,
        )

    # Verify defaults untouched
    r = requests.get(
        f"{SUPABASE_URL}/rest/v1/territories?state=eq.Florida&category_id=is.null&select=id,region_id,category_id",
        headers=SB_HEADERS, timeout=15,
    )
    if r.status_code == 200:
        after = {row["id"]: row.get("region_id") for row in r.json()}
        before = {row["id"]: row.get("region_id") for row in DEFAULT_SNAPSHOT}
        for tid, rid in before.items():
            if after.get(tid) != rid:
                print(f"[WARN] default territory {tid} region_id changed: {rid} -> {after.get(tid)}")


# ---------- Validation ----------

class TestValidation:
    def test_missing_category_returns_422(self):
        """Pydantic should reject missing 'category' field with 422."""
        r = requests.post(f"{BASE_URL}/api/contracts/create-territory", json={
            "name": "TEST_NoCat",
            "counties": [{"name": "Orange", "hc_key": "us-fl-095"}],
            "state": "FL",
        }, timeout=15)
        assert r.status_code == 422, f"Expected 422 for missing category, got {r.status_code}: {r.text}"

    def test_empty_category_returns_400(self):
        r = requests.post(f"{BASE_URL}/api/contracts/create-territory", json={
            "name": "TEST_EmptyCat",
            "counties": [{"name": "Orange", "hc_key": "us-fl-095"}],
            "state": "FL",
            "category": "",
        }, timeout=15)
        assert r.status_code == 400

    def test_unknown_category_returns_400(self):
        r = requests.post(f"{BASE_URL}/api/contracts/create-territory", json={
            "name": "TEST_BadCat",
            "counties": [{"name": "Orange", "hc_key": "us-fl-095"}],
            "state": "FL",
            "category": "NotAnIndustry_XYZ",
        }, timeout=15)
        assert r.status_code == 400

    def test_missing_name_returns_400(self):
        r = requests.post(f"{BASE_URL}/api/contracts/create-territory", json={
            "name": "",
            "counties": [{"name": "Orange", "hc_key": "us-fl-095"}],
            "state": "FL",
            "category": "Well Drilling",
        }, timeout=15)
        assert r.status_code == 400

    def test_empty_counties_returns_400(self):
        r = requests.post(f"{BASE_URL}/api/contracts/create-territory", json={
            "name": "TEST_NoCounties",
            "counties": [],
            "state": "FL",
            "category": "Well Drilling",
        }, timeout=15)
        assert r.status_code == 400


# ---------- Create flow ----------

class TestIndustryCreate:
    def test_create_assigns_category_id_and_creates_new_rows(self):
        """Verify that for a fresh industry+county, a new territory row is CREATED
        (not 'updated') with category_id set, and the default row remains untouched."""
        ts = int(time.time())
        # Use Plumbers to keep distinct from prior runs
        category = "Plumbers"
        name = f"TEST_Plumb_{ts}"

        # Snapshot default Orange row before
        before = requests.get(
            f"{SUPABASE_URL}/rest/v1/territories?state=eq.Florida&category_id=is.null&county=ilike.Orange*&select=id,region_id",
            headers=SB_HEADERS, timeout=10,
        )
        assert before.status_code == 200
        default_orange = before.json()
        assert default_orange, "Expected default Orange row to exist"
        default_orange_id = default_orange[0]["id"]
        default_orange_region_before = default_orange[0]["region_id"]

        # Get expected category_id (Plumbers)
        cat_r = requests.get(
            f"{SUPABASE_URL}/rest/v1/category?name=eq.Plumbers&select=id",
            headers=SB_HEADERS, timeout=10,
        )
        assert cat_r.status_code == 200 and cat_r.json(), "Plumbers category not found"
        plumbers_cat_id = cat_r.json()[0]["id"]

        r = requests.post(f"{BASE_URL}/api/contracts/create-territory", json={
            "name": name,
            "counties": [{"name": "Orange", "hc_key": "us-fl-095"}],
            "state": "FL",
            "category": category,
        }, timeout=20)
        assert r.status_code == 200, f"Failed: {r.status_code} {r.text}"
        data = r.json()
        assert data["success"] is True
        assert data["region"]["category"] == category
        assert data["region"]["category_id"] == plumbers_cat_id
        assert data["region"]["state"] == "Florida"
        new_region_id = data["region"]["id"]
        CREATED_REGION_IDS.append(new_region_id)

        # County action should be 'created' since no industry-specific row existed
        assert data["counties"][0]["county"] == "Orange"
        assert data["counties"][0]["action"] == "created", (
            f"First creation for {category}+Orange should be 'created', got: {data['counties'][0]}"
        )

        # Verify Region row has category_id
        rg = requests.get(
            f"{SUPABASE_URL}/rest/v1/Region?id=eq.{new_region_id}&select=id,name,category_id",
            headers=SB_HEADERS, timeout=10,
        )
        assert rg.status_code == 200 and rg.json()
        assert rg.json()[0]["category_id"] == plumbers_cat_id

        # Verify NEW territory row was inserted with category_id
        terr = requests.get(
            f"{SUPABASE_URL}/rest/v1/territories?region_id=eq.{new_region_id}&select=id,county,category_id,region_id",
            headers=SB_HEADERS, timeout=10,
        )
        assert terr.status_code == 200
        new_rows = terr.json()
        assert len(new_rows) == 1, f"Expected 1 new territory row, got {len(new_rows)}"
        assert new_rows[0]["category_id"] == plumbers_cat_id
        assert new_rows[0]["county"].strip().lower() == "orange"
        CREATED_TERRITORY_IDS.append(new_rows[0]["id"])

        # CRITICAL: Default Orange row must remain untouched
        after = requests.get(
            f"{SUPABASE_URL}/rest/v1/territories?id=eq.{default_orange_id}&select=id,region_id,category_id",
            headers=SB_HEADERS, timeout=10,
        )
        assert after.status_code == 200 and after.json()
        assert after.json()[0]["category_id"] is None, "Default row category_id should remain null"
        assert after.json()[0]["region_id"] == default_orange_region_before, (
            "Default row region_id should be unchanged"
        )

    def test_region_colors_with_category_overlays_defaults(self):
        """region-colors?category=Plumbers should show Plumbers-specific region for Orange,
        but default regions for other counties."""
        rc = requests.get(
            f"{BASE_URL}/api/contracts/region-colors?state=Florida&category=Plumbers",
            timeout=15,
        )
        assert rc.status_code == 200
        data = rc.json()
        colors = data.get("colors", {})
        # Orange should map to one of the TEST_Plumb_* regions
        assert "orange" in colors, "Orange not in region-colors response"
        orange_region = colors["orange"]["region"]
        assert orange_region.startswith("TEST_Plumb_"), (
            f"Orange should show industry-specific region, got '{orange_region}'"
        )

        # A different county (e.g. Marion) should still show default region
        # (since we only created Plumbers row for Orange)
        if "marion" in colors:
            marion_region = colors["marion"]["region"]
            assert not marion_region.startswith("TEST_Plumb_"), (
                "Marion should fall back to default since no Plumbers-specific row was created for it"
            )

    def test_region_colors_without_category_returns_defaults_only(self):
        """region-colors with no category should show only default regions, not industry-specific."""
        rc = requests.get(f"{BASE_URL}/api/contracts/region-colors?state=Florida", timeout=15)
        assert rc.status_code == 200
        data = rc.json()
        region_groups = data.get("region_groups", {})
        # No TEST_Plumb_* regions should appear in default-only response
        industry_regions = [k for k in region_groups.keys() if k.startswith("TEST_Plumb_")]
        assert not industry_regions, (
            f"Default-only request should NOT contain industry-specific regions, found: {industry_regions}"
        )

    def test_second_call_same_industry_county_updates(self):
        """Calling create-territory again for same industry+county should 'update'
        the previously-created industry row (not insert another)."""
        ts = int(time.time())
        category = "Plumbers"
        name = f"TEST_Plumb2_{ts}"
        r = requests.post(f"{BASE_URL}/api/contracts/create-territory", json={
            "name": name,
            "counties": [{"name": "Orange", "hc_key": "us-fl-095"}],
            "state": "FL",
            "category": category,
        }, timeout=20)
        assert r.status_code == 200, r.text
        data = r.json()
        CREATED_REGION_IDS.append(data["region"]["id"])
        assert data["counties"][0]["action"] == "updated", (
            f"Second call for same industry+county should be 'updated', got {data['counties'][0]}"
        )
