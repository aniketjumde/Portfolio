import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDownRight, ArrowRight, Code2, MapPin, Sparkles } from "lucide-react";
import { site, socials } from "@/data/site";
import { allTechnologies } from "@/data/skills";
import { stats } from "@/data/achievements";
import { Counter } from "@/components/motion/counter";
import { SplitText } from "@/components/motion/split-text";
import { EASE } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import {
  GithubIcon,
  GmailIcon,
  LeetcodeIcon,
  LinkedinIcon,
} from "@/components/ui/icons";
import { usePrefersReducedMotion } from "@/hooks/use-portfolio";

const socialIcon = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  LeetCode: LeetcodeIcon,
  Email: GmailIcon,
} as const;

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 0.96]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-32 pb-20 md:pt-36"
    >
      <motion.div style={{ y, opacity, scale }} className="w-full">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 md:grid-cols-[1.1fr_0.9fr] md:gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          {/* ── Left: copy ─────────────────────────────────── */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
              className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-primary/25 bg-primary/[0.07] px-3.5 py-1.5 backdrop-blur-sm"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              <span className="text-[0.72rem] font-medium uppercase tracking-[0.16em] text-primary">
                {site.availability}
              </span>
            </motion.div>

            <h1 className="font-display text-[clamp(2.6rem,7vw,5.2rem)] font-bold leading-[0.98] tracking-[-0.04em]">
              <span className="block text-foreground/55">
                <SplitText text="Hi, I build" delay={0.25} />
              </span>
              <span className="mt-1 block">
                <SplitText
                  text="software that scales."
                  delay={0.42}
                  accentWords={[2]}
                />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.85 }}
              className="mt-7 max-w-xl text-[1.02rem] leading-relaxed text-muted-foreground sm:text-[1.08rem]"
            >
              I'm <span className="font-medium text-foreground">{site.name}</span>, a{" "}
              {site.role.toLowerCase()} focused on creating scalable, high-quality
              software. I design backends that stay clean under pressure — clean data
              models, structured logic, and systems that hold up in production.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 1 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Button asChild size="lg" variant="accent">
                <a href="#projects">
                  View my work
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#contact">
                  Let's talk
                  <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:translate-y-0.5" />
                </a>
              </Button>
            </motion.div>

            {/* Socials + location */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, ease: EASE, delay: 1.15 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4"
            >
              <div className="flex items-center gap-2">
                {socials
                  .filter((s) => s.label !== "Email")
                  .map((social) => {
                    const Icon = socialIcon[social.label as keyof typeof socialIcon];
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="group grid h-10 w-10 place-items-center rounded-full border border-border/70 text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary hover:shadow-[0_10px_24px_-14px_hsl(var(--primary)/0.9)]"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    );
                  })}
              </div>
              <span className="hidden h-4 w-px bg-border sm:block" />
              <span className="inline-flex items-center gap-1.5 text-[0.8rem] text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-primary/80" />
                {site.location}
              </span>
            </motion.div>
          </div>

          {/* ── Right: portrait / orbit panel ──────────────── */}
          <HeroPanel />
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground/70 transition-colors hover:text-primary md:flex"
        aria-label="Scroll to about section"
      >
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.3em]">scroll</span>
        <span className="relative block h-10 w-px overflow-hidden bg-border">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-primary"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}

