import { LandingNav } from "../components/landing-nav";
import { LandingHero } from "../components/landing-hero";
import { LandingBento } from "../components/landing-bento";
import { LandingCta } from "../components/landing-cta";
import { LandingFooter } from "../components/landing-footer";

export default function LandingPage() {
  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <LandingNav />
      <main className="pt-20">
        <LandingHero />
        <LandingBento />
        <LandingCta />
      </main>
      <LandingFooter />
    </div>
  );
}
