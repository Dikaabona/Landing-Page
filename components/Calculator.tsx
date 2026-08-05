
import React, { useState, useEffect } from 'react';
import { Calculator as CalcIcon, TrendingUp, DollarSign, Percent } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const FEES_DATA: any = {
  shopee: {
    'Non-Star': {
      'Kategori A (Fashion, Aksesoris, dll)': 6.0,
      'Kategori B (FMCG, Elektronik Kecil, dll)': 6.0,
      'Kategori C (Hobi, Koleksi, dll)': 4.75,
      'Kategori D (Elektronik Besar, dll)': 3.3,
      'Kategori E (Kebutuhan Pokok, dll)': 3.3,
    },
    'Star/Star+': {
      'Kategori A (Fashion, Aksesoris, dll)': 8.25,
      'Kategori B (FMCG, Elektronik Kecil, dll)': 6.5,
      'Kategori C (Hobi, Koleksi, dll)': 5.25,
      'Kategori D (Elektronik Besar, dll)': 3.8,
      'Kategori E (Kebutuhan Pokok, dll)': 3.8,
    },
    'Shopee Mall': {
      'Kategori A (Fashion, Kosmetik, dll)': 8.5,
      'Kategori B (FMCG, Ibu & Bayi, dll)': 6.0,
      'Kategori C (Rumah Tangga, dll)': 5.0,
      'Kategori D (Gadget, Video Game, dll)': 3.5,
      'Kategori E (CCTV, Elektronik Besar, dll)': 1.0,
    }
  },
  tiktok: {
    'Merchant': {
      'Grup 1 (Fashion, Kecantikan, Aksesoris)': 10.0,
      'Grup 2 (FMCG, Ibu & Bayi, Hobi)': 8.0,
      'Grup 3 (Elektronik, Lifestyle, dsb)': 6.5,
      'Grup 4 (Buku, Rumah Tangga, dsb)': 5.0,
      'Grup 5 (Gadget, Komputer, Handphone)': 1.0,
    },
    'Power Merchant': {
      'Grup 1 (Fashion, Kecantikan, Aksesoris)': 9.25, // Updated from 14.0
      'Grup 2 (FMCG, Ibu & Bayi, Hobi)': 12.0,
      'Grup 3 (Elektronik, Lifestyle, dsb)': 10.5,
      'Grup 4 (Buku, Rumah Tangga, dsb)': 9.0,
      'Grup 5 (Gadget, Komputer, Handphone)': 5.0,
    },
    'Official Store': {
      'Grup 1 (Fashion, Kecantikan, Aksesoris)': 11.7,
      'Grup 2 (FMCG, Ibu & Bayi, Hobi)': 9.7,
      'Grup 3 (Elektronik, Lifestyle, dsb)': 8.2,
      'Grup 4 (Buku, Rumah Tangga, dsb)': 6.7,
      'Grup 5 (Gadget, Komputer, Handphone)': 2.7,
    }
  }
};

