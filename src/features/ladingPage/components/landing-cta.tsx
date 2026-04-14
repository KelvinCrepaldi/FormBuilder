import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export function LandingCta() {
  const navigate = useNavigate();
  return (
    <section className="px-6 py-16 lg:px-24 lg:py-24">
      <div className="signature-gradient relative overflow-hidden rounded-[2.5rem] p-12 text-center text-white lg:p-24">
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-white blur-[120px]" />
          <div className="absolute right-[-10%] bottom-[-10%] h-[40%] w-[40%] rounded-full bg-secondary-fixed blur-[120px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl space-y-6">
          <h2 className="font-headline text-3xl font-extrabold tracking-tighter lg:text-5xl xl:text-6xl">
            Pronto para elevar o teu padrão de dados?
          </h2>
          <p className="text-lg font-medium opacity-90">
            Cria o teu primeiro projeto em minutos — experimenta o fluxo
            completo no dashboard.
          </p>
          <div className="pt-4">
            <Button
              size="lg"
              className="editorial-shadow rounded-xl bg-white px-12 py-6 text-lg font-black text-primary hover:bg-surface-bright"
              onClick={() => navigate("/dashboard")}
            >
              Começar agora — é grátis
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
