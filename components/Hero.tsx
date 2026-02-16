
import React from 'react';

const Hero: React.FC = () => {
  const partnerLogos = [
    { id: '1_CiIIdbumTS3cKcPwjWX7DFmrq7w0NXA', name: 'TikTok Shop Partner' },
    { id: '1BwBvKarXHrO3y1G34q4EMsSgNlsRqTSC', name: 'TikTok Marketing Partner' }
  ];

  return (
    <section className="relative pt-36 pb-12 lg:pt-48 overflow-hidden bg-white">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-full h-[600px] bg-gradient-to-b from-yellow-50/40 to-white"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-7xl mx-auto">
          {/* Heading - Adjusted padding, line break, and size to ensure exactly 2 lines on desktop and fix spacing */}
          <h1 className="text-4xl sm:text-6xl lg:text-[68px] xl:text-[76px] font-[900] text-slate-900 leading-[1.1] mb-10 tracking-tight px-2">
            Tingkatkan Revenue Bisnis Anda <br className="hidden lg:block" />
            Lewat <span className="text-yellow-500">Strategi Digital</span> yang Terukur
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-slate-500 mb-16 leading-relaxed max-w-3xl mx-auto font-medium">
            Bantu Brand Owner & UMKM scale up bisnis di TikTok & Social Media dengan Live Streaming, Konten Viral, dan Performance Ads berbasis data.
          </p>
          
          {/* Platform Partners Section */}
          <div className="max-w-4xl mx-auto mt-12">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">Official & Trusted Platform Partners</p>
            <div className="flex items-center justify-center gap-12 sm:gap-20">
              {/* TikTok Shop Partner */}
              <div className="h-10 sm:h-14 w-40 sm:w-56 flex items-center justify-center grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <img 
                  src={`https://lh3.googleusercontent.com/d/${partnerLogos[0].id}`} 
                  alt={partnerLogos[0].name} 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              {/* TikTok Marketing Partner */}
              <div className="h-[200px] flex items-center justify-center grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <img 
                  src={`https://lh3.googleusercontent.com/d/${partnerLogos[1].id}`} 
                  alt={partnerLogos[1].name} 
                  className="h-[200px] w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
