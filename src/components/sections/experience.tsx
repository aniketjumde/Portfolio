import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Briefcase, CheckCircle2, GraduationCap, Sparkles } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal, EASE } from "@/components/motion/reveal";
import { experience } from "@/data/experience";
import { cn } from "@/lib/utils";

const typeIcon = {
  Education: GraduationCap,
  Project: Briefcase,
  Certification: Sparkles,
} as const;

export function Experience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 75%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  const scaleY = useTransform(progress, [0, 1], [0, 1]);

  return (
    <Section id="experience" divided>
      <SectionHeading
        eyebrow="03 — Timeline"
        title="A record of"
        accent="deliberate practice"
        description="No employment history yet — but a consistent record of shipping complete systems alongside a full-time degree."
      />

      <div ref={trackRef} className="relative mt-14 pl-8 sm:pl-0">
        {/* Rail */}
        <div
          aria-hidden="true"
          className="absolute left-[7px] top-2 h-full w-px bg-border/70 sm:left-1/2 sm:-translate-x-1/2"
        >
          <motion.div
            style={{ scaleY }}
            className="h-full w-full origin-top bg-[linear-gradient(180deg,hsl(var(--jade)),hsl(var(--cyan)),hsl(var(--violet)))]"
          />
        </div>

        <ol className="space-y-10 sm:space-y-0">
          {experience.map((item, index) => {
            const Icon = typeIcon[item.type];
            const isLeft = index % 2 === 0;

            return (
              <li
                key={`${item.title}-${item.period}`}
                className={cn(
                  "relative sm:grid sm:grid-cols-2 sm:gap-12",
                  index > 0 && "sm:pt-14",
                )}
              >
                {/* Node */}
                <span
                  aria-hidden="true"
                  className="absolute -left-8 top-1.5 z-10 grid h-4 w-4 place-items-center sm:left-1/2 sm:-translate-x-1/2"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
                    className="grid h-4 w-4 place-items-center rounded-full border-2 border-primary bg-background"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  </motion.span>
                </span>

                {/* Card */}
                <div
                  className={cn(
                    isLeft ? "sm:col-start-1 sm:pr-4" : "sm:col-start-2 sm:pl-4",
                  )}
                >
                  <Reveal y={22} delay={0.05}>
                    <motion.article
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="surface surface-hover group relative overflow-hidden rounded-2xl p-6"
                    >
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      />

                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/[0.08] px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-primary">
                          <Icon className="h-3 w-3" />
                          {item.type}
                        </span>
                        <span className="font-mono text-[0.66rem] tracking-wide text-muted-foreground">
                          {item.period}
                        </span>
                        {item.grade && (
                          <span className="ml-auto rounded-full border border-border/70 bg-secondary/60 px-2.5 py-1 text-[0.66rem] font-medium text-foreground/80">
                            {item.grade}
                          </span>
                        )}
                      </div>

                      <h3 className="font-display text-[1.05rem] font-semibold leading-snug">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-[0.82rem] text-muted-foreground">
                        {item.org}
                        {item.location && ` · ${item.location}`}
                      </p>

                      <p className="mt-3 text-[0.82rem] leading-relaxed text-muted-foreground">
                        {item.summary}
                      </p>

                      <ul className="mt-4 space-y-2">
                        {item.points.map((point) => (
                          <li key={point} className="flex gap-2.5 text-[0.79rem] leading-relaxed text-muted-foreground">
                            <CheckCircle2 className="mt-[3px] h-3.5 w-3.5 shrink-0 text-primary/70" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.article>
                  </Reveal>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
