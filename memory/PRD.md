# Gateway AI Systems — PRD

## Original Problem Statement
Modify an existing Gateway AI Systems website to refine marketing copy, pricing UI, and build a robust, interactive subscription checkout flow. Specifically, integrate a Business Details form, implement a Highcharts drill-down map with auto-selection and multi-selection of counties based on user input, and migrate the backend database from MongoDB to Supabase.

## Architecture
- **Frontend**: React (CRA) with Highcharts Maps, Lucide icons, Shadcn UI
- **Backend**: FastAPI with Supabase REST client (primary) + SQLAlchemy/asyncpg (dashboard only)
- **Database**: Supabase (PostgreSQL) — contracts, deposits, chat, status tables via REST; dashboard users via SQLAlchemy
- **Deployment**: Railway (frontend + backend)
- **Map**: Highcharts with @highcharts/map-collection (US State → County drilldown)

## Navigation Structure
Home | Seven Industries | Five Tools | Web Services | Services & Pricing | Subscribe

## Key Pages
1. **Home** — Landing page
2. **Seven Industries** — Consolidated tabbed page (Well & Septic, Plumbers, Electricians, Air & Heating, Pest Control, Real Estate, Roofing)
3. **Five Tools** — GeoGrid platform tools (Geo-Health Scanner, Entity-Sync Dashboard, Content Engine, Review Magnet, ROI Tracker)
4. **Web Services** — Hero: "Is Your Business Invisible across your entire market territory?", GeoGrid explanation, site construction/hosting/maintenance
5. **Services & Pricing** — Tier plans and pricing
6. **Subscribe** — 3-step checkout: Website Service → Business Details & Market Areas → Service Tier → Invoice with 25% Deposit flow

## Subscribe Page Flow
- Step 1: Select Website Service (Build or Rebuild)
- Step 2: Business Details (Name, Address, City, State dropdown — 48 continental states, Zip, Email optional, Industry Type dropdown) & Market Areas (Highcharts map, auto-drills by city)
- Step 3: Select Service Tier (Starter, Growth, Dominance)
- Invoice: Shows line items, total, 25% deposit, balance due, independent warning banners per step
- Deposit: Creates contract in Supabase, records deposit, generates PDF, shows success with download

## Supabase Tables
- `contracts` — business info, territories, tier, pricing, deposit/balance, status
- `deposits` — payment records linked to contracts
- `chat_messages`, `chat_sessions`, `status_checks` — migrated from MongoDB
- `territories` — 67 Florida counties (county, state, country)
- `category` — industry categories with type (small/medium/large), e.g., Plumber, Electricians, Pest Control Service, Well & Septic Co.
- `category_business_mapping` — FK to category, maps each category+type to a base price
- `territory_pricings` — territory-specific pricing overrides (county + category + category_type → amount)
- Dashboard tables (via Supabase REST): users, business_profiles, etc.

## Admin Dashboard
- URL: /dashboard/login
- Credentials: admin@geogrid.com / admin123
- Tabs: Contracts (real data from Supabase), Territory Tokens, Invitations, Clients, Contact Requests, Feedback
- Contracts tab shows: contract #, date, business, industry, territories, total, deposit, balance, status, PDF download

## API Endpoints
- `POST /api/auth/verify-site` — Site password gate (password: 123)
- `POST /api/auth/verify-admin` — Admin password
- `GET /api/contracts/` — List all contracts
- `POST /api/contracts/create` — Create new contract
- `POST /api/contracts/{id}/deposit` — Record deposit payment
- `GET /api/contracts/{id}/pdf` — Download contract PDF
- `POST /api/contracts/territory-pricing` — Look up territory pricing by county + category from `territory_pricings` table
- `POST /api/dashboard/auth/login` — Dashboard login

## What's Been Implemented
- [x] Highcharts drill-down map (State → County) with auto-geocoding by city
- [x] Multi-territory selection on map with dynamic pricing
- [x] MongoDB → Supabase migration (complete)
- [x] Business Details form with State dropdown (48 states), Industry Type dropdown (7 industries)
- [x] Seven Industries consolidated page (tabbed)
- [x] Five Tools page with hero
- [x] Web Services page cleanup (removed redundant sections)
- [x] Updated marketing copy (hero, problem section)
- [x] 25% Deposit flow (contract creation, Supabase storage, PDF generation)
- [x] Contracts tab on Admin Dashboard (real data)
- [x] Independent invoice warning banners
- [x] Map geocoding state-scoping fix (Apr 6, 2026) — City searches now append the selected state name to Nominatim queries, preventing ambiguous results (e.g., "Union" resolving to Illinois instead of Florida)
- [x] Railway deployment fixes (env vars, route prefixes, graceful startup)
- [x] Refactored: deleted 7 old BigMarket pages, unused components/CSS
- [x] Dynamic territory pricing from Supabase `territory_pricings` table (Apr 1, 2026) — Invoice fetches per-county price based on county+industry from DB instead of hardcoded $300
- [x] Category + category_business_mapping integration (Apr 1, 2026) — Industry dropdown populated from `category` table, fallback pricing from `category_business_mapping` when no territory-specific price exists
- [x] Full territory_pricings population (Apr 1, 2026) — Joined territories × category × category_business_mapping where territory.type = cbm.type. 268 rows (21 small × 4 cats + 15 medium × 4 cats + 31 large × 4 cats). Industry dropdown updated with all 12 DB categories.

## Backlog (Prioritized)
### P0
- Stripe integration — wire real payments to deposit + balance buttons
- Customer Portal — login, view contract, pay balance, deadline tracking

### P1
- Migrate dashboard from SQLAlchemy to Supabase REST client (eliminate direct PostgreSQL dependency)
- Automated follow-up system — countdown timer on contracts (e.g., 30 days), balance-due reminders surfaced on admin dashboard
- Email delivery — send contract PDF to customer + copy to admin (SendGrid/Resend)
- Real Florida county data — verify Highcharts map accuracy
- Secure admin dashboard credentials for production

### P2
- PDF exports for territory reports
- Analytics & reporting
- Dormant code audit (unused Token backend code)

## Credentials
- Site password: `123`
- Admin dashboard: admin@geogrid.com / admin123
- Client dashboard: client@geogrid.com / client123
- Tech dashboard: tech@geogrid.com / tech123

## Railway Environment Variables (Backend)
- SUPABASE_URL
- SUPABASE_SERVICE_KEY
- DATABASE_URL (PostgreSQL — for dashboard only)
- SITE_PASSWORD
- ADMIN_PASSWORD
- JWT_SECRET

*Last Updated: Apr 18, 2026*

## Post-Fork Checklist (MUST verify after every fork)
- [ ] Cache-busting code present in `/app/frontend/public/index.html` — includes: meta tags (no-cache, no-store, must-revalidate), cache API clearing script, service worker unregister script. DO NOT REMOVE THESE.
- [ ] `APP_VERSION` in `/app/frontend/src/pages/SubscribePage.jsx` is current — bump if prices or saved state shape changed
- [ ] `emergentintegrations` is NOT in `/app/backend/requirements.txt` (breaks Railway deploy)
