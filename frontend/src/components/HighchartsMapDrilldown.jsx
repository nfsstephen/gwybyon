import React, { useEffect, useRef, useState, useCallback } from 'react';
import Highcharts from 'highcharts/highmaps';
import { MapPin, Loader, ArrowLeft } from 'lucide-react';
import usAllTopo from '@highcharts/map-collection/countries/us/us-all.topo.json';
import './HighchartsMapDrilldown.css';

const STATE_NAME_TO_CODE = {
  'alabama': 'al', 'alaska': 'ak', 'arizona': 'az', 'arkansas': 'ar',
  'california': 'ca', 'colorado': 'co', 'connecticut': 'ct', 'delaware': 'de',
  'florida': 'fl', 'georgia': 'ga', 'hawaii': 'hi', 'idaho': 'id',
  'illinois': 'il', 'indiana': 'in', 'iowa': 'ia', 'kansas': 'ks',
  'kentucky': 'ky', 'louisiana': 'la', 'maine': 'me', 'maryland': 'md',
  'massachusetts': 'ma', 'michigan': 'mi', 'minnesota': 'mn', 'mississippi': 'ms',
  'missouri': 'mo', 'montana': 'mt', 'nebraska': 'ne', 'nevada': 'nv',
  'new hampshire': 'nh', 'new jersey': 'nj', 'new mexico': 'nm', 'new york': 'ny',
  'north carolina': 'nc', 'north dakota': 'nd', 'ohio': 'oh', 'oklahoma': 'ok',
  'oregon': 'or', 'pennsylvania': 'pa', 'rhode island': 'ri', 'south carolina': 'sc',
  'south dakota': 'sd', 'tennessee': 'tn', 'texas': 'tx', 'utah': 'ut',
  'vermont': 'vt', 'virginia': 'va', 'washington': 'wa', 'west virginia': 'wv',
  'wisconsin': 'wi', 'wyoming': 'wy', 'district of columbia': 'dc',
};

function resolveStateCode(input) {
  if (!input) return null;
  const lower = input.trim().toLowerCase();
  // Direct state name match
  if (STATE_NAME_TO_CODE[lower]) return STATE_NAME_TO_CODE[lower];
  // Check 2-letter abbreviation
  const abbr = lower.replace(/\s/g, '');
  if (abbr.length === 2 && Object.values(STATE_NAME_TO_CODE).includes(abbr)) return abbr;
  return null;
}

const STATE_CODE_TO_NAME = Object.fromEntries(
  Object.entries(STATE_NAME_TO_CODE).map(([name, code]) => [code, name.replace(/\b\w/g, c => c.toUpperCase())])
);

