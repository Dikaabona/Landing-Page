
import React from 'react';

const Hero: React.FC = () => {
  const partnerLogos = [
    { id: '1_CiIIdbumTS3cKcPwjWX7DFmrq7w0NXA', name: 'TikTok Shop Partner' },
    { id: '1BwBvKarXHrO3y1G34q4EMsSgNlsRqTSC', name: 'TikTok Marketing Partner' },
    { id: '1KGiEEmKt0M28RWs5Y08RZfxH0US-azUX', name: 'TikTok MCN' }
  ];

  return (
    <section className="relative pt-36 pb-12 lg:pt-44 overflow-hidden bg-white">
      {/* Elegant Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-[5%] w-[45%] h-[55%] bg-yellow-100/40 blur-[130px] rounded-full"></div>
        <div className="absolute top-[15%] right-0 w-[40%] h-[50%] bg-amber-50/50 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-0 left-[20%] w-[55%] h-[45%] bg-slate-100/60 blur-[160px] rounded-full"></div>
      </div>
      
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-14 relative z-10">
        <div className="text-center">
          {/* Heading - Enlarged, wider bound with fluid line-wrap */}
          <h1 className="text-[26px] xs:text-[32px] sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] font-[900] text-slate-900 leading-[1.2] mb-6 sm:mb-10 tracking-tight px-2 max-w-[1600px] mx-auto select-none">
            Tingkatkan Revenue Bisnis Anda Lewat{" "}
            <span className="inline-block text-yellow-500 hover:scale-[1.01] transition-transform duration-300">
              Strategi Digital
            </span>{" "}
            yang Terukur
          </h1>
          
          {/* Subheadline - Enlarged and wider */}
          <p className="text-sm sm:text-xl md:text-2xl text-slate-600 mb-10 sm:mb-16 leading-relaxed max-w-[1200px] mx-auto font-medium">
            Bantu Brand Owner & UMKM scale up bisnis di TikTok & Social Media dengan Live Streaming, Konten Viral, dan Performance Ads berbasis data.
          </p>

          {/* Platform Partners Section - High Fidelity Glassmorphism card with behind-the-glass gradient spotlight backdrops */}
          <div className="relative max-w-[1300px] mx-auto mt-16 group/glass">
            
            {/* Visual Glass Spotlight Blobs situated directly behind the card to make the glass distortion vividly apparent */}
            <div className="absolute -top-12 left-[10%] w-[220px] sm:w-[320px] h-[150px] sm:h-[220px] bg-sky-400/25 blur-[60px] sm:blur-[80px] rounded-full -z-10 animate-pulse duration-[8000ms]"></div>
            <div className="absolute -bottom-12 right-[15%] w-[250px] sm:w-[350px] h-[180px] sm:h-[250px] bg-yellow-400/30 blur-[70px] sm:blur-[90px] rounded-full -z-10 animate-pulse duration-[6000ms]"></div>
            <div className="absolute top-[20%] left-[45%] w-[200px] sm:w-[280px] h-[120px] sm:h-[200px] bg-pink-400/20 blur-[50px] sm:blur-[70px] rounded-full -z-10 animate-pulse duration-[10000ms]"></div>

            {/* Glass Container */}
            <div className="w-full bg-white/[0.45] backdrop-blur-[24px] border border-white/90 shadow-[0_45px_80px_-20px_rgba(0,0,0,0.08),inset_0_2px_4px_rgba(255,255,255,0.8)] rounded-[32px] p-8 sm:p-14 relative overflow-hidden transition-all duration-500 hover:shadow-[0_50px_100px_-15px_rgba(0,0,0,0.12),inset_0_2px_8px_rgba(255,255,255,1)] hover:border-white hover:bg-white/[0.5]">
              {/* Inner ambient shine reflection overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/25 pointer-events-none"></div>
              {/* Soft internal yellow circular highlight */}
              <div className="absolute -top-[50%] -left-[20%] w-[60%] h-[120%] bg-yellow-300/10 blur-[80px] rounded-full pointer-events-none"></div>
              
              <p className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] text-slate-400 mb-10 relative z-10 select-none">Official & Trusted Platform Partners</p>
              
              <div className="flex flex-row items-center justify-center gap-6 sm:gap-16 px-2 overflow-hidden relative z-10">
                {/* TikTok Shop Partner */}
                <div className="flex items-center justify-center transition-all duration-300 hover:scale-[1.05] active:scale-95">
                  <img 
                    src={`https://lh3.googleusercontent.com/d/${partnerLogos[0].id}`} 
                    alt={partnerLogos[0].name} 
                    className="w-[100px] sm:w-[200px] md:w-[240px] lg:w-[260px] h-auto object-contain filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.4)] brightness-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* TikTok Marketing Partner */}
                <div className="flex items-center justify-center transition-all duration-300 hover:scale-[1.05] active:scale-95">
                  <img 
                    src={`https://lh3.googleusercontent.com/d/${partnerLogos[1].id}`} 
                    alt={partnerLogos[1].name} 
                    className="w-[100px] sm:w-[200px] md:w-[240px] lg:w-[260px] h-auto object-contain filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.4)] brightness-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* TikTok MCN */}
                <div className="flex items-center justify-center transition-all duration-300 hover:scale-[1.05] active:scale-95">
                  <img 
                    src={`https://lh3.googleusercontent.com/d/${partnerLogos[2].id}`} 
                    alt={partnerLogos[2].name} 
                    className="w-[100px] sm:w-[200px] md:w-[240px] lg:w-[260px] h-auto object-contain filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.4)] brightness-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
