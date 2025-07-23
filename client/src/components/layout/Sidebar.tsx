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
import { Link } from "react-router-dom"

interface NavSection {
  label: string
  icon: JSX.Element
  links: { label: string, href: string }[]
}

const navSections: NavSection[] = [
  {
    label: "Clientes",
    icon: <Users size={20} />,
    links: [
      { label: "Meus Clientes", href: "/clients/myself" },
      { label: "Clientes da Empresa", href: "/clients/all" },
    ]
  },
  {
    label: "Agendamentos",
    icon: <FileCheck2 size={20} />,
    links: [
      { label: "Meus Agendamentos", href: "/schedules/myself" },
      { label: "Agendamento de Serviços", href: "/schedules/all" },
    ]
  },
  {
    label: "Produtos",
    icon: <Package size={20} />,
    links: [
      { label: "Meus Produtos", href: "/products/myself" },
      { label: "Produtos da Empresa", href: "/products/all" }
    ]
  },
  {
    label: "Relatórios",
    icon: <FileText size={20} />,
    links: [
      { label: "Relatório de Serviços", href: "/scheduleHistories" },
      { label: "Relatório de Vendas", href: "/vendas/relatorio" },
    ]
  },
  {
    label: "Vendas",
    icon: <ShoppingCart size={20} />,
    links: [
      { label: "Registrar Venda", href: "/sales/new" },
    ]
  },
  {
    label: "Configurações",
    icon: <Settings size={20} />,
    links: [
      { label: "Usuários", href: "/config/usuarios" },
      { label: "Produtos", href: "/config/produtos" }
    ]
  }
]

export function Sidebar() {
  const [expanded, setExpanded] = useState(true)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const toggleExpand = () => setExpanded((prev) => !prev)
  const toggleSection = (label: string) =>
    setActiveSection((prev) => (prev === label ? null : label))

  return (
    <motion.aside
      animate={{ width: expanded ? 240 : 72 }}
      transition={{ duration: 0.25 }}
      className="bg-gray-50 text-zinc-700 h-screen flex flex-col p-3 border-r border-zinc-200"
    >
      <div className="flex items-center justify-between mb-6">
        {expanded && <span className="text-lg font-bold text-blue-500">Conecta-Waterfall</span>}
        <Button
          onClick={toggleExpand}
          size="icon"
          className="rounded-full border border-zinc-200 bg-gray-100 hover:bg-gray-200"
        >
          {expanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </Button>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="bg-slate-500 rounded-full w-8 h-8 flex items-center justify-center text-sm">F9</div>
        {expanded && (
          <div>
            <p className="text-sm font-semibold">Franciele</p>
            <p className="text-xs text-zinc-400">Usuário</p>
          </div>
        )}
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto">
        {navSections.map((section) => (
          <div key={section.label}>
            <button
              onClick={() => toggleSection(section.label)}
              className="w-full flex items-center gap-2 text-left text-sm font-medium hover:bg-zinc-200 px-3 py-2 rounded transition"
            >
              {section.icon}
              {expanded && section.label}
              {expanded && (
                <span className="ml-auto text-xs">
                  {activeSection === section.label ? "▲" : "▼"}
                </span>
              )}
            </button>
            {expanded && activeSection === section.label && (
              <motion.div
                className="ml-6 mt-1 space-y-1"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.2 }}
              >
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="block text-sm hover:bg-zinc-200 px-3 py-2 rounded transition"
                  >
                    {link.label}
                  </Link>
                ))}
              </motion.div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-auto pt-4 border-t border-zinc-200 space-y-2">
        <Button variant="ghost" className="w-full justify-start text-left gap-2 text-zinc-700 hover:text-blue-500">
          <HelpCircle size={18} /> {expanded && "Ajuda"}
        </Button>
        <Button variant="ghost" className="w-full justify-start text-left gap-2 text-red-500 hover:text-red-600 font-bold">
          <LogOut size={18} /> {expanded && "Sair"}
        </Button>
      </div>
    </motion.aside>
  )
}
