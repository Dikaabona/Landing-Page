
import React from 'react';

const Hero: React.FC = () => {
  const partnerLogos = [
    { id: '1_CiIIdbumTS3cKcPwjWX7DFmrq7w0NXA', name: 'TikTok Shop Partner' },
    { id: '1BwBvKarXHrO3y1G34q4EMsSgNlsRqTSC', name: 'TikTok Marketing Partner' }
  ];

  return (
    <section className="relative pt-36 pb-12 lg:pt-44 overflow-hidden bg-white">
      {/* Elegant Background Decor - Subtle yellow glows to make it less plain on white */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[60%] bg-yellow-50/60 blur-[120px] rounded-full"></div>
        <div className="absolute top-[20%] -right-[5%] w-[40%] h-[50%] bg-yellow-100/20 blur-[140px] rounded-full"></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] bg-slate-50 blur-[150px] rounded-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-7xl mx-auto">
          {/* Heading - Set to 45px as requested for desktop views */}
          <h1 className="text-3xl sm:text-5xl lg:text-[45px] xl:text-[45px] font-[900] text-slate-900 leading-[1.2] mb-10 tracking-tight px-2 max-w-5xl mx-auto">
            Tingkatkan Revenue Bisnis Anda Lewat <br className="hidden lg:block" />
            <span className="text-yellow-500">Strategi Digital</span> yang Terukur
          </h1>
          
          {/* Subheadline - Changed back to standard slate for white background */}
          <p className="text-lg sm:text-xl text-slate-500 mb-16 leading-relaxed max-w-3xl mx-auto font-medium">
            Bantu Brand Owner & UMKM scale up bisnis di TikTok & Social Media dengan Live Streaming, Konten Viral, dan Performance Ads berbasis data.
          </p>
          
          {/* Platform Partners Section */}
          <div className="max-w-4xl mx-auto mt-12">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">Official & Trusted Platform Partners</p>
            <div className="flex items-center justify-center gap-12 sm:gap-20">
              {/* TikTok Shop Partner */}
              <div className="h-10 sm:h-14 w-40 sm:w-56 flex items-center justify-center grayscale opacity-40 hover:opacity-100 transition-all duration-300">
                <img 
                  src={`https://lh3.googleusercontent.com/d/${partnerLogos[0].id}`} 
                  alt={partnerLogos[0].name} 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              {/* TikTok Marketing Partner */}
              <div className="h-[200px] flex items-center justify-center grayscale opacity-40 hover:opacity-100 transition-all duration-300">
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
