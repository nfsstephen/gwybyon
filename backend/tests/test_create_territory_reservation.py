"""Tests for the Territory Reservation System.

Verifies:
- POST /api/contracts/create-territory creates Region with status='reserved' + reserved_at
- POST /api/contracts/confirm-territory/{id} flips status reserved -> confirmed
- POST /api/contracts/release-territory/{id} deletes reserved Region + industry territory rows
- POST /api/contracts/release-territory/{id} blocks release of confirmed territories
- GET /api/contracts/region-colors?category=... returns 'status' field
- GET /api/contracts/region-colors without category returns only defaults
- Default rows (category_id=null) remain untouched

Cleans up created Region rows and industry-specific territory rows after the suite.
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
DEFAULT_SNAPSHOT = []


@pytest.fixture(scope="module", autouse=True)
def cleanup_after_tests():
    # Snapshot Florida default rows BEFORE
    r = requests.get(
        f"{SUPABASE_URL}/rest/v1/territories?state=eq.Florida&category_id=is.null&select=id,region_id,category_id",
        headers=SB_HEADERS, timeout=15,
    )
    if r.status_code == 200:
        DEFAULT_SNAPSHOT.extend(r.json())
    print(f"\n[setup] snapshotted {len(DEFAULT_SNAPSHOT)} default Florida rows")

    yield

    # Cleanup industry-specific territory rows + Region rows
    for rid in list(CREATED_REGION_IDS):
        try:
            requests.delete(
                f"{SUPABASE_URL}/rest/v1/territories?region_id=eq.{rid}&category_id=not.is.null",
                headers=SB_HEADERS, timeout=10,
            )
            requests.delete(
                f"{SUPABASE_URL}/rest/v1/Region?id=eq.{rid}",
                headers=SB_HEADERS, timeout=10,
            )
        except Exception as e:
            print(f"[cleanup] failed for region {rid}: {e}")

    # Verify defaults untouched
    r = requests.get(
        f"{SUPABASE_URL}/rest/v1/territories?state=eq.Florida&category_id=is.null&select=id,region_id,category_id",
        headers=SB_HEADERS, timeout=15,
    )
    if r.status_code == 200:
        after = {row["id"]: row.get("region_id") for row in r.json()}
        before = {row["id"]: row.get("region_id") for row in DEFAULT_SNAPSHOT}
        for tid, rid in before.items():
            assert after.get(tid) == rid, f"Default row {tid} mutated: {rid} -> {after.get(tid)}"


def _create_territory(name, counties, category="Plumbers", state="FL"):
    """Helper to create a territory and track it for cleanup."""
    r = requests.post(f"{BASE_URL}/api/contracts/create-territory", json={
        "name": name,
        "counties": counties,
        "state": state,
        "category": category,
    }, timeout=20)
    if r.status_code == 200:
        rid = r.json()["region"]["id"]
        CREATED_REGION_IDS.append(rid)
    return r


# ---------- Validation ----------

class TestValidation:
    def test_missing_category_returns_422(self):
        r = requests.post(f"{BASE_URL}/api/contracts/create-territory", json={
            "name": "TEST_NoCat",
            "counties": [{"name": "Orange", "hc_key": "us-fl-095"}],
            "state": "FL",
        }, timeout=15)
        assert r.status_code == 422, f"Expected 422, got {r.status_code}: {r.text}"

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
            "category": "NotAnIndustry_XYZ_2026",
        }, timeout=15)
        assert r.status_code == 400


# ---------- Create with Reservation status ----------

class TestCreateReservation:
    def test_create_sets_status_reserved_and_reserved_at(self):
        ts = int(time.time())
        name = f"TEST_Reserve_{ts}"
        r = _create_territory(name, [{"name": "Lake", "hc_key": "us-fl-069"}], category="Plumbers")
        assert r.status_code == 200, f"Create failed: {r.status_code} {r.text}"
        data = r.json()

        assert data["success"] is True
        region = data["region"]
        assert region["status"] == "reserved", f"Expected status='reserved', got {region.get('status')}"
        assert region.get("reserved_at"), "Expected reserved_at timestamp"
        assert region["category"] == "Plumbers"
        assert region["category_id"] is not None
        assert region["state"] == "Florida"

        # Verify Region row in DB has status=reserved
        rg = requests.get(
            f"{SUPABASE_URL}/rest/v1/Region?id=eq.{region['id']}&select=id,status,reserved_at,category_id",
            headers=SB_HEADERS, timeout=10,
        )
        assert rg.status_code == 200 and rg.json()
        row = rg.json()[0]
        assert row["status"] == "reserved"
        assert row["reserved_at"] is not None
        assert row["category_id"] == region["category_id"]

        # Verify territory rows have status=reserved + category_id
        terr = requests.get(
            f"{SUPABASE_URL}/rest/v1/territories?region_id=eq.{region['id']}&select=id,county,category_id,status,reserved_at",
            headers=SB_HEADERS, timeout=10,
        )
        assert terr.status_code == 200
        rows = terr.json()
        assert len(rows) == 1
        assert rows[0]["status"] == "reserved"
        assert rows[0]["category_id"] == region["category_id"]
        assert rows[0]["reserved_at"] is not None

    def test_create_does_not_modify_default_rows(self):
        """Default rows (category_id=null) for Lake must remain untouched."""
        before = requests.get(
            f"{SUPABASE_URL}/rest/v1/territories?state=eq.Florida&category_id=is.null&county=ilike.Lake*&select=id,region_id,category_id,status",
            headers=SB_HEADERS, timeout=10,
        )
        assert before.status_code == 200
        snap = before.json()
        assert snap, "Default Lake row not found"
        assert snap[0]["category_id"] is None
        # status on default rows should be null (not reserved/confirmed)
        assert snap[0].get("status") in (None, ""), \
            f"Default row should not have a status, got {snap[0].get('status')}"


# ---------- region-colors with status ----------

class TestRegionColorsStatus:
    def test_region_colors_with_category_includes_status(self):
        """region-colors?category=Plumbers should overlay industry rows and include 'status' field."""
        rc = requests.get(
            f"{BASE_URL}/api/contracts/region-colors?state=Florida&category=Plumbers",
            timeout=15,
        )
        assert rc.status_code == 200
        data = rc.json()
        colors = data.get("colors", {})
        assert "lake" in colors, f"Lake should appear in industry-specific colors. Got keys: {list(colors.keys())[:5]}"

        # Lake should show one of TEST_Reserve_* regions with status=reserved
        lake = colors["lake"]
        assert "status" in lake, f"region-colors must include 'status' field, got: {lake}"
        assert lake["status"] == "reserved", f"Expected reserved, got {lake.get('status')}"
        assert lake["region"].startswith("TEST_Reserve_"), \
            f"Expected industry-specific region, got {lake.get('region')}"

        # Other counties should still appear via default fallback
        assert len(colors) > 1, "Should overlay defaults for non-Lake counties"

        # region_groups should also include status
        rg = data.get("region_groups", {})
        for rname, info in rg.items():
            if rname.startswith("TEST_Reserve_"):
                assert info.get("status") == "reserved"

    def test_region_colors_without_category_returns_defaults_only(self):
        rc = requests.get(f"{BASE_URL}/api/contracts/region-colors?state=Florida", timeout=15)
        assert rc.status_code == 200
        data = rc.json()
        rg = data.get("region_groups", {})
        industry_regions = [k for k in rg if k.startswith("TEST_Reserve_") or k.startswith("TEST_Plumb")]
        assert not industry_regions, \
            f"No-category request must NOT contain industry-specific regions: {industry_regions}"
        # Default colors should NOT have status set
        colors = data.get("colors", {})
        for key, info in list(colors.items())[:5]:
            assert info.get("status") is None, \
                f"Default-only response should have status=null, got {info} for {key}"


# ---------- confirm-territory ----------

class TestConfirmTerritory:
    def test_confirm_changes_status_to_confirmed(self):
        ts = int(time.time())
        r = _create_territory(f"TEST_Conf_{ts}", [{"name": "Sumter", "hc_key": "us-fl-119"}],
                              category="Plumbers")
        assert r.status_code == 200, r.text
        region_id = r.json()["region"]["id"]

        cf = requests.post(f"{BASE_URL}/api/contracts/confirm-territory/{region_id}", timeout=15)
        assert cf.status_code == 200, f"Confirm failed: {cf.status_code} {cf.text}"
        body = cf.json()
        assert body["success"] is True
        assert body["status"] == "confirmed"

        # DB verification
        rg = requests.get(
            f"{SUPABASE_URL}/rest/v1/Region?id=eq.{region_id}&select=status",
            headers=SB_HEADERS, timeout=10,
        )
        assert rg.json()[0]["status"] == "confirmed"

        terr = requests.get(
            f"{SUPABASE_URL}/rest/v1/territories?region_id=eq.{region_id}&select=status",
            headers=SB_HEADERS, timeout=10,
        )
        for t in terr.json():
            assert t["status"] == "confirmed"

    def test_confirm_already_confirmed_returns_400(self):
        ts = int(time.time())
        r = _create_territory(f"TEST_Conf2_{ts}", [{"name": "Citrus", "hc_key": "us-fl-017"}],
                              category="Plumbers")
        assert r.status_code == 200
        region_id = r.json()["region"]["id"]
        # First confirm OK
        ok = requests.post(f"{BASE_URL}/api/contracts/confirm-territory/{region_id}", timeout=15)
        assert ok.status_code == 200
        # Second confirm should fail (no longer reserved)
        bad = requests.post(f"{BASE_URL}/api/contracts/confirm-territory/{region_id}", timeout=15)
        assert bad.status_code == 400

    def test_confirm_unknown_region_returns_404(self):
        bad = requests.post(f"{BASE_URL}/api/contracts/confirm-territory/99999999", timeout=15)
        assert bad.status_code == 404


# ---------- release-territory ----------

class TestReleaseTerritory:
    def test_release_reserved_deletes_region_and_rows(self):
        ts = int(time.time())
        r = _create_territory(f"TEST_Rel_{ts}", [{"name": "Hernando", "hc_key": "us-fl-053"}],
                              category="Plumbers")
        assert r.status_code == 200
        region_id = r.json()["region"]["id"]

        # Sanity: row exists
        before = requests.get(
            f"{SUPABASE_URL}/rest/v1/territories?region_id=eq.{region_id}&select=id",
            headers=SB_HEADERS, timeout=10,
        )
        assert len(before.json()) == 1

        rel = requests.post(f"{BASE_URL}/api/contracts/release-territory/{region_id}", timeout=15)
        assert rel.status_code == 200, f"Release failed: {rel.status_code} {rel.text}"
        body = rel.json()
        assert body["success"] is True
        assert body["region_id"] == region_id

        # Region deleted
        rg = requests.get(
            f"{SUPABASE_URL}/rest/v1/Region?id=eq.{region_id}&select=id",
            headers=SB_HEADERS, timeout=10,
        )
        assert rg.json() == [], "Region should be deleted"

        # Industry-specific territory rows deleted
        after = requests.get(
            f"{SUPABASE_URL}/rest/v1/territories?region_id=eq.{region_id}&select=id",
            headers=SB_HEADERS, timeout=10,
        )
        assert after.json() == [], "Territory rows should be deleted"

        # Remove from cleanup list since already gone
        if region_id in CREATED_REGION_IDS:
            CREATED_REGION_IDS.remove(region_id)

    def test_release_confirmed_returns_400(self):
        ts = int(time.time())
        r = _create_territory(f"TEST_RelC_{ts}", [{"name": "Pasco", "hc_key": "us-fl-101"}],
                              category="Plumbers")
        assert r.status_code == 200
        region_id = r.json()["region"]["id"]

        # Confirm it first
        cf = requests.post(f"{BASE_URL}/api/contracts/confirm-territory/{region_id}", timeout=15)
        assert cf.status_code == 200

        # Now release should be blocked
        rel = requests.post(f"{BASE_URL}/api/contracts/release-territory/{region_id}", timeout=15)
        assert rel.status_code == 400, \
            f"Confirmed territory release should be blocked, got {rel.status_code}: {rel.text}"

    def test_release_unknown_region_returns_404(self):
        bad = requests.post(f"{BASE_URL}/api/contracts/release-territory/99999999", timeout=15)
        assert bad.status_code == 404

    def test_release_does_not_touch_default_rows(self):
        """After release, default Florida rows must be untouched (category_id=null)."""
        ts = int(time.time())
        r = _create_territory(f"TEST_RelDef_{ts}", [{"name": "Orange", "hc_key": "us-fl-095"}],
                              category="Electricians")
        assert r.status_code == 200
        region_id = r.json()["region"]["id"]

        # snapshot default Orange row
        before = requests.get(
            f"{SUPABASE_URL}/rest/v1/territories?state=eq.Florida&category_id=is.null&county=ilike.Orange*&select=id,region_id",
            headers=SB_HEADERS, timeout=10,
        )
        snap = before.json()[0]

        rel = requests.post(f"{BASE_URL}/api/contracts/release-territory/{region_id}", timeout=15)
        assert rel.status_code == 200

        if region_id in CREATED_REGION_IDS:
            CREATED_REGION_IDS.remove(region_id)

        after = requests.get(
            f"{SUPABASE_URL}/rest/v1/territories?id=eq.{snap['id']}&select=id,region_id,category_id",
            headers=SB_HEADERS, timeout=10,
        )
        row = after.json()[0]
        assert row["category_id"] is None
        assert row["region_id"] == snap["region_id"], \
            "Default Orange row region_id should be unchanged after release"
