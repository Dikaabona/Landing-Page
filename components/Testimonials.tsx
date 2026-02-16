
import React from 'react';
import { Quote, Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Siska Pratama",
      role: "Owner Fashion Brand",
      text: "Sejak handle live streaming sama Visibel, omzet harian kami naik 4x lipat dalam sebulan. Host-nya sangat enerjik dan tahu cara jualan!",
      avatar: "https://picsum.photos/seed/p1/100/100"
    },
    {
      name: "Andi Wijaya",
      role: "Founder Beauty Skincare",
      text: "Content short video mereka bener-bener viral dan menghasilkan banyak pembeli baru. Strategi ads-nya juga transparan banget ROI-nya.",
      avatar: "https://picsum.photos/seed/p2/100/100"
    },
    {
      name: "Budi Santoso",
      role: "CEO F&B Group",
      text: "Partner terbaik untuk scale up bisnis di TikTok. Timnya responsif dan data yang diberikan sangat detail untuk planning ke depan.",
      avatar: "https://picsum.photos/seed/p3/100/100"
    }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-yellow-600 font-bold tracking-wider uppercase text-sm mb-4">Testimonial</h2>
          <h3 className="text-3xl font-extrabold text-slate-900">Apa Kata Mereka Tentang Kami?</h3>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="flex space-x-1 text-yellow-500 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                </div>
                <Quote className="text-yellow-100 mb-4" size={48} />
                <p className="text-slate-700 italic mb-8 leading-relaxed">"{t.text}"</p>
              </div>
              <div className="flex items-center space-x-4 border-t pt-6">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-yellow-50" />
                <div>
                  <h4 className="font-bold text-slate-900">{t.name}</h4>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;