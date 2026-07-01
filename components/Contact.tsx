
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Instagram } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const Contact: React.FC = () => {
  const { language } = useLanguage();
  
  const [formData, setFormData] = useState({
    nama: '',
    brand: '',
    wa: '',
    layanan: 'Live Streaming'
  });

  const waUrl = "https://wa.me/628111743005";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Halo Visibel Agency,\nNama: ${formData.nama}\nBrand: ${formData.brand}\nLayanan: ${formData.layanan}`;
    window.open(`${waUrl}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const content = {
    id: {
      badge: "Kontak Kami",
      title: "Mari Mulai Perjalanan Growth Bisnis Anda",
      formTitle: "Atau Kirim Form Konsultasi",
      nameLabel: "Nama Lengkap",
      namePlaceholder: "Contoh: Budi Santoso",
      brandLabel: "Nama Brand",
      brandPlaceholder: "Contoh: Fashionista Indo",
      waLabel: "Nomor WhatsApp",
      waPlaceholder: "Contoh: 081234567890",
      serviceLabel: "Kebutuhan Layanan",
      submitBtn: "Kirim Via WhatsApp",
      whatsappSub: "Klik untuk Chat"
    },
    en: {
      badge: "Contact Us",
      title: "Let's Start Your Business Growth Journey",
      formTitle: "Or Submit a Consultation Form",
      nameLabel: "Full Name",
      namePlaceholder: "e.g. John Doe",
      brandLabel: "Brand Name",
      brandPlaceholder: "e.g. Fashionista Store",
      waLabel: "WhatsApp Number",
      waPlaceholder: "e.g. +6281234567890",
      serviceLabel: "Service Needs",
      submitBtn: "Send via WhatsApp",
      whatsappSub: "Click to Chat"
    }
  };

  const current = content[language];

  return (
    <section id="contact" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-yellow-600 font-bold tracking-wider uppercase text-sm mb-4">{current.badge}</h2>
            <h3 className="text-4xl font-extrabold text-slate-900 mb-8">{current.title}</h3>
            
            <div className="space-y-8 mb-12">
              <a 
                href={waUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start space-x-6 group"
              >
                <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-500 group-hover:text-slate-900 transition-colors">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-yellow-600 transition-colors">WhatsApp</h4>
                  <p className="text-slate-600 font-bold">08111743005 ({current.whatsappSub})</p>
                </div>
              </a>
              
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">Email</h4>
                  <p className="text-slate-600">kontakvisibel@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">
                    {language === 'en' ? 'Location' : 'Lokasi'}
                  </h4>
                  <p className="text-slate-600">Jl Ciomas harapan Kp neglasari RT 01/12 no 4, Kab Bogor, Jawa barat 16610</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/visibel_id/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 bg-slate-100 text-slate-600 rounded-2xl flex items-center justify-center hover:bg-yellow-500 hover:text-slate-900 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a 
                href="https://www.tiktok.com/@visibel.id" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 bg-slate-100 text-slate-600 rounded-2xl flex items-center justify-center hover:bg-yellow-500 hover:text-slate-900 transition-all duration-300"
                aria-label="TikTok"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="bg-white p-5 sm:p-10 rounded-[32px] sm:rounded-[40px] shadow-2xl shadow-yellow-900/10 border border-slate-100">
            <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6 text-center">{current.formTitle}</h4>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1 sm:mb-2">{current.nameLabel}</label>
                <input 
                  type="text" 
                  placeholder={current.namePlaceholder}
                  required
                  className="w-full px-4 py-3 sm:px-5 sm:py-4 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl text-sm sm:text-base focus:ring-2 focus:ring-yellow-500 focus:outline-none focus:bg-white transition-all"
                  value={formData.nama}
                  onChange={(e) => setFormData({...formData, nama: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1 sm:mb-2">{current.brandLabel}</label>
                <input 
                  type="text" 
                  placeholder={current.brandPlaceholder}
                  required
                  className="w-full px-4 py-3 sm:px-5 sm:py-4 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl text-sm sm:text-base focus:ring-2 focus:ring-yellow-500 focus:outline-none focus:bg-white transition-all"
                  value={formData.brand}
                  onChange={(e) => setFormData({...formData, brand: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1 sm:mb-2">{current.waLabel}</label>
                <input 
                  type="tel" 
                  placeholder={current.waPlaceholder}
                  required
                  className="w-full px-4 py-3 sm:px-5 sm:py-4 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl text-sm sm:text-base focus:ring-2 focus:ring-yellow-500 focus:outline-none focus:bg-white transition-all"
                  value={formData.wa}
                  onChange={(e) => setFormData({...formData, wa: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1 sm:mb-2">{current.serviceLabel}</label>
                <select 
                  className="w-full px-4 py-3 sm:px-5 sm:py-4 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl text-sm sm:text-base focus:ring-2 focus:ring-yellow-500 focus:outline-none focus:bg-white transition-all"
                  value={formData.layanan}
                  onChange={(e) => setFormData({...formData, layanan: e.target.value})}
                >
                  <option>Live Streaming Management</option>
                  <option>Short Video Production</option>
                  <option>Social Media Management</option>
                  <option>TikTok Ads Management</option>
                </select>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-yellow-500 text-slate-900 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:bg-yellow-600 transition-all flex items-center justify-center group shadow-xl shadow-yellow-600/20"
              >
                {current.submitBtn}
                <Send className="ml-3 group-hover:translate-x-1 transition-transform" size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
