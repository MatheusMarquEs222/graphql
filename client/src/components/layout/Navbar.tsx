import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const links = [
  { name: "Clientes", path: "/clients" },
  { name: "Agendamentos", path: "/schedules" },
  { name: "Produtos", path: "/products" },
];

export function Navbar() {
  const location = useLocation();

  return (
    <header className="w-full bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight">Conecta - Watterfall</h1>
        <nav className="flex gap-6">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors",
                location.pathname === link.path
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
