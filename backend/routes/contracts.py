from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import Optional
from database import supabase
from datetime import datetime, timezone
import uuid
import io

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
async def get_region_colors(state: str = ""):
    """Return county → region color mapping and region group totals for a given state.
    Requires territories.region_id FK to Region table."""
    if not state:
        return {"colors": {}, "region_groups": {}}
    try:
        # Fetch territories for the given state that have a region_id
        territories = supabase.table("territories").select("county, region_id").eq("state", state).not_.is_("region_id", "null").execute()
        t_rows = territories.data or []
        if not t_rows:
            return {"colors": {}, "region_groups": {}}

        # Fetch all regions
        regions = supabase.table("Region").select("id, name, color").execute()
        region_map = {r["id"]: r for r in (regions.data or [])}

        # Build county → color mapping and region groups
        colors = {}
        region_groups = {}
        for t in t_rows:
            region = region_map.get(t.get("region_id"))
            if region:
                county_name = (t.get("county") or "").strip()
                county_lower = county_name.lower()
                colors[county_lower] = {
                    "color": region["color"],
                    "region": region["name"]
                }
                rname = region["name"]
                if rname not in region_groups:
                    region_groups[rname] = {"color": region["color"], "counties": []}
                region_groups[rname]["counties"].append(county_lower)

        return {"colors": colors, "region_groups": region_groups}
    except Exception:
        # region_id column may not exist yet — return empty gracefully
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
                "price": row.get("CountyPrice") if row.get("CountyPrice") is not None else row["Price"],
            })

    return {"categories": list(grouped.values())}


class TerritoryPricingRequest(BaseModel):
    counties: list[str]
    category: str
    state: Optional[str] = "Florida"


@router.post("/territory-pricing")
async def get_territory_pricing(req: TerritoryPricingRequest):
    """Look up territory pricing from DefaultPricing.CountyPrice using county type + category."""
    prices = {}

    if not req.counties or not req.category:
        return {"prices": prices}

    # Get category ID
    cat_result = supabase.table("category").select("id, name").execute()
    cat_map = {c["name"].strip().lower(): c["id"] for c in (cat_result.data or [])}
    cat_id = cat_map.get(req.category.strip().lower())
    if not cat_id:
        return {"prices": prices}

    # Get DefaultPricing rows for this category
    dp_result = supabase.table("DefaultPricing").select("TypeId, Price, CountyPrice").eq("CategoryId", cat_id).execute()
    dp_rows = dp_result.data or []
    # Build type_id -> price lookup (prefer CountyPrice, fall back to Price)
    type_price = {}
    for row in dp_rows:
        price = row.get("CountyPrice") if row.get("CountyPrice") is not None else row.get("Price", 0)
        type_price[row["TypeId"]] = price

    # Get county types for requested state
    state = req.state or "Florida"
    terr_result = supabase.table("territories").select("county, type").eq("state", state).execute()
    county_type_map = {}
    for t in (terr_result.data or []):
        county_key = (t.get("county") or "").strip().lower()
        county_type_map[county_key] = t.get("type")

    # Look up price for each county
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
