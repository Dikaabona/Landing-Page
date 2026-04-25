
import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, ChevronDown } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [calcMenuOpen, setCalcMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle scroll after navigation if there's a hash in the URL
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }, [location]);

  const waUrl = "https://wa.me/628111743005";

  const navLinks = [
    { name: 'Layanan', href: '#services', external: false, type: 'hash' },
    { name: 'Price List', href: '#price-list', external: false, type: 'hash' },
    { name: 'Kenapa Kami', href: '#why-us', external: false, type: 'hash' },
    { name: 'Article', href: '/articles', external: false, type: 'page' },
    { 
      name: 'Kalkulator Marketplace', 
      href: '/kalkulator', 
      external: false, 
      type: 'page',
      subMenus: [
        { name: 'Profit Marketplace', href: '/kalkulator' },
        { name: 'Real Ads Spend (PPN 11%)', href: '/kalkulator-ads' }
      ]
    },
    { name: 'Konsultasi Gratis', href: waUrl, external: true, type: 'external' },
  ];

  const leftLinks = navLinks.slice(0, 5);
  const rightLink = navLinks[5];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: any) => {
    if (link.type === 'external') return;
    
    setIsOpen(false);
    setCalcMenuOpen(false);

    if (link.type === 'page') {
      e.preventDefault();
      navigate(link.href);
      window.scrollTo(0, 0);
      return;
    }

    if (link.type === 'hash') {
      e.preventDefault();
      if (location.pathname !== '/') {
        navigate('/' + link.href);
      } else {
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
      }
    }
  };

  const brandIconUrl = "https://lh3.googleusercontent.com/d/1c4UQAJIWS0-U2newQ6D8n-m0pd1f1vGJ";

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 bg-white ${scrolled ? 'shadow-md py-3' : 'py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-12">
            <div className="flex-shrink-0 flex items-center">
              <Link 
                to="/" 
                className="block"
                onClick={() => {
                  setIsOpen(false);
                  setCalcMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
              >
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
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {leftLinks.map((link) => (
                <div key={link.name} className="relative group">
                  {link.subMenus ? (
                    <button
                      className="flex items-center gap-1 text-slate-600 hover:text-yellow-500 font-bold text-sm transition-colors cursor-pointer outline-none"
                    >
                      {link.name}
                      <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link)}
                      className="text-slate-600 hover:text-yellow-500 font-bold text-sm transition-colors"
                    >
                      {link.name}
                    </a>
                  )}

                  {link.subMenus && (
                    <div className="absolute left-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="bg-white border border-slate-100 rounded-2xl shadow-xl py-4 min-w-[240px]">
                        {link.subMenus.map((sub: any) => (
                          <a
                            key={sub.name}
                            href={sub.href}
                            onClick={(e) => {
                              e.preventDefault();
                              navigate(sub.href);
                              window.scrollTo(0, 0);
                              setIsOpen(false);
                            }}
                            className="block px-6 py-2.5 text-slate-600 hover:text-yellow-500 hover:bg-slate-50 font-bold text-xs transition-all"
                          >
                            {sub.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-4 mr-2">
              <a 
                href="https://www.instagram.com/visibel_id/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-500 hover:text-yellow-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://www.tiktok.com/@visibel.id" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-500 hover:text-yellow-500 transition-colors"
                aria-label="TikTok"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
            </div>
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

          <div className="md:hidden flex items-center space-x-3">
            <a
              href={rightLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-500 text-slate-900 px-4 py-2 rounded-full font-bold text-xs hover:bg-yellow-600 transition-all shadow-md shadow-yellow-500/10 flex items-center gap-1.5"
            >
              <img src={brandIconUrl} alt="" className="h-3 w-auto object-contain brightness-0" />
              {rightLink.name}
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-900 p-1"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b absolute top-full left-0 w-full p-2 space-y-0.5 shadow-xl">
          {navLinks.map((link, idx) => (
            <div key={link.name} className="flex flex-col items-center">
              {link.subMenus ? (
                <>
                  <button
                    onClick={() => setCalcMenuOpen(!calcMenuOpen)}
                    className="flex items-center justify-center gap-2 text-xs font-bold px-4 py-1 rounded-lg text-slate-900 w-full hover:bg-slate-50 transition-colors"
                  >
                    {link.name}
                    <ChevronDown size={14} className={`transition-transform ${calcMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {calcMenuOpen && (
                    <div className="w-full bg-slate-50 rounded-xl p-1.5 space-y-0.5 mt-0.5">
                       {link.subMenus.map((sub: any) => (
                        <a
                          key={sub.name}
                          href={sub.href}
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(sub.href);
                            window.scrollTo(0, 0);
                            setIsOpen(false);
                            setCalcMenuOpen(false);
                          }}
                          className="block text-center px-4 py-1.5 text-slate-600 font-bold text-[9px] hover:bg-white rounded-md transition-all"
                        >
                          {sub.name}
                        </a>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className={`flex items-center justify-center gap-2 text-xs font-bold px-4 py-1 rounded-lg w-full transition-colors ${
                    idx === navLinks.length - 1 
                      ? 'bg-yellow-500 text-slate-900 text-center mt-1 py-1.5' 
                      : 'text-slate-900 hover:bg-slate-50'
                  }`}
                  onClick={(e) => handleNavClick(e, link)}
                >
                  {idx === navLinks.length - 1 && (
                    <img src={brandIconUrl} alt="" className="h-3 w-auto object-contain brightness-0" />
                  )}
                  {link.name}
                </a>
              )}
            </div>
          ))}
          
          <div className="flex justify-center space-x-5 pt-2 pb-0.5 border-t border-slate-100 mt-1">
            <a 
              href="https://www.instagram.com/visibel_id/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-500 hover:text-yellow-500 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a 
              href="https://www.tiktok.com/@visibel.id" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-500 hover:text-yellow-500 transition-colors"
              aria-label="TikTok"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
