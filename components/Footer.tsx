
import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="flex items-center">
                <span className="text-xl font-black tracking-tighter text-yellow-500">VISIBEL</span>
                <span className="text-xl font-black tracking-tighter text-white ml-1">AGENCY</span>
              </div>
            </div>
            <p className="text-slate-400 mb-8 leading-relaxed font-medium">
              Partner pertumbuhan digital terpercaya yang fokus membantu brand memaksimalkan potensi penjualan melalui platform digital.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Layanan</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#services" onClick={(e) => handleScroll(e, 'services')} className="hover:text-yellow-500 transition-colors">Live Streaming Management</a></li>
              <li><a href="#services" onClick={(e) => handleScroll(e, 'services')} className="hover:text-yellow-500 transition-colors">Short Video Production</a></li>
              <li><a href="#services" onClick={(e) => handleScroll(e, 'services')} className="hover:text-yellow-500 transition-colors">Social Media Management</a></li>
              <li><a href="#services" onClick={(e) => handleScroll(e, 'services')} className="hover:text-yellow-500 transition-colors">TikTok Ads Management</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Navigasi</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#services" onClick={(e) => handleScroll(e, 'services')} className="hover:text-yellow-500 transition-colors">Layanan Kami</a></li>
              <li><a href="#why-us" onClick={(e) => handleScroll(e, 'why-us')} className="hover:text-yellow-500 transition-colors">Kenapa Visibel?</a></li>
              <li><a href="#contact" onClick={(e) => handleScroll(e, 'contact')} className="hover:text-yellow-500 transition-colors">Hubungi Kami</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">Blog & Update</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Berlangganan</h4>
            <p className="text-slate-400 mb-4 text-sm font-medium">Dapatkan update strategi digital marketing terbaru setiap minggu.</p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email Anda" 
                className="bg-slate-800 border-none rounded-l-xl px-4 py-3 text-sm focus:ring-0 w-full"
              />
              <button className="bg-yellow-500 px-4 py-3 text-slate-900 rounded-r-xl font-bold hover:bg-yellow-600 transition-all">
                Join
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <p>© 2026 Visibel Agency. All rights reserved.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
