
import React from 'react';
import { ChevronDown, TrendingUp, Users } from 'lucide-react';

const AdsPerformance: React.FC = () => {
  return (
    <section className="relative z-20 -mt-10 mb-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-slate-400">Our Performance</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Biaya Metric Card */}
          <div className="relative group overflow-hidden bg-white rounded-[40px] p-10 border border-slate-100 shadow-[0_30px_70px_rgba(0,0,0,0.06)] transition-all duration-700 hover:shadow-[0_40px_80px_rgba(245,158,11,0.12)] hover:-translate-y-2">
            {/* Soft Gradient Accent */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-400/10 blur-[80px] rounded-full -mr-16 -mt-16 group-hover:bg-yellow-400/20 transition-colors duration-700"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center text-slate-400 font-extrabold text-[10px] sm:text-xs tracking-[0.2em] uppercase">
                  <div className="w-8 h-8 bg-yellow-100 text-yellow-600 rounded-lg flex items-center justify-center mr-3 group-hover:bg-yellow-500 group-hover:text-white transition-all">
                    <TrendingUp size={16} />
                  </div>
                  <span>Biaya Iklan</span>
                </div>
                <ChevronDown size={14} className="text-slate-300 opacity-50 group-hover:text-yellow-500 transition-colors" />
              </div>
              
              <div className="flex items-baseline">
                <span className="text-5xl sm:text-[64px] font-[1000] text-slate-900 tracking-tighter leading-none group-hover:scale-[1.02] transition-transform duration-500 origin-left">
                  <span className="text-yellow-500 mr-2 text-3xl sm:text-4xl">Rp</span>
                  750 Mio <span className="text-yellow-500">+</span>
                </span>
              </div>
            </div>
          </div>

          {/* Impresi Metric Card */}
          <div className="relative group overflow-hidden bg-white rounded-[40px] p-10 border border-slate-100 shadow-[0_30px_70px_rgba(0,0,0,0.06)] transition-all duration-700 hover:shadow-[0_40px_80px_rgba(15,23,42,0.08)] hover:-translate-y-2">
            {/* Soft Gradient Accent */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-slate-100 blur-[80px] rounded-full -mr-16 -mt-16 group-hover:bg-slate-200 transition-colors duration-700"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center text-slate-400 font-extrabold text-[10px] sm:text-xs tracking-[0.2em] uppercase">
                  <div className="w-8 h-8 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center mr-3 group-hover:bg-slate-900 group-hover:text-white transition-all">
                    <Users size={16} />
                  </div>
                  <span>Total Impresi</span>
                </div>
                <ChevronDown size={14} className="text-slate-300 opacity-50 group-hover:text-slate-900 transition-colors" />
              </div>
              
              <div className="flex items-baseline">
                <span className="text-5xl sm:text-[64px] font-[1000] text-slate-900 tracking-tighter leading-none group-hover:scale-[1.02] transition-transform duration-500 origin-left">
                  87 Mio <span className="text-slate-300">+</span>
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
