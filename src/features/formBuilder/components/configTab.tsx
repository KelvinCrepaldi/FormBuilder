import { Input } from "@/components/ui/input";
import useConfiguration from "../hooks/useConfiguration";
import { Label } from "@/components/ui/label";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import PreviewResizablePanel from "./previewResizablePanel";

export default function ConfigTab() {
  const { configuration, handleTitleChange, handleDescriptionChange } =
    useConfiguration();

  return (
    <ResizablePanelGroup direction="horizontal" className="border-t">
      <ResizablePanel className="p-8">
        <div className="p-4 flex flex-col gap-4 max-w-md">
          <div>
            <Label className="block text-sm font-medium mb-1">Título</Label>
            <Input
              type="text"
              className="w-full border rounded px-2 py-1"
              value={configuration.title}
              onChange={(e) => handleTitleChange(e.target.value)}
            />
          </div>

          <div>
            <Label className="block text-sm font-medium mb-1">Descrição</Label>
            <Input
              className="w-full border rounded px-2 py-1"
              value={configuration.description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
            />
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />

      <PreviewResizablePanel />
    </ResizablePanelGroup>
  );
}
