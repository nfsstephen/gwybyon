import React, { useState, useMemo } from 'react';
import { Check, X, ShoppingCart, Tag, AlertCircle, CreditCard, ChevronRight } from 'lucide-react';
import './SubscribePage.css';

const SERVICES = [
  {
    id: 'foundation',
    tier: 1,
    name: 'Foundation',
    tagline: 'Establish your digital presence and claim your territory',
    monthlyPrice: 497,
    features: [
      'Managed website hosting & security',
      'Monthly CMS & plugin updates',
      'Up to 2 content updates/month',
      'Geo-Health Scanner access',
      'Entity-Sync (Google, Apple, Bing, 60+)',
      'Basic ROI Tracker',
      '2 managed BYON phone lines',
      'Exclusive territory rights',
      'Monthly performance report',
    ],
  },
  {
    id: 'growth',
    tier: 2,
    name: 'Growth',
    tagline: 'Actively grow your local rankings and customer pipeline',
    monthlyPrice: 797,
    popular: true,
    features: [
      'Everything in Foundation, plus:',
      'Up to 4 local content updates/month',
      'Neighborhood Content Engine (AI)',
      'Review Magnet (SMS + Email)',
      'Schema markup monitoring',
      'Core Web Vitals optimization',
      'Advanced ROI analytics',
      'Quarterly strategy review call',
    ],
  },
  {
    id: 'authority',
    tier: 3,
    name: 'Authority',
    tagline: 'Dominate your market with full-service management',
    monthlyPrice: 1297,
    features: [
      'Everything in Growth, plus:',
      'Unlimited content updates',
      'Advanced local SEO',
      'Competitor displacement strategy',
      'A/B testing for conversions',
      'Dedicated account manager',
      'Monthly strategy call',
      'Priority same-day support',
    ],
  },
];

const TERRITORY_FEE = 1497;
const TERRITORY_FEE_NAME = 'Market Territory Restriction Fee (One-Time)';

