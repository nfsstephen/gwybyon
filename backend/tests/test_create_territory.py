"""Tests for POST /api/contracts/create-territory endpoint.
Cleans up Region rows it creates and restores territories.region_id."""
import os
import time
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://contract-deposit.preview.emergentagent.com").rstrip("/")
SUPABASE_URL = os.environ.get("SUPABASE_URL", "https://wtciaejpiepqkrkaymzg.supabase.co")
SUPABASE_KEY = os.environ.get(
    "SUPABASE_SERVICE_KEY",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0Y2lhZWpwaWVwcWtya2F5bXpnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzQzNjQwMywiZXhwIjoyMDg5MDEyNDAzfQ.wbS_XYKN1idBwim4B5HfzTfDTHl8y9LRhBYrppBI4-0",
)
SB_HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=representation",
}

# Track created region ids and original territory state for cleanup
CREATED_REGION_IDS = []
ORIGINAL_TERRITORIES = {}  # id -> original region_id


def _snapshot_territory(territory_id):
    if territory_id in ORIGINAL_TERRITORIES:
        return
    r = requests.get(
        f"{SUPABASE_URL}/rest/v1/territories?id=eq.{territory_id}&select=id,region_id",
        headers=SB_HEADERS, timeout=10,
    )
    if r.status_code == 200 and r.json():
        ORIGINAL_TERRITORIES[territory_id] = r.json()[0].get("region_id")


@pytest.fixture(scope="module", autouse=True)
def cleanup_after_tests():
    # Snapshot Alachua + Marion before tests (they may be modified)
    for tid in (25, 65):
        _snapshot_territory(tid)
    yield
    # Restore territories first
    for tid, original_region_id in ORIGINAL_TERRITORIES.items():
        body = {"region_id": original_region_id}
        requests.patch(
            f"{SUPABASE_URL}/rest/v1/territories?id=eq.{tid}",
            headers=SB_HEADERS, json=body, timeout=10,
        )
    # Delete any test-inserted territories (those with no original snapshot but we created)
    # Identify by region_id in created regions
    if CREATED_REGION_IDS:
        ids_csv = ",".join(str(i) for i in CREATED_REGION_IDS)
        # find territories pointing to these regions and delete inserted ones
        r = requests.get(
            f"{SUPABASE_URL}/rest/v1/territories?region_id=in.({ids_csv})&select=id",
            headers=SB_HEADERS, timeout=10,
        )
        if r.status_code == 200:
            for row in r.json():
                if row["id"] not in ORIGINAL_TERRITORIES:
                    requests.delete(
                        f"{SUPABASE_URL}/rest/v1/territories?id=eq.{row['id']}",
                        headers=SB_HEADERS, timeout=10,
                    )
                else:
                    # restore region_id
                    requests.patch(
                        f"{SUPABASE_URL}/rest/v1/territories?id=eq.{row['id']}",
                        headers=SB_HEADERS,
                        json={"region_id": ORIGINAL_TERRITORIES[row["id"]]},
                        timeout=10,
                    )
    # Delete created Region rows
    for rid in CREATED_REGION_IDS:
        requests.delete(
            f"{SUPABASE_URL}/rest/v1/Region?id=eq.{rid}",
            headers=SB_HEADERS, timeout=10,
        )


# ---------- Validation tests ----------

class TestValidation:
    def test_missing_name_returns_400(self):
        r = requests.post(f"{BASE_URL}/api/contracts/create-territory", json={
            "name": "", "counties": [{"name": "Orange", "hc_key": "us-fl-095"}], "state": "FL",
        }, timeout=15)
        assert r.status_code == 400, f"Expected 400, got {r.status_code}: {r.text}"

    def test_whitespace_name_returns_400(self):
        r = requests.post(f"{BASE_URL}/api/contracts/create-territory", json={
            "name": "   ", "counties": [{"name": "Orange", "hc_key": "us-fl-095"}], "state": "FL",
        }, timeout=15)
        assert r.status_code == 400

    def test_empty_counties_returns_400(self):
        r = requests.post(f"{BASE_URL}/api/contracts/create-territory", json={
            "name": "TEST_Empty", "counties": [], "state": "FL",
        }, timeout=15)
        assert r.status_code == 400


