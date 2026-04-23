
import React, { useState, useEffect } from 'react';
import { Calculator as CalcIcon, AlertCircle, ArrowRightLeft, TrendingDown, BadgePercent } from 'lucide-react';

const AdsCalculator: React.FC = () => {
  const [dashboardSpend, setDashboardSpend] = useState<number>(0);
  const [dashboardSales, setDashboardSales] = useState<number>(0);
  const [dashboardOrders, setDashboardOrders] = useState<number>(0);

  const [results, setResults] = useState({
    realSpend: 0,
    ppnAmount: 0,
    dashboardRoi: 0,
    realRoi: 0,
    dashboardCpo: 0,
    realCpo: 0,
    roiGap: 0,
    cpoGap: 0
  });

  useEffect(() => {
    const ppnRate = 0.11;
    const realSpend = dashboardSpend * (1 + ppnRate);
    const ppnAmount = dashboardSpend * ppnRate;
    
    const dashboardRoi = dashboardSpend > 0 ? dashboardSales / dashboardSpend : 0;
    const realRoi = realSpend > 0 ? dashboardSales / realSpend : 0;
    
    const dashboardCpo = dashboardOrders > 0 ? dashboardSpend / dashboardOrders : 0;
    const realCpo = dashboardOrders > 0 ? realSpend / dashboardOrders : 0;

    setResults({
      realSpend,
      ppnAmount,
      dashboardRoi,
      realRoi,
      dashboardCpo,
      realCpo,
      roiGap: dashboardRoi - realRoi,
      cpoGap: realCpo - dashboardCpo
    });
  }, [dashboardSpend, dashboardSales, dashboardOrders]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(val);
  };

  const formatInput = (val: number | string) => {
    if (!val && val !== 0) return '';
    const num = val.toString().replace(/[^0-9]/g, '');
    return new Intl.NumberFormat('id-ID').format(Number(num));
  };

  const handleInputChange = (val: string, setter: (n: number) => void) => {
    const num = val.replace(/[^0-9]/g, '');
    setter(Number(num));
  };

  return (
    <section id="ads-calculator" className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-yellow-600 font-bold tracking-widest uppercase text-sm mb-4">ADVERTISING TOOLS</h2>
          <h3 className="text-3xl sm:text-5xl font-[900] text-slate-900 leading-tight">Kalkulator Real Ads Spend (PPN 11%)</h3>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto font-medium">
            Jangan terjebak dengan data dashboard marketplace. Hitung biaya iklan sebenarnya setelah pajak top-up PPN 11% untuk mengetahui profitabilitas yang jujur.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Input Section */}
          <div className="bg-white p-6 sm:p-10 rounded-[32px] border-2 border-slate-100 shadow-xl shadow-slate-200/40">
            <h4 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
              <CalcIcon className="text-yellow-500" size={24} />
              Data Dashboard Marketplace
            </h4>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Total Spend / Biaya Iklan (Rp)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rp</span>
                  <input 
                    type="text"
                    value={formatInput(dashboardSpend)}
                    onChange={(e) => handleInputChange(e.target.value, setDashboardSpend)}
                    placeholder="Masukkan spend di dashboard"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-200 focus:border-yellow-500 focus:ring-0 transition-all font-bold text-slate-900"
                  />
                </div>
                <p className="mt-2 text-xs text-slate-400 flex items-center gap-1">
                  <AlertCircle size={12} /> Data yang terlihat di dashboard iklan Shopee/Lazada/Tokopedia
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Total Penjualan (Rp)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rp</span>
                    <input 
                      type="text"
                      value={formatInput(dashboardSales)}
                      onChange={(e) => handleInputChange(e.target.value, setDashboardSales)}
                      placeholder="Total Omzet Iklan"
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-200 focus:border-yellow-500 focus:ring-0 transition-all font-bold text-slate-900"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Total Pesanan (Order)</label>
                  <input 
                    type="number"
                    value={dashboardOrders || ''}
                    onChange={(e) => setDashboardOrders(Number(e.target.value))}
                    placeholder="Jumlah order iklan"
                    className="w-full px-4 py-4 rounded-2xl border-2 border-slate-200 focus:border-yellow-500 focus:ring-0 transition-all font-bold text-slate-900"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 p-6 bg-blue-50 rounded-2xl border border-blue-100 italic text-sm text-blue-800">
              "Dashboard marketplace hanya mencatat saldo yang terpotong saat spend. Namun, untuk mendapatkan saldo tersebut, Anda telah membayar PPN 11% saat melakukan top-up saldo iklan."
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-8">
            <div className="bg-[#0f172a] text-white p-8 sm:p-12 rounded-[40px] shadow-2xl relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
              
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">REAL TOTAL SPEND (+11%)</h4>
                  <div className="text-4xl sm:text-5xl font-black text-red-400 tracking-tighter">
                    {formatCurrency(results.realSpend)}
                  </div>
                </div>
                <div className="bg-red-500/10 p-3 rounded-2xl border border-red-500/20">
                  <BadgePercent className="text-red-400" size={32} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-slate-800">
                <div className="space-y-4">
                  <p className="text-slate-500 text-xs font-bold uppercase">ROI (ROAS)</p>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <span className="text-slate-400 text-sm">Dashboard:</span>
                        <span className="text-white font-bold">{results.dashboardRoi.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-yellow-500 text-sm">Real:</span>
                        <span className="text-yellow-500 font-black text-xl">{results.realRoi.toFixed(2)}</span>
                    </div>
                    {results.roiGap > 0 && <span className="text-red-400 text-xs font-bold mt-1">Turun {results.roiGap.toFixed(2)} pts</span>}
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-slate-500 text-xs font-bold uppercase">CPO (Biaya Per Order)</p>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <span className="text-slate-400 text-sm">Dashboard:</span>
                        <span className="text-white font-bold">{formatCurrency(results.dashboardCpo)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-red-400 text-sm">Real:</span>
                        <span className="text-red-400 font-black text-xl">{formatCurrency(results.realCpo)}</span>
                    </div>
                    {results.cpoGap > 0 && <span className="text-red-400 text-xs font-bold mt-1">Naik {formatCurrency(results.cpoGap)}</span>}
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-slate-800 flex justify-between items-center">
                <span className="text-slate-400 font-bold">PPN 11% Tersembunyi</span>
                <span className="text-slate-300 font-black">{formatCurrency(results.ppnAmount)}</span>
              </div>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-100 p-8 rounded-[32px]">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-yellow-400 rounded-2xl flex-shrink-0">
                    <TrendingDown className="text-slate-900" size={24} />
                </div>
                <div>
                    <h5 className="text-lg font-black text-slate-900 uppercase tracking-tight">Kenyataan Pahit Marketing Ads</h5>
                    <p className="text-slate-700 text-sm mt-1 font-medium italic">
                        "Dashboard menunjukkan performa bagus, tapi saat tarik saldo bank, kok sisa sedikit?"
                    </p>
                </div>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-slate-900">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5 flex-shrink-0"></div>
                    <p><span className="font-bold">Dashboard Spend</span> hanya mencatat penggunaan saldo, bukan biaya yang Anda bayar ke marketplace.</p>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-900">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5 flex-shrink-0"></div>
                    <p><span className="font-bold">Real ROI</span> Anda selalu 11% lebih rendah dari yang terlihat di layar dashboard.</p>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-900">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5 flex-shrink-0"></div>
                    <p><span className="font-bold">Real CPO</span> Anda 11% lebih mahal dari yang Anda laporkan setiap minggu.</p>
                </li>
              </ul>
              <div className="mt-8">
                <a 
                  href="https://wa.me/628111743005?text=Halo%20Visibel%20Agency,%20saya%20sudah%20mencoba%20kalkulator%20ads%20dan%20ingin%20konsultasi%20mengenai%20efisiensi%20iklan%20toko%20saya%20setelah%20PPN."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-center hover:bg-slate-800 transition-all uppercase tracking-widest text-xs"
                >
                  Konsultasi Efisiensi Ads
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdsCalculator;
