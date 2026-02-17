
import React from 'react';
import { Check } from 'lucide-react';

const PriceList: React.FC = () => {
  const waUrl = "https://wa.me/628111743005";

  const plans = [
    {
      price: "LiveStream",
      amount: "9.000.000",
      features: [
        "100 jam live streaming / bulan",
        "Min Subscribe 3 bulan",
        "No Commission Fee",
        "Free Setup Live room",
        "Free Sticker",
        "Monthly Performance Report"
      ],
      recommended: true 
    },
    {
      price: "ShortVideo",
      amount: "6.000.000",
      features: [
        "30 short video / bulan",
        "Script Video",
        "Content Plan",
        "No Commission Fee",
        "Talent",
        "Monthly Report",
        "Min Subscribe 3 bulan"
      ],
      recommended: true 
    },
    {
      price: "Affiliate Management Service",
      amount: "5.000.000",
      features: [
        "30 KOL",
        "Script Content",
        "Monthly Report",
        "KOL sesuai niche"
      ],
      recommended: false
    },
    {
      price: "Ads Management",
      amount: "2.500.000",
      features: [
        "Min Subscribe 3 bulan",
        "Komisi 5%, komisi maksimal Rp 10.000.000 / bulan",
        "Manage Shop Tab",
        "Weekly Report",
        "Account Manager"
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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 items-stretch">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`relative bg-white rounded-[24px] sm:rounded-[40px] px-5 pb-5 pt-6 sm:px-8 sm:pb-8 sm:pt-10 border flex flex-col h-full transition-all duration-500 ease-out hover:-translate-y-4 hover:scale-[1.02] ${
                plan.recommended 
                  ? 'border-yellow-500 ring-4 ring-yellow-500/10 z-10 shadow-2xl shadow-yellow-500/20' 
                  : 'border-slate-100 shadow-sm hover:border-yellow-400 hover:shadow-xl'
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-slate-900 text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest whitespace-nowrap z-20 shadow-md">
                  Best Seller
                </div>
              )}

              <div className="mb-6 sm:mb-8 flex flex-col">
                <span className={`font-[1000] text-slate-900 leading-tight tracking-tighter mb-1 ${
                  plan.price.length > 15 ? 'text-sm sm:text-xl' : 'text-xl sm:text-3xl'
                }`}>
                  {plan.price}
                </span>
                {plan.amount && (
                  <span className="font-black text-slate-600 text-base sm:text-xl">
                    Rp {plan.amount}
                  </span>
                )}
              </div>

              <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-slate-700 font-bold text-[10px] sm:text-sm leading-tight">
                    <div className="mt-0.5 mr-2 sm:mr-3 w-4 h-4 sm:w-5 sm:h-5 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={10} strokeWidth={4} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <a 
                  href={`${waUrl}?text=${encodeURIComponent(`Halo Visibel Agency, saya tertarik untuk memilih paket: ${plan.price}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3 sm:py-5 rounded-xl sm:rounded-2xl font-[900] text-center block transition-all text-[10px] sm:text-sm shadow-lg uppercase tracking-wider ${
                    plan.recommended 
                      ? 'bg-yellow-500 text-slate-900 hover:bg-yellow-600 shadow-yellow-500/20 active:scale-95' 
                      : 'bg-[#0f172a] text-white hover:bg-black shadow-slate-200/50 active:scale-95'
                  }`}
                >
                  PILIH PAKET
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
