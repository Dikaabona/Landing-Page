
import React, { useState, useRef } from 'react';

const ShortVideos: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // ID video dari Google Drive termasuk video-video baru yang diminta
  const videos = [
    '1uUn6ZyMcnwv6zMcVqXJGNGKc44mnva2U',
    '1Rb1BIybtLt01hy8KFuT_EaiH_CQszYpP',
    '10Hh14zuq0mBzbQGr28ETHBBzCxbh5nQy', // Video baru 1
    '1k3nKvJYONidCJMBSHe7RTh4x6wTNQgp6', // Video baru 2
    '1zTCh97o7gPxNvUOWDyBrDbqtZZ5Uu7aL', // Video baru 3
    '1DlmMqCh_dDEMAmoPehuEf7Q8Om3N8-1z', // Video baru 4
    '1qhlOmr2CCy4CbrKLyOHmc4iYVZrvLIRp',
    '1RQ0ViiCyO-DDPMnyHvAn1TvEfKjB7b7L'
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
    <section id="short-videos" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl sm:text-7xl font-[900] text-slate-900 leading-tight mb-8">Our Short Videos</h3>
          <p className="text-xl text-slate-500 max-w-4xl mx-auto leading-relaxed">
            Konten video kreatif yang didesain khusus untuk menarik perhatian audiens, membangun branding, dan mengonversi viewers menjadi pembeli loyal.
          </p>
        </div>

        {/* Horizontal Slider Container */}
        <div className="relative">
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {videos.map((id, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 snap-start px-3"
              >
                <div className="group relative aspect-[9/16] bg-slate-900 rounded-[32px] overflow-hidden shadow-xl transition-all duration-500 border border-slate-100">
                  {/* Overlay shadow for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-10"></div>
                  
                  <iframe
                    src={`https://drive.google.com/file/d/${id}/preview`}
                    className="absolute inset-0 w-full h-full border-0 z-0"
                    allow="autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    allowFullScreen
                    title={`Short Video ${index + 1}`}
                    loading="lazy"
                  ></iframe>

                  {/* Decorative label */}
                  <div className="absolute top-6 left-6 z-20 pointer-events-none">
                    <span className="bg-yellow-500/90 backdrop-blur-md text-slate-900 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                      Creative Production
                    </span>
                  </div>
                  
                  {/* Hint for users */}
                  <div className="absolute bottom-8 left-0 right-0 text-center z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-xs font-bold tracking-widest uppercase bg-black/20 backdrop-blur-sm inline-block px-4 py-2 rounded-full">
                      Click to Play
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center flex-wrap gap-2 mt-12 px-4">
            {videos.map((_, idx) => (
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

export default ShortVideos;
