import React, { useState, useEffect } from 'react';
import { Tag, Plus, Edit, Trash2, RefreshCw, Save, Percent, Check, X, ShieldCheck, Sparkles, AlertCircle, Database, Copy, ExternalLink, CheckCircle2 } from 'lucide-react';
import { PricePlan, defaultPricePlans, calculateDiscountPercentage, formatPriceInput } from './priceData';
import { supabase } from '../lib/supabase';

export const AdminPriceManager: React.FC = () => {
  const [plans, setPlans] = useState<PricePlan[]>(() => {
    const saved = localStorage.getItem('visibel_price_plans');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse cached price plans', e);
      }
    }
    return defaultPricePlans;
  });

  const [loading, setLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PricePlan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSqlModalOpen, setIsSqlModalOpen] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'warning' | 'error' } | null>(null);
  const [dbConnected, setDbConnected] = useState<boolean | null>(null);

  useEffect(() => {
    fetchPricePlans();
  }, []);

  const fetchPricePlans = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('price_plans')
        .select('*')
        .order('order', { ascending: true });

      if (error) {
        setDbConnected(false);
        throw error;
      }

      setDbConnected(true);

      if (data && data.length > 0) {
        const formattedPlans: PricePlan[] = data.map((item: any) => ({
          id: item.id,
          title_id: item.title_id || item.price || '',
          title_en: item.title_en || item.price || '',
          amount: item.amount,
          original_amount: item.original_amount || '',
          discount_percentage: item.discount_percentage || '',
          features_id: Array.isArray(item.features_id) ? item.features_id : (Array.isArray(item.features) ? item.features : []),
          features_en: Array.isArray(item.features_en) ? item.features_en : (Array.isArray(item.features) ? item.features : []),
          recommended: Boolean(item.recommended),
          order: item.order || 1,
        }));
        setPlans(formattedPlans);
        localStorage.setItem('visibel_price_plans', JSON.stringify(formattedPlans));
      }
    } catch (err: any) {
      console.warn('Supabase fetch note:', err?.message || err);
      setDbConnected(false);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewPlan = () => {
    const newPlan: PricePlan = {
      id: `plan-${Date.now()}`,
      title_id: 'Paket Baru',
      title_en: 'New Package',
      amount: '5.000.000',
      original_amount: '7.000.000',
      discount_percentage: '28%',
      features_id: ['Layanan profesional', 'Garansi hasil', 'Laporan mingguan'],
      features_en: ['Professional service', 'Guaranteed results', 'Weekly report'],
      recommended: false,
      order: plans.length + 1,
    };
    setEditingPlan(newPlan);
    setIsModalOpen(true);
  };

  const handleEditClick = (plan: PricePlan) => {
    const copy: PricePlan = JSON.parse(JSON.stringify(plan));
    if (copy.amount) copy.amount = formatPriceInput(copy.amount);
    if (copy.original_amount) copy.original_amount = formatPriceInput(copy.original_amount);
    setEditingPlan(copy);
    setIsModalOpen(true);
  };

  const handleResetToDefault = () => {
    if (!window.confirm('Apakah Anda yakin ingin mengembalikan daftar paket harga ke standar awal?')) return;
    setPlans(defaultPricePlans);
    localStorage.setItem('visibel_price_plans', JSON.stringify(defaultPricePlans));
    syncToSupabase(defaultPricePlans);
  };

  const handleSavePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan) return;

    const updatedPlans = [...plans];
    const existingIndex = updatedPlans.findIndex((p) => p.id === editingPlan.id);

    if (existingIndex >= 0) {
      updatedPlans[existingIndex] = editingPlan;
    } else {
      updatedPlans.push(editingPlan);
    }

    setPlans(updatedPlans);
    localStorage.setItem('visibel_price_plans', JSON.stringify(updatedPlans));
    setIsModalOpen(false);

    await syncToSupabase(updatedPlans, editingPlan);
  };

  const handleDeletePlan = async (id: string) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus paket harga ini?')) return;
    const updatedPlans = plans.filter((p) => p.id !== id);
    setPlans(updatedPlans);
    localStorage.setItem('visibel_price_plans', JSON.stringify(updatedPlans));
    setIsModalOpen(false);

    try {
      await supabase.from('price_plans').delete().eq('id', id);
      setStatusMessage({ text: 'Paket berhasil dihapus dari Database.', type: 'success' });
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const syncToSupabase = async (allPlans: PricePlan[], targetPlan?: PricePlan) => {
    setIsSyncing(true);
    setStatusMessage({ text: 'Sedang menyinkronkan ke Database Supabase Cloud...', type: 'warning' });
    
    try {
      const itemsToUpsert = targetPlan ? [targetPlan] : allPlans;
      
      const upsertPayload = itemsToUpsert.map((item) => ({
        id: item.id,
        title_id: item.title_id,
        title_en: item.title_en,
        amount: item.amount,
        original_amount: item.original_amount || null,
        discount_percentage: item.discount_percentage || null,
        features_id: item.features_id,
        features_en: item.features_en,
        recommended: item.recommended,
        order: item.order,
      }));

      const { error } = await supabase.from('price_plans').upsert(upsertPayload);

      if (error) {
        console.error('Supabase save error:', error);
        setDbConnected(false);
        setStatusMessage({
          text: `⚠️ Gagal kirim ke Supabase (${error.message}). Hanya tersimpan di browser Anda. Klik "Setup Supabase" untuk solusinya.`,
          type: 'error'
        });
      } else {
        setDbConnected(true);
        setStatusMessage({
          text: '✅ Berhasil tersimpan ke Supabase Database Cloud! Semua pengunjung website kini dapat melihat harga terbaru.',
          type: 'success'
        });
      }
    } catch (err: any) {
      console.error('Sync exception:', err);
      setDbConnected(false);
      setStatusMessage({
        text: '⚠️ Hanya tersimpan di browser Anda (Tabel database belum siap). Klik "Setup Supabase" di atas.',
        type: 'error'
      });
    } finally {
      setIsSyncing(false);
      setTimeout(() => {
        setStatusMessage(null);
      }, 7000);
    }
  };

  const sqlSetupScript = `-- 1. Buat Tabel price_plans jika belum ada
CREATE TABLE IF NOT EXISTS public.price_plans (
  id TEXT PRIMARY KEY,
  title_id TEXT NOT NULL,
  title_en TEXT NOT NULL,
  amount TEXT NOT NULL,
  original_amount TEXT,
  discount_percentage TEXT,
  features_id JSONB DEFAULT '[]'::jsonb,
  features_en JSONB DEFAULT '[]'::jsonb,
  recommended BOOLEAN DEFAULT false,
  "order" INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Aktifkan Row Level Security
ALTER TABLE public.price_plans ENABLE ROW LEVEL SECURITY;

-- 3. Berikan izin baca & tulis kepada publik (Anon Key)
DROP POLICY IF EXISTS "Allow public read-write on price_plans" ON public.price_plans;
CREATE POLICY "Allow public read-write on price_plans" 
ON public.price_plans 
FOR ALL 
TO public 
USING (true) 
WITH CHECK (true);`;

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(sqlSetupScript);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top action header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-6 sm:p-8 rounded-[32px] border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-500 rounded-2xl flex items-center justify-center text-slate-900 shadow-md">
              <Tag size={24} />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Pengaturan Price List
              </h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  dbConnected === true 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : dbConnected === false 
                    ? 'bg-amber-100 text-amber-800' 
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    dbConnected === true ? 'bg-emerald-500 animate-pulse' : dbConnected === false ? 'bg-amber-500' : 'bg-slate-400'
                  }`} />
                  {dbConnected === true 
                    ? 'Cloud Supabase Terhubung' 
                    : dbConnected === false 
                    ? 'Penyimpanan Lokal (Belum Terhubung Cloud)' 
                    : 'Mengecek Database...'}
                </span>
              </div>
            </div>
          </div>
          <p className="text-slate-500 font-bold text-xs sm:text-sm mt-2">
            Ubah harga, tambah harga coret, persentase diskon, dan rincian paket di sini.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsSqlModalOpen(true)}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all border border-slate-300"
            title="Setup tabel database Supabase"
          >
            <Database size={15} className="text-yellow-600" /> Setup Supabase
          </button>

          <button
            onClick={() => syncToSupabase(plans)}
            disabled={isSyncing}
            className="bg-slate-900 hover:bg-slate-800 text-yellow-400 px-4 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-all active:scale-95 disabled:opacity-50"
            title="Kirim semua paket ke database cloud"
          >
            <RefreshCw size={15} className={isSyncing ? 'animate-spin' : ''} />
            {isSyncing ? 'Menyinkronkan...' : 'Sinkronkan ke Cloud'}
          </button>

          <button
            onClick={handleAddNewPlan}
            className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-all active:scale-95"
          >
            <Plus size={18} /> Tambah Paket
          </button>
          
          <button
            onClick={handleResetToDefault}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all"
            title="Reset ke harga standar"
          >
            <RefreshCw size={13} /> Reset
          </button>
        </div>
      </div>

      {/* Database Setup Warning Banner if not connected */}
      {dbConnected === false && (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-5 sm:p-6 text-amber-900 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-amber-200 text-amber-900 rounded-2xl flex-shrink-0 mt-0.5">
              <AlertCircle size={22} />
            </div>
            <div>
              <h4 className="font-black text-sm sm:text-base">Kenapa perubahan harga belum muncul di orang lain?</h4>
              <p className="text-xs sm:text-sm text-amber-800 font-medium mt-0.5">
                Tabel <code className="bg-amber-200/70 px-1.5 py-0.5 rounded font-mono font-bold">price_plans</code> di database Supabase Cloud Anda belum dibuat, sehingga data saat ini hanya tersimpan di browser Anda sendiri.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSqlModalOpen(true)}
            className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-black text-xs uppercase tracking-wider px-5 py-3 rounded-xl flex items-center gap-2 flex-shrink-0 shadow transition-all active:scale-95"
          >
            <Database size={15} /> Buat Tabel di Supabase (1 Menit)
          </button>
        </div>
      )}

      {/* Save Notification Toast */}
      {statusMessage && (
        <div className={`p-4 rounded-2xl font-bold text-sm flex items-center justify-between shadow-xl border animate-fade-in ${
          statusMessage.type === 'success' 
            ? 'bg-slate-900 text-emerald-400 border-emerald-500/40' 
            : statusMessage.type === 'error'
            ? 'bg-slate-900 text-red-400 border-red-500/40'
            : 'bg-slate-900 text-yellow-400 border-yellow-500/40'
        }`}>
          <div className="flex items-center gap-2.5">
            {statusMessage.type === 'success' ? <CheckCircle2 size={18} /> : <Sparkles size={18} />}
            <span>{statusMessage.text}</span>
          </div>
          <button onClick={() => setStatusMessage(null)} className="text-slate-400 hover:text-white p-1">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Grid of Current Price Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan) => {
          const autoDiscount = calculateDiscountPercentage(plan.amount, plan.original_amount);
          const discountPill = plan.discount_percentage || (autoDiscount ? `HEMAT ${autoDiscount}` : null);

          return (
            <div 
              key={plan.id}
              className={`bg-white rounded-[28px] p-6 sm:p-8 border-2 relative flex flex-col justify-between transition-all hover:shadow-xl ${
                plan.recommended ? 'border-yellow-500 ring-4 ring-yellow-500/10' : 'border-slate-200'
              }`}
            >
              {plan.recommended && (
                <div className="absolute top-4 right-4 bg-yellow-500 text-slate-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                  Best Seller
                </div>
              )}

              <div>
                <div className="mb-4">
                  <h3 className="text-2xl font-black text-slate-900 mb-1">{plan.title_id}</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{plan.title_en}</p>
                </div>

                {/* Price Display */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6 space-y-1">
                  {plan.original_amount && (
                    <div className="flex items-center gap-2">
                      <span className="line-through text-slate-400 font-bold text-sm">
                        {isNaN(Number(plan.original_amount.replace(/\./g, ''))) ? plan.original_amount : `Rp ${plan.original_amount}`}
                      </span>
                      {discountPill && (
                        <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                          {discountPill}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="text-2xl font-black text-slate-900">
                    {isNaN(Number(plan.amount.replace(/\./g, ''))) ? plan.amount : `Rp ${plan.amount}`}
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2 mb-6">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Fitur Paket ({plan.features_id.length}):</p>
                  {plan.features_id.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <div className="w-4 h-4 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check size={10} strokeWidth={4} />
                      </div>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Edit Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Urutan: #{plan.order}</span>
                <button
                  onClick={() => handleEditClick(plan)}
                  className="bg-slate-900 hover:bg-slate-800 text-yellow-400 px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all"
                >
                  <Edit size={14} /> Edit Harga & Fitur
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL SETUP SUPABASE SQL */}
      {isSqlModalOpen && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl my-8 p-6 sm:p-8 rounded-[36px] shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsSqlModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 p-2 rounded-full hover:bg-slate-100 transition-all"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center font-black shadow-md">
                <Database size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900">Setup Database Supabase</h3>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
                  Agar update harga otomatis muncul di semua pengunjung
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <p className="font-bold text-slate-900">Cara mudah menghubungkan (hanya 3 langkah):</p>
                <ol className="list-decimal list-inside space-y-1.5 font-medium text-slate-700">
                  <li>Buka dashboard Supabase Anda di browser (<a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer" className="text-emerald-600 font-bold underline inline-flex items-center gap-1">supabase.com <ExternalLink size={12} /></a>).</li>
                  <li>Pilih menu <b>SQL Editor</b> di menu samping kiri.</li>
                  <li>Tempelkan (Paste) script SQL di bawah ini, lalu klik tombol <b>Run</b> (Jalankan).</li>
                </ol>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-slate-800 text-xs uppercase tracking-wider">Script SQL:</span>
                  <button
                    onClick={copySqlToClipboard}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    {copiedSql ? <Check size={14} /> : <Copy size={14} />}
                    {copiedSql ? 'Tersalin!' : 'Salin Script SQL'}
                  </button>
                </div>
                <pre className="bg-slate-900 text-emerald-400 p-4 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800 select-all">
                  {sqlSetupScript}
                </pre>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsSqlModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Tutup
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsSqlModalOpen(false);
                    syncToSupabase(plans);
                  }}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-all"
                >
                  <RefreshCw size={14} /> Cek & Sinkronkan Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL FOR EDITING PRICE PLAN */}
      {isModalOpen && editingPlan && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl my-8 p-6 sm:p-10 rounded-[36px] shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 p-2 rounded-full hover:bg-slate-100 transition-all"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center text-slate-900 font-black">
                <Edit size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900">Edit Paket Harga</h3>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
                  Atur harga aktif, harga coret, persentase diskon & deskripsi
                </p>
              </div>
            </div>

            <form onSubmit={handleSavePlan} className="space-y-6">
              {/* Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-widest">
                    Nama Paket (Bahasa Indonesia)
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPlan.title_id}
                    onChange={(e) => setEditingPlan({ ...editingPlan, title_id: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-500 font-bold text-slate-900 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-widest">
                    Nama Paket (English)
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPlan.title_en}
                    onChange={(e) => setEditingPlan({ ...editingPlan, title_en: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-500 font-bold text-slate-900 text-sm"
                  />
                </div>
              </div>

              {/* Pricing section */}
              <div className="bg-yellow-50/70 p-5 rounded-2xl border border-yellow-200/80 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Current Main Price */}
                  <div>
                    <label className="block text-xs font-black text-slate-800 mb-1.5 uppercase tracking-widest flex items-center gap-1.5">
                      <Tag size={14} className="text-yellow-600" />
                      Harga Utama (Harga Akhir)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Misal: 9.000.000 atau Custom Pricing"
                      value={editingPlan.amount}
                      onChange={(e) => setEditingPlan({ ...editingPlan, amount: formatPriceInput(e.target.value) })}
                      className="w-full px-4 py-3 bg-white border border-yellow-400 rounded-xl focus:ring-2 focus:ring-yellow-500 font-black text-slate-900 text-base shadow-sm"
                    />
                    <p className="text-[10px] text-slate-500 mt-1 font-medium">Format otomatis: xx.xxx.xxx (Contoh: 9.000.000)</p>
                  </div>

                  {/* Strikethrough Price (Harga Coret) */}
                  <div>
                    <label className="block text-xs font-black text-slate-800 mb-1.5 uppercase tracking-widest flex items-center gap-1.5">
                      <Percent size={14} className="text-red-500" />
                      Harga Coret (Harga Sebelum Diskon)
                    </label>
                    <input
                      type="text"
                      placeholder="Misal: 12.000.000 (Opsional)"
                      value={editingPlan.original_amount || ''}
                      onChange={(e) => setEditingPlan({ ...editingPlan, original_amount: formatPriceInput(e.target.value) })}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-yellow-500 font-bold text-slate-900 text-base shadow-sm"
                    />
                    <p className="text-[10px] text-slate-500 mt-1 font-medium">Format otomatis: xx.xxx.xxx (Harga yang dicoret)</p>
                  </div>
                </div>

                {/* Discount Percentage / Label */}
                <div>
                  <label className="block text-xs font-black text-slate-800 mb-1.5 uppercase tracking-widest">
                    Tulisan Diskon / Potongan % (Opsional)
                  </label>
                  <input
                    type="text"
                    placeholder='Kosongkan jika ingin dihitung otomatis, atau tulis misal: "25%" / "HEMAT 25%"'
                    value={editingPlan.discount_percentage || ''}
                    onChange={(e) => setEditingPlan({ ...editingPlan, discount_percentage: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-yellow-500 font-bold text-slate-900 text-sm"
                  />
                  <p className="text-[10px] text-slate-500 mt-1 font-medium">
                    Jika dikosongkan & Harga Coret diisi, sistem akan menghitung persentase diskon secara otomatis.
                  </p>
                </div>
              </div>

              {/* Recommended Badge */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-xs font-black text-slate-900 block uppercase tracking-wider">Lencana Best Seller (Rekomendasi)</span>
                  <span className="text-[11px] text-slate-500 font-medium">Menampilkan border kuning & badge Best Seller</span>
                </div>
                <input
                  type="checkbox"
                  checked={editingPlan.recommended}
                  onChange={(e) => setEditingPlan({ ...editingPlan, recommended: e.target.checked })}
                  className="w-6 h-6 text-yellow-500 rounded border-slate-300 focus:ring-yellow-500 cursor-pointer"
                />
              </div>

              {/* Features ID */}
              <div>
                <label className="block text-xs font-black text-slate-800 mb-2 uppercase tracking-widest">
                  Daftar Fitur (Bahasa Indonesia)
                </label>
                <div className="space-y-2">
                  {editingPlan.features_id.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={feat}
                        onChange={(e) => {
                          const updated = [...editingPlan.features_id];
                          updated[idx] = e.target.value;
                          setEditingPlan({ ...editingPlan, features_id: updated });
                        }}
                        className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = editingPlan.features_id.filter((_, i) => i !== idx);
                          setEditingPlan({ ...editingPlan, features_id: updated });
                        }}
                        className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setEditingPlan({ ...editingPlan, features_id: [...editingPlan.features_id, 'Fitur Baru'] })}
                    className="text-xs font-bold text-yellow-600 hover:text-yellow-700 flex items-center gap-1 mt-2"
                  >
                    <Plus size={14} /> Tambah Fitur (ID)
                  </button>
                </div>
              </div>

              {/* Features EN */}
              <div>
                <label className="block text-xs font-black text-slate-800 mb-2 uppercase tracking-widest">
                  Daftar Fitur (English)
                </label>
                <div className="space-y-2">
                  {editingPlan.features_en.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={feat}
                        onChange={(e) => {
                          const updated = [...editingPlan.features_en];
                          updated[idx] = e.target.value;
                          setEditingPlan({ ...editingPlan, features_en: updated });
                        }}
                        className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = editingPlan.features_en.filter((_, i) => i !== idx);
                          setEditingPlan({ ...editingPlan, features_en: updated });
                        }}
                        className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setEditingPlan({ ...editingPlan, features_en: [...editingPlan.features_en, 'New Feature'] })}
                    className="text-xs font-bold text-yellow-600 hover:text-yellow-700 flex items-center gap-1 mt-2"
                  >
                    <Plus size={14} /> Tambah Fitur (EN)
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => handleDeletePlan(editingPlan.id)}
                  className="px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all"
                >
                  <Trash2 size={16} /> Hapus Paket
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg transition-all"
                  >
                    <Save size={16} className="text-yellow-400" /> Simpan Perubahan
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
