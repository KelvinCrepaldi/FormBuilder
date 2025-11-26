import { Button } from "@/components/ui/button";
import useQuestions from "../hooks/useQuestions";
import useBuilder from "../hooks/useBuilder";
import { useNavigate } from "react-router";

export default function BuildTools() {
  const { saveProject } = useBuilder();
  const { createQuestion } = useQuestions();
  const navigate = useNavigate();

  const handleSave = () => {
    saveProject();
    navigate("/dashboard/projects");
  };
  return (
    <div className="w-full flex gap-1 py-2 px-4 border-y items-center justify-between">
      <div className="flex gap-2 items-center">
        <div className="font-bold">Adicionar: </div>
        <Button
          variant="outline"
          onClick={() => createQuestion("checkbox")}
          className="w-[130px]"
        >
          Checkbox
        </Button>
        <Button
          variant="outline"
          onClick={() => createQuestion("radio")}
          className="w-[130px]"
        >
          Radio
        </Button>
      </div>

      <div className="flex gap-2 items-center">
        <Button
          className=" bg-green-400 text-white hover:bg-green-300 hover:text-white"
          variant="outline"
          onClick={handleSave}
          size="sm"
        >
          Salvar
        </Button>
        <Button className="" variant="ghost" onClick={handleSave} size="sm">
          Cancelar
        </Button>
      </div>
    </div>
  );
}
