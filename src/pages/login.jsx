import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import bgLogin from "../assets/img/background.jpg";
import logoUika from "../assets/img/Logo.jpg";

const Login = () => {

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e) => {
    e.preventDefault()

    if (username === "admin" && password === "admin123") {
      navigate("/dashboard")
    } else {
      alert("Username atau password salah")
    }
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgLogin})` }}
    >

      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md text-center">

        <img 
          src={logoUika}
          alt="Logo Universitas Ibn Khaldun Bogor"
          className="w-24 h-24 mx-auto mb-4"
        />

        <h2 className="text-xl font-bold text-gray-800">
          Universitas Ibn Khaldun Bogor
        </h2>

        <p className="text-sm text-gray-600 mb-8">
          Verifikasi & Akses Ijazah Digital
        </p>

        <form onSubmit={handleLogin} className="space-y-6 text-left">

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Username
            </label>

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-lg"
          >
            Masuk
          </button>

        </form>
      </div>
    </div>
  )
}

export default Login