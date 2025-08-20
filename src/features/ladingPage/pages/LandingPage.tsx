import Header from "../components/header";
import Hero from "../components/hero";

export default function LandingPage() {
  return (
      <section className="flex flex-col items-center">
      <Header />
      <div className="w-full max-w-[1080px]">
    <Hero />
              <div className="h-[2px] bg-black/60 mx-10 flex-1"/>
      </div>
          
    </section>
  );
}
