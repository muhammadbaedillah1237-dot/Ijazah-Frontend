// frontend-ijazah/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// PAGES EXISTING
import Login from "./pages/Login";
import Template from "./pages/Template";
import DataMahasiswa from "./pages/DataMahasiswa";
<<<<<<< HEAD
import Profile from "./pages/Profile";

// IJAZAH PAGES
import IjazahTerbit from "./pages/IjazahTerbit";
import IjazahProses from "./pages/IjazahProses";
import IjazahReject from "./pages/IjazahReject";
import IjazahRevoke from "./pages/IjazahRevoke";
=======
import DetailBatch from "./pages/DetailBatch";
import DetailMahasiswa from "./pages/DetailMahasiswa";
import DaftarUnit from "./pages/DaftarUnit";
import DaftarPengguna from "./pages/DaftarPengguna";
import Profile from "./pages/Profile";
import IjazahTerbit from "./pages/IjazahTerbit";
import BatchTerbit from "./pages/BatchTerbit";

// DASHBOARD PAGES (BARU)
import AdminDashboard from "./pages/Dashboard";
import OperatorDashboard from "./pages/operator/OperatorDashboard";
import VerifikatorDashboard from "./pages/verifikator/VerifikatorDashboard";
import RektorDashboard from "./pages/rektor/RektorDashboard";

// KOMPONEN PROTECTED ROUTE
const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const kategori = localStorage.getItem("kategori");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Cek apakah role diizinkan
  if (allowedRoles && allowedRoles.length > 0) {
    const isAllowed = allowedRoles.some(allowedRole => 
      allowedRole === role || allowedRole === kategori
    );
    if (!isAllowed) {
      return <Navigate to="/login" replace />;
    }
  }

  return children;
};

// KOMPONEN REDIRECT BERDASARKAN ROLE
const RoleBasedRedirect = () => {
  const role = localStorage.getItem("role");
  const kategori = localStorage.getItem("kategori");
  
  if (role === "admin") {
    return <Navigate to="/admin-dashboard" replace />;
  } else if (role === "operator") {
    return <Navigate to="/operator-dashboard" replace />;
  } else if (role === "rektor") {
    return <Navigate to="/rektor-dashboard" replace />;
  } else if (role === "verifikator") {
    return <Navigate to="/verifikator-dashboard" replace />;
  }
  
  return <Navigate to="/login" replace />;
};
>>>>>>> origin/bae-frontend

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* PUBLIC ROUTE */}
          <Route path="/login" element={<Login />} />

<<<<<<< HEAD
          {/* PROTECTED */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
          />

          <Route
            path="/verifikasi"
            element={<ProtectedRoute><Verifikasi /></ProtectedRoute>}
          />

          <Route
            path="/template"
            element={<ProtectedRoute><Template /></ProtectedRoute>}
          />

          <Route
            path="/data-mahasiswa"
            element={<ProtectedRoute><DataMahasiswa /></ProtectedRoute>}
          />

          <Route
            path="/profile"
            element={<ProtectedRoute><Profile /></ProtectedRoute>}
          />

          {/* IJAZAH ROUTES 🔥 */}
          <Route
            path="/ijazah-terbit"
            element={<ProtectedRoute><IjazahTerbit /></ProtectedRoute>}
          />

          <Route
            path="/ijazah-proses"
            element={<ProtectedRoute><IjazahProses /></ProtectedRoute>}
          />

          <Route
            path="/ijazah-reject"
            element={<ProtectedRoute><IjazahReject /></ProtectedRoute>}
          />

          <Route
            path="/ijazah-revoke"
            element={<ProtectedRoute><IjazahRevoke /></ProtectedRoute>}
=======
          {/* ============ DASHBOARD ROUTES (Per Role) ============ */}
          
          {/* ADMIN DASHBOARD */}
          <Route 
            path="/admin-dashboard" 
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* OPERATOR DASHBOARD */}
          <Route 
            path="/operator-dashboard" 
            element={
              <ProtectedRoute allowedRoles={["operator"]}>
                <OperatorDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* VERIFIKATOR DASHBOARD */}
          <Route 
            path="/verifikator-dashboard" 
            element={
              <ProtectedRoute allowedRoles={["verifikator"]}>
                <VerifikatorDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* REKTOR DASHBOARD */}
          <Route 
            path="/rektor-dashboard" 
            element={
              <ProtectedRoute allowedRoles={["rektor"]}>
                <RektorDashboard />
              </ProtectedRoute>
            } 
          />

          {/* ============ FITUR UMUM (Akses untuk semua role yang sudah login) ============ */}
          
          {/* TEMPLATE */}
          <Route 
            path="/template" 
            element={
              <ProtectedRoute allowedRoles={["admin", "operator", "verifikator", "rektor"]}>
                <Template />
              </ProtectedRoute>
            } 
          />

          {/* DATA MAHASISWA */}
          <Route 
            path="/data-mahasiswa" 
            element={
              <ProtectedRoute allowedRoles={["admin", "operator", "verifikator", "rektor"]}>
                <DataMahasiswa />
              </ProtectedRoute>
            } 
          />
          {/* IJAZAH TERBIT */}
          <Route
            path="/ijazah-terbit"
            element={
          <ProtectedRoute>
           <IjazahTerbit />
          </ProtectedRoute>
      }
      />
     {/* BATCH TERBIT */}
      <Route path="/batch-terbit/:id" element={<BatchTerbit />} />

          {/* DETAIL BATCH */}
          <Route 
            path="/detail-batch/:id" 
            element={
              <ProtectedRoute allowedRoles={["admin", "operator", "verifikator", "rektor"]}>
                <DetailBatch />
              </ProtectedRoute>
            } 
          />

          {/* DETAIL MAHASISWA */}
          <Route 
            path="/detail-mahasiswa" 
            element={
              <ProtectedRoute allowedRoles={["admin", "operator", "verifikator", "rektor"]}>
                <DetailMahasiswa />
              </ProtectedRoute>
            } 
          />
        

          {/* DAFTAR UNIT */}
          <Route 
            path="/daftar-unit" 
            element={
              <ProtectedRoute allowedRoles={["admin", "operator", "verifikator", "rektor"]}>
                <DaftarUnit />
              </ProtectedRoute>
            } 
          />

          {/* DAFTAR PENGGUNA (Khusus Admin) */}
          <Route 
            path="/daftar-pengguna" 
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <DaftarPengguna />
              </ProtectedRoute>
            } 
          />

          {/* PROFILE (Semua role yang sudah login) */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute allowedRoles={["admin", "operator", "verifikator", "rektor"]}>
                <Profile />
              </ProtectedRoute>
            } 
>>>>>>> origin/bae-frontend
          />

          {/* REDIRECT DARI / DASHBOARD LAMA KE ROLE BASED */}
          <Route path="/dashboard" element={<RoleBasedRedirect />} />

          {/* REDIRECT DEFAULT */}
          <Route path="/" element={<Navigate to="/login" replace />} />
<<<<<<< HEAD
=======

          {/* FALLBACK - SEMUA RUTE TAK DIKENAL */}
>>>>>>> origin/bae-frontend
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;