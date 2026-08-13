import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import ProtectedRoutes from "@/routes/ProtectedRoutes";
import AdminLayout from "@/layouts/AdminLayout";

import DashboardPage from "@/features/dashboard/DashboardPage";
import RepairRequestsPage from "@/features/repair-request/RepairRequestsPage";
import LoginPage from "@/features/auth/LoginPage";
import TrackingPage from "@/features/tracking/TrackingPage";
import RepairRequestFormPage from "@/features/repair-request/repair-request-form/RepairRequestFormPage";

function Placeholder({ title }: { title: string }) {
  return (
    <div className="flex min-h-[400px] flex-1 items-center justify-center">
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
          element={<RepairRequestFormPage />}
        />

        <Route
          path="/track"
          element={<TrackingPage />}
        />

        {/* =========================
            Authentication
        ========================== */}

        <Route
          path="/login"
          element={<LoginPage />}
        />

        {/* =========================
            Protected Admin Routes
        ========================== */}

        <Route
          path="/admin"
          element={
            <ProtectedRoutes>
              <AdminLayout />
            </ProtectedRoutes>
          }
        >
          {/* Dashboard */}
          <Route
            index
            element={<DashboardPage />}
          />

          {/* Repair Requests */}
          <Route
            path="repair-requests"
            element={<RepairRequestsPage />}
          />

          {/* Timeline */}
          <Route
            path="timeline"
            element={
              <Placeholder title="Timeline" />
            }
          />

          {/* Repair Notes */}
          <Route
            path="repair-notes"
            element={
              <Placeholder title="Repair Notes" />
            }
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