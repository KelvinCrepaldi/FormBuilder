import { QUESTION_TEMPLATES } from "@/components/templates";
import useQuestions from "../hooks/useQuestions";
import useConfiguration from "../hooks/useConfiguration";
import { cn } from "@/lib/utils";
import type { questionTypes } from "../types";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function BuilderCanvas() {
  const { questions, active, setActive } = useQuestions();
  const { configuration } = useConfiguration();
  const layout = configuration.layout;
  const stepByStep = layout.layoutMode === "step_by_step";

  const sorted = [...questions].sort((a, b) => a.position - b.position);
  const activeIndex = active ? sorted.findIndex((q) => q.id === active) : -1;
  const currentIndex = activeIndex >= 0 ? activeIndex : 0;
  const currentQuestion = sorted[currentIndex];

  useEffect(() => {
    if (sorted.length === 0 || activeIndex >= 0) {
      return;
    }
    setActive(sorted[0].id);
  }, [sorted, activeIndex, setActive]);

  const layoutStyle: React.CSSProperties = {
    fontFamily: layout.font,
    fontSize: `${layout.fontSize}px`,
    color: layout.primaryColor,
  };

  return (
    <div
      className="relative min-h-[calc(100vh-12rem)] overflow-y-auto rounded-2xl border border-outline-variant/10 bg-transparent p-5 md:p-6"
      style={layoutStyle}
    >
      <div className="relative mx-auto flex max-w-xl flex-col gap-6">
        {configuration.title ? (
          <h1
            className="font-extrabold tracking-tight text-on-surface"
            style={{ fontSize: `${layout.titleFontSize ?? 32}px` }}
          >
            {configuration.title}
          </h1>
        ) : null}

        {layout.showProgressBar && sorted.length > 0 && (
          <div className="h-0.5 w-full overflow-hidden rounded-full bg-black/10">
            <div
              className="h-full transition-all"
              style={{
                width: `${(() => {
                  const i = active
                    ? sorted.findIndex((q) => q.id === active)
                    : 0;
                  const step = i < 0 ? 1 : i + 1;
                  return (step / sorted.length) * 100;
                })()}%`,
                backgroundColor: layout.primaryColor,
              }}
            />
          </div>
        )}

        {sorted.length === 0 ? (
          <div className="flex min-h-[260px] flex-col items-center justify-center gap-1.5 text-center opacity-60">
            <p className="font-headline text-base">Nenhum campo ainda</p>
            <p className="text-xs">
              Usa os botões flutuantes no canto inferior para adicionar.
            </p>
          </div>
        ) : stepByStep && currentQuestion ? (
          <>
            <CanvasFieldBlock
              form={currentQuestion}
              selected={active === currentQuestion.id}
              onSelect={() => setActive(currentQuestion.id)}
              expanded
            />
            <div className="flex items-center justify-between rounded-xl border border-outline-variant/20 bg-white/90 p-2.5">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={currentIndex <= 0}
                onClick={() => setActive(sorted[currentIndex - 1].id)}
              >
                Anterior
              </Button>
              <span className="text-xs font-semibold text-on-surface-variant">
                Campo {currentIndex + 1} de {sorted.length}
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={currentIndex >= sorted.length - 1}
                onClick={() => setActive(sorted[currentIndex + 1].id)}
              >
                Próximo
              </Button>
            </div>
          </>
        ) : (
          sorted.map((q) => (
            <CanvasFieldBlock
              key={q.id}
              form={q}
              selected={active === q.id}
              onSelect={() => setActive(q.id)}
              expanded={false}
            />
          ))
        )}
      </div>
    </div>
  );
}

function CanvasFieldBlock({
  form,
  selected,
  onSelect,
  expanded = false,
}: {
  form: questionTypes;
  selected: boolean;
  onSelect: () => void;
  expanded?: boolean;
}) {
  const Component = QUESTION_TEMPLATES[form.type];

  if (!Component) {
    return (
      <div className="rounded-lg border border-destructive/50 p-3 text-xs">
        Tipo não suportado: {form.type}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "w-full rounded-xl border-2 bg-white/92 text-left shadow-sm transition-all outline-none",
        expanded
          ? "min-h-[calc(100vh-22rem)] p-6 align-top md:p-8"
          : "p-5 md:p-6",
        selected
          ? "border-transparent"
          : "border-transparent hover:border-outline-variant/30"
      )}
    >
      <Component formData={form} builderPreview />
    </button>
  );
}
