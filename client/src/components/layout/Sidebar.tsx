import { JSX, useState } from "react"
import {
  Settings,
  LogOut,
  HelpCircle,
  Users,
  FileText,
  FileCheck2,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Package
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import { useIsDesktop } from "../hooks/useIsDesktop"

interface NavSection {
  label: string
  icon: JSX.Element
  links: { label: string; href: string }[]
}

const navSections: NavSection[] = [
  {
    label: "Clientes",
    icon: <Users size={20} />,
    links: [
      { label: "Listar Clientes", href: "/clients" },
      { label: "Novo Cliente", href: "/clients/new" },
    ],
  },
  {
    label: "Agendamentos",
    icon: <FileCheck2 size={20} />,
    links: [
      { label: "Listar Agendamentos", href: "/schedules" },
      { label: "Relatório de Serviços", href: "/scheduleHistories" },
    ],
  },
  {
    label: "Produtos",
    icon: <Package size={20} />,
    links: [
      { label: "Listar Produtos", href: "/products" },
      { label: "Novo Produto", href: "/products/new" },
    ],
  },
  {
    label: "Vendas",
    icon: <ShoppingCart size={20} />,
    links: [{ label: "Registrar Venda", href: "/sales/new" }],
  },
  {
    label: "Relatórios",
    icon: <FileText size={20} />,
    links: [
      { label: "Relatório de Serviços", href: "/scheduleHistories" },
    ],
  },
  {
    label: "Configurações",
    icon: <Settings size={20} />,
    links: [
      { label: "Usuários", href: "/config/usuarios" },
      { label: "Produtos", href: "/config/produtos" },
    ],
  },
]

export interface SidebarProps {
  mobileOpen: boolean
  onClose: () => void
  onNavigate?: () => void
}

export function Sidebar({ mobileOpen, onClose, onNavigate }: SidebarProps) {
  const isDesktop = useIsDesktop()
  const location = useLocation()
  const [expanded, setExpanded] = useState(true)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const toggleExpand = () => setExpanded((prev) => !prev)
  const toggleSection = (section: string) => {
    setActiveSection((prev) => (prev === section ? null : section))
  }

  return (
    <motion.aside
      animate={{
        x: isDesktop ? 0 : mobileOpen ? 0 : -1000,
        width: expanded ? 240 : 72,
      }}
      transition={{ duration: 0.25 }}
      className="bg-gray-50 text-zinc-700 h-screen flex flex-col p-3 border-r border-zinc-200 fixed md:static z-50 md:z-auto"
      style={{ willChange: "transform,width" }}
    >
      <div className="flex items-center justify-between mb-6">
        {expanded && (
          <Link to="/clients" aria-label="Ir para página inicial">
            <img src="/logo.png" alt="Conecta-Waterfall" className="h-8" />
          </Link>
        )}
        <div className="flex items-center gap-2">
          <Button
            onClick={toggleExpand}
            size="icon"
            className="rounded-full border border-zinc-200 bg-gray-100 hover:bg-gray-200"
            aria-label={expanded ? "Recolher sidebar" : "Expandir sidebar"}
          >
            {expanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </Button>
          <Button
            onClick={onClose}
            size="icon"
            className="md:hidden rounded-full border border-zinc-200 bg-gray-100 hover:bg-gray-200"
            aria-label="Fechar menu"
          >
            ✕
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="bg-slate-500 rounded-full w-8 h-8 flex items-center justify-center text-sm text-white">Cl</div>
        {expanded && (
          <div>
            <p className="text-sm font-semibold">Carla</p>
            <p className="text-xs text-zinc-400">Usuário</p>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto" aria-label="Menu principal">
        {navSections.map((section) => (
          <div key={section.label}>
            <button
              onClick={() => toggleSection(section.label)}
              className="w-full flex items-center gap-2 text-left text-sm font-medium hover:bg-zinc-200 px-3 py-2 rounded transition"
              aria-expanded={activeSection === section.label}
              aria-controls={`section-${section.label}`}
            >
              {section.icon}
              {expanded && section.label}
              {expanded && (
                <span className="ml-auto text-xs" aria-hidden>
                  {activeSection === section.label ? "▲" : "▼"}
                </span>
              )}
            </button>
            {expanded && activeSection === section.label && (
              <motion.div
                id={`section-${section.label}`}
                className="ml-6 mt-1 space-y-1"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.2 }}
              >
                {section.links.map((link) => {
                  const isActive = location.pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => {
                        if (!isDesktop) onNavigate?.() || onClose()
                      }}
                      className={`block text-sm px-3 py-2 rounded transition hover:bg-zinc-200 ${
                        isActive ? "bg-zinc-200 font-medium" : ""
                      }`}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </motion.div>
            )}
          </div>
        ))}
      </nav>

      <div className="mt-auto pt-4 border-t border-zinc-200 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-zinc-700 hover:text-blue-500"
        >
          <HelpCircle size={18} /> {expanded && "Ajuda"}
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-red-500 hover:text-red-600 font-bold"
        >
          <LogOut size={18} /> {expanded && "Sair"}
        </Button>
      </div>
    </motion.aside>
  )
}