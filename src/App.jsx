import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/shared/ProtectedRoute";

// PAGES
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import Verifikasi from "./pages/Verifikasi";
import Template from "./pages/Template";
import DataMahasiswa from "./pages/DataMahasiswa";
import DetailBatch from "./pages/DetailBatch";
import DetailMahasiswa from "./pages/DetailMahasiswa";
import DaftarUnit from "./pages/DaftarUnit";
import DaftarPengguna from "./pages/DaftarPengguna";
import Profile from "./pages/Profile"; // ✅ TAMBAHKAN IMPORT PROFILE

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* PUBLIC */}
          <Route path="/login" element={<Login />} />

          {/* PROTECTED - DASHBOARD & UTAMA */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/verifikasi"
            element={
              <ProtectedRoute>
                <Verifikasi />
              </ProtectedRoute>
            }
          />

          <Route
            path="/template"
            element={
              <ProtectedRoute>
                <Template />
              </ProtectedRoute>
            }
          />

          <Route
            path="/data-mahasiswa"
            element={
              <ProtectedRoute>
                <DataMahasiswa />
              </ProtectedRoute>
            }
          />

          {/* DETAIL ROUTES (dengan parameter) */}
          <Route
            path="/detail-batch/:id"
            element={
              <ProtectedRoute>
                <DetailBatch />
              </ProtectedRoute>
            }
          />

          <Route
            path="/detail-mahasiswa"
            element={
              <ProtectedRoute>
                <DetailMahasiswa />
              </ProtectedRoute>
            }
          />

          {/* MANAJEMEN UNIT & PENGGUNA */}
          <Route
            path="/daftar-unit"
            element={
              <ProtectedRoute>
                <DaftarUnit />
              </ProtectedRoute>
            }
          />

          <Route
            path="/daftar-pengguna"
            element={
              <ProtectedRoute>
                <DaftarPengguna />
              </ProtectedRoute>
            }
          />

          {/* ✅ PROFILE - TAMBAHKAN RUTE INI */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* REDIRECT DEFAULT */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* FALLBACK - SEMUA RUTE TAK DIKENAL */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;