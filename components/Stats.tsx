
import React from 'react';

const Stats: React.FC = () => {
  return (
    <section className="py-20 bg-[#f9f7f4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          
          {/* 800+ Clients Growing */}
          <div className="lg:col-span-6 bg-white border-[1.5px] border-slate-900 rounded-2xl p-8 relative overflow-hidden flex flex-col justify-center min-h-[200px]">
            <div className="absolute right-0 top-0 bottom-0 w-3 bg-[#8b85a3]"></div>
            <h3 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">800+</h3>
            <p className="text-xl font-medium text-slate-600">Clients Growing</p>
          </div>

          {/* 140+ Teams of Professional */}
          <div className="lg:col-span-6 bg-white border-[1.5px] border-slate-900 rounded-2xl p-8 relative overflow-hidden flex flex-col justify-center min-h-[200px]">
            <div className="absolute right-0 top-0 bottom-0 w-3 bg-[#fcc677]"></div>
            <h3 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">140+</h3>
            <p className="text-xl font-medium text-slate-600">Teams of Professional</p>
          </div>

          {/* 50+ Meta & Google Certified Professional */}
          <div className="lg:col-span-5 bg-white border-[1.5px] border-slate-900 rounded-2xl p-8 relative overflow-hidden flex flex-col justify-center min-h-[240px]">
            <div className="absolute right-0 top-0 bottom-0 w-3 bg-[#87a9e3]"></div>
            <h3 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">50+</h3>
            <p className="text-xl font-medium text-slate-600 leading-tight">Meta & Google<br />Certified Professional</p>
          </div>

          {/* 400 Mio+ Online Engagement Performance */}
          <div className="lg:col-span-7 bg-white border-[1.5px] border-slate-900 rounded-2xl p-8 relative overflow-hidden flex flex-col justify-center min-h-[240px]">
            <div className="absolute right-0 top-0 bottom-0 w-3 bg-[#6fc7ba]"></div>
            <h3 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">400 Mio+</h3>
            <p className="text-xl font-medium text-slate-600 leading-tight">Online Engagement<br />Performance</p>
          </div>

          {/* USD 15 Mio+ Advertising Spend */}
          <div className="lg:col-span-8 bg-white border-[1.5px] border-slate-900 rounded-2xl p-10 relative overflow-hidden flex flex-col justify-center min-h-[240px]">
            <div className="absolute right-0 top-0 bottom-0 w-3 bg-[#fa9189]"></div>
            <h3 className="text-6xl font-black text-slate-900 mb-6 tracking-tight">USD 15 Mio+</h3>
            <p className="text-2xl font-medium text-slate-600">Advertising Spend</p>
          </div>

          {/* +And Many More */}
          <div className="lg:col-span-4 bg-[#ece6db] border-[1.5px] border-slate-900 rounded-2xl p-8 flex flex-col justify-center items-center text-center min-h-[240px]">
            <h3 className="text-3xl font-black text-slate-900 leading-tight">
              +And<br />Many More
            </h3>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Stats;