const Calculator: React.FC = () => {
  const { language } = useLanguage();
  const [platform, setPlatform] = useState<string>('shopee');
  const [sellerType, setSellerType] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  
  const [sellingPrice, setSellingPrice] = useState<number>(0);
  const [cogs, setCogs] = useState<number>(0);
  const [adminFeePercent, setAdminFeePercent] = useState<number>(8.25);
  const [serviceFeePercent, setServiceFeePercent] = useState<number>(0);
  const [fixedFee, setFixedFee] = useState<number>(1250);
  const [marketingPercent, setMarketingPercent] = useState<number>(0);
  const [otherCosts, setOtherCosts] = useState<number>(2000);
  const [affiliatePercent, setAffiliatePercent] = useState<number>(0);
  const [isPreOrder, setIsPreOrder] = useState<boolean>(false);
  
  // Shopee Optional Fees
  const [usePromoXtra, setUsePromoXtra] = useState<boolean>(false);
  const [useGratisOngkirXtra, setUseGratisOngkirXtra] = useState<boolean>(false);

  // Tiktok Optional Fees
  const [useKomisiDinamis, setUseKomisiDinamis] = useState<boolean>(false);
  const [useCashbackBonus, setUseCashbackBonus] = useState<boolean>(false);
  const [useGmvMax, setUseGmvMax] = useState<boolean>(false);
  const [useGrowthXtra, setUseGrowthXtra] = useState<boolean>(false);

  // Mandatory Fees
  const pph22Percent = 0.5; // Mandatory 0.5% for all sellers
  const tiktokShippingCostFixed = 990; // Mandatory Rp 990 fixed fee for TikTok sellers

  // Update admin fee when platform, sellerType, or category changes
  useEffect(() => {
    if (platform === 'shopee' && sellerType && category) {
      const fee = FEES_DATA.shopee[sellerType][category];
      setAdminFeePercent(fee);
      setServiceFeePercent(0); 
      setFixedFee(1250); 
    } else if (platform === 'tiktok' && sellerType && category) {
      const fee = FEES_DATA.tiktok[sellerType][category];
      setAdminFeePercent(fee);
      setServiceFeePercent(sellerType === 'Official Store' ? 1.8 : 0);
      setFixedFee(1250); 
    } else if (platform === 'manual') {
      setServiceFeePercent(0);
    }
  }, [platform, sellerType, category]);

  const [results, setResults] = useState({
    adminFeeAmount: 0,
    serviceFeeAmount: 0,
    fixedFeeAmount: 0,
    marketingAmount: 0,
    affiliateAmount: 0,
    preOrderAmount: 0,
    promoXtraAmount: 0,
    gratisOngkirXtraAmount: 0,
    komisiDinamisAmount: 0,
    cashbackBonusAmount: 0,
    gmvMaxAmount: 0,
    growthXtraAmount: 0,
    shippingCostAmount: 0,
    pph22Amount: 0,
    totalCosts: 0,
    netProfit: 0,
    margin: 0,
    roi: 0
  });

  useEffect(() => {
    const adminAmount = (sellingPrice * adminFeePercent) / 100;
    const serviceAmount = (sellingPrice * serviceFeePercent) / 100;
    const fixedAmount = fixedFee;
    
    const totalAdminCost = adminAmount + serviceAmount + fixedAmount;
    
    const marketingAmount = (sellingPrice * marketingPercent) / 100;
    const affiliateAmount = (sellingPrice * affiliatePercent) / 100;
    const preOrderAmount = (isPreOrder && platform !== 'manual') ? (sellingPrice * 3) / 100 : 0;
    
    // Shopee Optional Fees
    const promoXtraAmount = (platform === 'shopee' && usePromoXtra) ? (sellingPrice * 4.5) / 100 : 0;
    const gratisOngkirXtraAmount = (platform === 'shopee' && useGratisOngkirXtra) ? (sellingPrice * 5.5) / 100 : 0;
    
    // Tiktok Optional & Special Fees
    const komisiDinamisAmount = (platform === 'tiktok' && useKomisiDinamis) ? (sellingPrice * 8) / 100 : 0;
    const cashbackBonusAmount = (platform === 'tiktok' && useCashbackBonus) ? (sellingPrice * 3.5) / 100 : 0;
    const gmvMaxAmount = (platform === 'tiktok' && useGmvMax) ? (sellingPrice * 4.5) / 100 : 0;
    const growthXtraAmount = (platform === 'tiktok' && useGrowthXtra) ? (sellingPrice * 4) / 100 : 0;
    const shippingCostAmount = (platform === 'tiktok') ? tiktokShippingCostFixed : 0;

    // PPH 22 Mandatory (0.5% for all sellers)
    const pph22Amount = (sellingPrice * pph22Percent) / 100;
    
    // gmvMaxAmount is a commission discount/rebate, reducing the total costs
    const baseCosts = cogs + totalAdminCost + marketingAmount + affiliateAmount + preOrderAmount + promoXtraAmount + gratisOngkirXtraAmount + komisiDinamisAmount + cashbackBonusAmount + growthXtraAmount + shippingCostAmount + pph22Amount + otherCosts;
    const totalCosts = Math.max(0, baseCosts - gmvMaxAmount);
    const netProfit = sellingPrice - totalCosts;
    const margin = sellingPrice > 0 ? (netProfit / sellingPrice) * 100 : 0;
    const roi = cogs > 0 ? (netProfit / cogs) * 100 : 0;

    setResults({
      adminFeeAmount: adminAmount,
      serviceFeeAmount: serviceAmount,
      fixedFeeAmount: fixedAmount,
      marketingAmount,
      affiliateAmount,
      preOrderAmount,
      promoXtraAmount,
      gratisOngkirXtraAmount,
      komisiDinamisAmount,
      cashbackBonusAmount,
      gmvMaxAmount,
      growthXtraAmount,
      shippingCostAmount,
      pph22Amount,
      totalCosts,
      netProfit,
      margin,
      roi
    });
  }, [sellingPrice, cogs, adminFeePercent, serviceFeePercent, fixedFee, marketingPercent, otherCosts, affiliatePercent, isPreOrder, platform, usePromoXtra, useGratisOngkirXtra, useKomisiDinamis, useCashbackBonus, useGmvMax, useGrowthXtra, pph22Percent, tiktokShippingCostFixed]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(val);
  };

  const formatInput = (val: number | string) => {
    if (!val) return '';
    const num = val.toString().replace(/[^0-9]/g, '');
    return new Intl.NumberFormat('id-ID').format(Number(num));
  };

  const handleInputChange = (val: string, setter: (n: number) => void) => {
    const num = val.replace(/[^0-9]/g, '');
    setter(Number(num));
  };

  return (
    <section id="calculator" className="pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-yellow-600 font-bold tracking-widest uppercase text-sm mb-4">
            {language === 'en' ? 'MARKETPLACE TOOLS' : 'TOKO TOOLS'}
          </h2>
          <h3 className="text-3xl sm:text-5xl font-[900] text-slate-900 leading-tight">
            {language === 'en' ? 'Marketplace Profit Calculator' : 'Kalkulator Profit Marketplace'}
          </h3>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto font-medium">
            {language === 'en' 
              ? 'Calculate your estimated net profit after marketplace admin fees, COGS, and other operational expenses.' 
              : 'Hitung perkiraan keuntungan bersih jualan Anda setelah dipotong biaya admin marketplace, modal, dan biaya operasional lainnya.'}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Input Section */}
          <div className="bg-slate-50 p-4 sm:p-6 md:p-10 rounded-[24px] sm:rounded-[32px] border border-slate-100 shadow-sm">
            <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-6 sm:mb-8 flex items-center gap-2">
              <CalcIcon className="text-yellow-500" size={24} />
              {language === 'en' ? 'Sales Inputs' : 'Input Penjualan'}
            </h4>

            <div className="space-y-4 sm:space-y-6">
              <div className="p-3 sm:p-4 bg-yellow-50 rounded-2xl border border-yellow-100 mb-4 sm:mb-6">
                <label className="block text-[10px] sm:text-sm font-black text-yellow-800 mb-2 sm:mb-3 uppercase tracking-wider">
                  {language === 'en' ? 'Select Marketplace' : 'Pilih Marketplace'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['shopee', 'tiktok'].map((p) => (
                    <button
                      key={p}
                      onClick={() => {
                        setPlatform(p);
                        setSellerType('');
                        setCategory('');
                      }}
                      className={`py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm transition-all capitalize border-2 ${
                        platform === p 
                          ? 'bg-yellow-500 border-yellow-500 text-slate-900 shadow-lg shadow-yellow-500/20' 
                          : 'bg-white border-slate-200 text-slate-500 hover:border-yellow-200'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {(platform === 'shopee' || platform === 'tiktok') && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1 sm:mb-2">
                      {language === 'en' ? 'Seller Type' : 'Tipe Seller'}
                    </label>
                    <select
                      value={sellerType}
                      onChange={(e) => {
                        setSellerType(e.target.value);
                        setCategory('');
                      }}
                      className="w-full px-3 py-3 sm:px-4 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-slate-200 focus:border-yellow-500 focus:ring-0 transition-all font-bold text-sm sm:text-base text-slate-900 bg-white"
                    >
                      <option value="">{language === 'en' ? 'Select Type' : 'Pilih Tipe'}</option>
                      {Object.keys(FEES_DATA[platform]).map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1 sm:mb-2">
                      {language === 'en' ? 'Product Category' : 'Kategori Produk'} {platform === 'tiktok' ? 'Tokopedia/TikTok' : ''}
                    </label>
                    <select
                      value={category}
                      disabled={!sellerType}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-3 sm:px-4 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-slate-200 focus:border-yellow-500 focus:ring-0 transition-all font-bold text-sm sm:text-base text-slate-900 bg-white disabled:opacity-50"
                    >
                      <option value="">{language === 'en' ? 'Select Category' : 'Pilih Kategori'}</option>
                      {sellerType && Object.keys(FEES_DATA[platform][sellerType]).map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 sm:gap-6">
                <div>
                  <label className="block text-[10px] sm:text-sm font-bold text-slate-700 mb-1 sm:mb-2 leading-tight">Admin (%) {platform !== 'manual' && '(Auto)'}</label>
                  <div className="relative">
                    <input 
                      type="number"
                      step="0.01"
                      value={adminFeePercent || ''}
                      onChange={(e) => platform === 'manual' && setAdminFeePercent(Number(e.target.value))}
                      readOnly={platform !== 'manual'}
                      className={`w-full pl-3 pr-8 sm:pl-4 sm:pr-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 transition-all font-bold text-sm sm:text-base text-slate-900 ${
                        platform !== 'manual' ? 'bg-slate-100 border-slate-100 cursor-not-allowed' : 'border-slate-200 focus:border-yellow-500 focus:ring-0'
                      }`}
                    />
                    <span className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs sm:text-base">%</span>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] sm:text-sm font-bold text-slate-700 mb-1 sm:mb-2 leading-tight">Fixed Fee (Rp)</label>
                  <div className="relative">
                    <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs sm:text-base">Rp</span>
                    <input 
                      type="text"
                      value={formatInput(fixedFee)}
                      onChange={(e) => platform === 'manual' && handleInputChange(e.target.value, setFixedFee)}
                      readOnly={platform !== 'manual'}
                      className={`w-full pl-8 pr-3 sm:pl-12 sm:pr-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 transition-all font-bold text-sm sm:text-base text-slate-900 ${
                        platform !== 'manual' ? 'bg-slate-100 border-slate-100 cursor-not-allowed' : 'border-slate-200 focus:border-yellow-500 focus:ring-0'
                      }`}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-6">
                <div>
                  <label className="block text-[10px] sm:text-sm font-bold text-slate-700 mb-1 sm:mb-2">
                    {language === 'en' ? 'Selling Price (Rp)' : 'Harga Jual (Rp)'}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs sm:text-base">Rp</span>
                    <input 
                      type="text"
                      value={formatInput(sellingPrice)}
                      onChange={(e) => handleInputChange(e.target.value, setSellingPrice)}
                      placeholder={language === 'en' ? 'Price' : 'Jual'}
                      className="w-full pl-8 pr-3 sm:pl-12 sm:pr-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-slate-200 focus:border-yellow-500 focus:ring-0 transition-all font-bold text-sm sm:text-base text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] sm:text-sm font-bold text-slate-700 mb-1 sm:mb-2">
                    {language === 'en' ? 'COGS / Cost of Goods (Rp)' : 'Modal (Rp)'}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs sm:text-base">Rp</span>
                    <input 
                      type="text"
                      value={formatInput(cogs)}
                      onChange={(e) => handleInputChange(e.target.value, setCogs)}
                      placeholder={language === 'en' ? 'COGS' : 'Modal'}
                      className="w-full pl-8 pr-3 sm:pl-12 sm:pr-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-slate-200 focus:border-yellow-500 focus:ring-0 transition-all font-bold text-sm sm:text-base text-slate-900"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-6">
                <div>
                  <label className="block text-[10px] sm:text-sm font-bold text-slate-700 mb-1 sm:mb-2">
                    {language === 'en' ? 'Ad Spend (%)' : 'Biaya Iklan (%)'}
                  </label>
                  <div className="relative">
                    <input 
                      type="number"
                      step="0.1"
                      value={marketingPercent || ''}
                      onChange={(e) => setMarketingPercent(Number(e.target.value))}
                      className="w-full pl-3 pr-8 sm:pl-4 sm:pr-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-slate-200 focus:border-yellow-500 focus:ring-0 transition-all font-bold text-sm sm:text-base text-slate-900"
                    />
                    <span className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs sm:text-base">%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] sm:text-sm font-bold text-slate-700 mb-1 sm:mb-2">
                    {language === 'en' ? 'Packaging (Rp)' : 'Packing (Rp)'}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs sm:text-base">Rp</span>
                    <input 
                      type="text"
                      value={formatInput(otherCosts)}
                      onChange={(e) => handleInputChange(e.target.value, setOtherCosts)}
                      className="w-full pl-8 pr-3 sm:pl-12 sm:pr-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-slate-200 focus:border-yellow-500 focus:ring-0 transition-all font-bold text-sm sm:text-base text-slate-900"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-6">
                <div>
                  <label className="block text-[10px] sm:text-sm font-bold text-slate-700 mb-1 sm:mb-2">
                    {language === 'en' ? 'Affiliate Commission (%)' : 'Komisi Affiliate (%)'}
                  </label>
                  <div className="relative">
                    <input 
                      type="number"
                      step="0.1"
                      value={affiliatePercent || ''}
                      onChange={(e) => setAffiliatePercent(Number(e.target.value))}
                      placeholder={language === 'en' ? 'Commission %' : '% Komisi'}
                      className="w-full pl-3 pr-8 sm:pl-4 sm:pr-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-slate-200 focus:border-yellow-500 focus:ring-0 transition-all font-bold text-sm sm:text-base text-slate-900"
                    />
                    <span className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs sm:text-base">%</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                  {language === 'en' ? 'Program & Extra Fees' : 'Program & Biaya Tambahan'}
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  <div className="flex items-center justify-between gap-2.5 bg-emerald-50/90 p-3 rounded-xl sm:rounded-2xl border border-emerald-200/80">
                    <div className="flex flex-col min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-black text-emerald-950">
                          {language === 'en' ? 'Pemungutan PPH 22' : 'Pemungutan PPH 22'}
                        </span>
                        <span className="bg-emerald-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider flex-shrink-0">
                          {language === 'en' ? 'Mandatory' : 'Wajib'}
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-800 font-medium mt-0.5 leading-tight">
                        {language === 'en' 
                          ? 'PPh 22 tax withholding (0.5%)' 
                          : 'Potongan pajak PPh 22 (0,5%)'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-emerald-100 text-emerald-900 text-xs font-black px-2 py-1 rounded-lg border border-emerald-300 flex-shrink-0 self-center">
                      <span>0,5%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2.5 bg-slate-100/70 p-3 rounded-xl sm:rounded-2xl border border-slate-200/60">
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-xs font-bold text-slate-700">
                        {language === 'en' ? 'Pre-Order Product?' : 'Produk Pre-Order?'}
                      </span>
                      <span className="text-[10px] text-slate-500 leading-tight">
                        {language === 'en' ? '+3% fee for Shopee/Tiktok' : '+3% biaya untuk Shopee/Tiktok'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsPreOrder(!isPreOrder)}
                      className={`relative inline-flex h-5 w-9 sm:h-6 sm:w-11 flex-shrink-0 items-center rounded-full transition-colors focus:outline-none self-center ${
                        isPreOrder ? 'bg-yellow-500' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-3.5 w-3.5 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform ${
                          isPreOrder ? 'translate-x-4 sm:translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {platform === 'shopee' && (
                    <>
                      <div className="flex items-center justify-between gap-2.5 bg-orange-50 p-3 rounded-xl sm:rounded-2xl border border-orange-100">
                        <div className="flex flex-col min-w-0 flex-1">
                          <span className="text-xs font-bold text-orange-800">
                            {language === 'en' ? 'Promo Xtra Program?' : 'Layanan Promo Xtra?'}
                          </span>
                          <span className="text-[10px] text-orange-600 leading-tight">
                            {language === 'en' ? 'Service fee 4.5%' : 'Biaya layanan 4.5%'}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setUsePromoXtra(!usePromoXtra)}
                          className={`relative inline-flex h-5 w-9 sm:h-6 sm:w-11 flex-shrink-0 items-center rounded-full transition-colors focus:outline-none self-center ${
                            usePromoXtra ? 'bg-orange-500' : 'bg-slate-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-3.5 w-3.5 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform ${
                              usePromoXtra ? 'translate-x-4 sm:translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between gap-2.5 bg-blue-50 p-3 rounded-xl sm:rounded-2xl border border-blue-100">
                        <div className="flex flex-col min-w-0 flex-1">
                          <span className="text-xs font-bold text-blue-800">
                            {language === 'en' ? 'Free Shipping Xtra?' : 'Gratis Ongkir Xtra?'}
                          </span>
                          <span className="text-[10px] text-blue-600 leading-tight">
                            {language === 'en' ? 'Service fee 5.5%' : 'Biaya layanan 5.5%'}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setUseGratisOngkirXtra(!useGratisOngkirXtra)}
                          className={`relative inline-flex h-5 w-9 sm:h-6 sm:w-11 flex-shrink-0 items-center rounded-full transition-colors focus:outline-none self-center ${
                            useGratisOngkirXtra ? 'bg-blue-500' : 'bg-slate-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-3.5 w-3.5 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform ${
                              useGratisOngkirXtra ? 'translate-x-4 sm:translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </>
                  )}

                  {platform === 'tiktok' && (
                    <>
                      {sellerType === 'Official Store' && (
                        <div className="flex items-center justify-between gap-2.5 bg-rose-50 p-3 rounded-xl sm:rounded-2xl border border-rose-200/80">
                          <div className="flex flex-col min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-xs font-black text-rose-950">
                                {language === 'en' ? 'Biaya Layanan Mall (1.8%)' : 'Biaya Layanan Mall (1,8%)'}
                              </span>
                              <span className="bg-rose-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider flex-shrink-0">
                                {language === 'en' ? 'Mandatory' : 'Otomatis'}
                              </span>
                            </div>
                            <span className="text-[10px] text-rose-800 font-medium mt-0.5 leading-tight">
                              {language === 'en' 
                                ? 'Automatic TikTok Mall service fee (1.8%)' 
                                : 'Biaya layanan resmi TikTok Mall 1,8%'}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 bg-rose-100 text-rose-900 text-xs font-black px-2 py-1 rounded-lg border border-rose-300 flex-shrink-0 self-center">
                            <span>1,8%</span>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between gap-2.5 bg-sky-50 p-3 rounded-xl sm:rounded-2xl border border-sky-200/80">
                        <div className="flex flex-col min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-xs font-black text-sky-950">
                              {language === 'en' ? 'Shipping Cost (990)' : 'Shipping Cost (990)'}
                            </span>
                            <span className="bg-sky-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider flex-shrink-0">
                              {language === 'en' ? 'Mandatory' : 'Wajib'}
                            </span>
                          </div>
                          <span className="text-[10px] text-sky-800 font-medium mt-0.5 leading-tight">
                            {language === 'en' 
                              ? 'Fixed shipping cost Rp 990 per order' 
                              : 'Biaya pengiriman Rp 990 / pesanan'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 bg-sky-100 text-sky-900 text-xs font-black px-2 py-1 rounded-lg border border-sky-300 flex-shrink-0 self-center">
                          <span>Rp 990</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-2.5 bg-fuchsia-50 p-3 rounded-xl sm:rounded-2xl border border-fuchsia-100">
                        <div className="flex flex-col min-w-0 flex-1">
                          <span className="text-xs font-bold text-fuchsia-800">
                            {language === 'en' ? 'Dynamic Commission?' : 'Komisi Dinamis?'}
                          </span>
                          <span className="text-[10px] text-fuchsia-600 leading-tight">
                            {language === 'en' ? 'Service fee 8%' : 'Biaya layanan 8%'}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setUseKomisiDinamis(!useKomisiDinamis)}
                          className={`relative inline-flex h-5 w-9 sm:h-6 sm:w-11 flex-shrink-0 items-center rounded-full transition-colors focus:outline-none self-center ${
                            useKomisiDinamis ? 'bg-fuchsia-500' : 'bg-slate-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-3.5 w-3.5 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform ${
                              useKomisiDinamis ? 'translate-x-4 sm:translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between gap-2.5 bg-teal-50 p-3 rounded-xl sm:rounded-2xl border border-teal-100">
                        <div className="flex flex-col min-w-0 flex-1">
                          <span className="text-xs font-bold text-teal-900">
                            {language === 'en' ? 'GMV Max Rebate?' : 'GMV Max Potongan Komisi?'}
                          </span>
                          <span className="text-[10px] text-teal-700 font-medium leading-tight">
                            {language === 'en' ? 'Rebate -4.5%' : 'Pengurang komisi 4,5%'}
                          </span>
                          <span className="text-[9px] text-teal-600 block mt-0.5 font-normal italic">
                            * {language === 'en' ? 'Note: Percentage varies per store' : 'Catatan: Setiap toko nilainya berbeda-beda'}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setUseGmvMax(!useGmvMax)}
                          className={`relative inline-flex h-5 w-9 sm:h-6 sm:w-11 flex-shrink-0 items-center rounded-full transition-colors focus:outline-none self-center ${
                            useGmvMax ? 'bg-teal-500' : 'bg-slate-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-3.5 w-3.5 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform ${
                              useGmvMax ? 'translate-x-4 sm:translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between gap-2.5 bg-amber-50 p-3 rounded-xl sm:rounded-2xl border border-amber-200/80">
                        <div className="flex flex-col min-w-0 flex-1">
                          <span className="text-xs font-bold text-amber-900">
                            Growth Xtra Program?
                          </span>
                          <span className="text-[10px] text-amber-700 font-medium leading-tight">
                            {language === 'en' ? 'Service fee 4%' : 'Biaya layanan 4%'}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setUseGrowthXtra(!useGrowthXtra)}
                          className={`relative inline-flex h-5 w-9 sm:h-6 sm:w-11 flex-shrink-0 items-center rounded-full transition-colors focus:outline-none self-center ${
                            useGrowthXtra ? 'bg-amber-500' : 'bg-slate-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-3.5 w-3.5 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform ${
                              useGrowthXtra ? 'translate-x-4 sm:translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between gap-2.5 bg-violet-50 p-3 rounded-xl sm:rounded-2xl border border-violet-100">
                        <div className="flex flex-col min-w-0 flex-1">
                          <span className="text-xs font-bold text-violet-800">
                            {language === 'en' ? 'Cashback Bonus?' : 'Cashback Bonus?'}
                          </span>
                          <span className="text-[10px] text-violet-600 leading-tight">
                            {language === 'en' ? 'Service fee 3.5%' : 'Biaya layanan 3.5%'}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setUseCashbackBonus(!useCashbackBonus)}
                          className={`relative inline-flex h-5 w-9 sm:h-6 sm:w-11 flex-shrink-0 items-center rounded-full transition-colors focus:outline-none self-center ${
                            useCashbackBonus ? 'bg-violet-500' : 'bg-slate-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-3.5 w-3.5 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform ${
                              useCashbackBonus ? 'translate-x-4 sm:translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Results Section */}
          <div className="flex flex-col h-full">
            <div className="bg-[#0f172a] text-white p-5 sm:p-8 md:p-12 rounded-[28px] sm:rounded-[40px] shadow-2xl relative overflow-hidden flex-grow">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none"></div>

              <h4 className="text-[10px] sm:text-xs font-bold text-slate-400 mb-1 uppercase tracking-widest">
                {language === 'en' ? 'ESTIMATED NET PROFIT' : 'ESTIMASI PROFIT BERSIH'}
              </h4>
              <div className="text-3xl sm:text-5xl md:text-6xl font-black text-yellow-500 mb-6 sm:mb-12 tracking-tighter break-words">
                {formatCurrency(results.netProfit)}
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-12">
                <div className="space-y-1">
                  <p className="text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">Profit Margin</p>
                  <p className="text-xl sm:text-2xl font-black text-white">{results.margin.toFixed(1)}%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                    {language === 'en' ? 'COGS ROI' : 'ROI Modal'}
                  </p>
                  <p className="text-xl sm:text-2xl font-black text-white">{results.roi.toFixed(1)}%</p>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4 pt-6 sm:pt-8 border-t border-slate-800">
                {platform === 'shopee' ? (
                  <>
                    <div className="flex justify-between items-start gap-2 text-xs sm:text-sm">
                      <span className="text-slate-400 font-bold leading-snug flex-1 pr-1">
                        {language === 'en' ? 'Administration Fee' : 'Biaya Administrasi'}
                      </span>
                      <span className="text-white font-bold whitespace-nowrap text-right flex-shrink-0">{formatCurrency(results.adminFeeAmount)}</span>
                    </div>
                    <div className="flex justify-between items-start gap-2 text-xs sm:text-sm">
                      <span className="text-slate-400 font-bold leading-snug flex-1 pr-1">
                        {language === 'en' ? 'Service Fee' : 'Biaya Layanan'}
                      </span>
                      <span className="text-white font-bold whitespace-nowrap text-right flex-shrink-0">{formatCurrency(results.serviceFeeAmount)}</span>
                    </div>
                    <div className="flex justify-between items-start gap-2 text-xs sm:text-sm">
                      <span className="text-slate-400 font-bold leading-snug flex-1 pr-1">
                        {language === 'en' ? 'Order Processing Fee' : 'Biaya Proses Pesanan'}
                      </span>
                      <span className="text-white font-bold whitespace-nowrap text-right flex-shrink-0">{formatCurrency(results.fixedFeeAmount)}</span>
                    </div>
                  </>
                ) : platform === 'tiktok' ? (
                  <>
                    <div className="flex justify-between items-start gap-2 text-xs sm:text-sm">
                      <span className="text-slate-400 font-bold leading-snug flex-1 pr-1">
                        {language === 'en' ? 'Administration Fee' : 'Biaya Administrasi'}
                      </span>
                      <span className="text-white font-bold whitespace-nowrap text-right flex-shrink-0">{formatCurrency(results.adminFeeAmount)}</span>
                    </div>
                    {results.serviceFeeAmount > 0 && (
                      <div className="flex justify-between items-start gap-2 text-xs sm:text-sm text-rose-400">
                        <span className="font-bold leading-snug flex-1 pr-1">
                          {language === 'en' ? 'TikTok Mall Service Fee (1.8%)' : 'Biaya Layanan Mall (1,8%)'}
                        </span>
                        <span className="font-black whitespace-nowrap text-right flex-shrink-0">{formatCurrency(results.serviceFeeAmount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-start gap-2 text-xs sm:text-sm">
                      <span className="text-slate-400 font-bold leading-snug flex-1 pr-1">
                        {language === 'en' ? 'Order Processing Fee' : 'Biaya Proses Pesanan'}
                      </span>
                      <span className="text-white font-bold whitespace-nowrap text-right flex-shrink-0">{formatCurrency(results.fixedFeeAmount)}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between items-start gap-2 text-xs sm:text-sm">
                    <span className="text-slate-400 font-bold leading-snug flex-1 pr-1">
                      {language === 'en' ? 'Platform / Admin Fee' : 'Biaya Platform / Admin'}
                    </span>
                    <span className="text-white font-black whitespace-nowrap text-right flex-shrink-0">{formatCurrency(results.adminFeeAmount + results.serviceFeeAmount + results.fixedFeeAmount)}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-start gap-2 text-xs sm:text-sm">
                  <span className="text-slate-400 font-bold leading-snug flex-1 pr-1">
                    {language === 'en' ? 'Ad Spend' : 'Biaya Iklan'}
                  </span>
                  <span className="text-white font-black whitespace-nowrap text-right flex-shrink-0">{formatCurrency(results.marketingAmount)}</span>
                </div>
                <div className="flex justify-between items-start gap-2 text-xs sm:text-sm">
                  <span className="text-slate-400 font-bold leading-snug flex-1 pr-1">
                    {language === 'en' ? 'Affiliate Commission' : 'Komisi Affiliate'}
                  </span>
                  <span className="text-white font-black whitespace-nowrap text-right flex-shrink-0">{formatCurrency(results.affiliateAmount)}</span>
                </div>
                {results.preOrderAmount > 0 && (
                  <div className="flex justify-between items-start gap-2 text-xs sm:text-sm text-yellow-500">
                    <span className="font-bold leading-snug flex-1 pr-1">
                      {language === 'en' ? 'Pre-Order Fee (3%)' : 'Biaya Pre-Order (3%)'}
                    </span>
                    <span className="font-black whitespace-nowrap text-right flex-shrink-0">{formatCurrency(results.preOrderAmount)}</span>
                  </div>
                )}
                {results.promoXtraAmount > 0 && (
                  <div className="flex justify-between items-start gap-2 text-xs sm:text-sm text-orange-500">
                    <span className="font-bold leading-snug flex-1 pr-1">Promo Xtra (4.5%)</span>
                    <span className="font-black whitespace-nowrap text-right flex-shrink-0">{formatCurrency(results.promoXtraAmount)}</span>
                  </div>
                )}
                {results.gratisOngkirXtraAmount > 0 && (
                  <div className="flex justify-between items-start gap-2 text-xs sm:text-sm text-blue-500">
                    <span className="font-bold leading-snug flex-1 pr-1">Gratis Ongkir Xtra (5.5%)</span>
                    <span className="font-black whitespace-nowrap text-right flex-shrink-0">{formatCurrency(results.gratisOngkirXtraAmount)}</span>
                  </div>
                )}
                {results.komisiDinamisAmount > 0 && (
                  <div className="flex justify-between items-start gap-2 text-xs sm:text-sm text-fuchsia-500">
                    <span className="font-bold leading-snug flex-1 pr-1">
                      {language === 'en' ? 'Dynamic Commission (8%)' : 'Komisi Dinamis (8%)'}
                    </span>
                    <span className="font-black whitespace-nowrap text-right flex-shrink-0">{formatCurrency(results.komisiDinamisAmount)}</span>
                  </div>
                )}
                {results.gmvMaxAmount > 0 && (
                  <div className="flex justify-between items-start gap-2 text-xs sm:text-sm text-teal-400">
                    <span className="font-bold leading-snug flex-1 pr-1">
                      {language === 'en' ? 'GMV Max Potongan Komisi (-4.5%)' : 'GMV Max Potongan Komisi (-4,5%)'}
                    </span>
                    <span className="font-black whitespace-nowrap text-right flex-shrink-0">- {formatCurrency(results.gmvMaxAmount)}</span>
                  </div>
                )}
                {results.cashbackBonusAmount > 0 && (
                  <div className="flex justify-between items-start gap-2 text-xs sm:text-sm text-violet-500">
                    <span className="font-bold leading-snug flex-1 pr-1">Cashback Bonus (3.5%)</span>
                    <span className="font-black whitespace-nowrap text-right flex-shrink-0">{formatCurrency(results.cashbackBonusAmount)}</span>
                  </div>
                )}
                {results.growthXtraAmount > 0 && (
                  <div className="flex justify-between items-start gap-2 text-xs sm:text-sm text-amber-400">
                    <span className="font-bold leading-snug flex-1 pr-1">
                      {language === 'en' ? 'Growth Xtra Program (4%)' : 'Growth Xtra Program (4%)'}
                    </span>
                    <span className="font-black whitespace-nowrap text-right flex-shrink-0">{formatCurrency(results.growthXtraAmount)}</span>
                  </div>
                )}
                {results.shippingCostAmount > 0 && (
                  <div className="flex justify-between items-start gap-2 text-xs sm:text-sm text-sky-400">
                    <span className="font-bold leading-snug flex-1 pr-1">
                      {language === 'en' ? 'Shipping Cost (990)' : 'Shipping Cost (990)'}
                    </span>
                    <span className="font-black whitespace-nowrap text-right flex-shrink-0">{formatCurrency(results.shippingCostAmount)}</span>
                  </div>
                )}
                {results.pph22Amount > 0 && (
                  <div className="flex justify-between items-start gap-2 text-xs sm:text-sm text-emerald-400">
                    <span className="font-bold leading-snug flex-1 pr-1">
                      {language === 'en' ? 'Pemungutan PPH 22 (0.5%)' : 'Pemungutan PPH 22 (0,5%)'}
                    </span>
                    <span className="font-black whitespace-nowrap text-right flex-shrink-0">{formatCurrency(results.pph22Amount)}</span>
                  </div>
                )}
                <div className="flex justify-between items-start gap-2 text-xs sm:text-sm pt-3 border-t border-slate-800/80">
                  <span className="text-slate-400 font-bold leading-snug flex-1 pr-1">
                    {language === 'en' ? 'Total Deductions & Costs' : 'Total Seluruh Biaya'}
                  </span>
                  <span className="text-red-400 font-black whitespace-nowrap text-right flex-shrink-0">{formatCurrency(results.totalCosts)}</span>
                </div>
              </div>

              <div className="mt-8 sm:mt-12">
                <a 
                  href="https://wa.me/628111743005?text=Halo%20Visibel%20Agency,%20saya%20sudah%20mencoba%20kalkulator%20marketplace%20dan%20ingin%20konsultasi%20lebih%20lanjut%20untuk%20optimasi%20toko%20saya."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-yellow-500 text-slate-900 py-4 sm:py-5 rounded-2xl font-black text-center hover:bg-yellow-400 transition-all shadow-xl shadow-yellow-500/20 uppercase tracking-widest text-xs sm:text-sm"
                >
                  {language === 'en' ? 'Consult Profit Optimization' : 'Konsultasi Optimasi Profit'}
                </a>
              </div>
            </div>

            <div className="mt-8 bg-yellow-50 border border-yellow-100 p-6 rounded-[24px] flex items-start gap-4">
              <TrendingUp className="text-yellow-600 flex-shrink-0 mt-1" size={24} />
              <p className="text-yellow-800 text-sm font-medium leading-relaxed">
                <span className="font-bold">{language === 'en' ? 'Tips:' : 'Tips:'}</span>{' '}
                {language === 'en'
                  ? 'To achieve a healthy net profit in the marketplace, target a minimum margin of 20-30% to cover platform fees and return risks.'
                  : 'Untuk mendapatkan profit bersih yang sehat di marketplace, usahakan margin minimal berada di angka 20-30% untuk menutupi biaya platform dan risiko retur.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
