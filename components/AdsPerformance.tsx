
import React from 'react';
import { ChevronDown, TrendingUp, Users, DollarSign, UserCheck } from 'lucide-react';

const AdsPerformance: React.FC = () => {
  return (
    <section className="relative z-20 pt-0 pb-24 px-4 bg-slate-50/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          {/* Section Title */}
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400">Our Performance in 2025</h2>
        </div>

        {/* Updated grid: grid-cols-2 for mobile to make them "sejajar" */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 xl:gap-8">
          {/* Ad Spending Card */}
          <div className="relative group overflow-hidden bg-white rounded-[24px] sm:rounded-[40px] p-5 sm:p-8 xl:p-10 border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] sm:shadow-[0_30px_70px_rgba(0,0,0,0.06)] transition-all duration-700 hover:shadow-[0_40px_80px_rgba(245,158,11,0.18)] hover:-translate-y-2 sm:hover:-translate-y-3 hover-shine">
            <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-yellow-400/10 blur-[40px] sm:blur-[60px] rounded-full -mr-10 -mt-10 sm:-mr-20 sm:-mt-20 group-hover:bg-yellow-400/25 group-hover:scale-110 transition-all duration-1000"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6 sm:mb-10">
                <div className="flex items-center text-slate-400 font-extrabold text-[8px] sm:text-[10px] tracking-[0.1em] sm:tracking-[0.2em] uppercase">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-50 text-yellow-600 rounded-lg sm:rounded-xl flex items-center justify-center mr-2 sm:mr-3 group-hover:bg-yellow-500 group-hover:text-white transition-all duration-500 group-hover:rotate-12">
                    <TrendingUp size={14} className="sm:hidden" />
                    <TrendingUp size={18} className="hidden sm:block" />
                  </div>
                  <span className="group-hover:text-slate-900 transition-colors duration-300">Ad Spending</span>
                </div>
                <ChevronDown size={12} className="text-slate-300 opacity-50 group-hover:text-yellow-500 group-hover:translate-y-1 transition-all duration-300 sm:block hidden" />
              </div>
              
              <div className="flex items-center group-hover:animate-float">
                <span className="text-yellow-500 font-black text-sm sm:text-lg mr-1 sm:mr-2 self-center mt-0.5 sm:mt-1">Rp</span>
                <span className="text-lg sm:text-[32px] xl:text-[36px] font-[1000] text-slate-900 tracking-tighter leading-none transition-all duration-500 origin-left flex items-center group-hover:scale-[1.05]">
                  750 Mio <span className="text-yellow-500 ml-1 sm:ml-2 text-xl sm:text-3xl group-hover:scale-110 transition-transform">+</span>
                </span>
              </div>
            </div>
          </div>

          {/* Total Impression Card */}
          <div className="relative group overflow-hidden bg-white rounded-[24px] sm:rounded-[40px] p-5 sm:p-8 xl:p-10 border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] sm:shadow-[0_30px_70px_rgba(0,0,0,0.06)] transition-all duration-700 hover:shadow-[0_40px_80px_rgba(15,23,42,0.12)] hover:-translate-y-2 sm:hover:-translate-y-3 hover-shine">
            <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-slate-100/50 blur-[40px] sm:blur-[60px] rounded-full -mr-10 -mt-10 sm:-mr-20 sm:-mt-20 group-hover:bg-slate-300/50 group-hover:scale-110 transition-all duration-1000"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6 sm:mb-10">
                <div className="flex items-center text-slate-400 font-extrabold text-[8px] sm:text-[10px] tracking-[0.1em] sm:tracking-[0.2em] uppercase">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-100 text-slate-600 rounded-lg sm:rounded-xl flex items-center justify-center mr-2 sm:mr-3 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500 group-hover:-rotate-12">
                    <Users size={14} className="sm:hidden" />
                    <Users size={18} className="hidden sm:block" />
                  </div>
                  <span className="group-hover:text-slate-900 transition-colors duration-300">Total Impression</span>
                </div>
                <ChevronDown size={12} className="text-slate-300 opacity-50 group-hover:text-slate-900 group-hover:translate-y-1 transition-all duration-300 sm:block hidden" />
              </div>
              
              <div className="flex items-center group-hover:animate-float">
                <span className="text-lg sm:text-[32px] xl:text-[36px] font-[1000] text-slate-900 tracking-tighter leading-none transition-all duration-500 origin-left flex items-center group-hover:scale-[1.05]">
                  87 Mio <span className="text-slate-300 ml-1 sm:ml-2 text-xl sm:text-3xl group-hover:text-slate-500 group-hover:scale-110 transition-all">+</span>
                </span>
              </div>
            </div>
          </div>

          {/* Revenue All Brand Card */}
          <div className="relative group overflow-hidden bg-white rounded-[24px] sm:rounded-[40px] p-5 sm:p-8 xl:p-10 border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] sm:shadow-[0_30px_70px_rgba(0,0,0,0.06)] transition-all duration-700 hover:shadow-[0_40px_80px_rgba(16,185,129,0.18)] hover:-translate-y-2 sm:hover:-translate-y-3 hover-shine">
            <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-emerald-400/10 blur-[40px] sm:blur-[60px] rounded-full -mr-10 -mt-10 sm:-mr-20 sm:-mt-20 group-hover:bg-emerald-400/25 group-hover:scale-110 transition-all duration-1000"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6 sm:mb-10">
                <div className="flex items-center text-slate-400 font-extrabold text-[8px] sm:text-[10px] tracking-[0.1em] sm:tracking-[0.2em] uppercase">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-50 text-emerald-600 rounded-lg sm:rounded-xl flex items-center justify-center mr-2 sm:mr-3 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 group-hover:rotate-12">
                    <DollarSign size={14} className="sm:hidden" />
                    <DollarSign size={18} className="hidden sm:block" />
                  </div>
                  <span className="group-hover:text-slate-900 transition-colors duration-300">Revenue Ads</span>
                </div>
                <ChevronDown size={12} className="text-slate-300 opacity-50 group-hover:text-emerald-500 group-hover:translate-y-1 transition-all duration-300 sm:block hidden" />
              </div>
              
              <div className="flex items-center group-hover:animate-float">
                <span className="text-emerald-500 font-black text-sm sm:text-lg mr-1 sm:mr-2 self-center mt-0.5 sm:mt-1">Rp</span>
                <span className="text-lg sm:text-[32px] xl:text-[36px] font-[1000] text-slate-900 tracking-tighter leading-none transition-all duration-500 origin-left flex items-center group-hover:scale-[1.05]">
                  10 Bn <span className="text-emerald-500 ml-1 sm:ml-2 text-xl sm:text-3xl group-hover:scale-110 transition-transform">+</span>
                </span>
              </div>
            </div>
          </div>

          {/* Total Creator Card */}
          <div className="relative group overflow-hidden bg-white rounded-[24px] sm:rounded-[40px] p-5 sm:p-8 xl:p-10 border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] sm:shadow-[0_30px_70px_rgba(0,0,0,0.06)] transition-all duration-700 hover:shadow-[0_40px_80px_rgba(139,92,246,0.18)] hover:-translate-y-2 sm:hover:-translate-y-3 hover-shine">
            <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-purple-400/10 blur-[40px] sm:blur-[60px] rounded-full -mr-10 -mt-10 sm:-mr-20 sm:-mt-20 group-hover:bg-purple-400/25 group-hover:scale-110 transition-all duration-1000"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6 sm:mb-10">
                <div className="flex items-center text-slate-400 font-extrabold text-[8px] sm:text-[10px] tracking-[0.1em] sm:tracking-[0.2em] uppercase">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-50 text-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center mr-2 sm:mr-3 group-hover:bg-purple-500 group-hover:text-white transition-all duration-500 group-hover:rotate-12">
                    <UserCheck size={14} className="sm:hidden" />
                    <UserCheck size={18} className="hidden sm:block" />
                  </div>
                  <span className="group-hover:text-slate-900 transition-colors duration-300">Creator</span>
                </div>
                <ChevronDown size={12} className="text-slate-300 opacity-50 group-hover:text-purple-500 group-hover:translate-y-1 transition-all duration-300 sm:block hidden" />
              </div>
              
              <div className="flex flex-col group-hover:animate-float">
                <div className="flex items-center">
                  <span className="text-lg sm:text-[32px] xl:text-[36px] font-[1000] text-slate-900 tracking-tighter leading-none transition-all duration-500 origin-left flex items-center group-hover:scale-[1.05]">
                    500 <span className="text-purple-500 ml-1 sm:ml-2 text-xl sm:text-3xl group-hover:scale-110 transition-transform">++</span>
                  </span>
                </div>
                <p className="text-slate-400 font-bold text-[8px] sm:text-sm mt-1 sm:mt-2 tracking-wide uppercase">Nano & Mikro Creator</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdsPerformance;
