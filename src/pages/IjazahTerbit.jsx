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

    </DashboardLayout>
  );
};

export default IjazahTerbit;