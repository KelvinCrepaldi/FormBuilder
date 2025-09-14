import BuildHeader from "../components/buildHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuestionsTab from "../components/questionsTab";
import BuildCarousel from "../components/buildCarousel";
import BuildTools from "../components/buildTools";
import { FileQuestion, Layout, TableConfig } from "lucide-react";
import ConfigTab from "../components/configTab";
import LayoutTab from "../components/layoutTab";

export default function FormBuilderPage() {
  return (
    <main className="flex flex-1 h-full flex-col p-1 gap-2 ">
      <BuildHeader />

      <Tabs defaultValue="questions" className="h-full">
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

        <TabsContent value="config">
          <ConfigTab/>
        </TabsContent>
        <TabsContent value="questions">
          <QuestionsTab />
        </TabsContent>
        <TabsContent value="layout">
          <LayoutTab/>
        </TabsContent>
      </Tabs>
      <BuildTools />
      <BuildCarousel />
    </main>
  );
}
