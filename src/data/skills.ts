export interface SkillGroup {
  id: string;
  title: string;
  /** short editorial descriptor */
  note: string;
  items: string[];
}

/** Directly from the resume's "Technical Skills" section. */
export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: "Languages",
    note: "The core of the work",
    items: [
      "Java (Core, Collections)",
      "JSP",
      "Servlets",
      "Hibernate ORM",
      "C",
      "C++",
      "SQL",
      "PL/SQL",
    ],
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
    items: [
      "Data Structures",
      "Algorithms",
      "OOP",
      "Multithreading",
      "Debugging",
      "Design Patterns",
    ],
  },
  {
    id: "tools",
    title: "Tools & Frameworks",
    note: "Day-to-day kit",
    items: [
      "GitHub",
      "Docker",
      "Postman API",
      "Firebase",
      "IntelliJ IDEA",
      "Eclipse",
      "Visual Studio Code",
    ],
  },
  {
    id: "systems",
    title: "Operating Systems",
    note: "Where it runs",
    items: ["Windows", "Linux (Ubuntu)"],
  },
];

/** Flat, de-duplicated list for the marquee (compound labels split). */
export const allSkills = Array.from(
  new Set(
    skillGroups.flatMap((g) =>
      g.items.flatMap((item) =>
        item.replace(/\s*\(.*?\)/g, "").split(",").map((s) => s.trim()),
      ),
    ),
  ),
).filter(Boolean);
