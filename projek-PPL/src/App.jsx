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
// import Register from './pages/Register' // Buka komentar ini jika sudah membuat filenya

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* 1. Public routes: Bisa diakses tanpa login */}
          <Route path="/login" element={<Login />} />
          {/* <Route path="/register" element={<Register />} /> */}

          {/* 2. Protected routes: Membutuhkan login melalui ProtectedRoute */}
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

          {/* 3. Default redirect: Arahkan root ke login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* 4. Fallback: Menangani URL yang tidak terdaftar */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
