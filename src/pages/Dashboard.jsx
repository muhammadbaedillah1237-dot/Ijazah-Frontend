import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import DashboardLayout from "../components/ui/DashboardLayout";
import StatCard from "../components/ui/StatCard";
import IssuanceChart from "../components/ui/IssuanceChart";
import VerificationStatusChart from "../components/ui/VerificationStatusChart";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // 10 Dummy Data Presisi sesuai Figma
  const namaList = [
  "Adi Saputra",
  "Rani Maharani",
  "Budi Pratama",
  "Siti Aisyah",
  "Dimas Nugraha",
  "Fajar Ramadhan",
  "Putri Lestari",
  "Andi Wijaya",
  "Rizky Maulana",
  "Nabila Putri",
  "Yoga Pratama",
  "Citra Dewi",
  "Hendra Gunawan",
  "Aulia Rahman",
  "Dewi Kartika",
  "Kayla Key",
  "Risma Puspita",
  "Zahra Nabil",
  "Eagle Al-Haikal",
  "Rizky Gusti A",
];

const fakultasData = [
  {
    fakultas: "Fakultas Teknik dan Sains",
    batch: "FTS",
    prodi: [
      "Teknik Informatika",
      "Teknik Mesin",
      "Teknik Sipil",
    ],
  },
  {
    fakultas: "Fakultas Ekonomi dan Bisnis",
    batch: "FEB",
    prodi: [
      "Manajemen",
      "Akuntansi",
      "Bisnis Digital",
    ],
  },
  {
    fakultas: "Fakultas Hukum",
    batch: "FH",
    prodi: ["Ilmu Hukum"],
  },
  {
    fakultas: "Fakultas Ilmu Kesehatan",
    batch: "FIKES",
    prodi: [
      "Keperawatan",
      "Kesehatan Masyarakat",
    ],
  },
];

const statusList = [
  "Terbit",
  "Proses",
  "Reject",
  "Revoke",
];

const getRandom = (arr) =>
  arr[Math.floor(Math.random() * arr.length)];

const dummyData = Array.from({ length: 10 }, (_, i) => {
  const fak = getRandom(fakultasData);

  return {
    n: getRandom(namaList),

    b: `Batch ${Math.floor(Math.random() * 30) + 1} - ${fak.batch}`,

    nim:
      "23110604" +
      Math.floor(Math.random() * 9999),

    f: fak.fakultas,

    p: getRandom(fak.prodi),

    t: String(
      2024 + Math.floor(Math.random() * 3)
    ),

    s: getRandom(statusList),
  };
});
  const filteredData = dummyData.filter((item) => {
  const keyword = searchQuery.toLowerCase();

  return (
    item.n.toLowerCase().includes(keyword) ||
    item.nim.toLowerCase().includes(keyword) ||
    item.p.toLowerCase().includes(keyword)
  );
});

  // Fungsi Badge Warna
  const getBadgeColor = (status) => {
  switch (status) {
    case "Terbit":
      return "bg-[#27AE60] text-white";

    case "Proses":
      return "bg-[#3B82F6] text-white";

    case "Reject":
      return "bg-[#EF4444] text-white";

    case "Revoke":
      return "bg-[#F59E0B] text-white";

    default:
      return "bg-gray-400 text-white";
  }
};

  // Icon SVG Kustom untuk StatCards
  const Icons = {
    Badge: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#27AE60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15l-3 3-3-3M5 12V5a2 2 0 012-2h10a2 2 0 012 2v14l-4-4-4 4-4-4z"/></svg>,
    Check: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path></svg>,
    Close: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line></svg>,
    List: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
  };

  return (
    <DashboardLayout>
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Ringkasan Statistik</h1>
        <p className="text-sm text-gray-400 mt-1">Update terakhir: 17 Januari 2026, 09:10 WIB</p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        {/* STAT CARDS IJAZAH TERBIT */}
        <StatCard
         onClick={() => navigate("/ijazah-terbit")}
          title="Jumlah Ijazah Terbit"
          value="5.625"
          sub="20 Ijazah Terbit Minggu ini"
          subColor="text-[#27AE60]"
          icon={Icons.Badge}
            />
            
        <StatCard title="Jumlah Ijazah di Proses" value="451" sub="12 di Proses Minggu ini" subColor="text-[#3B82F6]" icon={Icons.Check} />
        <StatCard title="Jumlah Ijazah di Reject" value="42" sub="2 Data di Reject Minggu ini" subColor="text-[#EF4444]" icon={Icons.Close} />
        <StatCard title="Jumlah Ijazah di Revoke" value="17" sub="Tidak ada perubahan Minggu ini" subColor="text-[#F59E0B]" icon={Icons.List} />
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-gray-800 mb-6 text-lg">Statistik Penerbitan Ijazah Tahunan</h2>
          <IssuanceChart />
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-gray-800 mb-4 text-lg">Status Data Ijazah Tahun 2026</h2>
          <VerificationStatusChart />
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Table Header & Search */}
        <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 self-start">Status Verifikasi Ijazah Mahasiswa</h2>
          <div className="relative w-full md:w-72">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Cari: Nama, NPM, Prodi"
              className="w-full pl-10 pr-4 py-2 rounded-md bg-[#f3f4f6] text-sm outline-none border border-transparent focus:border-teal-500 transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Table Data */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-[#f3f4f6] text-gray-500">
              <tr>
                <th className="py-4 px-6 font-semibold">No.</th>
                <th className="py-4 px-6 font-semibold">Nama</th>
                <th className="py-4 px-6 font-semibold text-center">NIM</th>
                <th className="py-4 px-6 font-semibold text-center">Fakultas</th>
                <th className="py-4 px-6 font-semibold text-center">Program Studi</th>
                <th className="py-4 px-6 font-semibold text-center">Tahun Lulus</th>
                <th className="py-4 px-6 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {filteredData.map((row, i) => (
                <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-bold">{i + 1}.</td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-gray-800">{row.n}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">{row.b}</div>
                  </td>
                  <td className="py-4 px-6 text-center font-bold text-gray-700">{row.nim}</td>
                  <td className="py-4 px-6 text-center text-gray-600 font-medium">{row.f}</td>
                  <td className="py-4 px-6 text-center text-gray-600 font-medium">{row.p}</td>
                  <td className="py-4 px-6 text-center font-bold text-gray-700">{row.t}</td>
                  <td className="py-4 px-6 text-center">
                    <span className={`px-5 py-1.5 rounded-full text-xs font-bold ${getBadgeColor(row.s)}`}>
                      {row.s}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-100">
          <p className="text-xs text-gray-400">Menampilkan 10 dari 6.135 Data</p>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black font-bold">{"<"}</button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-[#00897B] text-white text-xs font-bold shadow-sm">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 text-gray-500 text-xs font-bold hover:bg-gray-200">2</button>
            <span className="px-2 text-gray-400">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 text-gray-500 text-xs font-bold hover:bg-gray-200">614</button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black font-bold">{">"}</button>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Dashboard;