import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import { navigation, site, socials } from "@/data/site";
import {
  GithubIcon,
  GmailIcon,
  LeetcodeIcon,
  LinkedinIcon,
} from "@/components/ui/icons";
import { Reveal } from "@/components/motion/reveal";

const socialIcon = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  LeetCode: LeetcodeIcon,
  Email: GmailIcon,
} as const;

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/60">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-primary/[0.09] blur-[110px]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <Reveal y={16}>
            <div>
              <a href="#home" className="inline-flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[linear-gradient(135deg,hsl(var(--jade)),hsl(var(--cyan)))] font-mono text-[0.78rem] font-bold text-[hsl(228_30%_5%)]">
                  {site.initials}
                </span>
                <span className="font-display text-[0.98rem] font-semibold">
                  {site.name}
                </span>
              </a>
              <p className="mt-4 max-w-xs text-[0.82rem] leading-relaxed text-muted-foreground">
                {site.role} based in {site.location}. Building backend systems that
                stay readable as they grow.
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-4 inline-block font-mono text-[0.76rem] text-primary/90 transition-colors hover:text-primary"
              >
                {site.email}
              </a>
            </div>
          </Reveal>

          {/* Navigation */}
          <Reveal y={16} delay={0.05}>
            <div>
              <p className="mb-4 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-muted-foreground">
                Navigate
              </p>
              <ul className="grid grid-cols-2 gap-y-2 md:grid-cols-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-[0.82rem] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Elsewhere */}
          <Reveal y={16} delay={0.1}>
            <div>
              <p className="mb-4 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-muted-foreground">
                Elsewhere
              </p>
              <ul className="space-y-2">
                {socials.map((social) => {
                  const Icon = socialIcon[social.label as keyof typeof socialIcon];
                  return (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target={social.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 text-[0.82rem] text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Icon className="h-3.5 w-3.5 transition-colors group-hover:text-primary" />
                        {social.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
              <a
                href={site.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block rounded-full border border-border/70 px-3.5 py-1.5 text-[0.74rem] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                Résumé ↗
              </a>
            </div>
          </Reveal>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row sm:items-center">
          <p className="text-[0.76rem] text-muted-foreground">
            © {new Date().getFullYear()} {site.name}. Designed &amp; built from scratch.
          </p>
          <motion.a
            href="#home"
            whileHover={{ y: -2 }}
            className="group inline-flex items-center gap-2 rounded-full border border-border/70 px-3.5 py-1.5 text-[0.74rem] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            aria-label="Back to top"
          >
            Back to top
            <ArrowUp className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
