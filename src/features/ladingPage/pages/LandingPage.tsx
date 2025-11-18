import Header from "../components/header";
import Hero from "../components/hero";

export default function LandingPage() {
  return (
    <section className="flex flex-col items-center bg-gradient-to-r from-slate-50 to-slate-100 min-h-screen z-10">
      <Header />
      <div className="w-full max-w-7xl flex flex-1 items-center">
        <Hero />
      </div>
    </section>
  );
}
