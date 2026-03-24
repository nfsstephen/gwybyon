import React, { useState, useMemo, useEffect } from 'react';
import { Check, ShoppingCart, Tag, AlertCircle, CreditCard, ChevronRight, Globe, RefreshCw, MapPin } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import CountyMap from '../components/CountyMap';
import './SubscribePage.css';

const WEBSITE_OPTIONS = [
  {
    id: 'new-build',
    label: 'New Website Build',
    icon: Globe,
    description: 'Brand new website from scratch',
    buildLabel: 'Build',
    buildPrice: 150,
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

const DEMO_COUNTIES = [
  { id: 'union', name: 'Union', market: 'small', price: 300, isHome: true },
  { id: 'baker', name: 'Baker', market: 'small', price: 300 },
  { id: 'bradford', name: 'Bradford', market: 'small', price: 300 },
  { id: 'columbia', name: 'Columbia', market: 'large', price: 1200 },
  { id: 'alachua', name: 'Alachua', market: 'large', price: 1200 },
  { id: 'clay', name: 'Clay', market: 'large', price: 1200 },
];

const TIERS = [
  { id: 'foundation', tier: 1, name: 'Foundation', monthlyPrice: 497 },
  { id: 'growth', tier: 2, name: 'Growth', monthlyPrice: 797, popular: true },
  { id: 'authority', tier: 3, name: 'Authority', monthlyPrice: 1297 },
];

export default function SubscribePage() {
  const [websiteChoice, setWebsiteChoice] = useState(null);
  const [serviceType, setServiceType] = useState(null);
  const [selectedCounties, setSelectedCounties] = useState([]);
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

  const handleToggleCounty = (countyId) => {
    setSelectedCounties(prev =>
      prev.includes(countyId)
        ? prev.filter(id => id !== countyId)
        : [...prev, countyId]
    );
  };

  const countyTotal = useMemo(() => {
    return selectedCounties.reduce((sum, id) => {
      const county = DEMO_COUNTIES.find(c => c.id === id);
      return sum + (county ? county.price : 0);
    }, 0);
  }, [selectedCounties]);

  const invoice = useMemo(() => {
    const discountMultiplier = tokenApplied ? 0.5 : 1;

    let monthlyTotal = 0;
    if (selectedService) {
      monthlyTotal = selectedService.monthlyPrice * discountMultiplier;
    }

    const dueToday = monthlyTotal + websitePrice + countyTotal;

    return { discountMultiplier, monthlyTotal, websiteTotal: websitePrice, countyTotal, dueToday, tokenApplied };
  }, [selectedService, websitePrice, countyTotal, tokenApplied]);

  const handleApplyToken = () => {
    // TODO: Validate token against backend
    setTokenApplied(false);
  };

  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
      }
    }
  }, [location.hash]);

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
            <h2 className="sub-section-label" id="step-website">1. Website Service</h2>
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

            {/* Step 2: Market Area Selection */}
            <h2 className="sub-section-label" id="step-market-areas">2. Select Your Market Areas</h2>
            <p className="sub-market-intro">
              Click on the counties below to claim exclusive territory rights.
              Each county is classified by customer density — not geographic size.
            </p>
            <div className="sub-market-layout">
              <div className="sub-market-map-col">
                <CountyMap
                  counties={DEMO_COUNTIES}
                  selectedCounties={selectedCounties}
                  onToggleCounty={handleToggleCounty}
                />
              </div>
              <div className="sub-market-summary-col">
                {selectedCounties.length > 0 ? (
                  <div className="sub-county-summary" data-testid="county-summary">
                    <div className="sub-county-summary-title">
                      <MapPin size={16} />
                      <span>{selectedCounties.length} {selectedCounties.length === 1 ? 'Territory' : 'Territories'} Selected</span>
                    </div>
                    <div className="sub-county-list">
                      {selectedCounties.map(id => {
                        const c = DEMO_COUNTIES.find(co => co.id === id);
                        return (
                          <div key={id} className="sub-county-chip" data-testid={`county-chip-${id}`}>
                            <span>{c.name} County</span>
                            <span className={`sub-county-chip-tag ${c.market}`}>{c.market === 'small' ? 'Small' : 'Large'}</span>
                            <span className="sub-county-chip-price">${c.price.toLocaleString()}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="sub-county-total">
                      <span>Territory Total</span>
                      <span>${countyTotal.toLocaleString()}</span>
                    </div>
                  </div>
                ) : (
                  <div className="sub-county-empty">
                    <MapPin size={24} />
                    <p>Click counties on the map to claim your exclusive territories</p>
                  </div>
                )}
              </div>
            </div>

            {/* Step 3: Tier Selection */}
            <h2 className="sub-section-label">3. Select Your Service Tier</h2>
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
                          <div className="sub-line-type">Website Service</div>
                        </div>
                        <div className="sub-line-amount">${websitePrice}</div>
                      </div>
                    )}

                    {selectedService && (
                      <div className="sub-invoice-line" data-testid="invoice-line-plan">
                        <div>
                          <div className="sub-line-name">{selectedService.name} Plan (Tier {selectedService.tier})</div>
                          <div className="sub-line-type">Monthly Recurring</div>
                        </div>
                        <div className="sub-line-amount">${selectedService.monthlyPrice.toLocaleString()}/mo</div>
                      </div>
                    )}

                    {selectedCounties.length > 0 && (
                      <div className="sub-invoice-line" data-testid="invoice-line-territories">
                        <div>
                          <div className="sub-line-name">Market Territories ({selectedCounties.length})</div>
                          <div className="sub-line-type">
                            {selectedCounties.map(id => DEMO_COUNTIES.find(c => c.id === id)?.name).join(', ')}
                          </div>
                        </div>
                        <div className="sub-line-amount">${countyTotal.toLocaleString()}</div>
                      </div>
                    )}
                  </div>

                  {/* Missing selection notice */}
                  {((!selectedWebsite || !serviceType) || selectedCounties.length === 0 || !selectedService) && (
                    <div className="sub-invoice-notice">
                      <AlertCircle size={14} />
                      <span>
                        {(!selectedWebsite || !serviceType)
                          ? 'Select a website service to continue'
                          : selectedCounties.length === 0
                            ? 'Select at least one market area'
                            : 'Select a service tier to continue'}
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

                  {/* Totals - only show when all selections made */}
                  {selectedService && selectedWebsite && serviceType && selectedCounties.length > 0 && (
                    <div className="sub-invoice-totals">
                      <div className="sub-total-line">
                        <span>Website Service</span>
                        <span>${websitePrice}</span>
                      </div>
                      <div className="sub-total-line">
                        <span>Market Territories</span>
                        <span>${countyTotal.toLocaleString()}</span>
                      </div>
                      <div className="sub-total-line">
                        <span>Monthly Recurring</span>
                        <span className={invoice.tokenApplied ? 'sub-discounted' : ''}>
                          {invoice.tokenApplied && <s>${selectedService.monthlyPrice.toLocaleString()}</s>}
                          ${invoice.monthlyTotal.toLocaleString()}/mo
                        </span>
                      </div>
                      <div className="sub-total-line sub-total-due">
                        <span>Due Today</span>
                        <span>${invoice.dueToday.toLocaleString()}</span>
                      </div>
                      <p className="sub-total-note">
                        Due today includes website service, market territory fees, and first month.
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
