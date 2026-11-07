import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { EASE_OUT_EXPO } from "@/components/motion/easing";
import { timeline } from "@/data/timeline";
import { cn } from "@/lib/utils";

/**
 * Experience & education on a centre rail.
 *
 * Follows the reference: a vertical line down the middle that fills with the
 * accent as you scroll, entries alternating left and right on desktop and
 * collapsing to a single left-hand rail on mobile.
 */
export function Experience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 75%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.4 });
  const height = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="section relative">
      <div className="shell relative z-10">
        <SectionHeading
          eyebrow="04 — Experience"
          title="Professional"
          accent="journey"
          lede="A degree in progress running alongside continuous applied development — the record behind the one-year-plus of hands-on Java."
        />

        <div ref={trackRef} className="relative mx-auto mt-14 max-w-4xl">
          {/* rail */}
          <div className="rail">
            <motion.div style={{ height }} className="rail-fill" />
          </div>

          <ol className="space-y-8 md:space-y-0">
            {timeline.map((item, i) => {
              const isEducation = item.kind === "Education";
              const Icon = isEducation ? GraduationCap : Briefcase;
              // alternate sides on desktop, always right of the rail on mobile
              const rightSide = i % 2 === 1;

              return (
                <li key={`${item.title}-${item.period}`} className="relative pl-12 md:pl-0 md:py-4">
                  {/* node */}
                  <span aria-hidden="true" className="rail-node" />

                  <div
                    className={cn(
                      "md:grid md:grid-cols-2 md:gap-10",
                      rightSide && "md:[&>*:first-child]:order-2",
                    )}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 24, x: 0 }}
                      whileInView={{ opacity: 1, y: 0, x: 0 }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
                      className={cn(
                        "card card-lit p-5 transition-transform duration-300 hover:-translate-y-1",
                        rightSide ? "md:ml-0" : "md:mr-0",
                      )}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[hsl(var(--violet))]/30 bg-[hsl(var(--violet))]/10 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-[hsl(var(--violet))]">
                          <Icon className="h-3 w-3" />
                          {item.kind}
                        </span>
                        <span className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-[hsl(var(--fog))]">
                          {item.period}
                        </span>
                      </div>

                      <h3 className="mt-3.5 text-[1.02rem] font-semibold leading-snug text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-[0.82rem] text-[hsl(var(--fog))]">{item.org}</p>

                      {item.metric && (
                        <span className="mt-3 inline-block rounded-md border border-[hsl(0_0%_100%/0.12)] bg-white/[0.04] px-2 py-0.5 font-mono text-[0.62rem] text-[hsl(var(--ash))]">
                          {item.metric}
                        </span>
                      )}

                      <p className="mt-3 text-[0.86rem] leading-[1.7] text-[hsl(var(--ash))]">
                        {item.summary}
                      </p>

                      {item.notes.length > 0 && (
                        <ul className="mt-3 space-y-1.5">
                          {item.notes.map((n) => (
                            <li
                              key={n}
                              className="flex gap-2.5 text-[0.8rem] leading-relaxed text-[hsl(var(--fog))]"
                            >
                              <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-[hsl(var(--violet))]/70" />
                              {n}
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
