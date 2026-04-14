import { createDexieProjectService } from "./projectService.dexie";
import type { IProjectService } from "./project.types";

export const projectService: IProjectService = createDexieProjectService();

export type { CreateProjectInput, IProjectService, Project } from "./project.types";
