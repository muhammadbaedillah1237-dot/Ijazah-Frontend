import React, { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardLayout from "../components/ui/DashboardLayout";
import { FiUser, FiBook, FiFileText } from "react-icons/fi";

const DetailMahasiswa = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const mahasiswa = location.state?.mahasiswa;

  if (!mahasiswa) {
    return (
      <DashboardLayout>
        <div className="p-10 text-center">
          <p className="text-gray-500 mb-3">Data tidak ditemukan</p>
          <button
            onClick={() => navigate("/data-mahasiswa")}
            className="text-[#1F7A6E] font-semibold"
          >
            ← Kembali
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const getMatkul = () => {
    if (mahasiswa.fakultas.includes("Teknik")) {
      return [
        "Algoritma dan Pemrograman",
          "Struktur Data",
          "Basis Data",
          "Sistem Operasi",
          "Organisasi Komputer",
          "Arsitektur Komputer",
          "Jaringan Komputer",
          "Keamanan Jaringan",
          "Sistem Informasi Geografis",
          "Rekayasa Perangkat Lunak",
          "Rekayasa Perangkat Lunak Lanjut",
          "Analisis dan Perancangan Sistem",
          "Pemrograman Berorientasi Objek",
          "Pemrograman Web",
          "Pemrograman Mobile",
          "Kecerdasan Buatan",
          "Machine Learning",
          "Data Mining",
          "Big Data",
          "Cloud Computing",
          "Internet of Things",
          "Interaksi Manusia dan Komputer",
          "Grafika Komputer",
          "Pengolahan Citra Digital",
          "Pengolahan Sinyal Digital",
          "Sistem Tertanam",
          "Sistem Terdistribusi",
          "Parallel Computing",
          "Kriptografi",
          "Keamanan Informasi",
          "Manajemen Basis Data",
          "Administrasi Jaringan",
          "Etika Profesi",
          "Metode Penelitian",
          "Statistika",
          "Matematika Diskrit",
          "Aljabar Linear",
          "Kalkulus",
          "Kapita Selekta",
          "Manajemen Proyek",
          "Technopreneurship",
              "Sistem Pendukung Keputusan",
              "Sistem Pakar",
              "Enterprise Resource Planning",
              "E-Commerce",
              "Audit Sistem Informasi",
              "Tata Kelola TI",
              "Data Warehouse",
              "Business Intelligence"
                
      ];
    }

    if (mahasiswa.fakultas.includes("Ekonomi")) {
      return [
        "Pengantar Akuntansi",
        "Manajemen Keuangan",
        "Ekonomi Mikro",
      ];
    }

    return ["Mata Kuliah Umum"];
  };

  const nilaiData = useMemo(() => {
    const getRandomNilai = () => {
      const list = ["A", "A-", "B+", "B"];
      return list[Math.floor(Math.random() * list.length)];
    };

    const getMutu = (n) => {
      if (n === "A") return 4.0;
      if (n === "A-") return 3.7;
      if (n === "B+") return 3.3;
      return 3.0;
    };

    return getMatkul().map((nama, i) => {
      const nilai = getRandomNilai();
      const mutu = getMutu(nilai);

      return {
        kode: `MK${String(i + 1).padStart(3, "0")}`,
        nama,
        sks: 3,
        nilai,
        mutu: mutu.toFixed(2),
        bobot: (mutu * 3).toFixed(0),
      };
    });
  }, [mahasiswa]);

  return (
    <DashboardLayout>
      <div className="bg-[#F7F8FA] p-6 rounded-xl min-h-screen">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Detail Mahasiswa</h1>

          <button
            onClick={() => navigate(-1)}
            className="text-[#1F7A6E] text-sm font-medium"
          >
            ← Kembali
          </button>
        </div>

        {/* PROFILE */}
        <div className="bg-white rounded-xl border border-gray-200 px-6 py-6 flex justify-between items-center mb-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#E8F5E9] flex items-center justify-center">
              <FiUser className="text-2xl text-[#1F7A6E]" />
            </div>

            <div>
              <h2 className="font-semibold text-[15px] text-gray-800">
                {mahasiswa.nama}
              </h2>
              <p className="text-[12px] text-gray-500">
                NIM: {mahasiswa.nim}
              </p>

              <span className="inline-block mt-1 bg-gray-100 text-gray-600 text-[11px] px-2 py-[2px] rounded">
                Batch {mahasiswa.batch || "-"}
              </span>
            </div>
          </div>

          <span className="bg-[#1F7A6E] text-white text-[11px] px-3 py-1 rounded-full">
            Proses
          </span>
        </div>

        {/* INFO */}
        <div className="grid grid-cols-2 gap-5 mb-5">

          {/* INFORMASI PRIBADI */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            
            {/* HEADER ABU */}
            <div className="bg-gray-100 px-4 py-2 flex items-center gap-2 border-b border-gray-200">
              <FiUser size={14} />
              <h3 className="text-sm font-semibold text-gray-700">
                Informasi Pribadi
              </h3>
            </div>

            {/* CONTENT */}
            <div className="p-4 text-[12px] space-y-3 text-gray-700">
              <p><span className="text-gray-400">Nama</span><br />{mahasiswa.nama}</p>
              <p><span className="text-gray-400">NIM</span><br />{mahasiswa.nim}</p>
              <p><span className="text-gray-400">Email</span><br />{mahasiswa.email || "-"}</p>
              <p><span className="text-gray-400">No Telp</span><br />{mahasiswa.telp || "-"}</p>
            </div>

          </div>

          {/* INFORMASI AKADEMIK */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            
            {/* HEADER ABU */}
            <div className="bg-gray-100 px-4 py-2 flex items-center gap-2 border-b border-gray-200">
              <FiBook size={14} />
              <h3 className="text-sm font-semibold text-gray-700">
                Informasi Akademik
              </h3>
            </div>

            {/* CONTENT */}
            <div className="p-4 text-[12px] space-y-3 text-gray-700">
              <p><span className="text-gray-400">Fakultas</span><br />{mahasiswa.fakultas}</p>
              <p><span className="text-gray-400">Program Studi</span><br />{mahasiswa.prodi}</p>
              <p><span className="text-gray-400">Tahun Masuk</span><br />{mahasiswa.masuk || "-"}</p>
              <p><span className="text-gray-400">Tahun Lulus</span><br />{mahasiswa.tahun}</p>
            </div>

          </div>

        </div>

        {/* 🔥 TRANSKRIP NILAI (TIDAK DIUBAH SAMA SEKALI) */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

          <div className="flex items-center gap-2 mb-4 text-gray-700">
            <FiFileText size={14} />
            <h3 className="text-sm font-semibold">Transkrip Nilai</h3>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="max-h-[420px] overflow-y-auto">
              <table className="w-full text-[12px] border-collapse">
                <thead className="bg-gray-50 text-gray-500 sticky top-0 z-10 border-b border-gray-200">
                  <tr>
                    <th className="px-3 py-2">Kode</th>
                    <th className="px-3 py-2 text-left">Nama Mata Kuliah</th>
                    <th className="px-3 py-2">SKS</th>
                    <th className="px-3 py-2">Nilai Mutu</th>
                    <th className="px-3 py-2">Bobot</th>
                    <th className="px-3 py-2">Nilai</th>
                  </tr>
                </thead>

                <tbody>
                  {nilaiData.map((n, i) => (
                    <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-3 py-2 text-center">{n.kode}</td>
                      <td className="px-3 py-2">{n.nama}</td>
                      <td className="px-3 py-2 text-center">{n.sks}</td>
                      <td className="px-3 py-2 text-center">{n.mutu}</td>
                      <td className="px-3 py-2 text-center">{n.bobot}</td>
                      <td className="px-3 py-2 text-center">
                        <span className="bg-[#1F7A6E] text-white px-2 py-[2px] rounded text-[10px]">
                          {n.nilai}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};

export default DetailMahasiswa;