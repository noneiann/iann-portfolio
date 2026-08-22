
import About from "@/sections/About";
import Hero from "@/sections/Hero";
import Projects from "@/sections/Projects";

export default function Home() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden bg-[#05060a]">
      <div className="relative z-10">
        <Hero />
        <About />
        <Projects />
      </div>
    </main>
  );
}
