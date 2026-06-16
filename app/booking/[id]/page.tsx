'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BookingPage({ params }: { params: { id: string } }) {
  const [nama, setNama] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [durasi, setDurasi] = useState('1');
  const [tanggalMasuk, setTanggalMasuk] = useState('');
  const [namaKamar, setNamaKamar] = useState('Memuat...');
  
  useEffect(() => {
    const daftarNama: { [key: string]: string } = {
      '1': 'Melati',
      '2': 'Anggrek',
      '3': 'Mawar',
      '4': 'Tulip',
      '5': 'Dahlia'
    };
    setNamaKamar(daftarNama[params.id] || `Kamar No. ${params.id}`);
  }, [params.id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const nomorAdmin = "6285710022851"; 

    const pesan = `Halo Admin Kost, saya mau booking kamar:\n\n` +
                  `• Nama (Username): ${nama}\n` +
                  `• No. WA: ${whatsapp}\n` +
                  `• Kamar: ${namaKamar} (ID: ${params.id})\n` +
                  `• Tanggal Masuk: ${tanggalMasuk}\n` +
                  `• Durasi Sewa: ${durasi} Bulan\n\n` +
                  `Saya tahu nanti Username login saya adalah nama di atas. Mohon informasi password default dan langkah pembayaran selanjutnya ya, terima kasih!`;

    const urlWhatsApp = `https://wa.me/${nomorAdmin}?text=${encodeURIComponent(pesan)}`;

    // Pake window.location.href biar gak diblokir pop-up blocker di HP/Mobile
    window.location.href = urlWhatsApp;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-emerald-50/20 to-slate-100">
      
      {/* Header Banner Gelap */}
      <div className="relative bg-slate-900 text-white py-12 overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-600/20 rounded-full blur-2xl"></div>
        <div className="max-w-xl mx-auto px-4 text-center relative z-1">
          <Link href="/" className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold uppercase tracking-wider bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800 transition">
            ← Kembali ke Daftar Kamar
          </Link>
          <h1 className="text-2xl md:text-3xl font-extrabold mt-4 mb-1 tracking-tight">
            Formulir Booking
          </h1>
          <p className="text-slate-400 text-sm">
            Lengkapi data diri Anda untuk memesan Kamar <span className="text-emerald-400 font-bold">{namaKamar}</span>
          </p>
        </div>
      </div>

      {/* Area Form Box */}
      <div className="max-w-xl mx-auto py-8 px-4">
        <div className="bg-white rounded-3xl shadow-md border border-slate-200/60 p-6 md:p-8">
          
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Input Nama Lengkap */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Nama Lengkap (Akan Jadi Username)
              </label>
              <input
                type="text"
                required
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Masukkan nama sesuai KTP"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
              />
            </div>

            {/* Input Nomor WhatsApp */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Nomor WhatsApp Anda
              </label>
              <input
                type="tel"
                required
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="Contoh: 08123456789"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
              />
            </div>

            {/* Grid 2 Kolom untuk Tanggal & Durasi */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Tanggal Masuk
                </label>
                <input
                  type="date"
                  required
                  value={tanggalMasuk}
                  onChange={(e) => setTanggalMasuk(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-sm text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Durasi Sewa
                </label>
                <select
                  value={durasi}
                  onChange={(e) => setDurasi(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-sm text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition appearance-none"
                >
                  <option value="1">1 Bulan</option>
                  <option value="3">3 Bulan</option>
                  <option value="6">6 Bulan</option>
                  <option value="12">1 Tahun</option>
                </select>
              </div>
            </div>

            {/* Informasi Kamar Singkat */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mt-2">
              <div className="flex justify-between text-xs text-slate-500 font-medium">
                <span>Kamar yang dipilih:</span>
                <span className="font-bold text-slate-800">{namaKamar}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-500 font-medium mt-1">
                <span>Status Ketersediaan:</span>
                <span className="text-emerald-600 font-bold">Tersedia</span>
              </div>
            </div>

            {/* Grouping Tombol Aksi */}
            <div className="space-y-3 pt-2">
              {/* Tombol Kirim WhatsApp */}
              <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-3.5 rounded-xl text-sm font-bold shadow-md shadow-emerald-600/10 hover:bg-emerald-700 hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
              >
                Konfirmasi Booking via WhatsApp
              </button>

              {/* Pembatas Visual */}
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-4 text-xs text-slate-400 font-medium">Sudah punya password?</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              {/* Tombol ke Halaman Login */}
              <Link href="/login" className="block w-full">
                <button
                  type="button"
                  className="w-full bg-white text-slate-700 border border-slate-300 py-3 rounded-xl text-sm font-bold hover:bg-slate-50 hover:text-slate-900 transition duration-200 shadow-sm text-center"
                >
                  Login ke Dashboard Penyewa
                </button>
              </Link>
            </div>

          </form>

        </div>
      </div>
    </main>
  );
}