import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useQuestions from "../hooks/useQuestions";
import BuildOption from "./buildOption";
import { Layers2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function QuestionPropertiesPanel() {
  const {
    questions,
    active,
    updateQuestionText,
    updateQuestionPlaceholder,
    updateQuestionDescription,
    duplicateQuestion,
    deleteQuestion,
    createOption,
  } = useQuestions();

  const form = active ? questions.find((q) => q.id === active) : undefined;

  if (!form) {
    return null;
  }

  const showPlaceholder = form.type === "text" || form.type === "select";
  const showOptions =
    form.type === "radio" ||
    form.type === "checkbox" ||
    form.type === "select";

  return (
    <aside className={cn("flex h-full w-[18.5rem] flex-col overflow-y-auto")}>
      <div className="flex flex-1 flex-col gap-3 p-3.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-label text-[9px] font-bold tracking-widest text-outline uppercase">
              Propriedades
            </p>
            <p className="font-headline text-sm font-bold capitalize leading-tight text-on-surface">
              {form.type.replace("_", " ")}
            </p>
            <p className="truncate font-mono text-[10px] text-muted-foreground">
              {form.id}
            </p>
          </div>
          <div className="flex shrink-0 gap-0.5">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => duplicateQuestion(form.id)}
              title="Duplicar"
            >
              <Layers2 className="size-3.5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 text-destructive"
              onClick={() => deleteQuestion(form.id)}
              title="Remover"
            >
              <Trash2 className="size-3.5" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="space-y-1">
            <Label htmlFor="q-text" className="text-xs">
              Título / pergunta
            </Label>
            <Input
              id="q-text"
              value={form.text}
              onChange={(e) => updateQuestionText(form.id, e.target.value)}
              className="h-8 rounded-md text-sm"
            />
          </div>

          {showPlaceholder && (
            <div className="space-y-1">
              <Label htmlFor="q-ph" className="text-xs">
                Placeholder
              </Label>
              <Input
                id="q-ph"
                value={form.placeholder ?? ""}
                onChange={(e) =>
                  updateQuestionPlaceholder(form.id, e.target.value)
                }
                placeholder="Texto do placeholder"
                className="h-8 rounded-md text-sm"
              />
            </div>
          )}

          <div className="space-y-1">
            <Label htmlFor="q-desc" className="text-xs">
              Descrição (opcional)
            </Label>
            <textarea
              id="q-desc"
              value={form.description ?? ""}
              onChange={(e) =>
                updateQuestionDescription(form.id, e.target.value)
              }
              placeholder="Texto de ajuda abaixo do título"
              rows={2}
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[52px] w-full rounded-md border px-2 py-1.5 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {showOptions && (
            <div className="space-y-1.5">
              <Label className="text-xs">Opções</Label>
              <div className="flex flex-col gap-1.5">
                {form.options?.map((option, index) => (
                  <BuildOption
                    key={option.id}
                    option={option}
                    formId={form.id}
                    position={index + 1}
                  />
                ))}
              </div>
              <Button
                type="button"
                variant="secondary"
                className="h-8 w-full rounded-md text-xs"
                onClick={() => createOption(form.id)}
              >
                + Opção
              </Button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
