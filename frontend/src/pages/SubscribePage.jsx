import React, { useState, useMemo } from 'react';
import { Check, ShoppingCart, Tag, AlertCircle, CreditCard, ChevronRight, Globe, RefreshCw } from 'lucide-react';
import './SubscribePage.css';

const WEBSITE_OPTIONS = [
  {
    id: 'new-build',
    label: 'New Website Build',
    icon: Globe,
    description: 'Brand new website from scratch',
    buildLabel: 'Build',
    buildPrice: 100,
    upgradePrice: 50,
  },
  {
    id: 'rebuild',
    label: 'Rebuild & Optimize',
    icon: RefreshCw,
    description: 'Rebuild your existing website',
    buildLabel: 'Rebuild',
    buildPrice: 300,
    upgradePrice: 150,
  },
];

const TIERS = [
  { id: 'foundation', tier: 1, name: 'Foundation', monthlyPrice: 497 },
  { id: 'growth', tier: 2, name: 'Growth', monthlyPrice: 797, popular: true },
  { id: 'authority', tier: 3, name: 'Authority', monthlyPrice: 1297 },
];

const TERRITORY_FEE = 1497;
const TERRITORY_FEE_NAME = 'Market Territory Restriction Fee (One-Time)';

export default function SubscribePage() {
  const [websiteChoice, setWebsiteChoice] = useState(null); // 'new-build' or 'rebuild'
  const [serviceType, setServiceType] = useState(null); // 'build' or 'upgrade'
  const [selectedTier, setSelectedTier] = useState(null);
  const [discountToken, setDiscountToken] = useState('');
  const [tokenApplied, setTokenApplied] = useState(false);

  const selectedService = TIERS.find(s => s.id === selectedTier);
  const selectedWebsite = WEBSITE_OPTIONS.find(w => w.id === websiteChoice);

  const websitePrice = useMemo(() => {
    if (!selectedWebsite || !serviceType) return 0;
    return serviceType === 'build' ? selectedWebsite.buildPrice : selectedWebsite.upgradePrice;
  }, [selectedWebsite, serviceType]);

  const websiteLineLabel = useMemo(() => {
    if (!selectedWebsite || !serviceType) return '';
    if (serviceType === 'build') return selectedWebsite.label;
    return `${selectedWebsite.label} — Upgrade`;
  }, [selectedWebsite, serviceType]);

  const handleWebsiteSelect = (optId, type) => {
    if (websiteChoice === optId && serviceType === type) {
      setWebsiteChoice(null);
      setServiceType(null);
    } else {
      setWebsiteChoice(optId);
      setServiceType(type);
    }
  };

  const invoice = useMemo(() => {
    const discountMultiplier = tokenApplied ? 0.5 : 1;
    
    let monthlyTotal = 0;
    let oneTimeTotal = 0;
    
    if (selectedService) {
      monthlyTotal = selectedService.monthlyPrice * discountMultiplier;
      oneTimeTotal = TERRITORY_FEE * discountMultiplier;
    }
    
    const dueToday = monthlyTotal + oneTimeTotal + websitePrice;

    return { discountMultiplier, monthlyTotal, oneTimeTotal, websiteTotal: websitePrice, dueToday, tokenApplied };
  }, [selectedService, websitePrice, tokenApplied]);

  const handleApplyToken = () => {
    // TODO: Validate token against backend
    setTokenApplied(false);
  };

  return (
    <div className="sub-page" data-testid="subscribe-page">
      {/* Header */}
      <section className="sub-header">
        <div className="sub-container">
          <h1 className="sub-title">Subscribe to Our Services</h1>
          <p className="sub-subtitle">
            Select your options below to build your order. Your subscription includes exclusive
            territory rights, website services, GeoGrid tools, and BYON communication lines.
          </p>
        </div>
      </section>

      <div className="sub-container sub-body">
        <div className="sub-layout">
          {/* Left: Selections */}
          <div className="sub-selection" data-testid="service-selection">

            {/* Step 1: Website Choice */}
            <h2 className="sub-section-label">1. Website Service</h2>
            <div className="sub-website-options">
              {WEBSITE_OPTIONS.map(opt => {
                const isBuildSelected = websiteChoice === opt.id && serviceType === 'build';
                const isUpgradeSelected = websiteChoice === opt.id && serviceType === 'upgrade';
                const isCardActive = websiteChoice === opt.id;
                return (
                  <div
                    key={opt.id}
                    data-testid={`website-${opt.id}`}
                    className={`sub-website-card ${isCardActive ? 'selected' : ''}`}
                  >
                    <div className="sub-website-card-header">
                      <opt.icon size={20} className="sub-website-icon" />
                      <div className="sub-website-info">
                        <div className="sub-website-name">{opt.label}</div>
                        <div className="sub-website-desc">{opt.description}</div>
                      </div>
                    </div>
                    <div className="sub-website-suboptions">
                      <button
                        data-testid={`website-${opt.id}-build`}
                        className={`sub-website-suboption ${isBuildSelected ? 'active' : ''}`}
                        onClick={() => handleWebsiteSelect(opt.id, 'build')}
                      >
                        <div className="sub-suboption-check">
                          {isBuildSelected ? <Check size={14} /> : <div className="sub-tier-circle" />}
                        </div>
                        <span className="sub-suboption-label">{opt.buildLabel}</span>
                        <span className="sub-suboption-price">${opt.buildPrice}</span>
                      </button>
                      <button
                        data-testid={`website-${opt.id}-upgrade`}
                        className={`sub-website-suboption ${isUpgradeSelected ? 'active' : ''}`}
                        onClick={() => handleWebsiteSelect(opt.id, 'upgrade')}
                      >
                        <div className="sub-suboption-check">
                          {isUpgradeSelected ? <Check size={14} /> : <div className="sub-tier-circle" />}
                        </div>
                        <span className="sub-suboption-label">Upgrade</span>
                        <span className="sub-suboption-price">${opt.upgradePrice}</span>
                      </button>
                      {isUpgradeSelected && (
                        <p className="sub-upgrade-note" data-testid={`upgrade-note-${opt.id}`}>
                          Someone will be in contact with you to learn what upgrades you desire.
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Step 2: Tier Selection */}
            <h2 className="sub-section-label">2. Select Your Service Tier</h2>
            <div className="sub-tiers">
              {TIERS.map(svc => {
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
            <h2 className="sub-section-label">Your Invoice</h2>

            <div className="sub-invoice">
              {(!selectedService && !selectedWebsite) ? (
                <div className="sub-invoice-empty">
                  <ShoppingCart size={32} />
                  <p>Select a website service and tier to see your invoice</p>
                </div>
              ) : (
                <>
                  <div className="sub-invoice-header">
                    <h3>Gateway AI Systems</h3>
                    <span>Invoice Summary</span>
                  </div>

                  {/* Line Items */}
                  <div className="sub-invoice-lines">
                    {selectedWebsite && serviceType && (
                      <div className="sub-invoice-line" data-testid="invoice-line-website">
                        <div>
                          <div className="sub-line-name">{websiteLineLabel}</div>
                          <div className="sub-line-type">Website Service (One-Time)</div>
                        </div>
                        <div className="sub-line-amount">${websitePrice}</div>
                      </div>
                    )}

                    {selectedService && (
                      <>
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
                      </>
                    )}
                  </div>

                  {/* Missing selection notice */}
                  {((!selectedWebsite || !serviceType) || !selectedService) && (
                    <div className="sub-invoice-notice">
                      <AlertCircle size={14} />
                      <span>
                        {(!selectedWebsite || !serviceType) ? 'Select a website service to continue' : 'Select a service tier to continue'}
                      </span>
                    </div>
                  )}

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

                  {/* Totals - only show when both selections made */}
                  {selectedService && selectedWebsite && serviceType && (
                    <div className="sub-invoice-totals">
                      <div className="sub-total-line">
                        <span>Website Service</span>
                        <span>${websitePrice}</span>
                      </div>
                      <div className="sub-total-line">
                        <span>Monthly Recurring</span>
                        <span className={invoice.tokenApplied ? 'sub-discounted' : ''}>
                          {invoice.tokenApplied && <s>${selectedService.monthlyPrice.toLocaleString()}</s>}
                          ${invoice.monthlyTotal.toLocaleString()}/mo
                        </span>
                      </div>
                      <div className="sub-total-line">
                        <span>Territory Fee (One-Time)</span>
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
                        Due today includes website service, first month, plus the one-time territory fee.
                        Subsequent months will be ${invoice.monthlyTotal.toLocaleString()}/mo.
                      </p>
                    </div>
                  )}

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
