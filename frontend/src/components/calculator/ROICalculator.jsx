import React, { useState, useMemo } from 'react';
import ContactModal from './ContactModal';

const OCCUPANCY_RATES = { lowest: 0.40, mid: 0.70, peak: 1.00 };
const OCCUPANCY_LABELS = { lowest: 'Lowest (40%)', mid: 'Mid (70%)', peak: 'Peak (100%)' };
const LEVELS = ['lowest', 'mid', 'peak'];

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

const TableRow = ({ label, getValue, className }) => (
  <div className={`calc-table-row ${className || ''}`}>
    <span>{label}</span>
    {LEVELS.map((l) => (
      <span key={l}>{formatCurrency(getValue(l))}</span>
    ))}
  </div>
);

const ROICalculator = ({ config }) => {
  const { constants, calcInvestment, storageKey, editableFields } = config;

  const [inputs, setInputs] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        /* fall through */
      }
    }
    return editableFields.reduce((acc, f) => ({ ...acc, [f.key]: '' }), {});
  });

  const [saveMessage, setSaveMessage] = useState('');
  const [showContactModal, setShowContactModal] = useState(false);

  const setInput = (key, value) => setInputs((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    localStorage.setItem(storageKey, JSON.stringify(inputs));
    setSaveMessage('Entry saved!');
    setTimeout(() => setSaveMessage(''), 2000);
  };

  const handleRequestConfirmation = () => {
    localStorage.setItem(storageKey, JSON.stringify(inputs));
    setShowContactModal(true);
  };

  const results = useMemo(() => {
    const spaces = Number(inputs.totalParkingSpaces) || 0;
    const charge = Number(inputs.chargePerSpace) || 0;
    const r = {
      grossSales: {},
      operatingCost: {},
      annualNetReturn: {},
      investment: {},
      netAnnualReturn: {},
    };

    LEVELS.forEach((level) => {
      const rate = OCCUPANCY_RATES[level];
      const dailyGross = spaces * charge * rate;
      const dailyOpCost = dailyGross * (constants.dailyOperatingCostPercent / 100);

      r.grossSales[level] = {
        daily: dailyGross,
        weekly: dailyGross * 7,
        monthly: dailyGross * 30,
        annual: dailyGross * 365,
      };
      r.operatingCost[level] = {
        daily: dailyOpCost,
        weekly: dailyOpCost * 7,
        monthly: dailyOpCost * 30,
        annual: dailyOpCost * 365,
      };

      const investment = calcInvestment(inputs, constants);
      r.annualNetReturn[level] = r.grossSales[level].annual - r.operatingCost[level].annual;
      r.investment[level] = investment;
      r.netAnnualReturn[level] = r.annualNetReturn[level] - investment;
    });

    return r;
  }, [inputs, constants, calcInvestment]);

  const calculatorInputs = useMemo(
    () => ({
      ...inputs,
      dailyOperatingCostPercent: constants.dailyOperatingCostPercent,
      systemCostPerSpace: constants.systemCostPerSpace,
      hardwareCostPerStore: constants.hardwareCostPerStore,
    }),
    [inputs, constants]
  );

  return (
    <div className={`calculator-page ${config.pageClass || ''}`}>
      <section className={`calc-hero ${config.heroClass || ''}`}>
        <div className="calc-container">
          <h1 data-testid="calc-title">{config.title}</h1>
          <p className="calc-subtitle">{config.subtitle}</p>
        </div>
      </section>

      <section className="calc-main">
        <div className="calc-container">
          <div className="calc-grid">
            {/* Input Section */}
            <div className="calc-inputs">
              <div className="calc-inputs-header">
                <h2>{config.inputsTitle}</h2>
                <button className="calc-save-btn" onClick={handleSave} data-testid="save-entry-btn">
                  Save Entry
                </button>
              </div>
              {saveMessage && <div className="calc-save-message" data-testid="save-message">{saveMessage}</div>}

              {editableFields.map((field) => (
                <div className="calc-input-group" key={field.key}>
                  <label htmlFor={field.key}>{field.label}</label>
                  <input
                    type="number"
                    id={field.key}
                    value={inputs[field.key] || ''}
                    onChange={(e) => setInput(field.key, e.target.value)}
                    min="0"
                    step={field.step}
                    placeholder={field.placeholder}
                    data-testid={field.testId}
                  />
                </div>
              ))}

              <div className="calc-input-group calc-locked">
                <label>Daily Operating Cost (%)</label>
                <div className="calc-locked-value">{constants.dailyOperatingCostPercent}%</div>
              </div>
              <div className="calc-input-group calc-locked">
                <label>System Cost Per Space ($)</label>
                <div className="calc-locked-value">${constants.systemCostPerSpace.toFixed(2)}</div>
              </div>
              <div className="calc-input-group calc-locked">
                <label>Hardware Cost Per Store ($)</label>
                <div className="calc-locked-value">${constants.hardwareCostPerStore.toLocaleString()}</div>
              </div>

              <div className="calc-occupancy-info">
                <h3>Occupancy Rates Used</h3>
                <div className="calc-rates">
                  <span><strong>Lowest:</strong> 40%</span>
                  <span><strong>Mid Range:</strong> 70%</span>
                  <span><strong>Peak:</strong> 100%</span>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="calc-results">
              <h2>{config.resultsTitle}</h2>

              {/* Gross Sales */}
              <div className="calc-result-block">
                <h3>{config.grossSalesTitle}</h3>
                <div className="calc-result-table">
                  <div className="calc-table-header">
                    <span></span>
                    {LEVELS.map((l) => (
                      <span key={l}>{OCCUPANCY_LABELS[l]}</span>
                    ))}
                  </div>
                  {['daily', 'weekly', 'monthly'].map((period) => (
                    <TableRow
                      key={period}
                      label={period.charAt(0).toUpperCase() + period.slice(1)}
                      getValue={(l) => results.grossSales[l]?.[period] || 0}
                    />
                  ))}
                  <TableRow
                    label="Annual"
                    className={config.highlightAnnualClass}
                    getValue={(l) => results.grossSales[l]?.annual || 0}
                  />
                </div>
              </div>

              {/* Operating Cost */}
              <div className="calc-result-block">
                <h3>{config.operatingCostTitle}</h3>
                <div className="calc-result-table">
                  <div className="calc-table-header">
                    <span></span>
                    <span>Lowest</span>
                    <span>Mid</span>
                    <span>Peak</span>
                  </div>
                  {['daily', 'weekly', 'monthly'].map((period) => (
                    <TableRow
                      key={period}
                      label={period.charAt(0).toUpperCase() + period.slice(1)}
                      getValue={(l) => results.operatingCost[l]?.[period] || 0}
                    />
                  ))}
                  <TableRow
                    label="Annual"
                    className="calc-highlight-red"
                    getValue={(l) => results.operatingCost[l]?.annual || 0}
                  />
                </div>
              </div>

              {/* Summary */}
              <div className={`calc-result-block ${config.summaryClass}`}>
                <h3>Calculation Results</h3>
                <div className="calc-result-table">
                  <div className="calc-table-header">
                    <span></span>
                    <span>Lowest</span>
                    <span>Mid</span>
                    <span>Peak</span>
                  </div>
                  <TableRow label="Annual Net Return" getValue={(l) => results.annualNetReturn[l] || 0} />
                  <TableRow label="Investment" getValue={(l) => results.investment[l] || 0} />
                  <TableRow
                    label="Net Annual Return"
                    className={config.highlightNetClass}
                    getValue={(l) => results.netAnnualReturn[l] || 0}
                  />
                </div>
                <button
                  className="calc-request-btn"
                  onClick={handleRequestConfirmation}
                  data-testid="request-confirmation-btn"
                >
                  Request Confirmation of these numbers
                </button>
              </div>

              <a href="/parking-lot-control" className="calc-back-btn" data-testid="back-link">
                &larr; Back to Parking Lot Control
              </a>
            </div>
          </div>
        </div>
      </section>

      <ContactModal
        show={showContactModal}
        onClose={() => setShowContactModal(false)}
        calculatorType={config.type}
        calculatorInputs={calculatorInputs}
        results={results}
      />
    </div>
  );
};

export default ROICalculator;
