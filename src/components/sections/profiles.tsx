import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { GithubIcon, LeetcodeIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { EASE_OUT_EXPO } from "@/components/motion/easing";
import { profile } from "@/data/profile";

/**
 * Web presence — profile cards, matching the reference's "Dev Network"
 * section: a card per platform with a handle, a call to action and an
 * outbound link.
 *
 * Only platforms with a known-good URL appear. HackerRank is referenced by the
 * résumé but names no handle, so it is deliberately absent rather than guessed.
 */
const profiles = [
  {
    label: "LinkedIn",
    handle: "aniket-jumde",
    action: "Connect",
    href: "https://www.linkedin.com/in/aniket-jumde-74275a289/",
    Icon: LinkedinIcon,
    tint: "#0A66C2",
  },
  {
    label: "GitHub",
    handle: "@aniketjumde",
    action: "Commit",
    href: "https://github.com/aniketjumde",
    Icon: GithubIcon,
    tint: "#ffffff",
  },
  {
    label: "LeetCode",
    handle: "AniketJumde55",
    action: "Compete",
    href: "https://leetcode.com/u/AniketJumde55/",
    Icon: LeetcodeIcon,
    tint: "#FFA116",
  },
  {
    label: "Email",
    handle: profile.email,
    action: "Write",
    href: `mailto:${profile.email}`,
    Icon: Mail,
    tint: "#a855f7",
  },
];

export function Profiles() {
  return (
    <section id="profiles" className="section relative">
      <div className="shell relative z-10">
        <SectionHeading
          eyebrow="06 — Web presence"
          title="Find me"
          accent="elsewhere"
          lede="Where the rest of the work lives. Every card opens in a new tab."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {profiles.map((p, i) => (
            <motion.a
              key={p.label}
              href={p.href}
              target={p.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease: EASE_OUT_EXPO, delay: i * 0.06 }}
              className="card card-lit group flex flex-col p-5 transition-transform duration-300 hover:-translate-y-1.5"
            >
              <div className="flex items-start justify-between">
                <span
                  className="grid h-10 w-10 place-items-center rounded-lg border"
                  style={{
                    borderColor: `${p.tint}44`,
                    background: `${p.tint}14`,
                    color: p.tint,
                  }}
                >
                  <p.Icon className="h-[1.15rem] w-[1.15rem]" />
                </span>
                <ArrowUpRight className="h-4 w-4 text-[hsl(var(--fog))] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
              </div>

              <p className="mt-4 text-[0.95rem] font-semibold text-white">{p.label}</p>
              <p className="mt-1 truncate font-mono text-[0.68rem] text-[hsl(var(--fog))]">
                {p.handle}
              </p>

              <span className="mt-4 inline-flex items-center gap-1 text-[0.78rem] font-medium text-[hsl(var(--violet))] transition-colors group-hover:text-white">
                {p.action}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
