"""
Tests for Crew Management — Services catalog (Services CRUD, seed-defaults,
industries, job/visit service linking, enrichment, tenant isolation, and
public tracker leak-prevention).
"""
import os
import time
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://region-payment.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api/cm"

DEMO_EMAIL = "demo@gwyai.com"
DEMO_PASSWORD = "demo123"
PUBLIC_TOKEN = "cc2ede64-1373-490e-a65d-01481792276b"

# Track service ids created in this run so tests can clean themselves up
_created_service_ids = []


@pytest.fixture(scope="session")
def token():
    r = requests.post(f"{API}/auth/login", json={"email": DEMO_EMAIL, "password": DEMO_PASSWORD}, timeout=30)
    assert r.status_code == 200, f"login failed: {r.status_code} {r.text}"
    data = r.json()
    tok = data.get("token") or data.get("access_token")
    assert tok, f"no token in login response: {data}"
    return tok


@pytest.fixture(scope="session")
def auth_headers(token):
    return {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}


# ---------- Auth ----------
def test_login_returns_jwt():
    r = requests.post(f"{API}/auth/login", json={"email": DEMO_EMAIL, "password": DEMO_PASSWORD}, timeout=30)
    assert r.status_code == 200
    d = r.json()
    assert d.get("token") or d.get("access_token")


# ---------- Services list ----------
def test_list_services_tenant_scoped(auth_headers):
    r = requests.get(f"{API}/services", headers=auth_headers, timeout=30)
    assert r.status_code == 200, r.text
    data = r.json()
    assert "services" in data
    # Seeded well_drilling has 7 services
    assert len(data["services"]) >= 7, f"expected >=7 services, got {len(data['services'])}"
    for s in data["services"]:
        assert s["is_active"] is True


def test_list_services_include_inactive(auth_headers):
    r = requests.get(f"{API}/services", params={"include_inactive": "true"}, headers=auth_headers, timeout=30)
    assert r.status_code == 200
    active_only = requests.get(f"{API}/services", headers=auth_headers, timeout=30).json()["services"]
    all_ = r.json()["services"]
    assert len(all_) >= len(active_only)


def test_list_industries(auth_headers):
    # retry once if hot-reload 500
    for _ in range(2):
        r = requests.get(f"{API}/services/industries", headers=auth_headers, timeout=30)
        if r.status_code == 200:
            break
        time.sleep(1)
    assert r.status_code == 200, r.text
    industries = r.json()["industries"]
    keys = {i.get("key") or i.get("value") or i.get("id") or i for i in industries}
    # Ensure each of the 5 shows up in some form
    names_flat = str(industries).lower()
    for must in ("well_drilling", "septic", "plumbing", "hvac", "generic"):
        assert must in names_flat, f"missing industry {must} in {industries}"


# ---------- Create / duplicate / update / delete ----------
def _unique_name(prefix="TEST_Service"):
    return f"{prefix}_{uuid.uuid4().hex[:8]}"


def test_create_service(auth_headers):
    name = _unique_name()
    payload = {
        "name": name,
        "description": "pytest-created",
        "default_duration_hours": 3.5,
        "default_price_cents": 29900,
        "color": "#123456",
        "sort_order": 99,
    }
    r = requests.post(f"{API}/services", json=payload, headers=auth_headers, timeout=30)
    assert r.status_code in (200, 201), r.text
    body = r.json()
    assert body.get("id")
    assert body["name"] == name
    _created_service_ids.append(body["id"])

    # Verify persistence via GET list
    lst = requests.get(f"{API}/services", headers=auth_headers, timeout=30).json()["services"]
    assert any(s["id"] == body["id"] for s in lst)


def test_create_duplicate_service_returns_400(auth_headers):
    name = _unique_name()
    r1 = requests.post(f"{API}/services", json={"name": name}, headers=auth_headers, timeout=30)
    assert r1.status_code in (200, 201), r1.text
    _created_service_ids.append(r1.json()["id"])
    r2 = requests.post(f"{API}/services", json={"name": name}, headers=auth_headers, timeout=30)
    assert r2.status_code == 400, f"expected 400 on dup, got {r2.status_code}: {r2.text}"


def test_update_service(auth_headers):
    # Create fresh
    name = _unique_name()
    r = requests.post(f"{API}/services", json={"name": name, "color": "#000000"}, headers=auth_headers, timeout=30)
    sid = r.json()["id"]
    _created_service_ids.append(sid)

    new_name = name + "_upd"
    upd = {"name": new_name, "color": "#ff00ff", "default_duration_hours": 5, "default_price_cents": 55555, "sort_order": 42}
    r2 = requests.patch(f"{API}/services/{sid}", json=upd, headers=auth_headers, timeout=30)
    assert r2.status_code == 200, r2.text
    data = r2.json()
    assert data["name"] == new_name
    assert data["color"].lower() == "#ff00ff"
    assert int(data["default_price_cents"]) == 55555


