import { motion } from "framer-motion";
import { ArrowUpRight, Award, Code, Star, Trophy } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal, StaggerGroup, StaggerItem, EASE } from "@/components/motion/reveal";
import { achievements, certifications } from "@/data/achievements";
import { cn } from "@/lib/utils";

const achievementIcons = {
  star: Star,
  code: Code,
  trophy: Trophy,
} as const;

const tone = {
  star: "text-[hsl(42_92%_58%)] border-[hsl(42_92%_58%)]/25 bg-[hsl(42_92%_58%)]/10",
  code: "text-[hsl(190_88%_55%)] border-[hsl(190_88%_55%)]/25 bg-[hsl(190_88%_55%)]/10",
  trophy: "text-[hsl(158_74%_46%)] border-[hsl(158_74%_46%)]/25 bg-[hsl(158_74%_46%)]/10",
} as const;

export function Achievements() {
  return (
    <Section id="achievements" divided>
      <SectionHeading
        eyebrow="06 — Proof"
        title="Milestones worth"
        accent="putting a number on"
        description="Ratings, problem counts and certifications — verifiable signals rather than claims."
      />

      {/* Achievement cards */}
      <StaggerGroup className="mt-12 grid gap-4 md:grid-cols-3" stagger={0.09}>
        {achievements.map((item) => {
          const Icon = achievementIcons[item.icon];
          return (
            <StaggerItem key={item.title}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="surface surface-hover relative flex h-full flex-col overflow-hidden rounded-[1.4rem] p-6"
              >
                <div className="mb-5 flex items-start justify-between">
                  <span
                    className={cn(
                      "grid h-11 w-11 place-items-center rounded-2xl border",
                      tone[item.icon],
                    )}
                  >
                    <Icon className="h-[1.05rem] w-[1.05rem]" />
                  </span>
                  <div className="text-right">
                    <p className="font-display text-2xl font-bold leading-none text-foreground">
                      {item.metric}
                    </p>
                    <p className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-muted-foreground">
                      {item.metricLabel}
                    </p>
                  </div>
                </div>

                <h3 className="font-display text-[0.98rem] font-semibold leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.8rem] leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            </StaggerItem>
          );
        })}
      </StaggerGroup>

      {/* Certifications ledger */}
      <Reveal delay={0.1} className="mt-16">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div className="flex items-center gap-3">
            <Award className="h-4 w-4 text-primary" />
            <h3 className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">
              Certifications
            </h3>
          </div>
          <span className="font-mono text-[0.62rem] text-muted-foreground/60">
            {certifications.length} verified · newest first
          </span>
        </div>

        <div className="overflow-hidden rounded-[1.4rem] border border-border/70 bg-card/40 backdrop-blur-sm">
          <ul className="divide-y divide-border/60">
            {[...certifications].reverse().map((cert, i) => (
              <li key={cert.title}>
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-3.5 transition-colors duration-300 hover:bg-secondary/40 sm:grid-cols-[3rem_1fr_10rem_auto] sm:px-6"
                >
                  <span className="font-mono text-[0.6rem] text-muted-foreground/50">
                    {String(certifications.length - i).padStart(2, "0")}
                  </span>

                  <span className="min-w-0">
                    <span className="block truncate text-[0.87rem] font-medium text-foreground/90 transition-colors group-hover:text-primary">
                      {cert.title}
                    </span>
                    <span className="block truncate text-[0.72rem] text-muted-foreground sm:hidden">
                      {cert.platform} · {cert.date}
                    </span>
                  </span>

                  <span className="hidden truncate text-[0.75rem] text-muted-foreground sm:block">
                    {cert.platform}
                  </span>

                  <span className="flex items-center gap-3">
                    <span className="font-mono text-[0.66rem] text-muted-foreground/70">
                      {cert.date}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
