import React from 'react';
import ROICalculator from '../components/calculator/ROICalculator';
import './CorporateCalculatorPage.css';

const CORPORATE_CONFIG = {
  title: 'Corporate Parking ROI Calculator',
  subtitle: 'Calculate your company-wide return on investment for paid parking',
  inputsTitle: 'Enter Your Details',
  resultsTitle: 'Projected Results',
  grossSalesTitle: 'Gross Sales (Company Wide)',
  operatingCostTitle: 'Operating Cost (Company Wide)',
  type: 'Corporate Parking ROI',
  pageClass: '',
  heroClass: '',
  highlightAnnualClass: 'calc-highlight',
  summaryClass: 'calc-summary',
  highlightNetClass: 'calc-highlight-green',
  storageKey: 'corporateCalculatorData',
  editableFields: [
    { key: 'totalParkingSpaces', label: 'Total Parking Spaces', placeholder: 'Enter total spaces', testId: 'input-total-spaces' },
    { key: 'numberOfStores', label: 'Number of Stores', placeholder: 'Enter number of stores', testId: 'input-num-stores' },
    { key: 'chargePerSpace', label: 'Charge Per Space ($)', placeholder: 'Enter charge per space', step: '0.50', testId: 'input-charge-per-space' },
  ],
  constants: {
    dailyOperatingCostPercent: 27,
    systemCostPerSpace: 4.86,
    hardwareCostPerStore: 8700,
  },
  calcInvestment: (inputs, constants) => {
    const spaces = Number(inputs.totalParkingSpaces) || 0;
    const stores = Number(inputs.numberOfStores) || 0;
    return (spaces * constants.systemCostPerSpace) + (stores * constants.hardwareCostPerStore);
  },
};

const CorporateCalculatorPage = () => <ROICalculator config={CORPORATE_CONFIG} />;

export default CorporateCalculatorPage;
