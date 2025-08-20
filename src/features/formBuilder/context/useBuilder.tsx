import { useContext } from "react";
import { BuilderContext } from "./provider";

export default function useBuilder() {
  const builder = useContext(BuilderContext);

  if (!builder)
    throw new Error("BuilderContext needs be used with BuilderProvider");
  return builder;
}
