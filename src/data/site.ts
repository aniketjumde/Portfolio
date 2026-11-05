/**
 * Single source of truth for site-wide identity, contact details and links.
 * Every section imports from here so facts never drift out of sync.
 */

export const site = {
  name: "Aniket Jumde",
  shortName: "Aniket",
  initials: "AJ",
  role: "Java Developer & Software Engineer",
  tagline: "Building scalable, high-quality software solutions.",
  location: "Pune, Maharashtra, India",
  email: "aniketjumde55@gmail.com",
  phone: "+91 93569 91161",
  phoneHref: "+919356991161",
  availability: "Open to internships & full-time roles",
  // Update this single line to change the CV everywhere on the site.
  resumeUrl:
    "https://drive.google.com/file/d/1j8GBOPJopC2CSvQTCcOVy2ef0t7of87l/view",
  url: "https://aniketjumdeportfolio.vercel.app/",
} as const;

export const socials = [
  { label: "GitHub", href: "https://github.com/aniketjumde", handle: "@aniketjumde" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/aniket-jumde-74275a289/",
    handle: "in/aniket-jumde",
  },
  { label: "LeetCode", href: "https://leetcode.com/u/AniketJumde55/", handle: "/AniketJumde55" },
  { label: "Email", href: "mailto:aniketjumde55@gmail.com", handle: "aniketjumde55" },
] as const;

export type SocialLabel = (typeof socials)[number]["label"];

export const navigation = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" },
] as const;
