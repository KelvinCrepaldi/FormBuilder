import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GripVertical, Trash2 } from "lucide-react";
import useQuestions from "../hooks/useQuestions";
import useHorizontalDrag from "../hooks/useHorizontalDrag";
export default function BuildCarousel() {
  const { questions, deleteQuestion, setActive, active } = useQuestions();
   const dragRef = useHorizontalDrag();

  return (
    <div className="w-full flex flex-col flex-1" style={{ maxWidth: 'calc(100vw - var(--sidebar-width) - 1px) ' }} >
      <div ref={dragRef} className="px-4 py-2 flex gap-2 overflow-x-auto">
        {questions.map((item, index) => (
          <Card
            className={`relative bg-gray-50 cursor-pointer flex flex-row gap-2 p-2 items-center w-[250px] h-[100px] ${
              item.id === active && "bg-white shadow"
            }`}
            key={item.id}
            onClick={() => setActive(item.id)}
          >
            <Button variant={"ghost"} className="cursor-grab">
              <GripVertical />
            </Button>
            <div className="absolute top-2 right-4 opacity-30">{index + 1}</div>
            <div className="w-full">
              {item.text.slice(0, 13) || "Sem título"}
            </div>
            <div className="flex justify-end items-end h-full">
              <Button
                variant="outline"
                size="sm"
                onClick={() => deleteQuestion(item.id)}
              >
                <Trash2 />
              </Button>
            </div>
          </Card>
        ))}
      </div>
      <div className="w-full h-3 border-t"></div>
    </div>
  );
}
