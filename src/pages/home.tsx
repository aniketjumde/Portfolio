import { useCallback, useState } from "react";
import { Preloader } from "@/components/experience/preloader";
import { Backdrop } from "@/components/experience/backdrop";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Credentials } from "@/components/sections/credentials";
import { Profiles } from "@/components/sections/profiles";
import { Contact } from "@/components/sections/contact";
import { ResumeProvider } from "@/hooks/use-resume";

export default function Home() {
  const [ready, setReady] = useState(false);
  const onDone = useCallback(() => setReady(true), []);

  return (
    <ResumeProvider>
      <div className="relative min-h-screen bg-[hsl(var(--ink))] text-white">
        <Preloader onDone={onDone} />
        <Backdrop />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-lg focus:bg-[hsl(var(--violet))] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>

        <Nav />

        <main id="main" className="relative z-10">
          <Hero ready={ready} />
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Credentials />
          <Profiles />
          <Contact />
        </main>

        <Footer />
      </div>
    </ResumeProvider>
  );
}
