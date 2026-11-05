import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-site";

/**
 * A soft lime pool that follows the pointer, sitting under the content.
 *
 * Unlike a full-screen RAF component this moves on a passive pointermove
 * listener and only touches one transform — no layout, no re-render.
 * Disabled on touch and for reduced motion.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      cx += (mx - cx) * 0.08;
      cy += (my - cy) * 0.08;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;

      // keep easing for a few frames after the pointer stops, then idle
      if (Math.abs(mx - cx) > 0.4 || Math.abs(my - cy) > 0.4) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[1] hidden h-[34rem] w-[34rem] rounded-full opacity-70 mix-blend-screen blur-[70px] md:block"
      style={{
        background:
          "radial-gradient(circle, hsl(76 100% 57% / 0.055) 0%, hsl(76 100% 57% / 0.022) 42%, transparent 68%)",
        willChange: "transform",
      }}
    />
  );
}
