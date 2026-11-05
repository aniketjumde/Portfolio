import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import { navigation, profile, socials } from "@/data/profile";
import { GithubIcon, LinkedinIcon, LeetcodeIcon, GmailIcon } from "@/components/ui/brand-icons";
import { Reveal } from "@/components/motion/primitives";

const icons = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  LeetCode: LeetcodeIcon,
  Email: GmailIcon,
} as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[hsl(var(--rule))]">
      <div className="mx-auto w-full max-w-[104rem] px-4 sm:px-7">
        {/* Oversized sign-off */}
        <Reveal y={20} className="border-b border-[hsl(var(--rule))] py-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <a
              href="#introduction"
              className="group font-display text-[clamp(2.4rem,7vw,5rem)] font-semibold leading-[0.9] tracking-[-0.04em] transition-colors hover:text-[hsl(var(--oxide))]"
            >
              {profile.name}
              <span className="text-[hsl(var(--oxide))]">.</span>
            </a>
            <a
              href="#introduction"
              className="group inline-flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[hsl(var(--ink-faint))] transition-colors hover:text-[hsl(var(--ink))]"
            >
              Back to top
              <motion.span whileHover={{ y: -2 }} className="grid h-7 w-7 place-items-center border border-[hsl(var(--rule))]">
                <ArrowUp className="h-3 w-3" />
              </motion.span>
            </a>
          </div>
        </Reveal>

        {/* Link columns */}
        <div className="grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="label mb-3">Role</p>
            <p className="text-[0.86rem] leading-relaxed">{profile.role}</p>
            <p className="text-[0.86rem] leading-relaxed text-[hsl(var(--ink-soft))]">
              {profile.discipline}
            </p>
            <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[hsl(var(--ink-faint))]">
              {profile.location}
            </p>
          </div>

          <div>
            <p className="label mb-3">Index</p>
            <ul className="space-y-1">
              {navigation.slice(0, 4).map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-[hsl(var(--ink-soft))] transition-colors hover:text-[hsl(var(--ink))]"
                  >
                    <span className="mr-2 text-[hsl(var(--oxide))]">{item.index}</span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label mb-3">More</p>
            <ul className="space-y-1">
              {navigation.slice(4).map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-[hsl(var(--ink-soft))] transition-colors hover:text-[hsl(var(--ink))]"
                  >
                    <span className="mr-2 text-[hsl(var(--oxide))]">{item.index}</span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label mb-3">Elsewhere</p>
            <ul className="space-y-1.5">
              {socials.map((s) => {
                const Icon = icons[s.label as keyof typeof icons];
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-[hsl(var(--ink-soft))] transition-colors hover:text-[hsl(var(--ink))]"
                    >
                      <Icon className="h-3 w-3 transition-colors group-hover:text-[hsl(var(--oxide))]" />
                      {s.label}
                    </a>
                  </li>
                );
              })}
            </ul>
            <a
              href={profile.resumeUrl}
              download
              className="mt-4 inline-block border border-[hsl(var(--rule))] px-3 py-1.5 font-mono text-[0.58rem] uppercase tracking-[0.16em] transition-colors hover:border-[hsl(var(--ink))]"
            >
              Résumé ↓
            </a>
          </div>
        </div>

        {/* Colophon */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[hsl(var(--rule))] py-5">
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[hsl(var(--ink-faint))]">
            © {year} {profile.name} — All rights reserved
          </p>
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[hsl(var(--ink-faint))]">
            Designed &amp; built from scratch
          </p>
        </div>
      </div>
    </footer>
  );
}
