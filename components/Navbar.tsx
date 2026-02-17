
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const waUrl = "https://wa.me/628111743005";

  const navLinks = [
    { name: 'Layanan', href: '#services', external: false },
    { name: 'Price List', href: '#price-list', external: false },
    { name: 'Kenapa Kami', href: '#why-us', external: false },
    { name: 'Konsultasi Gratis', href: waUrl, external: true },
  ];

  const leftLinks = navLinks.slice(0, 3);
  const rightLink = navLinks[3];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: { href: string, external: boolean }) => {
    if (link.external) return; // Let default link behavior happen for external URLs
    
    e.preventDefault();
    const targetId = link.href.replace('#', '');
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
    setIsOpen(false);
  };

  const brandIconUrl = "https://lh3.googleusercontent.com/d/1c4UQAJIWS0-U2newQ6D8n-m0pd1f1vGJ";

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 bg-white ${scrolled ? 'shadow-md py-3' : 'py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-12">
            <div className="flex-shrink-0 flex items-center">
              <a href="/" className="block">
                <img 
                  src="https://lh3.googleusercontent.com/d/1aGXJp0RwVbXlCNxqL_tAfHS5dc23h7nA" 
                  alt="Visibel Agency Logo" 
                  className="h-8 md:h-10 w-auto object-contain"
                  onError={(e) => {
                    const target = e.currentTarget;
                    const parent = target.parentElement;
                    if (parent) {
                      target.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.className = 'flex items-center';
                      fallback.innerHTML = '<span class="text-xl font-black tracking-tighter text-yellow-500">VISIBEL</span><span class="text-xl font-black tracking-tighter text-slate-900 ml-1">AGENCY</span>';
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </a>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {leftLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className="text-slate-600 hover:text-yellow-500 font-bold text-sm transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center">
            <a
              href={rightLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-500 text-slate-900 px-6 py-2.5 rounded-full font-bold text-sm hover:bg-yellow-600 transition-all shadow-md shadow-yellow-500/10 flex items-center gap-2"
            >
              <img src={brandIconUrl} alt="" className="h-4 w-auto object-contain brightness-0" />
              {rightLink.name}
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-900 p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b absolute top-full left-0 w-full p-4 space-y-4 shadow-xl">
          {navLinks.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className={`flex items-center justify-center gap-2 text-lg font-bold px-4 py-3 rounded-xl ${
                idx === navLinks.length - 1 
                  ? 'bg-yellow-500 text-slate-900 text-center' 
                  : 'text-slate-900 hover:bg-slate-50'
              }`}
              onClick={(e) => handleNavClick(e, link)}
            >
              {idx === navLinks.length - 1 && (
                <img src={brandIconUrl} alt="" className="h-5 w-auto object-contain brightness-0" />
              )}
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
