import React, { useState, useCallback } from "react";
import DashboardLayout from "../components/ui/DashboardLayout";
import { FiChevronDown, FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { HiCheckCircle } from "react-icons/hi";

const InputField = React.memo(({ label, value, onChange }) => (
  <div className="space-y-1">
    <p className="text-[11px] text-gray-500">{label}</p>
    <input
      value={value || ""}
      onChange={onChange}
      className="w-full border border-gray-200 rounded-md p-2 text-sm"
    />
  </div>
));

const FileUpload = React.memo(({ label, file, onChange }) => (
  <div className="space-y-1">
    <p className="text-[11px] text-gray-500">{label}</p>

    <div className="flex items-center gap-2">
      <label className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs px-3 py-1.5 rounded cursor-pointer">
        Choose File
        <input type="file" className="hidden" onChange={onChange} />
      </label>

      <span className="text-xs text-gray-400 truncate max-w-[140px]">
        {file ? file.name : "No file"}
      </span>
    </div>

    <p className="text-[10px] text-gray-400">Max size 2MB</p>
  </div>
));

const DaftarUnit = () => {
  const [units, setUnits] = useState(() => {
  const saved = localStorage.getItem("units");
  return saved ? JSON.parse(saved) : [];
});
const [openUnit, setOpenUnit] = useState(null);
const [openModal, setOpenModal] = useState(false);
const [editId, setEditId] = useState(null);
const [showSuccess, setShowSuccess] = useState(false);
const [successMessage, setSuccessMessage] = useState("");
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [deleteTarget, setDeleteTarget] = useState(null);
const [deleteType, setDeleteType] = useState("");
const [loadingDone, setLoadingDone] = useState(false);

// 🔥 PRODI STATE (TAMBAHAN BARU)
const [openProdiForm, setOpenProdiForm] = useState(false);

const [prodiForm, setProdiForm] = useState({
  nama: "",
  namaEn: "",
  sk: "",
  ketua: "",
  nidn: "",
  file: null,
});

const [activeUnitId, setActiveUnitId] = useState(null);
React.useEffect(() => {
  localStorage.setItem("units", JSON.stringify(units));
}, [units]);

const triggerSuccess = (msg) => {
  setSuccessMessage(msg);
  setShowSuccess(true);

  setTimeout(() => {
    setShowSuccess(false);
  }, 2000);
};
const handleEditProdi = (unitId, index) => {
  const unit = units.find((u) => u.id === unitId);
  const data = unit.prodi[index];



  setProdiForm({
    nama: data.nama,
    namaEn: data.namaEn,
    ketua: data.ketua,
    nidn: data.nidn,
    sk: data.sk,
    file: data.file,
    editIndex: index,
  });

  setActiveUnitId(unitId);
  setOpenProdiForm(true);
};

const handleDeleteProdi = (unitId, index) => {
  setUnits((prev) =>
    prev.map((u) => {
      if (u.id !== unitId) return u;

      return {
        ...u,
        prodi: u.prodi.filter((_, i) => i !== index),
      };
    })
  );
  triggerSuccess("Prodi berhasil dihapus");
};
// 🔥 FORM UNIT (YANG SUDAH ADA)
const [form, setForm] = useState({
  jenis: "",
  nama: "",
  en: "",
  dekan: "",
  nidnDekan: "",
  wakil: "",
  nidnWakil: "",
  katu: "",
  ttdDekan: null,
  parafWakil: null,
  parafKatu: null,
  stempel: null,
});

  

  const isUniversitas = form.jenis === "Universitas";

  // 🔥 LABEL DINAMIS
  const labelPimpinan = isUniversitas ? "Rektor" : "Dekan";
  const labelWakil = isUniversitas ? "Wakil Rektor" : "Wakil Dekan";
  const labelKatu = isUniversitas ? "TU Rektor" : "KATU Fakultas";

  const labelTTD = isUniversitas
    ? "Tanda Tangan Rektor"
    : "Tanda Tangan Dekan";

  const labelParafWakil = isUniversitas
    ? "Paraf Wakil Rektor"
    : "Paraf Wakil Dekan";

  const labelParafKatu = isUniversitas
    ? "Paraf TU Rektor"
    : "Paraf KATU";

  const labelStempel = isUniversitas
    ? "Stempel Universitas"
    : "Stempel Fakultas";

  const handleChange = useCallback((key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  }, []);

  const handleFile = useCallback((key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.files[0] }));
  }, []);

  const openForm = (unit = null) => {
    if (unit) {
      setEditId(unit.id);
      setForm(unit);
    } else {
      setEditId(null);
      setForm({
        jenis: "",
        nama: "",
        en: "",
        dekan: "",
        nidnDekan: "",
        wakil: "",
        nidnWakil: "",
        katu: "",
        ttdDekan: null,
        parafWakil: null,
        parafKatu: null,
        stempel: null,
      });
    }
    setOpenModal(true);
  };

  const handleSave = () => {
    if (!form.nama || !form.jenis) return;

    if (
      form.jenis === "Universitas" &&
      units.some((u) => u.jenis === "Universitas" && u.id !== editId)
    ) {
      alert("Universitas hanya boleh 1!");
      return;
    }

    if (editId) {
      setUnits((prev) =>
        prev.map((u) => (u.id === editId ? { ...form, id: editId } : u))
      );
    } else {
      setUnits((prev) => [
  ...prev,
  {
    ...form,
    id: Date.now(),
    prodi: [], 
  },
]);
    }
       triggerSuccess(editId ? "Unit berhasil diupdate" : "Unit berhasil ditambahkan");
    setOpenModal(false);
  };

  const handleDelete = (id) => {
    setUnits((prev) => prev.filter((u) => u.id !== id));
    triggerSuccess("Unit berhasil dihapus");
  };
    
  const handleSelesai = () => {
  setLoadingDone(true);

  setTimeout(() => {
    setLoadingDone(false);
    setShowSuccess(false);
  },);
};

  
  const openProdiModal = (unitId) => {
  setActiveUnitId(unitId);
  setProdiForm({
    nama: "",
    namaEn: "",
    sk: "",
    ketua: "",
    nidn: "",
    file: null,
  });

  setOpenProdiForm(true);
};

