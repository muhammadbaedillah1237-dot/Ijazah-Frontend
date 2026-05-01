import React, { useState } from "react";
import DashboardLayout from "../components/ui/DashboardLayout";
import { FiChevronDown, FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

const DaftarUnit = () => {
  const [openUnit, setOpenUnit] = useState(null);
  const [openProdi, setOpenProdi] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const dataUnit = [
    {
      id: 1,
      nama: "Universitas Ibn Khaldun Bogor",
      en: "",
      sub: [
        { jabatan: "Rektor", nama: "dr ahmad fauzan" },
        { jabatan: "Wakil Rektor", nama: "dr siti rahmawati" },
        { jabatan: "TU Rektorat", nama: "budi santoso" },
      ],
    },
    {
      id: 2,
      nama: "Fakultas Teknik dan Sains",
      en: "Faculty of Engineering and Science",
      sub: [
        { jabatan: "Dekan", nama: "andi pratama" },
        { jabatan: "Wakil Dekan", nama: "rina kartika" },
        { jabatan: "TU Fakultas", nama: "dimas saputra" },
      ],
      prodi: [
        "Teknik Informatika",
        "Teknik Mesin",
        "Teknik Sipil",
        "Teknik Elektro",
        "Sistem Informasi",
      ],
    },
    {
      id: 3,
      nama: "Fakultas Ekonomi dan Bisnis",
      en: "Faculty of Economics and Business",
      sub: [
        { jabatan: "Dekan", nama: "hendra wijaya" },
        { jabatan: "Wakil Dekan", nama: "nabila putri" },
        { jabatan: "TU Fakultas", nama: "yoga pratama" },
      ],
      prodi: ["Manajemen", "Akuntansi"],
    },
    {
      id: 4,
      nama: "Fakultas Hukum",
      en: "Faculty of Law",
      sub: [
        { jabatan: "Dekan", nama: "rahmat hidayat" },
        { jabatan: "Wakil Dekan", nama: "dian permata" },
        { jabatan: "TU Fakultas", nama: "agus setiawan" },
      ],
      prodi: ["Ilmu Hukum"],
    },
    {
      id: 5,
      nama: "Fakultas Agama Islam",
      en: "Faculty of Islamic Religion",
      sub: [
        { jabatan: "Dekan", nama: "ustadz farhan" },
        { jabatan: "Wakil Dekan", nama: "ahmad rizki" },
        { jabatan: "TU Fakultas", nama: "nur hasanah" },
      ],
      prodi: ["Pendidikan Agama Islam", "Ekonomi Syariah", "Penyiaran islam"],
    },
    {
      id: 6,
      nama: "Fakultas Keguruan dan Ilmu Pendidikan",
      en: "Faculty of Teacher Education and Education",
      sub: [
        { jabatan: "Dekan", nama: "sri wahyuni" },
        { jabatan: "Wakil Dekan", nama: "bambang sutrisno" },
        { jabatan: "TU Fakultas", nama: "lina marlina" },
      ],
      prodi: [
        "Pendidikan Bahasa Indonesia",
        "Pendidikan Bahasa Inggris",
        "Pendidikan Matematika",
      ],
    },
  ];

  const toggleUnit = (id) => {
    setOpenUnit(openUnit === id ? null : id);
    setOpenProdi(null);
  };

  const toggleProdi = (key) => {
    setOpenProdi(openProdi === key ? null : key);
  };

  return (
    <DashboardLayout>
      <div className="bg-[#F7F8FA] p-6 rounded-xl min-h-screen">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-black text-[#1a1a1a]">
          Daftar Unit
        </h1>
            <p className="text-sm text-gray-400">
              Kelola pejabat penandatangan dokumen
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="flex items-center gap-2 bg-[#1F7A6E] text-white px-4 py-2 rounded-lg text-sm"
          >
            <FiPlus />
            Tambah Unit
          </button>
        </div>

        {/* LIST */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3 shadow-sm">

          {dataUnit.map((unit) => (
            <div key={unit.id} className="border border-gray-200 rounded-lg overflow-hidden">

              {/* UNIT HEADER */}
              <div
                onClick={() => toggleUnit(unit.id)}
                className="flex justify-between items-center px-4 py-4 cursor-pointer hover:bg-gray-50"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {unit.nama}
                  </p>
                  {unit.en && (
                    <p className="text-xs text-gray-400">{unit.en}</p>
                  )}
                </div>

                <div className="flex items-center gap-3 text-gray-500">
                  <FiChevronDown
                    className={`transition ${
                      openUnit === unit.id ? "rotate-180" : ""
                    }`}
                  />
                  <FiEdit2 />
                  <FiTrash2 />
                </div>
              </div>

              {/* DROPDOWN UNIT */}
              {openUnit === unit.id && (
                <div className="px-6 pb-4 pt-2 bg-gray-50 border-t space-y-4">

                  {/* PEJABAT */}
                  {unit.sub.map((item, i) => (
                    <div key={i} className="border-b border-gray-100 pb-3 last:border-none">
                      <p className="text-gray-700 font-semibold text-sm">
                        {item.jabatan}
                      </p>
                      <p className="text-gray-400 lowercase text-xs">
                        {item.nama}
                      </p>
                    </div>
                  ))}

                  {/* PRODI */}
                  {unit.prodi && (
                    <div className="mt-4">

                      <p className="text-xs text-gray-400 mb-2">
                        Program Studi
                      </p>

                      <div className="space-y-2">

                        {unit.prodi.map((prodi, i) => {
                          const key = `${unit.id}-${i}`;

                          return (
                            <div key={key} className="border border-gray-200 rounded-md">

                              <div
                                onClick={() => toggleProdi(key)}
                                className="flex justify-between items-center px-3 py-2 cursor-pointer hover:bg-gray-100"
                              >
                                <p className="text-sm text-gray-700">
                                  {prodi}
                                </p>

                                <FiChevronDown
                                  className={`transition ${
                                    openProdi === key ? "rotate-180" : ""
                                  }`}
                                />
                              </div>

                              {openProdi === key && (
                                <div className="px-4 py-2 bg-white border-t text-xs space-y-2">

                                  <div>
                                    <p className="text-gray-600 font-medium">
                                      Kepala Prodi
                                    </p>
                                    <p className="text-gray-400 lowercase">
                                      agus salim
                                    </p>
                                  </div>

                                  <div>
                                    <p className="text-gray-600 font-medium">
                                      Staff
                                    </p>
                                    <p className="text-gray-400 lowercase">
                                      rina putri
                                    </p>
                                  </div>

                                </div>
                              )}

                            </div>
                          );
                        })}

                        {/* 🔥 TETEP ADA TAMBAH PRODI */}
                        <button
                          onClick={() => alert("Tambah Prodi")}
                          className="flex items-center gap-2 text-xs text-[#1F7A6E] border border-dashed border-[#1F7A6E] px-3 py-2 rounded-md hover:bg-[#E8F5E9]"
                        >
                          <FiPlus size={14} />
                          Tambah Program Studi
                        </button>

                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>
          ))}

        </div>

        {/* MODAL TAMBAH UNIT */}
        {openModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-[700px] rounded-xl shadow-lg p-6">

              <h2 className="text-lg font-semibold mb-6">
                Tambah Unit Baru
              </h2>

              <div className="grid grid-cols-3 gap-4">

                {/* JENIS UNIT */}
                <div>
                  <p className="text-sm mb-2">Jenis Unit</p>
                  <select className="w-full border rounded-lg p-2 text-sm">
                    <option>Pilih Jenis Unit</option>
                    <option>Universitas</option>
                    <option>Fakultas</option>
                  </select>
                </div>

                <div>
                  <p className="text-sm mb-2">Nama Unit</p>
                  <input
                    className="w-full border rounded-lg p-2 text-sm"
                    placeholder="Contoh: Fakultas..."
                  />
                </div>

                <div>
                  <p className="text-sm mb-2">Nama Unit (English)</p>
                  <input
                    className="w-full border rounded-lg p-2 text-sm"
                    placeholder="Ex: Faculty of..."
                  />
                </div>

              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setOpenModal(false)}
                  className="px-4 py-2 text-sm rounded-lg bg-gray-100"
                >
                  Batal
                </button>
                <button className="px-4 py-2 text-sm rounded-lg bg-[#1F7A6E] text-white">
                  Simpan
                </button>
              </div>

            </div>

          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default DaftarUnit;