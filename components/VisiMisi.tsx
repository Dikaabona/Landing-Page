
import React from 'react';
import { Eye, ShieldCheck, Zap, Heart } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const VisiMisi: React.FC = () => {
  const { language } = useLanguage();

  const content = {
    id: {
      badge: "Visi & Misi Kami",
      title: "Menjadi Digital Growth Partner Terpercaya Bagi Brand Indonesia.",
      quote: "Menjadi partner strategis brand dalam memenangkan pertumbuhan di era digital dan live commerce.",
      missions: [
        { title: "Strategi Berbasis Data", desc: "Membantu brand berkembang dengan strategi yang divalidasi oleh data nyata." },
        { title: "Transparansi Layanan", desc: "Memberikan layanan profesional, jujur, dan transparan dalam setiap laporan." },
        { title: "Revenue Focused", desc: "Mengoptimalkan live streaming & performance ads untuk meningkatkan revenue." },
        { title: "Long-term Partner", desc: "Menjadi partner jangka panjang bagi setiap klien dalam perjalanan bisnis mereka." }
      ]
    },
    en: {
      badge: "Our Vision & Mission",
      title: "Becoming the Most Trusted Digital Growth Partner for Brands.",
      quote: "To be a strategic brand partner in winning growth in the digital and live commerce era.",
      missions: [
        { title: "Data-Driven Strategy", desc: "Helping brands grow with strategies validated by real data." },
        { title: "Service Transparency", desc: "Providing professional, honest, and transparent services in every report." },
        { title: "Revenue Focused", desc: "Optimizing live streaming & performance ads to boost revenue." },
        { title: "Long-term Partner", desc: "Becoming a long-term partner for every client in their business journey." }
      ]
    }
  };

  const current = content[language];

  function TrendingUpIconMobile() { 
    return (
      <>
        <svg className="w-4 h-4 sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
        <svg className="w-6 h-6 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
      </>
    ); 
  }

  const icons = [
    <Zap size={18} className="sm:hidden" />,
    <ShieldCheck size={18} className="sm:hidden" />,
    <TrendingUpIconMobile />,
    <Heart size={18} className="sm:hidden" />
  ];

  const missions = current.missions.map((m, i) => ({
    ...m,
    icon: icons[i]
  }));

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-[40px] p-6 sm:p-10 lg:p-20 relative overflow-hidden">
          {/* Accent decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 blur-[100px] rounded-full -mr-32 -mt-32"></div>
          
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 relative z-10">
            <div className="text-left">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-500 text-slate-900 rounded-full flex items-center justify-center">
                  <Eye size={20} className="sm:hidden" />
                  <Eye size={24} className="hidden sm:block" />
                </div>
                <h3 className="text-yellow-500 font-bold tracking-widest uppercase text-[10px] sm:text-sm">{current.badge}</h3>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-6 sm:mb-8 leading-tight">
                {current.title}
              </h2>
              <div className="p-6 sm:p-8 bg-slate-800/50 rounded-2xl sm:rounded-3xl border border-slate-700">
                <p className="text-sm sm:text-xl text-slate-300 italic font-medium">
                  "{current.quote}"
                </p>
              </div>
            </div>
            
            {/* Updated grid: grid-cols-2 for mobile to make them "sejajar" */}
            <div className="grid grid-cols-2 gap-3 sm:gap-6">
              {missions.map((m, i) => (
                <div key={i} className="bg-slate-800/40 p-4 sm:p-6 rounded-2xl border border-slate-700/50 hover:bg-slate-800 transition-colors flex flex-col h-full text-left">
                  <div className="text-yellow-500 mb-3 sm:mb-4">
                    {/* Render icons correctly for mobile/desktop */}
                    {m.icon}
                    {i === 0 && <Zap size={24} className="hidden sm:block" />}
                    {i === 1 && <ShieldCheck size={24} className="hidden sm:block" />}
                    {i === 3 && <Heart size={24} className="hidden sm:block" />}
                  </div>
                  <h4 className="text-white font-bold mb-2 text-[12px] sm:text-base leading-tight">{m.title}</h4>
                  <p className="text-slate-400 text-[10px] sm:text-sm leading-relaxed line-clamp-3 sm:line-clamp-none">{m.desc}</p>
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
