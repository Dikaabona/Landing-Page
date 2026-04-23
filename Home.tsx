
import React from 'react';
import Hero from './components/Hero';
import AdsPerformance from './components/AdsPerformance';
import Services from './components/Services';
import PriceList from './components/PriceList';
import LiveStreamingResult from './components/LiveStreamingResult';
import LivestreamSetup from './components/LivestreamSetup';
import ShortVideos from './components/ShortVideos';
import Features from './components/Features';
import Clients from './components/Clients';
import VisiMisi from './components/VisiMisi';
import Contact from './components/Contact';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <AdsPerformance />
      <Services />
      <PriceList />
      <LiveStreamingResult />
      <LivestreamSetup />
      <ShortVideos />
      <Features />
      <Clients />
      <VisiMisi />
      <Contact />
    </>
  );
};

export default Home;
