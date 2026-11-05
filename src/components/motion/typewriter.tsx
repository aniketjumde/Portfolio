import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-site";
import { cn } from "@/lib/utils";

/**
 * Types, holds, deletes, repeats.
 *
 * The caret is a separate element rather than a border so it can blink
 * independently and sit on the baseline. For reduced motion the first phrase is
 * rendered whole, with no caret and no timers.
 */
export function Typewriter({
  phrases,
  className,
  typeSpeed = 62,
  deleteSpeed = 34,
  hold = 1700,
  startDelay = 0,
}: {
  phrases: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  hold?: number;
  startDelay?: number;
}) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(reduced ? (phrases[0] ?? "") : "");
  const [deleting, setDeleting] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [reduced, startDelay]);

  useEffect(() => {
    if (reduced || !started) return;
    const current = phrases[index] ?? "";

    // finished typing → hold, then start deleting
    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), hold);
      return () => clearTimeout(t);
    }

    // finished deleting → advance
    if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
      return;
    }

    const t = setTimeout(
      () => {
        setText((prev) =>
          deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1),
        );
      },
      deleting ? deleteSpeed : typeSpeed,
    );
    return () => clearTimeout(t);
  }, [text, deleting, index, phrases, reduced, started, typeSpeed, deleteSpeed, hold]);

  if (reduced) {
    return <span className={className}>{phrases[0]}</span>;
  }

  return (
    <span className={cn("inline-flex items-baseline", className)}>
      <span aria-live="polite">{text}</span>
      <span
        aria-hidden="true"
        className="ml-[0.08em] inline-block w-[0.07em] translate-y-[0.04em] animate-caret self-stretch bg-[hsl(var(--lime))]"
      />
    </span>
  );
}
