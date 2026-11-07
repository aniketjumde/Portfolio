import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { metrics, profile, socials } from "@/data/profile";
import { EASE_OUT_EXPO } from "@/components/motion/easing";
import { PosterLines } from "@/components/motion/text";
import { usePrefersReducedMotion } from "@/hooks/use-site";
import { useResume } from "@/hooks/use-resume";
import { Starfield } from "@/components/experience/starfield";
import { Typewriter } from "@/components/motion/typewriter";
import { GithubIcon, GmailIcon, LeetcodeIcon, LinkedinIcon } from "@/components/ui/brand-icons";

const iconMap = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  LeetCode: LeetcodeIcon,
  Email: GmailIcon,
} as const;

export function Hero({ ready }: { ready: boolean }) {
  const { open: openResume } = useResume();
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "14%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  // Entrance timings start once the preloader has cleared.
  const base = 0.15;

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-24 sm:pt-28"
    >
      {/* ── Ambient light ─────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <Starfield className="absolute inset-0 opacity-70" />
        <div className="ambient-a absolute -left-[15%] top-[-10%] h-[38rem] w-[38rem] rounded-full bg-[hsl(var(--lime))]/[0.07] blur-[130px]" />
        <div className="ambient-b absolute right-[-10%] top-[30%] h-[32rem] w-[32rem] rounded-full bg-[hsl(220_80%_60%)]/[0.06] blur-[120px]" />
        <div className="absolute inset-0 grid-lines opacity-60" />
      </div>

      {/* ── Meta strip ────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ delay: base + 0.35, duration: 0.7 }}
        className="relative z-10 mx-auto w-full max-w-[104rem] px-5 sm:px-8"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[hsl(var(--edge))] pb-3">
          <span className="meta">Portfolio — Vol. 03</span>
          <span className="meta hidden sm:inline">{profile.location}</span>
          <span className="flex items-center gap-2 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-[hsl(var(--lime))]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--lime))] opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[hsl(var(--lime))]" />
            </span>
            {profile.availability}
          </span>
        </div>
      </motion.div>

      {/* ── Headline block ────────────────────────────────── */}
      <motion.div style={{ y }} className="relative z-10 flex-1">
        <div className="mx-auto w-full max-w-[104rem] px-5 sm:px-8">
          <div className="pt-10 sm:pt-14">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 10 }}
              transition={{ delay: ready ? base + 0.2 : 0.2, duration: 0.7 }}
              className="mb-5 font-mono text-[0.66rem] uppercase tracking-[0.24em] text-[hsl(var(--ash))]"
            >
              <span className="text-[hsl(var(--chalk))]">
                <Typewriter
                  phrases={["Java Developer", "Problem Solver", "Backend Builder"]}
                  startDelay={ready ? 900 : 4000}
                />
              </span>
              <span className="text-[hsl(var(--fog))]"> / </span>
              {profile.discipline}
            </motion.p>

            <PosterLines
              as="h1"
              active={ready}
              delay={base + 0.3}
              stagger={0.09}
              className="poster-xl text-[hsl(var(--chalk))]"
              lines={[
                <span key="a" className="block">
                  BUILD
                </span>,
                <span key="b" className="flex items-baseline gap-[0.06em]">
                  SYS<span className="text-[hsl(var(--lime))]">—</span>
                </span>,
                <span key="c" className="block outline-type">
                  TEMS.
                </span>,
              ]}
            />

            {/* Standfirst + CTAs */}
            <div className="mt-8 grid gap-8 border-t border-[hsl(var(--edge))] pt-7 sm:mt-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 14 }}
                transition={{ delay: ready ? base + 0.75 : 0.75, duration: 0.8, ease: EASE_OUT_EXPO }}
              >
                <p className="max-w-xl font-grotesk text-[1.05rem] leading-[1.55] tracking-[-0.01em] text-[hsl(var(--ash))] sm:text-[1.18rem]">
                  {profile.standfirst}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 14 }}
                transition={{ delay: ready ? base + 0.87 : 0.87, duration: 0.8, ease: EASE_OUT_EXPO }}
                className="flex flex-wrap items-center gap-3"
              >
                <MagneticButton>
                  <a
                    href="#work"
                    className="group inline-flex items-center gap-2.5 bg-[hsl(var(--lime))] px-6 py-3.5 font-mono text-[0.64rem] font-medium uppercase tracking-[0.18em] text-[hsl(var(--carbon))] transition-shadow duration-300 hover:shadow-[0_14px_44px_-14px_hsl(76_100%_57%/0.65)]"
                  >
                    View my work
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </MagneticButton>

                <MagneticButton>
                  <button
                    type="button"
                    onClick={openResume}
                    className="group inline-flex items-center gap-2.5 border border-[hsl(var(--edge))] px-6 py-3.5 font-mono text-[0.64rem] uppercase tracking-[0.18em] transition-colors duration-300 hover:border-[hsl(var(--chalk))]/45 hover:bg-[hsl(var(--chalk))]/[0.04]"
                  >
                    <Download className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
                    Résumé
                  </button>
                </MagneticButton>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Bottom bar: metrics + socials + scroll ────────── */}
      <motion.div
        style={{ opacity: fade }}
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ delay: ready ? base + 1.0 : 1.0, duration: 0.8 }}
        className="relative z-10 mx-auto w-full max-w-[104rem] px-5 sm:px-8"
      >
        <div className="grid grid-cols-2 gap-px border-t border-[hsl(var(--edge))] sm:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="py-4">
              <p className="poster text-[1.5rem] leading-none text-[hsl(var(--chalk))] sm:text-[1.8rem]">
                {m.value}
              </p>
              <p className="mt-1.5 font-mono text-[0.55rem] uppercase tracking-[0.16em] text-[hsl(var(--fog))]">
                {m.label}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[hsl(var(--edge))] py-4">
          <div className="flex items-center gap-4">
            {socials.map((s) => {
              const Icon = iconMap[s.label as keyof typeof iconMap];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={`${s.label} — ${s.handle}`}
                  className="text-[hsl(var(--ash))] transition-colors duration-300 hover:text-[hsl(var(--lime))]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>

          <a
            href="#work"
            className="group flex items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-[hsl(var(--fog))] transition-colors hover:text-[hsl(var(--lime))]"
            aria-label="Scroll to work"
          >
            Scroll
            <motion.span
              animate={reduced ? undefined : { y: [0, 4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="h-3 w-3" />
            </motion.span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}

/** Wraps children in a subtle pointer-magnet effect. */
function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    setOffset({ x: dx * 5, y: dy * 5 });
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 320, damping: 24, mass: 0.4 }}
    >
      {children}
    </motion.div>
  );
}

