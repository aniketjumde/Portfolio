import { motion } from "framer-motion";
import { ArrowUpRight, GraduationCap, MapPin, Target, Zap } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal, StaggerGroup, StaggerItem, EASE } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";
import { educationSummary } from "@/data/experience";
import { site } from "@/data/site";
import { stats } from "@/data/achievements";

const pillars = [
  {
    icon: Target,
    title: "Precision first",
    body: "I'd rather model the data properly once than patch a schema three times. Requirements get read closely before a line is written.",
  },
  {
    icon: Zap,
    title: "Performance as a feature",
    body: "Query plans, indexing and data access patterns are part of the design — not an optimisation pass bolted on at the end.",
  },
  {
    icon: GraduationCap,
    title: "Always compounding",
    body: "Eight certifications, 200+ algorithmic problems and an open-source habit keep the fundamentals sharp.",
  },
];

export function About() {
  return (
    <Section id="about">
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* Left column — identity card */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <div className="edge-light relative overflow-hidden rounded-[1.75rem] border border-border/80 bg-card/50 p-7 backdrop-blur-xl">
              <div
                aria-hidden="true"
                className="absolute -left-20 -top-20 h-52 w-52 rounded-full bg-[hsl(var(--violet))]/20 blur-[70px]"
              />

              <div className="relative">
                <div className="mb-5 flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[linear-gradient(140deg,hsl(var(--jade)/0.25),hsl(var(--cyan)/0.12))] font-display text-base font-bold ring-1 ring-inset ring-white/10">
                    {site.initials}
                  </span>
                  <div>
                    <p className="font-display text-[1.02rem] font-semibold leading-tight">
                      {site.name}
                    </p>
                    <p className="text-[0.78rem] text-muted-foreground">{site.role}</p>
                  </div>
                </div>

                <div className="space-y-2.5 text-[0.82rem]">
                  <Row label="Location" value={site.location} icon={MapPin} />
                  <Row label="Degree" value={educationSummary.degree} icon={GraduationCap} />
                  <Row label="Graduating" value="2027" icon={Target} />
                </div>

                <div className="mt-6 grid grid-cols-2 gap-2.5">
                  <Stat value={<Counter to={Number(stats.cgpa)} decimals={2} />} label="CGPA" />
                  <Stat value={<Counter to={stats.certifications} suffix="+" />} label="Certifications" />
                  <Stat value={<Counter to={200} suffix="+" />} label="Problems solved" />
                  <Stat value={<Counter to={3} suffix="+" />} label="Shipped projects" />
                </div>

                <a
                  href={site.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-5 flex items-center justify-between rounded-2xl border border-border/70 bg-secondary/40 px-4 py-3 text-[0.82rem] font-medium transition-colors hover:border-primary/40 hover:bg-primary/[0.06]"
                >
                  Read the full résumé
                  <ArrowUpRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right column — narrative */}
        <div>
          <SectionHeading
            eyebrow="01 — About"
            title="An engineer who cares about"
            accent="what happens underneath"
            description="I build full-stack applications with a backend bias: multi-role platforms, automated workflows and data that stays reliable as it grows."
          />

          <Reveal delay={0.1} className="mt-8 space-y-5 text-[0.95rem] leading-relaxed text-muted-foreground">
            <p>
              I'm a final-year Information Technology student at JSPM's Rajarshi Shahu
              College of Engineering in Pune, and a{" "}
              <span className="font-medium text-foreground">Java developer</span> with
              hands-on experience building full-stack applications, managing databases
              and delivering backend-focused solutions with clean, structured logic.
            </p>
            <p>
              My work has centred on{" "}
              <span className="font-medium text-foreground">multi-role platforms</span>{" "}
              — real estate marketplaces with admin, seller and buyer flows, examination
              and management systems, and authentication suites that handle registration,
              verification and recovery end to end. Along the way I've learned that the
              interesting problems usually live in the data layer.
            </p>
            <p>
              I'm driven by a strong foundation in programming, problem-solving and
              system design, and I care about writing{" "}
              <span className="font-medium text-foreground">maintainable</span> code —
              understanding the requirements deeply enough that the implementation
              almost writes itself.
            </p>
          </Reveal>

          {/* Pillars */}
          <StaggerGroup className="mt-10 grid gap-3 sm:grid-cols-3" stagger={0.1}>
            {pillars.map((pillar) => (
              <StaggerItem key={pillar.title}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="surface surface-hover h-full rounded-2xl p-5"
                >
                  <pillar.icon className="mb-3 h-5 w-5 text-primary" />
                  <p className="mb-1.5 text-[0.86rem] font-semibold">{pillar.title}</p>
                  <p className="text-[0.78rem] leading-relaxed text-muted-foreground">
                    {pillar.body}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </Section>
  );
}

function Row({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/80" />
      <div className="min-w-0">
        <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted-foreground/70">
          {label}
        </p>
        <p className="truncate text-foreground/90">{value}</p>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: React.ReactNode; label: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-secondary/40 px-3 py-2.5">
      <p className="font-display text-lg font-semibold leading-none text-foreground">
        {value}
      </p>
      <p className="mt-1.5 font-mono text-[0.55rem] uppercase tracking-[0.13em] text-muted-foreground">
        {label}
      </p>
    </div>
  );
}
