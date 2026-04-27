
import React, { useState } from 'react';
import { Send, FileText, Video, User, Mail, MapPin, Phone, DollarSign, Calendar, Briefcase, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const CareerForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    nama: '',
    ttl: '',
    alamat: '',
    nohp: '62',
    gaji: '',
    posisi: 'Live streaming',
    videoLink: '',
    portfolioLink: ''
  });

  const formatGaji = (value: string) => {
    // Remove non-digits
    const number = value.replace(/\D/g, '');
    if (!number) return '';
    
    // Format with thousand separators
    const formatted = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number(number));

    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    // Ensure it starts with 62 or handle if they try to delete 62
    if (!value.startsWith('62')) {
      if (value.startsWith('0')) {
        value = '62' + value.slice(1);
      } else {
        value = '62' + value;
      }
    }
    
    setFormData({ ...formData, nohp: value });
  };

  const handleGajiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatGaji(e.target.value);
    setFormData({ ...formData, gaji: formatted });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const timestamp = new Date().toISOString();
    const payload = {
      tanggal: new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }),
      ...formData
    };

    try {
      // 1. Try to save to Supabase
      let sbSuccess = false;
      try {
        const { error: sbError, status: sbStatus } = await supabase
          .from('careers')
          .insert([{
            email: formData.email,
            nama: formData.nama,
            ttl: formData.ttl,
            alamat: formData.alamat,
            nohp: formData.nohp,
            gaji: formData.gaji,
            posisi: formData.posisi,
            video_link: formData.videoLink,
            portfolio_link: formData.portfolioLink,
            created_at: timestamp
          }]);

        if (!sbError) {
          sbSuccess = true;
          console.log('Supabase: Berhasil menyimpan data.');
        } else {
          console.error(`Supabase Error (${sbStatus}):`, sbError);
          setError('Gagal mengirim lamaran.');
        }
      } catch (err: any) {
        console.error('Supabase Connection Error:', err);
        setError('Gagal mengirim lamaran.');
      }

      // 2. Try to send to our backend API (which handles Google Sheets)
      let apiSuccess = false;
      try {
        const response = await fetch('/api/submit-lamaran', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          apiSuccess = true;
          console.log('Google Sheets: Berhasil mengirim melalui API proxy.');
        } else {
          const errorData = await response.json().catch(() => ({}));
          console.error('Google Sheets: Gagal melalui API proxy.', errorData);
        }
      } catch (err) {
        console.error('API: Kesalahan koneksi ke server lokal.', err);
      }

      if (sbSuccess && apiSuccess) {
        // Must succeed in both for full success
        setSubmitted(true);
        window.scrollTo(0, 0);
      } else if (sbSuccess || apiSuccess) {
        // Partial success (one failed)
        setSubmitted(true);
        window.scrollTo(0, 0);
        console.warn('Peringatan: Satu dari dua penyimpanan data gagal. (SB:', sbSuccess, 'API:', apiSuccess, ')');
      } else {
        setError('Gagal mengirim lamaran. Pastikan koneksi dan pengaturan sudah benar.');
      }
    } catch (error) {
      console.error('Error:', error);
      // If we got here but Supabase worked earlier, it's still ok
      // But we check if submitted is still false
      setError('Gagal mengirim lamaran.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-[40px] p-10 text-center shadow-xl border border-slate-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="text-green-500" size={40} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4">Lamaran Terkirim!</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Terima kasih telah melamar di Visibel Agency. Tim kami akan segera meninjau portfolio Anda dan menghubungi melalui WhatsApp jika Anda lolos ke tahap berikutnya.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full bg-yellow-500 text-slate-900 py-4 rounded-2xl font-bold text-lg hover:bg-yellow-600 transition-all"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 sm:pt-32 pb-10 sm:pb-20 bg-slate-50">
      <div className="max-w-3xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-12">
          <h1 className="text-2xl sm:text-5xl font-black text-slate-900 leading-tight">
            Bergabung Bersama <span className="text-yellow-500">Visibel Agency</span>
          </h1>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-6 rounded-2xl flex items-center justify-between animate-fade-in shadow-sm">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-500 mr-4">
                <CheckCircle2 size={24} className="rotate-180" />
              </div>
              <p className="text-red-700 font-black text-lg">Gagal mengirim lamaran.</p>
            </div>
            <button 
              onClick={() => setError(null)}
              className="bg-white/50 text-red-500 px-4 py-2 rounded-xl text-xs font-bold border border-red-200 hover:bg-white transition-all shadow-sm"
            >
              Tutup
            </button>
          </div>
        )}

        <div className="bg-white rounded-[24px] sm:rounded-[40px] shadow-2xl shadow-yellow-900/10 border border-slate-100 overflow-hidden">
          <div className="bg-yellow-500 p-4 sm:p-6 text-slate-900">
            <p className="font-bold flex items-center justify-center text-sm sm:text-base">
              <FileText size={18} className="mr-2" />
              Formulir Pendaftaran Karir
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-4 sm:p-10 space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
              <div className="space-y-1">
                <label className="flex items-center text-[11px] sm:text-sm font-bold text-slate-700">
                  <User size={14} className="mr-1.5 text-yellow-500" />
                  Nama Lengkap
                </label>
                <input 
                  required
                  type="text" 
                  placeholder="Contoh: Budi Santoso"
                  className="w-full px-4 py-2.5 sm:px-5 sm:py-3.5 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:outline-none focus:bg-white transition-all text-xs sm:text-base text-slate-900"
                  value={formData.nama}
                  onChange={(e) => setFormData({...formData, nama: e.target.value})}
                />
              </div>

              <div className="space-y-1">
                <label className="flex items-center text-[11px] sm:text-sm font-bold text-slate-700">
                  <Mail size={14} className="mr-1.5 text-yellow-500" />
                  Email Address
                </label>
                <input 
                  required
                  type="email" 
                  placeholder="name@email.com"
                  className="w-full px-4 py-2.5 sm:px-5 sm:py-3.5 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:outline-none focus:bg-white transition-all text-xs sm:text-base text-slate-900"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="space-y-1">
                <label className="flex items-center text-[11px] sm:text-sm font-bold text-slate-700">
                  <Calendar size={14} className="mr-1.5 text-yellow-500" />
                  Tempat Tanggal Lahir
                </label>
                <input 
                  required
                  type="text" 
                  placeholder="Jakarta, 01-01-1995"
                  className="w-full px-4 py-2.5 sm:px-5 sm:py-3.5 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:outline-none focus:bg-white transition-all text-xs sm:text-base text-slate-900"
                  value={formData.ttl}
                  onChange={(e) => setFormData({...formData, ttl: e.target.value})}
                />
              </div>

              <div className="space-y-1">
                <label className="flex items-center text-[11px] sm:text-sm font-bold text-slate-700">
                  <Phone size={14} className="mr-1.5 text-yellow-500" />
                  No HP / WhatsApp
                </label>
                <input 
                  required
                  type="tel" 
                  placeholder="6281234567890"
                  className="w-full px-4 py-2.5 sm:px-5 sm:py-3.5 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:outline-none focus:bg-white transition-all text-xs sm:text-base text-slate-900"
                  value={formData.nohp}
                  onChange={handlePhoneChange}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="flex items-center text-[11px] sm:text-sm font-bold text-slate-700">
                <MapPin size={14} className="mr-1.5 text-yellow-500" />
                Alamat Lengkap
              </label>
              <textarea 
                required
                placeholder="Tuliskan alamat lengkap..."
                rows={2}
                className="w-full px-4 py-2.5 sm:px-5 sm:py-3.5 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:outline-none focus:bg-white transition-all text-xs sm:text-base text-slate-900 resize-none"
                value={formData.alamat}
                onChange={(e) => setFormData({...formData, alamat: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
              <div className="space-y-1">
                <label className="flex items-center text-[11px] sm:text-sm font-bold text-slate-700">
                  <DollarSign size={14} className="mr-1.5 text-yellow-500" />
                  Gaji yang Diharapkan
                </label>
                <input 
                  required
                  type="text" 
                  placeholder="Rp 2.000.000"
                  className="w-full px-4 py-2.5 sm:px-5 sm:py-3.5 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:outline-none focus:bg-white transition-all text-xs sm:text-base text-slate-900"
                  value={formData.gaji}
                  onChange={handleGajiChange}
                />
              </div>

              <div className="space-y-1">
                <label className="flex items-center text-[11px] sm:text-sm font-bold text-slate-700">
                  <Briefcase size={14} className="mr-1.5 text-yellow-500" />
                  Posisi yang Dilamar
                </label>
                <select 
                  className="w-full px-4 py-2.5 sm:px-5 sm:py-3.5 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:outline-none focus:bg-white transition-all text-xs sm:text-base text-slate-900 appearance-none"
                  value={formData.posisi}
                  onChange={(e) => setFormData({...formData, posisi: e.target.value})}
                >
                  <option value="Live streaming">Live streaming</option>
                  <option value="Content creator">Content creator</option>
                </select>
              </div>
            </div>

            <div className="space-y-3 pt-6 sm:pt-4 border-t border-slate-100">
              <div className="space-y-1">
                <label className="flex items-center text-[11px] sm:text-sm font-bold text-slate-700">
                  <Video size={14} className="mr-1.5 text-yellow-500" />
                  Video Live Streaming (GDrive) {formData.posisi === 'Live streaming' && <span className="text-red-500 ml-1">(Wajib)</span>}
                </label>
                <input 
                  required={formData.posisi === 'Live streaming'}
                  type="url" 
                  placeholder={formData.posisi === 'Live streaming' ? "https://drive.google.com/..." : "Optional"}
                  className="w-full px-4 py-2.5 sm:px-5 sm:py-3.5 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:outline-none focus:bg-white transition-all text-xs sm:text-base text-slate-900"
                  value={formData.videoLink}
                  onChange={(e) => setFormData({...formData, videoLink: e.target.value})}
                />
              </div>

              <div className="space-y-1">
                <label className="flex items-center text-[11px] sm:text-sm font-bold text-slate-700">
                  <FileText size={14} className="mr-1.5 text-yellow-500" />
                  Link Portfolio (GDrive) {formData.posisi === 'Content creator' && <span className="text-red-500 ml-1">(Wajib)</span>}
                </label>
                <input 
                  required={formData.posisi === 'Content creator'}
                  type="url" 
                  placeholder={formData.posisi === 'Content creator' ? "https://drive.google.com/..." : "Optional"}
                  className="w-full px-4 py-2.5 sm:px-5 sm:py-3.5 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:outline-none focus:bg-white transition-all text-xs sm:text-base text-slate-900"
                  value={formData.portfolioLink}
                  onChange={(e) => setFormData({...formData, portfolioLink: e.target.value})}
                />
              </div>
            </div>

            <button 
              disabled={loading}
              type="submit"
              className={`w-full bg-yellow-500 text-slate-900 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg hover:bg-yellow-600 transition-all flex items-center justify-center group shadow-xl shadow-yellow-600/20 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <div className="w-5 h-5 border-3 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Kirim Lamaran
                  <Send className="ml-2 sm:ml-3 group-hover:translate-x-1 transition-transform" size={16} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CareerForm;
