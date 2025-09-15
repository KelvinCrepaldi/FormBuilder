import { ChartPieDonutText } from "@/components/chatPieSample";
import { ChartBarInteractive } from "@/components/chatSample";
import { SiteHeader } from "@/components/siteHeader";
import { Button } from "@/components/ui/button";
import type { DatabaseProjectTypes } from "@/database/dexie";
import useDB from "@/hooks/useDB";
import { Trash } from "lucide-react";

import { useEffect, useState } from "react";
import ProjectList from "../components/projectList";

export default function DashboardPage() {
  const { projects, clearProjects } = useDB();
  const [, setProjectList] = useState<null | DatabaseProjectTypes[]>(
    null
  );
  useEffect(() => {
    const getList = async () => {
      const list = await projects();
      setProjectList(list);
    };
    getList();
  }, [projects]);

  return (
    <section className="flex flex-col gap-1">
      <SiteHeader title="Dashboard" />

      <div className="flex flex-col md:flex-row px-8">
        <div className="flex flex-col gap-2 items-center justify-center flex-1">
          <div className="flex flex-col  flex-1 w-full h-full">
            <div className=" text-center flex-1">
              <ProjectList/>
            </div>
            <div className="w-full border-t py-2 pr-2">
              <div className=" flex gap-5 items-center justify-end">
                <div className="">Limpar banco de dados:</div>
                <Button onClick={() => clearProjects()}>
                  <Trash />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <ChartPieDonutText />
      </div>

      <ChartBarInteractive />
    </section>
  );
}
