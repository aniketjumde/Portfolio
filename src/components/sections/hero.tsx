import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download, MapPin } from "lucide-react";
import { metrics, profile, socials } from "@/data/profile";
import { EASE_OUT_EXPO } from "@/components/motion/easing";
import { Typewriter } from "@/components/motion/typewriter";
import { GithubIcon, GmailIcon, LeetcodeIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { useResume } from "@/hooks/use-resume";

const iconMap = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  LeetCode: LeetcodeIcon,
  Email: GmailIcon,
} as const;

export function Hero({ ready }: { ready: boolean }) {
  const { open: openResume } = useResume();

  // Every element waits for the preloader, then staggers in.
  const base = 0.1;
  const step = (i: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    transition: { duration: 0.75, ease: EASE_OUT_EXPO, delay: ready ? base + i * 0.1 : 0 },
  });

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16 sm:pt-32"
    >
      <div className="shell relative z-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {/* greeting */}
          <motion.p
            {...step(0)}
            className="inline-flex items-center gap-2 rounded-full border border-[hsl(0_0%_100%/0.12)] bg-white/[0.04] px-3.5 py-1.5 text-[0.76rem] font-medium text-[hsl(var(--ash))] backdrop-blur-sm"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--violet))] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[hsl(var(--violet))]" />
            </span>
            {profile.availability}
          </motion.p>

          {/* lead-in, mirroring the reference's "Woah! You landed on the portfolio of..." */}
          <motion.h2
            {...step(1)}
            className="mt-7 text-[1.15rem] font-semibold leading-snug text-white sm:text-[1.4rem]"
          >
            Hey, you landed on the portfolio of the
          </motion.h2>

          {/* name */}
          <motion.h1
            {...step(2)}
            className="mt-3 text-[clamp(2.3rem,7.2vw,4.6rem)] font-extrabold leading-[1.06] tracking-[-0.035em]"
          >
            <span className="sr-only">{profile.name} — </span>
            <span aria-hidden="true">
              {profile.first} <span className="text-gradient">{profile.last}</span>
            </span>
          </motion.h1>

          {/* role, typed */}
          <motion.p
            {...step(3)}
            className="mt-5 flex flex-wrap items-center justify-center gap-x-2 text-[1rem] font-medium text-[hsl(var(--ash))] sm:text-[1.1rem]"
          >
            <span className="text-white">
              <Typewriter
                phrases={["Software Developer", "Java Developer", "Problem Solver"]}
                startDelay={ready ? 900 : 6000}
              />
            </span>
            <span className="text-[hsl(var(--fog))]">·</span>
            <span className="inline-flex items-center gap-1 text-[hsl(var(--fog))]">
              <MapPin className="h-3.5 w-3.5" />
              {profile.location}
            </span>
          </motion.p>

          {/* description */}
          <motion.p
            {...step(4)}
            className="mt-6 max-w-xl text-[0.98rem] leading-[1.75] text-[hsl(var(--ash))]"
          >
            {profile.summary}
          </motion.p>

          {/* CTAs */}
          <motion.div {...step(5)} className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a href="#contact" className="btn btn-primary">
              Let&apos;s connect
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <button type="button" onClick={openResume} className="btn btn-ghost">
              <Download className="h-4 w-4" />
              View résumé
            </button>
          </motion.div>

          {/* socials */}
          <motion.ul {...step(6)} className="mt-8 flex items-center gap-3">
            {socials.map((s) => {
              const Icon = iconMap[s.label as keyof typeof iconMap];
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={`${s.label} — ${s.handle}`}
                    className="grid h-10 w-10 place-items-center rounded-full border border-[hsl(0_0%_100%/0.12)] bg-white/[0.03] text-[hsl(var(--ash))] transition-all duration-300 hover:-translate-y-1 hover:border-[hsl(var(--violet))]/70 hover:bg-[hsl(var(--violet))]/12 hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </li>
              );
            })}
          </motion.ul>

          {/* metric strip */}
          <motion.dl
            {...step(7)}
            className="mt-12 grid w-full max-w-lg grid-cols-2 gap-px overflow-hidden rounded-xl border border-[hsl(0_0%_100%/0.09)] bg-[hsl(0_0%_100%/0.09)] sm:grid-cols-4"
          >
            {metrics.map((m) => (
              <div key={m.label} className="bg-[hsl(var(--ink))]/85 px-3 py-3.5 backdrop-blur-sm">
                <dt className="sr-only">{m.label}</dt>
                <dd>
                  <span className="block text-[1.15rem] font-bold leading-none text-white">
                    {m.value}
                  </span>
                  <span className="mt-1.5 block text-[0.6rem] font-medium uppercase tracking-[0.1em] text-[hsl(var(--fog))]">
                    {m.label}
                  </span>
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ delay: ready ? 1.1 : 0, duration: 0.7 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[hsl(var(--fog))] transition-colors hover:text-white sm:flex"
      >
        <span className="text-[0.62rem] font-medium uppercase tracking-[0.22em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-3.5 w-3.5" />
        </motion.span>
      </motion.a>
    </section>
  );
}
