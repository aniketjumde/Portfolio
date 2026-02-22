import { motion } from "framer-motion";
import { FileText, Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Resume() {
  return (
    <section className="py-24" id="resume">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Resume</h2>
          <p className="text-muted-foreground text-lg">
            Download my complete professional profile and experience
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass-card rounded-3xl border border-white/10 overflow-hidden bg-[#0f0f11]">
            <div className="p-12 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 text-blue-500">
                <FileText className="w-10 h-10" />
              </div>
              
              <h3 className="text-2xl font-bold mb-2">Aniket Jumde - Resume</h3>
              <p className="text-muted-foreground mb-6">Java Developer & Software Engineer</p>
              
              <p className="text-muted-foreground max-w-lg mb-8">
                Get my detailed resume showcasing my education, technical skills, projects, certifications, and professional experience.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <Button className="h-12 px-8 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center gap-2">
                  <Eye className="w-4 h-4" /> 
                  <a href="https://drive.google.com/file/d/1j8GBOPJopC2CSvQTCcOVy2ef0t7of87l/view?usp=drive_link" download>
                    View Resume
                  </a>
                </Button>
                <Button variant="outline" className="h-12 px-8 rounded-lg border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 font-medium flex items-center gap-2">
                  <Download className="w-4 h-4" /><a href="https://drive.google.com/file/d/1YQ5ET_ccHBKq8KN5ZI2H5MaHi2L7K8CZ/view?usp=drive_link" download>
                    Download Resume
                  </a>
                </Button>
              </div>

              {/* Stats Divider */}
              <div className="w-full h-px bg-white/10 mb-8" />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
                <div>
                  <div className="text-2xl font-bold text-blue-400 mb-1">8.50</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">CGPA</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400 mb-1">7+</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Projects</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400 mb-1">8+</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Certifications</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400 mb-1">200+</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">LeetCode</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

