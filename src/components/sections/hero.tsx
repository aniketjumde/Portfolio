import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { metrics, profile, socials } from "@/data/profile";
import { allSkills } from "@/data/skills";
import { EDITORIAL_EASE, MaskedLines } from "@/components/motion/primitives";
import { usePrefersReducedMotion } from "@/hooks/use-editorial";
import { GithubIcon, LinkedinIcon, LeetcodeIcon, GmailIcon } from "@/components/ui/brand-icons";

const icons = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  LeetCode: LeetcodeIcon,
  Email: GmailIcon,
} as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const plateY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -70]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="introduction"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden pt-24 sm:pt-28"
    >
      {/* ── Top meta bar ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.8 }}
        className="mx-auto w-full max-w-[104rem] px-4 sm:px-7"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[hsl(var(--rule))] pb-3">
          <span className="label">Portfolio — Vol. 01</span>
          <span className="label hidden sm:inline">
            {profile.location} · {profile.education}
          </span>
          <span className="label flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[hsl(var(--moss))]" />
            {profile.availability}
          </span>
        </div>
      </motion.div>

      {/* ── Main composition ─────────────────────────────── */}
      <div className="mx-auto grid w-full max-w-[104rem] grid-cols-1 gap-10 px-4 pb-14 pt-8 sm:px-7 lg:grid-cols-[1.42fr_0.58fr] lg:gap-8 lg:pt-14">
        {/* Left: type */}
        <div className="relative">
          <MaskedLines
            as="h1"
            delay={0.35}
            stagger={0.1}
            className="display-xl"
            lines={[
              <span key="a" className="block">
                Aniket
              </span>,
              <span key="b" className="block">
                Jumde<span className="text-[hsl(var(--oxide))]">.</span>
              </span>,
            ]}
          />

          <div className="mt-6 grid gap-6 sm:grid-cols-[auto_1fr] sm:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.7, ease: EDITORIAL_EASE }}
              className="flex flex-col justify-center gap-1 border-l-2 border-[hsl(var(--oxide))] pl-4"
            >
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-[hsl(var(--ink-faint))]">
                Discipline
              </span>
              <span className="font-display text-[1.15rem] font-semibold leading-tight">
                Java Development
              </span>
              <span className="font-display text-[1.15rem] font-semibold italic leading-tight text-[hsl(var(--ink-soft))]">
                &amp; Problem Solving
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.8, ease: EDITORIAL_EASE }}
              className="max-w-md text-[0.98rem] leading-[1.65] text-[hsl(var(--ink-soft))]"
            >
              {profile.standfirst}
            </motion.p>
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7, ease: EDITORIAL_EASE }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-3 bg-[hsl(var(--ink))] px-6 py-3.5 font-mono text-[0.64rem] uppercase tracking-[0.18em] text-[hsl(var(--paper))] transition-colors duration-300 hover:bg-[hsl(var(--oxide))]"
            >
              View projects
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={profile.resumeUrl}
              download
              className="group inline-flex items-center gap-3 border border-[hsl(var(--ink))] px-6 py-3.5 font-mono text-[0.64rem] uppercase tracking-[0.18em] transition-colors duration-300 hover:bg-[hsl(var(--ink))] hover:text-[hsl(var(--paper))]"
            >
              Download résumé
              <ArrowDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.35, duration: 0.8 }}
            className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-[hsl(var(--rule))] pt-4"
          >
            {socials.map((social) => {
              const Icon = icons[social.label as keyof typeof icons];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={`${social.label} — ${social.handle}`}
                  className="group inline-flex items-center gap-1.5 font-mono text-[0.64rem] uppercase tracking-[0.14em] text-[hsl(var(--ink-faint))] transition-colors hover:text-[hsl(var(--ink))]"
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span className="link-ink">{social.label}</span>
                </a>
              );
            })}
          </motion.div>
        </div>

        {/* Right: portrait plate + metrics */}
        <motion.aside
          style={{ y: plateY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="relative flex flex-col justify-between gap-6"
        >
          {/* The "plate": a printed portrait card, drawn in CSS */}
          <div className="relative mx-auto w-full max-w-[19rem] lg:mx-0">
            <div className="relative border border-[hsl(var(--ink))] bg-[hsl(var(--paper-2))] p-3">
              {/* registration marks */}
              {[
                "left-1.5 top-1.5",
                "right-1.5 top-1.5",
                "left-1.5 bottom-1.5",
                "right-1.5 bottom-1.5",
              ].map((pos) => (
                <span
                  key={pos}
                  aria-hidden="true"
                  className={`absolute ${pos} h-2 w-2 border border-[hsl(var(--ink-faint))]`}
                />
              ))}

              <div className="relative overflow-hidden border border-[hsl(var(--rule))] bg-[hsl(var(--ink))]">
                <div className="aspect-[4/5] relative grid place-items-center">
                  {/* concentric ring composition */}
                  <div aria-hidden="true" className="absolute inset-0">
                    {[0.92, 0.72, 0.52, 0.34].map((scale, i) => (
                      <motion.div
                        key={scale}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9 + i * 0.09, duration: 1.1, ease: EDITORIAL_EASE }}
                        className="absolute left-1/2 top-1/2 rounded-full border border-[hsl(var(--paper))]/18"
                        style={{
                          width: `${scale * 100}%`,
                          aspectRatio: "1",
                          transform: "translate(-50%, -50%)",
                        }}
                      />
                    ))}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,hsl(var(--oxide)/0.35),transparent_62%)]" />
                  </div>

                  <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1, duration: 1, ease: EDITORIAL_EASE }}
                    className="relative font-display text-[5.5rem] font-semibold leading-none text-[hsl(var(--paper))]"
                  >
                    {profile.initials}
                  </motion.span>

                  {/* spine label */}
                  <span className="absolute bottom-3 left-3 font-mono text-[0.52rem] uppercase tracking-[0.24em] text-[hsl(var(--paper))]/55">
                    {profile.role}
                  </span>
                  <span className="absolute right-3 top-3 font-mono text-[0.52rem] tracking-[0.1em] text-[hsl(var(--paper))]/40">
                    EST. 2023
                  </span>
                </div>
              </div>

              <div className="mt-3 flex items-baseline justify-between">
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-[hsl(var(--ink-faint))]">
                  Fig. 01 — The developer
                </span>
                <span className="font-mono text-[0.55rem] text-[hsl(var(--ink-faint))]">
                  {profile.location.split(",")[0]}
                </span>
              </div>
            </div>
          </div>

          {/* Metrics ledger */}
          <div className="grid grid-cols-2 gap-px border border-[hsl(var(--rule))] bg-[hsl(var(--rule))]">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.25 + i * 0.08, duration: 0.6 }}
                className="bg-[hsl(var(--paper))] px-3.5 py-3"
              >
                <p className="font-display text-[1.5rem] font-semibold leading-none">{m.value}</p>
                <p className="mt-1.5 font-mono text-[0.54rem] uppercase tracking-[0.14em] text-[hsl(var(--ink-faint))]">
                  {m.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.aside>
      </div>

      {/* ── Scroll indicator ─────────────────────────────── */}
      <motion.div style={{ opacity: fade }} className="mx-auto w-full max-w-[104rem] px-4 sm:px-7">
        <a
          href="#about"
          className="group flex items-center justify-between gap-4 border-t border-[hsl(var(--rule))] py-4"
          aria-label="Scroll to about section"
        >
          <span className="flex items-center gap-3">
            <motion.span
              animate={reduced ? undefined : { y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="grid h-7 w-7 place-items-center border border-[hsl(var(--rule))] text-[hsl(var(--ink-faint))] transition-colors group-hover:border-[hsl(var(--oxide))] group-hover:text-[hsl(var(--oxide))]"
            >
              <ArrowDown className="h-3 w-3" />
            </motion.span>
            <span className="font-mono text-[0.58rem] uppercase tracking-[0.24em] text-[hsl(var(--ink-faint))]">
              Scroll to read
            </span>
          </span>
          <span className="hidden font-mono text-[0.58rem] uppercase tracking-[0.18em] text-[hsl(var(--ink-faint))] sm:block">
            {allSkills.slice(0, 5).join(" · ")}
          </span>
        </a>
      </motion.div>
    </section>
  );
}
