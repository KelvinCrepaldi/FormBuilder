import {
  createContext,
  useReducer,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import {
  rootReducer,
  type RootAction,
  type RootStateTypes,
} from "./rootReducer";

export type BuilderContextTypes = {
  rootState: RootStateTypes;
  rootDispatch: React.Dispatch<RootAction>;
  active: string | null;
  setActive: Dispatch<SetStateAction<string | null>>;
};

export const BuilderContext = createContext<BuilderContextTypes | undefined>(
  undefined
);

const initialReducer = {
  project: {
    ref: crypto.randomUUID(),
    title: "New project",
    description: "Description...",
    layout: {
      font: "Inter",
      fontSize: 16,
      primaryColor: "#000000",
      backgroundColor: "#ffffff",
      showProgressBar: true,
      layoutMode: "single_page" as const,
    },
  },
  questions: [],
};

export default function BuilderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [rootState, rootDispatch] = useReducer(rootReducer, initialReducer);
  const [active, setActive] = useState<string | null>(null);

  return (
    <BuilderContext.Provider
      value={{
        rootState,
        rootDispatch,
        active,
        setActive,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
}
