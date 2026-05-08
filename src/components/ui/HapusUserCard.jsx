export default function HapusUserCard({ onClose, onHapus, userData }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[450px] rounded-2xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="px-8 py-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Hapus Pengguna</h2>
        </div>

        {/* CONTENT */}
        <div className="p-8">
          <p className="text-gray-600 text-sm">
            Apakah kamu yakin ingin menghapus pengguna ini?
          </p>
          <div className="mt-4 bg-gray-50 border rounded-2xl px-5 py-4 space-y-1">
            <p className="text-sm font-semibold text-gray-800">{userData.nama}</p>
            <p className="text-xs text-gray-400">{userData.role} — {userData.unit}</p>
            <p className="text-xs text-gray-400">{userData.email}</p>
          </div>
          <p className="text-xs text-red-400 mt-3">
            Tindakan ini tidak dapat dibatalkan.
          </p>
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
            onClick={onHapus}
            className="px-6 py-2 rounded-xl bg-red-600 shadow-md text-white hover:bg-red-700"
          >
            Hapus
          </button>
        </div>

      </div>
    </div>
  );
}