from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import Optional
from database import supabase
from datetime import datetime, timezone
import uuid
import io
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/contracts", tags=["contracts"])



@router.get("/taken-territories")
async def get_taken_territories(industry: str = ""):
    """Return county IDs/names locked by contracts that have a paid deposit."""
    if not industry:
        return {"taken": []}

    result = supabase.table("contracts").select("selected_territories, industry, status").execute()
    contracts = result.data or []

    taken = []
    industry_lower = industry.strip().lower()
    for c in contracts:
        c_industry = (c.get("industry") or "").strip().lower()
        # Only lock territories where the deposit has actually been paid
        if c_industry == industry_lower and c.get("status") in ("deposit_paid", "active"):
            territories = c.get("selected_territories") or []
            for t in territories:
                taken.append({"id": t.get("id", ""), "name": t.get("name", "")})

    return {"taken": taken}


@router.get("/region-colors")
async def get_region_colors(state: str = "", category: str = ""):
    """Return county → region color mapping and region group totals for a given state.
    When category (industry) is provided, returns industry-specific regions first,
    then fills in with default (null category_id) regions for uncovered counties.
    Includes status (reserved/confirmed/null) for each county and region group."""
    if not state:
        return {"colors": {}, "region_groups": {}}
    try:
        # Resolve category to category_id
        cat_id = None
        if category:
            cat_result = supabase.table("category").select("id, name").execute()
            cat_map = {c["name"].strip().lower(): c["id"] for c in (cat_result.data or [])}
            cat_id = cat_map.get(category.strip().lower())

        # Fetch territories for the given state that have a region_id
        territories = supabase.table("territories").select("county, region_id, category_id, status").eq("state", state).not_.is_("region_id", "null").execute()
        t_rows = territories.data or []
        if not t_rows:
            return {"colors": {}, "region_groups": {}}

        # Fetch all regions (with category_id and status)
        regions = supabase.table("Region").select("id, name, color, category_id, status").execute()
        region_map = {r["id"]: r for r in (regions.data or [])}

        # Separate into industry-specific and default territory rows
        industry_rows = []
        default_rows = []
        for t in t_rows:
            t_cat = t.get("category_id")
            if cat_id and t_cat == cat_id:
                industry_rows.append(t)
            elif t_cat is None:
                default_rows.append(t)

        # Industry-specific rows take priority; fill remaining from defaults
        covered_counties = set()
        colors = {}
        region_groups = {}

        # First pass: industry-specific
        for t in industry_rows:
            region = region_map.get(t.get("region_id"))
            if region:
                county_name = (t.get("county") or "").strip()
                county_lower = county_name.lower()
                covered_counties.add(county_lower)
                territory_status = t.get("status") or region.get("status")
                colors[county_lower] = {
                    "color": region["color"],
                    "region": region["name"],
                    "status": territory_status,
                }
                rname = region["name"]
                if rname not in region_groups:
                    region_groups[rname] = {"color": region["color"], "counties": [], "status": territory_status}
                region_groups[rname]["counties"].append(county_lower)

        # Second pass: defaults for uncovered counties
        for t in default_rows:
            county_name = (t.get("county") or "").strip()
            county_lower = county_name.lower()
            if county_lower in covered_counties:
                continue
            region = region_map.get(t.get("region_id"))
            if region:
                colors[county_lower] = {
                    "color": region["color"],
                    "region": region["name"],
                    "status": None,
                }
                rname = region["name"]
                if rname not in region_groups:
                    region_groups[rname] = {"color": region["color"], "counties": [], "status": None}
                region_groups[rname]["counties"].append(county_lower)

        return {"colors": colors, "region_groups": region_groups}
    except Exception as e:
        logger.error(f"region-colors error for state={state}, category={category}: {e}")
        return {"colors": {}, "region_groups": {}}



