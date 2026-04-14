import { useNavigate, useLocation, Link } from "react-router";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useQuestions from "@/features/formBuilder/hooks/useQuestions";
import type { formLayoutTypes } from "@/features/formBuilder/types";
import { CheckSquare, Dot, List, Type, FileQuestion, Layout, TableConfig } from "lucide-react";
import { useSearchParams } from "react-router";

const fieldTypes: { type: formLayoutTypes; label: string; icon: typeof Type }[] =
  [
    { type: "text", label: "Texto", icon: Type },
    { type: "radio", label: "Única", icon: Dot },
    { type: "checkbox", label: "Várias", icon: CheckSquare },
    { type: "select", label: "Lista", icon: List },
  ];

const items = [
  { title: "Workspace", to: "/dashboard", icon: "folder_open" },
  { title: "Projetos", to: "/dashboard/projects", icon: "edit_note" },
  { title: "Criar novo", to: "/builder", icon: "rocket_launch" },
];

function BuilderEditorNav() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "questions";

  const links = [
    { tab: "config", label: "Projeto", Icon: TableConfig },
    { tab: "questions", label: "Formulários", Icon: FileQuestion },
    { tab: "layout", label: "Layout", Icon: Layout },
  ] as const;

  return (
    <div className="mt-2 border-t border-outline-variant/20 px-2 pt-3">
      <p className="px-2 pb-1.5 font-label text-[9px] font-bold tracking-widest text-outline uppercase">
        Editor
      </p>
      <div className="space-y-0.5">
        {links.map(({ tab: t, label, Icon }) => {
          const active = tab === t;
          return (
            <Link
              key={t}
              to={`/builder?tab=${t}`}
              className={cn(
                "flex items-center gap-2 rounded-lg py-1.5 pr-3 pl-2 text-left transition-all",
                active
                  ? "translate-x-0.5 bg-surface-container-lowest font-semibold text-primary editorial-shadow"
                  : "text-slate-600 hover:bg-surface-container-highest hover:text-primary"
              )}
            >
              <Icon className="size-3.5 shrink-0 opacity-80" />
              <span className="font-label text-[11px] font-medium tracking-wide uppercase">
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function DashboardSidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { createQuestion } = useQuestions();

  return (
    <aside className="bg-surface-container-low fixed top-0 left-0 z-40 hidden h-screen w-64 flex-col py-4 pl-3 md:flex">
      <div className="mb-6 px-3">
        <Link
          to="/"
          className="font-headline text-lg font-bold text-primary hover:opacity-90"
        >
          Design Studio
        </Link>
        <p className="font-label mt-0.5 text-[10px] font-medium tracking-wider text-slate-500 uppercase">
          Demo
        </p>
      </div>
      <nav className="flex flex-1 flex-col gap-0.5">
        {items.map((item) => {
          const active =
            item.to === "/builder"
              ? pathname === "/builder"
              : pathname === item.to;
          return (
            <button
              key={item.to}
              type="button"
              onClick={() =>
                navigate(
                  item.to === "/builder" ? "/builder?tab=questions" : item.to
                )
              }
              className={cn(
                "flex items-center gap-2.5 rounded-l-xl py-2 pr-3 pl-2.5 text-left transition-all",
                active
                  ? "translate-x-1 bg-surface-container-lowest font-bold text-primary editorial-shadow"
                  : "text-slate-600 hover:bg-surface-container-highest hover:text-primary"
              )}
            >
              <span className="material-symbols-outlined text-[22px]">
                {item.icon}
              </span>
              <span className="font-label text-xs font-medium tracking-wider uppercase">
                {item.title}
              </span>
            </button>
          );
        })}
        {pathname === "/builder" && <BuilderEditorNav />}
      </nav>

      {pathname === "/builder" && (
        <div className="mt-auto border-t border-outline-variant/20 px-3 pt-3">
          <p className="font-label mb-2 text-[9px] font-bold tracking-widest text-outline uppercase">
            Adicionar campo
          </p>
          <div className="grid grid-cols-2 gap-1.5 pr-2">
            {fieldTypes.map(({ type, label, icon: Icon }) => (
              <Button
                key={type}
                type="button"
                variant="outline"
                size="sm"
                className="h-auto flex-col gap-0.5 rounded-md py-2 text-[10px]"
                onClick={() => createQuestion(type)}
              >
                <Icon className="size-3.5 opacity-80" />
                {label}
              </Button>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
