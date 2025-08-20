import Header from "../components/header";
import Hero from "../components/hero";

export default function LandingPage() {
  return (
      <section className="">
    <Header/>
          <Hero />
          <div className="h-[2px] bg-black/60 mx-10 flex-1"/>
    </section>
  );
}
