
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, PenTool, Send, Image as ImageIcon, AlignLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { convertDriveUrl } from '../lib/utils';

const AdminArticle: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'visibel-admin') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Password salah!');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const article = {
      title,
      excerpt,
      content,
      image: convertDriveUrl(image),
      author: 'Admin Visibel',
      created_at: new Date().toISOString()
    };

    try {
      const { data, error: insertError } = await supabase
        .from('articles')
        .insert([article]);

      if (insertError) {
        throw insertError;
      }

      navigate('/articles');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'PGRST125' || err.message?.includes('Invalid path')) {
        setError('Tabel "articles" tidak ditemukan di Supabase. Pastikan Anda sudah menjalankan query SQL untuk membuat tabel tersebut.');
      } else {
        setError(err.message || 'Gagal menyimpan artikel');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-24 px-4">
        <div className="bg-white p-10 rounded-[32px] shadow-2xl w-full max-w-md border border-slate-100">
          <div className="w-16 h-16 bg-yellow-50 rounded-2xl flex items-center justify-center text-yellow-600 mb-8 mx-auto">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-black text-center mb-2 text-slate-900">Admin Area</h2>
          <p className="text-center text-slate-400 text-sm mb-8 font-bold uppercase tracking-widest">Hanya untuk internal Visibel</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-widest">Akses Kode</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-yellow-500 focus:bg-white outline-none transition-all font-bold"
                placeholder="Masukkan kode..."
              />
            </div>
            {error && <p className="text-red-500 text-center text-sm font-bold">{error}</p>}
            <button 
              type="submit" 
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black hover:bg-slate-800 transition-all uppercase tracking-widest text-sm"
            >
              Masuk
            </button>
          </form>
          <p className="mt-8 text-center text-slate-300 text-[10px] font-bold">PASSWORD DEFAULT: visibel-admin</p>
        </div>
      </div>
    );
  }

  return (
    <section className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-12 rounded-[40px] shadow-xl border border-slate-100">
          <h2 className="text-3xl font-black text-slate-900 mb-2 flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center text-slate-900">
               <PenTool size={24} />
            </div>
            Buat Artikel Baru
          </h2>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-12 ml-16">Tulis artikel untuk dibagikan ke website</p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2 uppercase tracking-widest">
                  <AlignLeft size={16} className="text-yellow-500" /> Judul Artikel
                </label>
                <input 
                  required
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-6 py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-yellow-500 focus:bg-white outline-none transition-all font-black text-xl text-slate-900"
                  placeholder="Contoh: 5 Cara Melejitkan Penjualan di Shopee..."
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2 uppercase tracking-widest">
                  <ImageIcon size={16} className="text-yellow-500" /> URL Gambar Cover
                </label>
                <input 
                  type="url" 
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-yellow-500 focus:bg-white outline-none transition-all font-bold text-slate-600"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700 mb-2 uppercase tracking-widest block">Ringkasan Singkat (Excerpt)</label>
                <textarea 
                  required
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-yellow-500 focus:bg-white outline-none transition-all font-bold text-slate-600 min-h-[100px]"
                  placeholder="Berikan ringkasan singkat artikel Anda..."
                />
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700 mb-2 uppercase tracking-widest block">Konten Artikel</label>
                <textarea 
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-6 py-6 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-yellow-500 focus:bg-white outline-none transition-all font-medium text-slate-700 min-h-[400px] leading-relaxed"
                  placeholder="Tulis seluruh isi artikel di sini..."
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                <p className="text-red-700 font-bold mb-2">{error}</p>
                {(error.includes('tabel') || error.includes('not found')) && (
                  <div className="mt-2">
                    <p className="text-xs text-red-600 mb-2 italic">Jalankan perintah ini di SQL Editor Supabase Anda:</p>
                    <pre className="bg-slate-900 text-slate-100 p-3 rounded text-[10px] overflow-x-auto">
{`CREATE TABLE IF NOT EXISTS public.articles (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  image TEXT,
  author TEXT DEFAULT 'Admin Visibel',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Create Policies
CREATE POLICY "Allow public read" ON public.articles FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON public.articles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON public.articles FOR UPDATE USING (true);`}
                    </pre>
                  </div>
                )}
              </div>
            )}

            <button 
              disabled={loading}
              type="submit" 
              className="w-full bg-slate-900 text-white py-6 rounded-2xl font-black hover:bg-slate-800 transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? 'DITERBITKAN...' : (
                <>
                  <Send size={20} className="text-yellow-500" /> 
                  Terbitkan Sekarang
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminArticle;
