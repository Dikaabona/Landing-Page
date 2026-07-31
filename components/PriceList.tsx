import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { PricePlan, defaultPricePlans, calculateDiscountPercentage } from './priceData';
import { supabase } from '../lib/supabase';

export const PriceList: React.FC = () => {
  const { language, t } = useLanguage();
  const waUrl = "https://wa.me/628111743005";

  const [plans, setPlans] = useState<PricePlan[]>(() => {
    const saved = localStorage.getItem('visibel_price_plans');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse cached price plans', e);
      }
    }
    return defaultPricePlans;
  });

  useEffect(() => {
    fetchPricePlans();
  }, []);

  const fetchPricePlans = async () => {
    try {
      const { data, error } = await supabase
        .from('price_plans')
        .select('*')
        .order('order', { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        const formattedPlans: PricePlan[] = data.map((item: any) => ({
          id: item.id,
          title_id: item.title_id || item.price,
          title_en: item.title_en || item.price,
          amount: item.amount,
          original_amount: item.original_amount || '',
          discount_percentage: item.discount_percentage || '',
          features_id: Array.isArray(item.features_id) ? item.features_id : (Array.isArray(item.features) ? item.features : []),
          features_en: Array.isArray(item.features_en) ? item.features_en : (Array.isArray(item.features) ? item.features : []),
          recommended: Boolean(item.recommended),
          order: item.order || 1,
        }));
        setPlans(formattedPlans);
        localStorage.setItem('visibel_price_plans', JSON.stringify(formattedPlans));
      }
    } catch (err) {
      console.warn('Using local cached price plans:', err);
    }
  };

  return (
    <section id="price-list" className="py-24 bg-white scroll-mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section */}
        <div className="flex flex-col items-center justify-center text-center mb-16 relative">
          <h2 className="text-yellow-600 font-bold tracking-widest uppercase text-sm mb-4">
            {language === 'en' ? 'PRICE PLANS & INVESTMENT' : 'PAKET HARGA & INVESTASI'}
          </h2>

          <h3 className="text-[24px] sm:text-4xl md:text-5xl font-[900] text-slate-900 leading-tight">
            {t('price.title')}
          </h3>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
          {plans.map((plan) => {
            const title = language === 'en' ? plan.title_en || plan.title_id : plan.title_id;
            const features = language === 'en' ? plan.features_en || plan.features_id : plan.features_id;

            // Auto-calculate discount percentage if not manually specified
            const autoDiscountPct = calculateDiscountPercentage(plan.amount, plan.original_amount);
            const discountLabel = plan.discount_percentage || (autoDiscountPct ? `${language === 'en' ? 'SAVE' : 'HEMAT'} ${autoDiscountPct}` : null);

            return (
              <div 
                key={plan.id} 
                className={`relative bg-white rounded-[24px] sm:rounded-[40px] px-5 pb-5 pt-6 sm:px-8 sm:pb-8 sm:pt-10 border flex flex-col h-full transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.01] group ${
                  plan.recommended 
                    ? 'border-yellow-500 ring-4 ring-yellow-500/10 z-10 shadow-2xl shadow-yellow-500/20' 
                    : 'border-slate-100 shadow-sm hover:border-yellow-400 hover:shadow-xl'
                }`}
              >
                {/* Best Seller Badge */}
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-slate-900 text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest whitespace-nowrap z-20 shadow-md">
                    {t('price.bestSeller')}
                  </div>
                )}

                <div className="mb-6 sm:mb-8 flex flex-col">
                  {/* Plan Name */}
                  <span className={`font-[1000] text-slate-900 leading-tight tracking-tighter mb-2 ${
                    title.length > 15 ? 'text-lg sm:text-xl' : 'text-xl sm:text-3xl'
                  }`}>
                    {title}
                  </span>

                  {/* Pricing Box with Strikethrough & Discount Tag */}
                  <div className="flex flex-col space-y-1">
                    {/* Strikethrough Price (Harga Coret) & Discount Pill */}
                    {plan.original_amount && (
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="line-through text-slate-400 font-bold text-xs sm:text-sm">
                          {isNaN(Number(plan.original_amount.replace(/\./g, ''))) ? plan.original_amount : `Rp ${plan.original_amount}`}
                        </span>
                        {discountLabel && (
                          <span className="bg-red-500 text-white text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm animate-pulse">
                            {discountLabel}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Main Price (Harga Utama) */}
                    {plan.amount && (
                      <span className="font-black text-slate-900 text-xl sm:text-2xl tracking-tight">
                        {isNaN(Number(plan.amount.replace(/\./g, ''))) ? plan.amount : `Rp ${plan.amount}`}
                      </span>
                    )}
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 flex-grow">
                  {features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-slate-700 font-bold text-[10px] sm:text-sm leading-tight">
                      <div className="mt-0.5 mr-2 sm:mr-3 w-4 h-4 sm:w-5 sm:h-5 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check size={10} strokeWidth={4} />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Call To Action Button */}
                <div className="mt-auto">
                  <a 
                    href={`${waUrl}?text=${encodeURIComponent(`Halo Visibel Agency, saya tertarik untuk memilih paket: ${title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3 sm:py-5 rounded-xl sm:rounded-2xl font-[900] text-center block transition-all text-[10px] sm:text-sm shadow-lg uppercase tracking-wider ${
                      plan.recommended 
                        ? 'bg-yellow-500 text-slate-900 hover:bg-yellow-600 shadow-yellow-500/20 active:scale-95' 
                        : 'bg-[#0f172a] text-white hover:bg-black shadow-slate-200/50 active:scale-95'
                    }`}
                  >
                    {t('price.choose')}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PriceList;
