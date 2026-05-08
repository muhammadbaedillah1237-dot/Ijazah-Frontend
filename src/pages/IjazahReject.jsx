import React, { useState } from 'react';
import { Icons } from "../icon/DashboardIcons";
import Navbar from '../components/ui/Navbar';
// Mock Data untuk Ijazah Reject
const rejectedData = [
  { id: 1, nama: 'Adi Saputra', nim: '231106040902', prodi: 'Teknik Informatika', tahun: '2025', status: 'Reject' },
  { id: 2, nama: 'Rani Maharani', nim: '231106040903', prodi: 'Teknik Mesin', tahun: '2025', status: 'Reject' },
  { id: 3, nama: 'Budi Pratama', nim: '231106040910', prodi: 'Teknik Sipil', tahun: '2025', status: 'Reject' },
  { id: 4, nama: 'Kayla Key', nim: '231106040912', prodi: 'Teknik Mesin', tahun: '2025', status: 'Reject' },
  { id: 5, nama: 'Rizky Gusti A', nim: '231106040839', prodi: 'Teknik Informatika', tahun: '2025', status: 'Reject' },
  { id: 6, nama: 'Risma Puspita', nim: '231106040290', prodi: 'Teknik Sipil', tahun: '2025', status: 'Reject' },
  { id: 7, nama: 'Budi Doremi', nim: '231106040923', prodi: 'Teknik Elektro', tahun: '2025', status: 'Reject' },
];

const IjazahRejectPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Logika sederhana untuk pencarian (opsional, bisa disesuaikan dengan API nanti)
  const filteredData = rejectedData.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nim.includes(searchQuery)
  );

  return (
    <div className="p-8 w-full">
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        
        {/* Page Title & Timestamp */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Jumlah Ijazah di Reject</h2>
          <p className="text-sm text-gray-400 mt-1">Update terakhir: 17 Januari 2026, 09:10 WIB</p>
        </div>

        {/* Search Bar Section (Lebih panjang seperti di desain) */}
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
              placeholder="Cari: Nama, NIM, Prodi" 
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
                <th className="py-4 px-6 text-center">Tahun Lulus</th>
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
                  <td className="py-4 px-6 font-semibold">{row.prodi}</td>
                  <td className="py-4 px-6 text-center font-semibold">{row.tahun}</td>
                  <td className="py-4 px-6 text-center">
                    {/* Badge Reject */}
                    <span className="inline-block px-4 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-full shadow-sm">
                      {row.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button className="text-gray-400 hover:text-teal-600 transition-colors">
                      {/* Document Search Icon */}
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
          
          {/* State Jika Data Tidak Ditemukan Saat Pencarian */}
          {filteredData.length === 0 && (
             <div className="py-8 text-center text-gray-500">
                Data tidak ditemukan.
             </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default IjazahRejectPage;