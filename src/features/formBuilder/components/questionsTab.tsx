import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import BuildQuestion from "./buildQuestion";
import { ArrowDown } from "lucide-react";
import useQuestions from "../hooks/useQuestions";
import PreviewResizablePanel from "./previewResizablePanel";

export default function QuestionsTab() {
  const { active, questions } = useQuestions();

  return (
    <ResizablePanelGroup direction="horizontal" className="border-t">
      <ResizablePanel className="p-4">
        {questions.length === 0 ? (
          <div className="h-full text-primary/70 flex flex-col gap-5 items-center justify-center max-w-2/3 mx-auto font-bold text-center">
            <div>
              Nenhum formulário criado. <br /> Crie o primeiro formulário
              abaixo!
            </div>

            <ArrowDown className="animate-bounce" />
          </div>
        ) : (
          questions
            .filter((form) => form.id === active)
            .map((form) => <BuildQuestion form={form} />)
        )}
      </ResizablePanel>

      <ResizableHandle withHandle />

      <PreviewResizablePanel />
    </ResizablePanelGroup>
  );
}
