import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { DatabaseProjectTypes } from "@/database/dexie";
import useDB from "@/hooks/useDB";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { projects } = useDB();
  const [projectList, setProjectList] = useState<null | DatabaseProjectTypes[]>(
    null
  );
  useEffect(() => {
    const getList = async () => {
      const list = await projects();
      setProjectList(list);
    };
    getList();
  }, []);

  return (
    <section className="flex flex-col gap-5">
      <div className="w-full p-4 flex">
        <h1 className="typhography-h1">Bem-vindo</h1>
      </div>

      <div className="w-ful border-b mx-4"></div>
      
      <div className="flex gap-5 p-4 justify-center">
        
        <Card className="w-1/2 p-4">
          <div className="typhography-h2 text-center">projetos</div>
          <div className="text-center text-3xl font-bold">{projectList?.length}</div>
          <div className="flex justify-end gap-2">
            <Button variant={"outline"} className="w-1/2">Ver lista completa</Button>
            <Button variant={"outline"} className="w-1/2">Criar novo</Button>
          </div>
        </Card>

        <Card className="w-1/2 p-4">
          <div className="typhography-h2 text-center">Total de respostas</div>
          <div className="text-center text-3xl font-bold">34.444</div>
        </Card>

       
      </div>

    </section>
  );
}
