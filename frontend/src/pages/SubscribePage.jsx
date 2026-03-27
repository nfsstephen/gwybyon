import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Check, ShoppingCart, AlertCircle, CreditCard, ChevronRight, Globe, RefreshCw, MapPin, FileText, Download } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import HighchartsMapDrilldown from '../components/HighchartsMapDrilldown';
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

const TIERS = [
  { id: 'foundation', tier: 1, name: 'Foundation', monthlyPrice: 497 },
  { id: 'growth', tier: 2, name: 'Growth', monthlyPrice: 797, popular: true },
  { id: 'authority', tier: 3, name: 'Authority', monthlyPrice: 1297 },
];

const CONTINENTAL_STATES = [
  { abbr: 'AL', name: 'Alabama' }, { abbr: 'AZ', name: 'Arizona' }, { abbr: 'AR', name: 'Arkansas' },
  { abbr: 'CA', name: 'California' }, { abbr: 'CO', name: 'Colorado' }, { abbr: 'CT', name: 'Connecticut' },
  { abbr: 'DE', name: 'Delaware' }, { abbr: 'FL', name: 'Florida' }, { abbr: 'GA', name: 'Georgia' },
  { abbr: 'ID', name: 'Idaho' }, { abbr: 'IL', name: 'Illinois' }, { abbr: 'IN', name: 'Indiana' },
  { abbr: 'IA', name: 'Iowa' }, { abbr: 'KS', name: 'Kansas' }, { abbr: 'KY', name: 'Kentucky' },
  { abbr: 'LA', name: 'Louisiana' }, { abbr: 'ME', name: 'Maine' }, { abbr: 'MD', name: 'Maryland' },
  { abbr: 'MA', name: 'Massachusetts' }, { abbr: 'MI', name: 'Michigan' }, { abbr: 'MN', name: 'Minnesota' },
  { abbr: 'MS', name: 'Mississippi' }, { abbr: 'MO', name: 'Missouri' }, { abbr: 'MT', name: 'Montana' },
  { abbr: 'NE', name: 'Nebraska' }, { abbr: 'NV', name: 'Nevada' }, { abbr: 'NH', name: 'New Hampshire' },
  { abbr: 'NJ', name: 'New Jersey' }, { abbr: 'NM', name: 'New Mexico' }, { abbr: 'NY', name: 'New York' },
  { abbr: 'NC', name: 'North Carolina' }, { abbr: 'ND', name: 'North Dakota' }, { abbr: 'OH', name: 'Ohio' },
  { abbr: 'OK', name: 'Oklahoma' }, { abbr: 'OR', name: 'Oregon' }, { abbr: 'PA', name: 'Pennsylvania' },
  { abbr: 'RI', name: 'Rhode Island' }, { abbr: 'SC', name: 'South Carolina' }, { abbr: 'SD', name: 'South Dakota' },
  { abbr: 'TN', name: 'Tennessee' }, { abbr: 'TX', name: 'Texas' }, { abbr: 'UT', name: 'Utah' },
  { abbr: 'VT', name: 'Vermont' }, { abbr: 'VA', name: 'Virginia' }, { abbr: 'WA', name: 'Washington' },
  { abbr: 'WV', name: 'West Virginia' }, { abbr: 'WI', name: 'Wisconsin' }, { abbr: 'WY', name: 'Wyoming' },
];

