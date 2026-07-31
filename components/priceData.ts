export interface PricePlan {
  id: string;
  title_id: string;
  title_en: string;
  amount: string; // e.g. "9.000.000" or "Custom Pricing"
  original_amount?: string; // e.g. "12.000.000" (harga coret)
  discount_percentage?: string; // e.g. "25%" or "Hemat 25%"
  features_id: string[];
  features_en: string[];
  recommended: boolean;
  order: number;
}

export const defaultPricePlans: PricePlan[] = [
  {
    id: 'live-streaming',
    title_id: 'Live Streaming',
    title_en: 'Live Streaming',
    amount: '9.000.000',
    original_amount: '12.000.000',
    discount_percentage: '25%',
    features_id: [
      '100 jam live streaming / bulan',
      'Min Subscribe 3 bulan',
      'No Commission Fee',
      'Free Setup Live room',
      'Free Sticker',
      'Monthly Performance Report'
    ],
    features_en: [
      '100 hours live streaming / month',
      'Min Subscribe 3 months',
      'No Commission Fee',
      'Free Setup Live room',
      'Free Sticker',
      'Monthly Performance Report'
    ],
    recommended: true,
    order: 1
  },
  {
    id: 'short-video',
    title_id: 'Short Video',
    title_en: 'Short Video',
    amount: '6.000.000',
    original_amount: '8.000.000',
    discount_percentage: '25%',
    features_id: [
      '30 short video / bulan',
      'Script Video',
      'Content Plan',
      'No Commission Fee',
      'Talent',
      'Monthly Report',
      'Min Subscribe 3 bulan'
    ],
    features_en: [
      '30 short videos / month',
      'Script Video',
      'Content Plan',
      'No Commission Fee',
      'Talent',
      'Monthly Report',
      'Min Subscribe 3 months'
    ],
    recommended: true,
    order: 2
  },
  {
    id: 'tiktok-ads',
    title_id: 'Tiktok Ads Service',
    title_en: 'Tiktok Ads Service',
    amount: '2.500.000',
    original_amount: '3.500.000',
    discount_percentage: '28%',
    features_id: [
      'Min Subscribe 3 bulan',
      'Komisi 5%, komisi maksimal Rp 10.000.000 / bulan',
      'Manage Shop Tab',
      'Weekly Report',
      'Account Manager'
    ],
    features_en: [
      'Min Subscribe 3 months',
      '5% commission, max commission Rp 10.000.000 / month',
      'Manage Shop Tab',
      'Weekly Report',
      'Account Manager'
    ],
    recommended: false,
    order: 3
  },
  {
    id: 'enterprise',
    title_id: 'Paket Enterprise',
    title_en: 'Enterprise Package',
    amount: 'Custom Pricing',
    original_amount: '',
    discount_percentage: '',
    features_id: [
      'Custom jam live streaming',
      'Custom qty short video',
      'Full production strategy',
      'Dedicated Team & Account Manager',
      'Customized reports & analytics'
    ],
    features_en: [
      'Custom live streaming hours',
      'Custom short video quantity',
      'Full production strategy',
      'Dedicated Team & Account Manager',
      'Customized reports & analytics'
    ],
    recommended: false,
    order: 4
  }
];

export const calculateDiscountPercentage = (amount: string, originalAmount?: string): string | null => {
  if (!originalAmount || !amount) return null;
  
  const numOrig = parseInt(originalAmount.replace(/\D/g, ''), 10);
  const numCurrent = parseInt(amount.replace(/\D/g, ''), 10);

  if (isNaN(numOrig) || isNaN(numCurrent) || numOrig <= 0 || numCurrent <= 0 || numOrig <= numCurrent) {
    return null;
  }

  const pct = Math.round(((numOrig - numCurrent) / numOrig) * 100);
  return `${pct}%`;
};

export const formatPriceInput = (val: string): string => {
  if (!val) return '';
  // If string contains alphabetic characters (e.g. "Custom Pricing"), keep as is
  if (/[a-zA-Z]/.test(val)) {
    return val;
  }
  // Strip non-digits and format with thousands separator dots (xx.xxx.xxx)
  const cleanDigits = val.replace(/\D/g, '');
  if (!cleanDigits) return val;
  return parseInt(cleanDigits, 10).toLocaleString('id-ID');
};

