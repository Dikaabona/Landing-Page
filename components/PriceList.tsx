
import React from 'react';
import { Check } from 'lucide-react';

const PriceList: React.FC = () => {
  const waUrl = "https://wa.me/628111743005";

  const plans = [
    {
      name: "Essential Package",
      price: "Starter",
      amount: "8.400.000",
      desc: "Ideal untuk UMKM yang baru ingin merambah ke dunia digital marketing.",
      features: [
        "60 jam live streaming / bulan",
        "15 short video",
        "Monthly Performance Report",
        "Optimasi Profil Akun"
      ],
      recommended: false
    },
    {
      name: "Growth Strategy",
      price: "Best Value",
      amount: "15.000.000",
      desc: "Paket lengkap untuk brand yang siap scale-up revenue secara signifikan.",
      features: [
        "100 jam live streaming / bulan",
        "30 short video",
        "Dedicated Account Manager",
        "Prioritas Talent Host"
      ],
      recommended: true
    },
    {
      name: "Elite Enterprise",
      price: "Full Custom",
      desc: "Solusi premium yang disesuaikan khusus untuk korporasi dan brand besar.",
      features: [
        "Full Management",
        "Premium Production",
        "Enterprise Reporting",
        "24/7 Support"
      ],
      recommended: false
    }
  ];

  return (
    <section id="price-list" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-yellow-600 font-bold tracking-widest uppercase text-sm mb-4">PAKET HARGA & INVESTASI</h2>
          <h3 className="text-3xl sm:text-5xl font-[900] text-slate-900 leading-tight">Investasikan Pertumbuhan Brand Anda</h3>
        </div>

        {/* Updated grid: grid-cols-2 for mobile to make them "sejajar" */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8 items-stretch">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`relative bg-white rounded-[24px] sm:rounded-[40px] p-5 sm:p-10 border flex flex-col h-full transition-all duration-300 hover:shadow-2xl ${
                plan.recommended 
                  ? 'border-yellow-500 ring-4 ring-yellow-500/10 z-10' 
                  : 'border-slate-100 shadow-sm'
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-3 sm:-top-5 left-1/2 -translate-x-1/2 bg-yellow-500 text-slate-900 px-3 py-1.5 sm:px-6 sm:py-2 rounded-full font-black text-[8px] sm:text-sm uppercase tracking-wider shadow-lg whitespace-nowrap">
                  Paling Direkomendasikan
                </div>
              )}
              
              <div className="mb-6 sm:mb-8">
                <h4 className="text-sm sm:text-2xl font-extrabold text-slate-900 mb-1 sm:mb-2 leading-tight">{plan.name}</h4>
                <p className="text-slate-500 text-[10px] sm:text-sm leading-relaxed font-medium line-clamp-2 sm:line-clamp-none">{plan.desc}</p>
              </div>

              <div className="mb-6 sm:mb-8 flex flex-col">
                <span className="text-lg sm:text-4xl font-black text-slate-900 leading-none">{plan.price}</span>
                {plan.amount && (
                  <span className="text-base sm:text-2xl font-bold text-slate-600 mt-1 sm:mt-2">Rp {plan.amount}</span>
                )}
              </div>

              <ul className="space-y-2 sm:space-y-4 mb-6 sm:mb-10 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-slate-700 font-semibold text-[9px] sm:text-sm leading-tight">
                    <div className="mt-0.5 mr-1.5 sm:mr-3 w-3.5 h-3.5 sm:w-5 sm:h-5 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={8} strokeWidth={4} className="sm:hidden" />
                      <Check size={12} strokeWidth={4} className="hidden sm:block" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <a 
                  href={`${waUrl}?text=${encodeURIComponent(`Halo Visibel Agency, saya tertarik untuk memilih paket: ${plan.name}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-center block transition-all text-xs sm:text-lg shadow-lg ${
                    plan.recommended 
                      ? 'bg-yellow-500 text-slate-900 hover:bg-yellow-600 shadow-yellow-500/20' 
                      : 'bg-[#0f172a] text-white hover:bg-black shadow-slate-200/50'
                  }`}
                >
                  Pilih Paket
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PriceList;
