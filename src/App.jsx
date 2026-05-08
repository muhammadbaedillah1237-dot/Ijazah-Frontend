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
import Profile from "./pages/Profile";

// IJAZAH PAGES
import IjazahTerbit from "./pages/IjazahTerbit";
import IjazahProses from "./pages/IjazahProses";
import IjazahReject from "./pages/IjazahReject";
import IjazahRevoke from "./pages/IjazahRevoke";

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
          />

          {/* DEFAULT */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;