import { AnimatePresence, motion } from "framer-motion";
import {
  Code2,
  Database,
  Layout,
  Server,
  Terminal,
  Users,
  Wrench,
  MessageSquare,
  Crown,
} from "lucide-react";
import { useState } from "react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal, StaggerGroup, StaggerItem, EASE } from "@/components/motion/reveal";
import { coreConcepts, skillGroups, softSkills } from "@/data/skills";
import { cn } from "@/lib/utils";

const groupIcon = {
  code: Code2,
  database: Database,
  layout: Layout,
  tools: Wrench,
  terminal: Terminal,
  server: Server,
} as const;

const softIcons = [Users, MessageSquare, Crown];

export function Skills() {
  const [active, setActive] = useState(0);
  const group = skillGroups[active];
  const GroupIcon = groupIcon[group.icon];

  return (
    <Section id="skills" divided>
      <SectionHeading
        eyebrow="02 — Toolkit"
        title="The stack I reach for, and"
        accent="why"
        description="Not a logo wall — every category below is something I've shipped with, debugged at 2am, or both."
      />

      <div className="mt-12 grid gap-5 lg:grid-cols-[0.42fr_0.58fr]">
        {/* Category selector */}
        <Reveal className="order-2 lg:order-1">
          <div
            role="tablist"
            aria-label="Skill categories"
            aria-orientation="vertical"
            className="flex flex-wrap gap-2 lg:flex-col lg:gap-1.5"
          >
            {skillGroups.map((g, i) => {
              const Icon = groupIcon[g.icon];
              const isActive = i === active;
              return (
                <button
                  key={g.title}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  aria-controls="skill-panel"
                  id={`skill-tab-${i}`}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className={cn(
                    "group relative flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition-colors duration-300",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="skill-active"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                      className="absolute inset-0 -z-10 rounded-2xl border border-primary/30 bg-primary/[0.07]"
                    />
                  )}
                  <span
                    className={cn(
                      "grid h-9 w-9 shrink-0 place-items-center rounded-xl border transition-colors duration-300",
                      isActive
                        ? "border-primary/40 bg-primary/10 text-primary"
                        : "border-border/70 text-muted-foreground group-hover:text-foreground",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.9rem] font-medium leading-tight">
                      {g.title}
                    </span>
                    <span className="hidden text-[0.72rem] text-muted-foreground lg:block">
                      {g.items.length} technolog{g.items.length === 1 ? "y" : "ies"}
                    </span>
                  </span>
                  <span className="ml-auto hidden font-mono text-[0.6rem] text-muted-foreground/50 lg:block">
                    0{i + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Detail panel */}
        <Reveal delay={0.08} className="order-1 lg:order-2">
          <div
            id="skill-panel"
            role="tabpanel"
            aria-labelledby={`skill-tab-${active}`}
            className="edge-light relative h-full min-h-[19rem] overflow-hidden rounded-[1.5rem] border border-border/80 bg-card/50 p-6 backdrop-blur-xl sm:p-8"
          >
            <div
              aria-hidden="true"
              className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/15 blur-[80px]"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.32, ease: EASE }}
                className="relative"
              >
                <div className="mb-6 flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
                    <GroupIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold">{group.title}</h3>
                    <p className="mt-1 text-[0.83rem] text-muted-foreground">{group.blurb}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.items.map((item, i) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.045, duration: 0.35, ease: EASE }}
                      className="cursor-default rounded-xl border border-border/80 bg-secondary/50 px-3.5 py-2 text-[0.82rem] font-medium text-foreground/85 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/[0.08] hover:text-foreground"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Footer line */}
            <div className="relative mt-8 flex items-center gap-2 border-t border-border/60 pt-4 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground/60">
              <span className="h-1 w-1 rounded-full bg-primary" />
              hands-on, production-tested
            </div>
          </div>
        </Reveal>
      </div>

      {/* Core concepts */}
      <Reveal delay={0.1} className="mt-5">
        <div className="rounded-[1.5rem] border border-border/70 bg-card/40 p-6 backdrop-blur-sm sm:p-7">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">
              Fundamentals
            </h3>
            <span className="font-mono text-[0.62rem] text-muted-foreground/50">
              the part that doesn't change
            </span>
          </div>
          <StaggerGroup className="flex flex-wrap gap-2" stagger={0.04}>
            {coreConcepts.map((concept) => (
              <StaggerItem key={concept} as="div">
                <span className="inline-block cursor-default rounded-full border border-primary/20 bg-primary/[0.06] px-3.5 py-1.5 text-[0.78rem] font-medium text-primary/90 transition-all duration-300 hover:border-primary/45 hover:bg-primary/12">
                  {concept}
                </span>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </Reveal>

      {/* Soft skills */}
      <StaggerGroup className="mt-5 grid gap-3 sm:grid-cols-3" stagger={0.08}>
        {softSkills.map((skill, i) => {
          const Icon = softIcons[i];
          return (
            <StaggerItem key={skill.name}>
              <div className="surface surface-hover group flex h-full items-start gap-3.5 rounded-2xl p-5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-border/70 text-muted-foreground transition-colors duration-300 group-hover:border-primary/40 group-hover:text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[0.87rem] font-semibold">{skill.name}</p>
                  <p className="mt-1 text-[0.76rem] leading-relaxed text-muted-foreground">
                    {skill.detail}
                  </p>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
