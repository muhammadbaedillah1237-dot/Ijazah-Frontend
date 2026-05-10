import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

// PAGES EXISTING
import Login from "./pages/login";
import Template from "./pages/Template";
import DataMahasiswa from "./pages/DataMahasiswa";
import DetailBatch from "./pages/DetailBatch";
import DetailMahasiswa from "./pages/DetailMahasiswa";
import DaftarUnit from "./pages/DaftarUnit";
import DaftarPengguna from "./pages/DaftarPengguna";
import Profile from "./pages/Profile";
import IjazahTerbit from "./pages/IjazahTerbit";
import BatchTerbit from "./pages/BatchTerbit";

// DASHBOARD PAGES
import AdminDashboard from "./pages/Dashboard";
import OperatorDashboard from "./pages/operator/OperatorDashboard";
import VerifikatorDashboard from "./pages/verifikator/VerifikatorDashboard";
import RektorDashboard from "./pages/rektor/RektorDashboard";

// ============================================================
// SEMUA ROLE YANG ADA DI SISTEM
// ============================================================
const ALL_ROLES = [
  "admin", "operator", "operator_data", "verifikator",
  "rektor", "wakil_rektor", "dekan", "wakil_dekan",
  "tu_fakultas", "tu_rektorat"
];

// PROTECTED ROUTE
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
    </div>
  );

  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && allowedRoles.length > 0) {
    if (!allowedRoles.includes(user.role)) {
      return <Navigate to="/login" replace />;
    }
  }

  return children;
};

// REDIRECT BERDASARKAN ROLE
const RoleBasedRedirect = () => {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  if (user.role === "admin")         return <Navigate to="/admin-dashboard" replace />;
  if (user.role === "operator")      return <Navigate to="/operator-dashboard" replace />;
  if (user.role === "operator_data") return <Navigate to="/operator-dashboard" replace />;
  if (user.role === "rektor")        return <Navigate to="/rektor-dashboard" replace />;
  if (user.role === "verifikator")   return <Navigate to="/verifikator-dashboard" replace />;

  // Role lain → admin-dashboard (sementara)
  return <Navigate to="/admin-dashboard" replace />;
};

function App() {
  // Role yang bisa akses admin-dashboard (sementara semua role non-khusus)
  const adminDashboardRoles = [
    "admin", "dekan", "wakil_rektor", "wakil_dekan",
    "tu_fakultas", "tu_rektorat", "rektor"
  ];

  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          {/* PUBLIC ROUTE */}
          <Route path="/login" element={<Login />} />

          {/* DASHBOARD ROUTES */}
          <Route path="/admin-dashboard" element={
            <ProtectedRoute allowedRoles={adminDashboardRoles}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/operator-dashboard" element={
            <ProtectedRoute allowedRoles={["operator", "operator_data"]}>
              <OperatorDashboard />
            </ProtectedRoute>
          } />
          <Route path="/verifikator-dashboard" element={
            <ProtectedRoute allowedRoles={["verifikator"]}>
              <VerifikatorDashboard />
            </ProtectedRoute>
          } />
          <Route path="/rektor-dashboard" element={
            <ProtectedRoute allowedRoles={["rektor"]}>
              <RektorDashboard />
            </ProtectedRoute>
          } />

          {/* FITUR UMUM */}
          <Route path="/template" element={<ProtectedRoute allowedRoles={ALL_ROLES}><Template /></ProtectedRoute>} />
          <Route path="/data-mahasiswa" element={<ProtectedRoute allowedRoles={ALL_ROLES}><DataMahasiswa /></ProtectedRoute>} />
          <Route path="/ijazah-terbit" element={<ProtectedRoute allowedRoles={ALL_ROLES}><IjazahTerbit /></ProtectedRoute>} />
          <Route path="/batch-terbit/:id" element={<ProtectedRoute allowedRoles={ALL_ROLES}><BatchTerbit /></ProtectedRoute>} />
          <Route path="/detail-batch/:id" element={<ProtectedRoute allowedRoles={ALL_ROLES}><DetailBatch /></ProtectedRoute>} />
          <Route path="/detail-mahasiswa" element={<ProtectedRoute allowedRoles={ALL_ROLES}><DetailMahasiswa /></ProtectedRoute>} />
          <Route path="/daftar-unit" element={<ProtectedRoute allowedRoles={ALL_ROLES}><DaftarUnit /></ProtectedRoute>} />
          <Route path="/daftar-pengguna" element={<ProtectedRoute allowedRoles={["admin"]}><DaftarPengguna /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute allowedRoles={ALL_ROLES}><Profile /></ProtectedRoute>} />

          {/* REDIRECTS */}
          <Route path="/dashboard" element={<RoleBasedRedirect />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;