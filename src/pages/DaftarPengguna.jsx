import React from "react";
import DashboardLayout from "../components/ui/DashboardLayout";

const DaftarPengguna = () => {
  return (
    <DashboardLayout>
      <div className="p-6 bg-[#F7F8FA] min-h-screen rounded-xl">

        <h1 className="text-xl font-semibold text-gray-800 mb-2">
          Daftar Pengguna
        </h1>

        <p className="text-sm text-gray-400 mb-6">
          Halaman manajemen user sementara (frontend)
        </p>

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          
          <table className="w-full text-sm">
            <thead className="text-gray-500 border-b">
              <tr>
                <th className="text-left py-2">Nama</th>
                <th className="text-left py-2">Email</th>
                <th className="text-left py-2">Role</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="py-3">Admin Sistem</td>
                <td className="py-3">admin@ui.com</td>
                <td className="py-3 text-[#27AE60]">Admin</td>
              </tr>

              <tr className="border-b">
                <td className="py-3">Operator Fakultas</td>
                <td className="py-3">operator@ui.com</td>
                <td className="py-3 text-blue-500">Operator</td>
              </tr>

            </tbody>
          </table>

        </div>

      </div>
    </DashboardLayout>
  );
};

export default DaftarPengguna;