@router.get("/categories")
async def get_categories():
    """Fetch categories joined with DefaultPricing and county_type to get pricing by type."""
    cats = supabase.table("category").select("*").execute()
    cat_rows = cats.data or []

    county_types = supabase.table("county_type").select("*").execute()
    ct_rows = county_types.data or []

    dp = supabase.table("DefaultPricing").select("*").execute()
    dp_rows = dp.data or []

    # Build type name lookup
    type_names = {ct["id"]: ct["name"] for ct in ct_rows}

    # Group pricing by category
    grouped = {}
    for cat in cat_rows:
        grouped[cat["id"]] = {"name": cat["name"], "types": []}

    for row in dp_rows:
        cid = row["CategoryId"]
        if cid in grouped:
            grouped[cid]["types"].append({
                "category_id": cid,
                "type": type_names.get(row["TypeId"], ""),
                "price": row["Price"],
            })

    return {"categories": list(grouped.values())}


class CreateTerritoryRequest(BaseModel):
    name: str
    counties: list[dict]  # [{ "name": "Orange", "hc_key": "us-fl-095" }]
    state: str  # Abbreviation like "FL" or full name like "Florida"
    category: str  # Industry name (e.g., "Well Drilling")


# Color palette for auto-assigning to new custom territories
TERRITORY_COLOR_PALETTE = [
    "#e63946", "#457b9d", "#2a9d8f", "#e9c46a", "#f4a261",
    "#264653", "#a8dadc", "#6d6875", "#b5838d", "#ffb4a2",
    "#06d6a0", "#118ab2", "#ef476f", "#ffd166", "#073b4c",
    "#588157", "#bc6c25", "#dda15e", "#606c38", "#283618",
]


