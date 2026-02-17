
import React from 'react';
import { ChevronDown, TrendingUp, Users, DollarSign } from 'lucide-react';

const AdsPerformance: React.FC = () => {
  return (
    <section className="relative z-20 py-24 px-4 bg-slate-50/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          {/* Section Title */}
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400">Our Performance in 2025</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {/* Ad Spending Card */}
          <div className="relative group overflow-hidden bg-white rounded-[40px] p-8 xl:p-10 border border-slate-100 shadow-[0_30px_70px_rgba(0,0,0,0.06)] transition-all duration-700 hover:shadow-[0_40px_80px_rgba(245,158,11,0.12)] hover:-translate-y-2">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 blur-[60px] rounded-full -mr-20 -mt-20 group-hover:bg-yellow-400/15 transition-colors duration-700"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center text-slate-400 font-extrabold text-[10px] tracking-[0.2em] uppercase">
                  <div className="w-8 h-8 bg-yellow-50 text-yellow-600 rounded-lg flex items-center justify-center mr-3 group-hover:bg-yellow-500 group-hover:text-white transition-all">
                    <TrendingUp size={16} />
                  </div>
                  <span>Ad Spending</span>
                </div>
                <ChevronDown size={14} className="text-slate-300 opacity-50 group-hover:text-yellow-500 transition-colors" />
              </div>
              
              <div className="flex items-center">
                <span className="text-yellow-500 font-black text-xl sm:text-2xl mr-2 self-center mt-1">Rp</span>
                <span className="text-3xl sm:text-[42px] xl:text-[48px] font-[1000] text-slate-900 tracking-tighter leading-none group-hover:scale-[1.02] transition-transform duration-500 origin-left flex items-center">
                  750 Mio <span className="text-yellow-500 ml-2 text-4xl sm:text-5xl">+</span>
                </span>
              </div>
            </div>
          </div>

          {/* Total Impression Card */}
          <div className="relative group overflow-hidden bg-white rounded-[40px] p-8 xl:p-10 border border-slate-100 shadow-[0_30px_70px_rgba(0,0,0,0.06)] transition-all duration-700 hover:shadow-[0_40px_80px_rgba(15,23,42,0.08)] hover:-translate-y-2">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100/50 blur-[60px] rounded-full -mr-20 -mt-20 group-hover:bg-slate-200/50 transition-colors duration-700"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center text-slate-400 font-extrabold text-[10px] tracking-[0.2em] uppercase">
                  <div className="w-8 h-8 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center mr-3 group-hover:bg-slate-900 group-hover:text-white transition-all">
                    <Users size={16} />
                  </div>
                  <span>Total Impression</span>
                </div>
                <ChevronDown size={14} className="text-slate-300 opacity-50 group-hover:text-slate-900 transition-colors" />
              </div>
              
              <div className="flex items-center">
                <span className="text-3xl sm:text-[42px] xl:text-[48px] font-[1000] text-slate-900 tracking-tighter leading-none group-hover:scale-[1.02] transition-transform duration-500 origin-left flex items-center">
                  87 Mio <span className="text-slate-300 ml-2 text-4xl sm:text-5xl">+</span>
                </span>
              </div>
            </div>
          </div>

          {/* Revenue All Brand Card */}
          <div className="relative group overflow-hidden bg-white rounded-[40px] p-8 xl:p-10 border border-slate-100 shadow-[0_30px_70px_rgba(0,0,0,0.06)] transition-all duration-700 hover:shadow-[0_40px_80px_rgba(16,185,129,0.12)] hover:-translate-y-2">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/10 blur-[60px] rounded-full -mr-20 -mt-20 group-hover:bg-emerald-400/15 transition-colors duration-700"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center text-slate-400 font-extrabold text-[10px] tracking-[0.2em] uppercase">
                  <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center mr-3 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                    <DollarSign size={16} />
                  </div>
                  <span>Revenue All Brand on Ads</span>
                </div>
                <ChevronDown size={14} className="text-slate-300 opacity-50 group-hover:text-emerald-500 transition-colors" />
              </div>
              
              <div className="flex items-center">
                <span className="text-emerald-500 font-black text-xl sm:text-2xl mr-2 self-center mt-1">Rp</span>
                <span className="text-3xl sm:text-[42px] xl:text-[48px] font-[1000] text-slate-900 tracking-tighter leading-none group-hover:scale-[1.02] transition-transform duration-500 origin-left flex items-center">
                  10 Bn <span className="text-emerald-500 ml-2 text-4xl sm:text-5xl">+</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdsPerformance;
