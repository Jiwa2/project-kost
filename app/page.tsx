import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export default function Home() {
  const filePath = path.join(process.cwd(), 'data', 'kamar.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const daftarKamar = JSON.parse(fileContent) as {
    id: number;
    namaKamar: string;
    harga: number;
    status: string;
    fasilitas: string[];
    gambar: string;
  }[];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-emerald-50/20 to-slate-100">
      
      {/* Hero Section Banner (Kotak Gelap di Atas) */}
      <div className="relative bg-slate-900 text-white py-12 md:py-16 overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-600/20 rounded-full blur-2xl"></div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl"></div>
        
        <div className="max-w-6xl mx-auto px-4 text-center relative z-1">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800">
            Sewa Kost Harian & Bulanan
          </span>
          <h1 className="text-2xl md:text-5xl font-extrabold mt-3 mb-2 tracking-tight">
            Cari Kamar Nyaman & Strategis
          </h1>
          <p className="text-slate-400 text-xs md:text-lg max-w-md mx-auto px-2">
            Nikmati fasilitas premium dengan atmosfer hunian yang tenang dan asri.
          </p>
        </div>
      </div>

      {/* Container List Kamar */}
      <div className="max-w-6xl mx-auto py-6 md:py-12 px-2 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
          {daftarKamar.map((kamar) => {
            const isTerisi = kamar.status.toLowerCase() === 'terisi';

            return (
              <div key={kamar.id} className="group bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden hover:border-emerald-500/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between">
                
                <div>
                  {/* Tempat Gambar */}
                  <div className={`relative h-32 md:h-52 flex items-center justify-center overflow-hidden bg-gradient-to-br ${
                    isTerisi ? 'from-slate-600 to-slate-800' : 'from-emerald-700 to-slate-800'
                  }`}>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
                    <span className="text-white font-semibold tracking-wider text-xs bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20 text-center">
                      {kamar.namaKamar.toUpperCase()}
                    </span>
                  </div>
                  
                  {/* Detail Kamar */}
                  <div className="p-3 md:p-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 mb-2">
                      <h2 className="text-base md:text-xl font-bold text-slate-800 tracking-tight group-hover:text-emerald-700 transition-colors truncate">
                        {kamar.namaKamar}
                      </h2>
                      <span className={`w-max px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide border ${
                        isTerisi 
                          ? 'bg-rose-50 text-rose-600 border-rose-200' 
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>
                        {kamar.status}
                      </span>
                    </div>

                    <div className="flex items-baseline mb-2 md:mb-4">
                      <span className="text-sm md:text-2xl font-black text-slate-900">Rp {kamar.harga.toLocaleString()}</span>
                      <span className="text-[10px] text-slate-400 ml-0.5">/bln</span>
                    </div>
                    
                    <hr className="border-slate-100 my-2 md:my-4" />

                    {/* Fasilitas */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {kamar.fasilitas.map((f, i) => (
                          <span key={i} className="bg-slate-50 text-slate-600 text-[8px] md:text-[10px] font-medium px-2 py-0.5 rounded border border-slate-200/60">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tombol Booking di bagian paling bawah card */}
                <div className="px-3 pb-3 md:px-6 md:pb-6">
                  {isTerisi ? (
                    <button 
                      disabled
                      className="w-full bg-slate-200 text-slate-400 py-2 md:py-3 rounded-lg md:rounded-xl text-xs md:text-sm font-bold cursor-not-allowed"
                    >
                      Sudah Terisi
                    </button>
                  ) : (
                    <Link href={`/booking/${kamar.id}`}>
                      <button className="w-full bg-emerald-600 text-white py-2 md:py-3 rounded-lg md:rounded-xl text-xs md:text-sm font-bold shadow-md shadow-emerald-600/10 hover:bg-emerald-700 hover:shadow-lg transition-all duration-200 active:scale-[0.98]">
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