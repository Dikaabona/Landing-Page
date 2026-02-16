
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
          <h3 className="text-4xl sm:text-5xl font-[900] text-slate-900 leading-tight">Alasan Mengapa Brand Mempercayai Kami</h3>
        </div>
        
        {/* Updated grid to 4 columns on desktop to satisfy 'kecilkan ukuran ini dan buat sejajar' */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="group text-center p-8 rounded-[32px] border border-slate-100 bg-white hover:shadow-xl transition-all duration-300 flex flex-col items-center">
                <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center mb-6 transition-colors group-hover:bg-yellow-500 group-hover:text-slate-900">
                  <Icon size={32} />
                </div>
                <h4 className="text-lg font-[800] text-slate-900 mb-3 leading-tight">{item.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