function HeroPanel() {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, ease: EASE, delay: 0.5 }}
      className="relative mx-auto hidden w-full max-w-[22rem] md:block lg:max-w-[26rem]"
    >
      {/* Rotating orbit ring */}
      <div
        aria-hidden="true"
        className="absolute inset-[-6%] rounded-full border border-dashed border-border/60 animate-spin-slow"
      />
      <div
        aria-hidden="true"
        className="absolute inset-[6%] rounded-full border border-border/40"
      />

      {/* Glass card */}
      <div className="edge-light relative overflow-hidden rounded-[2rem] border border-border/80 bg-card/60 p-7 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl">
        <div
          aria-hidden="true"
          className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/25 blur-[70px]"
        />

        {/* Availability row */}
        <div className="relative flex items-center justify-between">
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
            profile.json
          </span>
          <span className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[hsl(0_70%_58%)]/70" />
            <span className="h-2 w-2 rounded-full bg-[hsl(40_90%_58%)]/70" />
            <span className="h-2 w-2 rounded-full bg-[hsl(150_60%_50%)]/70" />
          </span>
        </div>

        <div className="relative mt-6 flex items-center gap-4">
          <div className="relative grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-[linear-gradient(140deg,hsl(var(--jade)/0.22),hsl(var(--cyan)/0.14))] font-display text-xl font-bold text-foreground ring-1 ring-inset ring-white/15">
            {site.initials}
            <Sparkles className="absolute -right-1.5 -top-1.5 h-4 w-4 text-accent animate-float" />
          </div>
          <div>
            <p className="font-display text-lg font-semibold leading-tight">{site.name}</p>
            <p className="mt-0.5 text-[0.8rem] text-muted-foreground">{site.role}</p>
          </div>
        </div>

        {/* Code-ish block */}
        <div className="relative mt-6 rounded-2xl border border-border/60 bg-background/60 p-4 font-mono text-[0.72rem] leading-relaxed">
          <p className="text-muted-foreground/60">
            <span className="text-violet">const</span> engineer = {"{"}
          </p>
          <p className="pl-4 text-muted-foreground">
            focus: <span className="text-primary">"backend"</span>,
          </p>
          <p className="pl-4 text-muted-foreground">
            stack: <span className="text-accent">"java + sql"</span>,
          </p>
          <p className="pl-4 text-muted-foreground">
            shipping: <span className="text-[hsl(40_90%_62%)]">true</span>,
          </p>
          <p className="text-muted-foreground/60">{"}"};</p>
        </div>

        {/* Mini stats */}
        <div className="relative mt-6 grid grid-cols-3 gap-2">
          {[
            { value: stats.problems, label: "Problems" },
            { value: `${stats.certifications}`, label: "Certs" },
            { value: `${stats.cgpa}`, label: "CGPA" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-border/60 bg-secondary/40 px-2 py-2.5 text-center"
            >
              <p className="font-display text-[0.95rem] font-semibold text-foreground">
                {item.value}
              </p>
              <p className="mt-0.5 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-muted-foreground">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Floating badge — languages */}
      <motion.div
        animate={reduced ? undefined : { y: [-6, 6, -6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-3 top-1/3 flex items-center gap-2 rounded-2xl border border-border/80 bg-card/90 px-3 py-2 shadow-xl backdrop-blur-md lg:-left-8 lg:px-3.5 lg:py-2.5"
      >
        <Code2 className="h-4 w-4 text-primary" />
        <div>
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-muted-foreground">
            Languages
          </p>
          <p className="text-[0.78rem] font-semibold">{stats.languages}+</p>
        </div>
      </motion.div>

      {/* Floating badge — counter */}
      <motion.div
        animate={reduced ? undefined : { y: [6, -6, 6] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-2 bottom-[18%] rounded-2xl border border-border/80 bg-card/90 px-3 py-2 shadow-xl backdrop-blur-md lg:-right-6 lg:px-4 lg:py-2.5"
      >
        <p className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-muted-foreground">
          LeetCode
        </p>
        <p className="font-display text-[0.95rem] font-semibold text-primary">
          <Counter to={200} suffix="+" duration={2.2} />
        </p>
      </motion.div>
    </motion.div>
  );
}

/** Thin marquee of technologies that sits at the base of the hero. */
export function TechMarquee() {
  const items = [...allTechnologies, ...allTechnologies];

  return (
    <div className="relative mt-4 border-y border-border/50 bg-card/25 py-3.5 backdrop-blur-sm">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent"
      />
      <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap">
        {items.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="flex items-center gap-8 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-muted-foreground/70"
          >
            {tech}
            <span className="h-1 w-1 rounded-full bg-primary/50" />
          </span>
        ))}
      </div>
    </div>
  );
}
