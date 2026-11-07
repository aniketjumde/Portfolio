import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { GithubIcon } from "@/components/ui/brand-icons";
import { ProjectVisual } from "@/components/ui/project-visual";
import { EASE_OUT_EXPO } from "@/components/motion/easing";
import { projects, type Project } from "@/data/work";
import { useResume } from "@/hooks/use-resume";

/**
 * Project showcase.
 *
 * Two full-width cards, alternating which side the artwork sits on, matching
 * the reference's rhythm of stamp → category → title → description → links.
 * Each card carries a real illustration of the application rather than a
 * decorative gradient, plus its live demo and repository where those exist.
 */
export function Projects() {
  return (
    <section id="projects" className="section relative">
      <div className="shell relative z-10">
        <SectionHeading
          eyebrow="02 — Projects"
          title="What I've"
          accent="built"
          lede="Two multi-role platforms built end to end — relational schema, servlet layer and interface."
        />

        <div className="mt-12 space-y-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 text-center text-[0.85rem] text-[hsl(var(--fog))]"
        >
          More experiments live on{" "}
          <a
            href="https://github.com/aniketjumde"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[hsl(var(--violet))] underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            GitHub
          </a>
          .
        </motion.p>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { open: openResume } = useResume();
  const flipped = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, ease: EASE_OUT_EXPO }}
      className="project-card card card-lit group overflow-hidden p-5 sm:p-6 lg:p-7"
    >
      <div
        className={`grid items-center gap-6 lg:grid-cols-2 lg:gap-10 ${
          flipped ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* ── Artwork ─────────────────────────────────────── */}
        <div className="project-media">
          <ProjectVisual project={project} />
        </div>

        {/* ── Copy ────────────────────────────────────────── */}
        <div className="lg:px-2">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full border border-[hsl(var(--violet))]/35 bg-[hsl(var(--violet))]/10 px-2.5 py-1 font-mono text-[0.62rem] font-medium uppercase tracking-[0.12em] text-[hsl(var(--violet))]">
              {project.category}
            </span>
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[hsl(var(--fog))]">
              {project.stamp}
            </span>
          </div>

          <h3 className="mt-4 text-[1.4rem] font-bold leading-tight tracking-[-0.02em] text-white sm:text-[1.65rem]">
            {project.title}
          </h3>

          <p className="mt-3 text-[0.9rem] leading-[1.72] text-[hsl(var(--ash))]">
            {project.tagline}
          </p>

          <ul className="mt-4 space-y-1.5">
            {project.contribution.map((c) => (
              <li
                key={c}
                className="flex gap-2.5 text-[0.82rem] leading-relaxed text-[hsl(var(--fog))]"
              >
                <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-[hsl(var(--violet))]" />
                {c}
              </li>
            ))}
          </ul>

          {/* stack */}
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-md border border-[hsl(0_0%_100%/0.1)] bg-white/[0.03] px-2 py-1 font-mono text-[0.62rem] text-[hsl(var(--ash))]"
              >
                {t}
              </span>
            ))}
          </div>

          {/* links */}
          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary !px-4 !py-2.5 !text-[0.8rem]"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                View live
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ) : (
              <button
                type="button"
                onClick={openResume}
                className="btn btn-ghost !px-4 !py-2.5 !text-[0.8rem]"
                title="No public demo — details available in the résumé"
              >
                Demo on request
              </button>
            )}

            {project.codeUrl && (
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost !px-4 !py-2.5 !text-[0.8rem]"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                GitHub
              </a>
            )}
          </div>

          {project.demoNote && (
            <p className="mt-2.5 font-mono text-[0.6rem] leading-relaxed text-[hsl(var(--fog))]">
              {project.demoNote}
            </p>
          )}
        </div>
      </div>
    </motion.article>
  );
}
