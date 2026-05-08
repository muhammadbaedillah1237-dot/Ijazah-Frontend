// frontend-ijazah/src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import bgLogin from "../assets/img/background.jpg";
import logoUika from "../assets/img/Logo.jpg";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || "/dashboard";

  // Mock Users dengan pembagian role:
  // - admin: akses penuh ke sistem
  // - operator: mengelola data
  // - verifikator_fakultas: tata usaha fakultas, wakil dekan, dekan
  // - verifikator_rektorat: tata usaha rektorat, wakil rektor, rektor
  const mockUsers = [
    // ADMIN
    { 
      username: "admin@gmail.com", 
      password: "123", 
      role: "admin", 
      name: "Admin Utama", 
      subName: "Sistem", 
      dashboardPath: "/admin-dashboard",
      kategori: "admin"
    },
    
    // OPERATOR
    { 
      username: "operator@gmail.com", 
      password: "123", 
      role: "operator", 
      name: "Operator Prodi", 
      subName: "Teknik Informatika", 
      dashboardPath: "/operator-dashboard",
      kategori: "operator"
    },
    
    // VERIFIKATOR - FAKULTAS (Tata Usaha Fakultas, Wakil Dekan, Dekan)
    { 
      username: "tatausaha.fakultas@gmail.com", 
      password: "123", 
      role: "verifikator", 
      name: "Tata Usaha", 
      subName: "Fakultas Teknik", 
      dashboardPath: "/verifikator-dashboard",
      kategori: "verifikator_fakultas",
      level: "tata_usaha_fakultas"
    },
    { 
      username: "wakildekan@gmail.com", 
      password: "123", 
      role: "verifikator", 
      name: "Wakil Dekan", 
      subName: "Fakultas Teknik", 
      dashboardPath: "/verifikator-dashboard",
      kategori: "verifikator_fakultas",
      level: "wakil_dekan"
    },
    { 
      username: "dekan@gmail.com", 
      password: "123", 
      role: "verifikator", 
      name: "Dekan", 
      subName: "Fakultas Teknik", 
      dashboardPath: "/verifikator-dashboard",
      kategori: "verifikator_fakultas",
      level: "dekan"
    },
    
    // VERIFIKATOR - REKTORAT (Tata Usaha Rektorat, Wakil Rektor, Rektor)
    { 
      username: "tatausaha.rektorat@gmail.com", 
      password: "123", 
      role: "verifikator", 
      name: "Tata Usaha", 
      subName: "Rektorat", 
      dashboardPath: "/verifikator-dashboard",
      kategori: "verifikator_rektorat",
      level: "tata_usaha_rektorat"
    },
    { 
      username: "wakilrektor@gmail.com", 
      password: "123", 
      role: "verifikator", 
      name: "Wakil Rektor", 
      subName: "Rektorat", 
      dashboardPath: "/verifikator-dashboard",
      kategori: "verifikator_rektorat",
      level: "wakil_rektor"
    },
    { 
      username: "rektor@gmail.com", 
      password: "123", 
      role: "rektor", 
      name: "Prof. Dr. Rektor", 
      subName: "Rektorat", 
      dashboardPath: "/rektor-dashboard",
      kategori: "rektor",
      level: "rektor"
    },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Username dan password harus diisi");
      return;
    }

    setLoading(true);
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Cari user berdasarkan username dan password
      const user = mockUsers.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        // Simpan data ke localStorage
        localStorage.setItem("token", "dummy-token-" + Date.now());
        localStorage.setItem("role", user.role);
        localStorage.setItem("namaRole", user.role === "admin" ? "Admin" : user.role === "operator" ? "Operator" : user.kategori === "verifikator_fakultas" ? "Verifikator Fakultas" : user.kategori === "verifikator_rektorat" ? "Verifikator Rektorat" : "Rektor");
        localStorage.setItem("name", user.name);
        localStorage.setItem("subName", user.subName);
        localStorage.setItem("dashboardPath", user.dashboardPath);
        localStorage.setItem("kategori", user.kategori || user.role);
        localStorage.setItem("level", user.level || "");

        // Redirect sesuai role ke dashboard masing-masing
        navigate(user.dashboardPath, { replace: true });
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
    <div className="relative min-h-screen flex items-center justify-center px-6 py-6 overflow-hidden">
      <img src={bgLogin} alt="background" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative w-full max-w-90 bg-white rounded-[28px] shadow-[0_15px_40px_rgba(0,0,0,0.25)] p-7 sm:p-9 flex flex-col">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 mb-3">
            <img src={logoUika} alt="Logo UIKA" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-[17px] sm:text-xl font-bold text-gray-800 text-center">
            Universitas Ibn Khaldun Bogor
          </h2>
          <p className="text-[10px] sm:text-xs text-gray-400 font-bold mt-1 uppercase tracking-wide text-center">
            Verifikasi & Akses Ijazah Digital
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[13px] font-bold text-gray-600 ml-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Masukkan username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-100 text-sm focus:ring-2 focus:ring-teal-600/10 focus:border-[#0d6b5e] outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[13px] font-bold text-gray-600 ml-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-2.5 pr-10 rounded-xl bg-gray-50 border border-gray-100 text-sm focus:ring-2 focus:ring-teal-600/10 focus:border-[#0d6b5e] outline-none"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 py-2 px-3 rounded-lg text-[11px] text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0d6b5e] hover:bg-[#0a5248] text-white font-bold py-3 rounded-xl transition-all"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;