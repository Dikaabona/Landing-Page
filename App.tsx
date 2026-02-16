
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Clients from './components/Clients';
import Features from './components/Features';
import PriceList from './components/PriceList';
import LivestreamSetup from './components/LivestreamSetup';
import VisiMisi from './components/VisiMisi';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <PriceList />
        <LivestreamSetup />
        <Features />
        <Clients />
        <VisiMisi />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
