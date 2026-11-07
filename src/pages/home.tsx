import { useCallback, useState } from "react";
import { Preloader } from "@/components/experience/preloader";
import { CustomCursor } from "@/components/experience/cursor";
import { CursorGlow } from "@/components/experience/cursor-glow";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Work } from "@/components/sections/work";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";
import { Credentials } from "@/components/sections/credentials";
import { ResumeProvider } from "@/hooks/use-resume";

export default function Home() {
  const [ready, setReady] = useState(false);
  const onDone = useCallback(() => setReady(true), []);

  return (
    <ResumeProvider>
    <div className="noise relative min-h-screen bg-[hsl(var(--carbon))] text-[hsl(var(--chalk))]">
      <Preloader onDone={onDone} />
      <CustomCursor />
      <CursorGlow />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:bg-[hsl(var(--lime))] focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-[hsl(var(--carbon))]"
      >
        Skip to content
      </a>

      <Nav />

      <main id="main" className="relative z-[2]">
        <Hero ready={ready} />
        <Work />
        <About />
        <Skills />
        <Experience />
        <Credentials />
        <Contact />
      </main>

      <Footer />
    </div>
    </ResumeProvider>
  );
}
