import React from 'react';
import ROICalculator from '../components/calculator/ROICalculator';
import './CorporateCalculatorPage.css';
import './StoreCalculatorPage.css';

const STORE_CONFIG = {
  title: 'Store Parking ROI Calculator',
  subtitle: "Calculate your individual store's return on investment for paid parking",
  inputsTitle: 'Enter Your Store Details',
  resultsTitle: 'Projected Results (Per Store)',
  grossSalesTitle: 'Gross Sales Per Store',
  operatingCostTitle: 'Operating Cost Per Store',
  type: 'Store Parking ROI',
  pageClass: 'store-calculator',
  heroClass: 'calc-hero-blue',
  highlightAnnualClass: 'calc-highlight-blue',
  summaryClass: 'calc-summary calc-summary-blue',
  highlightNetClass: 'calc-highlight-blue-dark',
  storageKey: 'storeCalculatorData',
  editableFields: [
    { key: 'totalParkingSpaces', label: 'Total Parking Spaces', placeholder: 'Enter total spaces', testId: 'input-total-spaces' },
    { key: 'chargePerSpace', label: 'Charge Per Space ($)', placeholder: 'Enter charge per space', step: '0.50', testId: 'input-charge-per-space' },
  ],
  constants: {
    dailyOperatingCostPercent: 27,
    systemCostPerSpace: 4.86,
    hardwareCostPerStore: 9600,
  },
  calcInvestment: (inputs, constants) => {
    const spaces = Number(inputs.totalParkingSpaces) || 0;
    return (spaces * constants.systemCostPerSpace) + constants.hardwareCostPerStore;
  },
};

const StoreCalculatorPage = () => <ROICalculator config={STORE_CONFIG} />;

export default StoreCalculatorPage;
