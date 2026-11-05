import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Check, ExternalLink, Layers } from "lucide-react";
import { useState } from "react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal, EASE } from "@/components/motion/reveal";
import { projects, type Project } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-portfolio";

const filters = [
  { id: "all", label: "All work" },
  { id: "Web Application", label: "Web apps" },
  { id: "Java", label: "Java" },
] as const;

type FilterId = (typeof filters)[number]["id"];

export function Projects() {
  const [filter, setFilter] = useState<FilterId>("all");
  const visible = projects.filter((p) => (filter === "all" ? true : p.category === filter));

  return (
    <Section id="projects" divided>
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="04 — Selected work"
          title="Systems built end to end,"
          accent="not tutorials"
          description="Every project below is deployed or open-source. Data models, service layers, role logic and deployment are all mine."
        />

        <Reveal delay={0.1}>
          <div
            role="tablist"
            aria-label="Filter projects"
            className="inline-flex rounded-full border border-border/80 bg-card/50 p-1 backdrop-blur-sm"
          >
            {filters.map((f) => {
              const isActive = filter === f.id;
              return (
                <button
                  key={f.id}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    "relative rounded-full px-4 py-1.5 text-[0.78rem] font-medium transition-colors duration-300",
                    isActive ? "text-background" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="project-filter"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                      className="absolute inset-0 -z-10 rounded-full bg-foreground"
                    />
                  )}
                  {f.label}
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-5">
        {visible.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>

      {visible.length === 0 && (
        <div className="mt-12 rounded-2xl border border-dashed border-border/70 p-12 text-center text-muted-foreground">
          Nothing in this category yet.
        </div>
      )}

      <Reveal delay={0.15} className="mt-10">
        <div className="flex flex-col items-start justify-between gap-5 rounded-[1.5rem] border border-border/70 bg-card/40 p-6 backdrop-blur-sm sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <span className="grid h-11 w-11 place-items-center rounded-2xl border border-border/70 text-primary">
              <Layers className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[0.9rem] font-semibold">More on GitHub</p>
              <p className="text-[0.79rem] text-muted-foreground">
                Experiments, course work and the rest of the open-source trail.
              </p>
            </div>
          </div>
          <Button asChild variant="outline" size="sm">
            <a
              href="https://github.com/aniketjumde"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              github.com/aniketjumde
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduced = usePrefersReducedMotion();
  const [hovered, setHovered] = useState(false);

  // Subtle 3D tilt driven by pointer position
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [4, -4]), {
    stiffness: 200,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-5, 5]), {
    stiffness: 200,
    damping: 24,
  });

  const showTilt = !reduced && hovered;

  return (
    <Reveal y={30} delay={index * 0.06}>
      <motion.article
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - rect.left) / rect.width);
          my.set((e.clientY - rect.top) / rect.height);
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          mx.set(0.5);
          my.set(0.5);
        }}
        style={showTilt ? { rotateX, rotateY, transformPerspective: 1200 } : undefined}
        className={cn(
          "conic-border group relative overflow-hidden rounded-[1.5rem] border border-border/80 bg-card/55 backdrop-blur-xl transition-colors duration-500 hover:bg-card/80",
          project.featured && "border-border",
        )}
      >
        <div className="grid lg:grid-cols-[0.5fr_0.5fr]">
          {/* ── Cover ─────────────────────────────────────── */}
          <div
            className={cn(
              "relative order-1 overflow-hidden",
              project.featured ? "lg:order-1" : "lg:order-1",
            )}
          >
            <ProjectCover project={project} />
          </div>

          {/* ── Body ──────────────────────────────────────── */}
          <div className="order-2 flex flex-col p-6 sm:p-8">
            <div className="mb-4 flex items-center gap-2.5">
              <span className="rounded-full border border-primary/25 bg-primary/[0.08] px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-primary">
                {project.kicker}
              </span>
              <span className="font-mono text-[0.62rem] text-muted-foreground/70">
                {project.date}
              </span>
              {project.featured && (
                <span className="ml-auto hidden items-center gap-1 rounded-full border border-border/70 px-2 py-0.5 text-[0.58rem] uppercase tracking-[0.1em] text-muted-foreground sm:inline-flex">
                  Flagship
                </span>
              )}
            </div>

            <h3 className="font-display text-[1.35rem] font-semibold leading-tight transition-colors duration-300 group-hover:text-primary sm:text-[1.5rem]">
              {project.title}
            </h3>

            <p className="mt-3 text-[0.86rem] leading-relaxed text-muted-foreground">
              {project.description}
            </p>

            <ul className="mt-4 space-y-1.5">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-2 text-[0.78rem] leading-relaxed text-muted-foreground/90">
                  <Check className="mt-[3px] h-3.5 w-3.5 shrink-0 text-primary/70" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-border/60 bg-secondary/40 px-2 py-0.5 font-mono text-[0.62rem] text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-6">
              <Button asChild size="sm" variant="default">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open live demo of ${project.title}`}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Live demo
                </a>
              </Button>
              <Button asChild size="sm" variant="outline">
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View source code for ${project.title}`}
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  Source
                </a>
              </Button>
            </div>
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}

/**
 * Abstract, CSS-only "screenshot". Keeps the page weightless while still
 * giving each project a distinct visual identity.
 */
function ProjectCover({ project }: { project: Project }) {
  const { from, to, mock } = project.cover;

  return (
    <div
      className="relative h-full min-h-[15rem] overflow-hidden"
      style={{ background: `linear-gradient(145deg, ${from} 0%, ${to} 100%)` }}
      aria-hidden="true"
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-[0.18]" />
      {/* Glow */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-[60px]" />

      {/* Browser chrome */}
      <div className="absolute inset-x-6 top-7 overflow-hidden rounded-xl border border-white/15 bg-black/25 shadow-2xl backdrop-blur-sm">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-white/35" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="ml-2 truncate font-mono text-[0.55rem] text-white/45">
            {mock}
          </span>
        </div>
        <div className="space-y-2 p-3.5">
          <div className="h-2 w-2/3 rounded-full bg-white/25" />
          <div className="h-2 w-1/2 rounded-full bg-white/15" />
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="h-9 rounded-md bg-white/10" />
            <div className="h-9 rounded-md bg-white/15" />
            <div className="h-9 rounded-md bg-white/10" />
          </div>
          <div className="mt-2 h-2 w-3/4 rounded-full bg-white/10" />
        </div>
      </div>

      {/* Floating mono tag */}
      <div className="absolute bottom-4 left-6 rounded-full border border-white/20 bg-black/30 px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.16em] text-white/70 backdrop-blur">
        {project.category}
      </div>

      {/* Hover sheen */}
      <div className="absolute inset-0 translate-y-full bg-gradient-to-t from-white/12 to-transparent transition-transform duration-700 ease-out group-hover:translate-y-0" />
    </div>
  );
}
