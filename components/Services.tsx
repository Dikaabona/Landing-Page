
import React from 'react';
import { Video, Megaphone, Share2, BarChart3, CheckCircle2 } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, features, icon }) => (
  <div className="bg-white p-4 sm:p-8 rounded-[20px] sm:rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 group flex flex-col h-full text-left">
    <div className="w-9 h-9 sm:w-12 sm:h-12 bg-yellow-50 text-yellow-600 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-yellow-500 group-hover:text-slate-900 transition-colors">
      {/* Responsive icon size */}
      <div className="sm:hidden">
        {React.cloneElement(icon as React.ReactElement<{ size?: number }>, { size: 18 })}
      </div>
      <div className="hidden sm:block">
        {React.cloneElement(icon as React.ReactElement<{ size?: number }>, { size: 24 })}
      </div>
    </div>
    <h3 className="text-[13px] sm:text-2xl font-extrabold text-slate-900 mb-2 sm:mb-3 leading-tight tracking-tight">{title}</h3>
    <p className="text-slate-500 mb-4 text-[10px] sm:text-sm leading-relaxed">
      {description}
    </p>
    <ul className="space-y-2 sm:space-y-3 mt-auto">
      {features.map((feature, idx) => (
         <li key={idx} className="flex items-start text-slate-700 font-semibold text-[9px] sm:text-xs leading-tight">
          <CheckCircle2 className="text-yellow-500 mr-1.5 sm:mr-2 flex-shrink-0 mt-0.5" size={10} />
          <CheckCircle2 className="hidden sm:block text-yellow-500 mr-2 flex-shrink-0 mt-0.5" size={14} />
          {feature}
        </li>
      ))}
    </ul>
  </div>
);

const Services: React.FC = () => {
  const { language } = useLanguage();

  const content = {
    id: {
      badge: "LAYANAN UNGGULAN KAMI",
      title: "Solusi All-in-One Untuk Pertumbuhan Digital Anda",
      desc: "Kami menyediakan strategi end-to-end mulai dari produksi konten hingga optimasi penjualan langsung di marketplace.",
      srv1: {
        title: "Live Streaming Management",
        desc: "Maksimalkan penjualan real-time dengan live streaming profesional.",
        feats: [
          "Penyediaan host profesional",
          "Tim operator live",
          "Optimasi penjualan saat live"
        ]
      },
      srv2: {
        title: "Short Video Production",
        desc: "Buat konten yang tidak hanya viral, tapi juga menjual produk Anda.",
        feats: [
          "Konsep & scripting",
          "Shooting & editing",
          "Konten TikTok & Reels",
          "Konten viral & selling"
        ]
      },
      srv3: {
        title: "Social Media Management",
        desc: "Jaga kehadiran brand Anda tetap aktif dan profesional setiap hari.",
        feats: [
          "Perencanaan konten bulanan",
          "Posting & optimasi",
          "Report performa berkala",
          "Growth strategy"
        ]
      },
      srv4: {
        title: "TikTok Ads Management",
        desc: "Skalakan bisnis Anda dengan iklan yang memiliki ROI tinggi.",
        feats: [
          "Setup & scaling campaign",
          "Optimasi Spark Ads",
          "Analisis ROI & Target",
          "Reporting data transparan"
        ]
      }
    },
    en: {
      badge: "OUR FEATURED SERVICES",
      title: "All-in-One Solutions For Your Digital Growth",
      desc: "We provide end-to-end strategies from content production to direct sales optimization on marketplaces.",
      srv1: {
        title: "Live Streaming Management",
        desc: "Maximize real-time sales with professional live streaming.",
        feats: [
          "Professional hosts provided",
          "Live operator team",
          "Sales optimization during live streams"
        ]
      },
      srv2: {
        title: "Short Video Production",
        desc: "Create content that is not only viral, but also sells your products.",
        feats: [
          "Concept & scripting",
          "Shooting & editing",
          "TikTok & Reels content",
          "Viral & selling content"
        ]
      },
      srv3: {
        title: "Social Media Management",
        desc: "Keep your brand presence active and professional every day.",
        feats: [
          "Monthly content planning",
          "Posting & optimization",
          "Periodic performance reports",
          "Growth strategy"
        ]
      },
      srv4: {
        title: "TikTok Ads Management",
        desc: "Scale your business with high-ROI advertisements.",
        feats: [
          "Campaign setup & scaling",
          "Spark Ads optimization",
          "ROI & Target analysis",
          "Transparent data reporting"
        ]
      }
    }
  };

  const current = content[language];

  return (
    <section id="services" className="pt-8 pb-24 bg-slate-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-yellow-500 font-bold tracking-widest uppercase text-sm mb-4">{current.badge}</h2>
          <h3 className="text-[24px] sm:text-4xl md:text-5xl font-[900] text-slate-900 mb-6 sm:mb-8 leading-tight px-4">{current.title}</h3>
          <p className="text-sm sm:text-lg md:text-xl text-slate-500 leading-relaxed max-w-3xl mx-auto px-4">
            {current.desc}
          </p>
        </div>
        
        {/* Updated grid: grid-cols-2 for mobile to make them "sejajar" */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 max-w-7xl mx-auto">
          <ServiceCard 
            icon={<Video />}
            title={current.srv1.title}
            description={current.srv1.desc}
            features={current.srv1.feats}
          />
          <ServiceCard 
            icon={<Megaphone />}
            title={current.srv2.title}
            description={current.srv2.desc}
            features={current.srv2.feats}
          />
          <ServiceCard 
            icon={<Share2 />}
            title={current.srv3.title}
            description={current.srv3.desc}
            features={current.srv3.feats}
          />
          <ServiceCard 
            icon={<BarChart3 />}
            title={current.srv4.title}
            description={current.srv4.desc}
            features={current.srv4.feats}
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
