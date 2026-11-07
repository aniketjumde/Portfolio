import { motion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/components/motion/easing";
import { cn } from "@/lib/utils";

/**
 * The centred eyebrow + title + lede used by every section, matching the
 * reference's rhythm: small violet eyebrow, heavy white title with one
 * accented clause, then a muted paragraph.
 */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  lede,
  align = "center",
  className,
}: {
  eyebrow: string;
  title: string;
  /** the word or clause rendered in the violet gradient */
  accent?: string;
  lede?: string;
  align?: "center" | "left";
  className?: string;
}) {
  const centred = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col",
        centred ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
        className="section-eyebrow"
      >
        <span aria-hidden="true" className="h-px w-6 bg-[hsl(var(--violet))]" />
        {eyebrow}
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.65, ease: EASE_OUT_EXPO, delay: 0.06 }}
        className="section-title"
      >
        {title}
        {accent && (
          <>
            {" "}
            <span className="text-gradient">{accent}</span>
          </>
        )}
      </motion.h2>

      {lede && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.12 }}
          className={cn("section-lede", centred && "mx-auto")}
        >
          {lede}
        </motion.p>
      )}
    </div>
  );
}
