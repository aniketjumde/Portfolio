import type { TechIconKey } from "@/components/ui/tech-icons";

/**
 * Skills exactly as the résumé lists them, shaped for the reference's
 * filterable icon grid.
 *
 * `icon` keys into components/ui/tech-icons. Items with no honest brand mark
 * (`icon: null`) render as a typographic tile instead of borrowing someone
 * else's logo.
 */

export type SkillCategory = "Languages" | "Frontend" | "Backend" | "Databases" | "Tools";

export interface Skill {
  name: string;
  /** short descriptor shown under the name */
  note: string;
  category: SkillCategory;
  icon: TechIconKey | "java" | null;
  /** fallback colour when the icon carries no brand hex */
  tint?: string;
}

export const skillFilters = [
  { id: "All", label: "All" },
  { id: "Languages", label: "Languages" },
  { id: "Frontend", label: "Frontend" },
  { id: "Backend", label: "Backend" },
  { id: "Databases", label: "Databases" },
  { id: "Tools", label: "Tools" },
] as const;

export const skills: Skill[] = [
  // ── Languages ──────────────────────────────────────────
  { name: "Java", note: "Core & Collections", category: "Languages", icon: "java", tint: "#F89820" },
  { name: "C", note: "Systems", category: "Languages", icon: "siC" },
  { name: "C++", note: "DSA", category: "Languages", icon: "siCplusplus" },
  { name: "SQL", note: "Queries", category: "Languages", icon: "siPostgresql", tint: "#6C8EBF" },
  { name: "PL/SQL", note: "Procedural", category: "Languages", icon: null, tint: "#a855f7" },
  { name: "JavaScript", note: "Browser", category: "Languages", icon: "siJavascript" },

  // ── Frontend ───────────────────────────────────────────
  { name: "HTML", note: "Structure", category: "Frontend", icon: "siHtml5" },
  { name: "CSS", note: "Styling", category: "Frontend", icon: "siCss" },
  { name: "JSP", note: "Server templates", category: "Frontend", icon: null, tint: "#a855f7" },
  { name: "Bootstrap", note: "Responsive UI", category: "Frontend", icon: null, tint: "#7952B3" },

  // ── Backend ────────────────────────────────────────────
  { name: "Servlets", note: "Request handling", category: "Backend", icon: null, tint: "#a855f7" },
  { name: "Hibernate", note: "ORM", category: "Backend", icon: "siHibernate" },
  { name: "REST APIs", note: "Integration", category: "Backend", icon: "siPostman", tint: "#a855f7" },
  { name: "Tomcat", note: "Servlet container", category: "Backend", icon: "siApachetomcat" },
  { name: "MVC", note: "Architecture", category: "Backend", icon: null, tint: "#a855f7" },
  { name: "JDBC", note: "DB connectivity", category: "Backend", icon: null, tint: "#a855f7" },

  // ── Databases ──────────────────────────────────────────
  { name: "PostgreSQL", note: "Relational", category: "Databases", icon: "siPostgresql" },
  { name: "MySQL", note: "Relational", category: "Databases", icon: "siMysql" },
  { name: "MongoDB", note: "Document", category: "Databases", icon: "siMongodb" },
  { name: "Firebase", note: "Realtime", category: "Databases", icon: "siFirebase" },

  // ── Tools ──────────────────────────────────────────────
  { name: "Git", note: "Version control", category: "Tools", icon: "siGit" },
  { name: "GitHub", note: "Collaboration", category: "Tools", icon: "siGithub" },
  { name: "Docker", note: "Containers", category: "Tools", icon: "siDocker" },
  { name: "Postman", note: "API testing", category: "Tools", icon: "siPostman" },
  { name: "IntelliJ IDEA", note: "IDE", category: "Tools", icon: "siIntellijidea" },
  { name: "Eclipse", note: "IDE", category: "Tools", icon: "siEclipseide" },
  { name: "VS Code", note: "Editor", category: "Tools", icon: null, tint: "#007ACC" },
  { name: "Linux", note: "Ubuntu", category: "Tools", icon: "siLinux" },
];

/** Flat list of every technology name, de-duplicated, for marquees. */
export const allSkills = Array.from(new Set(skills.map((s) => s.name)));

export interface SkillGroup {
  id: string;
  title: string;
  note: string;
  items: string[];
}

/** Grouped view, used by the About section and the résumé-style ledger. */
export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: "Languages",
    note: "The core of the work",
    items: ["Java (Core, Collections)", "JSP", "Servlets", "Hibernate ORM", "C", "C++", "SQL", "PL/SQL"],
  },
  {
    id: "databases",
    title: "Databases",
    note: "Modelling and querying",
    items: ["MySQL", "PostgreSQL", "MongoDB"],
  },
  {
    id: "web",
    title: "Web Technologies",
    note: "Browser to backend",
    items: ["HTML", "CSS", "JavaScript", "REST APIs", "MVC Architecture"],
  },
  {
    id: "concepts",
    title: "Core Concepts",
    note: "The part that transfers",
    items: ["Data Structures", "Algorithms", "OOP", "Multithreading", "Debugging", "Design Patterns"],
  },
  {
    id: "tools",
    title: "Tools & Frameworks",
    note: "Day-to-day kit",
    items: ["GitHub", "Docker", "Postman API", "Firebase", "IntelliJ IDEA", "Eclipse", "Visual Studio Code"],
  },
  {
    id: "systems",
    title: "Operating Systems",
    note: "Where it runs",
    items: ["Windows", "Linux (Ubuntu)"],
  },
];
