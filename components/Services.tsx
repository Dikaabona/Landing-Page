
import React from 'react';
import { Video, Megaphone, Share2, BarChart3, CheckCircle2 } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, features, icon }) => (
  <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 group flex flex-col h-full text-left">
    <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-500 group-hover:text-slate-900 transition-colors">
      {React.cloneElement(icon as React.ReactElement, { size: 24 })}
    </div>
    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-500 mb-4 text-sm leading-relaxed">
      {description}
    </p>
    <ul className="space-y-3 mt-1">
      {features.map((feature, idx) => (
        <li key={idx} className="flex items-start text-slate-700 font-semibold text-xs leading-tight">
          <CheckCircle2 className="text-yellow-500 mr-2 flex-shrink-0 mt-0.5" size={14} />
          {feature}
        </li>
      ))}
    </ul>
  </div>
);

const Services: React.FC = () => {
  return (
    <section id="services" className="pt-8 pb-24 bg-slate-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-yellow-500 font-bold tracking-widest uppercase text-sm mb-4">LAYANAN UNGGULAN KAMI</h2>
          <h3 className="text-4xl sm:text-5xl font-[900] text-slate-900 mb-8 leading-tight px-4">Solusi All-in-One Untuk Pertumbuhan Digital Anda</h3>
          <p className="text-xl text-slate-500 leading-relaxed max-w-3xl mx-auto">
            Kami menyediakan strategi end-to-end mulai dari produksi konten hingga optimasi penjualan langsung di marketplace.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          <ServiceCard 
            icon={<Video />}
            title="Live Streaming Management"
            description="Maksimalkan penjualan real-time with live streaming profesional."
            features={[
              "Penyediaan host profesional",
              "Tim operator live",
              "Optimasi penjualan saat live"
            ]}
          />
          <ServiceCard 
            icon={<Megaphone />}
            title="Short Video Production"
            description="Buat konten yang tidak hanya viral, tapi juga menjual produk Anda."
            features={[
              "Konsep & scripting",
              "Shooting & editing",
              "Konten TikTok & Reels",
              "Konten viral & selling"
            ]}
          />
          <ServiceCard 
            icon={<Share2 />}
            title="Social Media Management"
            description="Jaga kehadiran brand Anda tetap aktif dan profesional setiap hari."
            features={[
              "Perencanaan konten bulanan",
              "Posting & optimasi",
              "Report performa berkala",
              "Growth strategy"
            ]}
          />
          <ServiceCard 
            icon={<BarChart3 />}
            title="TikTok Ads Management"
            description="Skalakan bisnis Anda dengan iklan yang memiliki ROI tinggi."
            features={[
              "Setup & scaling campaign",
              "Optimasi Spark Ads",
              "Analisis ROI & Target",
              "Reporting data transparan"
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
