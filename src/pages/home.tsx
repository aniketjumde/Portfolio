import { ThemeProvider } from "@/hooks/use-theme";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Backdrop } from "@/components/layout/backdrop";
import { Hero, TechMarquee } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { Achievements } from "@/components/sections/achievements";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-background text-foreground antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
        >
          Skip to content
        </a>

        <Backdrop />
        <Navbar />

        <main id="main">
          <Hero />
          <TechMarquee />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Services />
          <Achievements />
          <Contact />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}
