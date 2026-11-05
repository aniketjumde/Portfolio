import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { allSkills } from "@/data/skills";
import { usePrefersReducedMotion } from "@/hooks/use-site";
import { cn } from "@/lib/utils";

/**
 * Rotating word-sphere of the résumé's technologies.
 *
 * Rather than pulling in three.js + drei for one element, words are placed on a
 * Fibonacci sphere and projected to 2D each frame on a single rAF loop. That
 * yields real depth (scale, opacity, z-ordering) at roughly 1 kB of logic, keeps
 * the bundle flat, and stays crisp at any DPI because it is all text.
 */

interface Node {
  word: string;
  /** unit-sphere position */
  x: number;
  y: number;
  z: number;
}

function buildSphere(words: string[]): Node[] {
  const n = words.length;
  const golden = Math.PI * (3 - Math.sqrt(5)); // ≈ 2.39996

  return words.map((word, i) => {
    const y = 1 - (i / Math.max(n - 1, 1)) * 2;
    const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    return {
      word,
      x: Math.cos(theta) * radiusAtY,
      y,
      z: Math.sin(theta) * radiusAtY,
    };
  });
}

export function SkillsSphere({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [size, setSize] = useState(320);

  // pointer-driven tilt, spring-damped
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tiltX = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 });
  const tiltY = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 });
  const rotateX = useTransform(tiltX, [-1, 1], [18, -18]);
  const rotateY = useTransform(tiltY, [-1, 1], [-24, 24]);

  const nodes = useMemo(() => buildSphere(allSkills.slice(0, 26)), []);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  // A single rAF loop drives every word. Runs only while the sphere is on
  // screen and the tab is visible.
  useEffect(() => {
    const els = itemRefs.current.filter(Boolean) as HTMLLIElement[];
    if (!els.length) return;

    let raf = 0;
    let visible = true;
    let onScreen = true;
    const start = performance.now();
    const count = nodes.length;

    const frame = (now: number) => {
      if (visible && onScreen) {
        const t = (now - start) / 1000;
        // two axes at different speeds — reads organic rather than mechanical
        const ry = reduced ? 0.6 : t * 0.28;
        const rx = reduced ? -0.22 : Math.sin(t * 0.22) * 0.28 - 0.12;
        const cx1 = Math.cos(rx);
        const sx1 = Math.sin(rx);
        const perspective = 2.6;

        for (let i = 0; i < count; i++) {
          const n = nodes[i];
          const el = els[i];
          if (!el) continue;

          // a per-index phase offset keeps the cloud from moving as one block
          const phase = (i / count) * Math.PI * 2;
          const localRy = ry + phase * 0.02;

          let x = n.x * Math.cos(localRy) + n.z * Math.sin(localRy);
          let z = -n.x * Math.sin(localRy) + n.z * Math.cos(localRy);
          const y = n.y * cx1 - z * sx1;
          z = n.y * sx1 + z * cx1;

          // perspective divide — nearer nodes grow and brighten
          const scale = perspective / (perspective + z);
          const depth = (1 - z) / 2; // 0 = far, 1 = near

          const left = 50 + x * 42 * scale;
          const top = 50 + y * 42 * scale;

          el.style.transform = `translate3d(${left}%, ${top}%, 0) translate(-50%, -50%) scale(${(0.72 + depth * 0.55).toFixed(3)})`;
          el.style.opacity = (0.18 + depth * 0.82).toFixed(3);
          el.style.zIndex = String(Math.round(depth * 100));
          el.style.filter = depth < 0.35 ? `blur(${((0.35 - depth) * 2.4).toFixed(2)}px)` : "none";
        }
      }
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);

    const onVisibility = () => {
      visible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibility);

    // stop burning frames when the section is scrolled away
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
    });
    if (els[0]) io.observe(els[0].parentElement ?? els[0]);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [nodes, reduced]);

  // responsive radius
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const s = Math.min(entry.contentRect.width, entry.contentRect.height);
      setSize(s);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className={cn("relative grid place-items-center", className)}
      onPointerMove={(e) => {
        if (reduced) return;
        const rect = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
        my.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      {/* orbital rings — static, purely to describe the volume */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid place-items-center">
        {[0.62, 0.82, 1].map((scale, i) => (
          <motion.div
            key={scale}
            className="absolute rounded-full border border-[hsl(var(--chalk))]/[0.07]"
            style={{
              width: size * scale,
              height: size * scale,
              // circles read as rings only when tilted
              transform: `rotateX(72deg) rotateZ(${i * 60}deg)`,
            }}
            animate={reduced ? undefined : { rotateZ: [i * 60, i * 60 + 360] }}
            transition={{ duration: 80 + i * 30, repeat: Infinity, ease: "linear" }}
          />
        ))}
        <div
          className="absolute rounded-full bg-[hsl(var(--lime))]/[0.05] blur-[60px]"
          style={{ width: size * 0.9, height: size * 0.9 }}
        />
      </div>

      <motion.ul
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        className="relative h-full w-full"
        aria-label="Technologies"
      >
        {nodes.map((node, i) => (
          <SphereWord
            key={node.word}
            node={node}
            refCallback={(el) => {
              itemRefs.current[i] = el;
            }}
          />
        ))}
      </motion.ul>

      {/* centre mark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute grid place-items-center"
      >
        <div className="grid h-14 w-14 place-items-center rounded-full border border-[hsl(var(--lime))]/25 bg-[hsl(var(--carbon))]/70 backdrop-blur-sm">
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-[hsl(var(--lime))]">
            {nodes.length}
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * One word in the cloud. Positioning is written by the parent's single rAF loop
 * via this element's ref — 26 separate loops for 26 words would mean 26
 * callbacks per frame for one decorative element.
 */
function SphereWord({
  node,
  refCallback,
}: {
  node: Node;
  refCallback: (el: HTMLLIElement | null) => void;
}) {
  return (
    <li
      ref={refCallback}
      className="absolute left-0 top-0 whitespace-nowrap font-mono text-[0.62rem] uppercase tracking-[0.08em] text-[hsl(var(--chalk))] will-change-transform sm:text-[0.7rem]"
      style={{ transformOrigin: "0 0" }}
    >
      {node.word}
    </li>
  );
}
