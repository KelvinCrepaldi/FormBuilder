import { useContext } from "react";
import { BuilderContext } from "../context/builderProvider";

export default function useConfiguration() {
  const ctx = useContext(BuilderContext);

  if (!ctx) {
    throw new Error("useConfiguration deve ser usado dentro de <BuilderProvider>");
  }

  const { rootState, rootDispatch } = ctx;


  const handleTitleChange = (newTitle: string) => {
    rootDispatch({
      type: "update_title",
      title: newTitle,
    });
  };

  const handleDescriptionChange = (newDescription: string) => {
    rootDispatch({
      type: "update_description",
      description: newDescription,
    });
  };

  return {
    configuration: rootState.project,
    handleTitleChange,
    handleDescriptionChange,
  };
}
