# Gateway AI Systems - Project Requirements Document

## Project Overview
Gateway AI Systems website and admin platform for BYON (Bring Your Own Number) eSIM technology and web services. Features a territory-based marketing model where businesses receive exclusive geographic zones.

## Live Site
- **Public Website**: gwyai.com
- **Admin Dashboard**: gwyai.com/dashboards
- **GitHub Repo**: https://github.com/nfsstephen/gwybyon.git

---

## What's Been Implemented

### Session: March 19, 2026

#### 1. "Dirty Secret of Our Competitors" Section Updates
- Changed "Your investment actually works" → "Your investment is protected"
- Added bidding war caption about over-saturation
- Updated left column to focus on geographic territory problem (not keywords)
- Business boxes changed to "Active in Territory" messaging
- Bottom text: "The agency gets paid 4x to crowd your market"
- Premium "Your Business" box with navy/gold styling + "Territory Locked" badge
- Added visual map backgrounds (crowded grid vs. protected zone)
- Added "Conflict of Interest Guarantee" section
- Added scarcity notice

#### 2. Strategy Section Reordering
- Reordered marketing strategy priorities:
  - **#1** Market Territories (was #3)
  - **#2** Cross Selling (unchanged)
  - **#3** Trucking Industry (was #1)
- Updated page section order: Market Territories now appears before Cross Selling
- Updated strategy badge from "STRATEGY 3" to "STRATEGY 1"

#### 3. Admin Dashboard UI (Gateway AI Admin)
- Built new admin dashboard matching reference design
- **Stats Cards**: Territory Tokens, Territories Claimed, Pending Invitations, Contact Requests, Active Clients
- **Tabs**: Territory Tokens, Invitations, Clients, Contact Requests, Feedback
- Light/Dark mode toggle
- Mock data for UI preview
- Accessible at `/admin/preview` (bypasses password gate)

---

## To-Do List

### High Priority (P0)
- [ ] Connect Admin Dashboard to Supabase database
- [ ] Build Territory Token backend infrastructure
- [ ] Token → Email Invite → Map View flow

### Medium Priority (P1)
- [ ] Hide/secure dashboard login credentials (currently displayed for dev)
- [ ] Real data integration for all dashboard tabs
- [ ] Territory map visualization for token recipients

### Low Priority (P2)
- [ ] PDF export for territory reports
- [ ] Email notification system for invitations
- [ ] Analytics and reporting features

---

## Technical Notes

### Token System Concept
- Tokens represent Market Territories
- Attached to email invitations
- Recipients use token to view proposed territory map
- Flow: Create Token → Send Invite → View Map → Accept/Claim Territory

### Database Tables Needed (Supabase)
- `territory_tokens` - Token ID, territory info, zip codes, industry, status
- `invitations` - Recipient, token, sent date, status (pending/opened/accepted)
- `clients` - Business info, territory claimed, subscription status
- `contact_requests` - Inbound inquiries
- `feedback` - Client feedback and ratings

---

## Team Notes
- India tech team to be consulted before proceeding with token development
- Dashboard credentials security to be addressed in future session

---

*Last Updated: March 19, 2026*
