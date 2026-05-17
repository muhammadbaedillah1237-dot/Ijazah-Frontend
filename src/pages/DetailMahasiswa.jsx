import React, { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardLayout from "../components/ui/DashboardLayout";
import { FiUser, FiBook, FiFileText } from "react-icons/fi";

const DetailMahasiswa = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const mahasiswa = location.state?.mahasiswa;

  // 🔥 DETEKSI CEWE / COWO
const ceweList = [
  "Rani",
  "Siti",
  "Putri",
  "Nabila",
  "Citra",
  "Dewi",
  "Aulia",
];

const isCewe = ceweList.some((nama) =>
  mahasiswa?.nama.includes(nama)
);

// 🔥 GENERATE EMAIL
const email =
  mahasiswa?.nama
    ?.toLowerCase()
    .replace(/\s+/g, ".") + "@gmail.com";

// 🔥 GENERATE TELP RANDOM
const telp =
  "08" +
  Math.floor(Math.random() * 9000000000 + 1000000000);

// 🔥 TEMPAT LAHIR RANDOM
const tempatList = [
  "Bogor",
  "Jakarta",
  "Bandung",
  "Depok",
  "Bekasi",
];

const tempat =
  tempatList[Math.floor(Math.random() * tempatList.length)];
const tanggalList = [
  "12 Mei 2004",
  "18 Oktober 2004",
  "21 Januari 2003",
  "9 Agustus 2004",
  "5 Februari 2003",
];

const tanggal =
  tanggalList[Math.floor(Math.random() * tanggalList.length)];

const ipk = (
  Math.random() * (4.0 - 3.2) + 3.2
).toFixed(2);

const totalSks =
  Math.floor(Math.random() * 10) + 140;
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
    "Akuntansi Keuangan",
    "Akuntansi Biaya",
    "Akuntansi Manajemen",
    "Akuntansi Perpajakan",
    "Auditing",
    "Sistem Informasi Akuntansi",
    "Manajemen Keuangan",
    "Manajemen Pemasaran",
    "Manajemen Operasional",
    "Manajemen Sumber Daya Manusia",
    "Manajemen Strategi",
    "Perilaku Organisasi",
    "Ekonomi Mikro",
    "Ekonomi Makro",
    "Ekonomi Internasional",
    "Ekonometrika",
    "Statistika Bisnis",
    "Matematika Ekonomi",
    "Kewirausahaan",
    "Studi Kelayakan Bisnis",
    "Pasar Modal",
    "Investasi dan Portofolio",
    "Perbankan",
    "Manajemen Risiko",
    "Bisnis Digital",
    "E-Commerce",
    "Pengantar Bisnis",
    "Etika Bisnis",
    "Komunikasi Bisnis",
    "Hukum Bisnis",
    "Perpajakan",
    "Riset Operasi",
    "Manajemen Proyek",
    "Business Intelligence",
    "Analisis Laporan Keuangan",
    "Pengambilan Keputusan Bisnis",
    "Supply Chain Management",
    "Corporate Finance",
    "Ekonomi Syariah",
    "Manajemen Retail",
    "Leadership",
    "Financial Technology",
    "Data Analytics Bisnis",
    "Metode Penelitian",
    "Skripsi"
  ];
}

if (mahasiswa.fakultas.includes("Hukum")) {
  return [
    "Pengantar Ilmu Hukum",
    "Pengantar Hukum Indonesia",
    "Hukum Perdata",
    "Hukum Perdata Lanjutan",
    "Hukum Pidana",
    "Hukum Pidana Lanjutan",
    "Hukum Tata Negara",
    "Hukum Administrasi Negara",
    "Hukum Internasional",
    "Hukum Islam",
    "Hukum Adat",
    "Hukum Dagang",
    "Hukum Pajak",
    "Hukum Acara Perdata",
    "Hukum Acara Pidana",
    "Hukum Lingkungan",
    "Hukum Ketenagakerjaan",
    "Hukum Agraria",
    "Hukum Laut",
    "Hukum Udara",
    "Hukum Hak Asasi Manusia",
    "Kriminologi",
    "Etika Profesi Hukum",
    "Advokasi dan Litigasi",
    "Legal Drafting",
    "Hukum Perusahaan",
    "Hukum Perlindungan Konsumen",
    "Hukum Cyber",
    "Hukum Bisnis",
    "Hukum Konstitusi",
    "Sosiologi Hukum",
    "Filsafat Hukum",
    "Politik Hukum",
    "Metode Penelitian Hukum",
    "Perbandingan Hukum",
    "Hukum Pembuktian",
    "Teknik Perancangan Peraturan",
    "Moot Court",
    "Hukum Acara Mahkamah Konstitusi",
    "Hukum Keuangan Negara",
    "Tindak Pidana Korupsi",
    "Hukum Perbankan",
    "Hukum Asuransi",
    "Hukum Investasi",
    "Arbitrase dan Alternatif Penyelesaian Sengketa",
    "Hukum Teknologi Informasi",
    "Magang Profesi Hukum",
    "Skripsi"
  ];
}

