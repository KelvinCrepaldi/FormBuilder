const ANALYTICS_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDPFPUIWwGZoBq-HK6C59lwIzBHm69V_Zbat15Zsw9J4O--oIleSxDmQpRDohIOa04qkFPUnFdczxFPUbIGV-rRzAT4kKyU0txRm3BtbYv79vdQdLZuoLWPM6Tb9sK-M5BUMPPYcLi4Ip3xel_FCEmcDqw_Vd6lOSJNjiExomD97CSzPA3g9wtjuXPygCyIo2_8bKKLImuSNOlSmSvfNEzdzhjyA3M_rbepWQtl4lAPdSzcxjtbyVjn8mSvBOCxZMzTItJtnvrzdPo";

export function LandingBento() {
  return (
    <section className="bg-surface-container-low px-6 py-16 lg:px-24 lg:py-20">
      <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
        <h2 className="mb-4 font-headline text-3xl font-bold tracking-tight text-on-surface lg:text-4xl">
          Por que escolher o Architect?
        </h2>
        <p className="text-lg text-on-surface-variant">
          Pensado para quem valoriza estética e funcionalidade ao mesmo tempo.
        </p>
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-3">
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl bg-surface-container-lowest p-8 editorial-shadow md:col-span-2 md:p-10">
          <div className="relative z-10">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <span
                className="material-symbols-outlined text-[2rem]"
                style={{ fontVariationSettings: "'wght' 600" }}
              >
                edit_note
              </span>
            </div>
            <h3 className="mb-4 font-headline text-2xl font-bold">
              Interface de curadoria
            </h3>
            <p className="max-w-md text-lg leading-relaxed text-on-surface-variant">
              Um ambiente limpo que parece um editor premium — não uma consola
              administrativa.
            </p>
          </div>
          <div className="relative z-10 mt-8">
            <span className="inline-flex items-center gap-2 font-bold text-primary transition-all group-hover:gap-4">
              Saiba mais{" "}
              <span className="material-symbols-outlined">arrow_forward</span>
            </span>
          </div>
          <div className="pointer-events-none absolute right-0 bottom-0 opacity-10 transition-opacity group-hover:opacity-20">
            <span className="material-symbols-outlined text-[12rem]">
              stylus
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-center rounded-xl bg-tertiary-fixed p-8 text-on-tertiary-fixed md:p-10">
          <span className="material-symbols-outlined mb-6 text-4xl">
            dynamic_form
          </span>
          <h3 className="mb-4 font-headline text-2xl font-bold">
            Lógica condicional
          </h3>
          <p className="font-medium opacity-80">
            Caminhos complexos para os utilizadores, sem uma linha de código.
          </p>
        </div>

        <div className="rounded-xl bg-primary-container p-8 text-on-primary-container md:p-10">
          <span className="material-symbols-outlined mb-6 text-4xl">
            rocket_launch
          </span>
          <h3 className="mb-4 font-headline text-2xl font-bold">
            Partilha imediata
          </h3>
          <p className="opacity-80">Publique e partilhe o link com um clique.</p>
        </div>

        <div className="flex flex-col items-center gap-8 rounded-xl bg-surface-container-highest p-8 md:col-span-2 md:flex-row md:p-10">
          <div className="flex-1">
            <h3 className="mb-2 font-headline text-2xl font-bold">
              Analítica de performance
            </h3>
            <p className="text-on-surface-variant">
              Visualize métricas com gráficos discretos e legíveis.
            </p>
          </div>
          <div className="hidden sm:block">
            <img
              src={ANALYTICS_IMG}
              alt="Dashboard de analítica"
              className="editorial-shadow h-32 w-48 rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
