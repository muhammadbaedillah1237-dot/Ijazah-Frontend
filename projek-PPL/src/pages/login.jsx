import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import bgLogin from "../assets/img/background.jpg";
import logoUika from "../assets/img/Logo.jpg";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Determine where to redirect after login (default to dashboard)
  const from = location.state?.from?.pathname || "/dashboard";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Validasi input kosong
    if (!username.trim() || !password.trim()) {
      setError("Username dan password harus diisi");
      return;
    }

    setLoading(true);

    try {
      // Simulasi loading 800ms
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Logika pengecekan kredensial
      if (username === "admin" && password === "admin123") {
        const userData = {
          username: username,
          role: "admin",
          name: "Administrator",
        };

        // Simpan data user ke context/state global
        login(userData, "mock-token-123");

        // PINDAH KE DASHBOARD
        // replace: true digunakan agar user tidak bisa kembali ke login pakai tombol 'back' browser
        navigate("/dashboard", { replace: true });
      } else {
        setError("Username atau password salah");
      }
    } catch (err) {
      setError("Terjadi kesalahan teknis. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 md:p-6"
      style={{ backgroundImage: `url(${bgLogin})` }}
    >
      {/* Overlay Gelap Transparan sesuai Figma */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Card Utama - Corner radius 15px */}
      <div className="relative bg-white p-6 md:p-10 lg:p-12 rounded-[15px] shadow-2xl w-full max-w-sm md:max-w-md text-center">
        {/* 1. Logo di bagian paling atas - ukuran diperbesar */}
        <div className="flex justify-center mb-4 md:mb-6">
          <img
            src={logoUika}
            alt="Logo Universitas"
            className="w-28 h-28 md:w-40 md:h-40 object-contain"
          />
        </div>

        {/* 2. Judul dan Sub-judul */}
        <h2 className="text-lg md:text-xl font-bold text-gray-800">
          Universitas Ibn Khaldun Bogor
        </h2>
        <p className="text-xs font-medium text-gray-500 mt-1 mb-6 md:mb-8">
          Verifikasi & Akses Ijazah Digital
        </p>

        {/* 3. Form Input dengan label tipis */}
        <form onSubmit={handleLogin} className="space-y-4 md:space-y-5 text-left">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Username
            </label>

            <input
              type="text"
              placeholder="admineksekutif"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all placeholder:text-gray-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all placeholder:text-gray-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-xs">
              {error}
            </div>
          )}

          {/* 4. Tombol Hijau Gelap (Emerald/Teal) sesuai Figma */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#115e59] hover:bg-[#134e4a] disabled:bg-[#6b7280] disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg mt-2 transition-all text-sm shadow-md flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Memproses...
              </>
            ) : (
              "Masuk"
            )}
          </button>
        </form>

        {/* Demo Credentials Hint */}
        <div className="mt-5 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400">Demo: admin / admin123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
