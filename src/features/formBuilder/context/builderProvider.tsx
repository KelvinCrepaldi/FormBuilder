import { createContext, useReducer, useState } from "react";
import {
  configurationReducer,
  type ConfiguraitonReducerState,
  type ConfigurationAction,
} from "./configurationReducer";
import { questionsReducer, type QuestionsAction } from "./questionsReducer";
import type { questionTypes } from "../types";

export type BuilderContextTypes = {
  configurationState: ConfiguraitonReducerState;
  configurationDispatch: React.Dispatch<ConfigurationAction>;
  questionsState: questionTypes[];
  questionsDispatch: React.Dispatch<QuestionsAction>;
  active: string | null;
  handleSetActive: (id: string) => void;
};

export const BuilderContext = createContext<BuilderContextTypes>(null);

export default function BuilderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [configurationState, configurationDispatch] = useReducer(
    configurationReducer,
    {
      ref: crypto.randomUUID(),
      title: "New project",
      description: "Description...",
    }
  );

  const [questionsState, questionsDispatch] = useReducer(questionsReducer, []);
  const [active, setActive] = useState<null | string>(null);

  const handleSetActive = (id: string) => {
    setActive(id);
  };
  return (
    <BuilderContext.Provider
      value={{
        configurationState,
        configurationDispatch,
        questionsState,
        questionsDispatch,
        active,
        handleSetActive,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
}
