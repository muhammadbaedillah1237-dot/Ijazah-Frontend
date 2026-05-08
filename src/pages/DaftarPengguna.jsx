import React, { useState } from "react";
import EditUserCard from "../components/ui/EditUserCard";
import HapusUserCard from "../components/ui/HapusUserCard";
import DashboardLayout from "../components/ui/DashboardLayout";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import AddUserCard from "../components/ui/AddUserCard";

const DaftarPengguna = () => {

  const [openTambah, setOpenTambah] = useState(false);

  // ✅ DATA AWAL (TETAP ADA)
  const initialUsers = [
    {
      role: "Rektor",
      nama: "Drs. Agus Solo, M.KOM.",
      unit: "Universitas Ibn Khaldun Bogor",
      email: "agus123@gmail.com",
      password: "12345678",
    },
    {
      role: "Wakil Rektor",
      nama: "Drs. Anisaa Putri, M.Kom",
      unit: "Universitas Ibn Khaldun Bogor",
      email: "aniisa726@gmail.com",
      password: "12345678",
    },
    {
      role: "KATU Rektorat",
      nama: "Yoga Aldiansyah, S.Kom",
      unit: "Universitas Ibn Khaldun Bogor",
      email: "yoga925@gmail.com",
      password: "12345678",
    },
  ];

const [users, setUsers] = useState(initialUsers);

// tambah user
const handleAddUser = (newUser) => {
    setUsers([...users, newUser]);
  };
const [openEdit, setOpenEdit] = useState(false);
const [openHapus, setOpenHapus] = useState(false);
const [selectedUser, setSelectedUser] = useState(null);
const [selectedIndex, setSelectedIndex] = useState(null);

// Handle Edit
const handleEditUser = (updatedUser) => {
  const updatedUsers = users.map((u, i) =>
    i === selectedIndex ? updatedUser : u
  );
  setUsers(updatedUsers);
};

// Handle Hapus
const handleHapusUser = () => {
  const updatedUsers = users.filter((_, i) => i !== selectedIndex);
  setUsers(updatedUsers);
  setOpenHapus(false);
};

  return (
    <DashboardLayout>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Daftar Pengguna
          </h1>
          <p className="text-sm text-gray-500">
            Kelola data pengguna sistem dan akses pengguna secara efisien.
          </p>
        </div>

        <button
          onClick={() => setOpenTambah(true)}
          className="flex items-center gap-2 bg-[#0B4B48] hover:bg-[#083c3a] text-white px-4 py-2 
          rounded-lg shadow-xl text-sm font-semibold"
        >
          <FiPlus />
          Tambah Pengguna
        </button>
      </div>


      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm text-left">

          <thead className="bg-gray-100 text-gray-400 text-bold shadow-md">
            <tr>
              <th className="py-4 px-4 text-center">No.</th>
              <th className="py-4 px-4">Role</th>
              <th className="py-4 px-4 text-center">Nama</th>
              <th className="py-4 px-4 text-center">Nama Unit</th>
              <th className="py-4 px-4 text-center">Email</th>
              <th className="py-4 px-4 text-center">Password</th>
              <th className="py-4 px-4 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
  {users.map((user, index) => (
    <tr key={index} className="border border-gray-300 hover:bg-gray-100">
      <td className="py-4 px-4 text-center font-bold">{index + 1}.</td>
      <td className="py-4 px-4 font-bold">{user.role}</td>
      <td className="py-4 px-4 text-center font-bold">{user.nama}</td>
      <td className="py-4 px-4 text-center font-bold">{user.unit}</td>
      <td className="py-4 px-4 text-center font-bold">{user.email}</td>
      <td className="py-4 px-4 text-center font-bold">{user.password}</td>
      <td className="py-4 px-4">
        <div className="flex justify-center gap-3">
          <button
            className="text-black hover:text-gray-600"
            onClick={() => {
              setSelectedUser(user);
              setSelectedIndex(index);
              setOpenEdit(true);
            }}
          >
            <FiEdit2 />
          </button>
          <button
            className="text-black hover:text-red-600"
            onClick={() => {
              setSelectedUser(user);
              setSelectedIndex(index);
              setOpenHapus(true);
            }}
          >
            <FiTrash2 />
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>

      {/* MODAL TAMBAH */}
      {openTambah && (
        <AddUserCard
          onClose={() => setOpenTambah(false)}
          onSave={handleAddUser}
          existingUsers={users}
        />
      )}
      {/* MODAL EDIT */}
      {openEdit && (
        <EditUserCard
          onClose={() => setOpenEdit(false)}
          onSave={handleEditUser}
          userData={selectedUser}
        />
      )}

      {/* MODAL HAPUS */}
      {openHapus && (
        <HapusUserCard
          onClose={() => setOpenHapus(false)}
          onHapus={handleHapusUser}
          userData={selectedUser}
        />
      )}

          </DashboardLayout>
  );
};

export default DaftarPengguna;