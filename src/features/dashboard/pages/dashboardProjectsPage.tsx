"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/siteHeader";
import { Link as LinkElement } from "react-router";
import useProjects from "../hooks/usePagination";
import ListTools from "../components/listTools";
import { useState } from "react";
import type { DatabaseProjectTypes } from "@/database/dexie";
import { Calendar, Edit, Link, Trash } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function DashboardProjectPage() {
  const {
    filter,
    handleDelete,
    paginated,
    setCurrentPage,
    setFilter,
    totalPages,
    currentPage,
  } = useProjects();

  const [listStyle, setListStyle] = useState<string>("list");

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <SiteHeader title="Projetos" />
      {/* Input de filtro */}
      <ListTools
        listStyle={listStyle}
        setListStyle={setListStyle}
        filter={filter}
        onChange={setFilter}
      />
      <div className="flex-1">
        {listStyle === "list" && (
          <ListStyle handleDelete={handleDelete} list={paginated} />
        )}

        {listStyle === "card" && (
          <CardStyle handleDelete={handleDelete} list={paginated} />
        )}
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

const ListStyle = ({
  list,
  handleDelete,
}: {
  list: DatabaseProjectTypes[];
  handleDelete: (ref: string) => void;
}) => {
  return (
    <div className="flex-1 overflow-auto px-8 ">
      <Table className="overflow-y-auto ">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Título</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Passos</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.length > 0 ? (
            list.map((project) => (
              <TableRow key={project.ref}>
                <TableCell>{project.id}</TableCell>
                <TableCell>{project.title}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>{project.questions.length}</TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <Button size="sm" variant="outline" asChild>
                    <LinkElement
                      to={`/f/${project.ref}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Link />
                    </LinkElement>
                  </Button>
                  <Button size="sm" variant="outline">
                    <Calendar />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(project.ref)}
                  >
                    <Trash />
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
  );
};

const CardStyle = ({
  list,
  handleDelete,
}: {
  list: DatabaseProjectTypes[];
  handleDelete: (ref: string) => void;
}) => {
  return (
    <div className="px-10 flex justify-start gap-6 flex-wrap ">
      {list.map((project) => (
        <Card
          key={project.ref}
          className="min-w-sm p-5 w-full flex-1 max-h-[180px]"
        >
          <h1 className="text-xl font-bold">{project.title}</h1>
          <div>{project.description}</div>
          <div className="flex gap-2 justify-end">
            <Button size="sm" variant="outline" asChild>
              <LinkElement
                to={`/f/${project.ref}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Link />
              </LinkElement>
            </Button>
            <Button size="sm" variant="outline">
              <Calendar />
            </Button>
            <Button size="sm" variant="outline">
              <Edit />
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleDelete(project.ref)}
            >
              <Trash />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};
