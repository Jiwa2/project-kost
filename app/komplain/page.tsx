'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function KomplainPage() {
  const [nama, setNama] = useState('');
  const [kamar, setKamar] = useState('');
  const [kategori, setKategori] = useState('Fasilitas Kamar');
  const [deskripsi, setDeskripsi] = useState('');

  useEffect(() => {
    // Ambil data otomatis dari localStorage jika sudah pernah login/booking
    const userLogin = localStorage.getItem('username_penyewa');
    const dataSewa = localStorage.getItem('kamar_terbooking');
    
    if (userLogin) setNama(userLogin);
    if (dataSewa) {
      const parsed = JSON.parse(dataSewa);
      setKamar(parsed.namaKamar || '');
    }
  }, []);

  const handleSubmitKomplain = (e: React.FormEvent) => {
    e.preventDefault();

    const nomorAdmin = "6285710022851";
    const pesanKomplain = `🚨 *LAPORAN KOMPLAIN / KERUSAKAN KOST* 🚨\n\n` +
                          `• *Pengirim:* ${nama}\n` +
                          `• *Kamar:* ${kamar}\n` +
                          `• *Kategori Masalah:* ${kategori}\n\n` +
                          `*Deskripsi Kerusakan/Keluhan:*\n"${deskripsi}"\n\n` +
                          `Mohon bantuan pengelola kost untuk segera menindaklanjuti, terima kasih banyak!`;

    window.open(`https://wa.me/${nomorAdmin}?text=${encodeURIComponent(pesanKomplain)}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-amber-50/10 to-slate-100">
      <div className="relative bg-slate-900 text-white py-12 overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-amber-600/10 rounded-full blur-2xl"></div>
        <div className="max-w-xl mx-auto px-4 text-center relative z-10">
          <Link href="/login" className="text-xs text-amber-400 hover:text-amber-300 font-semibold uppercase tracking-wider bg-amber-950/60 px-3 py-1 rounded-full border border-amber-900 transition">
            ← Kembali ke Dashboard
          </Link>
          <h1 className="text-2xl md:text-3xl font-extrabold mt-4 mb-1 tracking-tight">
            Formulir Lapor Kendala
          </h1>
          <p className="text-slate-400 text-sm">
            Ada fasilitas rusak atau keluhan? Laporkan langsung ke pengelola kost.
          </p>
        </div>
      </div>

      <div className="max-w-xl mx-auto py-8 px-4">
        <div className="bg-white rounded-3xl shadow-md border border-slate-200/60 p-6 md:p-8">
          <form onSubmit={handleSubmitKomplain} className="space-y-5">
            
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Nama Pelapor
              </label>
              <input
                type="text"
                required
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama Anda"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Nomor / Nama Kamar
              </label>
              <input
                type="text"
                required
                value={kamar}
                onChange={(e) => setKamar(e.target.value)}
                placeholder="Contoh: Kamar 1"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Kategori Kendala
              </label>
              <select
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-sm text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white transition appearance-none"
              >
                <option value="Fasilitas Kamar">Fasilitas Kamar (AC, Kasur, Lampu Mati, dll)</option>
                <option value="Kamar Mandi">Kamar Mandi / Air (Kran Bocor, Air Macet)</option>
                <option value="Fasilitas Umum">Fasilitas Umum (WiFi Lambat, Kebersihan Lorong)</option>
                <option value="Keamanan & Lingkungan">Lingkungan (Kebisingan, Parkiran, Kehilangan)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Jelaskan Detail Kerusakan / Keluhan
              </label>
              <textarea
                required
                rows={4}
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                placeholder="Contoh: AC di Kamar 2 tidak dingin sama sekali sejak kemarin sore dan mengeluarkan bunyi bising. Mohon dicek teknisi."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white transition resize-none"
              ></textarea>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-amber-600 text-white py-3.5 rounded-xl text-sm font-bold shadow-md shadow-amber-600/10 hover:bg-amber-700 hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
              >
                Kirim Laporan via WhatsApp
              </button>
            </div>

          </form>
        </div>
      </div>
    </main>
  );
}