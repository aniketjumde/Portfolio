import { JAVA_ICON, TECH_ICONS } from "@/components/ui/tech-icons";
import { cn } from "@/lib/utils";
import type { Skill } from "@/data/skills";

/**
 * Renders a brand mark for a skill. Unknown marks fall back to a typographic
 * monogram rather than a borrowed logo, so nothing is misrepresented.
 */
export function TechIcon({ skill, className }: { skill: Skill; className?: string }) {
  const icon =
    skill.icon === "java"
      ? JAVA_ICON
      : skill.icon
        ? TECH_ICONS[skill.icon]
        : null;

  if (!icon) {
    // Monogram fallback: initials, tinted with the skill's own accent.
    const initials = skill.name
      .replace(/[^A-Za-z ]/g, "")
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();

    return (
      <span
        className={cn(
          "grid h-9 w-9 place-items-center rounded-lg border font-mono text-[0.7rem] font-bold tracking-tight",
          className,
        )}
        style={{
          borderColor: `${skill.tint ?? "#a855f7"}55`,
          color: skill.tint ?? "#a855f7",
          background: `${skill.tint ?? "#a855f7"}14`,
        }}
        aria-hidden="true"
      >
        {initials}
      </span>
    );
  }

  return (
    <svg
      role="img"
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={cn("h-9 w-9", className)}
      fill={icon.hex}
    >
      <path d={icon.path} />
    </svg>
  );
}
