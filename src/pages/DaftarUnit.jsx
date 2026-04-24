import React, { useState } from "react";
import DashboardLayout from "../components/ui/DashboardLayout";
import { FiChevronDown, FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

const DaftarUnit = () => {
  const [openId, setOpenId] = useState(null);

  const dataUnit = [
    {
      id: 1,
      nama: "Universitas Ibn Khaldun Bogor",
      sub: [
        { jabatan: "Rektor", nama: "dr ahmad fauzan" },
        { jabatan: "Wakil Rektor", nama: "dr siti rahmawati" },
        { jabatan: "TU Rektorat", nama: "budi santoso" },
      ],
    },
    {
      id: 2,
      nama: "Fakultas Teknik dan Sains",
      sub: [
        { jabatan: "Dekan", nama: "andi pratama" },
        { jabatan: "Wakil Dekan", nama: "rina kartika" },
        { jabatan: "TU Fakultas", nama: "dimas saputra" },
      ],
    },
    {
      id: 3,
      nama: "Fakultas Ekonomi dan Bisnis",
      sub: [
        { jabatan: "Dekan", nama: "hendra wijaya" },
        { jabatan: "Wakil Dekan", nama: "nabila putri" },
        { jabatan: "TU Fakultas", nama: "yoga pratama" },
      ],
    },
    {
      id: 4,
      nama: "Fakultas Hukum",
      sub: [
        { jabatan: "Dekan", nama: "arif rahman" },
        { jabatan: "Wakil Dekan", nama: "siti aisyah" },
        { jabatan: "TU Fakultas", nama: "fajar nugraha" },
      ],
    },
  ];

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <DashboardLayout>
      <div className="bg-[#F7F8FA] p-6 rounded-xl min-h-screen">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              Daftar Unit
            </h1>
            <p className="text-sm text-gray-400">
              Kelola pejabat penandatangan dokumen
            </p>
          </div>

          <button className="flex items-center gap-2 bg-[#1F7A6E] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#17695d]">
            <FiPlus />
            Tambah Unit
          </button>
        </div>

        {/* LIST */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3 shadow-sm">

          {dataUnit.map((unit) => (
            <div
              key={unit.id}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >

              {/* HEADER ITEM */}
              <div
                onClick={() => toggle(unit.id)}
                className="flex justify-between items-center px-4 py-4 cursor-pointer hover:bg-gray-50"
              >
                <p className="text-sm font-semibold text-gray-800">
                  {unit.nama}
                </p>

                <div className="flex items-center gap-3 text-gray-500">
                  <FiChevronDown
                    className={`transition ${
                      openId === unit.id ? "rotate-180" : ""
                    }`}
                  />
                  <FiEdit2 className="cursor-pointer hover:text-blue-500" />
                  <FiTrash2 className="cursor-pointer hover:text-red-500" />
                </div>
              </div>

              {/* DROPDOWN */}
              {openId === unit.id && (
                <div className="px-6 pb-4 pt-2 bg-gray-50 border-t border-gray-200 space-y-3">

                  {unit.sub.map((item, i) => (
                    <div
                      key={i}
                      className="border-b border-gray-100 pb-3 last:border-none"
                    >
                      {/* 🔥 JABATAN (TEBEL) */}
                      <p className="text-gray-700 font-semibold text-sm">
                        {item.jabatan}
                      </p>

                      {/* 🔥 NAMA (KECIL + ABU + LOWERCASE) */}
                      <p className="text-gray-400 lowercase text-xs mt-[2px]">
                        {item.nama}
                      </p>
                    </div>
                  ))}

                </div>
              )}

            </div>
          ))}

        </div>

      </div>
    </DashboardLayout>
  );
};

export default DaftarUnit;