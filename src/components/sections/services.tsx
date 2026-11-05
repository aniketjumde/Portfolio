import { motion } from "framer-motion";
import { Database, Gauge, Layers, Server, Shield, Wrench } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal, StaggerGroup, StaggerItem, EASE } from "@/components/motion/reveal";
import { process, services } from "@/data/services";

const icons = {
  server: Server,
  database: Database,
  layers: Layers,
  gauge: Gauge,
  shield: Shield,
  wrench: Wrench,
} as const;

export function Services() {
  return (
    <Section id="services" divided>
      <SectionHeading
        eyebrow="05 — Expertise"
        title="How I can"
        accent="be useful"
        description="The work I'm genuinely good at — and the parts of a project I'd want to own if we built something together."
      />

      <StaggerGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.075}>
        {services.map((service) => {
          const Icon = icons[service.icon];
          return (
            <StaggerItem key={service.title}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="surface surface-hover group relative flex h-full flex-col overflow-hidden rounded-[1.4rem] p-6"
              >
                <div
                  aria-hidden="true"
                  className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 opacity-0 blur-[40px] transition-opacity duration-500 group-hover:opacity-100"
                />

                <span className="mb-5 grid h-11 w-11 place-items-center rounded-2xl border border-border/70 bg-secondary/50 text-primary transition-all duration-400 group-hover:border-primary/40 group-hover:bg-primary/10">
                  <Icon className="h-[1.1rem] w-[1.1rem]" />
                </span>

                <h3 className="font-display text-[1.02rem] font-semibold">{service.title}</h3>
                <p className="mt-2 flex-grow text-[0.82rem] leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                <ul className="mt-4 flex flex-wrap gap-1.5 border-t border-border/50 pt-4">
                  {service.deliverables.map((d) => (
                    <li
                      key={d}
                      className="rounded-md bg-secondary/50 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-muted-foreground"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </StaggerItem>
          );
        })}
      </StaggerGroup>

      {/* Process */}
      <Reveal delay={0.1} className="mt-16">
        <div className="mb-6 flex items-center gap-3">
          <span className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-muted-foreground">
            How I work
          </span>
          <span className="h-px flex-1 bg-border/60" />
        </div>

        <div className="grid gap-px overflow-hidden rounded-[1.4rem] border border-border/70 bg-border/50 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((step) => (
            <div
              key={step.step}
              className="group relative bg-card/70 p-6 backdrop-blur-sm transition-colors duration-400 hover:bg-card/95"
            >
              <span className="font-mono text-[0.66rem] text-primary/70">{step.step}</span>
              <h4 className="mt-3 font-display text-[0.98rem] font-semibold">{step.title}</h4>
              <p className="mt-2 text-[0.78rem] leading-relaxed text-muted-foreground">
                {step.description}
              </p>
              <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
