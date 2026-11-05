import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-portfolio";

/**
 * Fixed, GPU-friendly ambient backdrop used behind the whole page:
 * a fine grid, three slow-drifting colour fields that respond to the
 * pointer, and a vignette. All motion is transform/opacity only.
 */
export function Backdrop() {
  const reduced = usePrefersReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const sx = useSpring(px, { stiffness: 60, damping: 24, mass: 0.8 });
  const sy = useSpring(py, { stiffness: 60, damping: 24, mass: 0.8 });

  const jadeX = useTransform(sx, (v) => `${8 + v * 18}%`);
  const jadeY = useTransform(sy, (v) => `${4 + v * 16}%`);
  const violetX = useTransform(sx, (v) => `${86 - v * 20}%`);
  const violetY = useTransform(sy, (v) => `${10 + v * 14}%`);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      px.set(e.clientX / window.innerWidth);
      py.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py, reduced]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base wash */}
      <div className="absolute inset-0 bg-background" />

      {/* Grid */}
      <div className="absolute inset-0 bg-grid mask-fade-radial opacity-70" />

      {/* Colour fields */}
      <motion.div
        className="absolute h-[46rem] w-[46rem] rounded-full blur-[130px] opacity-[0.22] dark:opacity-[0.28]"
        style={{
          left: jadeX,
          top: jadeY,
          background:
            "radial-gradient(circle at center, hsl(var(--jade)) 0%, transparent 68%)",
        }}
        animate={reduced ? undefined : { scale: [1, 1.12, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute h-[38rem] w-[38rem] rounded-full blur-[120px] opacity-[0.16] dark:opacity-[0.22]"
        style={{
          left: violetX,
          top: violetY,
          background:
            "radial-gradient(circle at center, hsl(var(--violet)) 0%, transparent 68%)",
        }}
        animate={reduced ? undefined : { scale: [1.06, 1, 1.06] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="absolute bottom-[-18%] left-1/2 h-[34rem] w-[70rem] -translate-x-1/2 rounded-full blur-[140px] opacity-[0.13] dark:opacity-[0.18]"
        style={{
          background:
            "radial-gradient(ellipse at center, hsl(var(--cyan)) 0%, transparent 70%)",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,hsl(var(--background))_100%)]" />
    </div>
  );
}

