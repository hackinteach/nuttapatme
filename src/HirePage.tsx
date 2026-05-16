import { useLenis } from "./hooks/useLenis";
import { HireNavbar } from "./components/hire/HireNavbar";
import { HireHero } from "./components/hire/HireHero";
import { TrustStrip } from "./components/hire/TrustStrip";
import { Services } from "./components/hire/Services";
import { Advisory } from "./components/hire/Advisory";
import { Process } from "./components/hire/Process";
import { FAQ } from "./components/hire/FAQ";
import { FinalCTA } from "./components/hire/FinalCTA";
import { HireFooter } from "./components/hire/HireFooter";

export function HirePage() {
  useLenis();
  return (
    <>
      <HireNavbar />
      <main>
        <HireHero />
        <TrustStrip />
        <Services />
        <Advisory />
        <Process />
        <FAQ />
        <FinalCTA />
      </main>
      <HireFooter />
    </>
  );
}
