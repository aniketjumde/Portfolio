export interface TimelineEntry {
  period: string;
  title: string;
  org: string;
  kind: "Education" | "Practice";
  metric?: string;
  summary: string;
  notes: string[];
}

/**
 * The resume lists education and project work; there is no employment history.
 * The timeline therefore documents study and self-directed practice honestly.
 */
export const timeline: TimelineEntry[] = [
  {
    period: "2023 — 2027",
    title: "B.Tech, Information Technology",
    org: "JSPM's Rajarshi Shahu College of Engineering, Pune",
    kind: "Education",
    metric: "8.22 CGPA",
    summary:
      "Undergraduate study in information technology alongside continuous hands-on Java development — the source of the one-year-plus practical foundation.",
    notes: [
      "Coursework spanning data structures, algorithms and system design",
      "Building and deploying web applications throughout the degree",
    ],
  },
  {
    period: "2024 — Present",
    title: "Applied Java Development",
    org: "Self-directed · project-based",
    kind: "Practice",
    metric: "2 systems shipped",
    summary:
      "Building complete multi-role web systems end to end — relational schema, servlet and JSP layers, and the interface on top.",
    notes: [
      "Online Examination System with Admin, Teacher and Student roles",
      "Student Management System with a consistency-focused PostgreSQL schema",
    ],
  },
  {
    period: "2023",
    title: "Higher Secondary Certificate",
    org: "Shivsai Universal Junior College, Buldhana",
    kind: "Education",
    metric: "63.50%",
    summary: "Maharashtra State Board, science stream.",
    notes: [],
  },
  {
    period: "2021",
    title: "Secondary School Certificate",
    org: "Z.P. High School · Maharashtra State Board",
    kind: "Education",
    metric: "85.50%",
    summary: "Maharashtra State Board.",
    notes: [],
  },
];

export const education = {
  degree: "B.Tech in Information Technology",
  school: "JSPM's Rajarshi Shahu College of Engineering, Pune",
  period: "2023–2027",
  cgpa: "8.22",
} as const;
