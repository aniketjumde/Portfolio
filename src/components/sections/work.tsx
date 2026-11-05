import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import { projects, type Project } from "@/data/work";
import { EASE_OUT_EXPO } from "@/components/motion/easing";
import { DrawLine, PosterLinesOnScroll, Rise } from "@/components/motion/text";
import { GithubIcon } from "@/components/ui/brand-icons";
import { usePrefersReducedMotion } from "@/hooks/use-site";
import { cn } from "@/lib/utils";

/**
 * The centrepiece. A large project index where hovering a row changes focus,
 * and a floating preview tracks the pointer on desktop.
 */
export function Work() {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const reduced = usePrefersReducedMotion();
  const showPreview = !reduced;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 140, damping: 22, mass: 0.5 });
  const py = useSpring(my, { stiffness: 140, damping: 22, mass: 0.5 });

  // Guard against SSR/undefined width and keep the tilt correct after a resize.
  const rotateY = useTransform(px, (v) => {
    const w = typeof window === "undefined" ? 1440 : window.innerWidth;
    return (v / w - 0.5) * 10;
  });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!showPreview) return;
    mx.set(e.clientX);
    my.set(e.clientY);
  }

  return (
    <section id="work" className="relative">
      <div className="mx-auto w-full max-w-[104rem] px-5 sm:px-8">
        <DrawLine />

        <div className="py-16 lg:py-24">
          {/* Header */}
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

          {/* Interactive index */}
          <div
            className="relative mt-12"
            onMouseMove={onMove}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <ul className="border-t border-[hsl(var(--edge))]">
              {projects.map((project, i) => (
                <ProjectRow
                  key={project.slug}
                  project={project}
                  index={i}
                  isActive={active === i}
                  onActivate={() => setActive(i)}
                  dimmed={hovering && active !== i}
                />
              ))}
            </ul>

            {/* Floating preview (desktop only) */}
            {showPreview && (
              <AnimatePresence>
                {hovering && (
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none fixed z-30 hidden lg:block"
                    style={{ left: px, top: py, rotateY }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                  >
                    <div className="w-[24rem] -translate-x-1/2 -translate-y-1/2">
                      <ProjectVisual project={projects[active]} compact />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>

          {/* Expanded detail for the focused project */}
          <div className="mt-14 grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:gap-16">
            <div className="relative">
              <ProjectVisual project={projects[active]} />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={projects[active].slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
              >
                <p className="meta mb-3">
                  {projects[active].category} · {projects[active].year}
                </p>
                <h3 className="font-grotesk text-[1.9rem] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-[2.4rem]">
                  {projects[active].title}
                </h3>

                <p className="mt-4 max-w-prose text-[0.94rem] leading-[1.7] text-[hsl(var(--ash))]">
                  {projects[active].description}
                </p>

                <div className="mt-6">
                  <p className="meta mb-2.5">My contribution</p>
                  <ul className="space-y-2">
                    {projects[active].contribution.map((c) => (
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

                <div className="mt-6">
                  <p className="meta mb-2.5">Stack</p>
                  <div className="flex flex-wrap gap-1.5">
                    {projects[active].tech.map((t) => (
                      <span
                        key={t}
                        className="border border-[hsl(var(--edge))] px-2.5 py-1 font-mono text-[0.62rem] tracking-[0.03em] text-[hsl(var(--ash))]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-2.5">
                  {projects[active].codeUrl && (
                    <a
                      href={projects[active].codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 border border-[hsl(var(--edge))] px-4 py-2.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] transition-colors hover:border-[hsl(var(--chalk))]/45 hover:bg-[hsl(var(--chalk))]/[0.04]"
                    >
                      <GithubIcon className="h-3 w-3" />
                      Source code
                    </a>
                  )}
                  <span className="inline-flex items-center gap-2 border border-dashed border-[hsl(var(--edge))] px-4 py-2.5 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[hsl(var(--fog))]">
                    {projects[active].codeUrl ? "No public demo" : "Demo on request"}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectRow({
  project,
  index,
  isActive,
  onActivate,
  dimmed,
}: {
  project: Project;
  index: number;
  isActive: boolean;
  onActivate: () => void;
  dimmed: boolean;
}) {
  return (
    <li className="border-b border-[hsl(var(--edge))]">
      <button
        type="button"
        onMouseEnter={onActivate}
        onFocus={onActivate}
        onClick={onActivate}
        aria-label={`Show details for ${project.title}`}
        className={cn(
          "group grid w-full grid-cols-[2.2rem_1fr_auto] items-center gap-3 py-5 text-left transition-opacity duration-500 sm:grid-cols-[3rem_1fr_12rem_auto] sm:gap-5 sm:py-7",
          dimmed ? "opacity-45" : "opacity-100",
        )}
      >
        <span className="font-mono text-[0.6rem] text-[hsl(var(--fog))]">{project.index}</span>

        <span
          className={cn(
            "poster transition-colors duration-400",
            isActive ? "text-[hsl(var(--lime))]" : "text-[hsl(var(--chalk))]",
          )}
        >
          {/* Mobile keeps the stacked poster title; desktop can take the full name. */}
          <span className="block text-[1.7rem] leading-[0.86] sm:hidden">
            {project.shortTitle.split("\n").map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </span>
          <span className="hidden text-[2.6rem] leading-none sm:block lg:text-[3.2rem]">
            {project.title.toUpperCase()}
          </span>
        </span>

        <span className="hidden font-mono text-[0.6rem] uppercase tracking-[0.12em] text-[hsl(var(--fog))] sm:block">
          {project.category}
        </span>

        <span
          className={cn(
            "grid h-8 w-8 place-items-center border transition-all duration-400",
            isActive
              ? "border-[hsl(var(--lime))] bg-[hsl(var(--lime))] text-[hsl(var(--carbon))]"
              : "border-[hsl(var(--edge))] text-[hsl(var(--ash))]",
          )}
        >
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </button>
    </li>
  );
}

/**
 * A CSS-drawn project visual — a mock interface over a duotone field.
 * Avoids any image payload while still giving each project a distinct look.
 */
export function ProjectVisual({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  const { from, to, accent, label } = project.visual;

  return (
    <div
      className={cn(
        "relative overflow-hidden border border-[hsl(var(--edge))]",
        compact ? "aspect-[16/10]" : "aspect-[4/3] lg:aspect-[5/4]",
      )}
      style={{ background: `linear-gradient(155deg, ${from} 0%, ${to} 100%)` }}
      aria-hidden="true"
    >
      {/* grid */}
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />
      {/* accent bloom */}
      <div
        className="absolute -right-10 -top-10 h-32 w-32 rounded-full blur-[50px]"
        style={{ background: accent, opacity: 0.35 }}
      />

      {/* mock window */}
      <div className="absolute inset-x-4 top-5 overflow-hidden border border-white/12 bg-black/40 sm:inset-x-6">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-2.5 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/12" />
          <span className="ml-2 font-mono text-[0.5rem] tracking-[0.1em] text-white/40">
            {label}
          </span>
        </div>

        <div className="space-y-1.5 p-3">
          <div className="h-1.5 w-2/5 rounded-full" style={{ background: accent }} />
          <div className="h-1.5 w-3/5 rounded-full bg-white/14" />
          <div className="mt-2.5 grid grid-cols-3 gap-1.5">
            <div className="h-8 rounded-sm bg-white/8" />
            <div className="h-8 rounded-sm bg-white/12" />
            <div className="h-8 rounded-sm bg-white/8" />
          </div>
          <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-white/10" />
        </div>
      </div>

      {/* index caption */}
      <div className="absolute inset-x-4 bottom-3 flex items-end justify-between sm:inset-x-6">
        <span className="font-mono text-[0.5rem] uppercase tracking-[0.18em] text-white/40">
          Fig. {project.index}
        </span>
        <span className="poster text-[1.5rem] leading-none text-white/12">{project.index}</span>
      </div>
    </div>
  );
}
