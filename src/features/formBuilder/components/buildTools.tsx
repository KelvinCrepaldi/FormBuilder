import { Button } from "@/components/ui/button";
import useQuestions from "../hooks/useQuestions";
import useBuilder from "../hooks/useBuilder";
import { useNavigate } from "react-router";
import {
  CheckSquare,
  Dot,
  Type,
  List,
  Save,
  XCircle,
} from "lucide-react";

const questionOptions = [
  { type: "checkbox", icon: CheckSquare },
  { type: "radio", icon: Dot },
  { type: "text", icon: Type },
  { type: "select", icon: List },
] as const;

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

        {questionOptions.map(({ type, icon: Icon }) => (
          <Button
            key={type}
            variant="outline"
            onClick={() => createQuestion(type)}
            className="w-[40px] h-[40px] p-0 flex items-center justify-center"
            title={type}
          >
            <Icon size={20} />
          </Button>
        ))}
      </div>

      <div className="flex gap-2 items-center">
        <Button
          className="bg-green-400 text-white hover:bg-green-300 hover:text-white"
          variant="outline"
          onClick={handleSave}
          size="sm"
          title="Salvar"
        >
          <Save size={18} />
        </Button>

        <Button variant="ghost" onClick={handleSave} size="sm" title="Cancelar">
          <XCircle size={18} />
        </Button>
      </div>
    </div>
  );
}
