import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/primitives";

/**
 * Editorial section header: a numbered tick, a rule, and the section title.
 */
export function SectionHeader({
  index,
  title,
  standfirst,
  align = "left",
  className,
}: {
  index: string;
  title: string;
  standfirst?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <Reveal y={10}>
        <div
          className={cn(
            "flex items-center gap-3",
            align === "center" && "justify-center",
          )}
        >
          <span className="tick">{index}</span>
          <span className="h-px w-8 bg-[hsl(var(--oxide))]" />
          <span className="label">{title}</span>
        </div>
      </Reveal>

      {standfirst && (
        <Reveal y={12} delay={0.06}>
          <p
            className={cn(
              "mt-3 max-w-lg text-[0.88rem] leading-relaxed text-[hsl(var(--ink-soft))]",
              align === "center" && "mx-auto",
            )}
          >
            {standfirst}
          </p>
        </Reveal>
      )}
    </div>
  );
}
