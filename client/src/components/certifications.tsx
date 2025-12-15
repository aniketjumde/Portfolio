import { motion } from "framer-motion";
import { Award, ExternalLink, Star, Code, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

const certifications = [
  {
    title: "C Programming",
    platform: "Techno Comp Academy",
    date: "2023",
    link: "https://drive.google.com/file/d/1MI2UxtvME63wcvJ9GYABShILbpu85FxI/view",
  },
  {
    title: "C++ Programming",
    platform: "Techno Comp Academy",
    date: "2024",
    link: "https://drive.google.com/file/d/1KdPsGK94rFaCZgm5jI9YX6poRW-BVSdk/view",
  },
  {
    title: "Data Structures & Algorithms",
    platform: "Techno Comp Academy",
    date: "2024",
    link: "https://technocompacademy.com/tcaapp/get_certificate.php?id=TCADS2024B18R805",
  },
  {
    title: "Python Programming",
    platform: "HackerRank",
    date: "2024",
    link: "https://www.hackerrank.com/certificates/iframe/08c2194fd416",
  },
  {
    title: "Java(Basic)",
    platform: "HackerRank",
    date: "2024",
    link: "https://www.hackerrank.com/certificates/iframe/5ffe7be61a9b",
  },
  {
    title: "Advanced Java",
    platform: "Techno Comp Academy",
    date: "2025",
    link: "https://technocompacademy.com/tcaapp/get_certificate.php?id=TCAAJ2025B20R261",
  },
  {
    title: "Hibernate Framework",
    platform: "Techno Comp Academy",
    date: "2025",
    link: "https://technocompacademy.com/tcaapp/get_certificate.php?id=TCAHFB2025B03R304",
  },
  {
    title: "Postman API Testing",
    platform: "Postman Learning",
    date: "2025",
    link: "https://badges.parchment.com/public/assertions/Kp6F5YIdQG2odsqMI5Ltqg",
  },
];

const achievements = [
  {
    title: "5-Star Rating in Multiple Languages",
    description:
      "Achieved 5-star rating in C, C++, Java, and SQL on HackerRank, demonstrating multi-language expertise and problem-solving skills",
    icon: Star,
    color: "text-yellow-400",
  },
  {
    title: "200+ LeetCode Problems",
    description:
      "Solved over 200 algorithmic challenges on LeetCode, covering arrays, strings, trees, graphs, dynamic programming, and more",
    icon: Code,
    color: "text-orange-400",
  },
  {
    title: "Hackathon Participation",
    description:
      "Participated in multiple hackathons with working prototypes, showcasing rapid development skills and innovation under pressure",
    icon: Trophy,
    color: "text-green-400",
  },
];

export function Certifications() {
  return (
    <section className="py-24" id="certifications">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Achievements & <span className="text-gradient-primary">Certifications</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Validating my skills through recognized platforms and continuous competition.
          </p>
        </div>

        {/* ---------------- KEY ACHIEVEMENTS ---------------- */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Key Achievements</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                // THEME-AWARE BACKGROUND FIX
                className="bg-card text-card-foreground border border-border p-8 rounded-2xl text-center hover:border-primary/30 transition-colors group"
              >
                <div
                  className={`w-12 h-12 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center ${achievement.color} group-hover:scale-110 transition-transform`}
                >
                  <achievement.icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold mb-4">{achievement.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ---------------- CERTIFICATIONS ---------------- */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Certifications</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                // THEME-AWARE BACKGROUND FIX
                className="bg-card text-card-foreground border border-border rounded-xl overflow-hidden hover:border-blue-500/50 transition-all group flex flex-col"
              >
                <div className="p-6 flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-8 h-8 text-blue-500">
                      <Award className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                      {cert.date}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold mb-1 group-hover:text-blue-500 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{cert.platform}</p>
                </div>

                <div className="mt-auto">
                  <a
                    href={cert.link}
                    target="_blank"
                    className="flex items-center justify-center gap-2 w-full py-3 border-t border-border text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" /> Verify
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
