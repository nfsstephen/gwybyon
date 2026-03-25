# Gateway AI Systems - Project Requirements Document

## Project Overview
Gateway AI Systems website and admin platform for BYON (Bring Your Own Number) eSIM technology and web services. Features a territory-based marketing model where businesses receive exclusive geographic zones.

## Live Site
- **Public Website**: gwyai.com
- **Admin Dashboard**: gwyai.com/admin/preview
- **GitHub Repo**: https://github.com/nfsstephen/gwybyon.git

---

## Tech Stack
- **Frontend**: React, Tailwind CSS, Lucide icons
- **Backend**: FastAPI (Python), MongoDB
- **Dashboard DB**: None currently (Supabase removed from plan; Admin Dashboard UI is mocked/retained)

---

## What's Been Implemented

### Session: March 19, 2026

#### 1. "Dirty Secret of Our Competitors" Section
- Changed messaging from keywords to **geographic location focus**
- "Traditional agencies profit by over-saturating your territory"
- Business boxes: "Active in Territory" (not "Paying for #1")
- Bottom text: "The agency gets paid 4x to crowd your market"
- Premium "Your Business" box: navy/gold styling + "Territory Locked" badge
- Visual map backgrounds (crowded grid vs. protected zone)
- Added "Conflict of Interest Guarantee" section
- Added scarcity notice about territory locking

#### 2. Strategy Section Reordering
- **#1** Market Territories (was #3)
- **#2** Cross Selling (unchanged)  
- **#3** Trucking Industry (was #1)
- Page section order updated: Market Territories appears before Cross Selling
- Badge updated to "STRATEGY 1: MARKET TERRITORIES"

#### 3. Admin Dashboard UI (Gateway AI Admin)
- New admin dashboard at `/admin/preview`
- **Stats Cards**: Territory Tokens, Territories Claimed, Pending Invitations, Contact Requests, Active Clients
- **Tabs**: Territory Tokens, Invitations, Clients, Contact Requests, Feedback
- Light/Dark mode toggle
- Mock data (ready for Supabase connection)
- Bypasses password gate

#### 4. Navigation Reorder
- Moved "Trucking (BYON)" to far right (before Subscribe)
- New order: Home | Web Services | Services & Pricing | Trucking (BYON) | Subscribe
- Signals to team that BYON marketing is lower priority

#### 5. "The Problem" Section Rewrite (Web Services Page)
- New title: "Google Changed. Your Visibility Didn't."
- New cards focused on location-first search:
  - "Location Is Now #1"
  - "Keywords Don't Matter Like They Used To"
  - "Your Ranking Changes Every Block"
  - "Customers Never Click Your Website"

### Session: March 24, 2026

#### 6. Dead Code Cleanup
Removed unused components:
- ~~FocusAreas.jsx / .css~~
- ~~PatentBanner.jsx / .css~~
- ~~IndustriesBanner.jsx / .css~~
- ~~Implementation.jsx / .css~~

Note: 29 UI library components in `/components/ui/` are unused but kept for potential future use.

---

## Current File Structure (Key Files)

```
/app/frontend/src/
├── pages/
│   ├── HomePage.jsx
│   ├── WebServiceV2Page.jsx
│   ├── AdminPreviewPage.jsx (new dashboard UI)
│   ├── dashboard/ (existing dashboards - need DB connection)
│   └── [industry pages]
├── components/
│   ├── MarketTerritories.jsx (Dirty Secret section)
│   ├── StrategyOverview.jsx (3-prong strategy)
│   ├── Navigation.jsx
│   └── [other components]
└── routes/
    ├── SiteRoutes.jsx
    └── DashboardRoutes.jsx

/app/backend/
├── server.py (dashboard routes conditional on DATABASE_URL)
├── routes/
│   ├── auth.py, chat.py, status.py (active)
│   └── dashboard_*.py (dormant until Supabase connected)
└── .env
```

---

## To-Do List

### High Priority (P0)
- [ ] **Connect Stripe to Subscribe page payment flow** — backend checkout session, webhooks, frontend Stripe Checkout integration
- [ ] **Add "Proprietary Tools" statement to Products/Services page** - "We provide proprietary tools to measure and control your website effectiveness yourself. No more flying blind or depending on someone else to control your advertising - the sign on the front of your business."

### Medium Priority (P1)
- [ ] Replace demo county map data with real, extensive Florida county data
- [ ] Hide/secure dashboard login credentials (currently displayed for dev)

### Low Priority (P2)
- [ ] PDF export for territory reports
- [ ] Email notification system for invitations
- [ ] Analytics and reporting features
- [ ] Clean up unused UI library components (optional)
- [ ] Admin Dashboard — keep UI, may find future use (no DB connection planned currently)

