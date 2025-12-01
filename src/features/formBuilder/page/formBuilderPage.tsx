import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuestionsTab from "../components/questionsTab";
import BuildCarousel from "../components/buildCarousel";
import BuildTools from "../components/buildTools";
import { FileQuestion, Save, TableConfig } from "lucide-react";
import ConfigTab from "../components/configTab";
import { SiteHeader } from "@/components/siteHeader";
import useBuilder from "../hooks/useBuilder";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function FormBuilderPage() {
  const navigate = useNavigate();
  const { resetBuilder, saveProject } = useBuilder();

  useEffect(() => {
    resetBuilder();
  }, []);

  const handleSave = () => {
    saveProject();
    navigate("/dashboard/projects");
  };

  return (
    <main className="flex flex-1 h-full flex-col">
      <SiteHeader title="Criar novo" />

      <Tabs defaultValue="questions" className="h-full">
        <div className="flex justify-between px-3 pt-2">
          <TabsList className="gap-3 inset-shadow-sm">
            <TabsTrigger className="w-[150px]" value="questions">
              <FileQuestion /> Perguntas
            </TabsTrigger>
            <TabsTrigger className="w-[150px]" value="config">
              <TableConfig />
              Configurações
            </TabsTrigger>
          </TabsList>
          <div className="flex gap-2 items-center">
            <Button
              className="bg-green-400 text-white hover:bg-green-300 hover:text-white"
              variant="outline"
              onClick={handleSave}
              size="sm"
              title="Salvar"
            >
              <Save size={18} /> Salvar
            </Button>
          </div>
        </div>

        <TabsContent value="config">
          <ConfigTab />
        </TabsContent>
        <TabsContent value="questions">
          <QuestionsTab />
        </TabsContent>
      </Tabs>
      <BuildTools />
      <BuildCarousel />
    </main>
  );
}
