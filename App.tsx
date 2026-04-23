
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './Home';
import Calculator from './components/Calculator';
import AdsCalculator from './components/AdsCalculator';
import ArticleList from './components/ArticleList';
import ArticleDetail from './components/ArticleDetail';
import AdminArticle from './components/AdminArticle';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/kalkulator" element={<Calculator />} />
            <Route path="/kalkulator-ads" element={<AdsCalculator />} />
            <Route path="/articles" element={<ArticleList />} />
            <Route path="/article/:id" element={<ArticleDetail />} />
            <Route path="/admin" element={<AdminArticle />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
