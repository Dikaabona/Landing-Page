
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, PenTool, Send, Image as ImageIcon, AlignLeft, Edit, Trash2, Plus, ArrowLeft, Tag, LogOut, AlertCircle } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { supabase } from '../lib/supabase';
import { convertDriveUrl, cleanArticleHtml } from '../lib/utils';
import { useAdmin, AUTHORIZED_ADMIN_EMAIL } from './AdminContext';
import { AdminPriceManager } from './AdminPriceManager';

const AdminArticle: React.FC = () => {
  const { isAdmin, adminEmail, loginAdmin, logoutAdmin } = useAdmin();
  const [emailInput, setEmailInput] = useState('');
  const [activeTab, setActiveTab] = useState<'articles' | 'prices'>('articles');
  const [view, setView] = useState<'list' | 'form'>('list');
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  
  const [imageMode, setImageMode] = useState<'upload' | 'url'>('upload');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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

  const processImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const targetWidth = 1200;
        const targetHeight = 675;
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Center crop algorithm to 16:9 Widescreen aspect ratio
          const targetRatio = targetWidth / targetHeight;
          const imgRatio = img.width / img.height;
          
          let sourceWidth = img.width;
          let sourceHeight = img.height;
          let sourceX = 0;
          let sourceY = 0;
          
          if (imgRatio > targetRatio) {
            // Image is wider than 16:9, crop left & right borders
            sourceWidth = img.height * targetRatio;
            sourceX = (img.width - sourceWidth) / 2;
          } else {
            // Image is taller than 16:9, crop top & bottom borders
            sourceHeight = img.width / targetRatio;
            sourceY = (img.height - sourceHeight) / 2;
          }
          
          // Clear canvas then draw the cropped image
          ctx.clearRect(0, 0, targetWidth, targetHeight);
          ctx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, targetWidth, targetHeight);
          
          // Export as highly-optimized base64
          const base64Url = canvas.toDataURL('image/jpeg', 0.85);
          setImage(base64Url);
          setImageMode('upload');
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processImageFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchArticles();
    }
  }, [isAdmin]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(emailInput)) {
      setError('');
      fetchArticles();
    } else {
      setError('Akses ditolak! Email ini tidak memiliki izin akses administrator.');
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
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: cleanArticleHtml(content),
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

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-24 px-4 pb-12">
        <div className="bg-white p-8 sm:p-10 rounded-[32px] shadow-2xl w-full max-w-md border border-slate-100">
          <div className="w-16 h-16 bg-yellow-500 text-slate-900 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-md">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-2xl font-black text-center mb-1 text-slate-900">Admin Area Visibel</h2>
          <p className="text-center text-slate-400 text-xs mb-8 font-bold uppercase tracking-widest">
            Verifikasi Otorisasi Email
          </p>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-widest flex items-center gap-1.5">
                <Mail size={14} className="text-yellow-600" />
                Alamat Email Administrator
              </label>
              <input 
                type="email" 
                required
                value={emailInput}
                onChange={(e) => {
                  setEmailInput(e.target.value);
                  if (error) setError('');
                }}
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-yellow-500 focus:bg-white outline-none transition-all font-bold text-sm text-slate-900"
                placeholder="masukkan email admin..."
                autoFocus
              />
            </div>
            
            {error && (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-2.5 text-red-600 text-xs font-bold">
                <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button 
              type="submit" 
              className="w-full bg-slate-900 hover:bg-slate-800 text-yellow-400 py-4.5 rounded-2xl font-black transition-all uppercase tracking-widest text-xs shadow-lg active:scale-95 flex items-center justify-center gap-2"
            >
              <ShieldCheck size={16} /> Verifikasi & Masuk
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-xs font-bold text-slate-500 hover:text-slate-900 inline-flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft size={13} /> Kembali ke Halaman Utama
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="pt-28 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Tabs Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between bg-white p-3 sm:p-4 rounded-3xl border border-slate-200/80 shadow-sm mb-8 gap-4">
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => { setActiveTab('articles'); setView('list'); }}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all whitespace-nowrap ${
                activeTab === 'articles'
                  ? 'bg-slate-900 text-yellow-400 shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <PenTool size={16} /> Kelola Artikel
            </button>
            <button
              onClick={() => setActiveTab('prices')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all whitespace-nowrap ${
                activeTab === 'prices'
                  ? 'bg-slate-900 text-yellow-400 shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Tag size={16} /> Kelola Price List
            </button>
          </div>

          {/* Admin User Info & Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-yellow-50 text-yellow-900 px-3.5 py-2 rounded-xl border border-yellow-200 text-xs font-bold">
              <ShieldCheck size={14} className="text-yellow-600" />
              <span className="truncate max-w-[200px]">{adminEmail || AUTHORIZED_ADMIN_EMAIL}</span>
            </div>

            <button
              onClick={() => navigate('/')}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 px-3.5 py-2.5 rounded-xl border border-slate-200 transition-colors"
            >
              <ArrowLeft size={14} className="text-yellow-600" /> Website
            </button>

            <button
              onClick={logoutAdmin}
              className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1.5 bg-red-50 hover:bg-red-100 px-3.5 py-2.5 rounded-xl border border-red-200 transition-colors"
              title="Keluar dari mode admin"
            >
              <LogOut size={14} /> Keluar
            </button>
          </div>
        </div>

        {activeTab === 'prices' ? (
          <AdminPriceManager />
        ) : view === 'list' ? (
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
                    <ImageIcon size={16} className="text-yellow-500" /> Gambar Cover Artikel (Rasio Widescreen 16:9, Output 1200px x 675px)
                  </label>
                  
                  {/* Tabs options for image upload */}
                  <div className="flex gap-2 p-1 bg-slate-100 rounded-xl mb-4 max-w-sm">
                    <button
                      type="button"
                      onClick={() => setImageMode('upload')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                        imageMode === 'upload' 
                          ? 'bg-white text-slate-900 shadow-sm' 
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      Upload File
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageMode('url')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                        imageMode === 'url' 
                          ? 'bg-white text-slate-900 shadow-sm' 
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      Input URL Manual
                    </button>
                  </div>

                  {imageMode === 'upload' ? (
                    <div 
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-[32px] p-8 text-center cursor-pointer transition-all duration-300 ${
                        dragActive 
                          ? 'border-yellow-500 bg-yellow-50/30' 
                          : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      <input 
                        ref={fileInputRef}
                        type="file" 
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      
                      {image && (image.startsWith('data:image') || image.startsWith('blob:')) ? (
                        <div className="space-y-4 w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
                          <div className="relative group/thumb w-full max-w-sm">
                            <img 
                              src={image} 
                              alt="Cover Preview" 
                              className="w-full aspect-video rounded-2xl object-cover border border-slate-150 shadow-md"
                            />
                            <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="text-white text-xs font-black uppercase tracking-widest bg-slate-900/80 px-3 py-1.5 rounded-lg text-[10px]">1200 x 675 px</span>
                            </div>
                          </div>
                          <div className="text-center">
                            <p className="text-xs font-bold text-emerald-600 flex items-center justify-center gap-1">
                              ✓ Gambar siap di-upload (Format 16:9 - 1200x675)
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                  e.stopPropagation();
                                  fileInputRef.current?.click();
                              }}
                              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all border border-slate-200"
                            >
                              Ganti Gambar
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setImage('');
                              }}
                              className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-bold transition-all"
                            >
                              Hapus
                            </button>
                          </div>
                        </div>
                      ) : image ? (
                        /* If there's an existing non-base64 external image (e.g. standard edit load or URL input mode) */
                        <div className="space-y-4 w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
                          <div className="relative group/thumb w-full max-w-sm">
                            <img 
                              src={convertDriveUrl(image)} 
                              alt="Cover Preview" 
                              className="w-full aspect-video rounded-2xl object-cover border border-slate-150 shadow-md"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                fileInputRef.current?.click();
                              }}
                              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all border border-slate-200"
                            >
                              Upload File Baru
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setImage('');
                              }}
                              className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-bold transition-all"
                            >
                              Hapus
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="mx-auto w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-400">
                            <ImageIcon size={28} className="text-slate-400" />
                          </div>
                          <div>
                            <p className="text-base font-black text-slate-800">Tarik & Lepas gambar di sini, atau <span className="text-yellow-600 underline">pilih file</span></p>
                            <p className="text-xs text-slate-400 mt-2 font-bold uppercase tracking-widest">Rekomendasi ukuran: 1200px x 675px (Rasio 16:9 - Otomatis Di-Crop &amp; Resize)</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <input 
                        type="url" 
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-yellow-500 focus:bg-white outline-none transition-all font-bold text-slate-600"
                        placeholder="Contoh: https://images.unsplash.com/..."
                      />
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                        ⚠️ Harap gunakan URL gambar publik yang valid (contoh: Unsplash). Hindari URL Google Drive karena rentan diblokir/gagal termuat.
                      </p>
                      {image && (
                        <div className="mt-4 flex flex-col items-center">
                          <img 
                            src={convertDriveUrl(image)} 
                            alt="URL Preview" 
                            className="w-full aspect-video max-w-sm rounded-2xl object-cover border border-slate-200 shadow-sm"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800';
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => setImage('')}
                            className="mt-2 px-4 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-bold transition-all"
                          >
                            Hapus URL
                          </button>
                        </div>
                      )}
                    </div>
                  )}
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

