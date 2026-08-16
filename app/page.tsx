import Scene from "@/components/Scene";
import About from "@/sections/About";
import Hero from "@/sections/Hero";
import Projects from "@/sections/Projects";

export default function Home() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden bg-[#05060a]">
      {/* Backdrop: the canvas plus the scrim that darkens the viewport edges.
          Fixed so both stay put while the sections scroll over them. */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <Scene />
        <div className="absolute inset-0 bg-linear-to-b from-[#05060a]/85 via-transparent to-[#05060a]/85" />
      </div>
      
      <div className="relative z-10">
        <Hero />
        <About />
        <Projects />
      </div>
    </main>
  );
}
