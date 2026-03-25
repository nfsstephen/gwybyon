import React, { useEffect, useRef, useState, useCallback } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highmaps';
import { MapPin, Loader, ArrowLeft } from 'lucide-react';
import usAllTopo from '@highcharts/map-collection/countries/us/us-all.topo.json';
import './HighchartsMapDrilldown.css';

export default function HighchartsMapDrilldown({ country, selectedCounties, onToggleCounty }) {
  const chartRef = useRef(null);
  const [drillLevel, setDrillLevel] = useState('country');
  const [activeState, setActiveState] = useState('');
  const [countyMapData, setCountyMapData] = useState(null);
  const [countySeriesData, setCountySeriesData] = useState([]);
  const [loadingCounty, setLoadingCounty] = useState(false);
  const countyCache = useRef({});
  const selectedRef = useRef(selectedCounties);

  useEffect(() => {
    selectedRef.current = selectedCounties;
  }, [selectedCounties]);

  // Update county colors when selections change
  useEffect(() => {
    if (drillLevel !== 'state') return;
    const chart = chartRef.current?.chart;
    if (!chart || !chart.series[0]) return;
    chart.series[0].points?.forEach(point => {
      const hcKey = point['hc-key'];
      const isSelected = selectedCounties.includes(hcKey);
      point.update({ color: isSelected ? '#16a34a' : null }, false);
    });
    chart.redraw();
  }, [selectedCounties, drillLevel]);

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
      const data = features.map(feat => {
        const props = feat.properties || {};
        const hcKey = props['hc-key'] || '';
        const isSelected = selectedRef.current.includes(hcKey);
        return {
          'hc-key': hcKey,
          name: props.name || '',
          value: isSelected ? 2 : 1,
          color: isSelected ? '#16a34a' : undefined,
        };
      });
      setCountyMapData(mapData);
      setCountySeriesData(data);
      setDrillLevel('state');
    }
    setLoadingCounty(false);
  }, [loadCountyMap]);

  const handleDrillUp = useCallback(() => {
    setDrillLevel('country');
    setActiveState('');
    setCountyMapData(null);
    setCountySeriesData([]);
  }, []);

  const handleCountyClick = useCallback((hcKey, name) => {
    onToggleCounty(hcKey, name);
  }, [onToggleCounty]);

  const usOptions = useCallback(() => ({
    chart: {
      map: usAllTopo,
      backgroundColor: '#1e293b',
      height: 480,
    },
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
          const stateAbbr = hcKey.replace('us-', '');
          return {
            'hc-key': hcKey,
            name: props.name || '',
            value: Math.floor(Math.random() * 100),
            stateCode: stateAbbr,
          };
        });
      })(),
      dataLabels: {
        enabled: true,
        format: '{point.properties.postal-code}',
        style: { fontSize: '9px', color: '#e2e8f0', textOutline: '1px #1e293b', fontWeight: 'bold' },
      },
      cursor: 'pointer',
      point: {
        events: {
          click: function () {
            const code = this.stateCode || this['hc-key']?.replace('us-', '');
            if (code) handleStateDrilldown(code, this.name);
          },
        },
      },
      tooltip: { headerFormat: '', pointFormat: '<b>{point.name}</b><br/>Click to view counties' },
    }],
  }), [handleStateDrilldown]);

  const countyOptions = useCallback(() => {
    if (!countyMapData) return {};
    return {
      chart: {
        map: countyMapData,
        backgroundColor: '#1e293b',
        height: 480,
      },
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
        point: {
          events: {
            click: function () {
              const key = this['hc-key'];
              if (key) handleCountyClick(key, this.name);
            },
          },
        },
        tooltip: { headerFormat: '', pointFormat: '<b>{point.name}</b><br/>Click to select/deselect' },
      }],
    };
  }, [countyMapData, countySeriesData, activeState, handleCountyClick]);

  const isUSA = !country || country.toLowerCase() === 'usa' || country.toLowerCase() === 'us' || country.toLowerCase() === 'united states';

  if (!isUSA && country) {
    return (
      <div className="hc-map-wrapper" data-testid="highcharts-map">
        <div className="hc-map-unsupported">
          <MapPin size={24} />
          <p>Map drilldown is currently available for the <strong>United States</strong> only.</p>
          <p className="hc-map-hint">Enter &quot;USA&quot; or &quot;US&quot; in the Country field to load the map.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hc-map-wrapper" data-testid="highcharts-map">
      {/* Status */}
      <div className="hc-map-status">
        {loadingCounty ? (
          <span className="hc-status-loading">
            <Loader size={14} className="hc-spinner" />
            Loading counties...
          </span>
        ) : drillLevel === 'state' ? (
          <span className="hc-status-state">
            <button className="hc-back-btn" onClick={handleDrillUp} data-testid="map-back-btn">
              <ArrowLeft size={14} />
              Back to USA
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

      {/* Map */}
      <div className="hc-map-container">
        {drillLevel === 'country' ? (
          <HighchartsReact
            highcharts={Highcharts}
            constructorType="mapChart"
            options={usOptions()}
            ref={chartRef}
            key="us-map"
          />
        ) : countyMapData ? (
          <HighchartsReact
            highcharts={Highcharts}
            constructorType="mapChart"
            options={countyOptions()}
            ref={chartRef}
            key={`county-map-${activeState}`}
          />
        ) : null}
      </div>

      {/* Selected territories list */}
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
