'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link'; // <-- Menghilangkan error build karena Link belum di-import

interface KamarTerpilih {
  id: number;
  namaKamar: string;
  harga: number;
  durasi: string;
  tanggalMasuk: string;
  status: string;
  fasilitas: string[];
}

export default function DashboardLoginPage() {
  // Gunakan state kosong di awal agar tidak memicu flicker data dummy saat reload
  const [namaPenyewa, setNamaPenyewa] = useState<string>('');
  const [kamar, setKamar] = useState<KamarTerpilih | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Menarik data riil hasil inputan user dari Formulir Booking
    const dataSewa = localStorage.getItem('kamar_terbooking');
    const userLogin = localStorage.getItem('username_penyewa');
    
    if (dataSewa) {
      try {
        setKamar(JSON.parse(dataSewa));
      } catch (e) {
        console.error("Gagal memuat data sewa dari storage:", e);
      }
    }
    
    if (userLogin && userLogin.trim() !== "") {
      setNamaPenyewa(userLogin);
    }
    
    setLoading(false);
  }, []);

  const handleLogout = () => {
    if (confirm('Apakah Anda yakin ingin keluar dari panel dashboard?')) {
      localStorage.removeItem('kamar_terbooking');
      localStorage.removeItem('username_penyewa');
      window.location.href = '/login'; // <-- Diubah agar mengarah kembali ke form login
    }
  };

  // State default (Fallback aman) jika user belum pernah booking atau data storage kosong
  const dataKamarFix = kamar || {
    id: 1,
    namaKamar: "Kamar Melati (ID: 1)",
    harga: 1200000,
    durasi: "1",
    tanggalMasuk: "2026-06-25",
    status: "terisi",
    fasilitas: ["AC", "KM Dalam", "Wifi"]
  };

  const namaPenyewaFix = namaPenyewa || "Penyewa Kost";

  // RUMUS DINAMIS: Harga Kamar x Durasi Sewa
  const durasiBulan = parseInt(dataKamarFix.durasi || '1');
  const totalTagihan = dataKamarFix.harga * durasiBulan;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-sm font-semibold text-slate-500 animate-pulse">Memuat Dashboard...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 pb-12">
      
      {/* NAVBAR */}
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm backdrop-blur-md bg-white/90">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex justify-between items-center">
          <h1 className="text-sm md:text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
            KostNuansa
          </h1>
          <button 
            onClick={handleLogout}
            className="text-[11px] md:text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 px-3.5 py-2 rounded-full active:scale-95 transition-all"
          >
            Keluar Akun
          </button>
        </div>
      </nav>

      {/* CONTENT WRAPPER */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* SISI KIRI & TENGAH */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Banner Welcome */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>
              <div className="relative z-10 space-y-2">
                <span className="text-[9px] md:text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-800">
                  Status Kamar: Aktif
                </span>
                <h2 className="text-xl md:text-2xl font-black tracking-tight pt-1">
                  Halo, {namaPenyewaFix}! 👋
                </h2>
                <p className="text-slate-400 text-xs leading-relaxed max-w-md">
                  Selamat datang di panel kendali hunianmu. Kamar lu berhasil di-aktivasi oleh sistem pengelola Kost Nuansa.
                </p>
              </div>
            </div>

            {/* Layanan Cepat */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Layanan Cepat</h3>
              <div className="grid grid-cols-3 gap-2 md:gap-4">
                
                {/* TOMBOL BAYAR SEWA (Pindah ke WhatsApp) */}
                <button 
                  onClick={() => {
                    const nomorAdmin = "6285710022851";
                    const pesanBayar = `Halo Admin Kost Nuansa, saya ingin konfirmasi pembayaran sewa kost:\n\n` +
                                       `• Nama Penyewa: ${namaPenyewaFix}\n` +
                                       `• Kamar: ${dataKamarFix.namaKamar}\n` +
                                       `• Total Tagihan: Rp ${totalTagihan.toLocaleString('id-ID')}\n` +
                                       `• Durasi Sewa: ${durasiBulan} Bulan\n\n` +
                                       `Mohon informasi rekening pembayaran dan instruksi selanjutnya ya. Terima kasih!`;
                    window.open(`https://wa.me/${nomorAdmin}?text=${encodeURIComponent(pesanBayar)}`, '_blank');
                  }}
                  className="flex flex-col items-center justify-center p-3 bg-slate-50 hover:bg-emerald-50 rounded-xl border border-slate-100 hover:border-emerald-200 transition text-center group"
                >
                  <span className="text-lg md:text-xl mb-1 group-hover:scale-110 transition-transform">💳</span>
                  <span className="text-[10px] md:text-xs font-bold text-slate-700">Bayar Sewa</span>
                </button>

                {/* TOMBOL LAPOR RUSAK / KOMPLAIN (Pindah ke Halaman Form Komplain) */}
                <Link 
                  href="/komplain" 
                  className="flex flex-col items-center justify-center p-3 bg-slate-50 hover:bg-amber-50 rounded-xl border border-slate-100 hover:border-amber-200 transition text-center group"
                >
                  <span className="text-lg md:text-xl mb-1 group-hover:scale-110 transition-transform">🛠️</span>
                  <span className="text-[10px] md:text-xs font-bold text-slate-700">Lapor Rusak</span>
                </Link>

                {/* TOMBOL CHAT ADMIN */}
                <button 
                  onClick={() => {
                    const nomorAdmin = "6285710022851";
                    const pesanChat = `Halo Admin Kost Nuansa, saya ${namaPenyewaFix} dari ${dataKamarFix.namaKamar}. Ada hal yang ingin saya tanyakan...`;
                    window.open(`https://wa.me/${nomorAdmin}?text=${encodeURIComponent(pesanChat)}`, '_blank');
                  }}
                  className="flex flex-col items-center justify-center p-3 bg-slate-50 hover:bg-blue-50 rounded-xl border border-slate-100 hover:border-blue-200 transition text-center group"
                >
                  <span className="text-lg md:text-xl mb-1 group-hover:scale-110 transition-transform">💬</span>
                  <span className="text-[10px] md:text-xs font-bold text-slate-700">Chat Admin</span>
                </button>

              </div>
            </div>

            {/* Riwayat Transaksi Dinamis */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm overflow-hidden">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Riwayat Transaksi</h3>
              <div className="overflow-x-auto -mx-5 px-5">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                      <th className="pb-2">Keterangan</th>
                      <th className="pb-2">Nominal</th>
                      <th className="pb-2 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    <tr className="text-slate-700">
                      <td className="py-2.5 font-medium">Sewa Awal ({durasiBulan} Bulan)</td>
                      <td className="py-2.5">Rp {totalTagihan.toLocaleString('id-ID')}</td>
                      <td className="py-2.5 text-right">
                        <span className="bg-amber-50 text-amber-600 px-2 py-0.5 rounded-md font-bold text-[10px]">
                          BELUM BAYAR
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* SISI KANAN (SIDEBAR) */}
          <div className="space-y-6">
            <div className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm space-y-4">
              <div>
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Kamar & Lokasi</h3>
                <p className="text-sm font-black text-slate-800 mt-0.5">{dataKamarFix.namaKamar}</p>
              </div>
              <hr className="border-slate-100" />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-[10px] text-slate-400 font-bold uppercase">Total Tagihan</h4>
                  <p className="text-sm font-bold text-rose-600 mt-0.5">Rp {totalTagihan.toLocaleString('id-ID')}</p>
                </div>
                <div>
                  <h4 className="text-[10px] text-slate-400 font-bold uppercase">Mulai Masuk</h4>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">
                    {dataKamarFix.tanggalMasuk ? new Date(dataKamarFix.tanggalMasuk).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '25 Juni 2026'}
                  </p>
                </div>
              </div>
            </div>

            {/* Status Layanan */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Fasilitas Kamar</h3>
              <div className="flex flex-wrap gap-1.5">
                {dataKamarFix.fasilitas.map((f: string, i: number) => (
                  <span key={i} className="bg-slate-50 text-slate-600 text-[10px] font-medium px-2 py-1 rounded-md border border-slate-100">
                    🟢 {f}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}