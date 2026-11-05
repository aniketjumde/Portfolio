export interface Certification {
  title: string;
  issuer: string;
  group: string;
}

/**
 * The resume lists certifications by issuer and subject area rather than
 * individually titled credentials. This preserves that grouping exactly
 * instead of inventing per-certificate titles.
 */
export const certificationGroups: { group: string; issuer: string; items: string[] }[] = [
  {
    group: "Java & Backend",
    issuer: "Techno Comp Academy",
    items: ["Core Java (J2SE)", "Advanced Java (J2EE)", "Hibernate ORM"],
  },
  {
    group: "Programming Foundations",
    issuer: "Techno Comp Academy",
    items: ["C", "C++", "Python", "Data Structures & Algorithms in C"],
  },
  {
    group: "Databases",
    issuer: "Techno Comp Academy",
    items: ["SQL & PL/SQL (PostgreSQL & MySQL)"],
  },
  {
    group: "API Testing",
    issuer: "Postman",
    items: ["Postman API Fundamentals Student Expert"],
  },
];

export const certificationCount = certificationGroups.reduce(
  (total, group) => total + group.items.length,
  0,
);

export interface Achievement {
  metric: string;
  title: string;
  detail: string;
  tone: "oxide" | "ultra" | "moss";
}

export const achievements: Achievement[] = [
  {
    metric: "5★",
    title: "Five-star HackerRank ratings",
    detail:
      "Earned 5-star ratings in C, C++, Java and SQL on HackerRank — four languages, one problem-solving standard.",
    tone: "oxide",
  },
  {
    metric: "150+",
    title: "Problems solved on LeetCode",
    detail:
      "Working continuously through algorithmic problems to keep data structures and complexity analysis sharp.",
    tone: "ultra",
  },
  {
    metric: "8.22",
    title: "CGPA in B.Tech IT",
    detail:
      "Sustained academic performance across an Information Technology degree running 2023 to 2027.",
    tone: "moss",
  },
];

/**
 * Only include profile URLs that are known-good. The resume references a
 * HackerRank profile but does not state the handle, so no guessed URL is added.
 */
export const profileLinks = [
  { label: "LeetCode", href: "https://leetcode.com/u/AniketJumde55/" },
] as const;
