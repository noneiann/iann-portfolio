import About from "@/sections/About";
import Contact from "@/sections/Contact";
import Experience from "@/sections/Experience";
import Hero from "@/sections/Hero";
import Projects from "@/sections/Projects";
import Skills from "@/sections/Skills";
import Nav from "@/components/Nav";
import SectionIndicator from "@/components/SectionIndicator";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-[#05060a]">
      <Nav />
      <SectionIndicator />
      <div className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </div>
    </main>
  );
}
