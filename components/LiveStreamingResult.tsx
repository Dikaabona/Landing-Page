
import React, { useState, useRef } from 'react';

const LiveStreamingResult: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const resultImages = [
    { id: '1u_oPWzzaqFFF9DcRaAv-EBZQm-Q4V-a9' },
    { id: '1QLA_Fr9B3QEjasggORmYA3pt7_XP9pr7' },
    { id: '1Cz81kxonHySbOdCqvVPInQ4gUifsCuiD' },
    { id: '1S6P3lWJNnjMO3K2OEG_s1_RscW5LuV_h' }
  ];

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const firstItem = scrollRef.current.firstElementChild as HTMLElement;
      if (firstItem) {
        const itemWidth = firstItem.offsetWidth;
        const index = Math.round(scrollLeft / itemWidth);
        setActiveIndex(index);
      }
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
    <section id="live-results" className="py-24 bg-slate-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl sm:text-6xl font-[900] text-slate-900 leading-tight mb-8">Live Streaming Result</h3>
          <p className="text-lg sm:text-xl text-slate-500 max-w-4xl mx-auto leading-relaxed">
            Bukti nyata keberhasilan kampanye live streaming kami dalam meningkatkan interaksi dan penjualan secara real-time.
          </p>
        </div>

        <div className="relative">
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {resultImages.map((img, idx) => (
              <div 
                key={idx} 
                className="flex-shrink-0 w-[85%] md:w-1/2 lg:w-1/3 snap-center px-2 sm:px-4"
              >
                <div className="relative aspect-video overflow-hidden bg-white shadow-xl rounded-[24px] sm:rounded-[32px] border border-slate-100 group">
                  <img 
                    src={`https://lh3.googleusercontent.com/d/${img.id}`} 
                    alt={`Live Result ${idx + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
