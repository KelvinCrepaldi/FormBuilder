import { useContext } from "react";
import { BuilderContext } from "../context/builderProvider";

export default function useConfiguration() {
  const { rootState, rootDispatch } = useContext(BuilderContext);

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
