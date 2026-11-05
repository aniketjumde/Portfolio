import { motion } from "framer-motion";
import { DrawLine, PosterLinesOnScroll, Rise } from "@/components/motion/text";
import { EASE_OUT_EXPO } from "@/components/motion/easing";
import { skillGroups } from "@/data/skills";
import { achievements } from "@/data/credentials";

/**
 * Skills are presented as a numbered ledger with a hover-lit index rail —
 * no progress bars, since the résumé makes no proficiency claims.
 */
export function Skills() {
  return (
    <section id="skills" className="relative">
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

          {/* Ledger */}
          <div className="mt-12 grid gap-px border border-[hsl(var(--edge))] bg-[hsl(var(--edge))] sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group, i) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.06, duration: 0.6, ease: EASE_OUT_EXPO }}
                className="group relative bg-[hsl(var(--carbon))] p-6 transition-colors duration-500 hover:bg-[hsl(var(--carbon-2))]"
              >
                {/* lime corner mark on hover */}
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

          {/* Achievement strip */}
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
