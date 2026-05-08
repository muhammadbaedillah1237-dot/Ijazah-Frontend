import React, { useState } from 'react';
import { Icons } from "../icon/DashboardIcons";
import Navbar from '../components/ui/Navbar';

// Mock Data
const tableData = [
  { id: 1, batch: 'Batch 11 - FTS', fakultas: 'Fakultas Teknik dan Sains', tahun: '2026', periode: 'Semester Ganjil', total: 10 },
  { id: 2, batch: 'Batch 12 - FTS', fakultas: 'Fakultas Teknik dan Sains', tahun: '2026', periode: 'Semester Genap', total: 10 },
  { id: 3, batch: 'Batch 13 - FTS', fakultas: 'Fakultas Teknik dan Sains', tahun: '2026', periode: 'Semester Genap', total: 10 },
  { id: 4, batch: 'Batch 14 - FTS', fakultas: 'Fakultas Teknik dan Sains', tahun: '2026', periode: 'Semester Genap', total: 10 },
  { id: 5, batch: 'Batch 21 - FTS', fakultas: 'Fakultas Teknik dan Sains', tahun: '2025', periode: 'Semester Genap', total: 10 },
  { id: 6, batch: 'Batch 22 - FTS', fakultas: 'Fakultas Teknik dan Sains', tahun: '2025', periode: 'Semester Genap', total: 10 },
];

const IjazahProsesPage = () => {
  return (
    // Asumsi div ini akan berada di dalam <DashboardLayout>
    <div className="p-8 w-full"> 
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        
        {/* Page Title & Timestamp */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Jumlah Ijazah di Proses</h2>
          <p className="text-sm text-gray-400 mt-1">Update terakhir: 17 Januari 2026, 09:10 WIB</p>
        </div>

        {/* Filters Section */}
        <div className="flex gap-4 mb-6">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" 
              placeholder="Cari: Nama, NIM, Prodi" 
            />
          </div>

          {/* Dropdown Fakultas */}
          <div className="relative w-64">
             <select className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-md py-2 px-4 text-sm font-medium text-gray-700 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none cursor-pointer">
              <option>Fakultas Teknik dan Sains</option>
              <option>Fakultas Hukum</option>
              <option>Fakultas Ekonomi dan Bisnis</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Dropdown Tahun */}
          <div className="relative w-40">
             <select className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-md py-2 px-4 text-sm font-medium text-gray-700 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none cursor-pointer">
              <option>Tahun Lulus</option>
              <option>2026</option>
              <option>2025</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-medium">
              <tr>
                <th className="py-4 px-6 text-center w-16">No.</th>
                <th className="py-4 px-6">List Batch</th>
                <th className="py-4 px-6">Fakultas</th>
                <th className="py-4 px-6">Tahun Lulus</th>
                <th className="py-4 px-6">Periode</th>
                <th className="py-4 px-6 text-center">Total Data</th>
                <th className="py-4 px-6 text-center">Detail</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 text-center font-medium">{index + 1}.</td>
                  <td className="py-4 px-6 font-semibold text-gray-800">{row.batch}</td>
                  <td className="py-4 px-6">{row.fakultas}</td>
                  <td className="py-4 px-6">{row.tahun}</td>
                  <td className="py-4 px-6">{row.periode}</td>
                  <td className="py-4 px-6 text-center">{row.total}</td>
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
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center mt-6 gap-2 text-sm">
          <button className="w-8 h-8 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100">&lt;</button>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-teal-600 text-white font-medium">1</button>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 text-gray-600 hover:bg-gray-200">2</button>
          <span className="w-8 h-8 flex items-center justify-center text-gray-500">...</span>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 text-gray-600 hover:bg-gray-200">5</button>
          <button className="w-8 h-8 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100">&gt;</button>
        </div>

      </div>
    </div>
  );
};

export default IjazahProsesPage;