def test_soft_delete_service(auth_headers):
    r = requests.post(f"{API}/services", json={"name": _unique_name()}, headers=auth_headers, timeout=30)
    sid = r.json()["id"]
    _created_service_ids.append(sid)

    d = requests.delete(f"{API}/services/{sid}", headers=auth_headers, timeout=30)
    assert d.status_code == 200, d.text
    # Not in active list
    active = requests.get(f"{API}/services", headers=auth_headers, timeout=30).json()["services"]
    assert not any(s["id"] == sid for s in active)
    # Still present in include_inactive
    all_ = requests.get(f"{API}/services", params={"include_inactive": "true"}, headers=auth_headers, timeout=30).json()["services"]
    match = [s for s in all_ if s["id"] == sid]
    assert match and match[0]["is_active"] is False


def test_hard_delete_referenced_service_rejected(auth_headers):
    # Use a seeded service that is referenced (there are backfilled jobs/visits)
    services = requests.get(f"{API}/services", headers=auth_headers, timeout=30).json()["services"]
    # find one that is referenced by a job
    jobs = requests.get(f"{API}/jobs", headers=auth_headers, timeout=30).json()
    job_list = jobs.get("jobs", jobs) if isinstance(jobs, dict) else jobs
    ref_svc_ids = {j.get("service_id") for j in job_list if j.get("service_id")}
    assert ref_svc_ids, "no referenced services found — cannot test hard-delete rejection"
    target = next(s for s in services if s["id"] in ref_svc_ids)
    r = requests.delete(f"{API}/services/{target['id']}", params={"hard": "true"}, headers=auth_headers, timeout=30)
    assert r.status_code == 400, f"expected 400 for referenced hard-delete, got {r.status_code}: {r.text}"


# ---------- Seed defaults ----------
def test_seed_defaults_idempotent(auth_headers):
    r1 = requests.post(f"{API}/services/seed-defaults", json={"industry": "well_drilling"}, headers=auth_headers, timeout=30)
    assert r1.status_code == 200, r1.text
    d1 = r1.json()
    # Already seeded → skipped count > 0, created count should be 0
    assert d1["industry"] == "well_drilling"
    # Run again — still idempotent
    r2 = requests.post(f"{API}/services/seed-defaults", json={"industry": "well_drilling"}, headers=auth_headers, timeout=30)
    assert r2.status_code == 200
    d2 = r2.json()
    assert d2["created"] == 0, f"expected 0 created on re-seed, got {d2['created']}"


# ---------- Jobs + services ----------
@pytest.fixture(scope="session")
def any_service_id(auth_headers):
    services = requests.get(f"{API}/services", headers=auth_headers, timeout=30).json()["services"]
    return services[0]["id"]


@pytest.fixture(scope="session")
def second_service_id(auth_headers):
    services = requests.get(f"{API}/services", headers=auth_headers, timeout=30).json()["services"]
    return services[1]["id"]


@pytest.fixture(scope="session")
def any_customer_id(auth_headers):
    r = requests.get(f"{API}/customers", headers=auth_headers, timeout=30)
    assert r.status_code == 200, r.text
    d = r.json()
    lst = d.get("customers", d) if isinstance(d, dict) else d
    assert lst, "no customers"
    return lst[0]["id"]


@pytest.fixture(scope="session")
def any_crew_id(auth_headers):
    r = requests.get(f"{API}/crews", headers=auth_headers, timeout=30)
    assert r.status_code == 200
    d = r.json()
    lst = d.get("crews", d) if isinstance(d, dict) else d
    return lst[0]["id"] if lst else None


def test_jobs_enriched_with_service_fields(auth_headers):
    r = requests.get(f"{API}/jobs", headers=auth_headers, timeout=30)
    assert r.status_code == 200
    d = r.json()
    jobs = d.get("jobs", d) if isinstance(d, dict) else d
    # at least one job with service enrichment
    enriched = [j for j in jobs if j.get("service_name") and j.get("service_color")]
    assert enriched, f"expected some jobs enriched with service_name/color; jobs={jobs[:2]}"


