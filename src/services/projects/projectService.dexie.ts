import { db } from "@/database/dexie";
import type { CreateProjectInput, IProjectService } from "./project.types";

export function createDexieProjectService(): IProjectService {
  return {
    async list() {
      return db.DBproject.toArray();
    },

    async getByRef(ref: string) {
      return db.DBproject.where("ref").equals(ref).first();
    },

    async create(input: CreateProjectInput) {
      await db.DBproject.add(input);
    },

    async deleteByRef(ref: string) {
      await db.DBproject.where("ref").equals(ref).delete();
    },

    async clearAll() {
      await db.DBproject.clear();
    },
  };
}
