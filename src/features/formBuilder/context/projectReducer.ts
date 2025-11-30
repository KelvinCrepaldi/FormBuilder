// layout types
export type LayoutMode = "single_page" | "step_by_step";

export type ProjectLayout = {
  font: string;
  fontSize: number;
  primaryColor: string;
  backgroundColor: string;
  showProgressBar: boolean;
  layoutMode: LayoutMode;
};

// full project state
export type ProjectReducerState = {
  ref: string;
  title: string;
  description: string;
  layout: ProjectLayout;
};

export const defaultLayout: ProjectLayout = {
  font: "Inter",
  fontSize: 16,
  primaryColor: "#000000",
  backgroundColor: "#ffffff",
  showProgressBar: true,
  layoutMode: "single_page",
};

// factory para evitar duplicação e facilitar reset
export const getInitialProjectState = (): ProjectReducerState => ({
  ref: crypto.randomUUID(),
  title: "New project",
  description: "Description...",
  layout: { ...defaultLayout },
});

export type ProjectAction =
  | { type: "update_title"; title: string }
  | { type: "update_description"; description: string }
  | { type: "reset" }
  // Layout actions:
  | { type: "set_font"; font: string }
  | { type: "set_font_size"; fontSize: number }
  | { type: "set_primary_color"; color: string }
  | { type: "set_background_color"; color: string }
  | { type: "set_progress_bar"; visible: boolean }
  | { type: "set_layout_mode"; mode: LayoutMode }
  // genérica opcional:
  | { type: "update_layout"; patch: Partial<ProjectLayout> };

  const updateLayout = (
  state: ProjectReducerState,
  patch: Partial<ProjectLayout>
): ProjectReducerState => ({
  ...state,
  layout: { ...state.layout, ...patch },
});

export function projectReducer(
  state: ProjectReducerState,
  action: ProjectAction
): ProjectReducerState {
  switch (action.type) {
    case "update_title":
      return { ...state, title: action.title };

    case "update_description":
      return { ...state, description: action.description };

    // ---------------------------------------
    // LAYOUT GENERIC UPDATE
    // ---------------------------------------
    case "update_layout":
      return updateLayout(state, action.patch);

    // ---------------------------------------
    // SPECIFIC ACTIONS
    // ---------------------------------------
    case "set_font":
      return updateLayout(state, { font: action.font });

    case "set_font_size":
      return updateLayout(state, {
        fontSize: Math.max(8, Math.min(action.fontSize, 48)), // clamp
      });

    case "set_primary_color":
      return updateLayout(state, { primaryColor: action.color });

    case "set_background_color":
      return updateLayout(state, { backgroundColor: action.color });

    case "set_progress_bar":
      return updateLayout(state, { showProgressBar: action.visible });

    case "set_layout_mode": {
      const isStep = action.mode === "step_by_step";
      return updateLayout(state, {
        layoutMode: action.mode,
        showProgressBar: isStep ? true : state.layout.showProgressBar,
      });
    }

    // ---------------------------------------
    case "reset":
      return getInitialProjectState();

    default:
      return state;
  }
}
