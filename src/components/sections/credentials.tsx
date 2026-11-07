import { motion } from "framer-motion";
import { Award, BadgeCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { EASE_OUT_EXPO } from "@/components/motion/easing";
import { achievements, certificationGroups, certificationCount } from "@/data/credentials";

/**
 * Certifications and measurable achievements.
 *
 * The résumé groups credentials by issuer and subject rather than listing
 * individual titles and dates, so this renders that grouping exactly — no
 * invented certificate names, IDs or issue dates, and no fake verify links.
 */
export function Credentials() {
  return (
    <section id="credentials" className="section relative">
      <div className="shell relative z-10">
        <SectionHeading
          eyebrow="05 — Certifications"
          title="Learning"
          accent="milestones"
          lede={`${certificationCount} credentials across Java, backend, databases and API testing — plus the record behind them.`}
        />

        {/* Achievement rail */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {achievements.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: i * 0.07 }}
              className="card card-lit group p-5 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <p className="text-gradient text-[2.1rem] font-extrabold leading-none">
                  {a.metric}
                </p>
                <Award className="h-4 w-4 text-[hsl(var(--violet))]/50 transition-colors duration-500 group-hover:text-[hsl(var(--violet))]" />
              </div>
              <p className="mt-3 text-[0.9rem] font-semibold leading-snug text-white">{a.title}</p>
              <p className="mt-1.5 text-[0.8rem] leading-relaxed text-[hsl(var(--fog))]">
                {a.detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Certification ledger */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {certificationGroups.map((group, gi) => (
            <motion.div
              key={group.group}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease: EASE_OUT_EXPO, delay: gi * 0.06 }}
              className="card p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="inline-flex items-center gap-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-[hsl(var(--violet))]">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  {group.group}
                </p>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.08em] text-[hsl(var(--fog))]">
                  {group.issuer}
                </p>
              </div>

              <ul className="mt-3.5 space-y-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[0.86rem] leading-snug text-[hsl(var(--ash))]"
                  >
                    <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-[hsl(var(--violet))]/70" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-center text-[0.72rem] text-[hsl(var(--fog))]">
          The résumé lists these by issuer and subject area. Certificate IDs and issue dates
          aren&apos;t recorded there, so none are shown here.
        </p>
      </div>
    </section>
  );
}
