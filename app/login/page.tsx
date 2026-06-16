'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Skenario Password Default tetep aktif di latar belakang buat lu coba-coba
  const PASSWORD_DEFAULT = 'nuansa123';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (username.trim() === '' || password.trim() === '') {
      setError('Username dan password wajib diisi!');
      return;
    }

    if (password !== PASSWORD_DEFAULT) {
      setError('Password salah! Pastikan sesuai dengan yang diberikan Admin via WA.');
      return;
    }

    setSuccess(`Login Berhasil! Selamat datang kembali, ${username}.`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-emerald-50/20 to-slate-100 flex flex-col justify-between">
      
      <div className="w-full">
        {/* Header Banner Gelap */}
        <div className="relative bg-slate-900 text-white py-12 overflow-hidden text-center">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-600/20 rounded-full blur-2xl"></div>
          <div className="max-w-xl mx-auto px-4 relative z-1">
            <Link href="/" className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold uppercase tracking-wider bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800 transition">
              ← Kembali ke Beranda
            </Link>
            <h1 className="text-2xl md:text-3xl font-extrabold mt-4 mb-1 tracking-tight">
              Dashboard Penyewa
            </h1>
            <p className="text-slate-400 text-sm">
              Masuk untuk melihat status pembayaran & fasilitas kost Anda
            </p>
          </div>
        </div>

        {/* Area Box Login */}
        <div className="max-w-md mx-auto py-8 px-4">
          <div className="bg-white rounded-3xl shadow-md border border-slate-200/60 p-6 md:p-8">
            
            {/* Pesan Error */}
            {error && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-xs font-semibold">
                ⚠️ {error}
              </div>
            )}

            {/* Pesan Sukses */}
            {success && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-xl text-xs font-semibold">
                ✅ {success}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              
              {/* Input Username */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Username
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan nama saat booking"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition relative z-0"
                />
              </div>

              {/* Input Password dengan Tombol Mata Berkualitas */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password dari WA Admin"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-12 py-3 text-sm text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition relative z-0"
                  />
                  
                  {/* Tombol Icon Mata - Dipaksa stop submit form */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowPassword(!showPassword);
                    }}
                    className="absolute right-3 p-2 text-slate-400 hover:text-slate-600 focus:outline-none z-10 cursor-pointer"
                    title={showPassword ? "Sembunyikan Password" : "Tampilkan Password"}
                  >
                    {showPassword ? (
                      // Icon Mata Coret (Hide)
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 pointer-events-none">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      // Icon Mata Terbuka (Show)
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 pointer-events-none">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Teks Box Edukasi Normal */}
              <div className="bg-amber-50/60 border border-amber-200/60 rounded-2xl p-4 text-[11px] text-amber-700 leading-relaxed">
                <span className="font-bold block mb-0.5">💡 Belum punya akun?</span>
                Akun otomatis dibuat setelah Anda mengisi form booking. Password default akan dikirimkan oleh Admin bersamaan dengan konfirmasi via WhatsApp.
              </div>

              {/* Tombol Aksi */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-emerald-600 text-white py-3.5 rounded-xl text-sm font-bold shadow-md shadow-emerald-600/10 hover:bg-emerald-700 hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
                >
                  Masuk Sekarang
                </button>
              </div>

            </form>

          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6 text-xs text-slate-400 font-medium">
        © 2026 Kost Nuansa. All rights reserved.
      </div>

    </main>
  );
}