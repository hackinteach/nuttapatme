import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Competitions } from "./components/Competitions";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { CookieBanner } from "./components/CookieBanner";
import { useLenis } from "./hooks/useLenis";

export default function App() {
  useLenis();
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
    </>
  );
}
