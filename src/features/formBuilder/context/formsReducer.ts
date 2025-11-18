import type { formLayoutTypes, formTypes } from "../types";

export type FormsAction =
  | { type: "create_form"; formType: formLayoutTypes }
  | { type: "delete_form"; formId: string }
  | { type: "update_question"; formId: string; question: string }
  | { type: "create_option"; formId: string }
  | { type: "delete_option"; formId: string; optionId: string }
  | { type: "update_option_label"; formId: string; optionId: string; label: string }
  | { type: "reset" };

export function formsReducer(state: FormsState, action: FormsAction): FormsState {
  switch (action.type) {
    case "create_form": {
      const newId = crypto.randomUUID();
      const newForm: formTypes = {
        id: newId,
        question: "",
        options: [{ id: crypto.randomUUID(), label: "", value: "" }],
        position: state.length,
        type: action.formType,
      };
      return [...state, newForm];
    }
    case "delete_form":
      return state.filter((f) => f.id !== action.formId).map((f, i) => ({ ...f, position: i }));
    case "update_question":
      return state.map((f) => (f.id === action.formId ? { ...f, question: action.question } : f));
    case "create_option":
      return state.map((f) =>
        f.id === action.formId
          ? { ...f, options: [...(f.options || []), { id: crypto.randomUUID(), label: "", value: "" }] }
          : f
      );
    case "delete_option":
      return state.map((f) =>
        f.id === action.formId ? { ...f, options: f.options?.filter((o) => o.id !== action.optionId) } : f
      );
    case "update_option_label":
      return state.map((f) =>
        f.id === action.formId
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
