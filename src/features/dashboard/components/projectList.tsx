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
import { Card } from "@/components/ui/card";

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

  if (projectList.length === 0) {
    return (
      <Card className="editorial-shadow flex min-h-[400px] flex-col items-center justify-center rounded-[2rem] border border-outline-variant/10 bg-surface-container-lowest p-10 text-center">
        <div className="signature-gradient mb-8 flex h-24 w-24 rotate-3 items-center justify-center rounded-3xl">
          <span className="material-symbols-outlined text-5xl text-white">
            note_add
          </span>
        </div>
        <h4 className="mb-3 font-headline text-2xl font-bold text-on-surface">
          Ainda não há formulários
        </h4>
        <p className="mb-8 max-w-md font-body leading-relaxed text-on-surface-variant">
          Cria o teu primeiro projeto no builder ou explora a demonstração.
        </p>
        <Button
          variant="secondary"
          className="font-headline gap-3 rounded-xl bg-secondary-container px-8 py-6 font-bold text-on-secondary-container hover:bg-primary/5"
          onClick={() => navigate("/builder?tab=questions")}
        >
          Criar projeto
          <span className="material-symbols-outlined">arrow_forward</span>
        </Button>
      </Card>
    );
  }

  return (
    <Card className="editorial-shadow overflow-hidden rounded-[2rem] border border-outline-variant/10 bg-surface-container-lowest">
      <div className="overflow-x-auto p-2 md:p-6">
        <Table>
          <TableHeader>
            <TableRow className="border-outline-variant/10 hover:bg-transparent">
              <TableHead className="font-label text-xs font-semibold tracking-wider text-on-surface-variant uppercase">
                Ref
              </TableHead>
              <TableHead className="font-label text-xs font-semibold tracking-wider text-on-surface-variant uppercase">
                Título
              </TableHead>
              <TableHead className="font-label text-xs font-semibold tracking-wider text-on-surface-variant uppercase">
                Descrição
              </TableHead>
              <TableHead className="font-label text-xs font-semibold tracking-wider text-on-surface-variant uppercase">
                Perguntas
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projectList.slice(0, 5).map((project) => (
              <TableRow
                key={project.ref}
                className="border-border/40 hover:bg-surface-container-low/80"
              >
                <TableCell className="font-mono text-sm">{project.ref}</TableCell>
                <TableCell className="font-medium">{project.title}</TableCell>
                <TableCell className="max-w-[200px] truncate text-muted-foreground">
                  {project.description}
                </TableCell>
                <TableCell>{project.questions.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="border-t border-outline-variant/10 bg-surface-container-low/50 px-6 py-4">
        <Button
          variant="outline"
          className="rounded-xl border-outline-variant/30"
          onClick={() => navigate("/dashboard/projects")}
        >
          Ver todos os projetos
        </Button>
      </div>
    </Card>
  );
}
