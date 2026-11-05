import { motion } from "framer-motion";
import { EASE } from "./reveal";
import { cn } from "@/lib/utils";

interface SplitTextProps {
  text: string;
  className?: string;
  /** seconds before the first word animates */
  delay?: number;
  /** seconds between words */
  stagger?: number;
  /** render italics in a serif face for a mixed-typography headline */
  accentWords?: number[];
}

/**
 * Word-by-word reveal for hero headlines. Words are wrapped in an
 * overflow-hidden span so they rise into place without shifting layout.
 */
export function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.055,
  accentWords = [],
}: SplitTextProps) {
  const words = text.split(" ");

  return (
    <span className={cn("inline", className)} aria-label={text}>
      {words.map((word, i) => {
        const isAccent = accentWords.includes(i);
        return (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden align-bottom pb-[0.12em]"
            aria-hidden="true"
          >
            <motion.span
              className={cn(
                "inline-block will-change-transform",
                isAccent && "text-serif-accent text-gradient pr-[0.06em]",
              )}
              initial={{ y: "108%", opacity: 0, rotate: 3 }}
              animate={{ y: "0%", opacity: 1, rotate: 0 }}
              transition={{
                duration: 0.95,
                ease: EASE,
                delay: delay + i * stagger,
              }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        );
      })}
    </span>
  );
}
