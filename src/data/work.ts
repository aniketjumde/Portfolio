export interface Project {
  slug: string;
  index: string;
  title: string;
  /** Two-line poster title used in the index */
  shortTitle: string;
  category: string;
  year: string;
  role: string;
  /** One sentence for the index row */
  tagline: string;
  /** Full description for the detail view */
  description: string;
  /** What I actually did — mirrors the résumé bullets */
  contribution: string[];
  tech: string[];
  demoUrl?: string;
  codeUrl?: string;
  /** Palette + label for the CSS-drawn visual */
  visual: {
    from: string;
    to: string;
    accent: string;
    label: string;
  };
}

/**
 * Both projects are taken verbatim from the résumé's
 * "Professional Experience & Projects" section.
 *
 * Only repository URLs that verifiably exist on the public GitHub account are
 * included. No demo URLs are fabricated — the résumé lists none.
 */
export const projects: Project[] = [
  {
    slug: "online-examination-system",
    index: "01",
    title: "Online Examination System",
    shortTitle: "EXAM\nSYSTEM",
    category: "Multi-role web platform",
    year: "2025",
    role: "Full-stack · Java",
    tagline:
      "A web-based examination platform where admins, teachers and students each get a distinct, role-appropriate experience.",
    description:
      "An examination system built around three distinct roles. Administrators and teachers manage the question bank, students sit exams, and the platform evaluates responses and generates results — all over a PostgreSQL schema accessed through JDBC.",
    contribution: [
      "Role-based access control separating Admin, Teacher and Student capabilities",
      "Question management, exam evaluation and result generation modules",
      "JDBC and Servlets for database connectivity and dynamic content rendering",
    ],
    tech: ["Java", "JDBC", "Servlet", "JSP", "HTML", "CSS", "JavaScript", "PostgreSQL"],
    visual: {
      from: "#1A1F14",
      to: "#0B0B0A",
      accent: "#D4FF38",
      label: "exam.sys",
    },
  },
  {
    slug: "student-management-system",
    index: "02",
    title: "Student Management System",
    shortTitle: "STUDENT\nRECORDS",
    category: "Records & CRUD",
    year: "2025",
    role: "Full-stack · Java",
    tagline:
      "A responsive records platform with complete CRUD, built on a relational schema designed for consistency and security.",
    description:
      "A platform for managing student records end to end. The emphasis is on the data layer: a normalised PostgreSQL schema with the constraints that keep records consistent, with Servlets and JSP delivering the interface on top.",
    contribution: [
      "Responsive web interface covering full CRUD on student records",
      "Relational schema in PostgreSQL enforcing data consistency and security",
      "Servlets and JSP integrated for a seamless user experience",
    ],
    tech: ["Java", "JDBC", "Servlet", "JSP", "Bootstrap", "PostgreSQL"],
    codeUrl: "https://github.com/aniketjumde/Student-Managment-System",
    visual: {
      from: "#14181F",
      to: "#0B0B0A",
      accent: "#8AB4FF",
      label: "records.db",
    },
  },
];
