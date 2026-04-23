
import React, { useState, useEffect } from 'react';
import { Calculator as CalcIcon, TrendingUp, DollarSign, Percent } from 'lucide-react';

const Calculator: React.FC = () => {
  const [sellingPrice, setSellingPrice] = useState<number>(0);
  const [cogs, setCogs] = useState<number>(0);
  const [adminFeePercent, setAdminFeePercent] = useState<number>(6);
  const [fixedFee, setFixedFee] = useState<number>(1000);
  const [marketingPercent, setMarketingPercent] = useState<number>(0);
  const [otherCosts, setOtherCosts] = useState<number>(2000);

  const [results, setResults] = useState({
    adminFeeAmount: 0,
    marketingAmount: 0,
    totalCosts: 0,
    netProfit: 0,
    margin: 0,
    roi: 0
  });

  useEffect(() => {
    const adminFeeAmount = (sellingPrice * adminFeePercent) / 100 + fixedFee;
    const marketingAmount = (sellingPrice * marketingPercent) / 100;
    const totalCosts = cogs + adminFeeAmount + marketingAmount + otherCosts;
    const netProfit = sellingPrice - totalCosts;
    const margin = sellingPrice > 0 ? (netProfit / sellingPrice) * 100 : 0;
    const roi = cogs > 0 ? (netProfit / cogs) * 100 : 0;

    setResults({
      adminFeeAmount,
      marketingAmount,
      totalCosts,
      netProfit,
      margin,
      roi
    });
  }, [sellingPrice, cogs, adminFeePercent, fixedFee, marketingPercent, otherCosts]);

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

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Harga Jual (Rp)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rp</span>
                  <input 
                    type="text"
                    value={formatInput(sellingPrice)}
                    onChange={(e) => handleInputChange(e.target.value, setSellingPrice)}
                    placeholder="Contoh: 150.000"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-200 focus:border-yellow-500 focus:ring-0 transition-all font-bold text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Modal Produk / HPP (Rp)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rp</span>
                  <input 
                    type="text"
                    value={formatInput(cogs)}
                    onChange={(e) => handleInputChange(e.target.value, setCogs)}
                    placeholder="Contoh: 85.000"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-200 focus:border-yellow-500 focus:ring-0 transition-all font-bold text-slate-900"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Biaya Admin (%)</label>
                  <div className="relative">
                    <input 
                      type="number"
                      step="0.1"
                      value={adminFeePercent || ''}
                      onChange={(e) => setAdminFeePercent(Number(e.target.value))}
                      className="w-full pl-4 pr-12 py-4 rounded-2xl border-2 border-slate-200 focus:border-yellow-500 focus:ring-0 transition-all font-bold text-slate-900"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Fixed Fee / Order (Rp)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rp</span>
                    <input 
                      type="text"
                      value={formatInput(fixedFee)}
                      onChange={(e) => handleInputChange(e.target.value, setFixedFee)}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-200 focus:border-yellow-500 focus:ring-0 transition-all font-bold text-slate-900"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Biaya Marketing / Ads (%)</label>
                <div className="relative">
                  <input 
                    type="number"
                    step="0.1"
                    value={marketingPercent || ''}
                    onChange={(e) => setMarketingPercent(Number(e.target.value))}
                    className="w-full pl-4 pr-12 py-4 rounded-2xl border-2 border-slate-200 focus:border-yellow-500 focus:ring-0 transition-all font-bold text-slate-900"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Biaya Lainnya (Packing/Operasional) (Rp)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rp</span>
                  <input 
                    type="text"
                    value={formatInput(otherCosts)}
                    onChange={(e) => handleInputChange(e.target.value, setOtherCosts)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-200 focus:border-yellow-500 focus:ring-0 transition-all font-bold text-slate-900"
                  />
                </div>
              </div>

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

              <div className="space-y-6 pt-8 border-t border-slate-800">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-bold">Biaya Admin Marketplace</span>
                  <span className="text-white font-black">{formatCurrency(results.adminFeeAmount)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-bold">Biaya Marketing/Ads</span>
                  <span className="text-white font-black">{formatCurrency(results.marketingAmount)}</span>
                </div>
                <div className="flex justify-between items-center">
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
