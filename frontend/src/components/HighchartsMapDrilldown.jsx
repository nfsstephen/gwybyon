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

async function geocodeCity(city) {
  if (!city || city.trim().length < 2) return null;
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}&countrycodes=us&limit=1&addressdetails=1`,
      { headers: { 'Accept-Language': 'en' } }
    );
    const data = await res.json();
    if (data && data.length > 0 && data[0].address) {
      const state = data[0].address.state;
      if (state) return { stateName: state, stateCode: resolveStateCode(state), displayName: data[0].display_name };
    }
  } catch (e) {
    console.error('Geocode error:', e);
  }
  return null;
}

export default function HighchartsMapDrilldown({ country, city, selectedCounties, onToggleCounty }) {
  const containerRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [drillLevel, setDrillLevel] = useState('country');
  const [activeState, setActiveState] = useState('');
  const [autoStateInfo, setAutoStateInfo] = useState('');
  const [loadingCounty, setLoadingCounty] = useState(false);
  const countyCache = useRef({});
  const toggleRef = useRef(onToggleCounty);
  const selectedRef = useRef(selectedCounties);
  const geocodeDebounce = useRef(null);
  const lastGeocodedCity = useRef('');
  const currentDrilledState = useRef('');

  useEffect(() => { toggleRef.current = onToggleCounty; }, [onToggleCounty]);
  useEffect(() => { selectedRef.current = selectedCounties; }, [selectedCounties]);

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

  const drillIntoState = useCallback(async (stateCode, stateName, autoSelectCountyName) => {
    setLoadingCounty(true);
    setActiveState(stateName);

    const mapData = await loadCountyMap(stateCode);
    if (!mapData || !chartInstanceRef.current) {
      setLoadingCounty(false);
      return;
    }

    const features = mapData.objects
      ? Object.values(mapData.objects)[0]?.geometries || []
      : [];

    // Find the county to auto-select (match by name, case-insensitive)
    let autoSelectKey = null;
    if (autoSelectCountyName) {
      const searchName = autoSelectCountyName.toLowerCase().trim();
      const match = features.find(feat => {
        const name = (feat.properties?.name || '').toLowerCase();
        return name === searchName || name.startsWith(searchName) || searchName.startsWith(name);
      });
      if (match) {
        autoSelectKey = match.properties['hc-key'];
      }
    }

    // Auto-select the matched county if not already selected
    if (autoSelectKey && !selectedRef.current.includes(autoSelectKey)) {
      const countyName = features.find(f => f.properties['hc-key'] === autoSelectKey)?.properties?.name || '';
      toggleRef.current(autoSelectKey, countyName);
    }

    const countyData = features.map(feat => {
      const props = feat.properties || {};
      const hcKey = props['hc-key'] || '';
      const isSelected = selectedRef.current.includes(hcKey) || hcKey === autoSelectKey;
      return {
        'hc-key': hcKey,
        name: props.name || '',
        value: isSelected ? 2 : 1,
        color: isSelected ? '#16a34a' : undefined,
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
            if (key) {
              toggleRef.current(key, name);
              // Visual feedback: toggle color
              const nowSelected = !selectedRef.current.includes(key);
              e.point.update({
                color: nowSelected ? '#16a34a' : null,
                value: nowSelected ? 2 : 1,
              });
            }
          },
        },
        tooltip: { headerFormat: '', pointFormat: '<b>{point.name}</b><br/>Click to select/deselect' },
      }],
    });

    chartInstanceRef.current = countyChart;
    currentDrilledState.current = stateCode;
    setDrillLevel('state');
    setLoadingCounty(false);
  }, [loadCountyMap]);

  // Auto-drill when city changes: geocode city → resolve state → drill into state
  useEffect(() => {
    if (geocodeDebounce.current) clearTimeout(geocodeDebounce.current);

    if (!city || city.trim().length < 2) {
      setAutoStateInfo('');
      return;
    }

    const trimmedCity = city.trim();
    if (trimmedCity === lastGeocodedCity.current) return;

    geocodeDebounce.current = setTimeout(async () => {
      lastGeocodedCity.current = trimmedCity;

      // First check if the city IS a state name directly
      const directCode = resolveStateCode(trimmedCity);
      if (directCode) {
        const stateName = Object.keys(STATE_NAME_TO_CODE).find(k => STATE_NAME_TO_CODE[k] === directCode) || trimmedCity;
        const capitalizedName = stateName.replace(/\b\w/g, c => c.toUpperCase());
        if (currentDrilledState.current !== directCode) {
          setAutoStateInfo(`Auto-loaded: ${capitalizedName}`);
          drillIntoState(directCode, capitalizedName, trimmedCity);
        }
        return;
      }

      // Geocode the city
      const result = await geocodeCity(trimmedCity);
      if (result && result.stateCode) {
        if (currentDrilledState.current !== result.stateCode) {
          setAutoStateInfo(`${trimmedCity} → ${result.stateName}`);
          drillIntoState(result.stateCode, result.stateName, trimmedCity);
        }
      }
    }, 900);

    return () => { if (geocodeDebounce.current) clearTimeout(geocodeDebounce.current); };
  }, [city, drillIntoState]);

  const handleDrillUp = useCallback(() => {
    if (!containerRef.current) return;

    currentDrilledState.current = '';
    lastGeocodedCity.current = '';
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
            {city ? 'Locating your area...' : 'Enter your city in Step 2 or click a state to drill down'}
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
