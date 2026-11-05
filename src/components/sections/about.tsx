import { motion } from "framer-motion";
import { DrawRule, MaskedLines, Reveal } from "@/components/motion/primitives";
import { SectionHeader } from "@/components/ui/section-header";
import { profile } from "@/data/profile";
import { education } from "@/data/timeline";

const objectives = [
  {
    k: "Building",
    v: "Efficient, reliable, user-focused web applications — where the schema, service layer and interface agree with each other.",
  },
  {
    k: "Looking for",
    v: "Internship or full-time roles where I can contribute to real systems and grow alongside experienced engineers.",
  },
  {
    k: "Foundation",
    v: "Mathematics and logic first. Data structures, algorithms and design patterns are treated as the transferable core.",
  },
];

export function About() {
  return (
    <section id="about" className="relative">
      <div className="mx-auto w-full max-w-[104rem] px-4 sm:px-7">
        <DrawRule />

        <div className="grid gap-10 py-14 lg:grid-cols-[0.36fr_0.64fr] lg:gap-16 lg:py-20">
          {/* Sidebar */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SectionHeader index="02" title="About" />

            <div className="mt-8 space-y-4">
              <div className="border-l border-[hsl(var(--rule))] pl-4">
                <p className="label">Currently</p>
                <p className="mt-1.5 text-[0.9rem] leading-snug font-medium">
                  {education.degree}
                </p>
                <p className="mt-1 text-[0.82rem] leading-snug text-[hsl(var(--ink-soft))]">
                  {education.school}
                </p>
                <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[hsl(var(--ink-faint))]">
                  {education.period} · {education.cgpa} CGPA
                </p>
              </div>

              <div className="border-l border-[hsl(var(--rule))] pl-4">
                <p className="label">Based in</p>
                <p className="mt-1.5 text-[0.9rem] font-medium">{profile.location}</p>
              </div>

              <div className="border-l border-[hsl(var(--rule))] pl-4">
                <p className="label">Availability</p>
                <p className="mt-1.5 flex items-center gap-2 text-[0.9rem] font-medium">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[hsl(var(--moss))]" />
                  {profile.availability}
                </p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div>
            <MaskedLines
              as="h3"
              delay={0.1}
              className="display-lg max-w-3xl"
              lines={[
                <span key="1">I started with mathematics</span>,
                <span key="2">
                  and ended up{" "}
                  <span className="italic-accent text-[hsl(var(--oxide))]">shipping</span>
                </span>,
                <span key="3">web systems.</span>,
              ]}
            />

            <Reveal delay={0.15} className="mt-8 grid gap-6 sm:grid-cols-2">
              <p className="text-[0.95rem] leading-[1.7] text-[hsl(var(--ink-soft))]">
                {profile.summary}
              </p>
              <p className="text-[0.95rem] leading-[1.7] text-[hsl(var(--ink-soft))]">
                That foundation in logic is what I lean on most. Before writing code I
                want the data model to be right — the tables, the relationships, the
                integrity constraints. Everything above it gets easier once that's settled.
              </p>
            </Reveal>

            {/* Objectives ledger */}
            <div className="mt-10 border-t border-[hsl(var(--rule))]">
              {objectives.map((item, i) => (
                <Reveal key={item.k} delay={0.05 * i} y={14}>
                  <div className="grid grid-cols-1 gap-1.5 border-b border-[hsl(var(--rule))] py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[hsl(var(--ink-faint))]">
                      {item.k}
                    </p>
                    <p className="text-[0.9rem] leading-relaxed">{item.v}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Pull quote */}
            <Reveal delay={0.2} className="mt-10">
              <blockquote className="relative border-l-2 border-[hsl(var(--oxide))] pl-6">
                <p className="font-display text-[1.4rem] leading-[1.35] italic text-[hsl(var(--ink))] sm:text-[1.7rem]">
                  “Passionate about developing efficient, reliable and user-focused
                  applications — and about understanding why they work.”
                </p>
                <footer className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[hsl(var(--ink-faint))]">
                  — Professional summary
                </footer>
              </blockquote>
            </Reveal>

            {/* Marquee of skills */}
            <div className="mt-10 overflow-hidden border-y border-[hsl(var(--rule))] py-2.5">
              <motion.div className="flex w-max marquee-track gap-6">
                {[...Array(2)].map((_, dup) => (
                  <div key={dup} className="flex shrink-0 items-center gap-6">
                    {[
                      "Java",
                      "PostgreSQL",
                      "Hibernate ORM",
                      "Servlets",
                      "JSP",
                      "REST APIs",
                      "Docker",
                      "PL/SQL",
                      "MongoDB",
                      "MVC",
                    ].map((s) => (
                      <span
                        key={`${dup}-${s}`}
                        className="flex shrink-0 items-center gap-6 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[hsl(var(--ink-faint))]"
                      >
                        {s}
                        <span className="text-[hsl(var(--oxide))]">✳</span>
                      </span>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
