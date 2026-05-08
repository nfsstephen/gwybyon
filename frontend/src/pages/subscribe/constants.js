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

export const CONTINENTAL_STATES = [
  { abbr: 'FL', name: 'Florida' }, { abbr: 'GA', name: 'Georgia' }, { abbr: 'MS', name: 'Mississippi' },
  { abbr: 'AL', name: 'Alabama' }, { abbr: 'LA', name: 'Louisiana' }, { abbr: 'AR', name: 'Arkansas' },
  { abbr: 'TN', name: 'Tennessee' }, { abbr: 'NC', name: 'North Carolina' }, { abbr: 'SC', name: 'South Carolina' },
];

export const STORAGE_KEY = 'gwybyon_subscribe';
export const APP_VERSION = '2.3';

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