if (mahasiswa.fakultas.includes("Kesehatan")) {
  return [
    "Anatomi dan Fisiologi",
    "Biokimia",
    "Mikrobiologi",
    "Patofisiologi",
    "Farmakologi",
    "Ilmu Gizi",
    "Dasar Keperawatan",
    "Keperawatan Medikal Bedah",
    "Keperawatan Anak",
    "Keperawatan Maternitas",
    "Keperawatan Jiwa",
    "Keperawatan Komunitas",
    "Keperawatan Gawat Darurat",
    "Keperawatan Gerontik",
    "Kesehatan Masyarakat",
    "Epidemiologi",
    "Promosi Kesehatan",
    "Keselamatan dan Kesehatan Kerja",
    "Etika Keperawatan",
    "Komunikasi Keperawatan",
    "Manajemen Keperawatan",
    "Keperawatan Keluarga",
    "Dasar Kebidanan",
    "Kesehatan Reproduksi",
    "Kesehatan Lingkungan",
    "Statistika Kesehatan",
    "Metodologi Penelitian",
    "Sistem Informasi Kesehatan",
    "Administrasi Rumah Sakit",
    "Keperawatan ICU",
    "Keperawatan Hemodialisa",
    "Ilmu Penyakit Dalam",
    "Ilmu Bedah Dasar",
    "Psikologi Kesehatan",
    "Pendidikan Kesehatan",
    "Kesehatan Mental",
    "Praktik Klinik",
    "Praktik Profesi",
    "Seminar Kesehatan",
    "Skripsi"
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

              <span className="inline-block mt-1 bg-[#E8F5E9] text-[#1F7A6E] text-[11px] px-3 py-[3px] rounded-full font-medium border border-[#D7EEE2]">
                    {mahasiswa.batch || "Batch -"}
              </span>
            </div>
          </div>

          <div className="text-right">

  <span className="bg-[#031cff] text-[#ffffff] text-[11px] px-4 py-1 rounded-full border border-[#E5EAF2] font-medium">
    Proses
  </span>

  <p className="text-[11px] text-gray-600 mt-2 font-medium">
    Validasi oleh TU Fakultas
  </p>

  <p className="text-[10px] text-gray-400 mt-[2px]">
    Data masih dalam pengecekan dan proses validasi
  </p>

</div>
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
<div className="p-5 grid grid-cols-2 gap-y-5 gap-x-8 text-[12px]">

  <div>
    <p className="text-gray-400 mb-1">Nama</p>
    <p className="font-medium text-gray-800">{mahasiswa.nama}</p>
  </div>

  <div>
    <p className="text-gray-400 mb-1">NIM</p>
    <p className="font-medium text-gray-800">{mahasiswa.nim}</p>
  </div>

  <div>
    <p className="text-gray-400 mb-1">Tempat, Tanggal Lahir</p>
    <p className="font-medium text-gray-800">
     {tempat}, {tanggal}
    </p>
  </div>

  <div>
    <p className="text-gray-400 mb-1">Jenis Kelamin</p>
    <p className="font-medium text-gray-800">
     {isCewe ? "Perempuan" : "Laki-laki"}
    </p>
  </div>

  <div>
    <p className="text-gray-400 mb-1">Email</p>
    <p className="font-medium text-gray-800">
     {email}
    </p>
  </div>

  <div>
    <p className="text-gray-400 mb-1">No Telepon</p>
    <p className="font-medium text-gray-800">
     {telp}
    </p>
  </div>

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
<div className="p-5 grid grid-cols-2 gap-y-5 gap-x-8 text-[12px]">

  <div>
    <p className="text-gray-400 mb-1">Fakultas</p>
    <p className="font-medium text-gray-800">
      {mahasiswa.fakultas}
    </p>
  </div>

  <div>
    <p className="text-gray-400 mb-1">Program Studi</p>
    <p className="font-medium text-gray-800">
      {mahasiswa.prodi}
    </p>
  </div>

  <div>
    <p className="text-gray-400 mb-1">Tahun Masuk</p>
    <p className="font-medium text-gray-800">
      2022
    </p>
  </div>

  <div>
    <p className="text-gray-400 mb-1">IPK</p>
    <p className="font-semibold text-[#1F7A6E]">
     {ipk} / 4.00
    </p>
  </div>

  <div>
    <p className="text-gray-400 mb-1">Tahun Lulus</p>
    <p className="font-medium text-gray-800">
      {mahasiswa.tahun}
    </p>
  </div>

  <div>
    <p className="text-gray-400 mb-1">Total SKS</p>
    <p className="font-medium text-gray-800">
     {totalSks} SKS
    </p>
  </div>

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