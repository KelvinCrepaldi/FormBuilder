import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuestionsTab from "../components/questionsTab";
import BuildCarousel from "../components/buildCarousel";
import BuildTools from "../components/buildTools";
import { FileQuestion, Layout, TableConfig } from "lucide-react";
import ConfigTab from "../components/configTab";
import LayoutTab from "../components/layoutTab";
import { SiteHeader } from "@/components/siteHeader";
import { Button } from "@/components/ui/button";
import useBuilder from "../hooks/useBuilder";

export default function FormBuilderPage() {
  const { saveProject } = useBuilder();

  return (
    <main className="flex flex-1 h-full flex-col gap-2 ">
      <SiteHeader title="Criar novo" />

      <Tabs defaultValue="questions" className="h-full">
        <div className="flex justify-between px-8">
          <TabsList className="gap-3 mb-2 inset-shadow-sm">
            <TabsTrigger className="w-[150px]" value="config">
              <TableConfig />
              Configuration
            </TabsTrigger>
            <TabsTrigger className="w-[150px]" value="questions">
              <FileQuestion /> Questions Form
            </TabsTrigger>
            <TabsTrigger className="w-[150px]" value="layout">
              <Layout /> Layout
            </TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Button className="bg-green-800 rounded" onClick={saveProject}>
              Save Project
            </Button>
          </div>
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
