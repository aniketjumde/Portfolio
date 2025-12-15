import { motion } from "framer-motion";
import { 
  Code2, 
  Database, 
  Layout, 
  Settings, 
  Terminal, 
  Palette,
  Box,
  GitBranch,
  Github,
  Cloud,
  Send,
  Monitor,
  Server,
  Users,
  MessageSquare,
  Crown,
  FileJson,
  Coffee,
  FileCode
} from "lucide-react";

const mainSkills = [
  {
    title: "Programming Languages",
    items: [
      { name: "Java", icon: Coffee },
      { name: "C", icon: FileCode },
      { name: "C++", icon: Code2 },
      { name: "Python", icon: FileCode },
      { name: "SQL", icon: Database }
    ]
  },
  {
    title: "Databases",
    items: [
      { name: "MySQL", icon: Database },
      { name: "PostgreSQL", icon: Database }
      ]
  },
  {
    title: "Web Technologies",
    items: [
      { name: "HTML5", icon: Layout },
      { name: "CSS3", icon: Palette },
      { name: "JavaScript", icon: FileJson }
    ]
  },
  {
    title: "Tools & Frameworks",
    items: [
      { name: "Hibernate", icon: Settings },
      { name: "Docker", icon: Box },
      { name: "Git", icon: GitBranch },
      { name: "GitHub", icon: Github },
      { name: "Firebase", icon: Cloud },
      { name: "Postman", icon: Send }
    ]
  },
  {
    title: "IDEs & Editors",
    items: [
      { name: "IntelliJ IDEA", icon: Terminal },
      { name: "Eclipse", icon: Code2 },
      { name: "VS Code", icon: Code2 }
    ]
  },
  {
    title: "Operating Systems",
    items: [
      { name: "Windows", icon: Monitor },
      { name: "Linux", icon: Server }
    ]
  }
];

const coreConcepts = [
  "Data Structures & Algorithms",
  "Object-Oriented Programming",
  "Multithreading",
  "Debugging",
  "Design Patterns",
  "REST APIs",
  "MVC Architecture"
];

const softSkills = [
  { name: "Teamwork", icon: Users },
  { name: "Communication", icon: MessageSquare },
  { name: "Leadership", icon: Crown }
];

export function Skills() {
  return (
    <section className="py-24" id="skills">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Skills & <span className="text-gradient-primary">Technologies</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for building modern applications
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {mainSkills.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              
              /* THE FIX → CARD USES THEME COLORS */
              className="bg-card text-card-foreground border p-6 rounded-2xl hover:border-primary/30 transition"
            >
              <h3 className="text-lg font-bold mb-6">{category.title}</h3>

              <div className="flex flex-wrap gap-3">
                {category.items.map((skill, i) => (
                  <div 
                    key={i} 
                    className="
                      flex items-center gap-2 px-3 py-2 text-sm 
                      rounded-lg border 
                      bg-muted 
                      text-muted-foreground 
                      hover:bg-muted-foreground/10 
                      hover:text-foreground 
                      transition-colors cursor-default
                    "
                  >
                    <skill.icon className="w-4 h-4" />
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Core Concepts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            
            /* FIX HERE TOO */
            className="bg-card text-card-foreground border p-8 rounded-2xl hover:border-primary/30 transition"
          >
            <h3 className="text-lg font-bold mb-6">Core Concepts</h3>
            <div className="flex flex-wrap gap-3">
              {coreConcepts.map((concept, i) => (
                <span 
                  key={i} 
                  className="px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium border border-primary/20 hover:bg-primary/20 transition-colors cursor-default"
                >
                  {concept}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Soft Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            
            /* FIX HERE */
            className="bg-card text-card-foreground border p-8 rounded-2xl hover:border-primary/30 transition"
          >
            <h3 className="text-lg font-bold mb-6">Soft Skills</h3>

            <div className="grid grid-cols-3 gap-4">
              {softSkills.map((skill, i) => (
                <div 
                  key={i} 
                  className="
                    flex flex-col items-center p-4 rounded-xl 
                    border bg-muted text-muted-foreground
                    hover:bg-muted-foreground/10 hover:text-foreground
                    transition group
                  "
                >
                  <skill.icon className="w-6 h-6 mb-3 group-hover:text-foreground transition" />
                  <span className="text-sm font-medium">{skill.name}</span>
                </div>
              ))}
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
