import { Button } from "@/components/ui/button";
import useQuestions from "../hooks/useQuestions";

export default function BuildTools() {
  const { createQuestion } = useQuestions();
  return (
    <div className="w-full  flex flex-col gap-1 py-2 px-8 border-t">
      <div className="font-bold">Adicionar novo:</div>
      <div className="  flex gap-4">
        <Button
          onClick={() => createQuestion("checkbox")}
          className="w-[130px]"
        >
          + Checkbox
        </Button>
        <Button onClick={() => createQuestion("radio")} className="w-[130px]">
          + radio
        </Button>
      </div>
    </div>
  );
}
