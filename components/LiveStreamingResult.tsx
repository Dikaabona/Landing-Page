import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const LiveStreamingResult: React.FC = () => {
  const { language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const resultImages = [
    { id: '1u_oPWzzaqFFF9DcRaAv-EBZQm-Q4V-a9' },
    { id: '1QLA_Fr9B3QEjasggORmYA3pt7_XP9pr7' },
    { id: '1Cz81kxonHySbOdCqvVPInQ4gUifsCuiD' },
    { id: '1S6P3lWJNnjMO3K2OEG_s1_RscW5LuV_h' }
  ];

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      const firstItem = scrollRef.current.firstElementChild as HTMLElement;
      if (firstItem) {
        const itemWidth = firstItem.offsetWidth;
        const index = Math.round(scrollLeft / itemWidth);
        setActiveIndex(index);
      }

      // Update arrow navigation states
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      handleScroll();
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
      const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollTo = (index: number) => {
    if (scrollRef.current) {
      const firstItem = scrollRef.current.firstElementChild as HTMLElement;
      if (firstItem) {
        const itemWidth = firstItem.offsetWidth;
        scrollRef.current.scrollTo({
          left: index * itemWidth,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <section id="live-results" className="py-24 bg-slate-50 scroll-mt-20 overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-14 relative animate-fade-in">
        <div className="text-center mb-10 sm:mb-16">
          <h3 className="text-[24px] sm:text-5xl md:text-6xl font-[900] text-slate-900 leading-tight mb-4 sm:mb-8">Live Streaming Result</h3>
          <p className="text-sm sm:text-xl text-slate-500 max-w-4xl mx-auto leading-relaxed px-4 font-medium">
            {language === 'en'
              ? 'Real proof of our live streaming campaign success in boosting real-time engagement and sales.'
              : 'Bukti nyata keberhasilan kampanye live streaming kami dalam meningkatkan interaksi dan penjualan secara real-time.'}
          </p>
        </div>

        {/* Slider with Arrows */}
        <div className="relative group/arrows">
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:translate-x-2 z-20 p-2 sm:p-4 rounded-full bg-white border border-slate-100 shadow-lg text-slate-600 hover:text-slate-900 hover:scale-105 active:scale-95 disabled:opacity-0 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
            aria-label="Previous results"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:-translate-x-2 z-20 p-2 sm:p-4 rounded-full bg-white border border-slate-100 shadow-lg text-slate-600 hover:text-slate-900 hover:scale-105 active:scale-95 disabled:opacity-0 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
            aria-label="Next results"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Horizontally Slidable Grid - Exactly 4 in a row on Desktop */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-0 py-4"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              scrollSnapType: 'x mandatory'
            }}
          >
            {resultImages.map((img, idx) => (
              <div 
                key={idx} 
                className="flex-shrink-0 w-1/2 sm:w-[45vw] md:w-[30vw] lg:w-1/4 snap-start px-1.5 sm:px-3"
              >
                <div className="relative aspect-video overflow-hidden bg-white shadow-xl rounded-[20px] sm:rounded-[24px] border border-slate-100 group">
                  <img 
                    src={`https://lh3.googleusercontent.com/d/${img.id}`} 
                    alt={`Live Result ${idx + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-3 mt-12">
            {resultImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                className={`h-2 transition-all duration-300 rounded-full ${
                  activeIndex === idx ? 'w-10 bg-yellow-500' : 'w-2 bg-slate-200 hover:bg-slate-300'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveStreamingResult;
