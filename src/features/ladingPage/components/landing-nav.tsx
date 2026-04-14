import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router";

const nav = [
  { label: "Projetos", to: "/dashboard/projects" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "Demonstração", to: "/form/demo" },
];

export function LandingNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <header className="bg-surface fixed top-0 z-50 flex w-full max-w-full items-center justify-between px-6 py-4 md:px-8">
      <div className="flex items-center gap-6 md:gap-8">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="font-headline text-xl font-extrabold tracking-tighter text-primary md:text-2xl"
        >
          The Editorial Form Architect
        </button>
        <nav className="hidden items-center gap-4 md:flex md:gap-6">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "font-headline text-lg tracking-tight transition-colors",
                pathname === item.to
                  ? "border-b-2 border-primary pb-1 font-bold text-primary"
                  : "rounded-md px-3 py-1 font-medium text-slate-500 hover:bg-surface-container-low hover:text-primary"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <button
          type="button"
          className="material-symbols-outlined rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high"
          aria-label="Notificações"
        >
          notifications
        </button>
        <Button
          variant="signature"
          size="sm"
          className="hidden rounded-md px-5 font-bold sm:inline-flex"
          onClick={() => navigate("/builder?tab=questions")}
        >
          Criar formulário
        </Button>
      </div>
    </header>
  );
}