### Removed from Backlog (Feb 2026)
- ~~Token infrastructure & backend for territory map claiming~~ — Not needed
- ~~Connect Admin Dashboard to Supabase~~ — Removed; dashboard UI retained for potential future use
- **Dormant code audit:** Check for backend routes, models, or frontend components tied to Token system or Supabase that can be flagged/cleaned up

---

## Context Management Notes

**For future sessions:**
- This PRD.md serves as checkpoint
- Push code before starting new chat sessions
- New session = fresh context, re-read this file to get up to speed

**Warning thresholds:**
- 70% context: "Recommend pushing soon"
- 85% context: "Critical - push and start fresh"

---

### Session: March 23, 2026 (Fork 2)

#### 7. Subscribe Page — Dual Option Cards
- Each website service card now has two sub-options: "Build/Rebuild" and "Upgrade"
- New Website Build: Build = $100, Upgrade = $50
- Rebuild & Optimize: Rebuild = $300, Upgrade = $150
- Only one option selectable at a time (radio behavior across all cards)
- Upgrade note: "Someone will be in contact with you to learn what upgrades you desire"
- Invoice dynamically reflects selected option and price

#### 8. Services & Pricing Page — Prominent Pricing
- Prices redesigned to be dramatically larger and eye-catching
- $150 (New Build) and $300 (Rebuild) shown in large green hero text
- Labels "INITIAL PRODUCTION" / "REBUILD FEE" below
- Upgrade prices clearly displayed beneath divider

#### 9. Territory Pricing & County Map (March 23, 2026)
**Services & Pricing Page:**
- Removed both "$1,497 One-Time Territory Activation Fee" banners
- Moved "Core Differentiator" (Exclusive Territory Protection) section up, right after Transparency box
- Added Small Market County ($300/area) and Large Market County ($1,200/area) pricing cards
- Italicized note: market size = customer density, not geographic area

**Subscribe Page:**
- Removed territory fee from invoice
- Added Step 2: "Select Your Market Areas" with interactive SVG county map
- Map shows Union County FL (home) + 5 surrounding counties (Baker, Bradford, Columbia, Alachua, Clay)
- Counties color-coded: blue = small market ($300), amber = large market ($1,200)
- Clickable counties toggle selection, add to invoice
- Territory summary chips show selected counties with market tags and prices
- Step ordering: 1. Website Service → 2. Market Areas → 3. Service Tier

**County Classification (Demo Data — Union County FL area):**
- Small Market: Union, Baker, Bradford ($300 each)
- Large Market: Columbia, Alachua, Clay ($1,200 each)

#### 10. Product CTAs & Layout Fix (March 23, 2026)
- Merged 4 product boxes into 2 on Services page: one Website card (New Build $150 / Rebuild $300 side by side) and one Territory card (Small Market $300 / Large Market $1,200 side by side)
- Each product card has a single CTA: "Get Started" → /subscribe#step-website, "Claim Territory" → /subscribe#step-market-areas
- Subscribe page: county selection details moved into the main invoice panel as a subsection, map gets full width
- Invoice shows each selected county individually with SM/LG tags and individual prices

#### 11. Invoice UX & Persistence (March 23, 2026 — Fork 3)
- Reordered invoice: Website → Territories → Tier (Free Month note) → Due Today → Monthly Recurring
- "Due Today" now only shows upfront costs (Website + Territories), excluding monthly fee
- First month marked "Free" on the service tier line
- Switched Subscribe page state persistence from `sessionStorage` to `localStorage`
- All UI/UX spacing and CTA placement refinements completed

---

### Session: Feb 2026 (Fork 4 — Current)
- Updated backlog: Removed Token infrastructure and Supabase connection tasks
- Admin Dashboard UI retained for potential future use (no DB wiring planned)
- Noted need for dormant code audit (Token/Supabase-related code)
- P0 next task: Stripe payment integration on Subscribe page

#### 12. Business Details + Highcharts Map Drilldown (Feb 2026)
- Added Step 2: Business Details form (Name, Address, City, Zip, Phone, Country)
- All fields persist in localStorage
- Replaced old SVG county map with Highcharts Map Drilldown in Step 3
- Country field drives map: USA → shows full US states map
- Click any state → drills down to all counties in that state
- Click counties to select as exclusive market territories ($300/territory)
- County maps loaded dynamically from @highcharts/map-collection
- Selected territories shown as removable chips below the map
- Invoice auto-updates with county names and territory pricing
- "Back to USA" button to navigate back to state level
- Renumbered steps: 1. Website → 2. Business Details → 3. Market Areas → 4. Service Tier

*Last Updated: Feb 2026*
