import BuilderProvider from "@/features/formBuilder/context/provider";
import type { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <BuilderProvider>{children}</BuilderProvider>
    </>
  );
}
