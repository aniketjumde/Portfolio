import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "./easing";

/**
 * Poster line reveal: each line is masked and rises into place.
 * Used for every large display heading so the site has one motion signature.
 */
export function PosterLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.08,
  /** Gate the reveal. While false the lines stay masked, so it can wait on a preloader. */
  active = true,
  as: Tag = "h2",
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  active?: boolean;
  as?: "h1" | "h2" | "h3" | "div";
}) {
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className={cn("block will-change-transform", lineClassName)}
            initial={{ y: "108%" }}
            animate={{ y: active ? "0%" : "108%" }}
            transition={{
              duration: 0.95,
              ease: EASE_OUT_EXPO,
              delay: active ? delay + i * stagger : 0,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Same reveal, but triggered on scroll instead of mount. */
export function PosterLinesOnScroll({
  lines,
  className,
  lineClassName,
  stagger = 0.07,
  as: Tag = "h2",
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "div";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <Tag className={className}>
      <span ref={ref as unknown as React.RefObject<HTMLSpanElement>} className="block">
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden">
            <motion.span
              className={cn("block will-change-transform", lineClassName)}
              initial={{ y: "108%" }}
              animate={inView ? { y: "0%" } : { y: "108%" }}
              transition={{
                duration: 0.95,
                ease: EASE_OUT_EXPO,
                delay: i * stagger,
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}

/** Fade-and-rise wrapper for blocks of content. */
export function Rise({
  children,
  className,
  delay = 0,
  y = 26,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay }}
    >
      {children}
    </motion.div>
  );
}

/** A hairline that draws itself across on scroll. */
export function DrawLine({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      aria-hidden="true"
      className={cn("h-px origin-left bg-[hsl(var(--edge))]", className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 1.2, ease: EASE_OUT_EXPO, delay }}
    />
  );
}

/** Per-word stagger for medium headings. */
export function WordStagger({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-[0.08em]">
          <motion.span
            className="inline-block"
            initial={{ y: "105%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: delay + i * 0.04 }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
