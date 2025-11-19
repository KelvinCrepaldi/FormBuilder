import type { DatabaseQuestionsTypes } from "@/database/dexie";
import type { formLayoutTypes, questionTypes } from "../types";

export type QuestionsAction =
  | { type: "create_question"; formType: formLayoutTypes, id: string }
  | { type: "delete_question"; questionId: string }
  | { type: "update_text"; questionId: string; text: string }
  | { type: "create_option"; questionId: string }
  | { type: "delete_option"; questionId: string; optionId: string }
  | { type: "update_option_label"; questionId: string; optionId: string; label: string }
  | { type: "reset" };

export function questionsReducer(state: DatabaseQuestionsTypes[], action: QuestionsAction): questionTypes[] {
  switch (action.type) {
    case "create_question": {
      const newForm: questionTypes = {
        id: action.id,
        text: "New question",
        options: [{ id: crypto.randomUUID(), label: "", value: "" }],
        position: state.length,
        type: action.formType,
      };
      return [...state, newForm];
    }
    case "delete_question":
      return state.filter((f) => f.id !== action.questionId).map((f, i) => ({ ...f, position: i }));
    case "update_text":
      return state.map((f) => (f.id === action.questionId ? { ...f, text: action.text } : f));
    case "create_option":
      return state.map((f) =>
        f.id === action.questionId
          ? { ...f, options: [...(f.options || []), { id: crypto.randomUUID(), label: "", value: "" }] }
          : f
      );
    case "delete_option":
      return state.map((f) =>
        f.id === action.questionId ? { ...f, options: f.options?.filter((o) => o.id !== action.optionId) } : f
      );
    case "update_option_label":
      return state.map((f) =>
        f.id === action.questionId
          ? {
              ...f,
              options: f.options?.map((o) => (o.id === action.optionId ? { ...o, label: action.label } : o)),
            }
          : f
      );
    case "reset":
      return [];
    default:
      return state;
  }
}
