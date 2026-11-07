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
    <footer className="relative border-t border-[hsl(0_0%_100%/0.08)] bg-[hsl(var(--ink))]/70 backdrop-blur-sm">
      <div className="shell py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr]">
          {/* brand */}
          <div>
            <a href="#home" className="inline-flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-[hsl(var(--violet))] text-[0.8rem] font-extrabold text-white">
                {profile.monogram}
              </span>
              <span className="text-[1rem] font-semibold tracking-tight text-white">
                {profile.shortName}
                <span className="text-[hsl(var(--violet))]">.</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-[0.87rem] leading-relaxed text-[hsl(var(--ash))]">
              {profile.role} · {profile.discipline}. Building reliable systems with Java,
              SQL and a schema that holds up.
            </p>

            <div className="mt-5 flex items-center gap-2.5">
              {socials.map((s) => {
                const Icon = iconMap[s.label as keyof typeof iconMap];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-9 w-9 place-items-center rounded-full border border-[hsl(0_0%_100%/0.12)] text-[hsl(var(--ash))] transition-all duration-300 hover:-translate-y-0.5 hover:border-[hsl(var(--violet))]/70 hover:text-white"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* navigate */}
          <nav aria-label="Footer">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[hsl(var(--fog))]">
              Navigate
            </p>
            <ul className="mt-3.5 space-y-2">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-[0.86rem] text-[hsl(var(--ash))] transition-colors hover:text-white"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* contact */}
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[hsl(var(--fog))]">
              Get in touch
            </p>
            <ul className="mt-3.5 space-y-2">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="break-all text-[0.86rem] text-[hsl(var(--ash))] transition-colors hover:text-white"
                >
                  {profile.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${profile.phoneHref}`}
                  className="text-[0.86rem] text-[hsl(var(--ash))] transition-colors hover:text-white"
                >
                  {profile.phone}
                </a>
              </li>
              <li className="text-[0.86rem] text-[hsl(var(--fog))]">{profile.location}</li>
              <li>
                <a
                  href={profile.resumeUrl}
                  download
                  className="text-[0.86rem] text-[hsl(var(--violet))] transition-colors hover:text-white"
                >
                  Download résumé (PDF)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-[hsl(0_0%_100%/0.08)] pt-6">
          <p className="text-[0.76rem] text-[hsl(var(--fog))]">
            © {year} {profile.name}. Built with React, Tailwind and a lot of Java.
          </p>
          <motion.a
            href="#home"
            whileHover={{ y: -2 }}
            className="inline-flex items-center gap-1.5 text-[0.76rem] font-medium text-[hsl(var(--ash))] transition-colors hover:text-white"
          >
            Back to top
            <ArrowUp className="h-3 w-3" />
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
