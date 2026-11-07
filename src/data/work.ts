export interface Project {
  slug: string;
  index: string;
  title: string;
  /** short category shown above the title, like the reference's card eyebrow */
  category: string;
  /** date stamp shown on the card, e.g. "MAY-2K25" */
  stamp: string;
  tagline: string;
  description: string;
  contribution: string[];
  tech: string[];
  demoUrl?: string;
  demoNote?: string;
  codeUrl?: string;
  /** Which hand-built screen illustration to render */
  mock: "records" | "form" | "dashboard" | "result";
  mockSecondary?: "records" | "form" | "dashboard" | "result";
  /** Cover artwork tokens — rendered as CSS, no image payload */
  art: {
    from: string;
    to: string;
    accent: string;
    label: string;
  };
}

/**
 * Both projects come verbatim from the résumé's
 * "Professional Experience & Projects" section.
 *
 * Links are only included where a public URL verifiably exists on the
 * account: the Student Management System has both a repository and a live
 * deployment documented in its own README. No demo URL is invented for the
 * examination system.
 */
export const projects: Project[] = [
  {
    slug: "online-examination-system",
    index: "01",
    title: "Online Examination System",
    category: "Full-stack · Java",
    stamp: "2K25",
    tagline:
      "A multi-role examination platform where admins, teachers and students each get a distinct, role-appropriate experience.",
    description:
      "An examination system built around three distinct roles. Administrators and teachers manage the question bank, students sit exams, and the platform evaluates responses and generates results — all over a PostgreSQL schema accessed through JDBC.",
    contribution: [
      "Role-based access control separating Admin, Teacher and Student capabilities",
      "Question management, exam evaluation and result generation modules",
      "JDBC and Servlets for database connectivity and dynamic content rendering",
    ],
    tech: ["Java", "JDBC", "Servlet", "JSP", "HTML", "CSS", "JavaScript", "PostgreSQL"],
    mock: "dashboard",
    mockSecondary: "result",
    art: {
      from: "#1b1030",
      to: "#0b0b0b",
      accent: "#a855f7",
      label: "exam.sys",
    },
  },
  {
    slug: "student-management-system",
    index: "02",
    title: "Student Management System",
    category: "Records & CRUD",
    stamp: "2K25",
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
    demoUrl: "https://studentmanagmentsystem-jqqt.onrender.com/",
    demoNote: "Free Render instance — first load may take ~30s to wake.",
    mock: "records",
    mockSecondary: "form",
    art: {
      from: "#0f1b2d",
      to: "#0b0b0b",
      accent: "#60a5fa",
      label: "records.db",
    },
  },
];
