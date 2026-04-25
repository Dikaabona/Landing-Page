
import React, { useState } from 'react';
import { Send, FileText, Video, User, Mail, MapPin, Phone, DollarSign, Calendar, Briefcase, CheckCircle2 } from 'lucide-react';

const CareerForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    nama: '',
    ttl: '',
    alamat: '',
    nohp: '',
    gaji: '',
    posisi: 'Live streaming',
    videoLink: '',
    portfolioLink: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      tanggal: new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }),
      ...formData
    };

    try {
      // We will try to send to our backend which will handle the Google Sheets integration
      const response = await fetch('/api/career', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitted(true);
        window.scrollTo(0, 0);
      } else {
        alert('Gagal mengirim lamaran. Silahkan coba lagi nanti.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan koneksi.');
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
                  placeholder="081234567890"
                  className="w-full px-4 py-2.5 sm:px-5 sm:py-3.5 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:outline-none focus:bg-white transition-all text-xs sm:text-base text-slate-900"
                  value={formData.nohp}
                  onChange={(e) => setFormData({...formData, nohp: e.target.value})}
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
                  placeholder="Contoh: 5.000.000"
                  className="w-full px-4 py-2.5 sm:px-5 sm:py-3.5 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:outline-none focus:bg-white transition-all text-xs sm:text-base text-slate-900"
                  value={formData.gaji}
                  onChange={(e) => setFormData({...formData, gaji: e.target.value})}
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
                  Video Live Streaming (GDrive)
                </label>
                <input 
                  required
                  type="url" 
                  placeholder="https://drive.google.com/..."
                  className="w-full px-4 py-2.5 sm:px-5 sm:py-3.5 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:outline-none focus:bg-white transition-all text-xs sm:text-base text-slate-900"
                  value={formData.videoLink}
                  onChange={(e) => setFormData({...formData, videoLink: e.target.value})}
                />
              </div>

              <div className="space-y-1">
                <label className="flex items-center text-[11px] sm:text-sm font-bold text-slate-700">
                  <FileText size={14} className="mr-1.5 text-yellow-500" />
                  Link Portfolio (GDrive)
                </label>
                <input 
                  required
                  type="url" 
                  placeholder="https://drive.google.com/..."
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
