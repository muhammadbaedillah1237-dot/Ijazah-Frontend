// src/components/ui/DashboardLayout.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const DashboardLayout = ({ children, title }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken"); // ← fix: "token" → "authToken"

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
        <div className="w-full max-w-400 mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;