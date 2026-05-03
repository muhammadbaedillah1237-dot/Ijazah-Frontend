import React, { useState, useCallback } from "react";
import DashboardLayout from "../components/ui/DashboardLayout";
import { FiChevronDown, FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

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
  const [units, setUnits] = useState([]);
  const [openUnit, setOpenUnit] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

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
      setUnits((prev) => [...prev, { ...form, id: Date.now() }]);
    }

    setOpenModal(false);
  };

  const handleDelete = (id) => {
    setUnits((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="bg-[#F7F8FA] p-6 rounded-xl min-h-screen">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">Daftar Unit</h1>

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

          {units.map((u) => {
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
                    <FiTrash2 onClick={(e)=>{e.stopPropagation();handleDelete(u.id)}} />
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
                      <p className="text-sm font-medium text-gray-700">{katu}</p>
                      <p className="text-xs text-gray-400">{u.katu}</p>
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

      </div>
    </DashboardLayout>
  );
};

export default DaftarUnit;