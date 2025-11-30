import { questionsReducer, type QuestionsAction } from "./questionsReducer";
import {
  projectReducer,
  type projectAction,
  type ProjectReducerState,
} from "./projectReducer";
import type { DatabaseQuestionsTypes } from "@/database/dexie";

export type RootAction =
  | projectAction
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
        },
        questions: [],
      };

    default:
      return {
        project: projectReducer(state.project, action as projectAction),
        questions: questionsReducer(state.questions, action as QuestionsAction),
      };
  }
}
