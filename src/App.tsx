import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Competitions } from "./components/Competitions";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { CookieBanner } from "./components/CookieBanner";
import { SpeedInsights } from "@vercel/speed-insights/react";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Competitions />
        <Contact />
      </main>
      <Footer />
      <CookieBanner />
      <SpeedInsights />
    </>
  );
}
