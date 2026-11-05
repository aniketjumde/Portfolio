export interface Project {
  slug: string;
  index: string;
  title: string;
  /** editorial kicker shown above the title */
  kicker: string;
  year: string;
  role: string;
  summary: string;
  /** Resume bullets, rewritten professionally but factually unchanged. */
  highlights: string[];
  tech: string[];
  demoUrl?: string;
  codeUrl?: string;
  /** Palette for the CSS-drawn project plate */
  plate: {
    bg: string;
    accent: string;
    /** short mono string rendered inside the mock UI */
    mono: string;
  };
}

/**
 * Both projects are taken directly from the resume's
 * "Professional Experience & Projects" section.
 * No URL is fabricated — links are added only where a real repository exists.
 */
export const projects: Project[] = [
  {
    slug: "online-examination-system",
    index: "01",
    title: "Online Examination System",
    kicker: "Role-based assessment platform",
    year: "2025",
    role: "Full-stack · Java",
    summary:
      "A web-based examination platform with distinct experiences for administrators, teachers and students — question authoring, exam delivery, automated evaluation and result generation handled in one system.",
    highlights: [
      "Role-based access control across Admin, Teacher and Student views",
      "Question management, exam evaluation and result generation modules",
      "JDBC and Servlets for backend database connectivity and dynamic rendering",
    ],
    tech: ["Java", "JDBC", "Servlet", "JSP", "HTML", "CSS", "JavaScript", "PostgreSQL"],
    plate: {
      bg: "#1B2A3A",
      accent: "#E8734A",
      mono: "exam.sys",
    },
  },
  {
    slug: "student-management-system",
    index: "02",
    title: "Student Management System",
    kicker: "Records & CRUD, done properly",
    year: "2025",
    role: "Full-stack · Java",
    summary:
      "A responsive platform for managing student records with complete CRUD operations, built on a relational PostgreSQL schema designed for consistency and security rather than convenience.",
    highlights: [
      "Responsive web interface covering full CRUD on student records",
      "Relational schema in PostgreSQL enforcing data consistency and security",
      "Servlets and JSP integrated for a seamless user experience",
    ],
    tech: ["Java", "JDBC", "Servlet", "JSP", "Bootstrap", "PostgreSQL"],
    plate: {
      bg: "#2E2A22",
      accent: "#7FB069",
      mono: "records.db",
    },
  },
];