export default function SubscribePage() {
  const [selectedTier, setSelectedTier] = useState(null);
  const [discountToken, setDiscountToken] = useState('');
  const [tokenApplied, setTokenApplied] = useState(false);

  const selectedService = SERVICES.find(s => s.id === selectedTier);

  const invoice = useMemo(() => {
    if (!selectedService) return null;

    const lines = [
      {
        label: `${selectedService.name} Plan (Tier ${selectedService.tier})`,
        type: 'monthly',
        amount: selectedService.monthlyPrice,
      },
      {
        label: TERRITORY_FEE_NAME,
        type: 'one-time',
        amount: TERRITORY_FEE,
      },
    ];

    const discountMultiplier = tokenApplied ? 0.5 : 1;
    const monthlyTotal = selectedService.monthlyPrice * discountMultiplier;
    const oneTimeTotal = TERRITORY_FEE * discountMultiplier;
    const dueToday = (selectedService.monthlyPrice + TERRITORY_FEE) * discountMultiplier;

    return { lines, discountMultiplier, monthlyTotal, oneTimeTotal, dueToday, tokenApplied };
  }, [selectedService, tokenApplied]);

  const handleApplyToken = () => {
    // TODO: Validate token against backend
    // For now, this is a placeholder
    setTokenApplied(false);
  };

  return (
    <div className="sub-page" data-testid="subscribe-page">
      {/* Header */}
      <section className="sub-header">
        <div className="sub-container">
          <h1 className="sub-title">Subscribe to Our Services</h1>
          <p className="sub-subtitle">
            Select your service tier below. Your subscription includes exclusive territory rights,
            website services, GeoGrid tools, and BYON communication lines.
          </p>
        </div>
      </section>

      <div className="sub-container sub-body">
        <div className="sub-layout">
          {/* Left: Service Selection */}
          <div className="sub-selection" data-testid="service-selection">
            <h2 className="sub-section-label">1. Select Your Service Tier</h2>

            <div className="sub-tiers">
              {SERVICES.map(svc => {
                const isSelected = selectedTier === svc.id;
                return (
                  <button
                    key={svc.id}
                    data-testid={`tier-select-${svc.id}`}
                    className={`sub-tier-card ${isSelected ? 'selected' : ''} ${svc.popular ? 'popular' : ''}`}
                    onClick={() => setSelectedTier(isSelected ? null : svc.id)}
                  >
                    {svc.popular && <span className="sub-popular-badge">Most Popular</span>}
                    <div className="sub-tier-top">
                      <div className="sub-tier-check">
                        {isSelected ? <Check size={18} /> : <div className="sub-tier-circle" />}
                      </div>
                      <div>
                        <div className="sub-tier-label">Tier {svc.tier}</div>
                        <div className="sub-tier-name">{svc.name}</div>
                      </div>
                      <div className="sub-tier-price">
                        ${svc.monthlyPrice.toLocaleString()}<span>/mo</span>
                      </div>
                    </div>
                    <p className="sub-tier-tagline">{svc.tagline}</p>
                    <ul className="sub-tier-features">
                      {svc.features.map((f, i) => (
                        <li key={i}>
                          {f.startsWith('Everything') ? (
                            <span className="sub-tier-inherits">{f}</span>
                          ) : (
                            <><Check size={13} /> {f}</>
                          )}
                        </li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>

            {/* Territory Fee Note */}
            <div className="sub-territory-note">
              <AlertCircle size={16} />
              <p>
                <strong>${TERRITORY_FEE.toLocaleString()} {TERRITORY_FEE_NAME}</strong> — covers your
                website build/rebuild, territory setup, initial GeoGrid configuration, and BYON line provisioning.
                This is a one-time charge included in your first invoice.
              </p>
            </div>
          </div>

          {/* Right: Invoice */}
          <div className="sub-invoice-panel" data-testid="invoice-panel">
            <h2 className="sub-section-label">2. Your Invoice</h2>

            <div className="sub-invoice">
              {!selectedService ? (
                <div className="sub-invoice-empty">
                  <ShoppingCart size={32} />
                  <p>Select a service tier to see your invoice</p>
                </div>
              ) : (
                <>
                  <div className="sub-invoice-header">
                    <h3>Gateway AI Systems</h3>
                    <span>Invoice Summary</span>
                  </div>

                  {/* Line Items */}
                  <div className="sub-invoice-lines">
                    <div className="sub-invoice-line" data-testid="invoice-line-plan">
                      <div>
                        <div className="sub-line-name">{selectedService.name} Plan (Tier {selectedService.tier})</div>
                        <div className="sub-line-type">Monthly Recurring</div>
                      </div>
                      <div className="sub-line-amount">${selectedService.monthlyPrice.toLocaleString()}/mo</div>
                    </div>

                    <div className="sub-invoice-line" data-testid="invoice-line-territory">
                      <div>
                        <div className="sub-line-name">{TERRITORY_FEE_NAME}</div>
                        <div className="sub-line-type">One-Time</div>
                      </div>
                      <div className="sub-line-amount">${TERRITORY_FEE.toLocaleString()}</div>
                    </div>
                  </div>

                  {/* Small Market Discount Token */}
                  <div className="sub-token-section" data-testid="discount-token-section">
                    <div className="sub-token-label">
                      <Tag size={14} />
                      <span>Designated Small Market Discount</span>
                    </div>
                    <div className="sub-token-input-row">
                      <input
                        data-testid="discount-token-input"
                        type="text"
                        placeholder="Enter discount token from invitation"
                        value={discountToken}
                        onChange={e => setDiscountToken(e.target.value)}
                        className="sub-token-input"
                        disabled
                      />
                      <button
                        data-testid="apply-token-button"
                        className="sub-token-btn"
                        onClick={handleApplyToken}
                        disabled
                      >
                        Apply
                      </button>
                    </div>
                    <p className="sub-token-note">Coming Soon — If your invitation designates you as a small market customer, enter your token here for a 50% discount on all services.</p>
                  </div>

                  {/* Discount applied */}
                  {invoice.tokenApplied && (
                    <div className="sub-discount-applied" data-testid="discount-applied">
                      <Check size={16} />
                      <span>Small Market Discount Applied: 50% off all services</span>
                    </div>
                  )}

                  {/* Totals */}
                  <div className="sub-invoice-totals">
                    <div className="sub-total-line">
                      <span>Monthly Recurring</span>
                      <span className={invoice.tokenApplied ? 'sub-discounted' : ''}>
                        {invoice.tokenApplied && <s>${selectedService.monthlyPrice.toLocaleString()}</s>}
                        ${invoice.monthlyTotal.toLocaleString()}/mo
                      </span>
                    </div>
                    <div className="sub-total-line">
                      <span>One-Time Fee</span>
                      <span className={invoice.tokenApplied ? 'sub-discounted' : ''}>
                        {invoice.tokenApplied && <s>${TERRITORY_FEE.toLocaleString()}</s>}
                        ${invoice.oneTimeTotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="sub-total-line sub-total-due">
                      <span>Due Today</span>
                      <span>${invoice.dueToday.toLocaleString()}</span>
                    </div>
                    <p className="sub-total-note">
                      Due today includes your first month plus the one-time {TERRITORY_FEE_NAME.toLowerCase()}.
                      Subsequent months will be ${invoice.monthlyTotal.toLocaleString()}/mo.
                    </p>
                  </div>

                  {/* Pay Button */}
                  <button
                    data-testid="pay-now-button"
                    className="sub-pay-btn"
                    disabled
                  >
                    <CreditCard size={18} />
                    Proceed to Payment — ${invoice.dueToday.toLocaleString()}
                    <ChevronRight size={16} />
                  </button>
                  <p className="sub-pay-note">Payment processing coming soon. Secure checkout powered by Stripe.</p>
                </>
              )}
            </div>

            {/* To-Do Reminders (visible only in the code, not to users) */}
            {/* TODO: Integrate Stripe payment processing */}
            {/* TODO: Validate small market discount tokens against backend */}
            {/* TODO: Auto-populate company info from invitation email */}
            {/* TODO: Post-payment flow — "What happens after user pays for service?" */}
          </div>
        </div>
      </div>
    </div>
  );
}
