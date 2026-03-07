import React from "react";
import logo from "../assets/img/logo.jpg";

const Navbar = () => {
  return (
    <div className="w-full bg-white shadow-md flex items-center justify-between px-8 py-3">

      {/* LEFT - LOGO KAMPUS */}
      <div className="flex items-center gap-3">
        <img 
          src={logo}
          alt="Logo Kampus"
          className="w-10 h-10 object-contain"
        />

        <div>
          <h1 className="text-sm font-bold text-gray-800">
            Universitas
          </h1>

          <p className="text-xs text-gray-500">
            Ibn Khaldun Bogor
          </p>
        </div>
      </div>


      {/* MENU */}
      <div className="flex items-center gap-8 text-gray-600 font-medium">

        <button className="hover:text-green-600">
          Dashboard
        </button>

        <button className="hover:text-green-600">
          Template
        </button>

        <button className="hover:text-green-600">
          Input Data
        </button>

        <button className="hover:text-green-600">
          Manajemen Data
        </button>

      </div>


      {/* ADMIN */}
      <div className="flex items-center gap-3">

        <div className="text-right">
          <p className="text-sm font-semibold">
            Admin
          </p>

          <p className="text-xs text-gray-500">
            Executive
          </p>
        </div>

        <div className="w-9 h-9 rounded-full bg-gray-300"></div>

      </div>

    </div>
  );
};

export default Navbar;