@router.post("/create-territory")
async def create_territory(req: CreateTerritoryRequest):
    """Create a new custom territory for a specific industry:
    insert a Region row and assign counties to it, both with category_id."""
    if not req.name or not req.name.strip():
        raise HTTPException(status_code=400, detail="Territory name is required")
    if not req.counties:
        raise HTTPException(status_code=400, detail="At least one county is required")
    if not req.category or not req.category.strip():
        raise HTTPException(status_code=400, detail="Industry (category) is required")

    # Resolve category name to ID
    cat_result = supabase.table("category").select("id, name").execute()
    cat_map = {c["name"].strip().lower(): c["id"] for c in (cat_result.data or [])}
    cat_id = cat_map.get(req.category.strip().lower())
    if not cat_id:
        raise HTTPException(status_code=400, detail=f"Unknown industry: {req.category}")

    # Resolve state to full name
    state_abbr_to_name = {
        'AL':'Alabama','AK':'Alaska','AZ':'Arizona','AR':'Arkansas','CA':'California',
        'CO':'Colorado','CT':'Connecticut','DE':'Delaware','FL':'Florida','GA':'Georgia',
        'HI':'Hawaii','ID':'Idaho','IL':'Illinois','IN':'Indiana','IA':'Iowa','KS':'Kansas',
        'KY':'Kentucky','LA':'Louisiana','ME':'Maine','MD':'Maryland','MA':'Massachusetts',
        'MI':'Michigan','MN':'Minnesota','MS':'Mississippi','MO':'Missouri','MT':'Montana',
        'NE':'Nebraska','NV':'Nevada','NH':'New Hampshire','NJ':'New Jersey','NM':'New Mexico',
        'NY':'New York','NC':'North Carolina','ND':'North Dakota','OH':'Ohio','OK':'Oklahoma',
        'OR':'Oregon','PA':'Pennsylvania','RI':'Rhode Island','SC':'South Carolina',
        'SD':'South Dakota','TN':'Tennessee','TX':'Texas','UT':'Utah','VT':'Vermont',
        'VA':'Virginia','WA':'Washington','WV':'West Virginia','WI':'Wisconsin','WY':'Wyoming',
    }
    raw_state = req.state or ""
    state_full = state_abbr_to_name.get(raw_state.upper(), raw_state)
    if not state_full:
        raise HTTPException(status_code=400, detail="Valid state is required")

    try:
        # Get the next region_code for this state
        existing_regions = supabase.table("Region").select("region_code, color").eq("state", state_full).execute()
        existing_data = existing_regions.data or []
        max_code = max((r.get("region_code", 0) for r in existing_data), default=0)
        next_code = max_code + 1

        # Pick a color not already used in this state
        used_colors = {r.get("color", "").lower() for r in existing_data}
        chosen_color = "#888888"
        for color in TERRITORY_COLOR_PALETTE:
            if color.lower() not in used_colors:
                chosen_color = color
                break

        # Insert new Region row with category_id — status = reserved
        now_iso = datetime.now(timezone.utc).isoformat()
        region_result = supabase.table("Region").insert({
            "region_code": next_code,
            "name": req.name.strip(),
            "coverage_area": "Custom Territory",
            "color": chosen_color,
            "state": state_full,
            "category_id": cat_id,
            "status": "reserved",
            "reserved_at": now_iso,
        }).execute()

        if not region_result.data:
            raise HTTPException(status_code=500, detail="Failed to create region")

        new_region_id = region_result.data[0]["id"]

        # For each county, create an industry-specific territory row
        # (don't touch existing default rows — create new ones with category_id)
        county_results = []
        for county_info in req.counties:
            county_name = (county_info.get("name") or "").strip()
            if not county_name:
                continue

            # Check if an industry-specific row already exists for this county + category
            existing = supabase.table("territories").select("id, county, region_id, category_id").eq("state", state_full).eq("category_id", cat_id).ilike("county", f"{county_name}%").execute()

            matched_row = None
            for row in (existing.data or []):
                if (row.get("county") or "").strip().lower() == county_name.lower():
                    matched_row = row
                    break

            if matched_row:
                # Update existing industry-specific row with new region_id
                supabase.table("territories").update({
                    "region_id": new_region_id,
                    "status": "reserved",
                    "reserved_at": now_iso,
                }).eq("id", matched_row["id"]).execute()
                county_results.append({"county": county_name, "action": "updated"})
            else:
                # Look up the county type from the default row
                default_row = supabase.table("territories").select("type").eq("state", state_full).is_("category_id", "null").ilike("county", f"{county_name}%").execute()
                county_type = 1  # default Small
                for dr in (default_row.data or []):
                    county_type = dr.get("type", 1)
                    break

                # Insert new industry-specific territory row
                supabase.table("territories").insert({
                    "county": county_name,
                    "state": state_full,
                    "country": "USA",
                    "type": county_type,
                    "region_id": new_region_id,
                    "category_id": cat_id,
                    "status": "reserved",
                    "reserved_at": now_iso,
                }).execute()
                county_results.append({"county": county_name, "action": "created"})

        return {
            "success": True,
            "region": {
                "id": new_region_id,
                "name": req.name.strip(),
                "color": chosen_color,
                "region_code": next_code,
                "state": state_full,
                "category": req.category.strip(),
                "category_id": cat_id,
                "status": "reserved",
                "reserved_at": now_iso,
            },
            "counties": county_results,
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create territory: {str(e)}")


@router.post("/confirm-territory/{region_id}")
async def confirm_territory(region_id: int):
    """Confirm a reserved territory (called after deposit is paid).
    Updates Region and all its territory rows from 'reserved' to 'confirmed'."""
    region = supabase.table("Region").select("id, status").eq("id", region_id).execute()
    if not region.data:
        raise HTTPException(status_code=404, detail="Region not found")
    if region.data[0].get("status") != "reserved":
        raise HTTPException(status_code=400, detail="Region is not in reserved status")

    supabase.table("Region").update({"status": "confirmed"}).eq("id", region_id).execute()
    supabase.table("territories").update({"status": "confirmed"}).eq("region_id", region_id).execute()

    return {"success": True, "region_id": region_id, "status": "confirmed"}


@router.post("/release-territory/{region_id}")
async def release_territory(region_id: int):
    """Release a reserved territory — deletes the industry-specific Region and territory rows,
    restoring the map to its previous default state."""
    region = supabase.table("Region").select("id, name, status, category_id").eq("id", region_id).execute()
    if not region.data:
        raise HTTPException(status_code=404, detail="Region not found")

    region_data = region.data[0]
    if region_data.get("status") != "reserved":
        raise HTTPException(status_code=400, detail="Only reserved territories can be released")

    # Delete industry-specific territory rows pointing to this region
    supabase.table("territories").delete().eq("region_id", region_id).not_.is_("category_id", "null").execute()
    # Delete the Region itself
    supabase.table("Region").delete().eq("id", region_id).execute()

    return {"success": True, "released_region": region_data.get("name", ""), "region_id": region_id}


class TerritoryPricingRequest(BaseModel):
    counties: list[str]
    category: str
    state: Optional[str] = "Florida"


@router.post("/territory-pricing")
async def get_territory_pricing(req: TerritoryPricingRequest):
    """Look up territory pricing from DefaultPricing using county type.
    Uses category-specific pricing if available, otherwise falls back to any pricing for that type."""
    prices = {}

    if not req.counties:
        return {"prices": prices}

    # Get category ID if category is provided
    cat_id = None
    if req.category:
        cat_result = supabase.table("category").select("id, name").execute()
        cat_map = {c["name"].strip().lower(): c["id"] for c in (cat_result.data or [])}
        cat_id = cat_map.get(req.category.strip().lower())

    # Get ALL DefaultPricing rows
    dp_result = supabase.table("DefaultPricing").select("TypeId, CategoryId, Price").execute()
    dp_rows = dp_result.data or []

    # Build category-specific and fallback type_id -> price lookups
    type_price_specific = {}
    type_price_fallback = {}
    for row in dp_rows:
        tid = row["TypeId"]
        price = row.get("Price", 0)
        if cat_id and row["CategoryId"] == cat_id:
            type_price_specific[tid] = price
        if tid not in type_price_fallback:
            type_price_fallback[tid] = price

    # Use category-specific pricing if available, otherwise fallback
    type_price = type_price_specific if type_price_specific else type_price_fallback

    # Get county types for requested state
    state_abbr_to_name = {
        'AL':'Alabama','AK':'Alaska','AZ':'Arizona','AR':'Arkansas','CA':'California',
        'CO':'Colorado','CT':'Connecticut','DE':'Delaware','FL':'Florida','GA':'Georgia',
        'HI':'Hawaii','ID':'Idaho','IL':'Illinois','IN':'Indiana','IA':'Iowa','KS':'Kansas',
        'KY':'Kentucky','LA':'Louisiana','ME':'Maine','MD':'Maryland','MA':'Massachusetts',
        'MI':'Michigan','MN':'Minnesota','MS':'Mississippi','MO':'Missouri','MT':'Montana',
        'NE':'Nebraska','NV':'Nevada','NH':'New Hampshire','NJ':'New Jersey','NM':'New Mexico',
        'NY':'New York','NC':'North Carolina','ND':'North Dakota','OH':'Ohio','OK':'Oklahoma',
        'OR':'Oregon','PA':'Pennsylvania','RI':'Rhode Island','SC':'South Carolina',
        'SD':'South Dakota','TN':'Tennessee','TX':'Texas','UT':'Utah','VT':'Vermont',
        'VA':'Virginia','WA':'Washington','WV':'West Virginia','WI':'Wisconsin','WY':'Wyoming',
    }
    raw_state = req.state or "Florida"
    state = state_abbr_to_name.get(raw_state.upper(), raw_state)
    terr_result = supabase.table("territories").select("county, type").eq("state", state).execute()
    county_type_map = {}
    for t in (terr_result.data or []):
        county_key = (t.get("county") or "").strip().lower()
        county_type_map[county_key] = t.get("type")

    # Look up price for each county based on its type
    for county_name in req.counties:
        county_key = county_name.strip().lower()
        county_type = county_type_map.get(county_key)
        if county_type and county_type in type_price:
            prices[county_name] = type_price[county_type]
        else:
            prices[county_name] = None

    return {"prices": prices}


@router.get("/")
async def list_contracts():
    result = supabase.table("contracts").select("*").order("created_at", desc=True).execute()
    contracts = result.data or []
    for c in contracts:
        c.pop("_id", None)
    return contracts


class ContractRequest(BaseModel):
    business_name: str
    business_address: str
    business_city: str
    business_state: str
    business_zip: str
    business_email: Optional[str] = ""
    industry: str
    selected_territories: list
    territory_count: int
    tier_id: str
    tier_name: str
    tier_monthly_price: float
    website_service: str
    website_type: str
    website_price: float
    territory_price_each: float
    territory_total: float
    total_due: float
    monthly_recurring: float


def generate_contract_number():
    now = datetime.now(timezone.utc)
    short_id = uuid.uuid4().hex[:6].upper()
    return f"GW-{now.strftime('%Y%m%d')}-{short_id}"


def build_pdf(contract: dict) -> bytes:
    from reportlab.lib.pagesizes import letter
    from reportlab.lib.units import inch
    from reportlab.lib.colors import HexColor
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

    buf = io.BytesIO()
    doc = SimpleDocTemplate(buf, pagesize=letter, topMargin=0.6*inch, bottomMargin=0.6*inch,
                            leftMargin=0.75*inch, rightMargin=0.75*inch)

    styles = getSampleStyleSheet()
    dark = HexColor("#0f172a")
    teal = HexColor("#0d9488")
    muted = HexColor("#64748b")
    light_bg = HexColor("#f8fafc")

    title_style = ParagraphStyle("Title", parent=styles["Heading1"], fontSize=20, textColor=dark, spaceAfter=4)
    subtitle_style = ParagraphStyle("Sub", parent=styles["Normal"], fontSize=10, textColor=muted, spaceAfter=16)
    heading_style = ParagraphStyle("H2", parent=styles["Heading2"], fontSize=13, textColor=dark, spaceBefore=18, spaceAfter=8)
    body_style = ParagraphStyle("Body", parent=styles["Normal"], fontSize=10, textColor=dark, leading=15)
    label_style = ParagraphStyle("Label", parent=styles["Normal"], fontSize=9, textColor=muted, spaceAfter=2)
    terms_heading_style = ParagraphStyle("TermsH", parent=styles["Heading1"], fontSize=16, textColor=dark, spaceBefore=6, spaceAfter=10)
    terms_body_style = ParagraphStyle("TermsBody", parent=styles["Normal"], fontSize=11, textColor=dark, leading=17, spaceBefore=3, spaceAfter=3)

    elements = []

    # Header
    elements.append(Paragraph("Gateway AI Systems", title_style))
    elements.append(Paragraph(f"Service Agreement &bull; Contract #{contract['contract_number']}", subtitle_style))
    elements.append(HRFlowable(width="100%", thickness=1, color=HexColor("#e2e8f0")))
    elements.append(Spacer(1, 12))

    # Contract Date
    created = contract.get("created_at", datetime.now(timezone.utc).isoformat())
    if isinstance(created, str):
        try:
            dt = datetime.fromisoformat(created.replace("Z", "+00:00"))
        except:
            dt = datetime.now(timezone.utc)
    else:
        dt = created
    elements.append(Paragraph(f"Date: {dt.strftime('%B %d, %Y')}", body_style))
    elements.append(Spacer(1, 14))

    # ── TERMS & CONDITIONS (prominent, at the top) ──
    elements.append(HRFlowable(width="100%", thickness=2, color=dark))
    elements.append(Spacer(1, 8))
    elements.append(Paragraph("TERMS &amp; CONDITIONS", terms_heading_style))
    terms = [
        "<b>1.</b> The 25% deposit reserves the selected market territories exclusively for the client.",
        "<b>2.</b> Upon receipt of deposit, Gateway AI Systems will begin development of the client's website and GeoGrid tools.",
        "<b>3.</b> The completed website and tools will be delivered for client review and approval.",
        "<b>4.</b> The remaining 75% balance is due upon client approval of delivered services.",
        "<b>5.</b> Monthly recurring charges begin after the complimentary first month.",
        "<b>6.</b> Territory exclusivity is maintained for the duration of the active subscription.",
        "<b>7.</b> Failure to remit balance payment within the specified timeframe may result in territory release and service suspension.",
    ]
    for t in terms:
        elements.append(Paragraph(t, terms_body_style))
    elements.append(Spacer(1, 8))
    elements.append(HRFlowable(width="100%", thickness=2, color=dark))
    elements.append(Spacer(1, 16))

    # Business Info
    elements.append(Paragraph("CLIENT INFORMATION", label_style))
    elements.append(Paragraph(f"<b>{contract['business_name']}</b>", body_style))
    elements.append(Paragraph(f"{contract['business_address']}", body_style))
    elements.append(Paragraph(f"{contract['business_city']}, {contract['business_state']} {contract['business_zip']}", body_style))
    if contract.get("business_email"):
        elements.append(Paragraph(f"Email: {contract['business_email']}", body_style))
    elements.append(Paragraph(f"Industry: {contract['industry']}", body_style))
    elements.append(Spacer(1, 16))

    # Territory
    elements.append(Paragraph("RESERVED MARKET TERRITORIES", heading_style))
    territories = contract.get("selected_territories", [])
    if territories:
        terr_data = [["#", "Territory", "Price"]]
        for i, t in enumerate(territories, 1):
            name = t.get("name", t.get("id", "Unknown"))
            terr_data.append([str(i), name, f"${contract['territory_price_each']:,.2f}"])
        terr_data.append(["", "Territory Total", f"${contract['territory_total']:,.2f}"])

        terr_table = Table(terr_data, colWidths=[0.4*inch, 3.8*inch, 1.5*inch])
        terr_table.setStyle(TableStyle([
            ('FONTSIZE', (0, 0), (-1, -1), 9),
            ('TEXTCOLOR', (0, 0), (-1, 0), muted),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTNAME', (0, -1), (-1, -1), 'Helvetica-Bold'),
            ('LINEBELOW', (0, 0), (-1, 0), 0.5, HexColor("#e2e8f0")),
            ('LINEABOVE', (0, -1), (-1, -1), 0.5, HexColor("#e2e8f0")),
            ('TOPPADDING', (0, 0), (-1, -1), 4),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
            ('ALIGN', (-1, 0), (-1, -1), 'RIGHT'),
        ]))
        elements.append(terr_table)
    elements.append(Spacer(1, 12))

    # Services
    elements.append(Paragraph("SERVICES", heading_style))
    svc_data = [["Service", "Type", "Amount"]]
    if contract.get("website_service"):
        svc_data.append([contract["website_service"], contract["website_type"], f"${contract['website_price']:,.2f}"])
    if contract.get("tier_name"):
        svc_data.append([f"{contract['tier_name']} Plan (Tier)", "Monthly Recurring", f"${contract['tier_monthly_price']:,.2f}/mo"])
    svc_data.append(["", "First Month", "FREE"])

    svc_table = Table(svc_data, colWidths=[2.5*inch, 1.7*inch, 1.5*inch])
    svc_table.setStyle(TableStyle([
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('TEXTCOLOR', (0, 0), (-1, 0), muted),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('LINEBELOW', (0, 0), (-1, 0), 0.5, HexColor("#e2e8f0")),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('ALIGN', (-1, 0), (-1, -1), 'RIGHT'),
    ]))
    elements.append(svc_table)
    elements.append(Spacer(1, 20))

    # Payment Summary
    elements.append(Paragraph("PAYMENT SUMMARY", heading_style))
    deposit = contract["deposit_amount"]
    balance = contract["balance_remaining"]
    total = contract["total_due"]

    pay_data = [
        ["Total Contract Amount", f"${total:,.2f}"],
        ["Deposit (25%)", f"${deposit:,.2f}"],
        ["Balance Remaining", f"${balance:,.2f}"],
        ["Monthly Recurring (after free month)", f"${contract['monthly_recurring']:,.2f}/mo"],
    ]
    pay_table = Table(pay_data, colWidths=[3.5*inch, 2.2*inch])
    pay_table.setStyle(TableStyle([
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('FONTNAME', (0, 0), (-1, -1), 'Helvetica'),
        ('FONTNAME', (0, 1), (0, 1), 'Helvetica-Bold'),
        ('TEXTCOLOR', (0, 1), (-1, 1), teal),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('ALIGN', (-1, 0), (-1, -1), 'RIGHT'),
        ('LINEBELOW', (0, -1), (-1, -1), 1, dark),
    ]))
    elements.append(pay_table)
    elements.append(Spacer(1, 20))

    # Signature area
    elements.append(HRFlowable(width="100%", thickness=0.5, color=HexColor("#e2e8f0")))
    elements.append(Spacer(1, 20))

    sig_data = [
        ["Client Signature: ________________________", "Date: _______________"],
        ["", ""],
        ["Gateway AI Systems: ________________________", "Date: _______________"],
    ]
    sig_table = Table(sig_data, colWidths=[3.5*inch, 2.2*inch])
    sig_table.setStyle(TableStyle([
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('TEXTCOLOR', (0, 0), (-1, -1), muted),
        ('TOPPADDING', (0, 0), (-1, -1), 12),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ]))
    elements.append(sig_table)

    doc.build(elements)
    buf.seek(0)
    return buf.read()


@router.post("/create")
async def create_contract(req: ContractRequest):
    contract_number = generate_contract_number()
    deposit_amount = round(req.total_due * 0.25, 2)
    balance_remaining = round(req.total_due - deposit_amount, 2)

    contract_data = {
        "contract_number": contract_number,
        "business_name": req.business_name,
        "business_address": req.business_address,
        "business_city": req.business_city,
        "business_state": req.business_state,
        "business_zip": req.business_zip,
        "business_email": req.business_email or "",
        "industry": req.industry,
        "selected_territories": req.selected_territories,
        "territory_count": req.territory_count,
        "tier_id": req.tier_id,
        "tier_name": req.tier_name,
        "tier_monthly_price": req.tier_monthly_price,
        "website_service": req.website_service,
        "website_type": req.website_type,
        "website_price": req.website_price,
        "territory_price_each": req.territory_price_each,
        "territory_total": req.territory_total,
        "total_due": req.total_due,
        "deposit_amount": deposit_amount,
        "balance_remaining": balance_remaining,
        "monthly_recurring": req.monthly_recurring,
        "status": "pending_deposit",
    }

    result = supabase.table("contracts").insert(contract_data).execute()

    if not result.data:
        raise HTTPException(status_code=500, detail="Failed to create contract")

    contract = result.data[0]

    return {
        "contract_number": contract_number,
        "deposit_amount": deposit_amount,
        "balance_remaining": balance_remaining,
        "total_due": req.total_due,
        "status": "pending_deposit",
        "id": contract["id"],
    }


@router.post("/{contract_id}/deposit")
async def record_deposit(contract_id: str):
    # Get contract
    result = supabase.table("contracts").select("*").eq("id", contract_id).execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Contract not found")

    contract = result.data[0]

    if contract["status"] != "pending_deposit":
        raise HTTPException(status_code=400, detail="Deposit already recorded or contract in unexpected state")

    # Record deposit
    deposit_data = {
        "contract_id": contract_id,
        "contract_number": contract["contract_number"],
        "amount": contract["deposit_amount"],
        "payment_type": "deposit",
        "payment_method": "pending_stripe",
        "status": "completed",
    }
    supabase.table("deposits").insert(deposit_data).execute()

    # Update contract status
    supabase.table("contracts").update({
        "status": "deposit_paid",
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }).eq("id", contract_id).execute()

    return {
        "status": "deposit_paid",
        "contract_number": contract["contract_number"],
        "deposit_amount": contract["deposit_amount"],
        "balance_remaining": contract["balance_remaining"],
    }


@router.get("/{contract_id}/pdf")
async def download_contract_pdf(contract_id: str):
    result = supabase.table("contracts").select("*").eq("id", contract_id).execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Contract not found")

    contract = result.data[0]
    pdf_bytes = build_pdf(contract)

    return StreamingResponse(
        io.BytesIO(pdf_bytes),
        media_type="application/pdf",
        headers={
            "Content-Disposition": f"inline; filename=GW-Contract-{contract['contract_number']}.pdf",
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
            "Expires": "0",
        }
    )


@router.get("/{contract_id}")
async def get_contract(contract_id: str):
    result = supabase.table("contracts").select("*").eq("id", contract_id).execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Contract not found")

    contract = result.data[0]
    # Remove internal Supabase fields
    contract.pop("_id", None)
    return contract
