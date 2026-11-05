import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** A restrained, editorial easing curve — slow out, no bounce. */
export const EDITORIAL_EASE = [0.16, 1, 0.3, 1] as const;

/* ── Variants ─────────────────────────────────────────────── */

export const riseIn: Variants = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 0.9, ease: EDITORIAL_EASE },
  },
};

export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EDITORIAL_EASE } },
};

export const wipeIn: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  show: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 1, ease: EDITORIAL_EASE },
  },
};

/* ── Masked line reveal (the core typographic move) ───────── */

/**
 * Wraps each line in an overflow-hidden mask so it rises into place.
 * `lines` must be provided explicitly — auto-wrapping would break the mask.
 */
export function MaskedLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.085,
  as: Tag = "div",
}: {
  lines: (string | ReactNode)[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  as?: "div" | "h1" | "h2" | "h3" | "h4" | "p";
}) {
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className={cn("block will-change-transform", lineClassName)}
            initial={{ y: "115%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 0.95,
              ease: EDITORIAL_EASE,
              delay: delay + i * stagger,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* ── Scroll reveal ────────────────────────────────────────── */

export function Reveal({
  children,
  className,
  delay = 0,
  y = 22,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.25, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.75, ease: EDITORIAL_EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** A rule that draws itself across the page as it enters view. */
export function DrawRule({
  className,
  delay = 0,
  vertical = false,
}: {
  className?: string;
  delay?: number;
  vertical?: boolean;
}) {
  return (
    <motion.div
      aria-hidden="true"
      className={cn("bg-[hsl(var(--rule))]", className)}
      style={vertical ? { width: 1 } : { height: 1 }}
      initial={{ scaleX: vertical ? 1 : 0, scaleY: vertical ? 0 : 1 }}
      whileInView={{ scaleX: 1, scaleY: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1.1, ease: EDITORIAL_EASE, delay }}
    />
  );
}

/* ── Stagger container ────────────────────────────────────── */

export function StaggerList({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: "div" | "ul" | "ol";
}) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -8% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </Tag>
  );
}

export function StaggerChild({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag className={className} variants={fadeRise}>
      {children}
    </Tag>
  );
}
