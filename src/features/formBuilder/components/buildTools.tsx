import { Button } from "@/components/ui/button";
import useBuilder from "../hooks/useBuilder";
import { useNavigate } from "react-router";
import { Save, XCircle } from "lucide-react";

export default function BuildTools() {
  const { saveProject } = useBuilder();
  const navigate = useNavigate();

  const handleSave = () => {
    saveProject();
    navigate("/dashboard/projects");
  };

  return (
    <div className="flex shrink-0 items-center gap-1.5">
      <Button
        variant="signature"
        size="sm"
        className="h-8 gap-1 rounded-xl px-3 text-xs font-semibold"
        onClick={handleSave}
        type="button"
      >
        <Save className="size-3.5" />
        Guardar
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="h-8 rounded-xl px-3 text-xs"
        onClick={() => navigate("/dashboard/projects")}
        type="button"
      >
        <XCircle className="size-3.5" />
        Sair
      </Button>
    </div>
  );
}
