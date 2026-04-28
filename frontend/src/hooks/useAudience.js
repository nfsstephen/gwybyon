/**
 * Audience segmentation for the homepage.
 *
 * Three audiences:
 *   "agency"  — paying an agency, getting poor results
 *   "diy"     — built their own site, not ranking
 *   "no-site" — no website at all yet
 *
 * Resolution order on page load:
 *   1) URL path:   /agency | /diy | /no-site
 *   2) URL query:  ?a=agency | ?a=diy | ?a=no-site
 *   3) localStorage previous choice
 *   4) "all"   (show all three heroes stacked + the picker)
 *
 * Side-effects:
 *   - Persists the resolved audience in localStorage (except "all")
 *   - Fires Microsoft Clarity custom tags + events so each segment is
 *     filterable in Clarity session-replay dashboards.
 */
import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

export const AUDIENCES = ['agency', 'diy', 'no-site'];
const STORAGE_KEY = 'gw_audience';

const PATH_MAP = {
  '/agency': 'agency',
  '/diy': 'diy',
  '/no-site': 'no-site',
};

/** Fire a Clarity event safely (Clarity may not be loaded in dev). */
const clarity = (...args) => {
  try {
    if (typeof window !== 'undefined' && typeof window.clarity === 'function') {
      window.clarity(...args);
    }
  } catch { /* swallow */ }
};

export const trackAudience = (audience, source) => {
  if (!audience || audience === 'all') {
    clarity('set', 'audience', 'organic-unsegmented');
    clarity('event', 'audience_organic_view');
    return;
  }
  // 'set' creates a Clarity custom tag — filterable in dashboards
  clarity('set', 'audience', audience);
  clarity('set', 'audience_source', source || 'unknown');
  // 'event' fires a one-shot custom event we can chart
  clarity('event', `audience_${source || 'view'}_${audience}`);
};

export const trackAudienceCta = (audience, ctaLabel) => {
  clarity('event', `cta_${audience || 'unknown'}_${ctaLabel}`);
};

export const useAudience = () => {
  const location = useLocation();
  const [audience, setAudienceState] = useState('all');
  const [resolved, setResolved] = useState(false);

  // Resolve once on mount + whenever URL changes
  useEffect(() => {
    // 1) Path
    const fromPath = PATH_MAP[location.pathname];
    if (fromPath) {
      setAudienceState(fromPath);
      try { localStorage.setItem(STORAGE_KEY, fromPath); } catch {}
      trackAudience(fromPath, 'urlpath');
      setResolved(true);
      return;
    }
    // 2) Query string ?a=
    const qs = new URLSearchParams(location.search);
    const fromQs = qs.get('a');
    if (fromQs && AUDIENCES.includes(fromQs)) {
      setAudienceState(fromQs);
      try { localStorage.setItem(STORAGE_KEY, fromQs); } catch {}
      trackAudience(fromQs, 'urlquery');
      setResolved(true);
      return;
    }
    // 3) localStorage
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && AUDIENCES.includes(saved)) {
        setAudienceState(saved);
        trackAudience(saved, 'returning');
        setResolved(true);
        return;
      }
    } catch {}
    // 4) Default: show everything
    setAudienceState('all');
    trackAudience('all', 'organic');
    setResolved(true);
  }, [location.pathname, location.search]);

  const setAudience = useCallback((next) => {
    if (next !== 'all' && !AUDIENCES.includes(next)) return;
    setAudienceState(next);
    try {
      if (next === 'all') localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    trackAudience(next, 'picker');
  }, []);

  return { audience, setAudience, resolved };
};
