import Header from "../components/header";
import Hero from "../components/hero";

export default function LandingPage() {
  return (
    <section className="flex flex-col items-center bg-gradient-to-r from-slate-50 to-slate-100 min-h-screen z-10">
      <Header />
      <div className="w-full max-w-7xl">
        <Hero />
      </div>

      <div className="w-8/9 h-screen border bg-primary/10 rounded-2xl border-primary/40 shadow-xl"></div>
    </section>
  );
}
