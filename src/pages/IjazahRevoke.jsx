import React, { useState } from 'react';
import { Icons } from "../icon/DashboardIcons";
import Navbar from '../components/ui/Navbar';

// Mock Data untuk Ijazah Revoke
const revokedData = [
  { id: 1, nama: 'Bagus Sajiwo', nim: '211106040112', prodi: 'Teknik Informatika', noIjazah: 'UIKA-TI-2025-0012', tanggalRevoke: '10 Jan 2026', status: 'Revoked' },
  { id: 2, nama: 'Siti Aminah', nim: '211106040145', prodi: 'Sistem Informasi', noIjazah: 'UIKA-SI-2025-0089', tanggalRevoke: '12 Jan 2026', status: 'Revoked' },
  { id: 3, nama: 'Ahmad Fauzi', nim: '201106040221', prodi: 'Teknik Sipil', noIjazah: 'UIKA-TS-2024-0150', tanggalRevoke: '15 Jan 2026', status: 'Revoked' },
];

const IjazahRevokePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Logika pencarian berdasarkan Nama, NIM, atau No. Ijazah
  const filteredData = revokedData.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nim.includes(searchQuery) ||
      item.noIjazah.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 w-full">
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        
        {/* Page Title & Timestamp */}
        <div className="mb-6 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Jumlah Ijazah di Revoke</h2>
            <p className="text-sm text-gray-400 mt-1">Update terakhir: 17 Januari 2026, 09:10 WIB</p>
          </div>
          
          {/* Tombol Aksi Tambahan (Opsional: Biasanya butuh tombol untuk me-revoke ijazah baru) */}
          <button className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Cabut Ijazah Baru
          </button>
        </div>

        {/* Search Bar Section */}
        <div className="mb-6">
          <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border-transparent rounded-md text-sm focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" 
              placeholder="Cari: Nama, NIM, atau No. Ijazah" 
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-medium">
              <tr>
                <th className="py-4 px-6 text-center w-16">No.</th>
                <th className="py-4 px-6">Nama</th>
                <th className="py-4 px-6">NIM</th>
                <th className="py-4 px-6">Program Studi</th>
                <th className="py-4 px-6">No. Ijazah</th>
                <th className="py-4 px-6 text-center">Tgl Cabut</th>
                <th className="py-4 px-6 text-center">Status</th>
                <th className="py-4 px-6 text-center">Detail</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 text-center font-medium">{index + 1}.</td>
                  <td className="py-4 px-6 font-bold text-gray-800">{row.nama}</td>
                  <td className="py-4 px-6 font-semibold">{row.nim}</td>
                  <td className="py-4 px-6">{row.prodi}</td>
                  <td className="py-4 px-6 font-mono text-xs text-gray-500">{row.noIjazah}</td>
                  <td className="py-4 px-6 text-center whitespace-nowrap">{row.tanggalRevoke}</td>
                  <td className="py-4 px-6 text-center">
                    {/* Badge Revoked - Menggunakan warna merah gelap/hitam */}
                    <span className="inline-block px-4 py-1.5 bg-gray-800 text-white text-xs font-semibold rounded-full shadow-sm">
                      {row.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button className="text-gray-400 hover:text-teal-600 transition-colors" title="Lihat Detail Alasan Pencabutan">
                      {/* Document Icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* State Jika Data Tidak Ditemukan */}
          {filteredData.length === 0 && (
             <div className="py-8 text-center text-gray-500">
                Data ijazah yang dicabut tidak ditemukan.
             </div>
          )}
        </div>

        {/* Pagination - Disesuaikan agar konsisten */}
        <div className="flex justify-end items-center mt-6 gap-2 text-sm">
          <button className="w-8 h-8 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 disabled:opacity-50" disabled>&lt;</button>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-teal-600 text-white font-medium">1</button>
          <button className="w-8 h-8 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 disabled:opacity-50" disabled>&gt;</button>
        </div>

      </div>
    </div>
  );
};

export default IjazahRevokePage;