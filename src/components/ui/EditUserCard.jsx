import { useState } from "react";

export default function EditUserCard({ onClose, onSave, userData }) {
  const [form, setForm] = useState({
    nama: userData.nama || "",
    email: userData.email || "",
    password: userData.password || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave({ ...userData, ...form });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[600px] rounded-2xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="px-8 py-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Edit Pengguna</h2>
          <p className="text-sm text-gray-400 mt-1">
            {userData.role} — {userData.unit}
          </p>
        </div>

        {/* CONTENT */}
        <div className="p-8 space-y-5">

          <div>
            <label className="text-xs text-gray-400">Nama</label>
            <input
              name="nama"
              value={form.nama}
              onChange={handleChange}
              className="w-full mt-1 border rounded-2xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-[#0B4B48]"
            />
          </div>

          <div>
            <label className="text-xs text-gray-400">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-1 border rounded-2xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-[#0B4B48]"
            />
          </div>

          <div>
            <label className="text-xs text-gray-400">Password</label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Minimal 8 karakter"
              className="w-full mt-1 border rounded-2xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-[#0B4B48]"
            />
          </div>

        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 px-8 py-5 bg-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-white border border-gray-300 shadow-md text-black"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-xl bg-[#0B4B48] shadow-md text-white"
          >
            Simpan
          </button>
        </div>

      </div>
    </div>
  );
}