import React from 'react';
import { Check } from 'lucide-react';

const COUNTY_PATHS = {
  baker:    "M 175,15 L 430,10 L 445,55 L 455,170 L 370,175 L 195,165 L 180,70 Z",
  columbia: "M 15,50 L 175,15 L 180,70 L 195,165 L 190,310 L 15,280 Z",
  union:    "M 195,165 L 370,175 L 380,325 L 190,310 Z",
  alachua:  "M 15,280 L 190,310 L 185,480 L 15,470 Z",
  bradford: "M 190,310 L 380,325 L 390,485 L 185,480 Z",
  clay:     "M 370,175 L 455,170 L 475,200 L 570,210 L 560,440 L 390,485 L 380,325 Z",
};

const COUNTY_CENTERS = {
  baker:    { x: 310, y: 95 },
  columbia: { x: 100, y: 170 },
  union:    { x: 285, y: 245 },
  alachua:  { x: 100, y: 385 },
  bradford: { x: 285, y: 400 },
  clay:     { x: 470, y: 330 },
};

export default function CountyMap({ counties, selectedCounties, onToggleCounty }) {
  return (
    <div className="county-map-wrapper" data-testid="county-map">
      <svg viewBox="0 0 590 500" className="county-map-svg">
        <defs>
          <filter id="selected-glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {counties.map(county => {
          const path = COUNTY_PATHS[county.id];
          const center = COUNTY_CENTERS[county.id];
          const isSelected = selectedCounties.includes(county.id);
          const isSmall = county.market === 'small';

          let fillClass = isSmall ? 'county-small' : 'county-large';
          if (isSelected) fillClass += ' county-selected';
          if (county.isHome) fillClass += ' county-home';

          return (
            <g
              key={county.id}
              className={`county-group ${fillClass}`}
              onClick={() => onToggleCounty(county.id)}
              data-testid={`county-${county.id}`}
              style={{ cursor: 'pointer' }}
            >
              <path
                d={path}
                className="county-path"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              {isSelected && (
                <circle
                  cx={center.x}
                  cy={center.y - 28}
                  r="12"
                  className="county-check-circle"
                />
              )}
              {isSelected && (
                <foreignObject x={center.x - 8} y={center.y - 36} width="16" height="16">
                  <Check size={16} color="#fff" />
                </foreignObject>
              )}
              <text x={center.x} y={center.y} className="county-name" textAnchor="middle">
                {county.name}
              </text>
              <text x={center.x} y={center.y + 18} className="county-market-label" textAnchor="middle">
                {isSmall ? 'Small Market' : 'Large Market'}
              </text>
              <text x={center.x} y={center.y + 36} className="county-price-label" textAnchor="middle">
                ${county.price.toLocaleString()}
              </text>
              {county.isHome && (
                <text x={center.x} y={center.y - 18} className="county-home-badge" textAnchor="middle">
                  YOUR AREA
                </text>
              )}
            </g>
          );
        })}
      </svg>

      <div className="county-map-legend">
        <div className="county-legend-item">
          <span className="county-legend-swatch county-legend-small"></span>
          <span>Small Market — $300/area</span>
        </div>
        <div className="county-legend-item">
          <span className="county-legend-swatch county-legend-large"></span>
          <span>Large Market — $1,200/area</span>
        </div>
        <div className="county-legend-item">
          <span className="county-legend-swatch county-legend-selected"></span>
          <span>Selected</span>
        </div>
      </div>
    </div>
  );
}
