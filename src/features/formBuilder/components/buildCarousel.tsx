import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GripVertical, Trash2 } from "lucide-react";
import useQuestions from "../hooks/useQuestions";

export default function BuildCarousel() {
  const { questions, deleteQuestion, setActive } = useQuestions();

  return (
    <div className="px-8 py-2 w-full flex gap-2 ">
      {questions.map((item) => (
        <Card
          className="cursor-pointer flex flex-row gap-2 p-2 items-center w-[200px] h-[100px] shadow border border-black/30 hover:border-black/50"
          key={item.id}
          onClick={() => setActive(item.id)}
        >
          <Button variant={"ghost"} className="cursor-grab">
            <GripVertical />
          </Button>
          <div>{item.position || "Sem título"}</div>
          <div className="flex justify-end">
            <Button
              variant="destructive"
              onClick={() => deleteQuestion(item.id)}
            >
              <Trash2 />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
