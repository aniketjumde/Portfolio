import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useRef } from "react";
import { projects, type Project } from "@/data/work";
import { EASE_OUT_EXPO } from "@/components/motion/easing";
import { DrawLine, PosterLinesOnScroll, Rise } from "@/components/motion/text";
import { GithubIcon } from "@/components/ui/brand-icons";
import {
  ExamDashboardMock,
  ExamResultMock,
  StudentFormMock,
  StudentRecordsMock,
} from "@/components/ui/project-mocks";
import { usePrefersReducedMotion } from "@/hooks/use-site";
import { cn } from "@/lib/utils";

/**
 * Selected work as a series of full editorial spreads.
 *
 * Every project is fully present — visual, description, contribution, stack and
 * links — rather than hidden behind a hover state. The alternating layout keeps
 * the eye moving and gives each project its own spread instead of a card grid.
 */
export function Work() {
  return (
    <section id="work" className="relative">
      <div className="mx-auto w-full max-w-[104rem] px-5 sm:px-8">
        <DrawLine />

        <div className="pb-4 pt-16 lg:pt-24">
          <div className="grid gap-6 lg:grid-cols-[0.55fr_0.45fr] lg:items-end">
            <div>
              <Rise>
                <p className="meta mb-4">
                  <span className="text-[hsl(var(--lime))]">01</span> — Selected work
                </p>
              </Rise>
              <PosterLinesOnScroll
                as="h2"
                className="poster-lg text-[hsl(var(--chalk))]"
                lines={[
                  <span key="1">SYSTEMS,</span>,
                  <span key="2" className="text-[hsl(var(--lime))]">
                    NOT SCREENS.
                  </span>,
                ]}
              />
            </div>
            <Rise delay={0.1}>
              <p className="max-w-sm font-grotesk text-[0.98rem] leading-relaxed text-[hsl(var(--ash))]">
                Two production-style applications from my résumé — multi-role platforms with
                relational backends, built end to end.
              </p>
            </Rise>
          </div>
        </div>

        <div className="space-y-16 pb-16 lg:space-y-24 lg:pb-24">
          {projects.map((project, i) => (
            <ProjectSpread key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectSpread({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const flip = index % 2 === 1;

  // slow parallax so the screen drifts against the copy as you scroll
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-4%", "4%"]);

  return (
    <article
      ref={ref}
      className="group border-t border-[hsl(var(--edge))] pt-8 lg:pt-10"
      aria-labelledby={`project-${project.slug}`}
    >
      {/* index line */}
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[hsl(var(--lime))]">
          {project.index} / {String(projects.length).padStart(2, "0")}
        </span>
        <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[hsl(var(--fog))]">
          {project.category} · {project.year}
        </span>
      </div>

      <div
        className={cn(
          "grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14",
          flip && "lg:[&>*:first-child]:order-2",
        )}
      >
        {/* ── Visual ─────────────────────────────────────── */}
        <Rise y={22} className="relative">
          <motion.div style={{ y }}>
            <div className="relative overflow-hidden border border-[hsl(var(--edge))] transition-colors duration-500 group-hover:border-[hsl(var(--chalk))]/25">
              <ProjectVisual project={project} />
            </div>
          </motion.div>

          {/* second screen, overlapping the first for depth */}
          {project.mockSecondary && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.15 }}
              className="pointer-events-none absolute -bottom-10 right-2 hidden w-[46%] border border-[hsl(var(--edge))] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.85)] md:block lg:-bottom-12 lg:right-4"
            >
              {(() => {
                const Secondary = screenFor(project.mockSecondary);
                return (
                  <div className="relative aspect-[16/10] overflow-hidden bg-[hsl(var(--carbon-2))]">
                    <div className="absolute inset-0 origin-top">
                      <Secondary className="h-full w-full" />
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}

          <div className="mt-3 flex items-center gap-3">
            <span className="font-mono text-[0.52rem] uppercase tracking-[0.14em] text-[hsl(var(--fog))]">
              Two screens
            </span>
            <div className="h-px flex-1 bg-[hsl(var(--edge))]" />
            <span className="font-mono text-[0.5rem] uppercase tracking-[0.1em] text-[hsl(var(--fog))]">
              {project.tech.length} technologies
            </span>
          </div>
        </Rise>

        {/* ── Copy ───────────────────────────────────────── */}
        <div className="lg:pt-2">
          <Rise delay={0.05}>
            <p className="meta mb-3">{project.role}</p>
            <h3
              id={`project-${project.slug}`}
              className="font-grotesk text-[1.85rem] font-semibold leading-[1.02] tracking-[-0.035em] sm:text-[2.4rem] lg:text-[2.7rem]"
            >
              {project.title}
            </h3>

            <p className="mt-4 max-w-prose text-[0.95rem] leading-[1.7] text-[hsl(var(--ash))]">
              {project.description}
            </p>
          </Rise>

          <Rise delay={0.08}>
            <div className="mt-6">
              <p className="meta mb-2.5">My contribution</p>
              <ul className="space-y-2">
                {project.contribution.map((c) => (
                  <li
                    key={c}
                    className="flex gap-3 text-[0.87rem] leading-relaxed text-[hsl(var(--ash))]"
                  >
                    <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-[hsl(var(--lime))]" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Rise>

          <Rise delay={0.11}>
            <div className="mt-6">
              <p className="meta mb-2.5">Stack</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="border border-[hsl(var(--edge))] px-2.5 py-1 font-mono text-[0.62rem] tracking-[0.03em] text-[hsl(var(--ash))] transition-colors duration-300 hover:border-[hsl(var(--lime))]/50 hover:text-[hsl(var(--chalk))]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Rise>

          <Rise delay={0.14}>
            <div className="mt-7 flex flex-wrap items-center gap-2.5">
              {project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-2 bg-[hsl(var(--lime))] px-4 py-2.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[hsl(var(--carbon))] transition-shadow duration-300 hover:shadow-[0_12px_36px_-14px_hsl(76_100%_57%/0.7)]"
                >
                  <ExternalLink className="h-3 w-3" />
                  Live demo
                  <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 border border-dashed border-[hsl(var(--edge))] px-4 py-2.5 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[hsl(var(--fog))]">
                  Demo on request
                </span>
              )}

              {project.codeUrl && (
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[hsl(var(--edge))] px-4 py-2.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[hsl(var(--chalk))] transition-colors hover:border-[hsl(var(--chalk))]/45 hover:bg-[hsl(var(--chalk))]/[0.04]"
                >
                  <GithubIcon className="h-3 w-3" />
                  Source
                </a>
              )}
            </div>

            {project.demoNote && (
              <p className="mt-2.5 max-w-sm font-mono text-[0.53rem] leading-relaxed tracking-[0.04em] text-[hsl(var(--fog))]">
                {project.demoNote}
              </p>
            )}
          </Rise>
        </div>
      </div>
    </article>
  );
}

const SCREENS = {
  form: StudentFormMock,
  records: StudentRecordsMock,
  dashboard: ExamDashboardMock,
  result: ExamResultMock,
} as const;

function screenFor(kind: keyof typeof SCREENS) {
  return SCREENS[kind];
}

/**
 * A project "screenshot" in a browser chrome frame.
 *
 * The screen is a hand-built vector mockup of the real application (see
 * components/ui/project-mocks), so it stays sharp at any DPI and ships no image
 * bytes. Hovering scales the screen inside the frame — a zoom, not a reflow.
 */
export function ProjectVisual({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  const { label } = project.visual;

  const Screen = screenFor(project.mock);

  return (
    <div
      className={cn(
        "group/visual relative overflow-hidden bg-[hsl(var(--carbon-2))]",
        compact ? "aspect-[16/10]" : "aspect-[16/11] sm:aspect-[16/10]",
      )}
    >
      {/* browser chrome */}
      <div className="absolute inset-x-0 top-0 z-10 flex items-center gap-1.5 border-b border-[hsl(var(--edge))] bg-[hsl(var(--carbon-3))] px-2.5 py-1.5 sm:px-3 sm:py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--chalk))]/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--chalk))]/14" />
        <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--chalk))]/10" />
        <span className="ml-2 flex-1 truncate rounded-sm bg-[hsl(var(--carbon))]/70 px-2 py-[2px] font-mono text-[0.45rem] tracking-[0.06em] text-[hsl(var(--fog))]">
          {label}
        </span>
      </div>

      {/* the screen */}
      <div className="absolute inset-x-0 bottom-0 top-[1.55rem] overflow-hidden sm:top-[1.9rem]">
        <div className="h-full w-full origin-top transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]">
          <Screen className="h-full w-full" />
        </div>
      </div>

      {/* caption */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/55 to-transparent px-3 pb-2 pt-6">
        <span className="font-mono text-[0.5rem] uppercase tracking-[0.18em] text-white/60">
          Fig. {project.index} — {project.category}
        </span>
        <span className="poster text-[1.2rem] leading-none text-white/20">{project.index}</span>
      </div>
    </div>
  );
}

export { EASE_OUT_EXPO };
