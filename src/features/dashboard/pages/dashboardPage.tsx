import { ChartPieDonutText } from "@/components/chatPieSample";
import { ChartBarInteractive } from "@/components/chatSample";
import { SiteHeader } from "@/components/siteHeader";
import { Button } from "@/components/ui/button";
import useDB from "@/hooks/useDB";
import { Trash } from "lucide-react";
import ProjectList from "../components/projectList";

export default function DashboardPage() {
  const { clearProjects } = useDB();

  return (
    <section className="flex flex-col gap-1 relative">
      <SiteHeader title="Dashboard" />

      <div className="flex flex-col md:flex-row px-8">
        <div className="flex flex-col gap-2 items-center justify-center flex-1">
          <div className="flex flex-col  flex-1 w-full h-full">
            <div className=" text-center flex-1">
              <ProjectList />
            </div>
          </div>
        </div>
        <ChartPieDonutText />
      </div>

      <ChartBarInteractive />

      <div className="fixed bottom-0 right-0 p-10 flex gap-4 items-center z-10">
        <div className="flex flex-col items-end">
          <div> Ferramentas da demonstração</div>
          <div>
            <Button onClick={() => clearProjects()}>
              Limpar Dados
              <Trash />
            </Button>
            <Button onClick={() => clearProjects()}>
              Gerar dados
              <Trash />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
