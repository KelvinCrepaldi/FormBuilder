import { useContext } from "react";
import { BuilderContext } from "../context/builderProvider";

export default function useConfiguration() {
  const { configurationDispatch, configurationState } =
    useContext(BuilderContext);

  if (!configurationDispatch || !configurationState) {
    throw new Error(
      "useConfiguration precisa estar dentro de <BuilderProvider />"
    );
  }

  const handleTitleChange = (newTitle: string) => {
    configurationDispatch({
      type: "update_title",
      title: newTitle,
    });
  };

  const handleDescriptionChange = (newDescription: string) => {
    configurationDispatch({
      type: "update_description",
      description: newDescription,
    });
  };

  return {
    configurationState,
    handleTitleChange,
    handleDescriptionChange,
  };
}
