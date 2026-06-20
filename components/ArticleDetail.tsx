
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft, User, Share2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { convertDriveUrl } from '../lib/utils';

interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  created_at: string;
  image?: string;
}

const ArticleDetail: React.FC = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          if (error.code === 'PGRST125' || error.message.includes('not found')) {
            console.warn('Articles table might be missing in Supabase.');
          } else {
            console.error('Error fetching article:', error);
          }
        } else {
          setArticle(data);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen pt-32 pb-24 bg-white text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-black text-slate-900 mb-8">Artikel Tidak Ditemukan</h1>
          <Link to="/articles" className="inline-flex items-center gap-2 text-yellow-600 font-bold hover:text-yellow-700">
            <ArrowLeft size={20} /> Kembali ke Daftar Artikel
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="pt-24 sm:pt-32 pb-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
        <Link to="/articles" className="inline-flex items-center gap-2 text-slate-400 font-bold hover:text-slate-900 transition-colors mb-8 sm:mb-12 uppercase tracking-widest text-[10px] sm:text-xs">
          <ArrowLeft size={16} className="text-yellow-500" /> Kembali
        </Link>

        <header className="mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-6xl font-black text-slate-900 mb-6 sm:mb-8 leading-[1.1] tracking-tight">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 py-6 sm:py-8 border-y border-slate-100">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-yellow-500 flex items-center justify-center text-slate-900">
                <User size={16} className="sm:w-5 sm:h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-slate-400 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">Penulis</span>
                <span className="text-slate-900 font-bold text-xs sm:text-base">{article.author}</span>
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-slate-400 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">Diterbitkan</span>
              <span className="text-slate-900 font-bold flex items-center gap-2 text-xs sm:text-base">
                <Calendar size={14} className="text-yellow-500" />
                {new Date(article.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>

            <button className="ml-auto p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 text-slate-400 hover:text-slate-900 transition-colors">
              <Share2 size={18} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        </header>

        {article.image && (
          <div className="aspect-video rounded-2xl sm:rounded-[40px] overflow-hidden mb-12 sm:mb-16 shadow-2xl">
            <img 
              src={convertDriveUrl(article.image)} 
              alt="" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        <div 
          className="prose prose-slate sm:prose-lg max-w-full article-content prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed prose-strong:text-slate-900 prose-img:rounded-3xl prose-img:shadow-lg"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <footer className="mt-20 pt-12 border-t border-slate-100">
          <div className="bg-slate-900 rounded-[32px] p-8 sm:p-12 text-center text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
             <h4 className="text-2xl font-black mb-4">Ingin Optimasi Marketplace?</h4>
             <p className="text-slate-400 mb-8 max-w-lg mx-auto">Konsultasikan strategi toko Anda dengan tim ahli Visibel Agency sekarang juga.</p>
             <a 
               href="https://wa.me/628111743005" 
               target="_blank" 
               rel="noopener noreferrer"
               className="inline-block bg-yellow-500 text-slate-900 px-10 py-5 rounded-2xl font-black hover:bg-yellow-400 transition-all uppercase tracking-widest text-sm"
             >
               Hubungi Kami Gratis
             </a>
          </div>
        </footer>
      </div>
    </article>
  );
};

export default ArticleDetail;
