import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// Warna disesuaikan agar lebih mirip dengan gambar UI
const data = [
  { name: 'Terbit', value: 459, color: '#27AE60' }, // Hijau
  { name: 'Proses', value: 76, color: '#16719E' },  // Biru
  { name: 'Reject', value: 17, color: '#DC2626' },  // Merah
  { name: 'Revoke', value: 11, color: '#F59E0B' },  // Kuning
];

const VerificationStatusChart = () => {
  // State diatur ke 'null' agar di awal tidak ada data yang aktif (tengah kosong)
  const [activeIndex, setActiveIndex] = useState(null);

  // Menghitung total semua value untuk mencari persentase
  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Fungsi toggle saat diklik: Jika diklik data yang sama, kembali jadi null (kosong)
  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full flex flex-col h-full">
      
      {/* Container Chart */}
      <div className="h-48 w-full relative flex justify-center items-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie 
              data={data} 
              innerRadius={60} 
              outerRadius={85} 
              dataKey="value" 
              // Menambahkan stroke putih tebal agar ada jarak antar potongan (sesuai UI)
              stroke="#ffffff" 
              strokeWidth={3}
              onClick={(_, index) => handleClick(index)}
              className="cursor-pointer outline-none"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                  // Jika tidak ada yang diklik (null) opacity 1, jika ada yang diklik, yang lain meredup
                  opacity={activeIndex === null || activeIndex === index ? 1 : 0.3} 
                  className="transition-all duration-300 outline-none"
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>  

        {/* Teks Persentase di Tengah (HANYA MUNCUL JIKA ADA YANG DIKLIK) */}
        {activeIndex !== null && (
          <div className="absolute flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-bold" style={{ color: data[activeIndex].color }}>
              {Math.round((data[activeIndex].value / total) * 100)}%
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">
              {data[activeIndex].name}
            </span>
          </div>
        )}
      </div>
      
      {/* Custom Legend List Sesuai Desain */}
      <div className="mt-4 flex flex-col gap-2">
        {data.map((item, index) => (
          <div 
            key={index} 
            onClick={() => handleClick(index)}
            className="flex justify-between items-center text-sm cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
              <span className={`transition-colors ${activeIndex === index ? "text-gray-900 font-bold" : "text-gray-500 font-medium group-hover:text-gray-700"}`}>
                {item.name}
              </span>
            </div>
            <span className={`transition-colors ${activeIndex === index ? "text-gray-900 font-bold" : "text-gray-500 font-medium group-hover:text-gray-700"}`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default VerificationStatusChart;