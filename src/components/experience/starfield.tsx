import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-site";

interface Star {
  /** normalised 0..1 position, so resize doesn't reshuffle the field */
  nx: number;
  ny: number;
  /** depth 0.15 (far) .. 1 (near) — drives size, brightness and parallax */
  z: number;
  r: number;
  twinkle: number;
}

/**
 * A drifting particle field behind the hero.
 *
 * Drawn on a canvas rather than a WebGL scene: ~150 points need neither
 * three.js nor react-three-fiber, and this keeps the bundle where it is.
 * Pauses when the tab is hidden or the field scrolls out of view, and renders
 * a single static frame for reduced-motion users.
 */
export function Starfield({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let stars: Star[] = [];
    let raf = 0;
    let visible = true;
    let onScreen = true;

    // pointer parallax, eased toward the target each frame
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const build = () => {
      // density scales with area, clamped so phones stay cheap and 4K stays sparse
      const count = Math.round(Math.min(180, Math.max(64, (w * h) / 10500)));
      stars = Array.from({ length: count }, () => {
        const z = Math.random() * 0.85 + 0.15;
        return {
          nx: Math.random(),
          ny: Math.random(),
          z,
          r: Math.random() * 1.15 + 0.35,
          twinkle: Math.random() * Math.PI * 2,
        };
      });
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      if (!w || !h) return;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      if (reduced) paint(0);
    };

    const paint = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        // deeper stars drift less, so the field gains a sense of distance
        const x = s.nx * w + cx * s.z * 30;
        const y = s.ny * h + cy * s.z * 30;

        // gentle twinkle — barely perceptible, keeps the field from looking frozen
        const flicker = reduced ? 1 : 0.72 + 0.28 * Math.sin(t * 0.0011 + s.twinkle);
        const alpha = Math.min(0.85, (0.12 + s.z * 0.5) * flicker);

        ctx.beginPath();
        ctx.arc(x, y, s.r * (0.55 + s.z * 0.75), 0, Math.PI * 2);

        // the nearest few stars pick up the lime accent, the rest are chalk
        if (s.z > 0.82) {
          ctx.fillStyle = `hsla(76, 100%, 72%, ${alpha})`;
        } else {
          ctx.fillStyle = `hsla(60, 14%, 94%, ${alpha * 0.8})`;
        }
        ctx.fill();
      }
    };

    const loop = (t: number) => {
      if (!visible || !onScreen) {
        raf = requestAnimationFrame(loop);
        return;
      }
      cx += (tx - cx) * 0.04;
      cy += (ty - cy) * 0.04;
      paint(t);
      raf = requestAnimationFrame(loop);
    };

    const onPointer = (e: PointerEvent) => {
      // -1..1 from centre
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onVisibility = () => {
      visible = document.visibilityState === "visible";
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    resize();

    if (!reduced) {
      raf = requestAnimationFrame(loop);
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        window.addEventListener("pointermove", onPointer, { passive: true });
      }
    }

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
