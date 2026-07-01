import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ExternalLink } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface DesignItem {
  id: string;
  title: string;
}

const GraphicDesignPortfolio: React.FC = () => {
  const { language } = useLanguage();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const graphicDesigns: DesignItem[] = [
    { id: '1xbG1jAVnnxTDcfiN8PnP2-ZzaWh_aIC9', title: 'Creative Banner 1' },
    { id: '1Fpdq4AIXKVbMm1x2rh5Hv7invp0F6Wqc', title: 'Creative Banner 2' },
    { id: '1D58iPSy3bd3d13UmdEnBhCw_MMBxG50j', title: 'Creative Banner 3' },
    { id: '1jdzDB3JHIiu4K-A-Q2z_4CzriSsCKDIF', title: 'Creative Banner 4' },
    { id: '1WjNcax18d7rkA8QazDyAy1dyP-v-KmVO', title: 'Creative Banner 5' },
    { id: '1hvvxoAOg55EbvKJFWGBGDenoSAC7YSxP', title: 'Creative Banner 6' },
    { id: '1BZtGQBpNnpj_-7kmJeyXpVwCbpuxNRr7', title: 'Creative Banner 7' },
    { id: '1xnaqtCrfAxXH-DTT97HAhd1oXug76w0G', title: 'Creative Banner 8' },
    { id: '17oGHgNbkin_kISgQwmIROcGudIym532m', title: 'Creative Banner 9' },
  ];

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      // triggers initial check
      handleScroll();
      
      // Also listen to resize to update scroll states
      window.addEventListener('resize', handleScroll);
    }
    return () => {
      if (el) {
        el.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      // Scroll by 1 card slot size roughly (clientWidth / some_fraction)
      const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const openLightbox = (id: string) => {
    const origIndex = graphicDesigns.findIndex(item => item.id === id);
    if (origIndex !== -1) {
      setSelectedIdx(origIndex);
    }
  };

  const closeLightbox = () => {
    setSelectedIdx(null);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx + 1) % graphicDesigns.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx - 1 + graphicDesigns.length) % graphicDesigns.length);
    }
  };

  return (
    <section id="graphic-design" className="py-24 bg-slate-50 scroll-mt-20 overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-14 relative">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16 relative">
          <h3 className="text-[24px] sm:text-5xl md:text-6xl font-[900] text-slate-900 leading-tight mb-4">Social Media Design</h3>
          <p className="text-sm sm:text-xl text-slate-500 max-w-4xl mx-auto leading-relaxed px-4 font-medium">
            {language === 'en'
              ? 'Creative and professional graphic design work specifically tailored to strengthen brand identity and attract audience interaction.'
              : 'Karya desain grafis kreatif dan profesional yang dirancang khusus untuk memperkuat identitas brand dan menarik interaksi audiens'}
          </p>
        </div>

        {/* Navigation Arrows & Slider container wrapper */}
        <div className="relative group/arrows">
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:translate-x-2 z-20 p-2 sm:p-4 rounded-full bg-white border border-slate-100 shadow-lg text-slate-600 hover:text-slate-900 hover:scale-105 active:scale-95 disabled:opacity-0 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer`}
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:-translate-x-2 z-20 p-2 sm:p-4 rounded-full bg-white border border-slate-100 shadow-lg text-slate-600 hover:text-slate-900 hover:scale-105 active:scale-95 disabled:opacity-0 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer`}
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Horizontally Slidable Grid - Exactly 4 in a row on Desktop */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-3 sm:gap-6 py-4 px-2 sm:px-4"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              scrollSnapType: 'x mandatory'
            }}
          >
            {graphicDesigns.map((design) => (
              <div
                key={design.id}
                onClick={() => openLightbox(design.id)}
                className="flex-shrink-0 w-[calc(50%-6px)] sm:w-[45vw] md:w-[30vw] lg:w-[calc(25%-18px)] snap-start group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {/* Image Box */}
                <div className="aspect-square bg-slate-150 relative overflow-hidden flex items-center justify-center">
                  <img
                    src={`https://lh3.googleusercontent.com/d/${design.id}`}
                    alt={design.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = `https://drive.google.com/uc?export=view&id=${design.id}`;
                    }}
                  />
                  
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="p-3 bg-yellow-500 rounded-full text-slate-900 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
                      <ZoomIn size={24} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Swipe instructions helper hint on mobile */}
        <div className="text-center mt-6 block sm:hidden">
          <p className="text-xs text-slate-400 italic">
            {language === 'en' ? 'Swipe to view more designs \u2192' : 'Geser untuk melihat kreasi lainnya \u2192'}
          </p>
        </div>
      </div>

      {/* Lightbox / Modal */}
      {selectedIdx !== null && (
        <div 
          onClick={closeLightbox}
          className="fixed inset-0 bg-black/95 z-[100] flex flex-col items-center justify-center p-4 backdrop-blur-sm transition-all duration-300"
        >
          {/* Close button */}
          <button 
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-yellow-400 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all cursor-pointer z-50"
            aria-label="Close"
          >
            <X size={24} />
          </button>

          {/* Nav buttons inside Lightbox */}
          <button 
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 text-white hover:text-yellow-400 bg-white/10 hover:bg-white/20 p-4 rounded-full transition-all cursor-pointer z-30"
            aria-label="Previous image"
          >
            <ChevronLeft size={28} />
          </button>

          <button 
            onClick={handleNext}
            className="absolute right-4 sm:right-8 text-white hover:text-yellow-400 bg-white/10 hover:bg-white/20 p-4 rounded-full transition-all cursor-pointer z-30"
            aria-label="Next image"
          >
            <ChevronRight size={28} />
          </button>

          {/* Image & details Container */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl max-h-[80vh] flex flex-col items-center justify-center relative select-none"
          >
            <img 
              src={`https://lh3.googleusercontent.com/d/${graphicDesigns[selectedIdx].id}`} 
              alt={graphicDesigns[selectedIdx].title} 
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl transition-all duration-300 border border-white/10"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = `https://drive.google.com/uc?export=view&id=${graphicDesigns[selectedIdx].id}`;
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default GraphicDesignPortfolio;
