
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-left">
          {/* Small yellow header removed based on screenshot feedback */}
          <h3 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">
            Partner Pertumbuhan Digital yang Fokus pada <span className="text-yellow-500">Hasil Nyata</span>
          </h3>
          <p className="text-xl text-slate-600 leading-relaxed">
            Visibel adalah agency digital marketing yang berfokus pada pertumbuhan brand melalui strategi live streaming, short video, dan performance ads. Kami hadir untuk membantu brand meningkatkan penjualan, awareness, dan konversi secara terukur and berbasis data.
          </p>
        </div>
        {/* Large image container removed based on screenshot feedback */}
      </div>
    </section>
  );
};

export default About;
