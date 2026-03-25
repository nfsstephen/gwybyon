import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highmaps';
import { MapPin, Loader, ArrowLeft } from 'lucide-react';
import usAllTopo from '@highcharts/map-collection/countries/us/us-all.topo.json';
import './HighchartsMapDrilldown.css';

export default function HighchartsMapDrilldown({ country, selectedCounties, onToggleCounty }) {
  const [drillLevel, setDrillLevel] = useState('country');
  const [activeState, setActiveState] = useState('');
  const [countyMapData, setCountyMapData] = useState(null);
  const [countyRawFeatures, setCountyRawFeatures] = useState([]);
  const [loadingCounty, setLoadingCounty] = useState(false);
  const countyCache = useRef({});
  const toggleRef = useRef(onToggleCounty);
  const drilldownFnRef = useRef(null);

  useEffect(() => { toggleRef.current = onToggleCounty; }, [onToggleCounty]);

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

  const handleStateDrilldown = useCallback(async (stateCode, stateName) => {
    setLoadingCounty(true);
    setActiveState(stateName);
    const mapData = await loadCountyMap(stateCode);
    if (mapData) {
      const features = mapData.objects
        ? Object.values(mapData.objects)[0]?.geometries || []
        : [];
      const rawFeatures = features.map(feat => {
        const props = feat.properties || {};
        return { hcKey: props['hc-key'] || '', name: props.name || '' };
      });
      setCountyMapData(mapData);
      setCountyRawFeatures(rawFeatures);
      setDrillLevel('state');
    }
    setLoadingCounty(false);
  }, [loadCountyMap]);

  useEffect(() => { drilldownFnRef.current = handleStateDrilldown; }, [handleStateDrilldown]);

  const handleDrillUp = useCallback(() => {
    setDrillLevel('country');
    setActiveState('');
    setCountyMapData(null);
    setCountyRawFeatures([]);
  }, []);

  // Compute county series data from raw features + current selections
  const countySeriesData = useMemo(() => {
    return countyRawFeatures.map(f => ({
      'hc-key': f.hcKey,
      name: f.name,
      value: selectedCounties.includes(f.hcKey) ? 2 : 1,
      color: selectedCounties.includes(f.hcKey) ? '#16a34a' : undefined,
    }));
  }, [countyRawFeatures, selectedCounties]);

  // US map options — stable, no deps
  const usOptions = useMemo(() => ({
    chart: { map: usAllTopo, backgroundColor: '#1e293b', height: 480 },
    title: { text: '' },
    subtitle: { text: '' },
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
      data: (() => {
        const features = usAllTopo.objects
          ? Object.values(usAllTopo.objects)[0]?.geometries || []
          : [];
        return features.map(feat => {
          const props = feat.properties || {};
          const hcKey = props['hc-key'] || '';
          return {
            'hc-key': hcKey,
            name: props.name || '',
            value: Math.floor(Math.random() * 100),
            stateCode: hcKey.replace('us-', ''),
          };
        });
      })(),
      dataLabels: {
        enabled: true,
        format: '{point.properties.postal-code}',
        style: { fontSize: '9px', color: '#e2e8f0', textOutline: '1px #1e293b', fontWeight: 'bold' },
      },
      cursor: 'pointer',
      events: {
        click: function (e) {
          const code = e.point.stateCode || e.point['hc-key']?.replace('us-', '');
          if (code) drilldownFnRef.current(code, e.point.name);
        },
      },
      tooltip: { headerFormat: '', pointFormat: '<b>{point.name}</b><br/>Click to view counties' },
    }],
  }), []);

  // County map options — recompute when county data or selections change
  const countyOptions = useMemo(() => {
    if (!countyMapData) return null;
    return {
      chart: { map: countyMapData, backgroundColor: '#1e293b', height: 480 },
      title: { text: '' },
      subtitle: { text: '' },
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
      colorAxis: { min: 0, minColor: '#64748b', maxColor: '#0ea5e9', visible: false },
      legend: { enabled: false },
      plotOptions: {
        map: {
          states: { hover: { color: '#3b82f6', borderColor: '#fff', borderWidth: 2 } },
          borderColor: '#334155', borderWidth: 0.5, nullColor: '#475569',
        },
      },
      series: [{
        name: activeState + ' Counties',
        data: countySeriesData,
        mapData: countyMapData,
        dataLabels: {
          enabled: true,
          format: '{point.name}',
          style: { fontSize: '8px', color: '#e2e8f0', textOutline: '1px #0f172a' },
        },
        cursor: 'pointer',
        events: {
          click: function (e) {
            const key = e.point['hc-key'];
            const name = e.point.name;
            if (key) toggleRef.current(key, name);
          },
        },
        tooltip: { headerFormat: '', pointFormat: '<b>{point.name}</b><br/>Click to select/deselect' },
      }],
    };
  }, [countyMapData, countySeriesData, activeState]);

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
            <span>Viewing counties in <strong>{activeState}</strong> — click a county to select it as a territory</span>
          </span>
        ) : (
          <span className="hc-status-hint">
            <MapPin size={14} />
            Click a state to drill down and select county territories
          </span>
        )}
      </div>

      <div className="hc-map-container">
        {drillLevel === 'country' ? (
          <HighchartsReact
            highcharts={Highcharts}
            constructorType="mapChart"
            options={usOptions}
            key="us-map"
          />
        ) : countyOptions ? (
          <HighchartsReact
            highcharts={Highcharts}
            constructorType="mapChart"
            options={countyOptions}
            key={`county-${activeState}`}
          />
        ) : null}
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
