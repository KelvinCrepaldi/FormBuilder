export type LayoutAction = { type: "set_active"; formId: string | null } | { type: "reset" };

export function layoutReducer(state: LayoutState, action: LayoutAction): LayoutState {
  switch (action.type) {
    case "set_active":
      return { ...state, activeFormId: action.formId };
    case "reset":
      return { activeFormId: null };
    default:
      return state;
  }
}
