
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChevronRight, BookOpen } from 'lucide-react';
import { supabase } from '../lib/supabase';

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

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching articles:', error);
      } else {
        setArticles(data || []);
      }
      setLoading(false);
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

  return (
    <section className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-yellow-600 font-bold tracking-widest uppercase text-sm mb-4">INSIGHTS & UPDATES</h2>
          <h3 className="text-3xl sm:text-5xl font-[900] text-slate-900 leading-tight">Visibel Article</h3>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto font-medium">
            Temukan tips, trik, dan berita terbaru seputar dunia marketplace dan strategi digital marketing.
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[32px] border-2 border-dashed border-slate-200">
            <BookOpen className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="text-slate-500 font-bold">Belum ada artikel yang diterbitkan.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div key={article.id} className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                <div className="aspect-video bg-slate-200 relative overflow-hidden">
                  <img 
                    src={article.image || "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800"} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-yellow-500 text-slate-900 text-[10px] font-black px-3 py-1 rounded-full uppercase">
                    Edukasi
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-4">
                    <Calendar size={14} />
                    {new Date(article.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                  <h4 className="text-xl font-black text-slate-900 mb-4 line-clamp-2 leading-tight group-hover:text-yellow-500 transition-colors">
                    {article.title}
                  </h4>
                  <p className="text-slate-500 text-sm mb-8 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <Link 
                    to={`/article/${article.id}`}
                    className="flex items-center gap-2 text-slate-900 font-black text-sm uppercase tracking-widest group/btn"
                  >
                    Selengkapnya 
                    <ChevronRight size={16} className="text-yellow-500 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ArticleList;
