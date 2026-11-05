import { motion } from "framer-motion";
import { DrawLine, PosterLinesOnScroll, Rise } from "@/components/motion/text";
import { EASE_OUT_EXPO } from "@/components/motion/easing";
import { profile } from "@/data/profile";
import { education, timeline } from "@/data/timeline";
import { skillGroups } from "@/data/skills";

const focus = [
  {
    k: "The foundation",
    v: "Mathematics and logic first. Data structures, algorithms and design patterns sit underneath everything else I write.",
  },
  {
    k: "The work",
    v: "Full-stack Java: a PostgreSQL schema, a servlet layer, and an interface on top that stays honest about what the data allows.",
  },
  {
    k: "The goal",
    v: "Internship or full-time work where I can contribute to real systems and learn from engineers who have shipped more than I have.",
  },
];

export function About() {
  const techCount = skillGroups.reduce((n, g) => n + g.items.length, 0);

  return (
    <section id="about" className="relative">
      <div className="mx-auto w-full max-w-[104rem] px-5 sm:px-8">
        <DrawLine />

        <div className="grid gap-10 py-16 lg:grid-cols-[0.42fr_0.58fr] lg:gap-20 lg:py-24">
          {/* Left: sticky facts */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Rise>
              <p className="meta mb-4">
                <span className="text-[hsl(var(--lime))]">02</span> — About
              </p>
            </Rise>
            <PosterLinesOnScroll
              as="h2"
              className="poster-lg"
              lines={[
                <span key="1">LOGIC</span>,
                <span key="2">FIRST,</span>,
                <span key="3" className="text-[hsl(var(--lime))]">
                  THEN CODE.
                </span>,
              ]}
            />

            <div className="mt-8 space-y-px border border-[hsl(var(--edge))] bg-[hsl(var(--edge))]">
              {[
                { l: "Studying", v: education.degree },
                { l: "Institution", v: education.school },
                { l: "Period", v: `${education.period} · ${education.cgpa} CGPA` },
                { l: "Based in", v: profile.location },
                { l: "Status", v: profile.availability },
              ].map((row) => (
                <div key={row.l} className="bg-[hsl(var(--carbon))] px-4 py-3">
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-[hsl(var(--fog))]">
                    {row.l}
                  </p>
                  <p className="mt-1 text-[0.84rem] leading-snug text-[hsl(var(--chalk))]">
                    {row.v}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: narrative */}
          <div>
            <Rise delay={0.05}>
              <p className="font-grotesk text-[1.25rem] leading-[1.5] tracking-[-0.015em] text-[hsl(var(--chalk))] sm:text-[1.5rem]">
                {profile.summary}
              </p>
            </Rise>

            <Rise delay={0.1}>
              <p className="mt-6 max-w-prose text-[0.95rem] leading-[1.75] text-[hsl(var(--ash))]">
                That foundation in logic is what I lean on most. Before writing a feature I
                want the data model settled — the tables, the relationships, the constraints
                that stop bad rows existing in the first place. Everything above that layer
                gets simpler once it's right.
              </p>
            </Rise>

            {/* Focus ledger */}
            <div className="mt-10 border-t border-[hsl(var(--edge))]">
              {focus.map((f, i) => (
                <Rise key={f.k} delay={i * 0.05} y={14}>
                  <div className="grid gap-1.5 border-b border-[hsl(var(--edge))] py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                    <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-[hsl(var(--lime))]">
                      {f.k}
                    </p>
                    <p className="text-[0.9rem] leading-relaxed text-[hsl(var(--ash))]">{f.v}</p>
                  </div>
                </Rise>
              ))}
            </div>

            {/* Education condensation */}
            <Rise delay={0.12} className="mt-10">
              <p className="meta mb-3">Education</p>
              <div className="space-y-2.5">
                {timeline
                  .filter((t) => t.kind === "Education")
                  .map((t) => (
                    <motion.div
                      key={t.title}
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                      className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-[hsl(var(--edge))] pb-2.5"
                    >
                      <div>
                        <p className="text-[0.88rem] font-medium text-[hsl(var(--chalk))]">
                          {t.title}
                        </p>
                        <p className="text-[0.78rem] text-[hsl(var(--fog))]">{t.org}</p>
                      </div>
                      <span className="font-mono text-[0.6rem] tracking-[0.08em] text-[hsl(var(--ash))]">
                        {t.period} {t.metric ? `· ${t.metric}` : ""}
                      </span>
                    </motion.div>
                  ))}
              </div>
            </Rise>

            {/* Ticker of technologies */}
            <Rise delay={0.15} className="mt-10">
              <div className="overflow-hidden border-y border-[hsl(var(--edge))] py-2.5">
                <div className="ticker-track flex w-max gap-6">
                  {[0, 1].map((dup) => (
                    <div key={dup} className="flex shrink-0 items-center gap-6">
                      {skillGroups
                        .flatMap((g) => g.items)
                        .slice(0, 14)
                        .map((item) => (
                          <span
                            key={`${dup}-${item}`}
                            className="flex shrink-0 items-center gap-6 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[hsl(var(--fog))]"
                          >
                            {item}
                            <span className="text-[hsl(var(--lime))]">/</span>
                          </span>
                        ))}
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-2.5 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-[hsl(var(--fog))]">
                {techCount} technologies across {skillGroups.length} categories
              </p>
            </Rise>
          </div>
        </div>
      </div>
    </section>
  );
}
