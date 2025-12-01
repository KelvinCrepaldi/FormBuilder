import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import PreviewResizablePanel from "./previewResizablePanel";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Switch } from "@/components/ui/switch";
import useConfiguration from "../hooks/useConfiguration";

type FontSizeOption = "16" | "20" | "26";

const FONT_SIZE_LABELS: Record<FontSizeOption, string> = {
  "16": "Pequeno",
  "20": "Médio",
  "26": "Grande",
};

export default function ConfigTab() {
  const {
    configuration,
    handleTitleChange,
    handleDescriptionChange,
    setFont,
    setFontSize,
    setPrimaryColor,
    setBackgroundColor,
    setProgressBarVisible,
    setLayoutMode,
  } = useConfiguration();

  const layout = configuration.layout;

  return (
    <ResizablePanelGroup direction="horizontal" className="border-t">
      <ResizablePanel>
        <div className="p-4 flex flex-col gap-6">
          {/* TÍTULO */}
          <div>
            <Label className="block text-sm font-medium mb-1">Título</Label>
            <Input
              type="text"
              value={configuration.title}
              onChange={(e) => handleTitleChange(e.target.value)}
            />
          </div>

          {/* DESCRIÇÃO */}
          <div>
            <Label className="block text-sm font-medium mb-1">Descrição</Label>
            <Input
              value={configuration.description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
            />
          </div>

          {/* FONTE */}
          <div>
            <Label className="block text-sm font-medium mb-1">Fonte</Label>
            <Select value={layout.font} onValueChange={(v) => setFont(v)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Inter">Inter</SelectItem>
                <SelectItem value="Roboto">Roboto</SelectItem>
                <SelectItem value="Arial">Arial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* TAMANHO DA FONTE */}
          <div>
            <Label className="block text-sm font-medium mb-1">
              Tamanho da fonte
            </Label>
            <Select
              value={layout.fontSize.toString() as FontSizeOption}
              onValueChange={(v) => setFontSize(Number(v))}
            >
              <SelectTrigger className="w-full">
                <SelectValue>
                  {
                    FONT_SIZE_LABELS[
                      layout.fontSize.toString() as FontSizeOption
                    ]
                  }
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="16">Pequeno</SelectItem>
                <SelectItem value="20">Médio</SelectItem>
                <SelectItem value="26">Grande</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* CORES */}
          <div className="flex gap-10">
            <div>
              <Label className="block text-sm font-medium mb-1">
                Cor primária
              </Label>
              <Input
                type="color"
                className="h-10 w-20 p-1 cursor-pointer"
                value={layout.primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
              />
            </div>

            <div>
              <Label className="block text-sm font-medium mb-1">
                Cor de fundo
              </Label>
              <Input
                type="color"
                className="h-10 w-20 p-1 cursor-pointer"
                value={layout.backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
              />
            </div>
          </div>

          {/* BARRA DE PROGRESSO */}
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">
              Exibir barra de progresso
            </Label>
            <Switch
              checked={layout.showProgressBar}
              onCheckedChange={(v) => setProgressBarVisible(v)}
            />
          </div>

          {/* MODO DE LAYOUT */}
          <div>
            <Label className="block text-sm font-medium mb-1">
              Modo de layout
            </Label>
            <Select
              value={layout.layoutMode}
              onValueChange={(v) =>
                setLayoutMode(v as "single_page" | "step_by_step")
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single_page">Uma página</SelectItem>
                <SelectItem value="step_by_step">Passo a passo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* PREVIEW */}
      <PreviewResizablePanel />
    </ResizablePanelGroup>
  );
}
