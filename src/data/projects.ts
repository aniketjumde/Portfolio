export type ProjectCategory = "Web Application" | "Java";

export interface Project {
  /** URL-safe identifier, also used as a React key */
  slug: string;
  title: string;
  category: ProjectCategory;
  /** Short label shown on the card chip */
  kicker: string;
  date: string;
  description: string;
  highlights: string[];
  tech: string[];
  demoUrl: string;
  codeUrl: string;
  /** Marks the flagship project — gets a wider, richer card */
  featured?: boolean;
  /** Simple abstract "screenshot" rendered in CSS (no external assets) */
  cover: {
    /** Tailwind gradient stops */
    from: string;
    to: string;
    /** Short mono label rendered inside the cover mock */
    mock: string;
  };
}

/**
 * Projects are ordered flagship-first. All content is preserved verbatim
 * from the original portfolio; only presentation has been reorganised.
 */
export const projects: Project[] = [
  {
    slug: "student-management-system",
    title: "Student Management System",
    category: "Web Application",
    kicker: "Academic platform",
    date: "Sep 2025",
    description:
      "A responsive web application for managing student records with complete CRUD functionality, designed to simplify academic data handling and improve workflow efficiency.",
    highlights: [
      "Full CRUD across student records",
      "Optimised database queries for faster retrieval",
      "Responsive interface for admins on any device",
    ],
    tech: ["Java", "JDBC", "JSP", "Servlets", "PostgreSQL"],
    demoUrl: "https://studentmanagmentsystem-jqqt.onrender.com/",
    codeUrl: "https://github.com/aniketjumde/Student-Managment-System",
    featured: true,
    cover: {
      from: "#0E7C66",
      to: "#0B3B52",
      mock: "students.db",
    },
  },
  {
    slug: "real-estate-web-app",
    title: "RealEstate Web Application",
    category: "Web Application",
    kicker: "Multi-role marketplace",
    date: "Jan 2026",
    description:
      "A full-stack Java-based real estate management system built using JSP/Servlets, Hibernate, MySQL and MVC architecture, allowing users to list, browse and manage properties with role-based access.",
    highlights: [
      "Three roles: Admin, Seller and Buyer",
      "Inquiry system plus an admin panel with dashboard analytics",
      "Firebase authentication layered over an MVC codebase",
    ],
    tech: [
      "Java",
      "JSP",
      "Servlets",
      "Hibernate",
      "MySQL",
      "Maven",
      "Apache Tomcat",
      "JavaScript",
    ],
    demoUrl: "https://realestatewebapp-3wn5.onrender.com",
    codeUrl: "https://github.com/aniketjumde/RealEstateWebApp",
    cover: {
      from: "#1E3A8A",
      to: "#0B2A45",
      mock: "listings.map",
    },
  },
  {
    slug: "email-verification-system",
    title: "Email Verification Login System",
    category: "Java",
    kicker: "Authentication suite",
    date: "Dec 2025",
    description:
      "A secure, enterprise-grade authentication system designed with layered architecture and robust validation workflows. It handles registration, login, email verification, password recovery and complete session management with industry-standard security throughout.",
    highlights: [
      "End-to-end authentication: signup, verify, reset, activate",
      "BCrypt password hashing and SMTP verification mail",
      "Java Swing interface backed by JDBC persistence",
    ],
    tech: ["Java", "Servlets", "JSP", "Hibernate", "SMTP Email", "BCrypt", "MySQL"],
    demoUrl: "https://github.com/aniketjumde/EmailVerificationSystem",
    codeUrl: "https://github.com/aniketjumde/EmailVerificationSystem",
    cover: {
      from: "#4C1D95",
      to: "#1E1B4B",
      mock: "auth.flow",
    },
  },
];

