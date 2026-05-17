import React, { useState } from "react";
import DashboardLayout from "../components/ui/DashboardLayout";
import ijazahBg from "../assets/img/ijazah.png";

const Template = () => {
  const [elements, setElements] = useState([]);

  // STATUS SAVE / EDIT
  const [isSaved, setIsSaved] = useState(false);

  // STATUS PREVIEW CETAK
  const [showPreview, setShowPreview] = useState(false);

  const fieldPositions = {
    Nama: {
      x: 440,
      y: 156,
      width: 200,
      height: 21,
    },

    "Tempat & Tanggal Lahir": {
      x: 440,
      y: 186,
      width: 200,
      height: 21,
    },

    "Nomor Pokok Mahasiswa": {
      x: 440,
      y: 216,
      width: 200,
      height: 21,
    },

    NIK: {
      x: 440,
      y: 246,
      width: 200,
      height: 21,
    },

    Fakultas: [
      {
      x: 440,
      y: 275,
      width: 200,
      height: 13,
    },
    {
      x: 440,
      y: 290,
      width: 200,
      height: 10,
    }
  ],

    "Program Studi": [
      {
      x: 440,
      y: 303,
      width: 200,
      height: 13,
    },
    {
      x: 440,
      y: 318,
      width: 200,
      height: 10,}
  ],

    Program: [
      {
      x: 440,
      y: 331,
      width: 200,
      height: 13,
    },
    {
      x: 440,
      y: 346,
      width: 200,
      height: 10,
    },
  ],

    "Tanggal Kelulusan": {
      x: 57,
      y: 165,
      width: 100,
      height: 16,
    },

    PISN: {
      x: 57,
      y: 195,
      width: 98,
      height: 16,
    },

    "Nomor Seri Ijazah": {
      x: 57,
      y: 250,
      width: 98,
      height: 16,
    },

    "Akreditasi AIPT": {
      x: 67,
      y: 290,
      width: 75,
      height: 20,
    },

    Foto: {
      x: 52,
      y: 414,
      width: 95,
      height: 125,
    },

    "QR Code": {
      x: 717,
      y: 47,
      width: 72,
      height: 72,
    },

    Gelar: {
      x: 230,
      y: 400,
      width: 400,
      height: 21,
    },

    "Tanggal Terbit": {
      x: 370,
      y: 425,
      width: 100,
      height: 16,
    },

    "Nama Rektor": {
      x: 196,
      y: 521,
      width: 150,
      height: 13,
    },

    "TTD Rektor": {
      x: 235,
      y: 475,
      width: 80,
      height: 45,
    },

    "NIDN Rektor": {
      x: 230,
      y: 538,
      width: 115,
      height: 16,
    },

    "Nama Dekan": {
      x: 505,
      y: 521,
      width: 150,
      height: 13,
    },

    "TTD Dekan": {
      x: 540,
      y: 475,
      width: 80,
      height: 45,
    },

    "NIDN Dekan": {
      x: 540,
      y: 538,
      width: 115,
      height: 16,
    },

    "Paraf KATU Rektor": {
      x: 165,
      y: 515,
      width: 28,
      height: 28,
    },

    "Paraf WAREK": {
      x: 350,
      y: 515,
      width: 28,
      height: 28,
    },

    "Paraf KATU Fakultas": {
      x: 475,
      y: 515,
      width: 28,
      height: 28,
    },

    "Paraf Wadek": {
      x: 660,
      y: 515,
      width: 28,
      height: 28,
    },

    "Stempel Rektor": {
      x: 160,
      y: 440,
      width: 85,
      height: 85,
    },

    "Stempel Dekan": {
      x: 465,
      y: 440,
      width: 85,
      height: 85,
    },
  };

  const addField = (label) => {
  if (isSaved) return;

  const alreadyExist = elements.find((el) => el.label === label);
  if (alreadyExist) return;

  const position = fieldPositions[label];
  if (!position) return;

  if (Array.isArray(position)) {
    const newElements = position.map((pos, index) => ({
      id: `${Date.now()}-${index}`,
      label,
      ...pos,
    }));

    setElements([...elements, ...newElements]);
    return;
  }

  setElements([
    ...elements,
    {
      id: Date.now(),
      label,
      ...position,
    },
  ]);
};

  const handleSave = () => {
    setIsSaved(true);
    console.log("Template disimpan", elements);
  };

  const handleEdit = () => {
    setIsSaved(false);
  };

  const handlePreview = () => {
    if (elements.length === 0) return;

    if (!isSaved) return;

    setShowPreview(true);
  };

  // =========================
  // PREVIEW CETAK TANPA NAVBAR
  // =========================
  if (showPreview) {
    return (
      <div className="min-h-screen bg-[#d9d9d9] p-6 overflow-auto">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowPreview(false)}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl font-semibold"
          >
            Keluar
          </button>
        </div>

        <div className="relative w-fit mx-auto bg-white p-6 rounded-xl shadow-lg">
          <img
            src={ijazahBg}
            alt="Preview Ijazah"
            className="w-[780px]"
          />

          {elements.map((el) => (
            <div
              key={el.id}
              className="absolute border border-gray-500 bg-white/80 flex items-center justify-center text-[9px] font-semibold text-gray-600 text-center"
              style={{
                left: el.x,
                top: el.y,
                width: el.width,
                height: el.height,
              }}
            >
              Menunggu Data...
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
       <div className="bg-white min-h-screen -mt-6 -mb-6 -mx-4 md:-mx-8 px-4 md:px-8 pt-6 pb-6">
       {/* HEADER */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Manajemen Template Ijazah dan Transkrip
          </h1>

          <p className="text-sm text-gray-400 mt-1">
            Konfigurasi tata letak dan elemen keamanan ijazah digital.
          </p>

          <div className="flex gap-2 mt-4 text-sm">
            <button className="text-[#27AE60] font-bold">
              Ijazah Digital
            </button>

            <span className="text-gray-300">{">"}</span>

            <button className="text-gray-400 font-bold">
              Transkrip Digital
            </button>
          </div>
        </div>

        <button
          onClick={handlePreview}
          disabled={elements.length === 0 || !isSaved}
          className={`border border-gray-300 shadow-sm rounded-xl px-5 py-3 font-semibold text-sm transition ${
            elements.length === 0 || !isSaved
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white hover:bg-gray-50 text-black"
          }`}
        >
          🖨 Pratinjau Cetak
        </button>
      </div>

      {/* CONTENT */}
      <div className="border-t border-gray-300 pt-4">
        <h2 className="text-lg font-bold text-white-800 mb-4">
          DATA FIELD
        </h2>

        <div className="flex gap-4">
          {/* SIDEBAR */}
          <div className="w-[260px] bg-[#e5e5e5] p-2 rounded-lg h-[760px] overflow-y-auto">
            <div className="space-y-[2px]">
              {[
                "Nama",
                "Tempat & Tanggal Lahir",
                "Nomor Pokok Mahasiswa",
                "NIK",
                "Fakultas",
                "Program Studi",
                "Program",
                "Tanggal Kelulusan",
                "PISN",
                "Nomor Seri Ijazah",
                "Akreditasi AIPT",
                "Foto",
                "QR Code",
                "Gelar",
                "Tanggal Terbit",
                "Nama Rektor",
                "TTD Rektor",
                "NIDN Rektor",
                "Nama Dekan",
                "TTD Dekan",
                "NIDN Dekan",
                "Paraf KATU Rektor",
                "Paraf WAREK",
                "Paraf KATU Fakultas",
                "Paraf Wadek",
                "Stempel Rektor",
                "Stempel Dekan",
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={() => addField(item)}
                  disabled={isSaved}
                  className={`w-full text-left px-4 py-3 text-[15px] font-semibold transition ${
                    isSaved
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#d9d9d9] hover:bg-[#cfcfcf]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* TEMPLATE */}
          <div className="flex-1 bg-[#d9d9d9] p-6 rounded-lg">
            <div className="relative w-fit mx-auto bg-[#f4f4f4] p-6 rounded-xl shadow-lg">
              <img
                src={ijazahBg}
                alt="Template"
                className="w-[780px]"
              />

              {elements.map((el) => (
                <div
                  key={el.id}
                  className="absolute border border-gray-500"
                  style={{
                    left: el.x,
                    top: el.y,
                    width: el.width,
                    height: el.height,
                  }}
                />
              ))}
            </div>

            {/* BUTTON SIMPAN / EDIT */}
            <div className="flex justify-end mt-6">
              {!isSaved ? (
                <button
                  onClick={handleSave}
                  className="bg-[#0B6B63] hover:bg-[#09544e] transition text-white font-bold px-8 py-3 rounded-xl shadow"
                >
                  Simpan
                </button>
              ) : (
                <button
                  onClick={handleEdit}
                  className="bg-white hover:bg-white-600 transition text-[#0B6B63] font-bold px-8 py-3 rounded-xl shadow"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
    </DashboardLayout>
  );
};

export default Template;