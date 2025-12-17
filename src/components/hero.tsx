import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Twitter, Code2, Terminal } from "lucide-react";
export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Background Elements - subtle gradients matching the dark theme */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}

        >
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
            <Terminal className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm text-muted-foreground font-medium">Java Developer & Software Engineer</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6 leading-tight"> Aniket Jumde </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"> Focused on creating scalable, high-quality software solutions. This portfolio highlights my projects, technical skills, and commitment to engineering excellence. </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">

            <Button size="lg" className="rounded-full text-base h-12 px-8 bg-white text-black hover:bg-gray-200 border-0" asChild>
              <a href="#projects">View Projects</a>
            </Button>

            <Button size="lg" variant="outline" className="rounded-full text-base h-12 px-8 bg-white/5 border-white/10 hover:bg-white/10" asChild>
              <a href="#contact">Contact Me</a>
            </Button>

          </div>

          <div className="flex justify-center gap-8">

            {
              [
                { icon: Github, label: "GitHub", href: "https://github.com/aniketjumde" },
                { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/aniket-jumde-74275a289/" },
                { icon: Mail, label: "Email", href: "mailto:aniketjumde55@gmail.com" },
                { icon: Code2, label: "LeetCode", href: "https://leetcode.com/u/AniketJumde55/" }
              ].map((item, i) => (
                <a key={i} href={item.href} className="text-muted-foreground hover:text-primary transition-all hover:-translate-y-1" title={item.label} >
                  <item.icon className="w-7 h-7" />
                </a>
              ))}
          </div>
        </motion.div>
      </div>
    </section>);
}