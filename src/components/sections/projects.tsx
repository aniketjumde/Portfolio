import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useRef, useState } from "react";
import { DrawRule, MaskedLines, Reveal } from "@/components/motion/primitives";
import { SectionHeader } from "@/components/ui/section-header";
import { projects, type Project } from "@/data/work";
import { GithubIcon } from "@/components/ui/brand-icons";
import { usePrefersReducedMotion } from "@/hooks/use-editorial";
import { EDITORIAL_EASE } from "@/components/motion/primitives";

export function Projects() {
  return (
    <section id="projects" className="relative">
      <div className="mx-auto w-full max-w-[104rem] px-4 sm:px-7">
        <DrawRule />

        <div className="py-14 lg:py-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <SectionHeader index="05" title="Selected Projects" />
              <MaskedLines
                as="h3"
                delay={0.1}
                className="display-lg mt-6 max-w-2xl"
                lines={[
                  <span key="1">Two systems,</span>,
                  <span key="2">
                    built to{" "}
                    <span className="italic-accent text-[hsl(var(--oxide))]">hold up</span>.
                  </span>,
                ]}
              />
            </div>
            <Reveal delay={0.15}>
              <p className="max-w-xs text-[0.86rem] leading-relaxed text-[hsl(var(--ink-soft))]">
                Both taken from the résumé — Java web applications with relational
                backends, multi-role access and real CRUD requirements.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 space-y-6">
            {projects.map((project, i) => (
              <ProjectRow key={project.slug} project={project} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const reduced = usePrefersReducedMotion();
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [3, -3]), {
    stiffness: 180,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-4, 4]), {
    stiffness: 180,
    damping: 22,
  });

  const flip = index % 2 === 1;

  return (
    <Reveal y={30}>
      <article
        className="group relative border border-[hsl(var(--rule))] bg-[hsl(var(--paper-2))] transition-colors duration-500 hover:border-[hsl(var(--ink))]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          mx.set(0.5);
          my.set(0.5);
        }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - rect.left) / rect.width);
          my.set((e.clientY - rect.top) / rect.height);
        }}
      >
        <div
          className={`grid lg:grid-cols-2 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}
        >
          {/* ── Plate ─────────────────────────────────────── */}
          <div className="relative overflow-hidden border-b border-[hsl(var(--rule))] lg:border-b-0 lg:border-r">
            <motion.div
              style={
                !reduced && hovered
                  ? { rotateX, rotateY, transformPerspective: 1400 }
                  : undefined
              }
              className="h-full"
            >
              <ProjectPlate project={project} />
            </motion.div>

            <span className="absolute left-3 top-3 font-mono text-[0.58rem] tracking-[0.16em] text-white/45">
              FIG. {project.index}
            </span>
          </div>

          {/* ── Detail ────────────────────────────────────── */}
          <div className="flex flex-col p-6 sm:p-8 lg:p-10">
            <div className="flex items-baseline gap-3">
              <span className="tick">{project.index}</span>
              <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-[hsl(var(--ink-faint))]">
                {project.year} · {project.role}
              </span>
            </div>

            <h4 className="mt-3 font-display text-[1.7rem] font-semibold leading-[1.05] tracking-tight sm:text-[2.1rem]">
              {project.title}
            </h4>
            <p className="mt-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[hsl(var(--oxide))]">
              {project.kicker}
            </p>

            <p className="mt-5 max-w-prose text-[0.9rem] leading-[1.7] text-[hsl(var(--ink-soft))]">
              {project.summary}
            </p>

            <ul className="mt-5 space-y-2">
              {project.highlights.map((h) => (
                <li
                  key={h}
                  className="flex gap-3 text-[0.83rem] leading-relaxed text-[hsl(var(--ink-soft))]"
                >
                  <span className="mt-[0.62em] h-1 w-1 shrink-0 rounded-full bg-[hsl(var(--oxide))]" />
                  {h}
                </li>
              ))}
            </ul>

            {/* Stack */}
            <div className="mt-6">
              <p className="label mb-2">Stack</p>
              <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[0.66rem] tracking-[0.04em] text-[hsl(var(--ink-soft))]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-auto flex flex-wrap items-center gap-2 pt-7">
              {project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-2 border border-[hsl(var(--ink))] bg-[hsl(var(--ink))] px-4 py-2.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[hsl(var(--paper))] transition-colors hover:bg-[hsl(var(--oxide))] hover:border-[hsl(var(--oxide))]"
                >
                  <ExternalLink className="h-3 w-3" />
                  Live demo
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 border border-dashed border-[hsl(var(--rule))] px-4 py-2.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[hsl(var(--ink-faint))]">
                  Live demo on request
                </span>
              )}

              {project.codeUrl && (
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[hsl(var(--rule))] px-4 py-2.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[hsl(var(--ink-soft))] transition-colors hover:border-[hsl(var(--ink))] hover:text-[hsl(var(--ink))]"
                >
                  <GithubIcon className="h-3 w-3" />
                  Source
                </a>
              )}
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/**
 * A printed plate for each project, drawn entirely in CSS/SVG — a mock
 * browser window over a flat colour field, with an offset duotone block.
 */
function ProjectPlate({ project }: { project: Project }) {
  const { bg, accent, mono } = project.plate;

  return (
    <div
      className="relative min-h-[17rem] overflow-hidden p-5 sm:p-7"
      style={{ backgroundColor: bg }}
      aria-hidden="true"
    >
      {/* offset duotone block */}
      <div
        className="absolute -right-10 -top-10 h-40 w-40 opacity-20"
        style={{ backgroundColor: accent }}
      />
      <div
        className="absolute -bottom-14 -left-8 h-32 w-32 opacity-10"
        style={{ backgroundColor: accent }}
      />

      {/* grid */}
      <div
        className="absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* mock window */}
      <div className="relative overflow-hidden border border-white/15 bg-black/35 shadow-2xl backdrop-blur-sm">
        <div className="flex items-center gap-1.5 border-b border-white/12 px-3 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/22" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
          <span className="ml-2 font-mono text-[0.52rem] tracking-[0.1em] text-white/40">
            {mono}
          </span>
        </div>

        <div className="space-y-2 p-3.5">
          <div className="h-1.5 w-2/5 rounded-full" style={{ backgroundColor: accent }} />
          <div className="h-1.5 w-3/5 rounded-full bg-white/16" />
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {[0.28, 0.45, 0.2].map((h, i) => (
              <div
                key={i}
                className="rounded-sm bg-white/10"
                style={{ height: `${h * 60 + 18}px` }}
              />
            ))}
          </div>
          <div className="mt-2 h-1.5 w-1/2 rounded-full bg-white/10" />
        </div>
      </div>

      {/* caption strip */}
      <div className="relative mt-4 flex items-center justify-between font-mono text-[0.52rem] uppercase tracking-[0.18em] text-white/40">
        <span>{project.kicker}</span>
        <span>{project.year}</span>
      </div>

      {/* sheen on hover */}
      <div className="absolute inset-0 translate-y-full bg-gradient-to-t from-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-y-0" />
    </div>
  );
}
