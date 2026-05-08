import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiEye, FiEyeOff, FiLoader } from "react-icons/fi";
import bgLogin from "../assets/img/background.jpg";
import logoUika from "../assets/img/Logo.jpg";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || "/dashboard";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email dan password harus diisi");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.status === "success") {
        await login(data.data, data.token);
        navigate(from, { replace: true });
      } else {
        setError(data.message || "Email atau password salah");
      }
    } catch (err) {
      setError("Gagal terhubung ke server backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <img src={bgLogin} alt="bg" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative w-full max-w-90 bg-white rounded-[28px] shadow-2xl p-8 flex flex-col">
        <div className="flex flex-col items-center mb-6">
          <img src={logoUika} alt="Logo" className="w-24 h-24 mb-3 object-contain" />
          <h2 className="text-lg font-bold text-gray-800 text-center">
            Universitas Ibn Khaldun Bogor
          </h2>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            Verifikasi & Akses Ijazah Digital
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[13px] font-bold text-gray-600">Email</label>
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-100 text-sm outline-none focus:border-[#0d6b5e]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[13px] font-bold text-gray-600">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 pr-10 rounded-xl bg-gray-50 border border-gray-100 text-sm outline-none focus:border-[#0d6b5e]"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
              >
                {showPassword ? <FiEye size={18} /> : <FiEyeOff size={18} />}
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 py-2 px-3 rounded-lg text-[11px] text-center font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0d6b5e] hover:bg-[#0a5248] disabled:opacity-70 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all"
          >
            {loading ? <FiLoader className="animate-spin" size={18} /> : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;