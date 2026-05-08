<<<<<<< HEAD
import React, { useState, useEffect, useRef } from "react";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import DashboardLayout from "../components/ui/DashboardLayout";
import { Icons } from "../icon/DashboardIcons";

// ==========================================
// GENERATE DATA BATCH
// ==========================================
const generateBatchData = () => {
  const fakultasList = [
    { name: "Fakultas Hukum", short: "FH" },
    { name: "Fakultas Teknik dan Sains", short: "FTS" },
    { name: "Fakultas Ekonomi dan Bisnis", short: "FEB" },
    { name: "Fakultas Keguruan & Ilmu Pendidikan", short: "FKIP" },
    { name: "Fakultas Agama Islam", short: "FAI" },
    { name: "Fakultas Ilmu Kesehatan", short: "FIK" },
  ];

  const semesters = ["Semester Ganjil", "Semester Genap"];
  const tahunList = ["2024", "2025", "2026"];
  const data = [];

  let batchNumber = 1;

  fakultasList.forEach((fak) => {
    for (let i = 0; i < 9; i++) {
      data.push({
        id: batchNumber,
        batch: `Batch ${batchNumber} - ${fak.short}`,
        fakultas: fak.name,
        tahun: tahunList[i % 3],
        semester: semesters[i % 2],
        total: Math.floor(Math.random() * 50) + 5,
      });
      batchNumber++;
    }
  });

  return data;
};

const fullBatchData = generateBatchData();

const faculties = [
  "Semua Fakultas",
  "Fakultas Teknik dan Sains",
  "Fakultas Ekonomi dan Bisnis",
  "Fakultas Keguruan & Ilmu Pendidikan",
  "Fakultas Hukum",
  "Fakultas Agama Islam",
  "Fakultas Ilmu Kesehatan",
];

const tahunOptions = ["Tahun Lulus", "2024", "2025", "2026"];

