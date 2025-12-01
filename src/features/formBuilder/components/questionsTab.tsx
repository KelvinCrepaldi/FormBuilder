import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import BuildQuestion from "./buildQuestion";
import { ArrowDown, CheckSquare, Dot, List, Type } from "lucide-react";
import useQuestions from "../hooks/useQuestions";
import PreviewResizablePanel from "./previewResizablePanel";
import { Button } from "@/components/ui/button";

const questionOptions = [
  { type: "checkbox", icon: CheckSquare },
  { type: "radio", icon: Dot },
  { type: "text", icon: Type },
  { type: "select", icon: List },
] as const;

export default function QuestionsTab() {
  const { active, questions } = useQuestions();
  const { createQuestion } = useQuestions();

  return (
    <ResizablePanelGroup direction="horizontal" className="border-t">
      <ResizablePanel className="p-4">
        {questions.length === 0 ? (
          <div className="h-full text-primary/70 flex flex-col gap-5 items-center justify-center max-w-2/3 mx-auto font-bold text-center">
            <div>
              Nenhuma formulário criado. <br /> Crie o primeiro formulário
              abaixo!
            </div>

            <ArrowDown className="animate-bounce" />

            <div className="flex flex-col gap-3">
              {questionOptions.map(({ type, icon: Icon }) => (
                <div className="flex items-center gap-5">
                  <Button
                    key={type}
                    variant="outline"
                    onClick={() => createQuestion(type)}
                    className="w-[40px] h-[40px] p-0 flex items-center justify-center"
                    title={type}
                  >
                    <Icon size={20} />
                  </Button>
                  {type}
                </div>
              ))}
            </div>
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
