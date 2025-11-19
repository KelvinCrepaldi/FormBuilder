import BuilderProvider from "@/features/formBuilder/context/builderProvider";
import type { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return <BuilderProvider>{children}</BuilderProvider>;
}
