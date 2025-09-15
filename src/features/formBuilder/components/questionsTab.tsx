import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import useBuilder from "../context/useBuilder";
import BuildQuestion from "./buildQuestion";
import CheckboxTemplate from "@/components/formTemplates/checkboxTemplate";
import { ArrowDown } from "lucide-react";

export default function QuestionsTab() {
  const { forms, active } = useBuilder();

  return (
    <ResizablePanelGroup direction="horizontal" className="border-t">
      <ResizablePanel className="p-8">
        {forms.length === 0 ? (
          <div className="h-full text-primary/70 flex flex-col gap-5 items-center justify-center max-w-2/3 mx-auto font-bold text-center">
            <div>Nenhum formulário criado. <br/> Crie o primeiro formulário
            abaixo!</div>
            
            <ArrowDown className="animate-bounce"/>
          </div>
        ) : (
          forms
            .filter((form) => form.id === active)
            .map((form) => <BuildQuestion form={form} />)
        )}
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="inset-shadow-sm p-5 flex items-center justify-center bg-sidebar relative">
        <div className="absolute top-0 left-0 p-4 text-primary/40">Pré-visualização:</div>
        {forms
          .filter((form) => form.id === active)
          .map((form) => (
            <CheckboxTemplate formData={form} />
          ))}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
