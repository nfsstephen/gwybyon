import React from 'react';
import { ShoppingCart, AlertCircle, CreditCard, ChevronRight, MapPin, Check, Download } from 'lucide-react';

export const InvoiceSummary = ({
  selectedWebsite,
  serviceType,
  websiteLineLabel,
  websitePrice,
  selectedCounties,
  countyNames,
  pricingLoading,
  getCountyPrice,
  isCountyDiscounted,
  getCountyRegion,
  countyTotal,
  regionDiscountTotal,
  completeRegions,
  selectedService,
  selectedAddOns = [],
  invoice,
  invoiceReady,
  businessReady,
  canDeposit,
  depositLoading,
  depositError,
  contractResult,
  onPayDeposit,
  onDownloadPdf,
}) => (
  <div className="sub-invoice-panel" data-testid="invoice-panel">
    <h2 className="sub-section-label">Your Invoice</h2>

    <div className="sub-invoice">
      {(!selectedService && !selectedWebsite && selectedCounties.length === 0 && selectedAddOns.length === 0) ? (
        <div className="sub-invoice-empty">
          <ShoppingCart size={32} />
          <p>Complete all three sections to build final invoice. Only 25% payment required to reserve your market areas. Final payment not required until you approve the product you receive and publish.</p>
          <div className="sub-invoice-notice">
            <AlertCircle size={14} />
            <span>Select a website service to continue</span>
          </div>
        </div>
      ) : (
        <>
          <div className="sub-invoice-header">
            <h3>Gateway AI Systems</h3>
            <span>Invoice Summary</span>
          </div>

          {/* Line Items */}
          <div className="sub-invoice-lines">
            {/* 1. Website Service */}
            {selectedWebsite && serviceType && (
              <div className="sub-invoice-line" data-testid="invoice-line-website">
                <div>
                  <div className="sub-line-name">{websiteLineLabel}</div>
                  <div className="sub-line-type">Website Service</div>
                </div>
                <div className="sub-line-amount">${websitePrice}</div>
              </div>
            )}

            {/* 2. Market Territories */}
            {selectedCounties.length > 0 && (
              <>
                <div className="sub-invoice-territory-label">
                  <MapPin size={14} />
                  <span>Market Territories ({selectedCounties.length})</span>
                  {pricingLoading && <span className="sub-pricing-loading"> Loading prices...</span>}
                </div>
                {selectedCounties.map(id => {
                  const displayName = countyNames[id] || id;
                  const price = getCountyPrice(id);
                  const discounted = isCountyDiscounted(id);
                  const discountedPrice = discounted && price != null ? Math.round(price * 0.75) : price;
                  return (
                    <div key={id} className="sub-invoice-territory-item" data-testid={`invoice-county-${id}`}>
                      <div>
                        <span className="sub-invoice-county-name">{displayName}</span>
                        {discounted && <span className="sub-invoice-discount-badge" data-testid={`discount-badge-${id}`}>-25%</span>}
                      </div>
                      <span className="sub-invoice-county-price">
                        {price != null ? (
                          discounted ? (
                            <><s className="sub-price-struck">${price.toLocaleString()}</s> ${discountedPrice.toLocaleString()}</>
                          ) : `$${price.toLocaleString()}`
                        ) : '—'}
                      </span>
                    </div>
                  );
                })}
                {regionDiscountTotal > 0 && (
                  <div className="sub-invoice-discount-row" data-testid="region-discount-row">
                    <span>Region Group Discount (25%)</span>
                    <span>-${regionDiscountTotal.toLocaleString()}</span>
                  </div>
                )}
                {completeRegions.size > 0 && (
                  <div className="sub-invoice-region-benefit" data-testid="region-benefit-note">
                    Full region purchase unlocks <strong>25% discount</strong> and the option to 
                    <strong> break your territory payment into 12 monthly installments</strong> on your contract.
                  </div>
                )}
                <div className="sub-invoice-territory-total-row">
                  <span>Territory Total</span>
                  <span>${countyTotal.toLocaleString()}</span>
                </div>
              </>
            )}

            {/* 3. Service Tier */}
            {selectedService && (
              <div className="sub-invoice-tier-block" data-testid="invoice-line-plan">
                <div className="sub-invoice-line">
                  <div>
                    <div className="sub-line-name">{selectedService.market === 'small' ? 'Small Market' : 'Large Market'} — {selectedService.name}</div>
                    <div className="sub-line-type">Monthly Recurring</div>
                  </div>
                  <div className="sub-line-amount">${selectedService.monthlyPrice.toLocaleString()}/mo</div>
                </div>
                <p className="sub-invoice-free-month">First Month Free, to cover the learning curve of using the Tools.</p>
              </div>
            )}

            {/* 4. Add-On Tools */}
            {selectedAddOns.length > 0 && (
              <div className="sub-invoice-addon-block" data-testid="invoice-addons-block">
                <div className="sub-invoice-addon-header">
                  <span>Add-On Tools</span>
                </div>
                {selectedAddOns.map(addon => (
                  <div className="sub-invoice-line" key={addon.id} data-testid={`invoice-addon-${addon.id}`}>
                    <div>
                      <div className="sub-line-name">{addon.name}</div>
                      <div className="sub-line-type">Optional Add-On</div>
                    </div>
                    <div className="sub-line-amount sub-line-amount-tbd">
                      {addon.monthlyPrice == null ? 'TBD' : `$${addon.monthlyPrice}/mo`}
                    </div>
                  </div>
                ))}
                <p className="sub-invoice-addon-note">
                  Add-on pricing is being finalized and will be quoted with your contract. Adding it now reserves it for early-access rollout.
                </p>
              </div>
            )}
          </div>

          {/* Missing selection notices */}
          {(!selectedWebsite || !serviceType) && (
            <div className="sub-invoice-notice">
              <AlertCircle size={14} />
              <span>Select a website service to continue</span>
            </div>
          )}
          {(!businessReady || selectedCounties.length === 0) && (
            <div className="sub-invoice-notice">
              <AlertCircle size={14} />
              <span>
                {!businessReady && selectedCounties.length === 0
                  ? 'Complete your business details and select market territories'
                  : !businessReady
                    ? 'Complete your business details to continue'
                    : 'Select at least one market territory'}
              </span>
            </div>
          )}
          {!selectedService && (
            <div className="sub-invoice-notice">
              <AlertCircle size={14} />
              <span>Select a service tier to continue</span>
            </div>
          )}

          {/* Totals */}
          {selectedWebsite && serviceType && selectedCounties.length > 0 && (
            <div className="sub-invoice-totals">
              <div className="sub-total-line">
                <span>Total Contract Amount</span>
                <span>${invoice.dueToday.toLocaleString()}</span>
              </div>
              <div className="sub-total-line sub-total-deposit">
                <span>Deposit (25%)</span>
                <span>${invoice.depositAmount.toLocaleString()}</span>
              </div>
              <div className="sub-total-line sub-total-balance">
                <span>Balance Due Upon Approval</span>
                <span>${invoice.balanceRemaining.toLocaleString()}</span>
              </div>
              <p className="sub-total-note">
                Deposit reserves your market territories and initiates website &amp; tool development.
              </p>
              {selectedService && (
                <div className="sub-total-line sub-total-recurring">
                  <span>Monthly Recurring (after free month)</span>
                  <span>${invoice.monthlyTotal.toLocaleString()}/mo</span>
                </div>
              )}
            </div>
          )}

          {/* Deposit Result */}
          {contractResult ? (
            <div className="sub-deposit-success" data-testid="deposit-success">
              <div className="sub-deposit-success-icon">
                <Check size={24} />
              </div>
              <h4>Region Reserved!</h4>
              <p>Contract <strong>{contractResult.contract_number}</strong> has been created.</p>
              <div className="sub-deposit-summary">
                <div className="sub-deposit-summary-line">
                  <span>Deposit Recorded</span>
                  <span>${contractResult.deposit_amount?.toLocaleString()}</span>
                </div>
                <div className="sub-deposit-summary-line">
                  <span>Balance Remaining</span>
                  <span>${contractResult.balance_remaining?.toLocaleString()}</span>
                </div>
              </div>
              <button
                className="sub-download-btn"
                data-testid="download-contract-btn"
                onClick={onDownloadPdf}
              >
                <Download size={16} />
                Download Contract PDF
              </button>
              <p className="sub-deposit-next">
                We will begin building your website and tools. You'll receive credentials to your customer portal once development is complete.
              </p>
            </div>
          ) : (
            <>
              <button
                data-testid="pay-deposit-button"
                className="sub-pay-btn"
                disabled={!canDeposit || depositLoading}
                onClick={onPayDeposit}
              >
                {depositLoading ? (
                  <>Processing...</>
                ) : (
                  <>
                    <CreditCard size={18} />
                    Pay 25% Deposit — ${invoice.depositAmount.toLocaleString()}
                    <ChevronRight size={16} />
                  </>
                )}
              </button>
              {!businessReady && invoiceReady && (
                <p className="sub-pay-note sub-pay-note-warn">Complete your business details above to continue.</p>
              )}
              {depositError && (
                <p className="sub-pay-note sub-pay-note-error" data-testid="deposit-error">{depositError}</p>
              )}
              <p className="sub-pay-note sub-deposit-info">
                Deposit reserves your territories, generates your service contract, creates a customer portal, and initiates the development of your new or rebuilt website and forwarding of the tools you have subscribed to in the tier plans. All of this for your approval of service and tools before paying the balance of contract. Thank you for the opportunity to grow your business.
              </p>
            </>
          )}
        </>
      )}
    </div>
  </div>
);
