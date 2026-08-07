import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
  
import AdminLayout from "@/layouts/AdminLayout";
import DashboardPage from "@/features/dashboard/DashboardPage";
// import ProtectedRoutes from "@/routes/ProtectedRoutes";

function Placeholder({ title }: { title: string }) {
  return (
    <div className="flex h-full flex-1 items-center justify-center">
      <h1 className="text-3xl font-bold">{title}</h1>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =========================
            Public Routes
        ========================== */}

        <Route
          path="/"
          element={<Placeholder title="Homepage" />}
        />

        <Route
          path="/repair-request"
          element={<Placeholder title="Repair Request Form" />}
        />

        <Route
          path="/track"
          element={<Placeholder title="Track Repair" />}
        />

        <Route
          path="/login"
          element={<Placeholder title="Login Page" />}
        />

        {/* =========================
            Protected Admin Routes
        ========================== */}

        <Route
          path="/admin"
          element={
            // <ProtectedRoutes>
             
            // </ProtectedRoutes>
             <AdminLayout />
          }
        >
          <Route
            index
            element={<DashboardPage />}
          />

          <Route
            path="repair-requests"
            element={<Placeholder title="Repair Requests" />}
          />

          <Route
            path="timeline"
            element={<Placeholder title="Timeline" />}
          />

          <Route
            path="repair-notes"
            element={<Placeholder title="Repair Notes" />}
          />
        </Route>

        {/* =========================
            404
        ========================== */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}