def test_create_job_with_service_and_update_and_clear(auth_headers, any_customer_id, any_service_id, second_service_id):
    # Create
    payload = {
        "customer_id": any_customer_id,
        "title": f"TEST_Job_{uuid.uuid4().hex[:6]}",
        "status": "draft",
        "service_id": any_service_id,
    }
    r = requests.post(f"{API}/jobs", json=payload, headers=auth_headers, timeout=30)
    assert r.status_code in (200, 201), r.text
    job = r.json()
    job_id = job.get("id") or (job.get("job") or {}).get("id")
    assert job_id, f"no id in create job response: {job}"

    # Update to another service
    r2 = requests.patch(f"{API}/jobs/{job_id}", json={"service_id": second_service_id}, headers=auth_headers, timeout=30)
    assert r2.status_code == 200, r2.text

    # Clear
    r3 = requests.patch(f"{API}/jobs/{job_id}", json={"service_id": None}, headers=auth_headers, timeout=30)
    assert r3.status_code == 200, r3.text

    # Verify via GET
    jobs = requests.get(f"{API}/jobs", headers=auth_headers, timeout=30).json()
    lst = jobs.get("jobs", jobs) if isinstance(jobs, dict) else jobs
    match = next((j for j in lst if j["id"] == job_id), None)
    assert match is not None
    assert match.get("service_id") is None

    # Cleanup — delete job
    requests.delete(f"{API}/jobs/{job_id}", headers=auth_headers, timeout=30)


def test_visits_enriched_and_fallback(auth_headers, any_customer_id, any_service_id, any_crew_id):
    from datetime import datetime, timedelta, timezone
    # Create a job WITH a service
    jr = requests.post(f"{API}/jobs", json={
        "customer_id": any_customer_id,
        "title": f"TEST_FallbackJob_{uuid.uuid4().hex[:5]}",
        "status": "draft",
        "service_id": any_service_id,
    }, headers=auth_headers, timeout=30)
    assert jr.status_code in (200, 201), jr.text
    job_id = jr.json().get("id") or jr.json().get("job", {}).get("id")

    # Create visit WITHOUT service_id to test fallback
    start = datetime.now(timezone.utc) + timedelta(days=2)
    end = start + timedelta(hours=2)
    vr = requests.post(f"{API}/visits", json={
        "job_id": job_id,
        "crew_id": any_crew_id,
        "title": "TEST_visit_fallback",
        "start_at": start.isoformat(),
        "end_at": end.isoformat(),
        "status": "scheduled",
    }, headers=auth_headers, timeout=30)
    assert vr.status_code in (200, 201), vr.text
    visit_id = vr.json().get("id") or vr.json().get("visit", {}).get("id")

    # List visits in window
    lr = requests.get(f"{API}/visits", params={
        "start": (start - timedelta(days=1)).isoformat(),
        "end": (end + timedelta(days=1)).isoformat(),
    }, headers=auth_headers, timeout=30)
    assert lr.status_code == 200, lr.text
    vd = lr.json()
    vlist = vd.get("visits", vd) if isinstance(vd, dict) else vd
    me = next((v for v in vlist if v["id"] == visit_id), None)
    assert me is not None, "created visit not in list"
    # Fallback: visit had no service_id but job had one → enrichment should populate service_name/color
    assert me.get("service_name"), f"visit should fallback to parent job service_name: {me}"
    assert me.get("service_color"), f"visit should fallback to parent job service_color: {me}"

    # Cleanup
    requests.delete(f"{API}/visits/{visit_id}", headers=auth_headers, timeout=30)
    requests.delete(f"{API}/jobs/{job_id}", headers=auth_headers, timeout=30)


# ---------- Cross-tenant isolation ----------
def test_cross_tenant_service_isolation(auth_headers):
    # Random UUID not belonging to this tenant → expect 404 on update
    bogus = str(uuid.uuid4())
    r = requests.patch(f"{API}/services/{bogus}", json={"name": "x"}, headers=auth_headers, timeout=30)
    assert r.status_code == 404


# ---------- Public tracker must NOT leak service info ----------
def test_public_tracker_no_service_leak():
    r = requests.get(f"{API}/track/{PUBLIC_TOKEN}", timeout=30)
    assert r.status_code == 200, r.text
    blob = r.text.lower()
    # must not contain service keys
    assert "service_name" not in blob, "public tracker leaked service_name!"
    assert "service_color" not in blob, "public tracker leaked service_color!"
    assert "service_id" not in blob, "public tracker leaked service_id!"
    data = r.json()
    # sanity: has expected keys
    assert "job" in data and "visits" in data


# ---------- Cleanup (best effort) ----------
def test_zz_cleanup_created_services(auth_headers):
    for sid in list(set(_created_service_ids)):
        try:
            requests.delete(f"{API}/services/{sid}", params={"hard": "true"}, headers=auth_headers, timeout=10)
        except Exception:
            pass
