import React from 'react';
// Sesuaikan nama file .jpg dengan yang ada di folder assets kamu
import bgLogin from '../assets/img/background.jpg'; 
import logoUika from '../assets/img/Logo.jpg';

const Login = () => {
  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgLogin})` }}
    >
      {/* Overlay agar background agak gelap dan form lebih kontras */}
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md text-center">
        {/* Logo UIKA */}
        <img 
          src={logoUika} 
          alt="Logo Universitas Ibn Khaldun Bogor" 
          className="w-24 h-24 mx-auto mb-4"
        />
        
        <h2 className="text-xl font-bold text-gray-800">Universitas Ibn Khaldun Bogor</h2>
        <p className="text-sm text-gray-600 mb-8">Verifikasi & Akses Ijazah Digital</p>

        <form className="space-y-6 text-left">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
            <input 
              type="text" 
              placeholder="Username"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-uika-green focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-uika-green focus:outline-none transition-all"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-uika-green hover:bg-uika-light text-white font-bold py-3 rounded-lg transition-colors shadow-lg mt-4"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

