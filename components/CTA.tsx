
import React from 'react';
import { MessageSquare } from 'lucide-react';

const CTA: React.FC = () => {
  const waUrl = "https://wa.me/628111743005";

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-yellow-500 rounded-[40px] p-12 lg:p-20 text-center relative overflow-hidden">
           {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/20 rounded-full -ml-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 rounded-full -mr-32 -mb-32 blur-3xl"></div>
          
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            Siap Scale Bisnis Anda <br className="hidden sm:block" /> Bersama Visibel?
          </h2>
          <p className="text-xl text-slate-800 mb-10 max-w-2xl mx-auto font-medium">
            Diskusikan kebutuhan brand Anda sekarang juga bersama tim kami dan dapatkan audit digital gratis.
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-slate-900 text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-black transition-all shadow-2xl hover:scale-105"
          >
            <MessageSquare className="mr-3" />
            Konsultasi Gratis Sekarang
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;
