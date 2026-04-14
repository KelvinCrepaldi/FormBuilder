import QuestionsTab from "../components/questionsTab";
import BuildTools from "../components/buildTools";
import useBuilder from "../hooks/useBuilder";
import useQuestions from "../hooks/useQuestions";
import useConfiguration from "../hooks/useConfiguration";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  CheckSquare,
  Dot,
  List,
  Menu,
  Type,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { formLayoutTypes } from "../types";

const floatingNav = [
  { title: "Workspace", to: "/dashboard", icon: "folder_open" },
  { title: "Projetos", to: "/dashboard/projects", icon: "edit_note" },
  { title: "Criar novo", to: "/builder?tab=questions", icon: "rocket_launch" },
  { title: "Builder2", to: "/builder2", icon: "deployed_code" },
] as const;

const fieldTypes: { type: formLayoutTypes; label: string; icon: typeof Type }[] =
  [
    { type: "text", label: "Texto", icon: Type },
    { type: "radio", label: "Única", icon: Dot },
    { type: "checkbox", label: "Várias", icon: CheckSquare },
    { type: "select", label: "Lista", icon: List },
  ];

export default function FormBuilderPage() {
  const { resetBuilder } = useBuilder();
  const { createQuestion, active } = useQuestions();
  const { configuration } = useConfiguration();
  const navigate = useNavigate();
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [leftPanelContent, setLeftPanelContent] = useState<
    "project" | "fields" | "layout"
  >("fields");

  useEffect(() => {
    resetBuilder();
    // Montagem: estado limpo ao entrar no builder
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (active) {
      setRightPanelOpen(true);
    }
  }, [active]);

  return (
    <main className="bg-surface relative flex min-h-svh flex-1 flex-col overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundColor: configuration.layout.backgroundColor,
          backgroundImage: "radial-gradient(#6f6f7a2b 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />
      <header className="pointer-events-none fixed top-3 left-3 right-3 z-50 h-12">
        <div className="pointer-events-auto absolute left-0 top-0 flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                type="button"
                size="icon"
                className="h-11 w-11 rounded-full bg-surface-container-low/95 shadow-lg backdrop-blur-sm"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 bg-surface-container-low">
              <SheetHeader>
                <SheetTitle className="font-headline text-left text-primary">
                  Design Studio
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1">
                {floatingNav.map((item) => (
                  <SheetClose key={item.to} asChild>
                    <Link
                      to={item.to}
                      className="flex items-center gap-3 rounded-xl py-2.5 pr-4 pl-3 font-label text-xs font-medium tracking-wider text-slate-700 uppercase hover:bg-surface-container-highest hover:text-primary"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {item.icon}
                      </span>
                      {item.title}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="pointer-events-auto absolute right-0 top-0 flex items-center gap-2">
          <div className="rounded-2xl border border-outline-variant/15 bg-surface-container-low/95 px-2 py-1 shadow-lg backdrop-blur-sm">
            <BuildTools />
          </div>
        </div>
      </header>

      <div className="relative min-h-svh flex-1 overflow-hidden">
        <QuestionsTab
          leftPanelOpen={leftPanelOpen}
          rightPanelOpen={rightPanelOpen}
          onToggleLeftPanel={() => setLeftPanelOpen((prev) => !prev)}
          onToggleRightPanel={() => setRightPanelOpen((prev) => !prev)}
          leftPanelContent={leftPanelContent}
          onLeftPanelContentChange={setLeftPanelContent}
        />
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center">
        <TooltipProvider>
          <div className="pointer-events-auto flex w-max items-center gap-2 rounded-full border border-outline-variant/15 bg-surface-container-low/90 px-3 py-2 shadow-xl backdrop-blur-sm">
            {fieldTypes.map(({ type, label, icon: Icon }) => (
              <Tooltip key={type}>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    size="icon"
                    className="h-11 w-11 rounded-full shadow-md"
                    variant="signature"
                    onClick={() => createQuestion(type)}
                  >
                    <Icon className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={8}>
                  Adicionar {label}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </div>

      <div className="fixed right-4 bottom-4 z-50 md:hidden">
        <Button
          type="button"
          size="icon"
          className="h-11 w-11 rounded-full shadow-lg"
          onClick={() => navigate("/dashboard/projects")}
          title="Voltar para projetos"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </Button>
      </div>
    </main>
  );
}
