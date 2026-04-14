import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FileQuestion, Layout, Menu, TableConfig } from "lucide-react";
import { Link, useLocation, useSearchParams } from "react-router";
import { cn } from "@/lib/utils";

const items = [
  { title: "Workspace", to: "/dashboard", icon: "folder_open" },
  { title: "Projetos", to: "/dashboard/projects", icon: "edit_note" },
  { title: "Criar novo", to: "/builder?tab=questions", icon: "rocket_launch" },
];

const builderEditorLinks = [
  { tab: "config", title: "Projeto", Icon: TableConfig },
  { tab: "questions", title: "Formulários", Icon: FileQuestion },
  { tab: "layout", title: "Layout", Icon: Layout },
] as const;

export function DashboardMobileBar() {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "questions";

  return (
    <header className="bg-surface-container-low sticky top-0 z-40 flex items-center justify-between border-b border-outline-variant/10 px-4 py-3 md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Abrir menu">
            <Menu className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 bg-surface-container-low">
          <SheetHeader>
            <SheetTitle className="font-headline text-left text-primary">
              Design Studio
            </SheetTitle>
          </SheetHeader>
          <nav className="mt-8 flex flex-col gap-1">
            {items.map((item) => (
              <SheetClose key={item.to} asChild>
                <Link
                  to={item.to}
                  className={cn(
                    "flex items-center gap-3 rounded-xl py-3 pr-4 pl-3 font-label text-sm font-medium tracking-wider uppercase",
                    pathname === item.to.split("?")[0]
                      ? "bg-surface-container-lowest font-bold text-primary"
                      : "text-slate-600 hover:bg-surface-container-highest hover:text-primary"
                  )}
                >
                  <span className="material-symbols-outlined">{item.icon}</span>
                  {item.title}
                </Link>
              </SheetClose>
            ))}
          </nav>
          {pathname === "/builder" && (
            <div className="mt-6 border-t border-outline-variant/20 pt-4">
              <p className="px-3 pb-2 font-label text-[10px] font-bold tracking-widest text-outline uppercase">
                Editor
              </p>
              <nav className="flex flex-col gap-1">
                {builderEditorLinks.map(({ tab: t, title, Icon }) => (
                  <SheetClose key={t} asChild>
                    <Link
                      to={`/builder?tab=${t}`}
                      className={cn(
                        "flex items-center gap-3 rounded-xl py-2.5 pr-4 pl-3 font-label text-xs font-medium tracking-wider uppercase",
                        tab === t
                          ? "bg-surface-container-lowest font-bold text-primary"
                          : "text-slate-600 hover:bg-surface-container-highest hover:text-primary"
                      )}
                    >
                      <Icon className="size-4 shrink-0 opacity-80" />
                      {title}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </div>
          )}
        </SheetContent>
      </Sheet>
      <span className="font-headline text-sm font-bold text-primary">
        Form Builder
      </span>
      <div className="w-10" />
    </header>
  );
}
