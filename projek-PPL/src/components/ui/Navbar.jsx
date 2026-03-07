import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/img/Logo.jpg";
import userIcon from "../../assets/img/user.svg";
import notifIcon from "../../assets/img/notif.svg";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const menus = ["Dashboard", "Template", "Tambah User"];

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 h-16 md:h-20 shadow-sm">
      <div className="w-full h-full px-4 md:px-10 flex items-center justify-between">
        
        {/* SISI KIRI: Logo - Dikunci lebarnya agar tidak geser */}
        <div className="flex items-center gap-3 min-w-max">
          <img src={logo} alt="Logo UIKA" className="h-8 md:h-11 w-auto" />
          <div className="flex flex-col leading-none">
            <span className="text-[13px] font-extrabold text-gray-800 uppercase tracking-tight">Universitas</span>
            <span className="text-[13px] font-extrabold text-teal-700">Ibn Khaldun Bogor</span>
          </div>
        </div>

        {/* TENGAH: Menu - Desktop only */}
        <div className="hidden md:flex flex-1 justify-center items-center h-full gap-10">
          {menus.map((item) => (
            <button
              key={item}
              onClick={() => setActiveMenu(item)}
              className={`relative h-full flex items-center px-1 text-sm font-bold transition-colors ${
                activeMenu === item ? "text-teal-700" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {item}
              {activeMenu === item && (
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-teal-700 rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        {/* SISI KANAN: User & Notif - Desktop only */}
        <div className="hidden md:flex items-center gap-6 min-w-max">
          <div className="relative cursor-pointer p-1">
            <img src={notifIcon} alt="Notif" className="w-6 h-6" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-600 text-[10px] text-white flex items-center justify-center rounded-full border-2 border-white font-bold">1</span>
          </div>

          <div className="h-10 w-[1px] bg-gray-200" />

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <div 
              className="flex items-center gap-3 cursor-pointer" 
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <div className="text-right leading-none">
                <p className="text-[13px] font-bold text-gray-900 mb-1 uppercase">{user?.name || "Admin"}</p>
                <p className="text-[10px] font-bold text-gray-400">{user?.role || "Sistem"}</p>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-teal-500 bg-teal-50 overflow-hidden shadow-sm flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-teal-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
            </div>
            
            {/* Profile Dropdown Menu */}
            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-xs font-bold text-gray-500">Masuk sebagai</p>
                  <p className="text-sm font-bold text-gray-800">{user?.name || "Administrator"}</p>
                  <p className="text-xs text-gray-400">{user?.role || "Admin Sistem"}</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50 font-medium"
                >
                  Keluar
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-gray-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {mobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 md:top-20 left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
          <div className="flex flex-col p-4">
            {/* Mobile User Info with Profile Click */}
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100 mb-4">
              <div className="w-10 h-10 rounded-full border-2 border-teal-500 bg-teal-50 overflow-hidden shadow-sm flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-teal-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <div>
                <p className="text-[13px] font-bold text-gray-900 uppercase">{user?.name || "Admin"}</p>
                <p className="text-[10px] font-bold text-gray-400">{user?.role || "Sistem"}</p>
              </div>
              <div className="ml-auto relative cursor-pointer p-1">
                <img src={notifIcon} alt="Notif" className="w-6 h-6" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-600 text-[10px] text-white flex items-center justify-center rounded-full border-2 border-white font-bold">1</span>
              </div>
            </div>
            
            {/* Mobile Menu Items */}
            {menus.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActiveMenu(item);
                  setMobileMenuOpen(false);
                }}
                className={`py-3 px-4 text-left text-sm font-bold transition-colors rounded-lg ${
                  activeMenu === item 
                    ? "text-teal-700 bg-teal-50" 
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                }`}
              >
                {item}
              </button>
            ))}

            {/* Mobile Logout */}
            <button
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              className="py-3 px-4 text-left text-sm font-bold text-red-500 hover:bg-red-50 rounded-lg mt-2"
            >
              Keluar
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

