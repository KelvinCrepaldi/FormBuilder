import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GripVertical, Trash2 } from "lucide-react";
import useQuestions from "../hooks/useQuestions";
import { Reorder } from "framer-motion";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

export default function BuildCarousel({
  orientation = "horizontal",
}: {
  orientation?: "horizontal" | "vertical";
}) {
  const { questions, deleteQuestion, setActive, active, setQuestionOrder } =
    useQuestions();

  const sorted = useMemo(
    () => [...questions].sort((a, b) => a.position - b.position),
    [questions]
  );

  const vertical = orientation === "vertical";

  return (
    <div className="flex h-full flex-col" role="toolbar" aria-label="Ordenar campos">
      <div
        className={cn(
          "flex min-h-0 flex-1 px-2 py-2",
          vertical ? "overflow-y-auto overflow-x-hidden" : "overflow-x-auto"
        )}
      >
        <Reorder.Group
          axis={vertical ? "y" : "x"}
          values={sorted}
          onReorder={(newOrder) => {
            setQuestionOrder(newOrder.map((q) => q.id));
          }}
          className={cn(
            "gap-1.5",
            vertical ? "flex w-full flex-col" : "flex w-max min-w-full"
          )}
        >
          {sorted.map((item) => (
            <Reorder.Item
              key={item.id}
              value={item}
              className="relative shrink-0 list-none"
            >
              <Card
                className={cn(
                  "relative flex cursor-grab flex-row items-center gap-1 overflow-hidden rounded-xl p-1.5 active:cursor-grabbing",
                  vertical ? "h-14 w-full" : "h-12 w-[10rem]",
                  item.id === active
                    ? "border-primary bg-surface-container-lowest editorial-shadow"
                    : "border-outline-variant/20 bg-surface-container-low hover:bg-surface-container-high"
                )}
                onClick={() => setActive(item.id)}
              >
                <span className="shrink-0 text-on-surface-variant" aria-hidden>
                  <GripVertical className="size-3.5" />
                </span>
                <div className="absolute top-1 right-2 text-[10px] opacity-40">
                  {item.position + 1}
                </div>
                <div className="line-clamp-2 w-full flex-1 pr-8 text-[11px] font-medium leading-tight">
                  {item.text.slice(0, 72) || "Sem título"}
                </div>
                <div className="absolute right-1 bottom-1 z-10">
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    className="h-6 w-6 cursor-pointer p-0"
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteQuestion(item.id);
                    }}
                  >
                    <Trash2 className="size-3" />
                  </Button>
                </div>
              </Card>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    </div>
  );
}
