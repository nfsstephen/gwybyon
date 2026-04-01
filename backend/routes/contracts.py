from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import Optional
from database import supabase
from datetime import datetime, timezone
import uuid
import io

router = APIRouter(prefix="/contracts", tags=["contracts"])


@router.get("/categories")
async def get_categories():
    """Fetch categories joined with category_business_mapping to get pricing by type."""
    cats = supabase.table("category").select("*").execute()
    cat_rows = cats.data or []

    cbm = supabase.table("category_business_mapping").select("*").execute()
    cbm_rows = cbm.data or []

    # Build lookup: category_id -> mapping data
    cbm_by_cid = {}
    for row in cbm_rows:
        cbm_by_cid[row["cid"]] = {"type": row["type"], "price": row["price"], "mapping_id": row["id"]}

    # Group by category name, merge in pricing
    grouped = {}
    for cat in cat_rows:
        name = cat["name"]
        if name not in grouped:
            grouped[name] = {"name": name, "types": []}
        mapping = cbm_by_cid.get(cat["id"], {})
        grouped[name]["types"].append({
            "category_id": cat["id"],
            "type": cat["type"],
            "price": mapping.get("price"),
            "mapping_id": mapping.get("mapping_id"),
        })

    return {"categories": list(grouped.values())}


class TerritoryPricingRequest(BaseModel):
    counties: list[str]
    category: str
    category_type: Optional[str] = None
    state: Optional[str] = "Florida"


@router.post("/territory-pricing")
async def get_territory_pricing(req: TerritoryPricingRequest):
    """Look up territory pricing from territory_pricings (joined from territories + category + category_business_mapping)."""
    prices = {}

    if not req.counties or not req.category:
        return {"prices": prices}

    # Normalize category
    cat_lower = req.category.strip().lower()

    # Fetch pricing rows from territory_pricings
    tp_result = supabase.table("territory_pricings").select("county, category, category_type, amount").execute()
    tp_rows = tp_result.data or []

    # Build lookup keyed by (county, category)
    tp_lookup = {}
    for row in tp_rows:
        county_key = (row.get("county") or "").strip().lower()
        row_cat = (row.get("category") or "").strip().lower()
        tp_lookup[(county_key, row_cat)] = {
            "amount": row.get("amount", 0),
            "category_type": row.get("category_type", ""),
        }

    # Match each requested county
    for county_name in req.counties:
        county_key = county_name.strip().lower()
        match = tp_lookup.get((county_key, cat_lower))
        prices[county_name] = match["amount"] if match else None

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
    small_style = ParagraphStyle("Small", parent=styles["Normal"], fontSize=9, textColor=muted, leading=13)
    label_style = ParagraphStyle("Label", parent=styles["Normal"], fontSize=9, textColor=muted, spaceAfter=2)

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
    elements.append(Spacer(1, 12))

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

    # Terms
    elements.append(Paragraph("TERMS & CONDITIONS", heading_style))
    terms = [
        "1. The 25% deposit reserves the selected market territories exclusively for the client.",
        "2. Upon receipt of deposit, Gateway AI Systems will begin development of the client's website and GeoGrid tools.",
        "3. The completed website and tools will be delivered for client review and approval.",
        "4. The remaining 75% balance is due upon client approval of delivered services.",
        "5. Monthly recurring charges begin after the complimentary first month.",
        "6. Territory exclusivity is maintained for the duration of the active subscription.",
        "7. Failure to remit balance payment within the specified timeframe may result in territory release and service suspension.",
    ]
    for t in terms:
        elements.append(Paragraph(t, small_style))
    elements.append(Spacer(1, 24))

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
        headers={"Content-Disposition": f"attachment; filename=GW-Contract-{contract['contract_number']}.pdf"}
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
