import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/img/Logo.jpg";
import { FiUser } from "react-icons/fi";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActiveDataMahasiswa = [
    "/data-mahasiswa",
    "/detail-batch",
    "/detail-mahasiswa",
  ].some((path) => location.pathname.startsWith(path));

  const linkClass = (active) =>
    `relative px-4 py-2 text-sm transition ${
      active ? "text-[#27AE60] font-semibold" : "text-gray-500"
    }`;

  const activeLine = (active) =>
    active
      ? "after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[3px] after:bg-[#27AE60]"
      : "";

  return (
    <div className="w-full bg-white shadow px-6 py-3 flex items-center justify-between">

      {/* LOGO */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
        <div className="leading-tight">
          <div className="text-black font-semibold text-sm">Universitas</div>
          <div className="text-[#27AE60] font-bold text-sm">
            Ibn Khaldun Bogor
          </div>
        </div>
      </div>

      {/* MENU */}
      <div className="flex gap-6">

        <NavLink to="/dashboard">
          {({ isActive }) => (
            <span className={linkClass(isActive) + " " + activeLine(isActive)}>
              Dashboard
            </span>
          )}
        </NavLink>

        <NavLink to="/template">
          {({ isActive }) => (
            <span className={linkClass(isActive) + " " + activeLine(isActive)}>
              Template
            </span>
          )}
        </NavLink>

        <NavLink to="/data-mahasiswa">
          <span
            className={
              linkClass(isActiveDataMahasiswa) +
              " " +
              activeLine(isActiveDataMahasiswa)
            }
          >
            Data Mahasiswa
          </span>
        </NavLink>

        <NavLink to="/daftar-unit">
          {({ isActive }) => (
            <span className={linkClass(isActive) + " " + activeLine(isActive)}>
              Daftar Unit
            </span>
          )}
        </NavLink>

        {/* 🔥 FIX: DIJADIKAN NAVLINK BIAR STYLE SAMA */}
        <NavLink to="/daftar-pengguna">
          {({ isActive }) => (
            <span className={linkClass(isActive) + " " + activeLine(isActive)}>
              Daftar Pengguna
            </span>
          )}
        </NavLink>

      </div>

      {/* PROFILE */}
      <div className="relative flex items-center gap-3">

        <div className="text-right leading-tight">
          <div className="text-sm font-semibold text-gray-800">Admin</div>
          <div className="text-xs text-gray-500">Sistem</div>
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="w-10 h-10 flex items-center justify-center border rounded-full cursor-pointer hover:bg-gray-100"
        >
          <FiUser size={20} />
        </div>

        {open && (
          <div className="absolute right-0 top-12 bg-white shadow-lg rounded-lg w-32 py-2">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-500"
            >
              Logout
            </button>
          </div>
        )}

      </div>

    </div>
  );
};

export default Navbar;