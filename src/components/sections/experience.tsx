import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { DrawRule, MaskedLines, Reveal } from "@/components/motion/primitives";
import { SectionHeader } from "@/components/ui/section-header";
import { timeline } from "@/data/timeline";
import { cn } from "@/lib/utils";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.4 });
  const height = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative">
      <div className="mx-auto w-full max-w-[104rem] px-4 sm:px-7">
        <DrawRule />

        <div className="py-14 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:gap-16">
            <div>
              <SectionHeader index="04" title="Experience & Education" />
              <MaskedLines
                as="h3"
                delay={0.1}
                className="display-lg mt-6"
                lines={[
                  <span key="1">Study, practice,</span>,
                  <span key="2">
                    <span className="italic-accent text-[hsl(var(--oxide))]">repeat</span>.
                  </span>,
                ]}
              />
              <Reveal delay={0.15}>
                <p className="mt-4 max-w-sm text-[0.88rem] leading-relaxed text-[hsl(var(--ink-soft))]">
                  A degree in progress alongside continuous applied development — the
                  record behind the one-year-plus of hands-on Java.
                </p>
              </Reveal>
            </div>

            <div ref={ref} className="relative">
              {/* Rail */}
              <div
                aria-hidden="true"
                className="absolute left-[3px] top-2 h-full w-px bg-[hsl(var(--rule))] sm:left-[5px]"
              >
                <motion.div
                  style={{ height }}
                  className="w-full bg-[hsl(var(--oxide))]"
                />
              </div>

              <ol className="space-y-9 pl-7 sm:pl-10">
                {timeline.map((item, i) => (
                  <li key={`${item.title}-${item.period}`} className="relative">
                    <motion.span
                      aria-hidden="true"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{ duration: 0.45, delay: 0.05 }}
                      className={cn(
                        "absolute -left-7 top-2 h-2 w-2 rounded-full sm:-left-10",
                        item.kind === "Practice"
                          ? "bg-[hsl(var(--oxide))] ring-4 ring-[hsl(var(--oxide))]/15"
                          : "border border-[hsl(var(--ink))] bg-[hsl(var(--paper))]",
                      )}
                    />

                    <Reveal y={18} delay={i * 0.04}>
                      <div className="group">
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[hsl(var(--oxide))]">
                            {item.period}
                          </span>
                          <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[hsl(var(--ink-faint))]">
                            {item.kind}
                          </span>
                          {item.metric && (
                            <span className="ml-auto border border-[hsl(var(--rule))] px-2 py-0.5 font-mono text-[0.58rem] tracking-[0.06em] text-[hsl(var(--ink-soft))]">
                              {item.metric}
                            </span>
                          )}
                        </div>

                        <h4 className="mt-2 font-display text-[1.25rem] font-semibold leading-snug transition-colors duration-300 group-hover:text-[hsl(var(--oxide))] sm:text-[1.4rem]">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-[0.84rem] text-[hsl(var(--ink-soft))]">
                          {item.org}
                        </p>
                        <p className="mt-2.5 max-w-xl text-[0.86rem] leading-relaxed text-[hsl(var(--ink-soft))]">
                          {item.summary}
                        </p>

                        {item.notes.length > 0 && (
                          <ul className="mt-3 space-y-1.5">
                            {item.notes.map((note) => (
                              <li
                                key={note}
                                className="flex gap-2.5 text-[0.82rem] leading-relaxed text-[hsl(var(--ink-soft))]"
                              >
                                <span className="mt-[0.5em] h-px w-3 shrink-0 bg-[hsl(var(--ink-faint))]" />
                                {note}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
