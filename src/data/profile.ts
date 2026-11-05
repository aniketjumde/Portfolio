/**
 * Source of truth: public/AniketCV.pdf.
 * Every fact below is transcribed from the résumé — nothing invented.
 */

export const profile = {
  name: "Aniket Jumde",
  first: "Aniket",
  last: "Jumde",
  monogram: "AJ",
  role: "Java Developer",
  discipline: "Problem Solver",
  location: "Pune, Maharashtra",
  email: "aniketjumde55@gmail.com",
  phone: "+91 93569 91161",
  phoneHref: "+919356991161",
  resumeUrl: "/AniketCV.pdf",

  /** Résumé summary, lightly tightened for the web. */
  summary:
    "An aspiring problem solver with a strong foundation in mathematics and logic, and over a year of hands-on experience in Java. I build efficient, reliable, user-focused web applications.",

  /** Poster headline for the hero. */
  headline: ["BUILD", "SYS—", "TEMS."],

  /** Short standfirst under the headline. */
  standfirst:
    "Multi-role web applications with relational backends — schema, servlets, and interface built to agree with each other.",

  availability: "Open to internships & full-time roles",
  availabilityShort: "Available for work",
} as const;

export const socials = [
  { label: "GitHub", handle: "@aniketjumde", href: "https://github.com/aniketjumde" },
  {
    label: "LinkedIn",
    handle: "aniket-jumde",
    href: "https://www.linkedin.com/in/aniket-jumde-74275a289/",
  },
  { label: "LeetCode", handle: "AniketJumde55", href: "https://leetcode.com/u/AniketJumde55/" },
  { label: "Email", handle: "aniketjumde55", href: "mailto:aniketjumde55@gmail.com" },
] as const;

export type SocialLabel = (typeof socials)[number]["label"];

export const navigation = [
  { id: "work", name: "Work", index: "01" },
  { id: "about", name: "About", index: "02" },
  { id: "skills", name: "Skills", index: "03" },
  { id: "experience", name: "Experience", index: "04" },
  { id: "contact", name: "Contact", index: "05" },
] as const;

/** Headline metrics — all traceable to the résumé. */
export const metrics = [
  { value: "1+", label: "Years with Java" },
  { value: "150+", label: "LeetCode problems" },
  { value: "5★", label: "HackerRank ratings" },
  { value: "8.22", label: "CGPA, B.Tech IT" },
] as const;
