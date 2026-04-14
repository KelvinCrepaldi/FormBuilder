import type { DatabaseQuestionsTypes } from "@/database/dexie";
import type { formLayoutTypes, questionTypes } from "../types";

export type QuestionsAction =
  | { type: "create_question"; formType: formLayoutTypes; id: string }
  | { type: "duplicate_question"; questionId: string }
  | { type: "delete_question"; questionId: string }
  | { type: "update_text"; questionId: string; text: string }
  | {
      type: "update_question_placeholder";
      questionId: string;
      placeholder: string;
    }
  | {
      type: "update_question_description";
      questionId: string;
      description: string;
    }
  | { type: "create_option"; questionId: string }
  | { type: "delete_option"; questionId: string; optionId: string }
  | {
      type: "update_option_label";
      questionId: string;
      optionId: string;
      label: string;
    }
  | { type: "set_question_order"; orderedIds: string[] }
  | { type: "reset" };

export function questionsReducer(
  state: DatabaseQuestionsTypes[],
  action: QuestionsAction
): questionTypes[] {
  switch (action.type) {
    case "create_question": {
      const newForm: DatabaseQuestionsTypes = {
        id: action.id,
        text: "New question",
        options: [{ id: crypto.randomUUID(), label: "", value: "" }],
        position: state.length,
        type: action.formType as formLayoutTypes,
        placeholder: "",
        description: "",
      };
      return [...state, newForm];
    }
    case "duplicate_question": {
      const original = state.find((f) => f.id === action.questionId);
      if (!original) return state;

      const duplicated: DatabaseQuestionsTypes = {
        ...original,
        text: original.text + " (copy)",
        id: crypto.randomUUID(),
        position: state.length,
        placeholder: original.placeholder ?? "",
        description: original.description ?? "",
        options: original.options?.map((opt) => ({
          ...opt,
          id: crypto.randomUUID(),
        })),
      };

      return [...state, duplicated];
    }
    case "delete_question":
      return state
        .filter((f) => f.id !== action.questionId)
        .map((f, i) => ({ ...f, position: i }));
    case "update_text":
      return state.map((f) =>
        f.id === action.questionId ? { ...f, text: action.text } : f
      );
    case "update_question_placeholder":
      return state.map((f) =>
        f.id === action.questionId
          ? { ...f, placeholder: action.placeholder }
          : f
      );
    case "update_question_description":
      return state.map((f) =>
        f.id === action.questionId
          ? { ...f, description: action.description }
          : f
      );
    case "create_option":
      return state.map((f) =>
        f.id === action.questionId
          ? {
              ...f,
              options: [
                ...(f.options || []),
                { id: crypto.randomUUID(), label: "", value: "" },
              ],
            }
          : f
      );
    case "delete_option":
      return state.map((f) =>
        f.id === action.questionId
          ? {
              ...f,
              options: f.options?.filter((o) => o.id !== action.optionId),
            }
          : f
      );
    case "update_option_label":
      return state.map((f) =>
        f.id === action.questionId
          ? {
              ...f,
              options: f.options?.map((o) =>
                o.id === action.optionId ? { ...o, label: action.label } : o
              ),
            }
          : f
      );
    case "set_question_order": {
      const map = new Map(state.map((q) => [q.id, q] as const));
      const reordered = action.orderedIds
        .map((id) => map.get(id))
        .filter((q): q is DatabaseQuestionsTypes => q != null);
      const remaining = state.filter((q) => !action.orderedIds.includes(q.id));
      return [...reordered, ...remaining].map((q, i) => ({ ...q, position: i }));
    }
    case "reset":
      return [];
    default:
      return state;
  }
}
