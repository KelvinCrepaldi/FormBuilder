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
import { Link, Trash } from "lucide-react";
import { Card } from "@/components/ui/card";
import CopyButton from "../components/copyButton";

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
    <div className="flex min-h-full flex-col gap-6">
      <SiteHeader title="Todos os projetos" subtitle="Biblioteca" />

      <div className="mx-auto w-full max-w-7xl flex-1 space-y-6 px-4 pb-10 sm:px-6 lg:px-8">
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

        {totalPages > 1 && (
          <div className="flex items-center justify-between rounded-2xl border border-outline-variant/10 bg-surface-container-low px-4 py-3">
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Anterior
            </Button>
            <span className="text-sm text-on-surface-variant">
              Página {currentPage} de {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl"
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
    </div>
  );
}

const ListStyle = ({
  list,
  handleDelete,
}: {
  list: DatabaseProjectTypes[];
  handleDelete: (ref: string) => void | Promise<void>;
}) => {
  return (
    <Card className="editorial-shadow overflow-hidden rounded-[1.5rem] border border-outline-variant/10 bg-surface-container-lowest">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-label text-xs font-semibold uppercase">
                Ref
              </TableHead>
              <TableHead className="font-label text-xs font-semibold uppercase">
                Título
              </TableHead>
              <TableHead className="font-label text-xs font-semibold uppercase">
                Descrição
              </TableHead>
              <TableHead className="font-label text-xs font-semibold uppercase">
                Perguntas
              </TableHead>
              <TableHead className="text-right font-label text-xs font-semibold uppercase">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.length > 0 ? (
              list.map((project) => (
                <TableRow key={project.ref}>
                  <TableCell className="font-mono text-xs">{project.ref}</TableCell>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell className="max-w-xs truncate text-muted-foreground">
                    {project.description}
                  </TableCell>
                  <TableCell>{project.questions.length}</TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <Button size="sm" variant="outline" className="rounded-lg" asChild>
                      <LinkElement
                        to={`/f/${project.ref}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Link />
                      </LinkElement>
                    </Button>
                    <CopyButton text={JSON.stringify(project, null, 2)} />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="rounded-lg"
                      onClick={() => void handleDelete(project.ref)}
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
                  className="py-12 text-center text-on-surface-variant"
                >
                  Nenhum projeto encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

const CardStyle = ({
  list,
  handleDelete,
}: {
  list: DatabaseProjectTypes[];
  handleDelete: (ref: string) => void | Promise<void>;
}) => {
  return (
    <div className="flex flex-wrap justify-start gap-6">
      {list.map((project) => (
        <Card
          key={project.ref}
          className="editorial-shadow flex min-h-[200px] w-full max-w-sm flex-1 flex-col gap-4 rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-6"
        >
          <h2 className="font-headline text-xl font-bold">{project.title}</h2>
          <p className="flex-1 text-sm text-on-surface-variant">
            {project.description}
          </p>
          <div className="flex flex-wrap justify-end gap-2">
            <Button size="sm" variant="outline" className="rounded-lg" asChild>
              <LinkElement
                to={`/f/${project.ref}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Link />
              </LinkElement>
            </Button>
            <CopyButton text={JSON.stringify(project, null, 2)} />
            <Button
              size="sm"
              variant="destructive"
              className="rounded-lg"
              onClick={() => void handleDelete(project.ref)}
            >
              <Trash />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};
