export type ConfiguraitonReducerState = {
  title: string
  description: string
  ref: string
}

export type ConfigurationAction =
  | { type: "update_title"; title: string }
  | { type: "update_description"; description: string }
  | { type: "reset" };

export function configurationReducer(state: ConfiguraitonReducerState, action:ConfigurationAction) {
  switch (action.type) {
    case "update_title":
      return { ...state, title: action.title };
    case "update_description":
      return { ...state, description: action.description };
    case "reset":
      return { ref: crypto.randomUUID(), title: "New project", description: "Description..." };
    default:
      return state;
  }
}
