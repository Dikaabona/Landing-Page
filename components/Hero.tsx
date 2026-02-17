
import React from 'react';

const Hero: React.FC = () => {
  const partnerLogos = [
    { id: '1_CiIIdbumTS3cKcPwjWX7DFmrq7w0NXA', name: 'TikTok Shop Partner' },
    { id: '1BwBvKarXHrO3y1G34q4EMsSgNlsRqTSC', name: 'TikTok Marketing Partner' }
  ];

  return (
    <section className="relative pt-36 pb-24 lg:pt-44 overflow-hidden bg-white">
      {/* Elegant Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[60%] bg-yellow-50/60 blur-[120px] rounded-full"></div>
        <div className="absolute top-[20%] -right-[5%] w-[40%] h-[50%] bg-yellow-100/20 blur-[140px] rounded-full"></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] bg-slate-50 blur-[150px] rounded-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-7xl mx-auto">
          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-[45px] xl:text-[45px] font-[900] text-slate-900 leading-[1.2] mb-10 tracking-tight px-2 max-w-5xl mx-auto">
            Tingkatkan Revenue Bisnis Anda Lewat <br className="hidden lg:block" />
            <span className="text-yellow-500">Strategi Digital</span> yang Terukur
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-slate-500 mb-16 leading-relaxed max-w-3xl mx-auto font-medium">
            Bantu Brand Owner & UMKM scale up bisnis di TikTok & Social Media dengan Live Streaming, Konten Viral, dan Performance Ads berbasis data.
          </p>

          {/* Platform Partners Section restored here */}
          <div className="max-w-4xl mx-auto mt-12">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-8">Official & Trusted Platform Partners</p>
            <div className="flex items-center justify-center gap-10 sm:gap-16">
              {/* TikTok Shop Partner */}
              <div className="h-10 sm:h-12 flex items-center justify-center transition-all duration-300 grayscale opacity-60 hover:grayscale-0 hover:opacity-100">
                <img 
                  src={`https://lh3.googleusercontent.com/d/${partnerLogos[0].id}`} 
                  alt={partnerLogos[0].name} 
                  className="h-full w-auto object-contain"
                />
              </div>
              {/* TikTok Marketing Partner - Restored to size 150px width */}
              <div className="flex items-center justify-center transition-all duration-300 grayscale opacity-60 hover:grayscale-0 hover:opacity-100">
                <img 
                  src={`https://lh3.googleusercontent.com/d/${partnerLogos[1].id}`} 
                  alt={partnerLogos[1].name} 
                  className="w-[120px] sm:w-[150px] h-auto object-contain"
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
