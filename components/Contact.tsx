
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
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

  return (
    <section id="contact" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-yellow-600 font-bold tracking-wider uppercase text-sm mb-4">Kontak Kami</h2>
            <h3 className="text-4xl font-extrabold text-slate-900 mb-8">Mari Mulai Perjalanan Growth Bisnis Anda</h3>
            
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
                  <p className="text-slate-600 font-bold">08111743005 (Klik untuk Chat)</p>
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
                  <h4 className="text-lg font-bold text-slate-900">Lokasi</h4>
                  <p className="text-slate-600">Jl Ciomas harapan Kp neglasari RT 01/12 no 4, Kab Bogor, Jawa barat 16610</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 sm:p-10 rounded-[40px] shadow-2xl shadow-yellow-900/10 border border-slate-100">
            <h4 className="text-xl font-bold text-slate-900 mb-6 text-center">Atau Kirim Form Konsultasi</h4>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Nama Lengkap</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Budi Santoso"
                  required
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:outline-none focus:bg-white transition-all"
                  value={formData.nama}
                  onChange={(e) => setFormData({...formData, nama: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Nama Brand</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Fashionista Indo"
                  required
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:outline-none focus:bg-white transition-all"
                  value={formData.brand}
                  onChange={(e) => setFormData({...formData, brand: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Nomor WhatsApp</label>
                <input 
                  type="tel" 
                  placeholder="Contoh: 081234567890"
                  required
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:outline-none focus:bg-white transition-all"
                  value={formData.wa}
                  onChange={(e) => setFormData({...formData, wa: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Kebutuhan Layanan</label>
                <select 
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:outline-none focus:bg-white transition-all"
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
                className="w-full bg-yellow-500 text-slate-900 py-5 rounded-2xl font-bold text-lg hover:bg-yellow-600 transition-all flex items-center justify-center group shadow-xl shadow-yellow-600/20"
              >
                Kirim Via WhatsApp
                <Send className="ml-3 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
