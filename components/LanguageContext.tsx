import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'id' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  id: {
    'nav.services': 'Layanan',
    'nav.priceList': 'Price List',
    'nav.whyUs': 'Kenapa Kami',
    'nav.article': 'Article',
    'nav.career': 'Karir',
    'nav.calculator': 'Kalkulator Marketplace',
    'nav.profitCalc': 'Profit Marketplace',
    'nav.adsCalc': 'Real Ads Spend (PPN 11%)',
    'nav.freeConsult': 'Konsultasi Gratis',
    'hero.title1': 'Tingkatkan Revenue Bisnis Anda Lewat ',
    'hero.titleAccent': 'Strategi Digital',
    'hero.title2': ' yang Terukur',
    'hero.subheadline': 'Bantu Brand Owner & UMKM scale up bisnis di TikTok & Social Media dengan Live Streaming, Konten Viral, dan Performance Ads berbasis data.',
    'price.title': 'Investasikan Pertumbuhan Brand Anda',
    'price.choose': 'PILIH PAKET',
    'price.bestSeller': 'BEST SELLER',
    'price.custom': 'Custom Pricing'
  },
  en: {
    'nav.services': 'Services',
    'nav.priceList': 'Price List',
    'nav.whyUs': 'Why Us',
    'nav.article': 'Articles',
    'nav.career': 'Careers',
    'nav.calculator': 'Marketplace Calculator',
    'nav.profitCalc': 'Marketplace Profit',
    'nav.adsCalc': 'Real Ads Spend (VAT 11%)',
    'nav.freeConsult': 'Free Consultation',
    'hero.title1': 'Boost Your Business Revenue Through ',
    'hero.titleAccent': 'Measured Digital',
    'hero.title2': ' Strategies',
    'hero.subheadline': 'Helping Brand Owners & MSMEs scale up businesses on TikTok & Social Media with Live Streaming, Viral Content, and data-driven Performance Ads.',
    'price.title': 'Invest in Your Brand Growth',
    'price.choose': 'CHOOSE PLAN',
    'price.bestSeller': 'BEST SELLER',
    'price.custom': 'Custom Pricing'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('visibel_lang');
    return (saved === 'en' || saved === 'id') ? saved : 'id';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('visibel_lang', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
