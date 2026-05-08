import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

export default function AddUserCard({
  onClose,
  onSave,
  existingUsers = [],
}) {
  const [jenisUnit, setJenisUnit] = useState("");
  const [namaUnit, setNamaUnit] = useState("");
  const [role, setRole] = useState("");

  const [form, setForm] = useState({
    nama: "",
    nidn: "",
    email: "",
    password: "",
  });

  const dataRole = {
    Dekan: {
      nama: "Dr. Husni, M.Kom",
      nidn: "111111111111",
    },

    "Wakil Dekan": {
      nama: "Dr. Andi Saputra, M.Kom",
      nidn: "222222222222",
    },

    "TU Fakultas": {
      nama: "Budi Santoso, S.Kom",
      nidn: "333333333333",
    },
  };

  const roleList = [
    "Dekan",
    "Wakil Dekan",
    "TU Fakultas",
  ];

  const daftarFakultas = [
    "Fakultas Teknik dan Sains",
    "Fakultas Ekonomi dan Bisnis",
    "Fakultas Hukum",
    "Fakultas Agama Islam",
    "Fakultas Keguruan dan Ilmu Pendidikan",
    "Fakultas Ilmu Kesehatan",
  ];

  // Cek apakah semua role sudah terisi
  const isFakultasFull = (namaFakultas) => {
    const usersInFakultas = existingUsers.filter(
      (u) => u.unit === namaFakultas
    );

    const rolesTerisi = usersInFakultas.map(
      (u) => u.role
    );

    return roleList.every((r) =>
      rolesTerisi.includes(r)
    );
  };

  // Cek apakah role sudah ada di unit tersebut
  const isRoleTerisi = (roleNama) => {
    return existingUsers.some(
      (u) =>
        u.unit === namaUnit &&
        u.role === roleNama
    );
  };

  const handleRoleChange = (value) => {
    setRole(value);

    if (dataRole[value]) {
      setForm({
        ...form,
        nama: dataRole[value].nama,
        nidn: dataRole[value].nidn,
      });
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const newUser = {
      role,
      nama: form.nama,
      unit: namaUnit,
      email: form.email,
      password: form.password,
    };

    onSave(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[1000px] rounded-2xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="px-8 py-6 border-b border-gray-300">
          <h2 className="text-xl font-bold text-gray-800">
            Tambah Pengguna Baru
          </h2>
        </div>

        {/* CONTENT */}
        <div className="p-8 space-y-8">

          {/* SECTION 1 */}
          <div>
            <div className="grid grid-cols-3 gap-4">

              {/* JENIS UNIT */}
              <div className="flex flex-col gap-2">
                <h6 className="m-0 text-black font-semibold">
                  Jenis Unit
                </h6>

                <div className="relative">
                  <select
                    value={jenisUnit}
                    onChange={(e) => {
                      setJenisUnit(e.target.value);
                      setNamaUnit("");
                      setRole("");
                    }}
                    className="w-full border border-gray-400 shadow-lg rounded-2xl px-4 py-3 pr-12 bg-gray-50 outline-none focus:border-[#0B4B48] appearance-none"
                  >
                    <option value="" disabled hidden>
                      Pilih Jenis Unit
                    </option>

                    <option
                      value="Universitas"
                      disabled
                      className="text-gray-400"
                    >
                      Universitas
                    </option>

                    <option value="Fakultas">
                      Fakultas
                    </option>
                  </select>

                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <IoChevronDown className="text-lg text-black" />
                  </div>
                </div>
              </div>

              {/* NAMA UNIT */}
              <div className="flex flex-col gap-2">
                <h6 className="m-0 text-black font-semibold">
                  Nama Unit
                </h6>

                <div className="relative">
                  <select
                    value={namaUnit}
                    onChange={(e) => {
                      setNamaUnit(e.target.value);
                      setRole("");
                    }}
                  className="w-full border border-gray-400 shadow-lg rounded-2xl px-4 py-3 pr-12 bg-gray-50 appearance-none outline-none focus:border-[#0B4B48]"
                   >
                    <option value="" disabled hidden>
                      Pilih Nama Unit
                    </option>

                    {daftarFakultas.map((f) => {
                      const full = isFakultasFull(f);

                      return (
                        <option
                          key={f}
                          value={f}
                          disabled={full}
                          className={
                            full
                              ? "text-gray-400"
                              : ""
                          }
                        >
                          {f}
                        </option>
                      );
                    })}
                  </select>

                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <IoChevronDown className="text-lg text-black" />
                  </div>
                </div>
              </div>

              {/* ROLE */}
              <div className="flex flex-col gap-2">
                <h6 className="m-0 text-black font-semibold">
                  Role
                </h6>

                <div className="relative">
                  <select
                    value={role}
                    onChange={(e) =>
                      handleRoleChange(
                        e.target.value
                      )
                    }
                    className="w-full border border-gray-400 shadow-lg rounded-2xl px-4 py-3 pr-12 bg-gray-50 outline-none focus:border-[#0B4B48] appearance-none"
                  >
                    <option value="" disabled hidden>
                      Pilih Role
                    </option>

                    {roleList.map((r) => {
                      const terisi =
                        isRoleTerisi(r);

                      return (
                        <option
                          key={r}
                          value={r}
                          disabled={
                            terisi || !namaUnit
                          }
                          className={
                            terisi
                              ? "text-gray-400"
                              : ""
                          }
                        >
                          {r}
                        </option>
                      );
                    })}
                  </select>

                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <IoChevronDown className="text-lg text-black" />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* SECTION 2 */}
          {role && (
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-3">
                Data {role}
              </p>

              <div className="grid grid-cols-2 gap-6">

                <div>
                  <label className="text-xs text-gray-400">
                    Nama {role}
                  </label>

                  <input
                    value={form.nama}
                    readOnly
                    className="w-full mt-1 border rounded-2xl px-4 py-3 bg-gray-100"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400">
                    NIDN {role}
                  </label>

                  <input
                    value={form.nidn}
                    readOnly
                    className="w-full mt-1 border rounded-2xl px-4 py-3 bg-gray-100"
                  />
                </div>

              </div>
            </div>
          )}

          {/* SECTION 3 */}
          {role && (
            <div>
              <div className="grid grid-cols-2 gap-6">

                <div>
                  <label className="text-xs text-gray-400">
                    Email
                  </label>

                  <input
                    name="email"
                    placeholder="Masukkan email"
                    onChange={handleChange}
                    className="w-full mt-1 border rounded-2xl px-4 py-3 bg-gray-50"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400">
                    Password
                  </label>

                  <input
                    name="password"
                    placeholder="Minimal 8 karakter"
                    onChange={handleChange}
                    className="w-full mt-1 border rounded-2xl px-4 py-3 bg-gray-50"
                  />
                </div>

              </div>
            </div>
          )}

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