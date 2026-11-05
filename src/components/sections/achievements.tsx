import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { DrawRule, MaskedLines, Reveal } from "@/components/motion/primitives";
import { SectionHeader } from "@/components/ui/section-header";
import {
  achievements,
  certificationCount,
  certificationGroups,
  profileLinks,
} from "@/data/credentials";
import { EDITORIAL_EASE } from "@/components/motion/primitives";

const toneMap = {
  oxide: "text-[hsl(var(--oxide))]",
  ultra: "text-[hsl(var(--ultra))]",
  moss: "text-[hsl(var(--moss))]",
} as const;

export function Achievements() {
  return (
    <section id="achievements" className="relative">
      <div className="mx-auto w-full max-w-[104rem] px-4 sm:px-7">
        <DrawRule />

        <div className="py-14 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:gap-16">
            <div>
              <SectionHeader index="06" title="Achievements" />
              <MaskedLines
                as="h3"
                delay={0.1}
                className="display-lg mt-6"
                lines={[
                  <span key="1">Signals,</span>,
                  <span key="2">
                    not{" "}
                    <span className="italic-accent text-[hsl(var(--oxide))]">claims</span>.
                  </span>,
                ]}
              />
              <Reveal delay={0.15}>
                <p className="mt-4 max-w-sm text-[0.88rem] leading-relaxed text-[hsl(var(--ink-soft))]">
                  Ratings, problem counts and certificates — each one checkable rather
                  than asserted.
                </p>
              </Reveal>
            </div>

            {/* Metric cards */}
            <div className="grid gap-px border border-[hsl(var(--rule))] bg-[hsl(var(--rule))] sm:grid-cols-3">
              {achievements.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: EDITORIAL_EASE }}
                  className="group flex flex-col bg-[hsl(var(--paper))] p-5 transition-colors duration-300 hover:bg-[hsl(var(--paper-2))]"
                >
                  <p
                    className={`font-display text-[2.6rem] font-semibold leading-none ${toneMap[item.tone]}`}
                  >
                    {item.metric}
                  </p>
                  <p className="mt-4 font-display text-[0.98rem] font-semibold leading-snug">
                    {item.title}
                  </p>
                  <p className="mt-2 text-[0.78rem] leading-relaxed text-[hsl(var(--ink-soft))]">
                    {item.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications ledger */}
          <div className="mt-14">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3 border-b border-[hsl(var(--rule))] pb-3">
              <h4 className="font-display text-[1.15rem] font-semibold">
                Certifications
              </h4>
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[hsl(var(--ink-faint))]">
                {certificationCount} credentials
              </span>
            </div>

            <div className="grid gap-x-10 gap-y-0 sm:grid-cols-2">
              {certificationGroups.map((group, gi) => (
                <Reveal key={group.group} delay={gi * 0.05} y={14}>
                  <div className="border-b border-[hsl(var(--rule))] py-4">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[hsl(var(--oxide))]">
                        {group.group}
                      </p>
                      <p className="font-mono text-[0.56rem] text-[hsl(var(--ink-faint))]">
                        {group.issuer}
                      </p>
                    </div>
                    <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="text-[0.84rem] leading-relaxed text-[hsl(var(--ink-soft))]"
                        >
                          {item}
                          <span className="ml-3 text-[hsl(var(--rule))] last:hidden">/</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Profiles */}
            <Reveal delay={0.1} className="mt-6">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <span className="label">Verify on</span>
                {profileLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-[hsl(var(--ink))]"
                  >
                    <span className="link-ink">{link.label}</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
