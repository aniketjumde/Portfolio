export interface ExperienceItem {
  period: string;
  title: string;
  org: string;
  type: "Education" | "Project" | "Certification";
  location?: string;
  grade?: string;
  summary: string;
  points: string[];
}

/**
 * A single honest timeline. The portfolio has no employment history yet,
 * so this documents education and self-directed engineering work with the
 * same rigour a role would get.
 */
export const experience: ExperienceItem[] = [
  {
    period: "2023 — 2027",
    title: "B.Tech, Information Technology",
    org: "JSPM's Rajarshi Shahu College of Engineering, Pune",
    type: "Education",
    location: "Pune, Maharashtra",
    grade: "8.14 CGPA",
    summary:
      "Studying software development, data structures, algorithms and system design while shipping production-style applications alongside coursework.",
    points: [
      "Built and deployed three full-stack applications using Java, JSP/Servlets and Hibernate",
      "Practice 200+ algorithmic problems across arrays, trees, graphs and dynamic programming",
      "Completed 8 certifications spanning Java, DSA, Hibernate and API testing",
    ],
  },
  {
    period: "2024 — Present",
    title: "Independent Full-Stack Development",
    org: "Self-directed engineering",
    type: "Project",
    summary:
      "Designing and delivering multi-role web platforms end to end — schema, service layer, views and deployment.",
    points: [
      "RealEstate platform: role-based access for Admin, Seller and Buyer with dashboard analytics",
      "Student Management System: full CRUD with query optimisation over PostgreSQL",
      "Email Verification System: layered authentication with BCrypt and SMTP delivery",
    ],
  },
  {
    period: "2021 — 2023",
    title: "Higher Secondary & Secondary Education",
    org: "Maharashtra State Board",
    type: "Education",
    location: "Buldhana, Maharashtra",
    grade: "HSC 63.50% · SSC 85.50%",
    summary:
      "Completed school and junior college with a science focus before moving into engineering.",
    points: [
      "HSC — Shivsai Universal Junior College, Buldhana (2023)",
      "SSC — Z.P. High School, Sakhali Bk, Buldhana (2021)",
    ],
  },
];

export const educationSummary = {
  degree: "B.Tech in Information Technology",
  school: "JSPM's Rajarshi Shahu College of Engineering, Pune",
  year: "2023–2027",
  /** Single authoritative CGPA — previously reported as both 8.14 and 8.50 */
  cgpa: "8.14",
};
