
import React, { useState, useRef } from 'react';

const LivestreamSetup: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Real IDs provided previously
  const setupImages = [
    { id: '18c9eceVg0bgjvintC6laZOuKyFc6oQW0' },
    { id: '1AostlkxLec_Z9sKjIN3uhDru4vbDh0LN' },
    { id: '1iR1-BtcsL4M_CtomlsPxFp5rGqk4Q921' },
    { id: '10Jboa7CN-hz3OeRCDAEFD1nipI7CCXEb' },
    { id: '1Ccnm0AOCu1s-4FfhmReuhY8nJXwLiGrU' },
    { id: '1dxwqLcE2ztCvBGo1hEZxauws2OmRnzuz' },
    { id: '1RyHKNbqVy2b0wY6C9mt_dv7U5s9OM3fI' }
  ];

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const itemWidth = scrollRef.current.firstElementChild?.clientWidth || clientWidth;
      const index = Math.round(scrollLeft / itemWidth);
      setActiveIndex(index);
    }
  };

  const scrollTo = (index: number) => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.firstElementChild?.clientWidth || scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="setup" className="py-24 bg-[#f9f9f9] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Label removed as per 'hapus' instruction */}
          <h3 className="text-4xl sm:text-7xl font-[900] text-slate-900 leading-tight mb-8">Our Livestream Setup</h3>
          <p className="text-xl text-slate-500 max-w-4xl mx-auto leading-relaxed">
            Perangkat live streaming profesional dengan host berpengalaman dan komunikatif. Semua harga sudah termasuk host, operator, dan full setup tanpa biaya tambahan
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {setupImages.map((img, idx) => (
              <div 
                key={idx} 
                className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 snap-start px-2"
              >
                {/* Added rounded-3xl as per 'setiap sisi dibuat rounded' instruction */}
                <div className="relative aspect-[3/4] overflow-hidden bg-white shadow-sm rounded-[32px]">
                  <img 
                    src={`https://lh3.googleusercontent.com/d/${img.id}`} 
                    alt={`Setup ${idx + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.src = 'https://images.unsplash.com/photo-1598550476439-6847785fce66?auto=format&fit=crop&q=80&w=800';
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-2 mt-12">
            {setupImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  activeIndex === idx ? 'w-8 bg-yellow-500' : 'w-1.5 bg-slate-300'
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

export default LivestreamSetup;
