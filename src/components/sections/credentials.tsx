import { motion } from "framer-motion";
import { Award, BadgeCheck } from "lucide-react";
import { DrawLine, PosterLinesOnScroll, Rise } from "@/components/motion/text";
import { EASE_OUT_EXPO } from "@/components/motion/easing";
import { achievements, certificationGroups, certificationCount } from "@/data/credentials";

/**
 * Certifications and measurable achievements, promoted out of the experience
 * timeline into their own spread.
 *
 * The résumé groups credentials by issuer and subject rather than listing them
 * with individual titles and dates, so this renders that grouping exactly —
 * no invented certificate names, IDs or issue dates, and no fake "verify"
 * links. Where a real credential is unverifiable, it simply isn't linked.
 */
export function Credentials() {
  return (
    <section id="credentials" className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="ambient-b absolute right-[-15%] top-[20%] h-[28rem] w-[28rem] rounded-full bg-[hsl(var(--lime))]/[0.045] blur-[120px]" />
      </div>

      <div className="relative mx-auto w-full max-w-[104rem] px-5 sm:px-8">
        <DrawLine />

        <div className="py-16 lg:py-24">
          {/* Header */}
          <div className="grid gap-6 lg:grid-cols-[0.55fr_0.45fr] lg:items-end">
            <div>
              <Rise>
                <p className="meta mb-4">
                  <span className="text-[hsl(var(--lime))]">05</span> — Credentials
                </p>
              </Rise>
              <PosterLinesOnScroll
                as="h2"
                className="poster-lg"
                lines={[
                  <span key="1">PROOF</span>,
                  <span key="2" className="text-[hsl(var(--lime))]">
                    OF WORK.
                  </span>,
                ]}
              />
            </div>
            <Rise delay={0.1}>
              <p className="max-w-sm font-grotesk text-[0.98rem] leading-relaxed text-[hsl(var(--ash))]">
                {certificationCount} credentials across Java, backend, databases and API
                testing — plus the competitive-programming record behind them.
              </p>
            </Rise>
          </div>

          {/* Achievement rail */}
          <div className="mt-12 grid gap-px border border-[hsl(var(--edge))] bg-[hsl(var(--edge))] sm:grid-cols-3">
            {achievements.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.07, duration: 0.6, ease: EASE_OUT_EXPO }}
                className="group relative overflow-hidden bg-[hsl(var(--carbon))] p-6"
              >
                <span className="absolute right-4 top-4 text-[hsl(var(--edge))] transition-colors duration-500 group-hover:text-[hsl(var(--lime))]/60">
                  <Award className="h-4 w-4" />
                </span>

                <p className="poster text-[2.6rem] leading-none text-[hsl(var(--lime))]">
                  {a.metric}
                </p>
                <p className="mt-3 text-[0.9rem] font-medium leading-snug text-[hsl(var(--chalk))]">
                  {a.title}
                </p>
                <p className="mt-2 text-[0.78rem] leading-relaxed text-[hsl(var(--fog))]">
                  {a.detail}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Certification ledger */}
          <div className="mt-12">
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[hsl(var(--edge))] pb-3">
              <h3 className="flex items-center gap-2.5 font-grotesk text-[1.15rem] font-semibold tracking-[-0.02em]">
                <BadgeCheck className="h-4 w-4 text-[hsl(var(--lime))]" />
                Certifications
              </h3>
              <span className="font-mono text-[0.56rem] uppercase tracking-[0.16em] text-[hsl(var(--fog))]">
                {certificationCount} credentials · grouped by issuer
              </span>
            </div>

            <div className="grid gap-x-10 sm:grid-cols-2">
              {certificationGroups.map((group, gi) => (
                <motion.div
                  key={group.group}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: gi * 0.05, duration: 0.55, ease: EASE_OUT_EXPO }}
                  className="group border-b border-[hsl(var(--edge))] py-5"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-[hsl(var(--lime))]">
                      {group.group}
                    </p>
                    <p className="font-mono text-[0.55rem] uppercase tracking-[0.1em] text-[hsl(var(--fog))]">
                      {group.issuer}
                    </p>
                  </div>

                  <ul className="mt-3 space-y-1.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-[0.86rem] leading-snug text-[hsl(var(--ash))] transition-colors duration-300 group-hover:text-[hsl(var(--chalk))]"
                      >
                        <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-[hsl(var(--edge))] transition-colors duration-300 group-hover:bg-[hsl(var(--lime))]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <p className="mt-5 max-w-2xl font-mono text-[0.55rem] leading-relaxed tracking-[0.04em] text-[hsl(var(--fog))]">
              The résumé lists these by issuer and subject area. Certificate IDs and issue
              dates aren&apos;t recorded there, so none are shown here.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
