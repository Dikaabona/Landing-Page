
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, PenTool, Send, Image as ImageIcon, AlignLeft, Edit, Trash2, Plus, ArrowLeft } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { supabase } from '../lib/supabase';
import { convertDriveUrl } from '../lib/utils';

const AdminArticle: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState<'list' | 'form'>('list');
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link', 'image'
  ];

  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'visibel-admin') {
      setIsAuthenticated(true);
      setError('');
      fetchArticles();
    } else {
      setError('Password salah!');
    }
  };

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const { data, error: fetchError } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setArticles(data || []);
    } catch (err: any) {
      console.error(err);
      setError('Gagal memuat daftar artikel');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setExcerpt('');
    setContent('');
    setImage('');
    setEditingId(null);
  };

  const handleEdit = (article: any) => {
    setTitle(article.title);
    setExcerpt(article.excerpt);
    setContent(article.content);
    setImage(article.image || '');
    setEditingId(article.id);
    setView('form');
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus artikel ini?')) return;
    
    setLoading(true);
    try {
      const { error: deleteError } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      
      setArticles(articles.filter(a => a.id !== id));
      alert('Artikel berhasil dihapus');
    } catch (err: any) {
      console.error(err);
      setError('Gagal menghapus artikel');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const articleData = {
      title,
      excerpt,
      content,
      image: convertDriveUrl(image),
      author: 'Admin Visibel',
    };

    try {
      if (editingId) {
        // Update existing
        const { error: updateError } = await supabase
          .from('articles')
          .update(articleData)
          .eq('id', editingId);

        if (updateError) throw updateError;
        alert('Artikel berhasil diperbarui!');
      } else {
        // Create new
        const { error: insertError } = await supabase
          .from('articles')
          .insert([{ ...articleData, created_at: new Date().toISOString() }]);

        if (insertError) throw insertError;
        alert('Artikel berhasil diterbitkan!');
      }

      resetForm();
      setView('list');
      fetchArticles();
    } catch (err: any) {
      console.error(err);
      if (err.code === 'PGRST125' || err.message?.includes('Invalid path') || err.message?.includes('permission denied')) {
        setError('Masalah Database: Pastikan tabel "articles" dan kebijakan akses (RLS) sudah diatur dengan benar di Supabase.');
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
        
        {view === 'list' ? (
          /* LIST VIEW */
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <h2 className="text-3xl font-black text-slate-900 flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center text-slate-900">
                     <PenTool size={24} />
                  </div>
                  Kelola Artikel
                </h2>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] sm:ml-16">Total: {articles.length} Artikel</p>
              </div>
              <button 
                onClick={() => { resetForm(); setView('form'); }}
                className="bg-slate-900 text-white px-6 py-4 rounded-2xl font-black hover:bg-slate-800 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2"
              >
                <Plus size={18} className="text-yellow-500" />
                Tambah Artikel
              </button>
            </div>

            {loading && articles.length === 0 ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
              </div>
            ) : (
              <div className="grid gap-4">
                {articles.map((article) => (
                  <div key={article.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:shadow-md transition-all">
                    <div className="flex items-center gap-4">
                      {article.image && (
                        <img 
                          src={convertDriveUrl(article.image)} 
                          alt={article.title} 
                          className="w-16 h-16 rounded-xl object-cover border border-slate-100 flex-shrink-0"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      <div>
                        <h3 className="font-black text-slate-900 line-clamp-1">{article.title}</h3>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
                          {new Date(article.created_at).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleEdit(article)}
                        className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-all"
                        title="Edit Artikel"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(article.id)}
                        className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all"
                        title="Hapus Artikel"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
                {articles.length === 0 && (
                  <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-slate-200">
                    <p className="text-slate-400 font-bold">Belum ada artikel. Klik tombol Tambah Artikel.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* FORM VIEW */
          <div className="bg-white p-8 sm:p-12 rounded-[40px] shadow-xl border border-slate-100">
            <button 
              onClick={() => setView('list')}
              className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold uppercase tracking-widest text-[10px] mb-8 transition-colors"
            >
              <ArrowLeft size={14} /> Kembali ke Daftar
            </button>
            
            <h2 className="text-3xl font-black text-slate-900 mb-2 flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center text-slate-900">
                 <PenTool size={24} />
              </div>
              {editingId ? 'Edit Artikel' : 'Buat Artikel Baru'}
            </h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-12 ml-16">
              {editingId ? 'Ubah konten artikel yang sudah ada' : 'Tulis artikel untuk dibagikan ke website'}
            </p>

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
                  <div className="bg-slate-50 rounded-2xl overflow-hidden border-2 border-transparent focus-within:border-yellow-500 focus-within:bg-white transition-all">
                    <ReactQuill 
                      theme="snow"
                      value={content}
                      onChange={setContent}
                      modules={modules}
                      formats={formats}
                      className="min-h-[400px] font-medium text-slate-700"
                      placeholder="Tulis seluruh isi artikel di sini..."
                    />
                  </div>
                  <style>{`
                    .quill {
                      border: none !important;
                    }
                    .ql-toolbar {
                      border: none !important;
                      border-bottom: 1px solid #f1f5f9 !important;
                      background: #f8fafc;
                    }
                    .ql-container {
                      border: none !important;
                      font-family: 'Inter', sans-serif !important;
                      font-size: 1rem !important;
                    }
                    .ql-editor {
                      min-height: 400px;
                      padding: 1.5rem !important;
                    }
                    .ql-editor.ql-blank::before {
                      left: 1.5rem !important;
                      color: #94a3b8 !important;
                      font-style: normal !important;
                    }
                  `}</style>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                  <p className="text-red-700 font-bold mb-2">{error}</p>
                  {(error.includes('Database') || error.includes('permission')) && (
                    <div className="mt-4">
                      <p className="text-[10px] text-red-600 mb-2 font-bold uppercase tracking-widest">Jalankan perintah ini di SQL Editor Supabase Anda untuk memperbaiki:</p>
                      <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-[10px] overflow-x-auto leading-relaxed shadow-inner">
{`-- 1. Buat Tabel Articles jika belum ada
CREATE TABLE IF NOT EXISTS public.articles (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  image TEXT,
  author TEXT DEFAULT 'Admin Visibel',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Aktifkan RLS
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- 3. Atur Kebijakan Akses (RLS)
DROP POLICY IF EXISTS "Allow public read" ON public.articles;
CREATE POLICY "Allow public read" ON public.articles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert" ON public.articles;
CREATE POLICY "Allow public insert" ON public.articles FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update" ON public.articles;
CREATE POLICY "Allow public update" ON public.articles FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public delete" ON public.articles;
CREATE POLICY "Allow public delete" ON public.articles FOR DELETE USING (true);`}
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
                {loading ? 'MENYIMPAN...' : (
                  <>
                    <Send size={20} className="text-yellow-500" /> 
                    {editingId ? 'Update Artikel' : 'Terbitkan Sekarang'}
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminArticle;

