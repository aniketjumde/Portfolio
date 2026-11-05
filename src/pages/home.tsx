import { ThemeProvider } from "@/hooks/use-theme";
import { Masthead } from "@/components/layout/masthead";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Expertise } from "@/components/sections/expertise";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Achievements } from "@/components/sections/achievements";
import { Connect } from "@/components/sections/connect";

export default function Home() {
  return (
    <ThemeProvider>
      <div className="grain relative min-h-screen bg-[hsl(var(--paper))] text-[hsl(var(--ink))]">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:border focus:border-[hsl(var(--ink))] focus:bg-[hsl(var(--paper))] focus:px-4 focus:py-2 focus:font-mono focus:text-xs"
        >
          Skip to content
        </a>

        <Masthead />

        <main id="main" className="relative z-[2]">
          <Hero />
          <About />
          <Expertise />
          <Experience />
          <Projects />
          <Achievements />
          <Connect />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}
