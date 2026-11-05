export interface Service {
  title: string;
  description: string;
  icon: "server" | "database" | "layers" | "gauge" | "shield" | "wrench";
  deliverables: string[];
}

export const services: Service[] = [
  {
    title: "Backend Development",
    description:
      "Service layers and REST APIs in Java that stay readable as they grow, with clear separation between transport, domain and persistence.",
    icon: "server",
    deliverables: ["REST APIs", "Servlets & JSP", "Hibernate ORM"],
  },
  {
    title: "Database Design",
    description:
      "Relational schemas that reflect the domain, with indexing and query tuning so features stay fast as data accumulates.",
    icon: "database",
    deliverables: ["Schema design", "Query optimisation", "MySQL & PostgreSQL"],
  },
  {
    title: "Full-Stack Applications",
    description:
      "Complete products — authentication, role-based access, admin tooling and responsive interfaces — built on an MVC foundation.",
    icon: "layers",
    deliverables: ["Multi-role systems", "Auth flows", "Responsive UI"],
  },
  {
    title: "Performance & Reliability",
    description:
      "Profiling slow paths, tightening data access and removing the failure modes that surface only in production.",
    icon: "gauge",
    deliverables: ["Query profiling", "Caching", "Data consistency"],
  },
  {
    title: "Secure Authentication",
    description:
      "Registration, verification, recovery and session handling implemented with hashing, expiring tokens and anti-enumeration patterns.",
    icon: "shield",
    deliverables: ["BCrypt & SMTP", "Session management", "Role-based access"],
  },
  {
    title: "Tooling & Workflow",
    description:
      "Containerised environments, API testing and version control discipline so a project is reproducible for anyone who clones it.",
    icon: "wrench",
    deliverables: ["Docker", "Postman testing", "Git workflow"],
  },
];

export const process = [
  {
    step: "01",
    title: "Understand",
    description: "Read the requirement properly, question assumptions, write down what success looks like.",
  },
  {
    step: "02",
    title: "Design",
    description: "Model the data and the boundaries first; choose structures that won't need rewriting.",
  },
  {
    step: "03",
    title: "Build",
    description: "Small, reviewable increments with tests at the edges and clean, structured logic inside.",
  },
  {
    step: "04",
    title: "Ship",
    description: "Deploy, verify against real traffic, then tune the slow parts that only appear in production.",
  },
] as const;
