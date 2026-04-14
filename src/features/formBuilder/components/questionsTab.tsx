import BuilderCanvas from "./builderCanvas";
import QuestionPropertiesPanel from "./questionPropertiesPanel";
import BuildCarousel from "./buildCarousel";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useQuestions from "../hooks/useQuestions";
import useConfiguration from "../hooks/useConfiguration";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function QuestionsTab({
  leftPanelOpen,
  rightPanelOpen,
  onToggleLeftPanel,
  onToggleRightPanel,
  leftPanelContent,
  onLeftPanelContentChange,
}: {
  leftPanelOpen: boolean;
  rightPanelOpen: boolean;
  onToggleLeftPanel: () => void;
  onToggleRightPanel: () => void;
  leftPanelContent: "project" | "fields" | "layout";
  onLeftPanelContentChange: (content: "project" | "fields" | "layout") => void;
}) {
  const { active, questions } = useQuestions();
  const {
    configuration,
    setLayoutMode,
    handleTitleChange,
    setFont,
    setFontSize,
    setTitleFontSize,
    setBackgroundColor,
  } = useConfiguration();
  const isStepByStep = configuration.layout.layoutMode === "step_by_step";

  return (
    <div className="relative min-h-0 flex-1 overflow-hidden">
      <div
        className="h-full overflow-auto p-4 pb-28 md:p-6 md:pb-28"
      >
        <div className="mx-auto flex w-full max-w-4xl justify-center">
          <div className="w-full max-w-[720px]">
            <BuilderCanvas />
          </div>
        </div>
      </div>
      <div
        className={cn(
          "pointer-events-none fixed top-24 left-4 z-30 hidden transition-transform md:block",
          leftPanelOpen ? "translate-x-0" : "-translate-x-[18rem]"
        )}
      >
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "pointer-events-auto h-[calc(100vh-12rem)] w-[17.5rem] rounded-2xl border border-outline-variant/15 bg-white shadow-xl transition-opacity",
              leftPanelOpen ? "opacity-100" : "opacity-0"
            )}
          >
            <div className="relative h-full">
              <div className="border-b border-outline-variant/15 p-2">
                <div className="grid grid-cols-3 gap-1 rounded-lg bg-surface-container-low p-1">
                  <button
                    type="button"
                    className={cn(
                      "rounded-md px-2 py-1.5 text-[11px] font-semibold",
                      leftPanelContent === "project"
                        ? "bg-white text-primary shadow-sm"
                        : "text-on-surface-variant hover:bg-white/70"
                    )}
                    onClick={() => onLeftPanelContentChange("project")}
                  >
                    Projeto
                  </button>
                  <button
                    type="button"
                    className={cn(
                      "rounded-md px-2 py-1.5 text-[11px] font-semibold",
                      leftPanelContent === "fields"
                        ? "bg-white text-primary shadow-sm"
                        : "text-on-surface-variant hover:bg-white/70"
                    )}
                    onClick={() => onLeftPanelContentChange("fields")}
                  >
                    Formulários
                  </button>
                  <button
                    type="button"
                    className={cn(
                      "rounded-md px-2 py-1.5 text-[11px] font-semibold",
                      leftPanelContent === "layout"
                        ? "bg-white text-primary shadow-sm"
                        : "text-on-surface-variant hover:bg-white/70"
                    )}
                    onClick={() => onLeftPanelContentChange("layout")}
                  >
                    Layout
                  </button>
                </div>
              </div>

              {leftPanelContent === "fields" ? (
                <>
                  <div className="border-b border-outline-variant/15 px-3 py-2">
                    <p className="text-[11px] font-semibold tracking-wide text-on-surface">
                      Ordem dos campos
                    </p>
                    <p className="text-[10px] text-on-surface-variant">
                      {questions.length} campo(s) · arrasta para reorganizar
                    </p>
                  </div>
                  <BuildCarousel orientation="vertical" />
                </>
              ) : leftPanelContent === "project" ? (
                <div className="flex flex-col gap-3 p-3">
                  <div className="space-y-1">
                    <Label htmlFor="project-title" className="text-[11px]">
                      Título do projeto
                    </Label>
                    <Input
                      id="project-title"
                      value={configuration.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className="h-8 text-sm"
                      placeholder="Nome do projeto"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="project-title-size" className="text-[11px]">
                      Tamanho do título
                    </Label>
                    <Input
                      id="project-title-size"
                      type="number"
                      min={12}
                      max={64}
                      value={configuration.layout.titleFontSize}
                      onChange={(e) =>
                        setTitleFontSize(Number(e.target.value || 0))
                      }
                      className="h-8 text-sm"
                    />
                  </div>
                </div>
              ) : leftPanelContent === "layout" ? (
                <div className="flex flex-col gap-3 p-3">
                  <p className="text-[11px] font-semibold tracking-wide text-on-surface">
                    Modo de layout
                  </p>
                  <Button
                    type="button"
                    variant={isStepByStep ? "outline" : "secondary"}
                    className="justify-start"
                    onClick={() => setLayoutMode("single_page")}
                  >
                    Uma página
                  </Button>
                  <Button
                    type="button"
                    variant={isStepByStep ? "secondary" : "outline"}
                    className="justify-start"
                    onClick={() => setLayoutMode("step_by_step")}
                  >
                    Passo a passo
                  </Button>

                  <div className="mt-1 space-y-1">
                    <Label className="text-[11px]">
                      Fonte
                    </Label>
                    <Select
                      value={configuration.layout.font}
                      onValueChange={setFont}
                    >
                      <SelectTrigger className="h-8 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Inter">Inter</SelectItem>
                        <SelectItem value="Roboto">Roboto</SelectItem>
                        <SelectItem value="Arial">Arial</SelectItem>
                        <SelectItem value="Montserrat">Montserrat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="layout-font-size" className="text-[11px]">
                      Tamanho da fonte
                    </Label>
                    <Input
                      id="layout-font-size"
                      type="number"
                      min={10}
                      max={40}
                      value={configuration.layout.fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      className="h-8 text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="layout-bg-color" className="text-[11px]">
                      Fundo do editor
                    </Label>
                    <Input
                      id="layout-bg-color"
                      type="color"
                      value={configuration.layout.backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="h-9 w-full cursor-pointer p-1"
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <Button
            type="button"
            size="icon"
            variant="outline"
            className="pointer-events-auto h-8 w-8 rounded-full bg-white shadow-md"
            onClick={onToggleLeftPanel}
            title={leftPanelOpen ? "Esconder painel esquerdo" : "Mostrar painel esquerdo"}
          >
            {leftPanelOpen ? (
              <ChevronLeft className="size-4" />
            ) : (
              <ChevronRight className="size-4" />
            )}
          </Button>
        </div>
      </div>
      <div
        className={cn(
          "pointer-events-none fixed top-24 right-4 z-30 hidden transition-transform md:block",
          rightPanelOpen ? "translate-x-0" : "translate-x-[19rem]"
        )}
      >
        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="icon"
            variant="outline"
            className="pointer-events-auto h-8 w-8 rounded-full bg-white shadow-md"
            onClick={onToggleRightPanel}
            title={rightPanelOpen ? "Esconder painel direito" : "Mostrar painel direito"}
          >
            {rightPanelOpen ? (
              <ChevronRight className="size-4" />
            ) : (
              <ChevronLeft className="size-4" />
            )}
          </Button>
          <div
            className={cn(
              "pointer-events-auto h-[calc(100vh-12rem)] rounded-2xl border border-outline-variant/15 bg-white shadow-xl transition-opacity",
              rightPanelOpen ? "opacity-100" : "opacity-0"
            )}
          >
            <div className="relative h-full">
              {active ? (
                <QuestionPropertiesPanel />
              ) : (
                <div className="flex h-full w-[18.5rem] items-center justify-center p-4 text-center text-xs text-on-surface-variant">
                  Seleciona um campo no preview para editar propriedades.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
