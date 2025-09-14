import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import useBuilder from "../context/useBuilder";
import BuildQuestion from "./buildQuestion";
import CheckboxTemplate from "@/components/formTemplates/checkboxTemplate";

export default function QuestionsTab() {
  const { forms, active } = useBuilder();

  return (
    <ResizablePanelGroup direction="horizontal" className="border-t">
      <ResizablePanel className="p-4  w-1/3">
        {forms
          .filter((form) => form.id === active)
          .map((form) => (
            <BuildQuestion form={form} />
          ))}
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="inset-shadow-sm p-5 flex items-center justify-center bg-sidebar">
        {forms
          .filter((form) => form.id === active)
          .map((form) => (
            <CheckboxTemplate formData={form} />
          ))}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
