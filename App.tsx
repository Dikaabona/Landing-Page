import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AdsPerformance from './components/AdsPerformance';
import Services from './components/Services';
import Clients from './components/Clients';
import Features from './components/Features';
import PriceList from './components/PriceList';
import LivestreamSetup from './components/LivestreamSetup';
import ShortVideos from './components/ShortVideos';
import VisiMisi from './components/VisiMisi';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <AdsPerformance />
        {/* Stats component removed per user request (hapus) */}
        <PriceList />
        <LivestreamSetup />
        <ShortVideos />
        <Features />
        <Clients />
        <VisiMisi />
        {/* Services diletakkan di bawah sesuai feedback layout visual */}
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;