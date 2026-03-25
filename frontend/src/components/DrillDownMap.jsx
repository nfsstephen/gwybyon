import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Circle, Popup, useMap } from 'react-leaflet';
import { MapPin, Check, Loader } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import './DrillDownMap.css';

const DEFAULT_CENTER = [29.65, -82.35];
const DEFAULT_ZOOM = 9;
const GEOCODE_DEBOUNCE = 800;

function MapUpdater({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom, { duration: 1.2 });
    }
  }, [center, zoom, map]);
  return null;
}

async function geocodeCity(city) {
  if (!city || city.trim().length < 2) return null;
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}&countrycodes=us&limit=1`,
      { headers: { 'Accept-Language': 'en' } }
    );
    const data = await res.json();
    if (data && data.length > 0) {
      return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon), display: data[0].display_name };
    }
  } catch (e) {
    console.error('Geocode error:', e);
  }
  return null;
}

export default function DrillDownMap({ city, counties, selectedCounties, onToggleCounty }) {
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);
  const [mapZoom, setMapZoom] = useState(DEFAULT_ZOOM);
  const [geocoding, setGeocoding] = useState(false);
  const [locationName, setLocationName] = useState('');
  const [hasGeocoded, setHasGeocoded] = useState(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!city || city.trim().length < 2) {
      setHasGeocoded(false);
      setLocationName('');
      setMapCenter(DEFAULT_CENTER);
      setMapZoom(DEFAULT_ZOOM);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setGeocoding(true);
      const result = await geocodeCity(city);
      if (result) {
        setMapCenter([result.lat, result.lng]);
        setMapZoom(11);
        setLocationName(result.display);
        setHasGeocoded(true);
      }
      setGeocoding(false);
    }, GEOCODE_DEBOUNCE);

    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [city]);

  const getCountyPosition = (county, index) => {
    const offsets = [
      [0.04, -0.05], [-0.04, 0.05], [0.06, 0.04],
      [-0.05, -0.06], [0.02, 0.07], [-0.06, -0.02],
    ];
    const offset = offsets[index % offsets.length];
    return [mapCenter[0] + offset[0], mapCenter[1] + offset[1]];
  };

  return (
    <div className="drilldown-map-wrapper" data-testid="drilldown-map">
      {/* Status bar */}
      <div className="drilldown-status">
        {geocoding ? (
          <span className="drilldown-status-loading">
            <Loader size={14} className="drilldown-spinner" />
            Locating area...
          </span>
        ) : hasGeocoded && locationName ? (
          <span className="drilldown-status-found">
            <MapPin size={14} />
            Showing territories near: <strong>{locationName.split(',').slice(0, 2).join(',')}</strong>
          </span>
        ) : (
          <span className="drilldown-status-hint">
            <MapPin size={14} />
            Enter your city in Step 2 to load nearby market areas
          </span>
        )}
      </div>

      {/* Map */}
      <div className="drilldown-map-container">
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          scrollWheelZoom={true}
          className="drilldown-leaflet-map"
          data-testid="leaflet-map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapUpdater center={mapCenter} zoom={mapZoom} />

          {hasGeocoded && counties.map((county, i) => {
            const pos = getCountyPosition(county, i);
            const isSelected = selectedCounties.includes(county.id);
            const isSmall = county.market === 'small';
            const color = isSelected ? '#16a34a' : isSmall ? '#3b82f6' : '#f59e0b';
            const radius = isSmall ? 2800 : 4200;

            return (
              <Circle
                key={county.id}
                center={pos}
                radius={radius}
                pathOptions={{
                  color: color,
                  fillColor: color,
                  fillOpacity: isSelected ? 0.4 : 0.2,
                  weight: isSelected ? 3 : 2,
                }}
                eventHandlers={{
                  click: () => onToggleCounty(county.id),
                }}
              >
                <Popup>
                  <div className="drilldown-popup">
                    <strong>{county.name} County</strong>
                    <span className={`drilldown-popup-tag ${county.market}`}>
                      {isSmall ? 'Small Market' : 'Large Market'}
                    </span>
                    <span className="drilldown-popup-price">${county.price.toLocaleString()}</span>
                    {isSelected && <span className="drilldown-popup-selected">Selected</span>}
                  </div>
                </Popup>
              </Circle>
            );
          })}
        </MapContainer>
      </div>

      {/* Territory selection cards below map */}
      {hasGeocoded && (
        <div className="drilldown-territories" data-testid="drilldown-territory-cards">
          <div className="drilldown-territory-grid">
            {counties.map(county => {
              const isSelected = selectedCounties.includes(county.id);
              const isSmall = county.market === 'small';
              return (
                <button
                  key={county.id}
                  data-testid={`territory-card-${county.id}`}
                  className={`drilldown-territory-card ${isSelected ? 'selected' : ''} ${isSmall ? 'small-market' : 'large-market'}`}
                  onClick={() => onToggleCounty(county.id)}
                >
                  <div className="drilldown-card-check">
                    {isSelected ? <Check size={16} /> : <div className="drilldown-card-circle" />}
                  </div>
                  <div className="drilldown-card-info">
                    <span className="drilldown-card-name">{county.name} County</span>
                    <span className={`drilldown-card-tag ${county.market}`}>
                      {isSmall ? 'Small Market' : 'Large Market'}
                    </span>
                  </div>
                  <span className="drilldown-card-price">${county.price.toLocaleString()}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="drilldown-legend">
        <div className="drilldown-legend-item">
          <span className="drilldown-legend-swatch drilldown-legend-small"></span>
          <span>Small Market — $300/area</span>
        </div>
        <div className="drilldown-legend-item">
          <span className="drilldown-legend-swatch drilldown-legend-large"></span>
          <span>Large Market — $1,200/area</span>
        </div>
        <div className="drilldown-legend-item">
          <span className="drilldown-legend-swatch drilldown-legend-selected"></span>
          <span>Selected</span>
        </div>
      </div>
    </div>
  );
}
