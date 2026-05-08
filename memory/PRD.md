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
Home | Eight Industries | Five Tools | Web Services | Services & Pricing | Contact Us | Subscribe

## Key Pages
1. **Home** — Landing page with Domain Freedom section
2. **Eight Industries** — Consolidated tabbed page (Well Drilling, Septic, Plumbers, Electricians, Air & Heating, Pest Control, Real Estate, Roofing)
3. **Five Tools** — GeoGrid platform tools
4. **Web Services** — Hero, GeoGrid explanation, site construction/hosting/maintenance
5. **Services & Pricing** — Tier plans and pricing
6. **Contact Us** — Cal.com scheduling embed with availability text
7. **Subscribe** — 3-step checkout: Website Service → Business Details & Market Areas → Service Tier → Invoice with 25% Deposit flow

## Subscribe Page Flow
- Step 1: Select Website Service (Build or Rebuild)
- Step 2: Business Details (Name, Address, City, State dropdown — 48 continental states, Zip, Email optional, Industry Type dropdown attached above map) & Market Areas (Highcharts map, drills directly by state selection)
- Create New Territory panel: industry-specific territory creation with two-step confirmation and reservation system
- Step 3: Select Service Tier (Standard, Premium, Full Suite)
- Invoice: Shows line items, total, 25% deposit, balance due, independent warning banners per step

## Supabase Tables
- `contracts` — business info, territories, tier, pricing, deposit/balance, status
- `deposits` — payment records linked to contracts
- `territories` — county, state, country, type (1=Small, 2=Same, 3=Large), region_id (FK to Region), category_id (FK to category, nullable), status (reserved/confirmed/null), reserved_at
- `Region` — id, region_code, name, coverage_area, color, state, category_id (FK to category, nullable), status (reserved/confirmed/null), reserved_at
- `category` — id, name (8 industries: Well Drilling, Plumbers, Electricians, Air & Heating Co., Pest Control Services, Real Estate Brokers, Roofing Co., Septic Tank Installation & Service)
- `DefaultPricing` — TypeId, CategoryId, Price
- `county_type` — id, name (Small/Same/Large)
- Dashboard tables (via Supabase REST): users, business_profiles, etc.

## Industry-Specific Territory System
- Each industry has its own territory map. The same county can belong to different regions for different industries.
- `category_id` on `territories` and `Region` tables enables per-industry territory/region assignments.
- Existing rows with `category_id = null` are defaults shown for all industries.
- Industry-specific rows (category_id set) override defaults for their industry only.
- The `region-colors` endpoint accepts optional `category` param and returns industry-specific regions first, falling back to defaults for uncovered counties.

## Territory Reservation System
- When a user creates a new territory, it gets `status = "reserved"` with a `reserved_at` timestamp.
- Reserved territories appear on the map with muted colors and dashed borders, blocking selection by others.
- When the 25% deposit is paid, the territory is confirmed via `POST /api/contracts/confirm-territory/{region_id}`.
- If the customer backs out, an admin can release the reservation via `POST /api/contracts/release-territory/{region_id}`, which deletes the industry-specific Region and territory rows, restoring the map to defaults.
- Only reserved territories can be released. Confirmed territories are permanent.

## Region Group Discount
- If a user selects ALL counties within a region, a 25% discount is automatically applied to the invoice for those counties.

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
- `POST /api/contracts/territory-pricing` — Look up territory pricing by county + category
- `GET /api/contracts/region-colors` — Get county→region color mapping (accepts state, category params)
- `GET /api/contracts/taken-territories` — Get counties locked by paid contracts
- `GET /api/contracts/categories` — Get all categories with pricing
- `POST /api/contracts/create-territory` — Create new industry-specific territory (reserved)
- `POST /api/contracts/confirm-territory/{region_id}` — Confirm reserved territory after deposit
- `POST /api/contracts/release-territory/{region_id}` — Release reserved territory (admin)
- `POST /api/dashboard/auth/login` — Dashboard login

## What's Been Implemented
- [x] Highcharts drill-down map (State → County) with direct state drill-in
- [x] Multi-territory selection on map with dynamic pricing
- [x] MongoDB → Supabase migration (complete)
- [x] Business Details form with State dropdown (48 states), Industry Type dropdown (8 industries)
- [x] Eight Industries consolidated page (renamed from Seven)
- [x] Five Tools page
- [x] Web Services page
- [x] Contact Us page with Cal.com embed
- [x] Region color-coding on map based on Region table
- [x] Region Group Discount (25% when all counties in a region selected)
- [x] 25% Deposit flow (contract creation, Supabase storage, PDF generation)
- [x] Admin Dashboard with contracts tab
- [x] Domain Freedom section on homepage
- [x] Microsoft Clarity analytics tracking
- [x] Aggressive browser cache clearing in index.html
- [x] Industry dropdown attached directly above map
- [x] Create New Territory UI panel with industry validation
- [x] Industry-specific territory system (category_id on Region + territories)
- [x] Territory reservation system (reserved/confirmed status with muted map display)
- [x] Two-step confirmation flow for territory creation
- [x] Confirm/Release territory endpoints
- [x] Map re-renders per-industry with category-aware color caching
- [x] Refactored SubscribePage.jsx (1005→459 lines) into 6 modules: constants, WebsiteSelection, BusinessForm, CreateTerritoryPanel, TierSelection, InvoiceSummary

## Backlog (Prioritized)
### P0
- Stripe integration — wire real payments to deposit + balance buttons (MUST use integration_playbook_expert_v2)
- Customer Portal — login, view contract, pay balance, deadline tracking
- Connect deposit payment to auto-confirm reserved territories
- Admin dashboard: manage/release reserved territories, set reservation expiry timeline

### P1
- Email delivery — send contract PDF to customer + copy to admin upon deposit
- 30-day countdown timer for balance payments with admin dashboard reminders

### P2
- PDF exports for territory reports
- Analytics & reporting

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

*Last Updated: Apr 25, 2026*

## Post-Fork Checklist (MUST verify after every fork)
- [ ] Cache-busting code present in `/app/frontend/public/index.html`
- [ ] `APP_VERSION` in `/app/frontend/src/pages/SubscribePage.jsx` is current (now 2.3) — bump if prices or saved state shape changed
- [ ] `emergentintegrations` is NOT in `/app/backend/requirements.txt` (breaks Railway deploy)