# ---------- Core creation flow ----------

class TestCreateTerritory:
    def test_create_territory_with_existing_county_alachua(self):
        """Alachua exists in DB with potentially trailing space. Verify it is matched and updated."""
        # Snapshot Alachua before
        _snapshot_territory(25)
        ts = int(time.time())
        name = f"TEST_Region_{ts}"
        r = requests.post(f"{BASE_URL}/api/contracts/create-territory", json={
            "name": name,
            "counties": [{"name": "Alachua", "hc_key": "us-fl-001"}],
            "state": "FL",
        }, timeout=20)
        assert r.status_code == 200, f"Failed: {r.status_code} {r.text}"
        data = r.json()
        assert data["success"] is True
        assert data["region"]["name"] == name
        assert data["region"]["state"] == "Florida"
        assert data["region"]["color"].startswith("#")
        assert "id" in data["region"]
        CREATED_REGION_IDS.append(data["region"]["id"])

        # County result: should be updated (not created) because Alachua already exists
        assert len(data["counties"]) == 1
        assert data["counties"][0]["county"] == "Alachua"
        assert data["counties"][0]["action"] == "updated", (
            f"Expected 'updated' for existing Alachua (handles trailing whitespace), got {data['counties'][0]}"
        )

        # Verify Region row exists in Supabase
        rg = requests.get(
            f"{SUPABASE_URL}/rest/v1/Region?id=eq.{data['region']['id']}&select=*",
            headers=SB_HEADERS, timeout=10,
        )
        assert rg.status_code == 200 and rg.json(), "Region row not persisted"
        assert rg.json()[0]["name"] == name

        # Verify Alachua's region_id was updated to new region
        terr = requests.get(
            f"{SUPABASE_URL}/rest/v1/territories?id=eq.25&select=id,region_id,county",
            headers=SB_HEADERS, timeout=10,
        )
        assert terr.status_code == 200 and terr.json()
        assert terr.json()[0]["region_id"] == data["region"]["id"], "Alachua region_id not updated"

    def test_create_territory_appears_in_region_colors(self):
        """After creation, GET /region-colors should include the new territory."""
        ts = int(time.time())
        name = f"TEST_RegionColors_{ts}"
        # Snapshot Marion
        _snapshot_territory(65)
        r = requests.post(f"{BASE_URL}/api/contracts/create-territory", json={
            "name": name,
            "counties": [{"name": "Marion", "hc_key": "us-fl-083"}],
            "state": "Florida",
        }, timeout=20)
        assert r.status_code == 200, r.text
        data = r.json()
        CREATED_REGION_IDS.append(data["region"]["id"])

        # Now query region-colors for Florida
        rc = requests.get(f"{BASE_URL}/api/contracts/region-colors?state=Florida", timeout=15)
        assert rc.status_code == 200
        rc_data = rc.json()
        region_groups = rc_data.get("region_groups", {})
        assert name in region_groups, (
            f"Newly created region '{name}' not found in region-colors response. Keys: {list(region_groups.keys())}"
        )
        assert "marion" in region_groups[name]["counties"], "Marion not in counties for new region"

    def test_state_abbreviation_resolved(self):
        """State 'FL' should resolve to 'Florida' in DB."""
        ts = int(time.time())
        name = f"TEST_AbbrCheck_{ts}"
        r = requests.post(f"{BASE_URL}/api/contracts/create-territory", json={
            "name": name,
            "counties": [{"name": "Lake", "hc_key": "us-fl-069"}],
            "state": "FL",
        }, timeout=20)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["region"]["state"] == "Florida"
        CREATED_REGION_IDS.append(data["region"]["id"])
        # Snapshot the lake territory if it existed
        rg = requests.get(
            f"{SUPABASE_URL}/rest/v1/territories?region_id=eq.{data['region']['id']}&select=id",
            headers=SB_HEADERS, timeout=10,
        )
        if rg.status_code == 200:
            for row in rg.json():
                _snapshot_territory(row["id"])
