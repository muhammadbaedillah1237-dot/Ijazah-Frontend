import React from "react";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-[#f5f6f8]">
      <Navbar />

      <main className="w-full px-4 md:px-8 py-6">
        <div className="w-full max-w-[1400px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;