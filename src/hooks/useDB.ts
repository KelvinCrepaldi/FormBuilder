import { projectService } from "@/services/projects/projectService";
import { useCallback } from "react";

export default function useDB() {
  const projects = useCallback(async () => {
    return projectService.list();
  }, []);

  const getProjectById = useCallback(async (ref: string) => {
    return projectService.getByRef(ref);
  }, []);

  const deleteProjectByRef = useCallback(async (ref: string) => {
    await projectService.deleteByRef(ref);
  }, []);

  const clearProjects = useCallback(async () => {
    await projectService.clearAll();
  }, []);

  return { projects, getProjectById, deleteProjectByRef, clearProjects };
}
