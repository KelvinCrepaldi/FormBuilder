import { questionsReducer, type QuestionsAction } from "./questionsReducer";
import {
  projectReducer,
  type ProjectAction,
  type ProjectReducerState,
} from "./projectReducer";
import type { DatabaseQuestionsTypes } from "@/database/dexie";

export type RootAction =
  | ProjectAction
  | QuestionsAction
  | { type: "reset_all" };

export type RootStateTypes = {
  project: ProjectReducerState;
  questions: DatabaseQuestionsTypes[];
};

export function rootReducer(state: RootStateTypes, action: RootAction) {
  switch (action.type) {
    case "reset_all":
  return {
    project: {
      ref: crypto.randomUUID(),
      title: "New project",
      description: "Description...",
      layout: {
        font: "Inter",
        fontSize: 16,
        primaryColor: "#000000",
        backgroundColor: "#ffffff",
        showProgressBar: true,
        layoutMode: "single_page" as const,
      },
    },
    questions: [],
  };


    default:
      return {
        project: projectReducer(state.project, action as ProjectAction),
        questions: questionsReducer(state.questions, action as QuestionsAction),
      };
  }
}
