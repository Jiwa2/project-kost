'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';

export default function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  // Ambil parameter ID asinkron Next.js 15
  const resolvedParams = use(params);
  const kamarId = resolvedParams.id;

  const [nama, setNama] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [durasi, setDurasi] = useState('1');
  const [tanggalMasuk, setTanggalMasuk] = useState('');
  
  // State data dasar kamar
  const [namaKamar, setNamaKamar] = useState('Memuat...');
  const [hargaKamar, setHargaKamar] = useState(0);
  const [fasilitasKamar, setFasilitasKamar] = useState<string[]>([]);

  useEffect(() => {
    // DATABASE LOKAL
    const databaseKamarLokal: { [key: string]: { nama: string; harga: number; fasilitas: string[] } } = {
      '1': { nama: 'Kamar 1', harga: 500000, fasilitas: ['WIFI', 'Kasur', 'Kipas'] },
      '2': { nama: 'Kamar 2', harga: 600000, fasilitas: ['WIFI', 'AC', 'Lemari'] },
      '3': { nama: 'Kamar 3', harga: 550000, fasilitas: ['WIFI', 'Kasur'] }
    };

    // Konversi kamarId menjadi string murni untuk dicocokkan ke key object
    const targetId = String(kamarId || '1').trim();
    const detail = databaseKamarLokal[targetId] || databaseKamarLokal['1'];
    
    setNamaKamar(detail.nama);
    setHargaKamar(detail.harga);
    setFasilitasKamar(detail.fasilitas);
  }, [kamarId]);

  // HITUNG LANGSUNG SECARA REAKTIF (Anti-Delay, Anti-0)
  const bulanTerpilih = parseInt(durasi) || 1;
  const totalHargaAkhir = hargaKamar * bulanTerpilih;

  // Teks string keterangan durasi untuk disimpan & dikirim ke WA
  const labelDurasi = durasi === '12' ? '1 Tahun' : `${durasi} Bulan`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // PERBAIKAN STRUKTUR DATA: Menyimpan data asli + hasil kalkulasi final
    const dataBookingUntukDashboard = {
      id: parseInt(kamarId || '1', 10),
      namaKamar: namaKamar,
      harga: hargaKamar,         // Tetap harga dasar per bulan (misal: 500000)
      durasi: labelDurasi,       // Menyimpan teks rapi "3 Bulan" atau "1 Tahun"
      tanggalMasuk: tanggalMasuk,
      status: "terisi",
      fasilitas: fasilitasKamar,
      totalTagihan: totalHargaAkhir // Menyimpan hasil perkiraan kalkulasi akhir di form booking
    };
    
    localStorage.setItem('kamar_terbooking', JSON.stringify(dataBookingUntukDashboard));
    localStorage.setItem('username_penyewa', nama);

    const nomorAdmin = "6285710022851"; 
    const pesan = `Halo Admin Kost, saya mau booking kamar:\n\n` +
                  `• Nama (Username): ${nama}\n` +
                  `• No. WA: ${whatsapp}\n` +
                  `• Kamar: ${namaKamar} (ID: ${kamarId})\n` +
                  `• Tanggal Masuk: ${tanggalMasuk}\n` +
                  `• Durasi Sewa: ${labelDurasi}\n` +
                  `• Total Tagihan: Rp ${totalHargaAkhir.toLocaleString('id-ID')}\n\n` +
                  `Saya tahu nanti Username login saya adalah nama di atas. Mohon informasi password default dan langkah pembayaran selanjutnya ya, terima kasih!`;

    window.location.href = `https://wa.me/${nomorAdmin}?text=${encodeURIComponent(pesan)}`;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-emerald-50/20 to-slate-100">
      <div className="relative bg-slate-900 text-white py-12 overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-600/20 rounded-full blur-2xl"></div>
        <div className="max-w-xl mx-auto px-4 text-center relative z-10">
          <Link href="/" className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold uppercase tracking-wider bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800 transition">
            ← Kembali ke Daftar Kamar
          </Link>
          <h1 className="text-2xl md:text-3xl font-extrabold mt-4 mb-1 tracking-tight">
            Formulir Booking
          </h1>
          <p className="text-slate-400 text-sm">
            Lengkapi data diri Anda untuk memesan <span className="text-emerald-400 font-bold">{namaKamar}</span>
          </p>
        </div>
      </div>

      <div className="max-w-xl mx-auto py-8 px-4">
        <div className="bg-white rounded-3xl shadow-md border border-slate-200/60 p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
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

            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mt-2">
              <div className="flex justify-between text-xs text-slate-500 font-medium">
                <span>Kamar yang dipilih:</span>
                <span className="font-bold text-slate-800">{namaKamar}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-500 font-medium mt-1">
                <span>Harga Sewa asli:</span>
                <span className="text-slate-800 font-bold">
                  Rp {hargaKamar.toLocaleString('id-ID')} /bln
                </span>
              </div>
              <div className="flex justify-between text-xs border-t border-slate-200/60 pt-2 mt-2 text-slate-600 font-bold">
                <span>Estimasi Total ({labelDurasi}):</span>
                <span className="text-emerald-600 text-sm font-black">
                  Rp {totalHargaAkhir.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-3.5 rounded-xl text-sm font-bold shadow-md shadow-emerald-600/10 hover:bg-emerald-700 hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
              >
                Konfirmasi Booking via WhatsApp
              </button>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-4 text-xs text-slate-400 font-medium">Sudah punya password?</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

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