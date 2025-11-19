import Dexie, { type Table } from "dexie";

export type DatabaseProjectTypes = {
  id?: string;
  ref: string;
  title: string;
  description: string;
  questions: DatabaseQuestionsTypes[];
};

export type formLayoutTypes = "radio" | "checkbox";

export type DatabaseQuestionsTypes = {
  id: string;
  text: string;
  position: number;
  type: formLayoutTypes;
  options?: DatabaseOptionTypes[];
};

export type DatabaseOptionTypes = {
  id: string;
  label: string;
  value: string;
};

export class MySubClassedDexie extends Dexie {
  DBproject!: Table<DatabaseProjectTypes>;

  constructor() {
    super("resultsDatabase");
    this.version(1).stores({
      DBproject: "++id, ref",
    });
  }
}

export const db = new MySubClassedDexie();
