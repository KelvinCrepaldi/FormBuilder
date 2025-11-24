import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useDB from "@/hooks/useDB";
import type { DatabaseProjectTypes } from "@/database/dexie";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function ProjectList() {
  const navigate = useNavigate();
  const { projects } = useDB();
  const [projectList, setProjectList] = useState<DatabaseProjectTypes[]>([]);
  useEffect(() => {
    const getList = async () => {
      const list = await projects();
      setProjectList(list);
    };
    getList();
  }, [projects]);


  return (
    <div className="w-full h-full flex flex-col gap-4">
      {/* Tabela de projetos */}
      <div className="flex-1 overflow-auto text-star">
        <Table className="text-start">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Forms</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projectList.length > 0 ? (
              projectList.slice(0, 5).map((project) => (
                <TableRow key={project.ref}>
                  <TableCell>{project.id}</TableCell>
                  <TableCell>{project.title}</TableCell>
                  <TableCell>{project.description}</TableCell>
                  <TableCell>{project.questions.length}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-muted-foreground"
                >
                  Nenhum projeto encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Button
          variant={"outline"}
          className="mt-2"
          onClick={() => navigate("/dashboard/projects")}
        >
          Ver mais...
        </Button>
      </div>
    </div>
  );
}
