import { Routes, Route, Navigate } from "react-router-dom";
import Login from "@/pages/auth/Login";
import { ProtectedRoute } from "@/router/ProtectedRoute";
import { ClientsList } from "@/pages/clients/ClientsList";
import { ClientForm } from "@/pages/clients/ClientForm";
import { ScheduleList } from "@/pages/shedules/ScheduleList";
import { ScheduleHistoryList } from "@/pages/scheduleHistory/ScheduleHistoryList";
import { ProductList } from "@/pages/products/ProductsList";
import { ProductForm } from "@/pages/products/ProductForm";
import { SaleForm } from "@/pages/sales/SaleForm";
import AppShell from "@/components/layout/AppShellRoutes";

export default function AppRouter() {
  return (
    <Routes>
      {/* Público */}
      <Route path="/login" element={<Login />} />

      {/* Privado (com Sidebar/Header via AppShell) */}
      <Route 
        element={<ProtectedRoute />}
        >
        <Route element={<AppShell />}>
          <Route path="/" element={<Navigate to="/clients" replace />} />
          <Route path="/clients" element={<ClientsList />} />
          <Route path="/clients/new" element={<ClientForm />} />
          <Route path="/schedules" element={<ScheduleList />} />
          <Route path="/scheduleHistories" element={<ScheduleHistoryList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/new" element={<ProductForm />} />
          <Route path="/sales/new" element={<SaleForm />} />
          <Route path="*" element={<Navigate to="/clients" replace />} />
        </Route>
      </Route>
    </Routes>
  );
}


