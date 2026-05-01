export const WEBSITE_OPTIONS = [
  {
    id: 'new-build',
    label: 'New Website Build',
    iconName: 'Globe',
    description: 'Brand new website from scratch',
    buildLabel: 'Build',
    buildPrice: 250,
    upgradePrice: 50,
  },
  {
    id: 'rebuild',
    label: 'Rebuild & Optimize',
    iconName: 'RefreshCw',
    description: 'Rebuild your existing website',
    buildLabel: 'Rebuild',
    buildPrice: 450,
    upgradePrice: 150,
  },
];

export const TIERS = [
  { id: 'small-standard', market: 'small', name: 'Standard', monthlyPrice: 200, tools: '2 of 5' },
  { id: 'small-premium', market: 'small', name: 'Premium', monthlyPrice: 300, tools: '5 of 5', popular: true },
  { id: 'large-full', market: 'large', name: 'Full Suite', monthlyPrice: 400, tools: '5 of 5' },
];

// Optional add-on tools that subscribers can layer onto any tier.
// Pricing is intentionally TBD — display "Pricing TBD" until finalized.
export const ADD_ONS = [
  {
    id: 'crew-management',
    name: 'Crew Management Tool',
    tagline: 'A Single Source of Truth — for the office, the crew, and the customer.',
    description: 'One shared schedule that lives inside your website. Office sets it, crew runs it, customer sees it. Eliminates "where\'s the rig?" calls.',
    iconName: 'CalendarClock',
    monthlyPrice: null, // TBD
    setupPrice: null,   // TBD
    badge: 'NEW',
    learnMorePath: '/crew-management',
  },
];

export const CONTINENTAL_STATES = [
  { abbr: 'AL', name: 'Alabama' }, { abbr: 'AZ', name: 'Arizona' }, { abbr: 'AR', name: 'Arkansas' },
  { abbr: 'CA', name: 'California' }, { abbr: 'CO', name: 'Colorado' }, { abbr: 'CT', name: 'Connecticut' },
  { abbr: 'DE', name: 'Delaware' }, { abbr: 'FL', name: 'Florida' }, { abbr: 'GA', name: 'Georgia' },
  { abbr: 'ID', name: 'Idaho' }, { abbr: 'IL', name: 'Illinois' }, { abbr: 'IN', name: 'Indiana' },
  { abbr: 'IA', name: 'Iowa' }, { abbr: 'KS', name: 'Kansas' }, { abbr: 'KY', name: 'Kentucky' },
  { abbr: 'LA', name: 'Louisiana' }, { abbr: 'ME', name: 'Maine' }, { abbr: 'MD', name: 'Maryland' },
  { abbr: 'MA', name: 'Massachusetts' }, { abbr: 'MI', name: 'Michigan' }, { abbr: 'MN', name: 'Minnesota' },
  { abbr: 'MS', name: 'Mississippi' }, { abbr: 'MO', name: 'Missouri' }, { abbr: 'MT', name: 'Montana' },
  { abbr: 'NE', name: 'Nebraska' }, { abbr: 'NV', name: 'Nevada' }, { abbr: 'NH', name: 'New Hampshire' },
  { abbr: 'NJ', name: 'New Jersey' }, { abbr: 'NM', name: 'New Mexico' }, { abbr: 'NY', name: 'New York' },
  { abbr: 'NC', name: 'North Carolina' }, { abbr: 'ND', name: 'North Dakota' }, { abbr: 'OH', name: 'Ohio' },
  { abbr: 'OK', name: 'Oklahoma' }, { abbr: 'OR', name: 'Oregon' }, { abbr: 'PA', name: 'Pennsylvania' },
  { abbr: 'RI', name: 'Rhode Island' }, { abbr: 'SC', name: 'South Carolina' }, { abbr: 'SD', name: 'South Dakota' },
  { abbr: 'TN', name: 'Tennessee' }, { abbr: 'TX', name: 'Texas' }, { abbr: 'UT', name: 'Utah' },
  { abbr: 'VT', name: 'Vermont' }, { abbr: 'VA', name: 'Virginia' }, { abbr: 'WA', name: 'Washington' },
  { abbr: 'WV', name: 'West Virginia' }, { abbr: 'WI', name: 'Wisconsin' }, { abbr: 'WY', name: 'Wyoming' },
];

export const STORAGE_KEY = 'gwybyon_subscribe';
export const APP_VERSION = '2.5';

export const STATE_NAME_MAP = { al:'Alabama',az:'Arizona',ar:'Arkansas',ca:'California',co:'Colorado',ct:'Connecticut',de:'Delaware',fl:'Florida',ga:'Georgia',id:'Idaho',il:'Illinois',in:'Indiana',ia:'Iowa',ks:'Kansas',ky:'Kentucky',la:'Louisiana',me:'Maine',md:'Maryland',ma:'Massachusetts',mi:'Michigan',mn:'Minnesota',ms:'Mississippi',mo:'Missouri',mt:'Montana',ne:'Nebraska',nv:'Nevada',nh:'New Hampshire',nj:'New Jersey',nm:'New Mexico',ny:'New York',nc:'North Carolina',nd:'North Dakota',oh:'Ohio',ok:'Oklahoma',or:'Oregon',pa:'Pennsylvania',ri:'Rhode Island',sc:'South Carolina',sd:'South Dakota',tn:'Tennessee',tx:'Texas',ut:'Utah',vt:'Vermont',va:'Virginia',wa:'Washington',wv:'West Virginia',wi:'Wisconsin',wy:'Wyoming' };

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed._v !== APP_VERSION) {
      localStorage.removeItem(STORAGE_KEY);
      return {};
    }
    return parsed;
  } catch { return {}; }
}

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, _v: APP_VERSION }));
}
