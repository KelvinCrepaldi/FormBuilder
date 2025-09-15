"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
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
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function ProjectList() {
    const navigate = useNavigate();
  const { projects } = useDB();
  const [projectList, setProjectList] = useState<DatabaseProjectTypes[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const getList = async () => {
      const list = await projects();
      setProjectList(list);
    };
    getList();
  }, [projects]);

  // 🔎 aplica o filtro no título ou descrição
  const filtered = projectList.filter(
    (p) =>
      p.title.toLowerCase().includes(filter.toLowerCase()) ||
      p.description.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="w-full h-full flex flex-col gap-4">
      {/* Input de filtro */}
      <div className="w-full flex items-center gap-2 justify-end px-2 relative">
        <Search className="absolute right-4 text-primary/60" size={15} />
        <Input
          placeholder="Buscar..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-[300px]"
        />
      </div>

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
            {filtered.length > 0 ? (
              filtered.slice(0, 5).map((project) => (
                <TableRow key={project.ref}>
                  <TableCell>{project.id}</TableCell>
                  <TableCell>{project.title}</TableCell>
                  <TableCell>{project.description}</TableCell>
                  <TableCell>{project.forms.length}</TableCell>
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
              <Button variant={"outline"} className="mt-2" onClick={()=> navigate("/dashboard/projects")}>Ver mais...</Button>
      </div>
    </div>
  );
}
