// src/components/ui/DashboardLayout.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; // Perhatikan: Navbar di folder yang sama (ui/)

const DashboardLayout = ({ children, title }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  useEffect(() => {
    if (title) {
      document.title = `${title} | UIKA Ijazah Digital`;
    }
  }, [title]);

  if (!token) {
    return null;
  }

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Navbar />
      <main className="w-full px-4 md:px-8 py-6">
        <div className="w-full max-w-[1400px] mx-auto">
          {title && (
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            </div>
          )}
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;