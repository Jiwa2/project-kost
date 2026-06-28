import Link from 'next/link';
import Image from 'next/image'; // <-- 1. IMPORT KOMPONEN IMAGE DARI NEXT.JS
import { promises as fs } from 'fs';
import path from 'path';

interface Kamar {
  id: number;
  namaKamar: string;
  harga: number;
  status: string;
  fasilitas: string[];
  gambar: string;
}

export default async function Home() {
  // Baca data secara asynchronous
  const filePath = path.join(process.cwd(), 'data', 'kamar.json');
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const daftarKamar: Kamar[] = JSON.parse(fileContent);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-emerald-50/20 to-slate-100">
      
      {/* Hero Section */}
      <div className="relative bg-slate-900 text-white py-16 md:py-24 overflow-hidden">
        {/* GAMBAR BACKGROUND HERO (Gedung Luar) */}
        <Image 
          src="/images/hero-kost.jpg" 
          alt="Suasana Kost Nuansa" 
          fill 
          priority
          className="object-cover object-center opacity-25 mix-blend-overlay scale-105"
        />
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-600/30 rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <span className="text-[10px] md:text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full uppercase tracking-widest backdrop-blur-md">
            Hunian Terjangkau & Bersih
          </span>
          <h1 className="text-2xl md:text-5xl font-extrabold mt-3 mb-2 tracking-tight">
            Cari Kamar Nyaman & Strategis
          </h1>
          <p className="text-slate-300 text-xs md:text-base max-w-lg mx-auto leading-relaxed">
            Nikmati fasilitas lengkap dengan atmosfer hunian yang tenang, aman, dan ramah di kantong mahasiswa.
          </p>
        </div>
      </div>

      {/* Grid Kamar */}
      <div className="max-w-6xl mx-auto py-8 md:py-12 px-3 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {daftarKamar.map((kamar) => {
            const isTerisi = kamar.status.toLowerCase() === 'terisi';

            return (
              <div key={kamar.id} className="group bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                  
                  {/* BAGIAN FOTO KAMAR */}
                  <div className="h-44 md:h-52 relative overflow-hidden bg-slate-100">
                    <Image 
                      src={kamar.gambar} 
                      alt={kamar.namaKamar}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Overlay gradien gelap di atas foto supaya teks status tetep kebaca jelas */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

                    {/* Badge Nama Kamar di Kiri Atas */}
                    <span className="absolute top-3 left-3 text-white font-black text-[11px] bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md tracking-wider">
                      {kamar.namaKamar.toUpperCase()}
                    </span>

                    {/* Badge Status Kamar di Kanan Atas */}
                    <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-md text-[9px] font-extrabold uppercase tracking-wider shadow-sm ${isTerisi ? 'bg-rose-600 text-white' : 'bg-emerald-500 text-slate-950'}`}>
                      {kamar.status}
                    </span>
                  </div>
                  
                  <div className="p-4 md:p-5">
                    <div className="flex items-baseline mb-3.5">
                      <span className="text-lg md:text-2xl font-black text-slate-900">Rp {kamar.harga.toLocaleString('id-ID')}</span>
                      <span className="text-xs text-slate-400 font-semibold ml-1">/ bulan</span>
                    </div>
                    
                    {/* Fasilitas */}
                    <div className="flex flex-wrap gap-1.5">
                      {kamar.fasilitas.map((f, i) => (
                        <span key={i} className="bg-slate-50 text-slate-600 text-[10px] font-bold px-2 py-1 rounded-md border border-slate-200/80 flex items-center gap-1">
                          ✓ {f}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                <div className="px-4 pb-4 md:px-5 md:pb-5 pt-2">
                  {isTerisi ? (
                    <button disabled className="w-full bg-slate-100 text-slate-400 border border-slate-200 py-2.5 rounded-xl text-xs md:text-sm font-bold cursor-not-allowed text-center">
                      Kamar Penuh
                    </button>
                  ) : (
                    <Link href={`/booking/${kamar.id}`} className="block w-full">
                      <button className="w-full bg-slate-900 text-white py-2.5 rounded-xl text-xs md:text-sm font-bold shadow-md hover:bg-emerald-600 active:scale-95 transition-all text-center">
                        Booking Sekarang
                      </button>
                    </Link>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </main>
  );
}