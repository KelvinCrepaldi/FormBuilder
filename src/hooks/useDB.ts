import { db } from "@/database/dexie";

export default function useDB() {
  const projects = async () => {
    const projects = await db.DBproject.toArray();
    return projects;
  };

  const getProjectById = async (ref: string) => {
    return await db.DBproject.where("ref").equals(ref).first();
  };

  return { projects, getProjectById };
}
