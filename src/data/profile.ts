/**
 * Single source of truth, transcribed from AniketCV.pdf.
 * Facts here are authoritative — nothing is invented.
 */

export const profile = {
  name: "Aniket Jumde",
  initials: "AJ",
  role: "Java Developer",
  discipline: "Problem Solver",
  location: "Pune, Maharashtra",
  education: "B.Tech, Information Technology",
  email: "aniketjumde55@gmail.com",
  phone: "+91 93569 91161",
  phoneHref: "+919356991161",
  resumeUrl: "/AniketCV.pdf",

  /** Verbatim-intent summary from the resume, lightly tightened. */
  summary:
    "An aspiring problem solver with a strong foundation in mathematics and logic, and over a year of hands-on experience in Java. I build efficient, reliable, user-focused web applications.",

  /** Short editorial standfirst for the hero. */
  standfirst:
    "Over a year of hands-on Java — building systems where the schema, the service layer and the interface all agree with each other.",

  availability: "Open to internships & full-time roles",
} as const;

export const socials = [
  {
    label: "GitHub",
    handle: "aniketjumde",
    href: "https://github.com/aniketjumde",
    thead: "Code",
  },
  {
    label: "LinkedIn",
    handle: "aniket-jumde",
    href: "https://www.linkedin.com/in/aniket-jumde-74275a289/",
    thead: "Network",
  },
  {
    label: "LeetCode",
    handle: "AniketJumde55",
    href: "https://leetcode.com/u/AniketJumde55/",
    thead: "Practice",
  },
  {
    label: "Email",
    handle: "aniketjumde55",
    href: "mailto:aniketjumde55@gmail.com",
    thead: "Reach",
  },
] as const;

export type SocialLabel = (typeof socials)[number]["label"];

export const navigation = [
  { index: "01", name: "Introduction", href: "#introduction" },
  { index: "02", name: "About", href: "#about" },
  { index: "03", name: "Expertise", href: "#expertise" },
  { index: "04", name: "Experience", href: "#experience" },
  { index: "05", name: "Projects", href: "#projects" },
  { index: "06", name: "Achievements", href: "#achievements" },
  { index: "07", name: "Connect", href: "#connect" },
] as const;

/** Headline metrics, all traceable to the resume. */
export const metrics = [
  { value: "1+", label: "Years with Java", note: "hands-on" },
  { value: "150+", label: "LeetCode solved", note: "algorithms" },
  { value: "5★", label: "HackerRank", note: "C · C++ · Java · SQL" },
  { value: "8.22", label: "CGPA", note: "B.Tech IT" },
] as const;
