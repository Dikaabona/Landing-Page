
import React from 'react';
import { useLanguage } from './LanguageContext';

const About: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-left">
          {/* Small yellow header removed based on screenshot feedback */}
          <h3 className="text-[24px] sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 sm:mb-8 leading-tight">
            {language === 'en' ? (
              <>
                Digital Growth Partner Focused on <span className="text-yellow-500">Real Results</span>
              </>
            ) : (
              <>
                Partner Pertumbuhan Digital yang Fokus pada <span className="text-yellow-500">Hasil Nyata</span>
              </>
            )}
          </h3>
          <p className="text-sm sm:text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
            {language === 'en'
              ? 'Visibel is a digital marketing agency that focuses on brand growth through live streaming, short video, and performance ads strategies. We are here to help brands increase sales, awareness, and conversions in a measurable and data-driven way.'
              : 'Visibel adalah agency digital marketing yang berfokus pada pertumbuhan brand melalui strategi live streaming, short video, dan performance ads. Kami hadir untuk membantu brand meningkatkan penjualan, awareness, dan konversi secara terukur and berbasis data.'}
          </p>
        </div>
        {/* Large image container removed based on screenshot feedback */}
      </div>
    </section>
  );
};

export default About;
