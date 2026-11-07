import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { DrawLine, PosterLinesOnScroll, Rise } from "@/components/motion/text";
import { EASE_OUT_EXPO } from "@/components/motion/easing";
import { timeline } from "@/data/timeline";
import { cn } from "@/lib/utils";

export function Experience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 72%", "end 65%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.4 });
  const width = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative">
      <div className="mx-auto w-full max-w-[104rem] px-5 sm:px-8">
        <DrawLine />

        <div className="py-16 lg:py-24">
          <div className="grid gap-6 lg:grid-cols-[0.55fr_0.45fr] lg:items-end">
            <div>
              <Rise>
                <p className="meta mb-4">
                  <span className="text-[hsl(var(--lime))]">04</span> — Experience &amp; education
                </p>
              </Rise>
              <PosterLinesOnScroll
                as="h2"
                className="poster-lg"
                lines={[
                  <span key="1">STUDY,</span>,
                  <span key="2">
                    PRACTICE,{" "}
                    <span className="text-[hsl(var(--lime))]">REPEAT.</span>
                  </span>,
                ]}
              />
            </div>
            <Rise delay={0.1}>
              <p className="max-w-sm font-grotesk text-[0.98rem] leading-relaxed text-[hsl(var(--ash))]">
                A degree in progress running alongside continuous applied development —
                the record behind the 1+ years of hands-on Java.
              </p>
            </Rise>
          </div>

          {/* Horizontal rail with scroll-linked fill */}
          <div ref={trackRef} className="mt-14">
            <div className="relative h-px w-full bg-[hsl(var(--edge))]">
              <motion.div
                style={{ width }}
                className="absolute inset-y-0 left-0 bg-[hsl(var(--lime))]"
              />
            </div>

            <ol className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {timeline.map((item, i) => (
                <motion.li
                  key={`${item.title}-${item.period}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ delay: i * 0.07, duration: 0.65, ease: EASE_OUT_EXPO }}
                  className="group relative"
                >
                  {/* node */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -top-[2.15rem] left-0 h-2 w-2 rounded-full transition-colors duration-300",
                      item.kind === "Practice"
                        ? "bg-[hsl(var(--lime))] ring-4 ring-[hsl(var(--lime))]/15"
                        : "bg-[hsl(var(--carbon))] ring-1 ring-[hsl(var(--edge))] group-hover:ring-[hsl(var(--lime))]",
                    )}
                  />

                  <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-[hsl(var(--lime))]">
                    {item.period}
                  </p>

                  <h3 className="mt-2 font-grotesk text-[1.05rem] font-semibold leading-tight tracking-[-0.02em]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[0.8rem] leading-snug text-[hsl(var(--fog))]">
                    {item.org}
                  </p>

                  {item.metric && (
                    <p className="mt-2 inline-block border border-[hsl(var(--edge))] px-2 py-0.5 font-mono text-[0.56rem] tracking-[0.06em] text-[hsl(var(--ash))]">
                      {item.metric}
                    </p>
                  )}

                  <p className="mt-3 text-[0.82rem] leading-relaxed text-[hsl(var(--ash))]">
                    {item.summary}
                  </p>

                  {item.notes.length > 0 && (
                    <ul className="mt-2.5 space-y-1">
                      {item.notes.map((n) => (
                        <li
                          key={n}
                          className="flex gap-2 text-[0.78rem] leading-relaxed text-[hsl(var(--fog))]"
                        >
                          <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-[hsl(var(--edge))]" />
                          {n}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.li>
              ))}
            </ol>
          </div>

        </div>
      </div>
    </section>
  );
}
