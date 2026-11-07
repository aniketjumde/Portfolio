import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechIcon } from "@/components/ui/tech-icon";
import { EASE_OUT_EXPO } from "@/components/motion/easing";
import { skillFilters, skills, type SkillCategory } from "@/data/skills";
import { cn } from "@/lib/utils";

type Filter = (typeof skillFilters)[number]["id"];

/**
 * Filterable technology grid.
 *
 * Mirrors the reference's skill section: pill filters, then a grid of glass
 * tiles that lift and glow on hover. Filtering is instant and keyboard
 * operable, and the tiles are laid out 2-up on phones through 5-up on desktop
 * rather than being a compressed desktop grid.
 */
export function Skills() {
  const [filter, setFilter] = useState<Filter>("All");

  const visible = useMemo(
    () => (filter === "All" ? skills : skills.filter((s) => s.category === (filter as SkillCategory))),
    [filter],
  );

  return (
    <section id="skills" className="section relative">
      <div className="shell relative z-10">
        <SectionHeading
          eyebrow="03 — Skills"
          title="Technical"
          accent="toolkit"
          lede="Every technology here comes straight from my résumé. No proficiency percentages — just what I actually work with."
        />

        {/* Filters */}
        <div
          role="tablist"
          aria-label="Filter skills by category"
          className="mt-9 flex flex-wrap items-center justify-center gap-2"
        >
          {skillFilters.map((f) => {
            const selected = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-[0.8rem] font-medium transition-all duration-300",
                  selected
                    ? "border-[hsl(var(--violet))] bg-[hsl(var(--violet))] text-white shadow-[0_6px_22px_-8px_hsl(var(--violet))]"
                    : "border-[hsl(0_0%_100%/0.14)] bg-white/[0.03] text-[hsl(var(--ash))] hover:border-[hsl(var(--violet))]/60 hover:text-white",
                )}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="mt-8">
          <motion.ul
            layout
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          >
            <AnimatePresence mode="popLayout">
              {visible.map((skill) => (
                <motion.li
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.32, ease: EASE_OUT_EXPO }}
                  className="skill-tile"
                >
                  <TechIcon skill={skill} />
                  <span className="text-center text-[0.8rem] font-semibold leading-tight text-white">
                    {skill.name}
                  </span>
                  <span className="text-center text-[0.6rem] uppercase tracking-[0.08em] text-[hsl(var(--fog))]">
                    {skill.note}
                  </span>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>

        <p className="mt-6 text-center text-[0.78rem] text-[hsl(var(--fog))]">
          {visible.length} {visible.length === 1 ? "technology" : "technologies"}
          {filter !== "All" && ` in ${filter}`} · {skills.length} in total
        </p>
      </div>
    </section>
  );
}
