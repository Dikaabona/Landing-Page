
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react';

const ShortVideos: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // ID video dari Google Drive termasuk video-video baru yang diminta
  const videos = [
    '1JPDsuq_p-gXIleBrpMZRuMtMh3IW69Sa', // Video baru yang diminta (ditempatkan di depan agar terlihat)
    '1D9cf2GpOUSnBOYHDKyzKUtAUP-Dpfv5J', 
    '1k3nKvJYONidCJMBSHe7RTh4x6wTNQgp6', 
    '1zTCh97o7gPxNvUOWDyBrDbqtZZ5Uu7aL', 
    '1DlmMqCh_dDEMAmoPehuEf7Q8Om3N8-1z', 
    '1qhlOmr2CCy4CbrKLyOHmc4iYVZrvLIRp',
    '1RQ0ViiCyO-DDPMnyHvAn1TvEfKjB7b7L',
    '1t56pAMIrIzydhFz0ERepaf0Yi0WvCex5',
    '1Jmk_UxEj1z_iEOvVWbA3FkiQGbdWIHBz',
    '1ikqbT6wblkdJjK19sTab77sgv2Huv_3G'
  ];

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      const itemWidth = scrollRef.current.firstElementChild?.clientWidth || clientWidth;
      const index = Math.round(scrollLeft / itemWidth);
      setActiveIndex(index);

      // Arrow navigation states
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
      const itemWidth = scrollRef.current.firstElementChild?.clientWidth || scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="short-videos" className="py-14 bg-white scroll-mt-20 overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-14 relative">
        <div className="text-center mb-10">
          <h3 className="text-[24px] sm:text-5xl md:text-6xl font-[900] text-slate-900 leading-tight mb-4">Short Videos</h3>
          <p className="text-sm sm:text-xl text-slate-500 max-w-4xl mx-auto leading-relaxed px-4">
            Konten video kreatif yang didesain khusus untuk menarik perhatian audiens, membangun branding, dan mengonversi viewers menjadi pembeli loyal.
          </p>
        </div>

        {/* Horizontal Slider Area with Navigation Arrows */}
        <div className="relative group/arrows">
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:translate-x-2 z-20 p-2 sm:p-4 rounded-full bg-white border border-slate-100 shadow-lg text-slate-600 hover:text-slate-900 hover:scale-105 active:scale-95 disabled:opacity-0 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
            aria-label="Previous videos"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:-translate-x-2 z-20 p-2 sm:p-4 rounded-full bg-white border border-slate-100 shadow-lg text-slate-600 hover:text-slate-900 hover:scale-105 active:scale-95 disabled:opacity-0 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
            aria-label="Next videos"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Horizontal Slider Container - Exactly 4 in a row on Desktop */}
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
            {videos.map((id, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 w-1/2 sm:w-[45vw] md:w-[30vw] lg:w-1/4 snap-start px-1.5 sm:px-3"
              >
                <div 
                  onClick={() => setSelectedVideo(id)}
                  className="group relative aspect-[9/16] bg-slate-950 rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-lg transition-all duration-500 border border-slate-100 cursor-pointer"
                >
                  {/* Click shield & overlay layer to capture click events and show hover effects */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30 hover:from-black/75 hover:via-black/20 transition-all duration-300 z-10 flex flex-col justify-between p-4 sm:p-5">
                    {/* Decorative label */}
                    <div>
                      <span className="bg-yellow-500 text-slate-900 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg inline-block">
                        Creative Production
                      </span>
                    </div>
                    
                    {/* Centered beautiful play button */}
                    <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 flex items-center justify-center shadow-2xl backdrop-blur-sm">
                        <Play fill="currentColor" className="w-5 h-5 sm:w-7 sm:h-7 translate-x-0.5" />
                      </div>
                    </div>

                    {/* Hint for users */}
                    <div className="text-center opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-xs font-bold tracking-widest uppercase bg-black/40 backdrop-blur-sm inline-block px-4 py-2 rounded-full">
                        Click to Play
                      </p>
                    </div>
                  </div>
                  
                  {/* Background iframe preview (rendered inside but clicks are caught by overlay) */}
                  <iframe
                    src={`https://drive.google.com/file/d/${id}/preview`}
                    className="absolute inset-0 w-full h-full border-0 z-0 opacity-70 group-hover:opacity-85 transition-opacity"
                    allow="encrypted-media"
                    title={`Short Video ${index + 1}`}
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center flex-wrap gap-2 mt-8 px-4">
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

      {/* Centered Video Player Lightbox Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedVideo(null)}
        >
          {/* Close button top-right */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[60]">
            <button
              onClick={() => setSelectedVideo(null)}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 cursor-pointer"
              aria-label="Close video player"
            >
              <X className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          </div>

          {/* Modal Container with 9:16 vertical aspect ratio, optimized for mobile centration */}
          <div 
            className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[9/16] bg-slate-950 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/10 overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Prevent close on clicking modal content
          >
            <iframe
              src={`https://drive.google.com/file/d/${selectedVideo}/preview?autoplay=1`}
              className="absolute inset-0 w-full h-full border-0"
              allow="autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              title="Playing Short Video"
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
};

export default ShortVideos;

