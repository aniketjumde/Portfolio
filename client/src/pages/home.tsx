import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Certifications } from "@/components/certifications";
import { Resume } from "@/components/resume";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary font-sans">
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Resume />
        <Contact />
      </main>
      <footer
  className="
    py-8 text-center text-sm
    bg-white/80 dark:bg-[#050917]
    text-gray-600 dark:text-muted-foreground
    border-t border-gray-300 dark:border-white/10
  "
>
  <p className="mb-2">Designed & Built by Aniket Jumde</p>
  <p>© {new Date().getFullYear()} All rights reserved.</p>
</footer>

    </div>
  );
}