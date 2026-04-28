import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/shared/ProtectedRoute";

import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import Verifikasi from "./pages/Verifikasi";
import Template from "./pages/Template";
import DataMahasiswa from "./pages/DataMahasiswa"; 
import Profile from "./pages/Profile"; // ✅ JANGAN LUPA IMPORT INI

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* PUBLIC */}
          <Route path="/login" element={<Login />} />

          {/* PROTECTED */}
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

          {/* ✅ PROFILE (Pindahkan ke atas Fallback) */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />  

          {/* DEFAULT */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* FALLBACK (Selalu letakkan ini di Paling Bawah) */}
          <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;