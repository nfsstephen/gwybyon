# Crew Management — Embed Widget Install Guide

How to drop the Gateway-hosted Job Tracker into any contractor's website
once they've purchased the Crew Management add-on.

---

## Prerequisites

Before you install the embed on a contractor's site, confirm:

1. **The contractor has paid for the Crew Management add-on** (live invoice or confirmed subscription)
2. **A `cm_clients` tenant record exists** in Supabase for this contractor
3. **The tenant is `is_active = true`** (backend returns 404 if inactive, so the embed will show "Link Unavailable" if this flag is off)
4. **At least one job exists** with a `public_token` you can test against

---

## Step 1 — Decide the tracker page URL on the contractor's site

Pick a clean, memorable path. Recommended patterns:

- `/my-job/{token}` — friendly and descriptive
- `/track/{token}` — short
- `/schedule/{token}` — emphasizes the calendar aspect

Whichever you choose, the **contractor's site needs to extract the token from the URL** and pass it to the iframe.

---

## Step 2 — Paste the snippet on that page

In the contractor's site, on the page you picked above, paste this HTML:

```html
<!-- Gateway AI — Crew Management Job Tracker -->
<iframe
  src="https://gwyai.com/track/JOB_TOKEN_HERE?embed=1"
  style="width:100%; border:none; min-height:1400px; display:block;"
  title="Your Job Tracker"
  loading="lazy">
</iframe>
```

Replace `JOB_TOKEN_HERE` with the actual `public_token` of the customer's job
(see Step 3 for how to do this dynamically).

### If you're using React (recommended for new sites):

```jsx
import { useParams } from 'react-router-dom';

export default function JobTrackerPage() {
  const { token } = useParams(); // from route like /my-job/:token
  return (
    <iframe
      src={`https://gwyai.com/track/${token}?embed=1`}
      style={{ width: '100%', border: 'none', minHeight: '1400px', display: 'block' }}
      title="Your Job Tracker"
      loading="lazy"
    />
  );
}
```

Add the route: `<Route path="/my-job/:token" element={<JobTrackerPage />} />`

### If it's a static HTML site:

Use a simple query string parameter:

```html
<!-- Customer visits: contractor.com/tracker.html?token=abc123 -->
<iframe
  id="gw-tracker"
  style="width:100%; border:none; min-height:1400px; display:block;"
  title="Your Job Tracker"
  loading="lazy">
</iframe>
<script>
  const token = new URLSearchParams(location.search).get('token');
  document.getElementById('gw-tracker').src = `https://gwyai.com/track/${token}?embed=1`;
</script>
```

---

## Step 3 — How the contractor sends the link to their customer

The contractor (owner) logs into `gwyai.com/dashboard/crew`, opens **Jobs**,
clicks **Copy link** on the customer's job row. That copies something like:

```
https://gwyai.com/track/cc2ede64-1373-490e-a65d-01481792276b
```

**You'll need to either:**

**Option A (simplest, zero code):** Tell the contractor to just text that link directly. Works today, no site changes needed.

**Option B (polished, recommended for add-on customers):** Configure the contractor's site so that visiting `contractor.com/my-job/cc2ede64-...` shows the embedded tracker. Then the contractor texts the *contractor's* URL to the customer. You'll need to translate the Gateway-hosted token URL into your site's URL — either:

1. **Manually** for the first few customers (just swap the domain in the copy)
2. **Automatically** by adding a redirect rule on the contractor's site — but this requires a small per-site setup. For now, manual is fine.

> **Future enhancement (not needed yet):** Add a dashboard setting where the contractor enters their site URL pattern (e.g., `https://andrewswelldrilling.com/my-job/{token}`), and the "Copy link" button on the Jobs page copies the branded URL instead of the Gateway URL.

---

## Step 4 — Test on the contractor's site

Open the contractor's tracker page with a real token. You should see:

- No Gateway dark header (contractor's own header remains)
- Teal "Hi [Firstname] — here's your job with [Contractor Name]" pill at the top
- Countdown, status timeline, visits, service address, crew schedule
- No "Powered by Gateway AI Systems" footer

If anything looks wrong, check:
- Is `?embed=1` in the iframe src? (without it, you get the full standalone page)
- Does the token match a job that actually exists?
- Is the tenant's `is_active` flag true in Supabase?

---

## Step 5 — When the contractor cancels the add-on

If a contractor stops paying for Crew Management, **don't delete their data** (keeps history). Instead:

1. Flip `cm_clients.is_active = false` for their tenant
2. The `/api/cm/track/{token}` endpoint will start returning 404, so the embed will show "Link Unavailable"
3. Optionally, remove the iframe from their site — though the 404 message is polite enough that leaving it in place doesn't break anything

---

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| Iframe shows "Link Unavailable" | Bad/expired token, or tenant `is_active = false` |
| Iframe shows Gateway header + footer | `?embed=1` is missing from the src |
| Iframe is blank/white | Browser security blocking — check `X-Frame-Options` header on Gateway |
| Iframe height is too short (content cut off) | Increase `min-height` (the tracker is long when a job has many visits) |
| Customer sees "Demo Client" instead of the real contractor | Wrong token was used, or the job is attached to the wrong `client_id` |

---

## Summary — the 30-second version

1. Customer pays for Crew Management add-on
2. You create their `cm_clients` tenant in Supabase + owner login
3. You paste the 3-line iframe snippet onto one page of their site
4. They log into gwyai.com/dashboard/crew and start scheduling
5. When they tell a customer "you can see your job status at contractor.com/my-job/...", it Just Works.

One snippet. Infinite customers. Same Gateway codebase for everyone.
