import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiBell, FiUser, FiMenu, FiX } from "react-icons/fi";
import logo from "../../assets/img/Logo.jpg"; // Sesuaikan path logo Anda

const Navbar = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

  // Mengambil data user yang disimpan oleh Login.jsx di localStorage
  const [user, setUser] = useState({
    name: localStorage.getItem("name") || "User",
    subName: localStorage.getItem("subName") || "Sistem",
    role: localStorage.getItem("role") || "admin"
  });

  // Konfigurasi Menu Dinamis berdasarkan Role (seperti sebelumnya)
  const menuConfig = {
    admin: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Template", path: "/template" },
      { name: "Data Mahasiswa", path: "/data-mahasiswa" },
      { name: "Daftar Unit", path: "/daftar-unit" },
      { name: "Daftar Pengguna", path: "/daftar-pengguna" },
    ],
    operator: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Manajemen Data", path: "/manajemen-data" },
      { name: "Pelaporan", path: "/pelaporan" },
      { name: "Dokumen Valid", path: "/dokumen-valid" },
    ],
    tata_usaha: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Manajemen Data", path: "/manajemen-data" },
      { name: "Pelaporan", path: "/pelaporan" },
    ],
    wakil_dekan: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Manajemen Data", path: "/manajemen-data" },
      { name: "Pelaporan", path: "/pelaporan" },
    ],
    dekan: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Manajemen Data", path: "/manajemen-data" },
      { name: "Pelaporan", path: "/pelaporan" },
    ],
    rektorat: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Manajemen Data", path: "/manajemen-data" },
      { name: "Pelaporan", path: "/pelaporan" },
    ],
    wakil_rektor: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Manajemen Data", path: "/manajemen-data" },
      { name: "Pelaporan", path: "/pelaporan" },
    ],
    rektor: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Manajemen Data", path: "/manajemen-data" },
      { name: "Pelaporan", path: "/pelaporan" },
      { name: "Dokumen Valid", path: "/dokumen-valid" },
    ],
  };

  const activeMenus = menuConfig[user.role] || [{ name: "Dashboard", path: "/dashboard" }];

  const linkClass = ({ isActive }) =>
    `px-4 py-2 text-sm font-medium transition-all duration-300
     ${isActive ? "text-[#0B4B48] border-b-2 border-[#0B4B48]" : "text-gray-500 hover:text-[#0B4B48]"}`;

  return (
    <nav className="w-full bg-white shadow-sm px-4 md:px-8 py-3 flex items-center justify-between border-b border-gray-100 relative z-50">
      
      {/* KIRI: LOGO */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="Logo UIKA" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
        <div className="leading-tight hidden sm:block">
          <div className="text-[#0B4B48] font-bold text-sm">Universitas</div>
          <div className="text-[#27AE60] font-bold text-sm">Ibn Khaldun Bogor</div>
        </div>
      </div>

      {/* TENGAH: NAVIGASI DESKTOP */}
      <div className="hidden md:flex gap-4 lg:gap-8">
        {activeMenus.map((menu, idx) => (
          <NavLink key={idx} to={menu.path} className={linkClass}>
            {menu.name}
          </NavLink>
        ))}
      </div>

      {/* KANAN: NOTIF & PROFILE */}
      <div className="flex items-center gap-4 md:gap-6">
        
        {/* Bell Icon */}
        <div className="relative cursor-pointer text-gray-400 hover:text-gray-600">
          <FiBell size={22} />
          <span className="absolute top-0 right-0 bg-red-500 w-2.5 h-2.5 rounded-full border-2 border-white"></span>
        </div>

        {/* Profile Info - KLIK PINDAH KE PROFILE */}
        <div 
          className="flex items-center gap-3 border-l pl-4 md:pl-6 cursor-pointer group"
          onClick={() => navigate('/Profile')}
        >
          <div className="text-right leading-tight hidden sm:block">
            <div className="text-[#0B4B48] font-bold text-sm capitalize">{user.name}</div>
            <div className="text-[10px] text-teal-600 font-medium capitalize">{user.subName}</div>
          </div>
          
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-[#0B4B48] flex items-center justify-center text-[#0B4B48] bg-gray-50 group-hover:bg-[#0B4B48] group-hover:text-white transition-colors duration-300">
            <FiUser size={20} />
          </div>
        </div>

        {/* HAMBURGER MOBILE */}
        <button className="md:hidden ml-1 text-gray-600" onClick={() => setOpenMenu(!openMenu)}>
          {openMenu ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>

      </div>

      {/* MOBILE MENU (DINAMIS) */}
      <div className={`fixed inset-0 top-[64px] bg-white z-[60] flex flex-col items-center gap-6 pt-10 transition-transform duration-300 ${openMenu ? "translate-x-0" : "translate-x-full"} md:hidden`}>
        {activeMenus.map((menu, index) => (
          <NavLink 
            key={index} 
            to={menu.path} 
            className="text-lg font-bold text-gray-700" 
            onClick={() => setOpenMenu(false)}
          >
            {menu.name}
          </NavLink>
        ))}
        <hr className="w-3/4 border-gray-100" />
        <button 
          onClick={() => { setOpenMenu(false); navigate('/profile'); }} 
          className="text-[#0B4B48] font-bold text-lg border-2 border-[#0B4B48] px-8 py-2 rounded-full mt-2"
        >
          Lihat Profil
        </button>
      </div>

    </nav>
  );
};

export default Navbar;