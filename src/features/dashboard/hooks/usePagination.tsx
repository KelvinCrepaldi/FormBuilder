import type { DatabaseProjectTypes } from "@/database/dexie";
import useDB from "@/hooks/useDB";
import { useEffect, useState } from "react";

export default function useProjects() {
  const { projects, deleteProjectByRef } = useDB();

  const [projectList, setProjectList] = useState<DatabaseProjectTypes[]>([]);
  const [filter, setFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  useEffect(() => {
    const getList = async () => {
      const list = await projects();
      setProjectList(list);
    };
    getList();
  }, [projects]);

  const handleDelete = (ref: string) => {
    deleteProjectByRef(ref);
  };

  const filtered = projectList.filter(
    (p) =>
      p.title.toLowerCase().includes(filter.toLowerCase()) ||
      p.description.toLowerCase().includes(filter.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / pageSize);

  const paginated = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return {
    filter,
    setFilter,
    setCurrentPage,
    currentPage,
    handleDelete,
    paginated,
    totalPages,
  };
}
