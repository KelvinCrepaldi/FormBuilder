import { questionsReducer, type QuestionsAction } from "./questionsReducer";
import { layoutReducer, type LayoutAction } from "./layoutReducer";
import { configurationReducer, type ConfigurationAction } from "./configurationReducer";

type RootAction = ConfigurationAction | QuestionsAction | LayoutAction;

export function rootReducer(state, action: RootAction) {
  return {
    project: configurationReducer(state.project, action as ConfigurationAction),
    forms: questionsReducer(state.forms, action as QuestionsAction),
    layout: layoutReducer(state.layout, action as LayoutAction),
  };
}
