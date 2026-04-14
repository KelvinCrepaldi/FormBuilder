import type { DatabaseProjectTypes } from "@/database/dexie";

export type { DatabaseProjectTypes } from "@/database/dexie";

export type Project = DatabaseProjectTypes;

export type CreateProjectInput = Omit<DatabaseProjectTypes, "id">;

export interface IProjectService {
  list(): Promise<DatabaseProjectTypes[]>;
  getByRef(ref: string): Promise<DatabaseProjectTypes | undefined>;
  create(input: CreateProjectInput): Promise<void>;
  deleteByRef(ref: string): Promise<void>;
  clearAll(): Promise<void>;
}
