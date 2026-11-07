import { usePrefersReducedMotion } from "@/hooks/use-site";

/**
 * Fixed ambient layer: a faint grid, two drifting violet blooms and a soft
 * vignette. Sits behind everything at z-0 and ignores pointer events.
 *
 * Purely decorative, so it is entirely aria-hidden and its motion is disabled
 * under prefers-reduced-motion.
 */
export function Backdrop() {
  const reduced = usePrefersReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* grid */}
      <div className="grid-bg absolute inset-0 opacity-70" />

      {/* drifting blooms */}
      <div
        className={`glow-blob left-[-14%] top-[-12%] h-[34rem] w-[34rem] bg-[hsl(var(--violet))]/[0.14] ${
          reduced ? "" : "drift"
        }`}
      />
      <div
        className={`glow-blob right-[-16%] top-[26%] h-[30rem] w-[30rem] bg-[hsl(var(--violet))]/[0.09] ${
          reduced ? "" : "drift-slow"
        }`}
      />
      <div
        className={`glow-blob bottom-[-18%] left-[24%] h-[32rem] w-[32rem] bg-[hsl(var(--violet))]/[0.08] ${
          reduced ? "" : "drift"
        }`}
      />

      {/* vignette so the edges settle into the dark */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,hsl(var(--ink))_100%)]" />
    </div>
  );
}
