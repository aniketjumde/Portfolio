import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import { navigation, profile, socials } from "@/data/profile";
import { GithubIcon, GmailIcon, LeetcodeIcon, LinkedinIcon } from "@/components/ui/brand-icons";

const iconMap = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  LeetCode: LeetcodeIcon,
  Email: GmailIcon,
} as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[hsl(var(--edge))]">
      <div className="mx-auto w-full max-w-[104rem] px-5 sm:px-8">
        {/* Giant sign-off */}
        <div className="overflow-hidden border-b border-[hsl(var(--edge))] py-8 sm:py-10">
          <a
            href="#top"
            className="group block"
            aria-label="Back to top"
          >
            <p className="poster text-[clamp(3rem,13vw,11rem)] leading-[0.78] text-[hsl(var(--chalk))] transition-colors duration-500 group-hover:text-[hsl(var(--lime))]">
              ANIKET
            </p>
            <p className="poster text-[clamp(3rem,13vw,11rem)] leading-[0.78] text-[hsl(var(--chalk))]/25 transition-colors duration-500 group-hover:text-[hsl(var(--lime))]/50">
              JUMDE
            </p>
          </a>
        </div>

        {/* Columns */}
        <div className="grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="meta mb-3">Role</p>
            <p className="font-grotesk text-[0.92rem] font-medium">{profile.role}</p>
            <p className="font-grotesk text-[0.92rem] text-[hsl(var(--ash))]">
              {profile.discipline}
            </p>
            <p className="mt-2 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[hsl(var(--fog))]">
              {profile.location}
            </p>
          </div>

          <div>
            <p className="meta mb-3">Index</p>
            <ul className="space-y-1">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-[hsl(var(--ash))] transition-colors hover:text-[hsl(var(--lime))]"
                  >
                    <span className="mr-2 text-[hsl(var(--fog))]">{item.index}</span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="meta mb-3">Elsewhere</p>
            <ul className="space-y-1.5">
              {socials.map((s) => {
                const Icon = iconMap[s.label as keyof typeof iconMap];
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-[hsl(var(--ash))] transition-colors hover:text-[hsl(var(--chalk))]"
                    >
                      <Icon className="h-3 w-3 transition-colors group-hover:text-[hsl(var(--lime))]" />
                      {s.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <p className="meta mb-3">Contact</p>
            <a
              href={`mailto:${profile.email}`}
              className="block break-all font-mono text-[0.68rem] text-[hsl(var(--ash))] transition-colors hover:text-[hsl(var(--lime))]"
            >
              {profile.email}
            </a>
            <a
              href={`tel:${profile.phoneHref}`}
              className="mt-1 block font-mono text-[0.68rem] text-[hsl(var(--ash))] transition-colors hover:text-[hsl(var(--lime))]"
            >
              {profile.phone}
            </a>

            <a
              href={profile.resumeUrl}
              download
              className="mt-4 inline-flex items-center gap-2 border border-[hsl(var(--edge))] px-3 py-1.5 font-mono text-[0.56rem] uppercase tracking-[0.16em] text-[hsl(var(--ash))] transition-colors hover:border-[hsl(var(--lime))] hover:text-[hsl(var(--lime))]"
            >
              Résumé ↓
            </a>
          </div>
        </div>

        {/* Colophon */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[hsl(var(--edge))] py-5">
          <p className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-[hsl(var(--fog))]">
            © {year} {profile.name} — All rights reserved
          </p>
          <motion.a
            href="#top"
            whileHover={{ y: -2 }}
            className="inline-flex items-center gap-2 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-[hsl(var(--fog))] transition-colors hover:text-[hsl(var(--lime))]"
          >
            Back to top
            <ArrowUp className="h-3 w-3" />
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
