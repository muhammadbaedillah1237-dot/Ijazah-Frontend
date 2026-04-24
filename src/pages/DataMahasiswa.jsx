import React, { useState, useMemo } from "react";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/ui/DashboardLayout";

const DataMahasiswa = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [fakultas, setFakultas] = useState("");
  const [tahun, setTahun] = useState("");

  const fakultasList = [
    {
      nama: "Fakultas Teknik dan Sains",
      kode: "FTS",
      prodi: ["Teknik Informatika", "Teknik Mesin", "Teknik Sipil"],
    },
    {
      nama: "Fakultas Ekonomi dan Bisnis",
      kode: "FEB",
      prodi: ["Manajemen", "Akuntansi"],
    },
    {
      nama: "Fakultas Hukum",
      kode: "FH",
      prodi: ["Ilmu Hukum"],
    },
    {
      nama: "Fakultas Ilmu Kesehatan",
      kode: "FIKES",
      prodi: ["Keperawatan", "Kesehatan Masyarakat"],
    },
  ];

  const years = ["2021", "2022", "2023", "2024", "2025", "2026"];

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
  ];

  // 🔥 FUNCTION RANDOM
  const getRandom = (arr) =>
    arr[Math.floor(Math.random() * arr.length)];

  const data = useMemo(() => {
    let result = [];

    fakultasList.forEach((fak) => {
      for (let i = 1; i <= 10; i++) {
        result.push({
          batch: `Batch ${i} - ${fak.kode}`,
          fakultas: fak.nama,
          tahun: getRandom(years),
          periode:
            Math.random() > 0.5
              ? "Semester Genap"
              : "Semester Ganjil",
          total: 10,
        });
      }
    });

    // 🔥 INI BAGIAN PENTING: kalau BELUM pilih fakultas → RANDOM CAMPUR
    if (!fakultas) {
      return result.sort(() => Math.random() - 0.5);
    }

    return result;
  }, [fakultas]);

  const filtered = data
    .filter((item) => {
      return (
        item.batch.toLowerCase().includes(search.toLowerCase()) &&
        (fakultas ? item.fakultas === fakultas : true) &&
        (tahun ? item.tahun === tahun : true)
      );
    })
    .slice(0, 10); // 🔥 tetap 10 data

  return (
    <DashboardLayout>

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-black text-[#1a1a1a]">
          Manajemen Data Mahasiswa
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Melihat data yang sedang di proses validasi
        </p>
      </div>

      {/* FILTER */}
      <div className="bg-[#F1F1F1] p-4 rounded-xl flex flex-wrap items-center gap-3 mb-5">

        {/* SEARCH */}
        <div className="flex items-center bg-[#E5E5E5] rounded-lg px-3 h-10 w-72">
          <FiSearch className="text-gray-500 text-sm mr-2" />
          <input
            type="text"
            placeholder="Cari Batch"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>

        {/* FAKULTAS (dropdown tetap ada) */}
        <div className="relative">
          <select
            value={fakultas}
            onChange={(e) => setFakultas(e.target.value)}
            className="appearance-none bg-[#E5E5E5] text-sm px-4 h-10 rounded-lg pr-10 min-w-[220px]"
          >
            <option value="">Semua Fakultas</option>
            {fakultasList.map((f, i) => (
              <option key={i} value={f.nama}>
                {f.nama}
              </option>
            ))}
          </select>
          <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none" />
        </div>

        {/* TAHUN */}
        <div className="relative">
          <select
            value={tahun}
            onChange={(e) => setTahun(e.target.value)}
            className="appearance-none bg-[#E5E5E5] text-sm px-4 h-10 rounded-lg pr-10 min-w-[160px]"
          >
            <option value="">Tahun Lulus</option>
            {years.map((y, i) => (
              <option key={i} value={y}>
                {y}
              </option>
            ))}
          </select>
          <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none" />
        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-[#F7F7F7] text-gray-500 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-center">No</th>
              <th className="px-4 py-3 text-left">List Batch</th>
              <th className="px-4 py-3 text-center">Fakultas</th>
              <th className="px-4 py-3 text-center">Tahun</th>
              <th className="px-4 py-3 text-center">Periode</th>
              <th className="px-4 py-3 text-center">Total</th>
              <th className="px-4 py-3 text-center">Detail</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item, i) => (
              <tr
                key={i}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="px-4 py-3 text-center">{i + 1}</td>

                <td className="px-4 py-3 font-medium text-gray-800">
                  {item.batch}
                </td>

                <td className="px-4 py-3 text-center">
                  {item.fakultas}
                </td>

                <td className="px-4 py-3 text-center">
                  {item.tahun}
                </td>

                <td className="px-4 py-3 text-center">
                  {item.periode}
                </td>

                <td className="px-4 py-3 text-center font-medium">
                  {item.total}
                </td>

                {/* DETAIL */}
                <td className="px-4 py-3 text-center">
                  <div
                    onClick={() => navigate(`/detail-batch/${i}`)}
                    className="w-7 h-7 border border-gray-300 rounded-md flex items-center justify-center mx-auto cursor-pointer hover:bg-gray-100 transition"
                  >
                    <div className="w-3 h-3 border-t-2 border-b-2 border-gray-400"></div>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
};

export default DataMahasiswa;