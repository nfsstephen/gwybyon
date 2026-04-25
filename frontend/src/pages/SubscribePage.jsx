import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { MapPin } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import HighchartsMapDrilldown from '../components/HighchartsMapDrilldown';
import { WEBSITE_OPTIONS, TIERS, STATE_NAME_MAP, loadState, saveState } from './subscribe/constants';
import { WebsiteSelection } from './subscribe/WebsiteSelection';
import { BusinessForm } from './subscribe/BusinessForm';
import { CreateTerritoryPanel } from './subscribe/CreateTerritoryPanel';
import { TierSelection } from './subscribe/TierSelection';
import { InvoiceSummary } from './subscribe/InvoiceSummary';
import './SubscribePage.css';

export default function SubscribePage() {
  const saved = useMemo(loadState, []);
  const [websiteChoice, setWebsiteChoice] = useState(saved.websiteChoice ?? null);
  const [serviceType, setServiceType] = useState(saved.serviceType ?? null);
  const [businessDetails, setBusinessDetails] = useState(saved.businessDetails ?? { name: '', address: '', city: '', state: '', zip: '', email: '', industry: '' });
  const [selectedCounties, setSelectedCounties] = useState(saved.selectedCounties ?? []);
  const [countyNames, setCountyNames] = useState(saved.countyNames ?? {});
  const [selectedTier, setSelectedTier] = useState(saved.selectedTier ?? null);
  const [countyPrices, setCountyPrices] = useState(saved.countyPrices ?? {});
  const [pricingLoading, setPricingLoading] = useState(false);
  const [depositLoading, setDepositLoading] = useState(false);
  const [contractResult, setContractResult] = useState(null);
  const [createTerritory, setCreateTerritory] = useState(false);
  const [newTerritoryName, setNewTerritoryName] = useState('');
  const [territorySubmitted, setTerritorySubmitted] = useState(false);
  const [depositError, setDepositError] = useState(null);
  const [dbCategories, setDbCategories] = useState([]);
  const [takenTerritories, setTakenTerritories] = useState([]);
  const [regionGroups, setRegionGroups] = useState({});
  const [regionColors, setRegionColors] = useState({});
  const [territoryLoading, setTerritoryLoading] = useState(false);
  const [territoryError, setTerritoryError] = useState(null);
  const [territoryConfirmed, setTerritoryConfirmed] = useState(false);
  const [regionRefreshKey, setRegionRefreshKey] = useState(0);

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  // Fetch taken territories when industry changes
  useEffect(() => {
    if (!businessDetails.industry) {
      setTakenTerritories([]);
      return;
    }
    fetch(`${API_URL}/api/contracts/taken-territories?industry=${encodeURIComponent(businessDetails.industry)}`)
      .then(res => res.json())
      .then(data => setTakenTerritories(data.taken || []))
      .catch(() => setTakenTerritories([]));
  }, [businessDetails.industry, API_URL]);

  // Fetch categories from DB on mount
  useEffect(() => {
    fetch(`${API_URL}/api/contracts/categories`)
      .then(res => res.json())
      .then(data => setDbCategories(data.categories || []))
      .catch(() => setDbCategories([]));
  }, [API_URL]);

  // Fetch region groups when state or industry changes
  useEffect(() => {
    if (!businessDetails.state) {
      setRegionGroups({});
      setRegionColors({});
      return;
    }
    const stateCode = businessDetails.state.toLowerCase();
    const stateName = STATE_NAME_MAP[stateCode] || businessDetails.state;
    const categoryParam = businessDetails.industry ? `&category=${encodeURIComponent(businessDetails.industry)}` : '';
    fetch(`${API_URL}/api/contracts/region-colors?state=${encodeURIComponent(stateName)}${categoryParam}`)
      .then(res => res.json())
      .then(data => {
        setRegionGroups(data.region_groups || {});
        setRegionColors(data.colors || {});
      })
      .catch(() => { setRegionGroups({}); setRegionColors({}); });
  }, [businessDetails.state, businessDetails.industry, API_URL]);

  useEffect(() => {
    saveState({ websiteChoice, serviceType, businessDetails, selectedCounties, countyNames, selectedTier, countyPrices });
  }, [websiteChoice, serviceType, businessDetails, selectedCounties, countyNames, selectedTier, countyPrices]);

  const handleBusinessChange = (field, value) => {
    setBusinessDetails(prev => ({ ...prev, [field]: value }));
    if (field === 'state') {
      setSelectedCounties([]);
      setCountyNames({});
      setCountyPrices({});
    }
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

  const takenIds = useMemo(() => new Set(takenTerritories.map(t => t.id)), [takenTerritories]);

  const handleToggleCounty = useCallback((countyId, countyName) => {
    if (takenIds.has(countyId)) return;
    setSelectedCounties(prev =>
      prev.includes(countyId)
        ? prev.filter(id => id !== countyId)
        : [...prev, countyId]
    );
    if (countyName) {
      setCountyNames(prev => ({ ...prev, [countyId]: countyName }));
    }
  }, [takenIds]);

  // Handle Create New Territory submission
  const handleTerritorySubmit = useCallback(async () => {
    if (!newTerritoryName.trim() || selectedCounties.length === 0 || !businessDetails.industry) return;

    setTerritoryLoading(true);
    setTerritoryError(null);

    const counties = selectedCounties.map(id => ({
      name: countyNames[id] || id,
      hc_key: id,
    }));

    try {
      const res = await fetch(`${API_URL}/api/contracts/create-territory`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newTerritoryName.trim(),
          counties,
          state: businessDetails.state || '',
          category: businessDetails.industry,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setTerritoryError(data.detail || 'Failed to create territory');
        return;
      }
      setTerritorySubmitted(true);
      setRegionRefreshKey(prev => prev + 1);
      const stateCode = (businessDetails.state || '').toLowerCase();
      const stateFull = STATE_NAME_MAP[stateCode] || businessDetails.state;
      const categoryParam = businessDetails.industry ? `&category=${encodeURIComponent(businessDetails.industry)}` : '';
      fetch(`${API_URL}/api/contracts/region-colors?state=${encodeURIComponent(stateFull)}${categoryParam}`)
        .then(r => r.json())
        .then(d => {
          setRegionGroups(d.region_groups || {});
          setRegionColors(d.colors || {});
        })
        .catch(() => {});
    } catch {
      setTerritoryError('Network error. Please try again.');
    } finally {
      setTerritoryLoading(false);
    }
  }, [newTerritoryName, selectedCounties, countyNames, businessDetails.state, businessDetails.industry, API_URL]);

  // Fetch territory pricing when counties or industry changes
  useEffect(() => {
    if (selectedCounties.length === 0) {
      setCountyPrices({});
      return;
    }

    const category = businessDetails.industry || '';
    const countyNamesList = selectedCounties.map(id => countyNames[id] || id);

    setPricingLoading(true);
    fetch(`${API_URL}/api/contracts/territory-pricing`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ counties: countyNamesList, category, state: businessDetails.state || 'Florida' }),
    })
      .then(res => res.json())
      .then(data => {
        const priceMap = {};
        for (const id of selectedCounties) {
          const name = countyNames[id] || id;
          priceMap[id] = data.prices?.[name] ?? null;
        }
        setCountyPrices(priceMap);
      })
      .catch(() => setCountyPrices({}))
      .finally(() => setPricingLoading(false));
  }, [selectedCounties, businessDetails.industry, countyNames, businessDetails.state, API_URL]);

  const getCountyPrice = (countyId) => {
    const price = countyPrices[countyId];
    return price != null ? price : null;
  };

  // Region discount logic
  const completeRegions = useMemo(() => {
    if (Object.keys(regionGroups).length === 0 || selectedCounties.length === 0) return new Set();
    const selectedNames = new Set(
      selectedCounties.map(id => (countyNames[id] || '').toLowerCase().trim()).filter(Boolean)
    );
    const complete = new Set();
    for (const [regionName, info] of Object.entries(regionGroups)) {
      const regionCounties = info.counties || [];
      if (regionCounties.length > 0 && regionCounties.every(c => selectedNames.has(c))) {
        complete.add(regionName);
      }
    }
    return complete;
  }, [regionGroups, selectedCounties, countyNames]);

  const getCountyRegion = (countyId) => {
    const name = (countyNames[countyId] || '').toLowerCase().trim();
    const info = regionColors[name];
    return info ? info.region : null;
  };

  const isCountyDiscounted = (countyId) => {
    const region = getCountyRegion(countyId);
    return region && completeRegions.has(region);
  };

  const countyTotal = useMemo(() => {
    return selectedCounties.reduce((sum, id) => {
      const price = countyPrices[id];
      if (price == null) return sum;
      const discounted = isCountyDiscounted(id);
      return sum + (discounted ? Math.round(price * 0.75) : price);
    }, 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCounties, countyPrices, completeRegions]);

  const regionDiscountTotal = useMemo(() => {
    return selectedCounties.reduce((sum, id) => {
      const price = countyPrices[id];
      if (price == null) return sum;
      const discounted = isCountyDiscounted(id);
      return sum + (discounted ? Math.round(price * 0.25) : 0);
    }, 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCounties, countyPrices, completeRegions]);

  const invoice = useMemo(() => {
    const territoryTotal = countyTotal;
    const dueToday = websitePrice + territoryTotal;
    const depositAmount = Math.round(dueToday * 0.25);
    const balanceRemaining = dueToday - depositAmount;
    const monthlyTotal = selectedService ? selectedService.monthlyPrice : 0;
    return { territoryTotal, dueToday, depositAmount, balanceRemaining, monthlyTotal };
  }, [countyTotal, websitePrice, selectedService]);

  const invoiceReady = selectedWebsite && serviceType && selectedCounties.length > 0 && selectedService;
  const businessReady = businessDetails.name && businessDetails.address && businessDetails.city && businessDetails.state && businessDetails.zip && businessDetails.industry;
  const canDeposit = invoiceReady && businessReady;

  const handlePayDeposit = async () => {
    if (!canDeposit) return;
    setDepositLoading(true);
    setDepositError(null);
    try {
      const res = await fetch(`${API_URL}/api/contracts/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_name: businessDetails.name,
          business_address: businessDetails.address,
          business_city: businessDetails.city,
          business_state: businessDetails.state,
          business_zip: businessDetails.zip,
          business_email: businessDetails.email || '',
          industry: businessDetails.industry,
          selected_territories: selectedCounties.map(id => ({ id, name: countyNames[id] || id, price: countyPrices[id] ?? 0 })),
          territory_count: selectedCounties.length,
          tier_id: selectedTier,
          tier_name: selectedService.name,
          tier_monthly_price: selectedService.monthlyPrice,
          website_service: selectedWebsite.label,
          website_type: serviceType === 'build' ? selectedWebsite.buildLabel : 'Upgrade',
          website_price: websitePrice,
          territory_price_each: 0,
          territory_total: countyTotal,
          total_due: invoice.dueToday,
          monthly_recurring: selectedService.monthlyPrice,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Contract creation failed');

      // Record deposit
      const depRes = await fetch(`${API_URL}/api/contracts/${data.id}/deposit`, { method: 'POST' });
      const depData = await depRes.json();
      if (!depRes.ok) throw new Error(depData.detail || 'Deposit recording failed');

      setContractResult({
        contract_number: data.contract_number,
        deposit_amount: data.deposit_amount,
        balance_remaining: data.balance_remaining,
        contract_id: data.id,
      });
    } catch (err) {
      setDepositError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setDepositLoading(false);
    }
  };

  const handleDownloadPdf = () => {
    if (!contractResult?.contract_id) return;
    window.open(`${API_URL}/api/contracts/${contractResult.contract_id}/pdf`, '_blank');
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
          <h1 className="sub-title">Subscribe to Our Services — Grow your Business</h1>
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
            <WebsiteSelection
              options={WEBSITE_OPTIONS}
              websiteChoice={websiteChoice}
              serviceType={serviceType}
              onSelect={handleWebsiteSelect}
            />

            {/* Step 2: Business Details & Market Areas */}
            <h2 className="sub-section-label" id="step-business">2. Business Details & Market Areas</h2>
            <p className="sub-market-intro">
              Enter your business details below. Your state will automatically load the territory map where you can select the counties you want to claim as your exclusive market areas.
            </p>
            <p className="sub-region-promo" data-testid="region-promo-text">
              Purchase every county in a region and receive a <strong>25% discount</strong> plus the 
              option to <strong>split your territory cost into 12 monthly payments</strong> on your contract.
            </p>
            <BusinessForm businessDetails={businessDetails} onChange={handleBusinessChange} />

            {/* Industry selector attached to map */}
            <div className="sub-map-industry-bar" data-testid="map-industry-bar">
              <label htmlFor="biz-industry">Select Industry Region Map:</label>
              <select
                id="biz-industry"
                data-testid="business-industry-select"
                value={businessDetails.industry}
                onChange={e => handleBusinessChange('industry', e.target.value)}
              >
                <option value="">— Choose Your Industry —</option>
                <option value="Well Drilling">Well Drilling</option>
                <option value="Septic Tank Installation &amp; Service">Septic Tank Installation &amp; Service</option>
                <option value="Plumbers">Plumbers</option>
                <option value="Electricians">Electricians</option>
                <option value="Air &amp; Heating Co.">Air &amp; Heating Co.</option>
                <option value="Pest Control Services">Pest Control Services</option>
                <option value="Real Estate Brokers">Real Estate Brokers</option>
                <option value="Roofing Co.">Roofing Co.</option>
              </select>
            </div>

            {!businessDetails.industry ? (
              <div className="sub-map-gate" data-testid="map-industry-gate" style={{
                background: '#1e293b',
                borderRadius: '0 0 10px 10px',
                padding: '60px 24px',
                textAlign: 'center',
                color: '#94a3b8',
                border: '2px dashed #334155',
              }}>
                <MapPin size={40} style={{ color: '#475569', marginBottom: '16px' }} />
                <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#e2e8f0', marginBottom: '8px' }}>
                  Select an industry above to view the region map
                </p>
                <p style={{ fontSize: '0.85rem', maxWidth: '420px', margin: '0 auto' }}>
                  Each industry has its own exclusive region map. Choose your industry first to see available counties and existing regions.
                </p>
              </div>
            ) : (
              <>
                <div className="sub-map-industry-confirm" data-testid="map-industry-confirm" style={{
                  background: '#0f766e',
                  color: '#ffffff',
                  padding: '10px 16px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  textAlign: 'center',
                  letterSpacing: '0.5px',
                  borderRadius: '8px 8px 0 0',
                }}>
                  REGION MAP: {businessDetails.industry.toUpperCase()}
                </div>
                <HighchartsMapDrilldown
                  country="USA"
                  state={businessDetails.state}
                  selectedCounties={selectedCounties}
                  onToggleCounty={handleToggleCounty}
                  takenCounties={takenIds}
                  regionRefreshKey={regionRefreshKey}
                  category={businessDetails.industry}
                />
              </>
            )}

            <CreateTerritoryPanel
              createTerritory={createTerritory}
              setCreateTerritory={setCreateTerritory}
              industry={businessDetails.industry}
              newTerritoryName={newTerritoryName}
              setNewTerritoryName={setNewTerritoryName}
              selectedCounties={selectedCounties}
              countyNames={countyNames}
              territorySubmitted={territorySubmitted}
              setTerritorySubmitted={setTerritorySubmitted}
              territoryConfirmed={territoryConfirmed}
              setTerritoryConfirmed={setTerritoryConfirmed}
              territoryLoading={territoryLoading}
              territoryError={territoryError}
              setTerritoryError={setTerritoryError}
              onSubmit={handleTerritorySubmit}
            />

            {/* Step 3: Tier Selection */}
            <h2 className="sub-section-label" id="tier-selection">3. Select Your Service Tier</h2>
            <TierSelection selectedTier={selectedTier} onSelectTier={setSelectedTier} />

          </div>

          {/* Right: Invoice */}
          <InvoiceSummary
            selectedWebsite={selectedWebsite}
            serviceType={serviceType}
            websiteLineLabel={websiteLineLabel}
            websitePrice={websitePrice}
            selectedCounties={selectedCounties}
            countyNames={countyNames}
            pricingLoading={pricingLoading}
            getCountyPrice={getCountyPrice}
            isCountyDiscounted={isCountyDiscounted}
            getCountyRegion={getCountyRegion}
            countyTotal={countyTotal}
            regionDiscountTotal={regionDiscountTotal}
            completeRegions={completeRegions}
            selectedService={selectedService}
            invoice={invoice}
            invoiceReady={invoiceReady}
            businessReady={businessReady}
            canDeposit={canDeposit}
            depositLoading={depositLoading}
            depositError={depositError}
            contractResult={contractResult}
            onPayDeposit={handlePayDeposit}
            onDownloadPdf={handleDownloadPdf}
          />
        </div>
      </div>
    </div>
  );
}
