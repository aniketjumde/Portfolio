import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

interface SectionHeadingProps {
  /** Small mono label above the title, e.g. "02 — Skills" */
  eyebrow: string;
  title: string;
  /** rendered in the serif accent face */
  accent?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <Reveal y={14}>
        <div
          className={cn(
            "flex items-center gap-3 mb-5",
            align === "center" && "justify-center",
          )}
        >
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-primary/70" />
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-primary/90">
            {eyebrow}
          </span>
        </div>
      </Reveal>

      <Reveal y={20} delay={0.05}>
        <h2 className="text-[clamp(1.9rem,4.2vw,3.1rem)] font-semibold leading-[1.08] text-gradient-soft">
          {title}
          {accent && (
            <>
              {" "}
              <span className="text-serif-accent text-gradient">{accent}</span>
            </>
          )}
        </h2>
      </Reveal>

      {description && (
        <Reveal y={20} delay={0.1}>
          <p
            className={cn(
              "mt-5 text-[0.98rem] leading-relaxed text-muted-foreground",
              align === "center" && "mx-auto max-w-xl",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  /** adds a hairline divider on top */
  divided?: boolean;
}

export function Section({ id, children, className, divided }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-24 md:py-32",
        divided && "border-t border-border/50",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">{children}</div>
    </section>
  );
}
