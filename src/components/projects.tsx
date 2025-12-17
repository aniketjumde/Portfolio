import { motion } from "framer-motion";
import { ExternalLink, Github, Folder, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const projects = [
  {
    category: "Web Application",
    title: "Online Examination System",
    description: "A comprehensive platform for conducting secure online exams with real-time monitoring and automated grading.",
    highlights: "Implemented secure user authentication and real-time timer functionality.",
    tech: ["Java", "JSP", "MySQL", "Bootstrap"],
    date: "Oct 2024",
    link: "#",
    github: "#"
  },
  {
    category: "Web Application",
    title: "Student Management System",
    description: "A responsive web application for managing student records with complete CRUD functionality, designed to simplify academic data handling and improve workflow efficiency.",
    highlights: "Optimized database queries for faster retrieval of student records.",
    tech: ["Java", "JDBC", "JSP", "Servlets", "PostgreSQL"],
    date: "Sep 2025",
    link: "https://studentmanagmentsystem-jqqt.onrender.com/",
    github: "https://github.com/aniketjumde/Student-Managment-System"
  },
  {
    category: "Web Application",
    title: "Real Estate Management",
    description: "Property listing platform allowing users to buy, sell, and rent properties with advanced search filters.",
    highlights: "Integrated map view and image gallery for property listings.",
    tech: ["MERN Stack", "Redux", "Tailwind"],
    date: "June 2024",
    link: "#",
    github: "#"
  },
  {
    category: "Java",
    title: "Email Verification Login System",
    description: "A secure, enterprise-grade authentication system designed with layered architecture and robust validation workflows. The application handles user registration, login, email verification, password recovery, and complete session management while ensuring industry-standard security throughout the entire authentication flow.",
    highlights: "Used Implements a full authentication suite including registration, login, email verification, password reset, and account activation.Java Swing for GUI and JDBC for database connectivity.",
    tech: ["Java", "Servlets", "JSP", "Hibernate", "SMTP Email", "BCrypt", "MySQL"],
    date: "Mar 2024",
    link: "https://github.com/aniketjumde/EmailVerificationSystem",
    github: "https://github.com/aniketjumde/EmailVerificationSystem"
  },

];

export function Projects() {
  return (
    <section className="py-24" id="projects">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured <span className="text-gradient-primary">Projects</span></h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Showcasing my journey through code. From web applications to complex algorithms.
          </p>
          <Button variant="outline" className="rounded-full border-white/10 hover:bg-white/5" asChild>
            <a href="https://github.com/aniketjumde" target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" /> View GitHub Profile
            </a>
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full max-w-md mx-auto mb-12 bg-white/5 border border-white/10 p-1 rounded-full h-auto flex flex-wrap justify-center gap-1">
            <TabsTrigger value="all" className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white">All Projects</TabsTrigger>
            <TabsTrigger value="web" className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white">Web App</TabsTrigger>
            <TabsTrigger value="java" className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white">Java</TabsTrigger>
            <TabsTrigger value="dsa" className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white">DSA</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <ProjectCard key={index} project={project} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="web" className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.filter(p => p.category === "Web Application").map((project, index) => (
                <ProjectCard key={index} project={project} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="java" className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.filter(p => p.category === "Java").map((project, index) => (
                <ProjectCard key={index} project={project} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="dsa" className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.filter(p => p.category === "DSA").map((project, index) => (
                <ProjectCard key={index} project={project} index={index} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative flex flex-col h-full bg-card border border-white/5 rounded-2xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      {/* Top Bar decoration */}
      <div className="h-2 bg-gradient-to-r from-primary/50 to-purple-500/50 w-full" />

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 rounded-lg bg-white/5 text-primary">
            <Folder className="w-6 h-6" />
          </div>
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/5 text-muted-foreground border border-white/5 flex items-center gap-1">
            <Calendar className="w-3 h-3" /> {project.date}
          </span>
        </div>

        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>

        <div className="mb-4 flex flex-wrap gap-2">
          {project.tech.map((t: string, i: number) => (
            <span key={i} className="text-xs font-medium text-primary/80">#{t}</span>
          ))}
        </div>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-grow">
          {project.description}
        </p>

        <div className="bg-white/5 p-3 rounded-lg mb-6">
          <p className="text-xs text-muted-foreground">
            <span className="text-primary font-bold">Highlight:</span> {project.highlights}
          </p>
        </div>

        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
          <Button size="sm" className="flex-1 bg-white text-black hover:bg-gray-200" asChild>
            <a href={project.link}>Live Demo</a>
          </Button>
          <Button size="sm" variant="outline" className="flex-1 border-white/10 hover:bg-white/5" asChild>
            <a href={project.github}><Github className="w-4 h-4 mr-2" /> Code</a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}