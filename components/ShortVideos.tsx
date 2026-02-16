import React from 'react';

const ShortVideos: React.FC = () => {
  // ID video dari Google Drive yang Anda berikan
  const videos = [
    '1uUn6ZyMcnwv6zMcVqXJGNGKc44mnva2U',
    '1qhlOmr2CCy4CbrKLyOHmc4iYVZrvLIRp',
    '1RQ0ViiCyO-DDPMnyHvAn1TvEfKjB7b7L'
  ];

  return (
    <section id="short-videos" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl sm:text-7xl font-[900] text-slate-900 leading-tight mb-8">Our Short Videos</h3>
          <p className="text-xl text-slate-500 max-w-4xl mx-auto leading-relaxed">
            Konten video kreatif yang didesain khusus untuk menarik perhatian audiens, membangun branding, dan mengonversi viewers menjadi pembeli loyal.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {videos.map((id, index) => (
            <div 
              key={index} 
              className="group relative aspect-[9/16] bg-slate-900 rounded-[32px] overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100"
            >
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
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-slate-400 text-sm italic">
            *Video dihosting di Google Drive. Klik tombol play pada video untuk memulai.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ShortVideos;