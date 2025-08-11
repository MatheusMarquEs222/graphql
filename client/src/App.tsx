import { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import { Menu } from "lucide-react"
import { Sidebar } from "@/components/layout/Sidebar"

import { ClientsList } from "@/pages/clients/ClientsList"
import { ClientForm } from "@/pages/clients/ClientForm"
import { ScheduleList } from "@/pages/shedules/ScheduleList"
import { ScheduleHistoryList } from "@/pages/scheduleHistory/ScheduleHistoryList"
import { ProductList } from "@/pages/products/ProductsList"
import { ProductForm } from "@/pages/products/ProductForm"
import { SaleForm } from "@/pages/sales/SaleForm"
import { useIsDesktop } from "./components/hooks/useIsDesktop"

function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const isDesktop = useIsDesktop()
  const location = useLocation()

  useEffect(() => {
    const isMobile = !isDesktop
    if (mobileOpen && isMobile) setMobileOpen(false)
  }, [location.pathname, isDesktop, mobileOpen])

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onNavigate={() => setMobileOpen(false)}
      />

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-30 bg-white border-b border-zinc-200">
          <div className="h-14 px-4 md:px-6 flex items-center gap-3">
            <button
              className="md:hidden inline-flex items-center justify-center rounded-md border border-zinc-200 bg-gray-100 hover:bg-gray-200 w-10 h-10"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu size={18} />
            </button>
            <img src="/logo.png" alt="Conecta-Waterfall" className="h-6 md:hidden" />
            <div className="ml-auto flex items-center gap-3">{/* ações futuras */}</div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <Routes>
            <Route path="/clients" element={<ClientsList />} />
            <Route path="/clients/new" element={<ClientForm />} />
            <Route path="/schedules" element={<ScheduleList />} />
            <Route path="/scheduleHistories" element={<ScheduleHistoryList />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/new" element={<ProductForm />} />
            <Route path="/sales/new" element={<SaleForm />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  )
}