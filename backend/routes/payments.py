from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from typing import Optional
from database import supabase
from datetime import datetime, timezone
import os
import logging
import uuid

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/payments", tags=["payments"])

STRIPE_SECRET_KEY = os.environ.get("STRIPE_SECRET_KEY")


class DepositCheckoutRequest(BaseModel):
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
    origin_url: str


@router.post("/checkout/deposit")
async def create_deposit_checkout(req: DepositCheckoutRequest, request: Request):
    """Create a Stripe Checkout session for the 25% deposit.
    Does NOT create a contract yet — that happens after successful payment."""
    if not STRIPE_SECRET_KEY:
        raise HTTPException(status_code=500, detail="STRIPE_API_KEY not configured")

    from emergentintegrations.payments.stripe.checkout import (
        StripeCheckout, CheckoutSessionRequest
    )

    # Calculate deposit amount (25%)
    deposit_amount = round(req.total_due * 0.25, 2)
    if deposit_amount <= 0:
        raise HTTPException(status_code=400, detail="Invalid deposit amount")

    # Build success/cancel URLs from frontend origin
    origin = req.origin_url.rstrip("/")
    success_url = f"{origin}/subscribe?session_id={{CHECKOUT_SESSION_ID}}"
    cancel_url = f"{origin}/subscribe"

    # Store contract data in metadata (Stripe metadata values must be strings, max 500 chars)
    # Store full contract data in payment_transactions table instead
    tx_id = str(uuid.uuid4())

    metadata = {
        "tx_id": tx_id,
        "business_name": req.business_name[:100],
        "business_email": (req.business_email or "")[:100],
        "industry": req.industry[:50],
        "territory_count": str(req.territory_count),
        "total_due": str(req.total_due),
        "deposit_amount": str(deposit_amount),
    }

    try:
        # Initialize Stripe checkout
        host_url = str(request.base_url).rstrip("/")
        webhook_url = f"{host_url}/api/webhook/stripe"
        stripe_checkout = StripeCheckout(api_key=STRIPE_SECRET_KEY, webhook_url=webhook_url)

        # Create checkout session
        checkout_req = CheckoutSessionRequest(
            amount=float(deposit_amount),
            currency="usd",
            success_url=success_url,
            cancel_url=cancel_url,
            metadata=metadata,
        )
        session = await stripe_checkout.create_checkout_session(checkout_req)

        # Store payment transaction with full contract data (BEFORE redirect)
        contract_data = {
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
            "monthly_recurring": req.monthly_recurring,
        }

        supabase.table("payment_transactions").insert({
            "id": tx_id,
            "session_id": session.session_id,
            "amount": deposit_amount,
            "currency": "usd",
            "payment_status": "pending",
            "status": "initiated",
            "metadata": metadata,
            "contract_data": contract_data,
            "created_at": datetime.now(timezone.utc).isoformat(),
        }).execute()

        return {
            "url": session.url,
            "session_id": session.session_id,
            "deposit_amount": deposit_amount,
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Stripe checkout error: {e}")
        raise HTTPException(status_code=500, detail=f"Payment initialization failed: {str(e)}")


@router.get("/checkout/status/{session_id}")
async def get_checkout_status(session_id: str, request: Request):
    """Poll Stripe for payment status. On success, create the contract."""
    if not STRIPE_SECRET_KEY:
        raise HTTPException(status_code=500, detail="STRIPE_API_KEY not configured")

    from emergentintegrations.payments.stripe.checkout import StripeCheckout

    try:
        host_url = str(request.base_url).rstrip("/")
        webhook_url = f"{host_url}/api/webhook/stripe"
        stripe_checkout = StripeCheckout(api_key=STRIPE_SECRET_KEY, webhook_url=webhook_url)

        status = await stripe_checkout.get_checkout_status(session_id)

        # Get the payment transaction
        tx_result = supabase.table("payment_transactions").select("*").eq("session_id", session_id).execute()
        if not tx_result.data:
            raise HTTPException(status_code=404, detail="Payment transaction not found")

        tx = tx_result.data[0]

        # If already processed, return existing result
        if tx.get("payment_status") == "paid" and tx.get("contract_id"):
            contract = supabase.table("contracts").select("contract_number, deposit_amount, balance_remaining").eq("id", tx["contract_id"]).execute()
            c = contract.data[0] if contract.data else {}
            return {
                "payment_status": "paid",
                "status": "complete",
                "contract_number": c.get("contract_number", ""),
                "deposit_amount": c.get("deposit_amount", 0),
                "balance_remaining": c.get("balance_remaining", 0),
                "contract_id": tx["contract_id"],
            }

        # Update transaction status
        new_status = status.payment_status
        supabase.table("payment_transactions").update({
            "payment_status": new_status,
            "status": status.status,
            "updated_at": datetime.now(timezone.utc).isoformat(),
        }).eq("session_id", session_id).execute()

        # If payment successful, create the contract NOW
        if new_status == "paid" and not tx.get("contract_id"):
            contract_data = tx.get("contract_data", {})
            contract_id = _create_contract_from_payment(contract_data, tx["id"])

            # Update transaction with contract_id
            supabase.table("payment_transactions").update({
                "contract_id": contract_id,
            }).eq("session_id", session_id).execute()

            contract = supabase.table("contracts").select("contract_number, deposit_amount, balance_remaining").eq("id", contract_id).execute()
            c = contract.data[0] if contract.data else {}

            return {
                "payment_status": "paid",
                "status": "complete",
                "contract_number": c.get("contract_number", ""),
                "deposit_amount": c.get("deposit_amount", 0),
                "balance_remaining": c.get("balance_remaining", 0),
                "contract_id": contract_id,
            }

        return {
            "payment_status": new_status,
            "status": status.status,
            "amount_total": status.amount_total,
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Checkout status error: {e}")
        raise HTTPException(status_code=500, detail=f"Status check failed: {str(e)}")


def _create_contract_from_payment(contract_data: dict, tx_id: str) -> str:
    """Create the actual contract + deposit records after successful payment."""
    from routes.contracts import generate_contract_number

    total_due = contract_data.get("total_due", 0)
    deposit_amount = round(total_due * 0.25, 2)
    balance_remaining = round(total_due - deposit_amount, 2)
    contract_number = generate_contract_number()

    contract_record = {
        "contract_number": contract_number,
        "business_name": contract_data.get("business_name", ""),
        "business_address": contract_data.get("business_address", ""),
        "business_city": contract_data.get("business_city", ""),
        "business_state": contract_data.get("business_state", ""),
        "business_zip": contract_data.get("business_zip", ""),
        "business_email": contract_data.get("business_email", ""),
        "industry": contract_data.get("industry", ""),
        "selected_territories": contract_data.get("selected_territories", []),
        "territory_count": contract_data.get("territory_count", 0),
        "tier_id": contract_data.get("tier_id", ""),
        "tier_name": contract_data.get("tier_name", ""),
        "tier_monthly_price": contract_data.get("tier_monthly_price", 0),
        "website_service": contract_data.get("website_service", ""),
        "website_type": contract_data.get("website_type", ""),
        "website_price": contract_data.get("website_price", 0),
        "territory_price_each": contract_data.get("territory_price_each", 0),
        "territory_total": contract_data.get("territory_total", 0),
        "total_due": total_due,
        "deposit_amount": deposit_amount,
        "balance_remaining": balance_remaining,
        "monthly_recurring": contract_data.get("monthly_recurring", 0),
        "status": "deposit_paid",
        "payment_tx_id": tx_id,
    }

    result = supabase.table("contracts").insert(contract_record).execute()
    if not result.data:
        raise Exception("Failed to create contract")

    contract_id = result.data[0]["id"]

    # Record the deposit
    supabase.table("deposits").insert({
        "contract_id": contract_id,
        "contract_number": contract_number,
        "amount": deposit_amount,
        "payment_type": "deposit",
        "payment_method": "stripe",
        "status": "completed",
    }).execute()

    return contract_id


@router.post("/webhook/stripe")
async def stripe_webhook(request: Request):
    """Handle Stripe webhook events."""
    if not STRIPE_SECRET_KEY:
        return {"status": "ok"}

    try:
        from emergentintegrations.payments.stripe.checkout import StripeCheckout

        body = await request.body()
        host_url = str(request.base_url).rstrip("/")
        webhook_url = f"{host_url}/api/webhook/stripe"
        stripe_checkout = StripeCheckout(api_key=STRIPE_SECRET_KEY, webhook_url=webhook_url)

        webhook_response = await stripe_checkout.handle_webhook(
            body, request.headers.get("Stripe-Signature")
        )

        if webhook_response and webhook_response.payment_status == "paid":
            session_id = webhook_response.session_id
            tx_result = supabase.table("payment_transactions").select("*").eq("session_id", session_id).execute()

            if tx_result.data:
                tx = tx_result.data[0]
                if tx.get("payment_status") != "paid":
                    supabase.table("payment_transactions").update({
                        "payment_status": "paid",
                        "status": "complete",
                        "updated_at": datetime.now(timezone.utc).isoformat(),
                    }).eq("session_id", session_id).execute()

                    if not tx.get("contract_id"):
                        contract_data = tx.get("contract_data", {})
                        contract_id = _create_contract_from_payment(contract_data, tx["id"])
                        supabase.table("payment_transactions").update({
                            "contract_id": contract_id,
                        }).eq("session_id", session_id).execute()

        return {"status": "ok"}
    except Exception as e:
        logger.error(f"Webhook error: {e}")
        return {"status": "ok"}
