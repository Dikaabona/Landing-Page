
import React, { useState, useEffect } from 'react';
import { Calculator as CalcIcon, TrendingUp, DollarSign, Percent } from 'lucide-react';

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
      'Grup 1 (Fashion, Kecantikan, Aksesoris)': 17.5, // Base + 1.8% Mall + 5.5% Bebas Ongkir (approx to image)
      'Grup 2 (FMCG, Ibu & Bayi, Hobi)': 15.5,
      'Grup 3 (Elektronik, Lifestyle, dsb)': 14.0,
      'Grup 4 (Buku, Rumah Tangga, dsb)': 12.5,
      'Grup 5 (Gadget, Komputer, Handphone)': 8.5,
    }
  }
};

const Calculator: React.FC = () => {
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

  // Update admin fee when platform, sellerType, or category changes
  useEffect(() => {
    if (platform === 'shopee' && sellerType && category) {
      const fee = FEES_DATA.shopee[sellerType][category];
      setAdminFeePercent(fee);
      // Average Shopee Service Fee (Gratis Ongkir Xtra 4% + Cashback Xtra 1.4%)
      // If user wants specific, they can see the total in results
      setServiceFeePercent(sellerType === 'Shopee Mall' ? 5 : 6); 
      setFixedFee(1250); 
    } else if (platform === 'tiktok' && sellerType && category) {
      const fee = FEES_DATA.tiktok[sellerType][category];
      setAdminFeePercent(fee);
      setServiceFeePercent(0);
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
    
    // Tiktok Optional Fees
    const komisiDinamisAmount = (platform === 'tiktok' && useKomisiDinamis) ? (sellingPrice * 5.5) / 100 : 0;
    const cashbackBonusAmount = (platform === 'tiktok' && useCashbackBonus) ? (sellingPrice * 3.5) / 100 : 0;
    
    const totalCosts = cogs + totalAdminCost + marketingAmount + affiliateAmount + preOrderAmount + promoXtraAmount + gratisOngkirXtraAmount + komisiDinamisAmount + cashbackBonusAmount + otherCosts;
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
      totalCosts,
      netProfit,
      margin,
      roi
    });
  }, [sellingPrice, cogs, adminFeePercent, serviceFeePercent, fixedFee, marketingPercent, otherCosts, affiliatePercent, isPreOrder, platform, usePromoXtra, useGratisOngkirXtra, useKomisiDinamis, useCashbackBonus]);

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
          <h2 className="text-yellow-600 font-bold tracking-widest uppercase text-sm mb-4">TOKO TOOLS</h2>
          <h3 className="text-3xl sm:text-5xl font-[900] text-slate-900 leading-tight">Kalkulator Profit Marketplace</h3>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
            Hitung perkiraan keuntungan bersih jualan Anda setelah dipotong biaya admin marketplace, modal, dan biaya operasional lainnya.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Input Section */}
          <div className="bg-slate-50 p-6 sm:p-10 rounded-[32px] border border-slate-100 shadow-sm">
            <h4 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
              <CalcIcon className="text-yellow-500" size={24} />
              Input Penjualan
            </h4>

            <div className="space-y-4 sm:space-y-6">
              <div className="p-3 sm:p-4 bg-yellow-50 rounded-2xl border border-yellow-100 mb-4 sm:mb-6">
                <label className="block text-[10px] sm:text-sm font-black text-yellow-800 mb-2 sm:mb-3 uppercase tracking-wider">Pilih Marketplace</label>
                <div className="grid grid-cols-2 gap-2">
                  {['shopee', 'tiktok'].map((p) => (
                    <button
                      key={p}
                      onClick={() => {
                        setPlatform(p);
                        setSellerType('');
                        setCategory('');
                      }}
                      className={`py-2 sm:py-3 rounded-xl font-bold text-[10px] sm:text-sm transition-all capitalize border-2 ${
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
                    <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1 sm:mb-2">Tipe Seller</label>
                    <select
                      value={sellerType}
                      onChange={(e) => {
                        setSellerType(e.target.value);
                        setCategory('');
                      }}
                      className="w-full px-3 py-3 sm:px-4 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-slate-200 focus:border-yellow-500 focus:ring-0 transition-all font-bold text-sm sm:text-base text-slate-900 bg-white"
                    >
                      <option value="">Pilih Tipe</option>
                      {Object.keys(FEES_DATA[platform]).map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1 sm:mb-2">
                      Kategori Produk {platform === 'tiktok' ? 'Tokopedia/TikTok' : ''}
                    </label>
                    <select
                      value={category}
                      disabled={!sellerType}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-3 sm:px-4 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-slate-200 focus:border-yellow-500 focus:ring-0 transition-all font-bold text-sm sm:text-base text-slate-900 bg-white disabled:opacity-50"
                    >
                      <option value="">Pilih Kategori</option>
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
                  <label className="block text-[10px] sm:text-sm font-bold text-slate-700 mb-1 sm:mb-2">Harga Jual (Rp)</label>
                  <div className="relative">
                    <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs sm:text-base">Rp</span>
                    <input 
                      type="text"
                      value={formatInput(sellingPrice)}
                      onChange={(e) => handleInputChange(e.target.value, setSellingPrice)}
                      placeholder="Jual"
                      className="w-full pl-8 pr-3 sm:pl-12 sm:pr-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-slate-200 focus:border-yellow-500 focus:ring-0 transition-all font-bold text-sm sm:text-base text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] sm:text-sm font-bold text-slate-700 mb-1 sm:mb-2">Modal (Rp)</label>
                  <div className="relative">
                    <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs sm:text-base">Rp</span>
                    <input 
                      type="text"
                      value={formatInput(cogs)}
                      onChange={(e) => handleInputChange(e.target.value, setCogs)}
                      placeholder="Modal"
                      className="w-full pl-8 pr-3 sm:pl-12 sm:pr-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-slate-200 focus:border-yellow-500 focus:ring-0 transition-all font-bold text-sm sm:text-base text-slate-900"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-6">
                <div>
                  <label className="block text-[10px] sm:text-sm font-bold text-slate-700 mb-1 sm:mb-2">Biaya Iklan (%)</label>
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
                  <label className="block text-[10px] sm:text-sm font-bold text-slate-700 mb-1 sm:mb-2">Packing (Rp)</label>
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

              <div className="pt-2">
                <label className="block text-[10px] sm:text-sm font-bold text-slate-700 mb-1 sm:mb-2">Komisi Affiliate (%)</label>
                <div className="relative">
                  <input 
                    type="number"
                    step="0.1"
                    value={affiliatePercent || ''}
                    onChange={(e) => setAffiliatePercent(Number(e.target.value))}
                    placeholder="Masukkan % komisi affiliate"
                    className="w-full pl-3 pr-8 sm:pl-4 sm:pr-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-slate-200 focus:border-yellow-500 focus:ring-0 transition-all font-bold text-sm sm:text-base text-slate-900"
                  />
                  <span className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs sm:text-base">%</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between bg-slate-100/50 p-4 rounded-2xl border border-slate-200/50">
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-bold text-slate-700">Pre-Order Item?</span>
                  <span className="text-[10px] text-slate-500">Otomatis +3% biaya untuk Shopee/Tiktok</span>
                </div>
                <button
                  onClick={() => setIsPreOrder(!isPreOrder)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                    isPreOrder ? 'bg-yellow-500' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isPreOrder ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {platform === 'shopee' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-orange-50 p-4 rounded-2xl border border-orange-100">
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-sm font-bold text-orange-800">Layanan Promo Xtra?</span>
                      <span className="text-[10px] text-orange-600">Biaya layanan 4.5%</span>
                    </div>
                    <button
                      onClick={() => setUsePromoXtra(!usePromoXtra)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                        usePromoXtra ? 'bg-orange-500' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          usePromoXtra ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between bg-blue-50 p-4 rounded-2xl border border-blue-100">
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-sm font-bold text-blue-800">Gratis Ongkir Xtra?</span>
                      <span className="text-[10px] text-blue-600">Biaya layanan 5.5% (Kategori G)</span>
                    </div>
                    <button
                      onClick={() => setUseGratisOngkirXtra(!useGratisOngkirXtra)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                        useGratisOngkirXtra ? 'bg-blue-500' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          useGratisOngkirXtra ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              )}

              {platform === 'tiktok' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-fuchsia-50 p-4 rounded-2xl border border-fuchsia-100">
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-sm font-bold text-fuchsia-800">Komisi Dinamis?</span>
                      <span className="text-[10px] text-fuchsia-600">Biaya layanan 5.5%</span>
                    </div>
                    <button
                      onClick={() => setUseKomisiDinamis(!useKomisiDinamis)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                        useKomisiDinamis ? 'bg-fuchsia-500' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          useKomisiDinamis ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between bg-violet-50 p-4 rounded-2xl border border-violet-100">
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-sm font-bold text-violet-800">Cashback Bonus?</span>
                      <span className="text-[10px] text-violet-600">Biaya layanan 3.5%</span>
                    </div>
                    <button
                      onClick={() => setUseCashbackBonus(!useCashbackBonus)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                        useCashbackBonus ? 'bg-violet-500' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          useCashbackBonus ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Results Section */}
          <div className="flex flex-col h-full">
            <div className="bg-[#0f172a] text-white p-8 sm:p-12 rounded-[40px] shadow-2xl relative overflow-hidden flex-grow">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

              <h4 className="text-lg font-bold text-slate-400 mb-2 uppercase tracking-widest">ESTIMASI PROFIT BERSIH</h4>
              <div className="text-5xl sm:text-6xl font-black text-yellow-500 mb-12 tracking-tighter">
                {formatCurrency(results.netProfit)}
              </div>

              <div className="grid grid-cols-2 gap-8 mb-12">
                <div className="space-y-1">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Profit Margin</p>
                  <p className="text-2xl font-black text-white">{results.margin.toFixed(1)}%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">ROI Modal</p>
                  <p className="text-2xl font-black text-white">{results.roi.toFixed(1)}%</p>
                </div>
              </div>

              <div className="space-y-4 pt-8 border-t border-slate-800">
                {platform === 'shopee' ? (
                  <>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">Biaya Administrasi</span>
                      <span className="text-white font-bold">{formatCurrency(results.adminFeeAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">Biaya Layanan</span>
                      <span className="text-white font-bold">{formatCurrency(results.serviceFeeAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">Biaya Proses Pesanan</span>
                      <span className="text-white font-bold">{formatCurrency(results.fixedFeeAmount)}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-bold">Biaya Platform / Admin</span>
                    <span className="text-white font-black">{formatCurrency(results.adminFeeAmount + results.serviceFeeAmount + results.fixedFeeAmount)}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-bold">Biaya Iklan</span>
                  <span className="text-white font-black">{formatCurrency(results.marketingAmount)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-bold">Komisi Affiliate</span>
                  <span className="text-white font-black">{formatCurrency(results.affiliateAmount)}</span>
                </div>
                {results.preOrderAmount > 0 && (
                  <div className="flex justify-between items-center text-yellow-500">
                    <span className="font-bold">Biaya Pre-Order (3%)</span>
                    <span className="font-black">{formatCurrency(results.preOrderAmount)}</span>
                  </div>
                )}
                {results.promoXtraAmount > 0 && (
                  <div className="flex justify-between items-center text-orange-500">
                    <span className="font-bold">Promo Xtra (4.5%)</span>
                    <span className="font-black">{formatCurrency(results.promoXtraAmount)}</span>
                  </div>
                )}
                {results.gratisOngkirXtraAmount > 0 && (
                  <div className="flex justify-between items-center text-blue-500">
                    <span className="font-bold">Gratis Ongkir Xtra (5.5%)</span>
                    <span className="font-black">{formatCurrency(results.gratisOngkirXtraAmount)}</span>
                  </div>
                )}
                {results.komisiDinamisAmount > 0 && (
                  <div className="flex justify-between items-center text-fuchsia-500">
                    <span className="font-bold">Komisi Dinamis (5.5%)</span>
                    <span className="font-black">{formatCurrency(results.komisiDinamisAmount)}</span>
                  </div>
                )}
                {results.cashbackBonusAmount > 0 && (
                  <div className="flex justify-between items-center text-violet-500">
                    <span className="font-bold">Cashback Bonus (3.5%)</span>
                    <span className="font-black">{formatCurrency(results.cashbackBonusAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-2">
                  <span className="text-slate-400 font-bold">Total Seluruh Biaya</span>
                  <span className="text-red-400 font-black">{formatCurrency(results.totalCosts)}</span>
                </div>
              </div>

              <div className="mt-12">
                <a 
                  href="https://wa.me/628111743005?text=Halo%20Visibel%20Agency,%20saya%20sudah%20mencoba%20kalkulator%20marketplace%20dan%20ingin%20konsultasi%20lebih%20lanjut%20untuk%20optimasi%20toko%20saya."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-yellow-500 text-slate-900 py-5 rounded-2xl font-black text-center hover:bg-yellow-400 transition-all shadow-xl shadow-yellow-500/20 uppercase tracking-widest text-sm"
                >
                  Konsultasi Optimasi Profit
                </a>
              </div>
            </div>

            <div className="mt-8 bg-yellow-50 border border-yellow-100 p-6 rounded-[24px] flex items-start gap-4">
              <TrendingUp className="text-yellow-600 flex-shrink-0 mt-1" size={24} />
              <p className="text-yellow-800 text-sm font-medium leading-relaxed">
                <span className="font-bold">Tips:</span> Untuk mendapatkan profit bersih yang sehat di marketplace, usahakan margin minimal berada di angka 20-30% untuk menutupi biaya platform dan risiko retur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
