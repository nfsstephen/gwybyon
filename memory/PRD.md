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
- **Dashboard DB**: Supabase (planned, not yet connected)

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
- [ ] Connect Admin Dashboard to Supabase database
- [ ] Build Territory Token backend infrastructure
- [ ] Token → Email Invite → Map View flow
- [ ] Sync with India tech team on architecture

### Medium Priority (P1)
- [ ] Hide/secure dashboard login credentials (currently displayed for dev)
- [ ] Real data integration for all dashboard tabs
- [ ] Territory map visualization for token recipients

### Low Priority (P2)
- [ ] PDF export for territory reports
- [ ] Email notification system for invitations
- [ ] Analytics and reporting features
- [ ] Clean up unused UI library components (optional)

---

## Token System Concept

**Flow:**
1. Admin creates Territory Token (defines geographic zone + industry)
2. Token attached to email invitation
3. Recipient clicks link, uses token
4. Token unlocks map showing their proposed territory
5. Recipient accepts → Territory claimed and locked

**Database Tables Needed (Supabase):**
- `territory_tokens` - token_id, territory, zip_codes, industry, status, created_at
- `invitations` - recipient, email, token_id, sent_at, status (pending/opened/accepted)
- `clients` - business info, territory_id, subscription status
- `contact_requests` - inbound inquiries
- `feedback` - client feedback and ratings

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

*Last Updated: March 24, 2026*