export default function HighchartsMapDrilldown({ country, state: stateProp, selectedCounties, onToggleCounty, takenCounties, regionRefreshKey, category }) {
  const containerRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [drillLevel, setDrillLevel] = useState('country');
  const [activeState, setActiveState] = useState('');
  const [autoStateInfo, setAutoStateInfo] = useState('');
  const [loadingCounty, setLoadingCounty] = useState(false);
  const countyCache = useRef({});
  const regionColorsCache = useRef({});
  const toggleRef = useRef(onToggleCounty);
  const selectedRef = useRef(selectedCounties);
  const takenRef = useRef(takenCounties);
  const currentDrilledState = useRef('');
  const categoryRef = useRef(category);

  useEffect(() => { toggleRef.current = onToggleCounty; }, [onToggleCounty]);
  useEffect(() => { selectedRef.current = selectedCounties; }, [selectedCounties]);
  useEffect(() => { categoryRef.current = category; }, [category]);

  // Reusable function to apply taken colors to existing chart points
  const applyTakenColors = useCallback(() => {
    const chart = chartInstanceRef.current;
    if (!chart || !chart.series || !chart.series[0]) return;
    const taken = takenRef.current;
    if (!taken || taken.size === 0) return;
    let changed = false;
    chart.series[0].points.forEach(point => {
      const key = point['hc-key'];
      const isTaken = taken.has(key);
      const isSelected = selectedRef.current.includes(key);
      if (isTaken && point.color !== '#991b1b') {
        point.update({ color: '#991b1b', taken: true, value: 3 }, false);
        changed = true;
      } else if (!isTaken && !isSelected && point.options && point.options.taken) {
        point.update({ color: null, taken: false, value: 1 }, false);
        changed = true;
      }
    });
    if (changed) chart.redraw();
  }, []);

  // When taken data arrives, update immediately + retry after a short delay
  useEffect(() => {
    takenRef.current = takenCounties || new Set();
    applyTakenColors();
    // Retry after a delay in case the map is still rendering
    const timer = setTimeout(applyTakenColors, 500);
    const timer2 = setTimeout(applyTakenColors, 1500);
    return () => { clearTimeout(timer); clearTimeout(timer2); };
  }, [takenCounties, applyTakenColors]);

  // When drill level changes to state (county view), apply taken colors after chart settles
  useEffect(() => {
    if (drillLevel === 'state') {
      const timer = setTimeout(applyTakenColors, 300);
      const timer2 = setTimeout(applyTakenColors, 1000);
      return () => { clearTimeout(timer); clearTimeout(timer2); };
    }
  }, [drillLevel, applyTakenColors]);

  const loadCountyMap = useCallback(async (stateCode) => {
    if (countyCache.current[stateCode]) return countyCache.current[stateCode];
    try {
      const data = await import(`@highcharts/map-collection/countries/us/us-${stateCode}-all.topo.json`);
      const mapData = data.default || data;
      countyCache.current[stateCode] = mapData;
      return mapData;
    } catch (e) {
      console.error(`Failed to load county map for ${stateCode}:`, e);
      return null;
    }
  }, []);

  // Create US map on mount
  useEffect(() => {
    if (!containerRef.current) return;

    const features = usAllTopo.objects
      ? Object.values(usAllTopo.objects)[0]?.geometries || []
      : [];
    const stateData = features.map(feat => {
      const props = feat.properties || {};
      const hcKey = props['hc-key'] || '';
      return {
        'hc-key': hcKey,
        name: props.name || '',
        value: Math.floor(Math.random() * 100),
        stateCode: hcKey.replace('us-', ''),
      };
    });

    const chart = Highcharts.mapChart(containerRef.current, {
      chart: {
        map: usAllTopo,
        backgroundColor: '#1e293b',
        height: 480,
      },
      title: { text: '' },
      credits: { enabled: false },
      accessibility: { enabled: false },
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: 'bottom',
          theme: {
            fill: '#334155', 'stroke-width': 1, stroke: '#475569',
            style: { color: '#e2e8f0' },
            states: { hover: { fill: '#475569' }, select: { fill: '#3b82f6' } },
          },
        },
      },
      colorAxis: { min: 0, minColor: '#94a3b8', maxColor: '#0ea5e9', visible: false },
      legend: { enabled: false },
      plotOptions: {
        map: {
          states: { hover: { color: '#3b82f6', borderColor: '#fff', borderWidth: 2 } },
          borderColor: '#334155', borderWidth: 0.5, nullColor: '#475569',
        },
      },
      series: [{
        name: 'USA',
        data: stateData,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '{point.properties.postal-code}',
          style: { fontSize: '9px', color: '#e2e8f0', textOutline: '1px #1e293b', fontWeight: 'bold' },
        },
        events: {
          click: function (e) {
            const code = e.point.stateCode;
            const name = e.point.name;
            if (code) drillIntoState(code, name);
          },
        },
        tooltip: { headerFormat: '', pointFormat: '<b>{point.name}</b><br/>Click to view counties' },
      }],
    });

    chartInstanceRef.current = chart;

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const drillIntoState = useCallback(async (stateCode, stateName) => {
    setLoadingCounty(true);
    setActiveState(stateName);

    const mapData = await loadCountyMap(stateCode);
    if (!mapData || !chartInstanceRef.current) {
      setLoadingCounty(false);
      return;
    }

    // Fetch region colors for this state + industry
    // Cache key includes category so different industries have separate caches
    const currentCategory = categoryRef.current || '';
    const cacheKey = `${stateName}__${currentCategory}`;
    let regionColors = regionColorsCache.current[cacheKey] || {};
    if (!regionColorsCache.current[cacheKey]) {
      try {
        const API_URL = process.env.REACT_APP_BACKEND_URL;
        const categoryParam = currentCategory ? `&category=${encodeURIComponent(currentCategory)}` : '';
        const res = await fetch(`${API_URL}/api/contracts/region-colors?state=${encodeURIComponent(stateName)}${categoryParam}`);
        const data = await res.json();
        regionColors = data.colors || {};
        regionColorsCache.current[cacheKey] = regionColors;
      } catch (e) {
        console.error('Region colors fetch error:', e);
      }
    }

    const features = mapData.objects
      ? Object.values(mapData.objects)[0]?.geometries || []
      : [];

    const countyData = features.map(feat => {
      const props = feat.properties || {};
      const hcKey = props['hc-key'] || '';
      const countyName = (props.name || '').toLowerCase();
      const isSelected = selectedRef.current.includes(hcKey);
      const isTaken = takenRef.current && takenRef.current.has(hcKey);
      const regionInfo = regionColors[countyName];
      const regionColor = regionInfo ? regionInfo.color : undefined;
      const regionStatus = regionInfo ? regionInfo.status : null;
      const isReserved = regionStatus === 'reserved';

      // Reserved counties get a muted version of their color
      let displayColor = regionColor;
      if (isReserved && regionColor) {
        // Create muted version: blend with gray at 40% opacity
        displayColor = regionColor + '55'; // hex alpha for ~33% opacity
      }

      return {
        'hc-key': hcKey,
        name: props.name || '',
        value: isTaken ? 3 : isReserved ? 4 : isSelected ? 2 : 1,
        color: isTaken ? '#991b1b' : isSelected ? '#b0f50b' : displayColor,
        taken: isTaken,
        reserved: isReserved,
        regionColor: regionColor,
        regionName: regionInfo ? regionInfo.region : '',
        regionStatus: regionStatus,
        className: isTaken ? 'taken-territory' : isReserved ? 'reserved-territory' : '',
      };
    });

    // Destroy old chart and create county chart
    chartInstanceRef.current.destroy();

    const countyChart = Highcharts.mapChart(containerRef.current, {
      chart: {
        map: mapData,
        backgroundColor: '#1e293b',
        height: 480,
      },
      title: { text: '' },
      credits: { enabled: false },
      accessibility: { enabled: false },
      mapNavigation: {
        enabled: true,
        enableDoubleClickZoom: false,
        buttonOptions: {
          verticalAlign: 'bottom',
          theme: {
            fill: '#334155', 'stroke-width': 1, stroke: '#475569',
            style: { color: '#e2e8f0' },
            states: { hover: { fill: '#475569' }, select: { fill: '#3b82f6' } },
          },
        },
      },
      colorAxis: { min: 0, minColor: '#64748b', maxColor: '#0ea5e9', visible: false },
      legend: { enabled: false },
      plotOptions: {
        map: {
          states: { hover: { color: '#3b82f6', borderColor: '#fff', borderWidth: 2 } },
          borderColor: '#334155', borderWidth: 0.5, nullColor: '#475569',
        },
      },
      series: [{
        name: stateName + ' Counties',
        mapData: mapData,
        data: countyData,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '{point.name}',
          style: { fontSize: '8px', color: '#e2e8f0', textOutline: '1px #0f172a' },
        },
        events: {
          click: function (e) {
            const key = e.point['hc-key'];
            const name = e.point.name;
            if (key && !e.point.options.taken && !e.point.options.reserved) {
              toggleRef.current(key, name);
              // Visual feedback: toggle color (restore region color on deselect)
              const nowSelected = !selectedRef.current.includes(key);
              const restoreColor = e.point.options.regionColor || null;
              e.point.update({
                color: nowSelected ? '#b0f50b' : restoreColor,
                value: nowSelected ? 2 : 1,
              });
            }
          },
        },
        tooltip: { headerFormat: '', pointFormat: '<b>{point.name}</b>{#if point.regionName}<br/><span style="color:#94a3b8">Region: {point.regionName}</span>{/if}{#if point.regionStatus}<br/><span style="color:#f59e0b;font-weight:bold">STATUS: {point.regionStatus}</span>{/if}{#if point.taken}<br/><span style="color:#ef4444;font-weight:bold">TERRITORY TAKEN</span>{/if}{#if point.reserved}<br/><span style="color:#f59e0b;font-weight:bold">RESERVED — Pending Deposit</span>{/if}{#unless point.taken}{#unless point.reserved}<br/>Click to select/deselect{/unless}{/unless}' },
      }],
    });

    chartInstanceRef.current = countyChart;
    currentDrilledState.current = stateCode;
    setDrillLevel('state');
    setLoadingCounty(false);
  }, [loadCountyMap]);

  // Auto-drill when state prop changes: directly drill into the selected state
  useEffect(() => {
    if (!stateProp || stateProp.trim().length < 2) return;

    const stateCode = resolveStateCode(stateProp);
    if (!stateCode) return;
    if (currentDrilledState.current === stateCode) return;

    const stateName = STATE_CODE_TO_NAME[stateCode] || stateProp;
    setAutoStateInfo(`Viewing: ${stateName}`);
    drillIntoState(stateCode, stateName);
  }, [stateProp, drillIntoState]);

  // Re-drill when industry (category) changes to show industry-specific regions
  useEffect(() => {
    const stateCode = currentDrilledState.current;
    if (!stateCode) return;
    const stateName = STATE_CODE_TO_NAME[stateCode] || stateCode;
    // Clear cache for old and new category to force re-fetch
    Object.keys(regionColorsCache.current).forEach(key => {
      if (key.startsWith(stateName + '__')) delete regionColorsCache.current[key];
    });
    drillIntoState(stateCode, stateName);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  // Re-fetch region colors and redraw when regionRefreshKey changes
  useEffect(() => {
    if (!regionRefreshKey) return;
    const stateCode = currentDrilledState.current;
    if (!stateCode) return;
    const stateName = STATE_CODE_TO_NAME[stateCode] || stateCode;
    // Clear the cached colors for this state+category so drillIntoState re-fetches
    const currentCategory = categoryRef.current || '';
    const cacheKey = `${stateName}__${currentCategory}`;
    delete regionColorsCache.current[cacheKey];
    drillIntoState(stateCode, stateName);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regionRefreshKey]);

  const handleDrillUp = useCallback(() => {
    if (!containerRef.current) return;

    currentDrilledState.current = '';
    setAutoStateInfo('');

    // Destroy county chart and recreate US chart
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const features = usAllTopo.objects
      ? Object.values(usAllTopo.objects)[0]?.geometries || []
      : [];
    const stateData = features.map(feat => {
      const props = feat.properties || {};
      const hcKey = props['hc-key'] || '';
      return {
        'hc-key': hcKey,
        name: props.name || '',
        value: Math.floor(Math.random() * 100),
        stateCode: hcKey.replace('us-', ''),
      };
    });

    const chart = Highcharts.mapChart(containerRef.current, {
      chart: {
        map: usAllTopo,
        backgroundColor: '#1e293b',
        height: 480,
      },
      title: { text: '' },
      credits: { enabled: false },
      accessibility: { enabled: false },
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: 'bottom',
          theme: {
            fill: '#334155', 'stroke-width': 1, stroke: '#475569',
            style: { color: '#e2e8f0' },
            states: { hover: { fill: '#475569' }, select: { fill: '#3b82f6' } },
          },
        },
      },
      colorAxis: { min: 0, minColor: '#94a3b8', maxColor: '#0ea5e9', visible: false },
      legend: { enabled: false },
      plotOptions: {
        map: {
          states: { hover: { color: '#3b82f6', borderColor: '#fff', borderWidth: 2 } },
          borderColor: '#334155', borderWidth: 0.5, nullColor: '#475569',
        },
      },
      series: [{
        name: 'USA',
        data: stateData,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '{point.properties.postal-code}',
          style: { fontSize: '9px', color: '#e2e8f0', textOutline: '1px #1e293b', fontWeight: 'bold' },
        },
        events: {
          click: function (e) {
            const code = e.point.stateCode;
            const name = e.point.name;
            if (code) drillIntoState(code, name);
          },
        },
        tooltip: { headerFormat: '', pointFormat: '<b>{point.name}</b><br/>Click to view counties' },
      }],
    });

    chartInstanceRef.current = chart;
    setDrillLevel('country');
    setActiveState('');
  }, [drillIntoState]);

  const isUSA = !country || country.toLowerCase() === 'usa' || country.toLowerCase() === 'us' || country.toLowerCase() === 'united states';

  if (!isUSA && country) {
    return (
      <div className="hc-map-wrapper" data-testid="highcharts-map">
        <div className="hc-map-unsupported">
          <MapPin size={24} />
          <p>Map drilldown is currently available for the <strong>United States</strong> only.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hc-map-wrapper" data-testid="highcharts-map">
      <div className="hc-map-status">
        {loadingCounty ? (
          <span className="hc-status-loading">
            <Loader size={14} className="hc-spinner" />
            Loading counties...
          </span>
        ) : drillLevel === 'state' ? (
          <span className="hc-status-state">
            <button className="hc-back-btn" onClick={handleDrillUp} data-testid="map-back-btn">
              <ArrowLeft size={14} /> Back to USA
            </button>
            <span>
              {autoStateInfo && <em className="hc-auto-info">{autoStateInfo} — </em>}
              Viewing counties in <strong>{activeState}</strong> — click a county to select/deselect
            </span>
          </span>
        ) : (
          <span className="hc-status-hint">
            <MapPin size={14} />
            {loadingCounty ? 'Loading counties...' : 'Select a state in Step 2 or click a state to drill down'}
          </span>
        )}
      </div>

      <div className="hc-map-container">
        <div ref={containerRef} data-testid="highcharts-container" />
      </div>

      {selectedCounties.length > 0 && (
        <div className="hc-selected-territories" data-testid="selected-territories">
          <div className="hc-selected-header">
            <MapPin size={14} />
            <span>Selected Territories ({selectedCounties.length})</span>
          </div>
          <div className="hc-selected-chips">
            {selectedCounties.map(id => (
              <button
                key={id}
                className="hc-selected-chip"
                data-testid={`territory-chip-${id}`}
                onClick={() => onToggleCounty(id)}
              >
                {id}
                <span className="hc-chip-remove">&times;</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
