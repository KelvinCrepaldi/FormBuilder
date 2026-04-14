import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const HERO_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBZtsWnDytx3NRkQWPEj1qCgr8VuJ0La0mqvJnR7O1Pd8xiaorqseaqidm3oxqB4jWL3vZju8aPL0_naAhLiGEwxOXiAnOLUrWhxCeoBYUP5x2njwFNqWL5PldD1PyjWS6MoxmDxyUlrfjSAHW8PA_zIFeppNTUGUuDvzOk3USDh2PM6x9U8NyHrKB8YbK6OvgpvaQ5mMCf5-Rd-dmvE0KL_n4HdpTb-kPMwFBKFQCKuYY12hinAc6A_izYaPQbX-He6rADlCZRo7Y";

export function LandingHero() {
  const navigate = useNavigate();
  return (
    <section className="grid items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:px-24 lg:py-24">
      <div className="space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-secondary-container px-3 py-1 font-label text-xs font-bold tracking-widest text-on-secondary-container uppercase">
          <span className="material-symbols-outlined text-sm">auto_awesome</span>
          Nova geração de UX
        </div>
        <h1 className="font-headline text-4xl font-extrabold leading-[1.1] tracking-tighter text-on-surface lg:text-6xl xl:text-7xl">
          Construa{" "}
          <span className="text-primary">FORMULÁRIOS INTELIGENTES</span> em
          minutos
        </h1>
        <p className="max-w-xl text-xl leading-relaxed text-on-surface-variant">
          Transforme a coleta de dados numa experiência editorial premium. Sem
          código, sem atrito — apenas design e fluxos claros.
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          <Button
            variant="signature"
            size="lg"
            className="rounded-xl px-10 py-6 font-bold editorial-shadow hover:scale-[1.02]"
            onClick={() => navigate("/dashboard")}
          >
            Começar agora
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="rounded-xl bg-surface-container-low px-10 py-6 font-bold text-primary hover:bg-surface-container-high"
            onClick={() => navigate("/form/demo")}
          >
            Ver demonstração
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-6 pt-4 text-on-surface-variant">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
            <span className="text-sm font-medium">Grátis para sempre</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
            <span className="text-sm font-medium">Sem cartão de crédito</span>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="absolute -inset-4 rounded-[2rem] bg-primary-container/5 blur-3xl" />
        <div className="relative rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-6 editorial-shadow">
          <img
            src={HERO_IMG}
            alt="Interface do construtor de formulários"
            className="aspect-video w-full rounded-lg object-cover"
          />
          <div className="glass-panel editorial-shadow absolute -bottom-8 -left-4 max-w-[240px] rounded-xl border border-white/40 p-5 md:-left-8">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tertiary-fixed">
                <span className="material-symbols-outlined text-tertiary">
                  psychology
                </span>
              </div>
              <div>
                <p className="text-xs font-bold tracking-widest text-on-surface-variant uppercase">
                  Lógica ativa
                </p>
                <p className="text-sm font-bold">Smart flows</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-2 w-full rounded-full bg-surface-container-highest" />
              <div className="h-2 w-2/3 rounded-full bg-surface-container-highest" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
