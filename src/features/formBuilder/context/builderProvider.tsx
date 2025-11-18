import { createContext, useReducer } from "react";
import {
  configurationReducer,
  type ConfiguraitonReducerState,
  type ConfigurationAction,
} from "./projectReducer";

export type BuilderContextTypes = {
  configurationState: ConfiguraitonReducerState;
  configurationDispatch: React.Dispatch<ConfigurationAction>;
};

export const BuilderContext = createContext<BuilderContextTypes>(null);

export default function BuilderProviderNew({
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

  return (
    <BuilderContext.Provider
      value={{ configurationState, configurationDispatch }}
    >
      {children}
    </BuilderContext.Provider>
  );
}
