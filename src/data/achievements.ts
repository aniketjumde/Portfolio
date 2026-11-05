export interface Certification {
  title: string;
  platform: string;
  date: string;
  url: string;
}

export const certifications: Certification[] = [
  {
    title: "C Programming",
    platform: "Techno Comp Academy",
    date: "2023",
    url: "https://drive.google.com/file/d/1MI2UxtvME63wcvJ9GYABShILbpu85FxI/view",
  },
  {
    title: "C++ Programming",
    platform: "Techno Comp Academy",
    date: "2024",
    url: "https://drive.google.com/file/d/1KdPsGK94rFaCZgm5jI9YX6poRW-BVSdk/view",
  },
  {
    title: "Data Structures & Algorithms",
    platform: "Techno Comp Academy",
    date: "2024",
    url: "https://technocompacademy.com/tcaapp/get_certificate.php?id=TCADS2024B18R805",
  },
  {
    title: "Python Programming",
    platform: "HackerRank",
    date: "2024",
    url: "https://www.hackerrank.com/certificates/iframe/08c2194fd416",
  },
  {
    title: "Java (Basic)",
    platform: "HackerRank",
    date: "2024",
    url: "https://www.hackerrank.com/certificates/iframe/5ffe7be61a9b",
  },
  {
    title: "Advanced Java",
    platform: "Techno Comp Academy",
    date: "2025",
    url: "https://technocompacademy.com/tcaapp/get_certificate.php?id=TCAAJ2025B20R261",
  },
  {
    title: "Hibernate Framework",
    platform: "Techno Comp Academy",
    date: "2025",
    url: "https://technocompacademy.com/tcaapp/get_certificate.php?id=TCAHFB2025B03R304",
  },
  {
    title: "Postman API Testing",
    platform: "Postman Learning",
    date: "2025",
    url: "https://badges.parchment.com/public/assertions/Kp6F5YIdQG2odsqMI5Ltqg",
  },
];

export interface Achievement {
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  icon: "star" | "code" | "trophy";
}

export const achievements: Achievement[] = [
  {
    title: "5-star ratings across four languages",
    description:
      "Earned 5-star HackerRank ratings in C, C++, Java and SQL — multi-language fluency proven under timed problem solving.",
    metric: "5★",
    metricLabel: "HackerRank",
    icon: "star",
  },
  {
    title: "200+ algorithmic problems solved",
    description:
      "Worked through interviews-grade problems on LeetCode covering arrays, strings, trees, graphs and dynamic programming.",
    metric: "200+",
    metricLabel: "LeetCode",
    icon: "code",
  },
  {
    title: "Hackathons & rapid prototyping",
    description:
      "Participated in multiple hackathons, shipping working prototypes under tight deadlines and collaborating in small teams.",
    metric: "3+",
    metricLabel: "Hackathons",
    icon: "trophy",
  },
];

/** Ready-to-render numbers for the stats strip, derived from real data. */
export const stats = {
  cgpa: "8.14",
  certifications: certifications.length,
  problems: "200+",
  hackathons: 3,
  languages: 5,
};
