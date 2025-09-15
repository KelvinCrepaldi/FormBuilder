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
import { Button } from "@/components/ui/button";
import useDB from "@/hooks/useDB";
import type { DatabaseProjectTypes } from "@/database/dexie";
import { SiteHeader } from "@/components/siteHeader";
import { Search } from "lucide-react";
import { Link as LinkElement } from "react-router";

export default function DashboardProjectPage() {
  const { projects, deleteProjectByRef } = useDB();
  const [projectList, setProjectList] = useState<DatabaseProjectTypes[]>([]);
  const [filter, setFilter] = useState("");

  // 🔹 paginação
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // número de itens por página

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

  // 🔹 total de páginas
  const totalPages = Math.ceil(filtered.length / pageSize);

  // 🔹 fatia dos dados pra página atual
  const paginated = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <SiteHeader title="Projetos" />
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
      <div className="flex-1 overflow-auto px-8 ">
        <Table className="overflow-y-auto ">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Forms</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length > 0 ? (
              paginated.map((project) => (
                <TableRow key={project.ref}>
                  <TableCell>{project.id}</TableCell>
                  <TableCell>{project.title}</TableCell>
                  <TableCell>{project.description}</TableCell>
                  <TableCell>{project.forms.length}</TableCell>
                  <TableCell className="flex gap-2 justify-end">
                    <Button size="sm" variant="outline" asChild>
                      <LinkElement to={`/f/${project.ref}`} target="_blank" rel="noopener noreferrer">Abrir</LinkElement>
                    </Button>
                    <Button size="sm" variant="secondary">
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteProjectByRef(project.ref)}
                    >
                      Deletar
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-muted-foreground"
                >
                  Nenhum projeto encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Controles de paginação */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 p-8">
          <Button
            variant="default"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Anterior
          </Button>
          <span className="text-sm text-muted-foreground">
            Página {currentPage} de {totalPages}
          </span>
          <Button
            variant="default"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            Próxima
          </Button>
        </div>
      )}
    </div>
  );
}
