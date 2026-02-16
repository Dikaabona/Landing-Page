
import React from 'react';

const Clients: React.FC = () => {
  const allLogos = [
    { name: 'CWJ', id: '1O8SdLl9n8nm4IeS9gtWkXlgqhaz8HRqX' },
    { name: 'Hijab', id: '17y7pQWeE5EgPL0WBp7bDp4Bx3Bqg39zE' },
    { name: 'Yongki', id: '1v4FCFpJNyLXMbTtgpjAxpp92mzQr2vmu' },
    { name: 'Heart', id: '1N5LpNEwiHONWhe7RzTj6pG5Zg43Ov1Oc' },
    { name: 'Makaroni', id: '1bozAV1-OUNOnCsv8pfzHGx5xr-WLDONt' },
    { name: 'Carvil', id: '1XImAsuqrbniOWVT2-38yAlNay2_e0yhA' },
    { name: 'Li-Ning', id: '1ePzH0cjpkSDLeazqCSn4d54KFzb6LILj' },
    { name: 'Adev', id: '1mNWj_zH4OPzWhZamuVWdhybMqVZTlqUg' },
    { name: 'FITS', id: '1KzZlte6-j-Cw4Hi7dwUbUltj0hPT0px8' },
  ];

  // Double the logos for a seamless loop
  const duplicatedLogos = [...allLogos, ...allLogos];

  return (
    <section className="py-16 bg-white border-y border-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <h2 className="text-slate-400 font-bold tracking-tight text-lg mb-4 uppercase tracking-[0.2em]">Telah Dipercaya Oleh 100+ Brand & UMKM</h2>
          <p className="max-w-4xl mx-auto text-slate-500 text-base italic leading-relaxed">
            Visibel Agency telah dipercaya oleh berbagai brand UMKM, fashion, beauty, F&B, dan marketplace seller 
            untuk meningkatkan performa penjualan mereka melalui strategi digital yang terukur.
          </p>
        </div>
      </div>

      <div className="relative marquee-container">
        {/* Gradient overlays for smooth fade effect */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
        
        <div className="flex animate-scroll whitespace-nowrap gap-16 md:gap-24 items-center">
          {duplicatedLogos.map((logo, idx) => (
            <div 
              key={idx} 
              className="flex-shrink-0 flex justify-center items-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
            >
              <img 
                src={`https://lh3.googleusercontent.com/d/${logo.id}`} 
                alt={logo.name} 
                className="h-12 md:h-16 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-12">
        <p className="text-slate-400 font-medium italic text-sm tracking-wide">
          ...and many more trusted brands
        </p>
      </div>
    </section>
  );
};

export default Clients;