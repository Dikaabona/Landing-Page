
import React from 'react';
import { Database, Award, Layers, PieChart, LucideIcon } from 'lucide-react';

interface FeatureItem {
  title: string;
  icon: LucideIcon;
  desc: string;
}

const Features: React.FC = () => {
  const items: FeatureItem[] = [
    { title: "Berbasis Data & Performance", icon: Database, desc: "Kami tidak menebak-nebak. Semua kampanye dijalankan berdasarkan insight data performa." },
    { title: "Tim Profesional & Berpengalaman", icon: Award, desc: "Dikelola oleh pakar yang memiliki sertifikasi dan jam terbang tinggi di industri digital." },
    { title: "Strategi yang Disesuaikan", icon: Layers, desc: "Tiap brand memiliki keunikan. Kami merancang strategi khusus sesuai persona brand Anda." },
    { title: "Fokus pada Revenue & Growth", icon: PieChart, desc: "Metrik utama kami adalah ROI dan pertumbuhan bisnis Anda secara jangka panjang." }
  ];

  return (
    <section id="why-us" className="py-24 bg-slate-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-slate-400 font-bold tracking-widest uppercase text-xs mb-4">KENAPA PILIH VISIBEL?</h2>
          <h3 className="text-3xl sm:text-5xl font-[900] text-slate-900 leading-tight">Alasan Mengapa Brand Mempercayai Kami</h3>
        </div>
        
        {/* Updated grid: grid-cols-2 for mobile to make them "sejajar" */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 max-w-7xl mx-auto">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="group text-center p-4 sm:p-8 rounded-[24px] sm:rounded-[32px] border border-slate-100 bg-white hover:shadow-xl transition-all duration-300 flex flex-col items-center h-full">
                <div className="w-10 h-10 sm:w-16 sm:h-16 bg-yellow-100 text-yellow-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 transition-colors group-hover:bg-yellow-500 group-hover:text-slate-900">
                  <Icon className="w-5 h-5 sm:w-8 sm:h-8" />
                </div>
                <h4 className="text-[12px] sm:text-lg font-[800] text-slate-900 mb-2 sm:mb-3 leading-tight">{item.title}</h4>
                <p className="text-slate-50 text-[10px] sm:text-sm leading-relaxed hidden">Spacer</p> {/* Accessibility hidden text for balance if needed */}
                <p className="text-slate-500 text-[10px] sm:text-sm leading-relaxed line-clamp-3 sm:line-clamp-none">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
