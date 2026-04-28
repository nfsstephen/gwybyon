# Test Credentials

## Site Password
- Password: `123`

## Admin Dashboard (existing)
- URL: `/dashboard-login`
- Email: `admin@geogrid.com`
- Password: `admin123`

## Crew Management — Demo Owner (NEW)
- URL: `/dashboard/crew/login`
- Email: `demo@gwyai.com`
- Password: `demo123`
- Role: owner
- Tenant: "Demo Client" (public_slug: `demo-client`, industry: `well_drilling`)

This is a permanent demo tenant — usable for sales demonstrations
without exposing real customer data. Comes pre-seeded with:
- 3 crews (Drill Rig 1, Pump Install Crew, Service Truck)
- 4 customers + 4 jobs with a rolling 14-day schedule of visits
- 7 services (well_drilling preset)

### Demo seed data refreshes
Re-run anytime to refresh the rolling 14-day demo schedule:
```
cd /app/backend && python3 migrations/seed_cm_demo.py
```

### Crew Management API endpoints
- `POST /api/cm/auth/login`     — returns JWT
- `GET  /api/cm/auth/me`        — current user + client
- `GET  /api/cm/crews`          — list crews
- `GET  /api/cm/customers`      — list customers
- `GET  /api/cm/jobs`           — list jobs
- `GET  /api/cm/jobs/{id}`      — job detail + visits
- `GET  /api/cm/visits?start=&end=&crew_id=` — visits in date range
- `GET  /api/cm/track/{public_token}`  — PUBLIC (no auth) tokenized tracker data

### Live demo public tracking tokens
Sample job (John Smith — well drilling):
  https://region-payment.preview.emergentagent.com/track/cc2ede64-1373-490e-a65d-01481792276b
