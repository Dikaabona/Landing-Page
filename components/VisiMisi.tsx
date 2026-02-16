
import React from 'react';
import { Eye, ShieldCheck, Zap, Heart } from 'lucide-react';

const VisiMisi: React.FC = () => {
  const missions = [
    { title: "Strategi Berbasis Data", desc: "Membantu brand berkembang dengan strategi yang divalidasi oleh data nyata.", icon: <Zap /> },
    { title: "Transparansi Layanan", desc: "Memberikan layanan profesional, jujur, dan transparan dalam setiap laporan.", icon: <ShieldCheck /> },
    { title: "Revenue Focused", desc: "Mengoptimalkan live streaming & performance ads untuk meningkatkan revenue.", icon: <TrendingUp /> },
    { title: "Long-term Partner", desc: "Menjadi partner jangka panjang bagi setiap klien dalam perjalanan bisnis mereka.", icon: <Heart /> }
  ];

  function TrendingUp() { return <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>; }

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-[40px] p-10 lg:p-20 relative overflow-hidden">
          {/* Accent decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 blur-[100px] rounded-full -mr-32 -mt-32"></div>
          
          <div className="grid lg:grid-cols-2 gap-16 relative z-10">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-yellow-500 text-slate-900 rounded-full flex items-center justify-center">
                  <Eye size={24} />
                </div>
                <h3 className="text-yellow-500 font-bold tracking-widest uppercase text-sm">Visi & Misi Kami</h3>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-8 leading-tight">
                Menjadi Digital Growth Partner Terpercaya Bagi Brand Indonesia.
              </h2>
              <div className="p-8 bg-slate-800/50 rounded-3xl border border-slate-700">
                <p className="text-xl text-slate-300 italic">
                  "Menjadi digital growth partner terpercaya bagi brand Indonesia dalam mengoptimalkan potensi penjualan melalui platform digital."
                </p>
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {missions.map((m, i) => (
                <div key={i} className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50 hover:bg-slate-800 transition-colors">
                  <div className="text-yellow-500 mb-4">{m.icon}</div>
                  <h4 className="text-white font-bold mb-2">{m.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisiMisi;