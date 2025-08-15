import { useEffect, useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { useIsDesktop } from "@/components/hooks/useIsDesktop";

export default function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isDesktop = useIsDesktop();
  const location = useLocation();
  const [prevPath, setPrevPath] = useState(location.pathname);

  useEffect(() => {
    if (!isDesktop && mobileOpen && location.pathname !== prevPath) {
      setMobileOpen(false);
    }
    setPrevPath(location.pathname);
  }, [location.pathname, isDesktop, mobileOpen]);

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
          {/* Aqui entram as rotas privadas renderizadas */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
