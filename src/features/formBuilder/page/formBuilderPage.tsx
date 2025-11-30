import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuestionsTab from "../components/questionsTab";
import BuildCarousel from "../components/buildCarousel";
import BuildTools from "../components/buildTools";
import { FileQuestion, Layout, TableConfig } from "lucide-react";
import ConfigTab from "../components/configTab";
import LayoutTab from "../components/layoutTab";
import { SiteHeader } from "@/components/siteHeader";
import useBuilder from "../hooks/useBuilder";
import { useEffect } from "react";

export default function FormBuilderPage() {

  const { resetBuilder } = useBuilder()
  
  useEffect(() => {
    resetBuilder()
  }, [])
  
  return (
    <main className="flex flex-1 h-full flex-col">
      <SiteHeader title="Criar novo" />

      <Tabs defaultValue="questions" className="h-full">
        <div className="flex justify-between px-3 pt-2">
          <TabsList className="gap-3 inset-shadow-sm">
            <TabsTrigger className="w-[150px]" value="config">
              <TableConfig />
              Projeto
            </TabsTrigger>
            <TabsTrigger className="w-[150px]" value="questions">
              <FileQuestion /> Formulários
            </TabsTrigger>
            <TabsTrigger className="w-[150px]" value="layout">
              <Layout /> Layout
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="config">
          <ConfigTab />
        </TabsContent>
        <TabsContent value="questions">
          <QuestionsTab />
        </TabsContent>
        <TabsContent value="layout">
          <LayoutTab />
        </TabsContent>
      </Tabs>
      <BuildTools />
      <BuildCarousel />
    </main>
  );
}
