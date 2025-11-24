import CheckboxTemplate from "@/components/formTemplates/checkboxTemplate";
import { ResizablePanel } from "@/components/ui/resizable";
import useQuestions from "../hooks/useQuestions";

export default function PreviewResizablePanel() {
  const { active, questions } = useQuestions();
  return (
    <ResizablePanel className="inset-shadow-sm p-5 flex items-center justify-center bg-sidebar relative">
      <div className="absolute top-0 left-0 p-4 text-primary/40">
        Pré-visualização:
      </div>
      {questions
        .filter((form) => form.id === active)
        .map((form) => (
          <CheckboxTemplate formData={form} />
        ))}
    </ResizablePanel>
  );
}
