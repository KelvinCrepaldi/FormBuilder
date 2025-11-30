import type { ProjectLayout } from "@/features/formBuilder/context/projectReducer";
import Dexie, { type Table } from "dexie";

export type DatabaseProjectTypes = {
  id?: string;
  ref: string;
  title: string;
  description: string;
  layout: ProjectLayout; // <-- IGUAL ao reducer
  questions: DatabaseQuestionsTypes[];
};

export type FormConfig = {
  theme: {
    colorPrimary: string;
    colorBackground: string;
    font: string;
    textSize: string;
  };
  layout: {
    singlePage: boolean;
    showProgressBar: boolean;
    pages?: number;
  };
};


export type formLayoutTypes = "radio" | "checkbox" | "text" | "select";

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
    this.version(3).stores({
      DBproject: "++id, ref",
    });
  }
}

export const db = new MySubClassedDexie();