const saveProdi = () => {
  setUnits((prev) =>
    prev.map((u) => {
      if (u.id !== activeUnitId) return u;

      return {
        ...u,
        prodi: prodiForm.editIndex !== undefined
  ? u.prodi.map((p, i) =>
      i === prodiForm.editIndex ? prodiForm : p
    )
  : [...(u.prodi || []), prodiForm],
      };
    })
  );
   triggerSuccess("Prodi berhasil disimpan");
  setOpenProdiForm(false);
};
const handleProdiFile = (e) => {
  setProdiForm((prev) => ({
    ...prev,
    file: e.target.files[0],
  }));
};

  return (
    <DashboardLayout>
      <div className="bg-[#F7F8FA] p-6 rounded-xl min-h-screen">

        {/* HEADER */}
        <div className="flex justify-between items-start mb-6">
  
  {/* LEFT SIDE */}
  <div className="flex flex-col">
      <h1 className="text-3xl font-black text-[#1a1a1a]">
          Daftar Unit
        </h1>

    <p className="text-sm text-gray-400 mt-1">
      Kelola data pejabat penandatangan dokumen ijazah dan transkrip.
    </p>
  </div>

  {/* RIGHT BUTTON */}
  <button
    onClick={() => openForm()}
    className="flex items-center gap-2 bg-[#1F7A6E] text-white px-4 py-2 rounded-lg text-xs"
  >
    <FiPlus size={14} />
    Tambah Unit
  </button>

</div>
        {/* LIST */}
        <div className="bg-white border border-gray-100 rounded-xl p-4 space-y-3">

          {[...units]
            .sort((a, b) => {
              if (a.jenis === "Universitas") return -1;
               if (b.jenis === "Universitas") return 1;
                return 0;
                  })
                    .map((u) => {
            const isUni = u.jenis === "Universitas";

            const pimpinan = isUni ? "Rektor" : "Dekan";
            const wakil = isUni ? "Wakil Rektor" : "Wakil Dekan";
            const katu = isUni ? "TU Rektor" : "KATU Fakultas";

            return (
              <div key={u.id} className="border border-gray-100 rounded-lg">

                {/* HEADER */}
                <div
                  onClick={() =>
                    setOpenUnit(openUnit === u.id ? null : u.id)
                  }
                  className="flex justify-between items-center px-4 py-3 cursor-pointer hover:bg-gray-50"
                >
                  <div>
                    <p className="text-base font-bold text-gray-800">
                      {u.nama}
                    </p>
                    <p className="text-xs text-gray-400">
                      {u.en}
                    </p>
                  </div>

                  <div className="flex gap-3 text-gray-400">
                    <FiChevronDown />
                    <FiEdit2 onClick={(e)=>{e.stopPropagation();openForm(u)}} />
                   <FiTrash2
  className="cursor-pointer hover:text-red-500"
  onClick={(e) => {
    e.stopPropagation();
    setDeleteTarget(u.id);
    setDeleteType("unit");
    setShowDeleteModal(true);
  }}
/>
                  </div>
                </div>

                {/* DROPDOWN */}
                {openUnit === u.id && (
                  <div className="px-4 pb-5 pt-3 space-y-5 border-t border-gray-100">

                    <div>
                      <p className="text-sm font-medium text-gray-700">{pimpinan}</p>
                      <p className="text-xs text-gray-400">
                        {u.dekan} <span className="mx-1">-</span> {u.nidnDekan}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-700">{wakil}</p>
                      <p className="text-xs text-gray-400">
                        {u.wakil} <span className="mx-1">-</span> {u.nidnWakil}
                      </p>
                    </div>

                    <div>
                  <div>
  <p className="text-sm font-medium text-gray-700">{katu}</p>
  <p className="text-xs text-gray-400">{u.katu}</p>

  {/* 🔥 PRODI DROPDOWN DI SINI */}
  {u.jenis === "Fakultas" && u.prodi?.length > 0 && (
  <div className="mt-3 pl-3 border-l border-gray-200 space-y-2">

    {u.prodi.map((p, idx) => (
  <details key={idx} className="group">

    {/* HEADER PRODI */}
   <summary className="cursor-pointer list-none flex items-center justify-between">

  <div>
    <p className="text-sm font-semibold text-gray-800">
      {p.nama}
    </p>

    {p.namaEn && (
      <p className="text-[11px] text-gray-400">
        {p.namaEn}
      </p>
    )}
  </div>

  {/* RIGHT ACTIONS */}
  <div className="flex items-center gap-3 text-gray-400">

    {/* EDIT */}
    <FiEdit2
      size={14}
      className="cursor-pointer hover:text-[#1F7A6E]"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleEditProdi(u.id, idx);
      }}
    />

    {/* DELETE */}
    <FiTrash2
  size={14}
  className="cursor-pointer hover:text-red-500"
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    setDeleteTarget({ unitId: u.id, index: idx });
    setDeleteType("prodi");
    setShowDeleteModal(true);
  }}
/>

    {/* DROPDOWN ICON */}
    <FiChevronDown className="transition-transform duration-200 group-open:rotate-180" />

  </div>

</summary>
    {/* DETAIL */}
    <div className="mt-2 pl-3 border-l border-gray-200 space-y-2">

 {/* JUDUL */}
 <p className="text-[13px] font-semibold text-gray-700">
  Ketua Program Studi
</p>
      {/* KETUA + NIDN */}
      <p className="text-[11px] text-gray-500 ml-1 font-normal">
  <span className="text-gray-500">
    {p.ketua}
  </span>

  <span className="text-gray-400">
    {" "} - {p.nidn}
  </span>
</p>
      {/* ACTION ICONS */}
      <div className="flex items-center gap-3">
      </div>

    </div>

  </details>
))}

  </div>
)}
</div>
{/* BUTTON TAMBAH PRODI (UI BARU RAPI) */}
{u.jenis === "Fakultas" && (
  <button
    onClick={() => openProdiModal(u.id)}
    className="
      mt-3 inline-flex items-center gap-1
      text-xs font-medium
      text-[#1F7A6E]
      border border-[#1F7A6E]
      px-3 py-1.5
      rounded-md
      hover:bg-[#1F7A6E] hover:text-white
      transition
    "
  >
    <FiPlus size={12} />
    Tambah Prodi
  </button>
)}
</div>
      </div>
                  
                )}

              </div>
            );
          })}

        </div>

        {/* MODAL */}
        {openModal && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
            <div className="bg-white w-[780px] rounded-xl shadow-md">

              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-sm font-semibold">Tambah Unit</h2>
              </div>

              <div className="p-6 space-y-5">

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-[11px] text-gray-500">Jenis Unit</p>
                      <select
                        value={form.jenis}
                        onChange={handleChange("jenis")}
                        className="border border-gray-200 rounded-md p-2 text-sm w-full"
                      >
                        <option value="">Pilih</option>
                        <option>Universitas</option>
                        <option>Fakultas</option>
                      </select>
                    </div>

                    <InputField label="Nama Unit" value={form.nama} onChange={handleChange("nama")} />
                    <InputField label="Nama English" value={form.en} onChange={handleChange("en")} />
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="grid grid-cols-3 gap-4">
                    <InputField label={labelPimpinan} value={form.dekan} onChange={handleChange("dekan")} />
                    <InputField label="NIDN" value={form.nidnDekan} onChange={handleChange("nidnDekan")} />
                    <FileUpload label={labelTTD} file={form.ttdDekan} onChange={handleFile("ttdDekan")} />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <InputField label={labelWakil} value={form.wakil} onChange={handleChange("wakil")} />
                    <InputField label="NIDN Wakil" value={form.nidnWakil} onChange={handleChange("nidnWakil")} />
                    <FileUpload label={labelParafWakil} file={form.parafWakil} onChange={handleFile("parafWakil")} />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <InputField label={labelKatu} value={form.katu} onChange={handleChange("katu")} />
                    <FileUpload label={labelParafKatu} file={form.parafKatu} onChange={handleFile("parafKatu")} />
                    <FileUpload label={labelStempel} file={form.stempel} onChange={handleFile("stempel")} />
                  </div>
                </div>

              </div>

              <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
                <button onClick={()=>setOpenModal(false)}
                  className="px-4 py-2 text-xs bg-gray-100 rounded-md">
                  Batal
                </button>
                <button onClick={handleSave}
                  className="px-4 py-2 text-xs bg-[#1F7A6E] text-white rounded-md">
                  Simpan
                </button>
              </div>

            </div>
          </div>
        )}
{openProdiForm && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white w-[650px] rounded-xl shadow-lg overflow-hidden">



      {/* HEADER */}
      <div className="px-5 py-3 border-b border-gray-100">
        <h2 className="text-sm font-semibold text-gray-800">
          Tambah Program Studi
        </h2>
      </div>

      {/* BODY */}
      <div className="p-5 space-y-5">

        {/* 🔥 NAMA FAKULTAS (READ ONLY / PENANDA) */}
        <div>
          <p className="text-[11px] text-gray-500">Fakultas</p>
          <div className="px-3 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-800">
            {units.find((u) => u.id === activeUnitId)?.nama || "-"}
          </div>
        </div>

        {/* 🔥 ROW 1 */}
        <div className="grid grid-cols-3 gap-3">

          <div>
            <p className="text-[11px] text-gray-500 mb-1">Nama Prodi</p>
            <input
              value={prodiForm.nama}
              onChange={(e) =>
                setProdiForm({ ...prodiForm, nama: e.target.value })
              }
              className="w-full border border-gray-200 rounded-md p-2 text-sm"
            />
          </div>

          <div>
            <p className="text-[11px] text-gray-500 mb-1">Nama Program Studi (English)</p>
            <input
              value={prodiForm.namaEn}
              onChange={(e) =>
                setProdiForm({ ...prodiForm, namaEn: e.target.value })
              }
              className="w-full border border-gray-200 rounded-md p-2 text-sm"
            />
          </div>

          <div>
            <p className="text-[11px] text-gray-500 mb-1">No SK Akreditasi</p>
            <input
              value={prodiForm.sk}
              onChange={(e) =>
                setProdiForm({ ...prodiForm, sk: e.target.value })
              }
              className="w-full border border-gray-200 rounded-md p-2 text-sm"
            />
          </div>

        </div>

        {/* 🔥 ROW 2 */}
        <div className="grid grid-cols-3 gap-3">

          <div>
            <p className="text-[11px] text-gray-500 mb-1">
              Kepala Program Studi
            </p>
            <input
              value={prodiForm.ketua}
              onChange={(e) =>
                setProdiForm({ ...prodiForm, ketua: e.target.value })
              }
              className="w-full border border-gray-200 rounded-md p-2 text-sm"
            />
          </div>

          <div>
            <p className="text-[11px] text-gray-500 mb-1">NIDN Kepala Program Studi</p>
            <input
              value={prodiForm.nidn}
              onChange={(e) =>
                setProdiForm({ ...prodiForm, nidn: e.target.value })
              }
              className="w-full border border-gray-200 rounded-md p-2 text-sm"
            />
          </div>

          {/* FILE */}
          <div>
            <p className="text-[11px] text-gray-500 mb-1">File Paraf Kepala Program Studi</p>

            <label className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs px-3 py-2 rounded-md cursor-pointer inline-flex items-center">
              Choose File
              <input type="file" hidden onChange={handleProdiFile} />
            </label>

            <span className="text-xs text-gray-400 ml-2">
              {prodiForm.file ? prodiForm.file.name : "No file"}
            </span>
          </div>

        </div>

      </div>

      {/* FOOTER */}
      <div className="flex justify-end gap-2 px-5 py-3 border-t border-gray-100">

        <button
          onClick={() => setOpenProdiForm(false)}
          className="px-4 py-1.5 text-xs bg-gray-100 rounded-md"
        >
          Batal
        </button>

        <button
          onClick={saveProdi}
          className="px-4 py-1.5 text-xs bg-[#1F7A6E] text-white rounded-md"
        >
          Simpan
        </button>

      </div>

    </div>

  </div>
)}
      </div>
      {/* 🔥 POPUP SUCCESS */}
{showSuccess && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[9999]">

    <div className="bg-white w-[360px] rounded-2xl p-7 text-center shadow-xl">

      {/* ICON */}
      <div className="w-16 h-16 mx-auto bg-green-500 flex items-center justify-center rounded-full mb-4 shadow-md">
        <HiCheckCircle size={36} className="text-white" />
      </div>

      {/* TITLE */}
      <p className="text-base font-semibold text-gray-800">
        Berhasil
      </p>

      {/* MESSAGE */}
      <p className="text-sm text-gray-400 mt-1">
        {successMessage}
      </p>

      {/* BUTTON */}
     <button
  onClick={handleSelesai}
  disabled={loadingDone}
  className={`mt-5 w-full py-2 rounded-md text-sm text-white transition
    ${loadingDone 
      ? "bg-green-400 cursor-not-allowed" 
      : "bg-green-500 hover:bg-green-600"}
  `}
>
  Selesai
</button>

    </div>

  </div>
)}
{showDeleteModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999]">

    <div className="bg-white w-[360px] rounded-2xl p-6 text-center shadow-xl">

   <div className="w-16 h-16 mx-auto bg-red-500 flex items-center justify-center rounded-full mb-4">
  <HiOutlineExclamationTriangle size={32} className="text-white" />
</div>
      <p className="text-base font-semibold text-gray-800">
         Apakah Anda yakin ingin 
menghapus Unit ini?
      </p>

      <p className="text-sm text-gray-400 mt-1">
        Tindakan ini tidak dapat dibatalkan. 
            Seluruh data yang terkait dengan akun ini akan dihapus
              secara permanen dari sistem.
      </p>

     <div className="flex flex-col gap-2 mt-5">

  {/* HAPUS DI ATAS */}
  <button
    onClick={() => {
      if (deleteType === "unit") {
        handleDelete(deleteTarget);
      } else if (deleteType === "prodi") {
        handleDeleteProdi(deleteTarget.unitId, deleteTarget.index);
      }
      setShowDeleteModal(false);
    }}
    className="w-full bg-red-600 text-white py-2 rounded-md text-sm hover:bg-red-700 transition"
  >
    Hapus Data
  </button>

  {/* BATAL DI BAWAH */}
  <button
    onClick={() => setShowDeleteModal(false)}
    className="w-full bg-gray-100 py-2 rounded-md text-sm hover:bg-gray-200 transition"
  >
    Batal
  </button>

</div>
    </div>

  </div>
)}
    </DashboardLayout>
    
  );
};

export default DaftarUnit;