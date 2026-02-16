
import React from 'react';

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
    <footer className="bg-[#0f172a] text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Updated grid to 3 columns to account for removed subscription section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 mb-20">
          {/* Logo and Description Column */}
          <div className="flex flex-col items-start">
            <div className="mb-8">
              <div className="flex items-center bg-transparent">
                <img 
                  src="https://lh3.googleusercontent.com/d/1aGXJp0RwVbXlCNxqL_tAfHS5dc23h7nA" 
                  alt="Visibel Agency Logo" 
                  className="h-20 w-auto object-contain brightness-0 invert"
                  onError={(e) => {
                    const target = e.currentTarget;
                    const parent = target.parentElement;
                    if (parent) {
                      target.style.display = 'none';
                      parent.innerHTML = '<span class="text-4xl font-black tracking-tighter text-yellow-500 uppercase">VISIBEL</span><span class="text-4xl font-black tracking-tighter text-white ml-1 uppercase">AGENCY</span>';
                    }
                  }}
                />
              </div>
            </div>
            <p className="text-slate-400 text-sm md:text-base mb-8 leading-relaxed font-medium max-w-sm">
              Partner pertumbuhan digital terpercaya yang fokus membantu brand memaksimalkan potensi penjualan melalui platform digital.
            </p>
            {/* Social icons removed as per requested "hapus" marker */}
          </div>
          
          {/* Layanan Column */}
          <div>
            <h4 className="text-xl font-bold mb-8 text-white">Layanan</h4>
            <ul className="space-y-5 text-slate-400 font-medium">
              <li><a href="#services" onClick={(e) => handleScroll(e, 'services')} className="hover:text-yellow-500 transition-colors">Live Streaming Management</a></li>
              <li><a href="#services" onClick={(e) => handleScroll(e, 'services')} className="hover:text-yellow-500 transition-colors">Short Video Production</a></li>
              <li><a href="#services" onClick={(e) => handleScroll(e, 'services')} className="hover:text-yellow-500 transition-colors">Social Media Management</a></li>
              <li><a href="#services" onClick={(e) => handleScroll(e, 'services')} className="hover:text-yellow-500 transition-colors">TikTok Ads Management</a></li>
            </ul>
          </div>
          
          {/* Navigasi Column */}
          <div>
            <h4 className="text-xl font-bold mb-8 text-white">Navigasi</h4>
            <ul className="space-y-5 text-slate-400 font-medium">
              <li><a href="#services" onClick={(e) => handleScroll(e, 'services')} className="hover:text-yellow-500 transition-colors">Layanan Kami</a></li>
              <li><a href="#why-us" onClick={(e) => handleScroll(e, 'why-us')} className="hover:text-yellow-500 transition-colors">Kenapa Visibel?</a></li>
              <li><a href="#contact" onClick={(e) => handleScroll(e, 'contact')} className="hover:text-yellow-500 transition-colors">Hubungi Kami</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">Blog & Update</a></li>
            </ul>
          </div>
          
          {/* Subscription Column removed as per requested "hapus" marker */}
        </div>
        
        {/* Copyright Section */}
        <div className="border-t border-slate-800 pt-10 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <p className="mb-4 md:mb-0">© 2026 Visibel Agency. All rights reserved.</p>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
