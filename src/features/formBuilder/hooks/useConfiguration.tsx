import { useContext } from "react";
import { BuilderContext } from "../context/builderProvider";

export default function useConfiguration() {
  const ctx = useContext(BuilderContext);

  if (!ctx) {
    throw new Error("useConfiguration deve ser usado dentro de <BuilderProvider>");
  }

  const { rootState, rootDispatch } = ctx;

  // -------------------------
  // PROJECT FIELDS
  // -------------------------
  const handleTitleChange = (newTitle: string) => {
    rootDispatch({ type: "update_title", title: newTitle });
  };

  const handleDescriptionChange = (newDescription: string) => {
    rootDispatch({ type: "update_description", description: newDescription });
  };

  // -------------------------
  // LAYOUT FIELDS
  // -------------------------
  const setFont = (font: string) => {
    rootDispatch({ type: "set_font", font });
  };

  const setFontSize = (fontSize: number) => {
    rootDispatch({ type: "set_font_size", fontSize });
  };

  const setPrimaryColor = (color: string) => {
    rootDispatch({ type: "set_primary_color", color });
  };

  const setBackgroundColor = (color: string) => {
    rootDispatch({ type: "set_background_color", color });
  };

  const setProgressBarVisible = (visible: boolean) => {
    rootDispatch({ type: "set_progress_bar", visible });
  };

  const setLayoutMode = (mode: "single_page" | "step_by_step") => {
    rootDispatch({ type: "set_layout_mode", mode });
  };

  // RESET
  const resetProject = () => {
    rootDispatch({ type: "reset_all" });
  };

  return {
    configuration: rootState.project,

    // project fields
    handleTitleChange,
    handleDescriptionChange,

    // layout fields
    setFont,
    setFontSize,
    setPrimaryColor,
    setBackgroundColor,
    setProgressBarVisible,
    setLayoutMode,

    // global
    resetProject,
  };
}
