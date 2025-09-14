import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { DatabaseProjectTypes } from "@/database/dexie";
import useDB from "@/hooks/useDB";
import { Edit, Link2 } from "lucide-react";

import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function DashboardProjectsPage() {
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
    <section>
      <div className="w-full p-4 flex border-b">
        <h1 className="typhography-h1 text-primary/70">Projetos</h1>
      </div>
      <div className="flex flex-col p-4 gap-2">
        {projectList?.map((project) => (
          <Card className="w-full p-4 px-4 bg-white">
            <div>
              <div className="flex justify-between"><div className="typhography-h2">{project.title}</div><div className="font-bold text-green-400">Ativo</div></div>
              <div>{project.description}</div>
            </div>
            <div className="flex justify-end gap-1">
              <Button asChild>
                <Link
                  to={`/f/${project.ref}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2"
                >
                  Link <Link2 />
                </Link>
              </Button>

              <Button>Edit<Edit /></Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
