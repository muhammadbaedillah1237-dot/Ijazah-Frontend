import React, { useState } from "react"; 
import DashboardLayout from "../components/ui/DashboardLayout";

const IjazahTerbit = () => {
  const [search, setSearch] = useState("");

  const data = [
    {
      no: 1,
      nama: "Adi Saputra",
      nim: "231106040902",
      fakultas: "FTS",
      prodi: "Teknik Informatika",
      tahun: "2026",
      status: "Terbit",
    },
    {
      no: 2,
      nama: "Rani Maharani",
      nim: "231106040903",
      fakultas: "FTS",
      prodi: "Teknik Mesin",
      tahun: "2026",
      status: "Terbit",
    },
  ];

  return (
    <DashboardLayout>
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Jumlah Ijazah Terbit
        </h1>
        <p className="text-gray-400 mt-1">
          Update terakhir: 17 Januari 2026, 09:10 WIB
        </p>
      </div>

      {/* SEARCH & FILTER */}
      <div className="bg-white rounded-2xl shadow-lg p-6 flex justify-between items-center mb-8">
        
        {/* SEARCH */}
        <div className="flex items-center bg-gray-200 px-4 py-3 rounded-xl w-[60%] shadow-inner">
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-500"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Cari: Nama, NIM, Prodi"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none ml-3 w-full text-gray-600"
          />
        </div>

        {/* DROPDOWN */}
        <button className="bg-gray-200 px-6 py-3 rounded-xl shadow-md flex items-center gap-2 font-semibold text-gray-700">
          Tahun Lulus
          <span>⌄</span>
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        
        {/* HEADER TABLE */}
        <div className="grid grid-cols-8 bg-gray-200 px-6 py-4 font-semibold text-gray-600">
          <div>No.</div>
          <div>Nama</div>
          <div>NIM</div>
          <div>Fakultas</div>
          <div>Program Studi</div>
          <div>Tahun Lulus</div>
          <div>Status</div>
          <div>Detail</div>
        </div>

        {/* DATA */}
        {data.map((item) => (
          <div
            key={item.no}
            className="grid grid-cols-8 px-6 py-5 items-center border-t hover:bg-gray-50"
          >
            <div>{item.no}.</div>
            <div className="font-semibold">{item.nama}</div>
            <div>{item.nim}</div>
            <div>{item.fakultas}</div>
            <div>{item.prodi}</div>
            <div>{item.tahun}</div>

            {/* STATUS */}
            <div>
              <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                {item.status}
              </span>
            </div>

            {/* ICON DETAIL */}
            <div className="text-xl cursor-pointer">📄</div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default IjazahTerbit;