import { formsReducer, type FormsAction } from "./formsReducer";
import { layoutReducer, type LayoutAction } from "./layoutReducer";
import { projectReducer, type ProjectAction } from "./projectReducer";

type RootAction = ProjectAction | FormsAction | LayoutAction;

export function rootReducer(state, action: RootAction) {
  return {
    project: projectReducer(state.project, action as ProjectAction),
    forms: formsReducer(state.forms, action as FormsAction),
    layout: layoutReducer(state.layout, action as LayoutAction),
  };
}
