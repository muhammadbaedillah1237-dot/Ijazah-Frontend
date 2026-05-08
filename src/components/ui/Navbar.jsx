// src/components/ui/Navbar.jsx
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FiBell, FiUser, FiMenu, FiX } from "react-icons/fi";
import logo from "../../assets/img/Logo.jpg";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(false);

  // Mengambil data user dari localStorage
  const [user, setUser] = useState({
    name: localStorage.getItem("name") || "User",
    subName: localStorage.getItem("subName") || "Sistem",
    role: localStorage.getItem("role") || "admin",
    kategori: localStorage.getItem("kategori") || ""
  });

  // Konfigurasi Menu Dinamis berdasarkan Role
  const menuConfig = {
    admin: [
      { name: "Dashboard", path: "/admin-dashboard" },
      { name: "Template", path: "/template" },
      { name: "Data Mahasiswa", path: "/data-mahasiswa" },
      { name: "Daftar Unit", path: "/daftar-unit" },
      { name: "Daftar Pengguna", path: "/daftar-pengguna" },
    ],
    operator: [
      { name: "Dashboard", path: "/operator-dashboard" },
      { name: "Manajemen Data", path: "/manajemen-data" },
      { name: "Pelaporan", path: "/pelaporan" },
      { name: "Dokumen Valid", path: "/dokumen-valid" },
    ],
    tata_usaha: [
      { name: "Dashboard", path: "/verifikator-dashboard" },
      { name: "Manajemen Data", path: "/manajemen-data" },
      { name: "Pelaporan", path: "/pelaporan" },
    ],
    wakil_dekan: [
      { name: "Dashboard", path: "/verifikator-dashboard" },
      { name: "Manajemen Data", path: "/manajemen-data" },
      { name: "Pelaporan", path: "/pelaporan" },
    ],
    dekan: [
      { name: "Dashboard", path: "/verifikator-dashboard" },
      { name: "Manajemen Data", path: "/manajemen-data" },
      { name: "Pelaporan", path: "/pelaporan" },
    ],
    rektorat: [
      { name: "Dashboard", path: "/verifikator-dashboard" },
      { name: "Manajemen Data", path: "/manajemen-data" },
      { name: "Pelaporan", path: "/pelaporan" },
    ],
    wakil_rektor: [
      { name: "Dashboard", path: "/verifikator-dashboard" },
      { name: "Manajemen Data", path: "/manajemen-data" },
      { name: "Pelaporan", path: "/pelaporan" },
    ],
    rektor: [
      { name: "Dashboard", path: "/rektor-dashboard" },
      { name: "Manajemen Data", path: "/manajemen-data" },
      { name: "Pelaporan", path: "/pelaporan" },
      { name: "Dokumen Valid", path: "/dokumen-valid" },
    ],
    verifikator: [
      { name: "Dashboard", path: "/verifikator-dashboard" },
      { name: "Data Mahasiswa", path: "/data-mahasiswa" },
      { name: "Daftar Unit", path: "/daftar-unit" },
    ],
  };

  // Menentukan menu berdasarkan role
  const getActiveMenus = () => {
    const { role } = user;
    
    // Verifikator
    if (role === "verifikator") {
      return menuConfig.verifikator;
    }
    
    // Role yang menggunakan verifikator dashboard
    const verifikatorRoles = ["tata_usaha", "wakil_dekan", "dekan", "rektorat", "wakil_rektor"];
    if (verifikatorRoles.includes(role)) {
      return menuConfig[role] || menuConfig.verifikator;
    }
    
    // Role lainnya
    return menuConfig[role] || menuConfig.admin;
  };

  const activeMenus = getActiveMenus();

  // Cek apakah route aktif (khusus Data Mahasiswa dengan multiple paths)
  const isRouteActive = (path) => {
    if (path === "/data-mahasiswa") {
      const activePaths = ["/data-mahasiswa", "/detail-batch", "/detail-mahasiswa"];
      return activePaths.some(activePath => location.pathname.startsWith(activePath));
    }
    return location.pathname === path;
  };

  // Style untuk link desktop
  const linkClass = (path) => {
    const isActive = isRouteActive(path);
    return `px-4 py-2 text-sm font-medium transition-all duration-300 relative
      ${isActive ? "text-[#27AE60]" : "text-gray-500 hover:text-[#27AE60]"}
      ${isActive ? "after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[0.5px] after:bg-[#27AE60]" : ""}`;
  };

  // Mendapatkan dashboard path untuk logo
  const getDashboardPath = () => {
    const { role } = user;
    
    const dashboardMap = {
      admin: "/admin-dashboard",
      operator: "/operator-dashboard",
      rektor: "/rektor-dashboard",
    };
    
    if (dashboardMap[role]) return dashboardMap[role];
    
    const verifikatorRoles = ["verifikator", "tata_usaha", "wakil_dekan", "dekan", "rektorat", "wakil_rektor"];
    if (verifikatorRoles.includes(role)) {
      return "/verifikator-dashboard";
    }
    
    return "/admin-dashboard";
  };

  // Mendapatkan display name untuk subTitle
  const getDisplaySubName = () => {
    const { kategori, role, subName } = user;
    
    const displayMap = {
      verifikator_fakultas: "Verifikator Fakultas",
      verifikator_rektorat: "Verifikator Rektorat",
      tata_usaha: "Tata Usaha",
      wakil_dekan: "Wakil Dekan",
      dekan: "Dekan",
      rektorat: "Rektorat",
      wakil_rektor: "Wakil Rektor",
    };
    
    return displayMap[kategori] || displayMap[role] || subName;
  };

  return (
    <nav className="w-full bg-white shadow-sm px-4 md:px-8 py-3 flex items-center justify-between border-b border-gray-100 relative z-50">
      
      {/* KIRI: LOGO */}
      <NavLink 
        to={getDashboardPath()} 
        className="flex items-center gap-3 cursor-pointer select-none group"
      >
        <img 
          src={logo} 
          alt="Logo UIKA" 
          className="w-10 h-10 md:w-12 md:h-12 object-contain transition-transform group-hover:scale-105" 
        />
        <div className="leading-tight hidden sm:block">
          <div className="text-black font-semibold text-sm">Universitas</div>
          <div className="text-[#27AE60] font-bold text-sm">Ibn Khaldun Bogor</div>
        </div>
      </NavLink>

      {/* TENGAH: NAVIGASI DESKTOP */}
      <div className="hidden md:flex gap-4 lg:gap-8">
        {activeMenus.map((menu, idx) => (
          <NavLink key={idx} to={menu.path} className={linkClass(menu.path)}>
            {menu.name}
          </NavLink>
        ))}
      </div>

      {/* KANAN: NOTIF & PROFILE */}
      <div className="flex items-center gap-4 md:gap-6">
        
        {/* Bell Icon */}
        <button 
          className="relative cursor-pointer text-gray-400 hover:text-[#27AE60] transition-colors"
          aria-label="Notifikasi"
        >
          <FiBell size={22} />
          <span className="absolute top-0 right-0 bg-red-500 w-2.5 h-2.5 rounded-full border-2 border-white animate-pulse"></span>
        </button>

        {/* Profile Section */}
        <NavLink 
          to="/profile"
          className="flex items-center gap-3 border-l pl-4 md:pl-6 cursor-pointer group"
        >
          <div className="text-right leading-tight hidden sm:block">
            <div className="text-gray-800 font-semibold text-sm capitalize">{user.name}</div>
            <div className="text-[11px] text-gray-500 font-medium">
              {getDisplaySubName()}
            </div>
          </div>
          
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-[#27AE60] flex items-center justify-center text-[#27AE60] bg-gray-50 group-hover:bg-[#27AE60] group-hover:text-white transition-all duration-300">
            <FiUser size={20} />
          </div>
        </NavLink>

        {/* HAMBURGER MOBILE */}
        <button 
          className="md:hidden ml-1 text-gray-600 hover:text-[#27AE60] transition-colors" 
          onClick={() => setOpenMenu(!openMenu)}
          aria-label="Menu"
        >
          {openMenu ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>

      </div>

      {/* MOBILE MENU (SLIDE-IN) */}
      <div className={`
        fixed inset-0 top-[64px] bg-white z-[60] flex flex-col items-center gap-6 pt-10 
        transition-transform duration-300 ease-in-out md:hidden
        ${openMenu ? "translate-x-0" : "translate-x-full"}
      `}>
        {activeMenus.map((menu, index) => (
          <NavLink 
            key={index} 
            to={menu.path} 
            className={({ isActive }) => 
              `text-lg font-semibold transition-colors ${isActive ? "text-[#27AE60]" : "text-gray-700"}`
            }
            onClick={() => setOpenMenu(false)}
          >
            {menu.name}
          </NavLink>
        ))}
        <hr className="w-3/4 border-gray-200" />
        <NavLink 
          to="/profile"
          onClick={() => setOpenMenu(false)}
          className="text-[#27AE60] font-semibold text-base border-2 border-[#27AE60] px-8 py-2 rounded-full mt-2 hover:bg-[#27AE60] hover:text-white transition-all duration-300"
        >
          Lihat Profil
        </NavLink>
      </div>

    </nav>
  );
};

export default Navbar;