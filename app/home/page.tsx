import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';

// Definisi interface yang jelas untuk TypeScript
interface Kamar {
  id: number;
  namaKamar: string;
  harga: number;
  status: string;
  fasilitas: string[];
  gambar: string;
}

export default async function Home() {
  // Ambil data menggunakan path absolute dari root project
  const filePath = path.join(process.cwd(), 'data', 'kamar.json');
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const daftarKamar: Kamar[] = JSON.parse(fileContent);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-emerald-50/20 to-slate-100">
      {/* Hero Section */}
      <div className="relative bg-slate-900 text-white py-12 md:py-16 overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-600/20 rounded-full blur-2xl"></div>
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-2xl md:text-5xl font-extrabold mt-3 mb-2 tracking-tight">
            Cari Kamar Nyaman & Strategis
          </h1>
          <p className="text-slate-400 text-xs md:text-lg">
            Nikmati fasilitas premium dengan atmosfer hunian yang tenang.
          </p>
        </div>
      </div>

      {/* Grid Kamar */}
      <div className="max-w-6xl mx-auto py-6 md:py-12 px-2 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
          {daftarKamar.map((kamar: Kamar) => {
            const isTerisi = kamar.status.toLowerCase() === 'terisi';

            return (
              <div key={kamar.id} className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className={`h-32 md:h-52 flex items-center justify-center bg-gradient-to-br ${isTerisi ? 'from-slate-600 to-slate-800' : 'from-emerald-700 to-slate-800'}`}>
                    <span className="text-white font-semibold text-xs bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                      {kamar.namaKamar.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="p-4 md:p-6">
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-base md:text-xl font-bold text-slate-800 truncate">{kamar.namaKamar}</h2>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase border ${isTerisi ? 'bg-rose-50 text-rose-600 border-rose-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                        {kamar.status}
                      </span>
                    </div>

                    <div className="flex items-baseline mb-4">
                      <span className="text-sm md:text-2xl font-black text-slate-900">Rp {kamar.harga.toLocaleString('id-ID')}</span>
                      <span className="text-[10px] text-slate-400 ml-1">/bln</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {kamar.fasilitas.map((f: string, i: number) => (
                        <span key={i} className="bg-slate-50 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded border border-slate-200">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-4 pb-4 md:px-6 md:pb-6">
                  {isTerisi ? (
                    <button disabled className="w-full bg-slate-200 text-slate-400 py-2 rounded-lg text-xs md:text-sm font-bold cursor-not-allowed">
                      Sudah Terisi
                    </button>
                  ) : (
                    <Link href={`/booking/${kamar.id}`}>
                      <button className="w-full bg-emerald-600 text-white py-2 rounded-lg text-xs md:text-sm font-bold shadow-md hover:bg-emerald-700 transition-all">
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