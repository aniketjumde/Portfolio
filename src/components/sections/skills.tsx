import { motion } from "framer-motion";
import { DrawLine, PosterLinesOnScroll, Rise } from "@/components/motion/text";
import { EASE_OUT_EXPO } from "@/components/motion/easing";
import { skillGroups } from "@/data/skills";
import { achievements } from "@/data/credentials";
import { SkillsSphere } from "@/components/experience/skills-sphere";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Skills as an explorable object, not a list of bars.
 *
 * The sphere carries the breadth; the ledger underneath carries the detail.
 * Selecting a category dims the others so a recruiter can scan vertically.
 * No proficiency percentages — the résumé makes no such claims.
 */
export function Skills() {
  const [focus, setFocus] = useState<string | null>(null);

  return (
    <section id="skills" className="relative overflow-hidden">
      <div className="mx-auto w-full max-w-[104rem] px-5 sm:px-8">
        <DrawLine />

        <div className="py-16 lg:py-24">
          <div className="grid gap-6 lg:grid-cols-[0.55fr_0.45fr] lg:items-end">
            <div>
              <Rise>
                <p className="meta mb-4">
                  <span className="text-[hsl(var(--lime))]">03</span> — Technical expertise
                </p>
              </Rise>
              <PosterLinesOnScroll
                as="h2"
                className="poster-lg"
                lines={[
                  <span key="1">THE</span>,
                  <span key="2" className="outline-type">
                    TOOLKIT.
                  </span>,
                ]}
              />
            </div>
            <Rise delay={0.1}>
              <p className="max-w-sm font-grotesk text-[0.98rem] leading-relaxed text-[hsl(var(--ash))]">
                Six categories, taken directly from my résumé. No proficiency scores —
                just what I actually work with.
              </p>
            </Rise>
          </div>

          {/* ── Sphere + legend ─────────────────────────────── */}
          <div className="mt-12 grid items-center gap-8 lg:grid-cols-[1fr_0.85fr] lg:gap-4">
            <div className="relative">
              <SkillsSphere className="mx-auto h-[19rem] w-full max-w-[26rem] sm:h-[24rem] lg:h-[27rem] lg:max-w-none" />
            </div>

            <div>
              <p className="meta mb-3">Categories</p>
              <ul className="border-t border-[hsl(var(--edge))]">
                {skillGroups.map((g, i) => (
                  <li key={g.id} className="border-b border-[hsl(var(--edge))]">
                    <button
                      type="button"
                      onMouseEnter={() => setFocus(g.id)}
                      onMouseLeave={() => setFocus(null)}
                      onFocus={() => setFocus(g.id)}
                      onBlur={() => setFocus(null)}
                      className="flex w-full items-baseline gap-3 py-2.5 text-left"
                    >
                      <span className="font-mono text-[0.55rem] text-[hsl(var(--fog))]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "font-grotesk text-[0.95rem] font-medium tracking-[-0.015em] transition-colors duration-300",
                          focus === g.id
                            ? "text-[hsl(var(--lime))]"
                            : "text-[hsl(var(--chalk))]",
                        )}
                      >
                        {g.title}
                      </span>
                      <span className="ml-auto font-mono text-[0.55rem] tabular-nums text-[hsl(var(--fog))]">
                        {String(g.items.length).padStart(2, "0")}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              <p className="mt-3 font-mono text-[0.55rem] uppercase leading-relaxed tracking-[0.14em] text-[hsl(var(--fog))]">
                Hover a category to isolate it below
              </p>
            </div>
          </div>

          {/* ── Ledger ──────────────────────────────────────── */}
          <div className="mt-4 grid gap-px border border-[hsl(var(--edge))] bg-[hsl(var(--edge))] sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group, i) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.05, duration: 0.6, ease: EASE_OUT_EXPO }}
                className={cn(
                  "group relative bg-[hsl(var(--carbon))] p-6 transition-all duration-500",
                  focus === null || focus === group.id
                    ? "opacity-100 hover:bg-[hsl(var(--carbon-2))]"
                    : "opacity-35",
                )}
              >
                <span
                  aria-hidden="true"
                  className="absolute right-0 top-0 h-6 w-6 origin-top-right scale-0 bg-[hsl(var(--lime))] transition-transform duration-400 group-hover:scale-100"
                  style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
                />

                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[0.55rem] tracking-[0.16em] text-[hsl(var(--fog))]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[0.55rem] tabular-nums text-[hsl(var(--lime))]">
                    {String(group.items.length).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-4 font-grotesk text-[1.18rem] font-semibold tracking-[-0.025em] transition-colors duration-300 group-hover:text-[hsl(var(--lime))]">
                  {group.title}
                </h3>
                <p className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-[hsl(var(--fog))]">
                  {group.note}
                </p>

                <ul className="mt-4 space-y-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-2 text-[0.83rem] leading-snug text-[hsl(var(--ash))]"
                    >
                      <span className="h-px w-2.5 shrink-0 translate-y-[-0.15em] bg-[hsl(var(--edge))]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* ── Achievement strip ───────────────────────────── */}
          <div className="mt-6 grid gap-px border border-[hsl(var(--edge))] bg-[hsl(var(--edge))] sm:grid-cols-3">
            {achievements.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="bg-[hsl(var(--carbon-2))] p-5"
              >
                <p className="poster text-[2rem] leading-none text-[hsl(var(--lime))]">
                  {a.metric}
                </p>
                <p className="mt-2.5 text-[0.84rem] font-medium leading-snug text-[hsl(var(--chalk))]">
                  {a.title}
                </p>
                <p className="mt-1.5 text-[0.76rem] leading-relaxed text-[hsl(var(--fog))]">
                  {a.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