// ==========================================
// DROPDOWN CUSTOM
// ==========================================
const CustomDropdown = ({ value, options, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 bg-[#f3f4f6] rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-200 min-w-44"
      >
        <span className="flex-1 text-left truncate">{value}</span>
        <FiChevronDown
          size={16}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white border rounded-xl shadow-xl z-50">
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 ${
                value === opt
                  ? "font-bold text-[#0B4B48] bg-teal-50"
                  : "text-gray-700"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ==========================================
// PAGE
// ==========================================
const IjazahTerbit = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFakultas, setSelectedFakultas] = useState("Semua Fakultas");
  const [selectedTahun, setSelectedTahun] = useState("Tahun Lulus");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const filteredData = fullBatchData.filter((item) => {
    const q = searchQuery.toLowerCase();

    return (
      (item.batch.toLowerCase().includes(q) ||
        item.fakultas.toLowerCase().includes(q)) &&
      (selectedFakultas === "Semua Fakultas" ||
        item.fakultas === selectedFakultas) &&
      (selectedTahun === "Tahun Lulus" ||
        item.tahun === selectedTahun)
    );
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedFakultas, selectedTahun]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfFirst = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(
    indexOfFirst,
    indexOfFirst + itemsPerPage
  );

  return (
    <DashboardLayout>
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Jumlah Ijazah Terbit</h1>
        <p className="text-sm text-gray-400">
          Update terakhir: 17 Januari 2026
        </p>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border">

        {/* FILTER */}
        <div className="p-6 flex gap-3 border-b">
          <div className="relative w-72">
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-gray-100 text-sm"
            />
          </div>

          <CustomDropdown
            value={selectedFakultas}
            options={faculties}
            onChange={setSelectedFakultas}
          />

          <CustomDropdown
            value={selectedTahun}
            options={tahunOptions}
            onChange={setSelectedTahun}
          />
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-500">
              <tr>
                <th className="p-4">No</th>
                <th className="p-4">Batch</th>
                <th className="p-4">Fakultas</th>
                <th className="p-4 text-center">Tahun</th>
                <th className="p-4 text-center">Semester</th>
                <th className="p-4 text-center">Total</th>
                <th className="p-4 text-center">Detail</th>
              </tr>
            </thead>

            <tbody>
              {currentData.map((row, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="p-4">{indexOfFirst + i + 1}</td>
                  <td className="p-4 font-bold">{row.batch}</td>
                  <td className="p-4">{row.fakultas}</td>
                  <td className="p-4 text-center">{row.tahun}</td>
                  <td className="p-4 text-center">{row.semester}</td>
                  <td className="p-4 text-center font-bold">
                    {row.total}
                  </td>

                  {/* ⬇️ ICON SUDAH DIPISAH */}
                  <td className="p-4 text-center">
                    <button className="w-9 h-9 flex items-center justify-center mx-auto border rounded-lg hover:bg-teal-50">
                      {Icons.Detail}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
=======
import React, { useMemo, useState } from "react";
import DashboardLayout from "../components/ui/DashboardLayout";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const IjazahTerbit = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [fakultas, setFakultas] = useState("");
  const [tahun, setTahun] = useState("");

  const fakultasList = [
    {
      nama: "Fakultas Teknik dan Sains",
      kode: "FTS",
      prodi: ["Teknik Informatika", "Teknik Mesin"],
    },
    {
      nama: "Fakultas Ekonomi dan Bisnis",
      kode: "FEB",
      prodi: ["Manajemen", "Akuntansi"],
    },
  ];

  const years = ["2024", "2025", "2026"];

  const namaList = [
    "Adi Saputra",
    "Rani Maharani",
    "Budi Pratama",
    "Siti Aisyah",
    "Yoga Pratama",
    "Nabila Putri",
  ];

  const getRandom = (arr) =>
    arr[Math.floor(Math.random() * arr.length)];

  const data = useMemo(() => {
    let result = [];

    fakultasList.forEach((fak) => {
      for (let i = 1; i <= 10; i++) {

        const mahasiswa = Array.from(
          { length: 10 },
          (_, index) => ({
            nama: getRandom(namaList),

            nim:
              "23" +
              Math.floor(Math.random() * 99999999),

            prodi: getRandom(fak.prodi),

            status: "Terbit",
          })
        );

        result.push({
          batch: `Batch ${i} - ${fak.kode}`,
          fakultas: fak.nama,
          tahun: getRandom(years),
          periode: "Semester Genap",
          total: mahasiswa.length,
          mahasiswa,
        });
      }
    });

    return result;
  }, []);

  const filtered = data.filter((item) => {
    const keyword = search.toLowerCase();

    return (
      item.batch.toLowerCase().includes(keyword) &&
      (fakultas ? item.fakultas === fakultas : true) &&
      (tahun ? item.tahun === tahun : true)
    );
  });

  return (
    <DashboardLayout>

      <div className="mb-7">
        <h1 className="text-[28px] font-bold text-[#111827]">
          Data Ijazah Terbit
        </h1>

        <p className="text-[#9CA3AF] text-sm mt-1">
          Seluruh mahasiswa dengan status ijazah terbit
        </p>
      </div>

      {/* FILTER */}
      <div className="bg-white border border-[#E5E7EB] p-4 rounded-2xl flex flex-wrap items-center gap-3 mb-5 shadow-sm">

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

          <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-[#F7F7F7] border-b border-gray-200">
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
         {filtered.slice(0, 10).map((item, i) => (
              <tr
                key={i}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="px-4 py-3 text-center">
                  {i + 1}
                </td>

                <td className="px-4 py-3 font-medium">
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

                <td className="px-4 py-3 text-center">
                  {item.total}
                </td>

                <td className="px-4 py-3 text-center">

                  <div
                onClick={() =>
                navigate(`/batch-terbit/${i}`, {
                state: item,
                    })
                }
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

>>>>>>> origin/bae-frontend
    </DashboardLayout>
  );
};

export default IjazahTerbit;