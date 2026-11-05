export interface SkillGroup {
  title: string;
  /** lucide icon name, mapped in the Skills component */
  icon: "code" | "database" | "layout" | "tools" | "terminal" | "server";
  blurb: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    icon: "code",
    blurb: "Core languages I write and reason in daily.",
    items: ["Java", "C", "C++", "Python", "SQL"],
  },
  {
    title: "Databases",
    icon: "database",
    blurb: "Relational modelling, query tuning and schema design.",
    items: ["MySQL", "PostgreSQL"],
  },
  {
    title: "Web",
    icon: "layout",
    blurb: "Server-rendered views and interactive front-ends.",
    items: ["HTML5", "CSS3", "JavaScript", "JSP", "Servlets"],
  },
  {
    title: "Frameworks & Tools",
    icon: "tools",
    blurb: "The kit I reach for across the delivery cycle.",
    items: ["Hibernate", "Docker", "Git", "GitHub", "Firebase", "Postman", "Maven"],
  },
  {
    title: "Environments",
    icon: "terminal",
    blurb: "Where the code actually runs.",
    items: ["IntelliJ IDEA", "Eclipse", "VS Code", "Windows", "Linux"],
  },
  {
    title: "Backend",
    icon: "server",
    blurb: "Architecture and the service layer.",
    items: ["REST APIs", "MVC", "JDBC", "Apache Tomcat"],
  },
];

export const coreConcepts = [
  "Data Structures & Algorithms",
  "Object-Oriented Programming",
  "Multithreading",
  "Debugging",
  "Design Patterns",
  "REST APIs",
  "MVC Architecture",
];

export const softSkills = [
  { name: "Teamwork", detail: "Pairing, review and shared ownership" },
  { name: "Communication", detail: "Clear specs, honest status updates" },
  { name: "Leadership", detail: "Owning a module end to end" },
];

/** Flattened, de-duplicated list used by the hero marquee. */
export const allTechnologies = Array.from(
  new Set(skillGroups.flatMap((g) => g.items)),
);
