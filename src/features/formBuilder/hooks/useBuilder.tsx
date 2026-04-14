import useConfiguration from "./useConfiguration";
import useQuestions from "./useQuestions";
import { BuilderContext } from "../context/builderProvider";
import { useContext } from "react";
import { projectService } from "@/services/projects/projectService";

export default function useBuilder() {
  const ctx = useContext(BuilderContext);

  if (!ctx) {
    throw new Error("useBuilder deve ser usado dentro de <BuilderProvider>");
  }

  const { rootDispatch } = ctx;
  const { configuration } = useConfiguration();
  const { questions } = useQuestions();

  const saveProject = async () => {
    await projectService.create({
      ...configuration,
      questions,
    });

    rootDispatch({ type: "reset_all" });
  };

  const resetBuilder = () => {
    rootDispatch({ type: "reset_all" });
  };

  return { saveProject, resetBuilder };
}