const STORAGE_KEY = 'gwybyon_subscribe';

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export default function SubscribePage() {
  const saved = useMemo(loadState, []);
  const [websiteChoice, setWebsiteChoice] = useState(saved.websiteChoice ?? null);
  const [serviceType, setServiceType] = useState(saved.serviceType ?? null);
  const [businessDetails, setBusinessDetails] = useState(saved.businessDetails ?? { name: '', address: '', city: '', state: '', zip: '', email: '', industry: '' });
  const [selectedCounties, setSelectedCounties] = useState(saved.selectedCounties ?? []);
  const [countyNames, setCountyNames] = useState(saved.countyNames ?? {});
  const [selectedTier, setSelectedTier] = useState(saved.selectedTier ?? null);

  useEffect(() => {
    saveState({ websiteChoice, serviceType, businessDetails, selectedCounties, countyNames, selectedTier });
  }, [websiteChoice, serviceType, businessDetails, selectedCounties, countyNames, selectedTier]);

  const handleBusinessChange = (field, value) => {
    setBusinessDetails(prev => ({ ...prev, [field]: value }));
  };

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

  const handleToggleCounty = useCallback((countyId, countyName) => {
    setSelectedCounties(prev =>
      prev.includes(countyId)
        ? prev.filter(id => id !== countyId)
        : [...prev, countyId]
    );
    if (countyName) {
      setCountyNames(prev => ({ ...prev, [countyId]: countyName }));
    }
  }, []);

  const TERRITORY_PRICE = 300;

  const countyTotal = useMemo(() => {
    return selectedCounties.length * TERRITORY_PRICE;
  }, [selectedCounties]);

  const invoice = useMemo(() => {
    let monthlyTotal = 0;
    if (selectedService) {
      monthlyTotal = selectedService.monthlyPrice;
    }

    const dueToday = websitePrice + countyTotal;
    const depositAmount = Math.round(dueToday * 0.25 * 100) / 100;
    const balanceRemaining = Math.round((dueToday - depositAmount) * 100) / 100;

    return { monthlyTotal, websiteTotal: websitePrice, countyTotal, dueToday, depositAmount, balanceRemaining };
  }, [selectedService, websitePrice, countyTotal]);

  const [depositLoading, setDepositLoading] = useState(false);
  const [contractResult, setContractResult] = useState(null);
  const [depositError, setDepositError] = useState(null);

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  const invoiceReady = selectedWebsite && serviceType && selectedCounties.length > 0 && selectedService;
  const businessReady = businessDetails.name && businessDetails.address && businessDetails.city && businessDetails.state && businessDetails.zip && businessDetails.industry;
  const canDeposit = invoiceReady && businessReady;

  const handlePayDeposit = async () => {
    if (!canDeposit) return;
    setDepositLoading(true);
    setDepositError(null);
    try {
      const industryLabels = {
        'well-septic': 'Well & Septic Co.',
        'plumbers': 'Plumbers',
        'electricians': 'Electricians',
        'air-heating': 'Air & Heating Co.',
        'pest-control': 'Pest Control Services',
        'real-estate': 'Real Estate Brokers',
        'roofing': 'Roofing Co.',
      };

      const payload = {
        business_name: businessDetails.name,
        business_address: businessDetails.address,
        business_city: businessDetails.city,
        business_state: businessDetails.state,
        business_zip: businessDetails.zip,
        business_email: businessDetails.email || '',
        industry: industryLabels[businessDetails.industry] || businessDetails.industry,
        selected_territories: selectedCounties.map(id => ({ id, name: countyNames[id] || id })),
        territory_count: selectedCounties.length,
        tier_id: selectedService.id,
        tier_name: selectedService.name,
        tier_monthly_price: selectedService.monthlyPrice,
        website_service: selectedWebsite.label,
        website_type: serviceType,
        website_price: websitePrice,
        territory_price_each: TERRITORY_PRICE,
        territory_total: countyTotal,
        total_due: invoice.dueToday,
        monthly_recurring: selectedService.monthlyPrice,
      };

      // Create contract
      const res = await fetch(`${API_URL}/api/contracts/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to create contract');
      const contract = await res.json();

      // Record deposit
      const depRes = await fetch(`${API_URL}/api/contracts/${contract.id}/deposit`, {
        method: 'POST',
      });
      if (!depRes.ok) throw new Error('Failed to record deposit');
      const deposit = await depRes.json();

      setContractResult({
        ...contract,
        ...deposit,
      });
    } catch (err) {
      setDepositError(err.message || 'Something went wrong');
    } finally {
      setDepositLoading(false);
    }
  };

  const handleDownloadPdf = () => {
    if (!contractResult?.id) return;
    window.open(`${API_URL}/api/contracts/${contractResult.id}/pdf`, '_blank');
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

            {/* Step 2: Business Details & Market Areas */}
            <h2 className="sub-section-label" id="step-business">2. Business Details & Market Areas</h2>
            <p className="sub-market-intro">
              Enter your business details below. Your city and state will automatically load the territory map where you can select the counties you want to claim as your exclusive market areas.
            </p>
            <div className="sub-business-form" data-testid="business-details-form">
              <div className="sub-business-field">
                <label htmlFor="biz-name">Business Name</label>
                <input
                  id="biz-name"
                  data-testid="business-name-input"
                  type="text"
                  placeholder="Your business name"
                  value={businessDetails.name}
                  onChange={e => handleBusinessChange('name', e.target.value)}
                  required
                />
              </div>
              <div className="sub-business-field">
                <label htmlFor="biz-address">Address</label>
                <input
                  id="biz-address"
                  data-testid="business-address-input"
                  type="text"
                  placeholder="Street address"
                  value={businessDetails.address}
                  onChange={e => handleBusinessChange('address', e.target.value)}
                  required
                />
              </div>
              <div className="sub-business-row sub-business-row-3col">
                <div className="sub-business-field">
                  <label htmlFor="biz-city">City</label>
                  <input
                    id="biz-city"
                    data-testid="business-city-input"
                    type="text"
                    placeholder="City"
                    value={businessDetails.city}
                    onChange={e => handleBusinessChange('city', e.target.value)}
                    required
                  />
                </div>
                <div className="sub-business-field">
                  <label htmlFor="biz-state">State</label>
                  <select
                    id="biz-state"
                    data-testid="business-state-select"
                    value={businessDetails.state}
                    onChange={e => handleBusinessChange('state', e.target.value)}
                    required
                  >
                    <option value="">Select State</option>
                    {CONTINENTAL_STATES.map(s => (
                      <option key={s.abbr} value={s.abbr}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div className="sub-business-field sub-business-field-zip">
                  <label htmlFor="biz-zip">Zip Code</label>
                  <input
                    id="biz-zip"
                    data-testid="business-zip-input"
                    type="text"
                    placeholder="Zip"
                    value={businessDetails.zip}
                    onChange={e => handleBusinessChange('zip', e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="sub-business-field">
                <label htmlFor="biz-email">Email Address</label>
                <input
                  id="biz-email"
                  data-testid="business-email-input"
                  type="email"
                  placeholder="you@example.com"
                  value={businessDetails.email}
                  onChange={e => handleBusinessChange('email', e.target.value)}
                />
              </div>
              <div className="sub-business-field">
                <label htmlFor="biz-industry">Industry Type</label>
                <select
                  id="biz-industry"
                  data-testid="business-industry-select"
                  value={businessDetails.industry}
                  onChange={e => handleBusinessChange('industry', e.target.value)}
                  required
                >
                  <option value="">Select Industry</option>
                  <option value="well-septic">Well &amp; Septic Co.</option>
                  <option value="plumbers">Plumbers</option>
                  <option value="electricians">Electricians</option>
                  <option value="air-heating">Air &amp; Heating Co.</option>
                  <option value="pest-control">Pest Control Services</option>
                  <option value="real-estate">Real Estate Brokers</option>
                  <option value="roofing">Roofing Co.</option>
                </select>
              </div>
            </div>

            <HighchartsMapDrilldown
              country="USA"
              city={businessDetails.city}
              selectedCounties={selectedCounties}
              onToggleCounty={handleToggleCounty}
            />

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
              {(!selectedService && !selectedWebsite && selectedCounties.length === 0) ? (
                <div className="sub-invoice-empty">
                  <ShoppingCart size={32} />
                  <p>Select services or territories to build your invoice</p>
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

                    {/* 2. Market Territories — counties first, then total */}
                    {selectedCounties.length > 0 && (
                      <>
                        <div className="sub-invoice-territory-label">
                          <MapPin size={14} />
                          <span>Market Territories ({selectedCounties.length})</span>
                        </div>
                        {selectedCounties.map(id => {
                          const displayName = countyNames[id] || id;
                          return (
                            <div key={id} className="sub-invoice-territory-item" data-testid={`invoice-county-${id}`}>
                              <div>
                                <span className="sub-invoice-county-name">{displayName}</span>
                              </div>
                              <span className="sub-invoice-county-price">${TERRITORY_PRICE.toLocaleString()}</span>
                            </div>
                          );
                        })}
                        <div className="sub-invoice-territory-total-row">
                          <span>Territory Total</span>
                          <span>${countyTotal.toLocaleString()}</span>
                        </div>
                      </>
                    )}

                    {/* 3. Service Tier — at bottom with first month free note */}
                    {selectedService && (
                      <div className="sub-invoice-tier-block" data-testid="invoice-line-plan">
                        <div className="sub-invoice-line">
                          <div>
                            <div className="sub-line-name">{selectedService.name} Plan (Tier {selectedService.tier})</div>
                            <div className="sub-line-type">Monthly Recurring</div>
                          </div>
                          <div className="sub-line-amount">${selectedService.monthlyPrice.toLocaleString()}/mo</div>
                        </div>
                        <p className="sub-invoice-free-month">First Month Free, to cover the learning curve of using the Tools.</p>
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
                  {(selectedWebsite && serviceType) && (!businessReady || selectedCounties.length === 0) && (
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
                  {(selectedWebsite && serviceType && businessReady && selectedCounties.length > 0 && !selectedService) && (
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
                      <h4>Territory Reserved!</h4>
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
                        onClick={handleDownloadPdf}
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
                      {/* Pay Deposit Button */}
                      <button
                        data-testid="pay-deposit-button"
                        className="sub-pay-btn"
                        disabled={!canDeposit || depositLoading}
                        onClick={handlePayDeposit}
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

            {/* TODO: Integrate Stripe payment processing */}
            {/* TODO: Auto-populate company info from invitation email */}
            {/* TODO: Post-payment flow — "What happens after user pays for service?" */}
          </div>
        </div>
      </div>
    </div>
  );
}
