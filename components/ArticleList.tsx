
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChevronRight, BookOpen, ChevronLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { convertDriveUrl } from '../lib/utils';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  created_at: string;
  image?: string;
}

const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          // Handle missing table or connection error specifically
          if (error.code === 'PGRST125' || error.message.includes('not found')) {
            console.warn('Articles table might be missing in Supabase.');
            setArticles([]);
          } else {
            console.error('Error fetching articles:', error);
          }
        } else {
          setArticles(data || []);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="pt-24 sm:pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-yellow-600 font-bold tracking-widest uppercase text-[10px] sm:text-sm mb-3 sm:mb-4">INSIGHTS & UPDATES</h2>
          <h3 className="text-3xl sm:text-5xl font-[900] text-slate-900 leading-tight">Visibel Article</h3>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto font-medium text-sm sm:text-base px-4">
            Temukan tips, trik, dan berita terbaru seputar dunia marketplace dan strategi digital marketing.
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[32px] border-2 border-dashed border-slate-200">
            <BookOpen className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="text-slate-500 font-bold">Belum ada artikel yang diterbitkan.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
              {currentArticles.map((article) => (
                <div key={article.id} className="bg-white rounded-2xl sm:rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group h-full flex flex-col">
                  <div className="aspect-video bg-slate-200 relative overflow-hidden">
                    <img 
                      src={convertDriveUrl(article.image) || "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800"} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-yellow-500 text-slate-900 text-[8px] sm:text-[10px] font-black px-2 sm:px-3 py-0.5 sm:py-1 rounded-full uppercase">
                      Edukasi
                    </div>
                  </div>
                  <div className="p-3 sm:p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-slate-400 text-[8px] sm:text-xs font-bold mb-2 sm:mb-4">
                      <Calendar size={12} className="text-yellow-500 sm:w-3.5 sm:h-3.5" />
                      {new Date(article.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                    <h4 className="text-[13px] sm:text-xl font-black text-slate-900 mb-2 sm:mb-4 line-clamp-2 leading-tight group-hover:text-yellow-500 transition-colors">
                      {article.title}
                    </h4>
                    <p className="text-slate-500 text-[10px] sm:text-sm mb-4 sm:mb-8 line-clamp-2 sm:line-clamp-3 leading-relaxed hidden sm:block">
                      {article.excerpt}
                    </p>
                    <div className="mt-auto">
                      <Link 
                        to={`/article/${article.id}`}
                        className="flex items-center gap-1 sm:gap-2 text-slate-900 font-black text-[10px] sm:text-sm uppercase tracking-widest group/btn"
                      >
                        <span className="sm:inline hidden">Selengkapnya</span>
                        <span className="sm:hidden">Baca</span>
                        <ChevronRight size={14} className="text-yellow-500 group-hover/btn:translate-x-1 transition-transform sm:w-4 sm:h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-16 flex items-center justify-center gap-2">
                <button
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
                
                <div className="flex items-center gap-1 sm:gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl font-black text-sm sm:text-base transition-all ${
                        currentPage === number 
                          ? 'bg-yellow-500 text-slate-900 border-none' 
                          : 'bg-white border border-slate-100 text-slate-400 hover:text-slate-900'
                      }`}
                    >
                      {number}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ArticleList;
