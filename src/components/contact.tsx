import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Github, Linkedin, Code2 } from "lucide-react";

interface SuccessPopupProps {
  open: boolean;
  onClose: () => void;
}

function SuccessPopup({ open, onClose }: SuccessPopupProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="
          relative bg-white dark:bg-black 
          p-8 rounded-2xl shadow-2xl w-[330px] 
          border border-gray-200 dark:border-white/10
          text-center
        "
      >
        <h2 className="text-xl font-semibold mb-2">Message Sent!</h2>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Thanks for reaching out. I’ll get back to you soon.
        </p>

        <button
          onClick={onClose}
          className="w-full py-2 bg-primary text-white rounded-xl hover:bg-primary/90"
        >
          Okay
        </button>
      </motion.div>
    </div>
  );
}

export function Contact() {
  const [open, setOpen] = useState(false);

  return (
    <section className="py-24 relative overflow-hidden" id="contact">

      {/* Background Glow */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get In <span className="text-gradient-primary">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I'm currently looking for internship opportunities and full-time positions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <p className="text-muted-foreground text-lg mb-8">
              Feel free to reach out to me for any questions or opportunities!
            </p>

            <div className="space-y-6 mb-12">
              {/* EMAIL */}
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white/5 dark:bg-white/10 flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email Me</p>
                  <p className="font-medium">aniketjumde55@gmail.com</p>
                </div>
              </div>

              {/* PHONE */}
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white/5 dark:bg-white/10 flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-colors">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Call Me</p>
                  <p className="font-medium">+91 93569 91161</p>
                </div>
              </div>

              {/* LOCATION */}
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white/5 dark:bg-white/10 flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-colors">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">Pune, Maharashtra, India</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-6">Connect with me</h3>
            <div className="flex gap-4">
              {[
                { icon: Github, label: "GitHub", href: "https://github.com/aniketjumde" },
                { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/aniket-jumde-74275a289/" },
                { icon: Mail, label: "Email", href: "mailto:aniketjumde55@gmail.com" },
                { icon: Code2, label: "LeetCode", href: "https://leetcode.com/u/AniketJumde55/" }
              ].map((item, i) => (
                <a key={i} href={item.href} className="text-muted-foreground hover:text-primary transition-all hover:-translate-y-1">
                  <item.icon className="w-7 h-7" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT SIDE — FORM */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="
              p-8 rounded-3xl 
              bg-white/70 dark:bg-black/20 
              border border-gray-300 dark:border-white/10 
              backdrop-blur-xl
            "
          >
            <form
              className="space-y-6"
              onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                const form = e.currentTarget;
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);

                try {
                  const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                  });

                  if (res.ok) {
                    setOpen(true);  // popup here
                    form.reset();
                  } else {
                    alert("Failed to send message. Please try again.");
                  }
                } catch (error) {
                  console.error(error);
                  alert("An error occurred. Please try again.");
                }
              }}
            >

              {/* NAME */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Name</label>
                <Input
                  name="name"
                  placeholder="John Doe"
                  required
                  className="
                    h-12 rounded-xl
                    bg-white dark:bg-black/20
                    text-black dark:text-white
                    placeholder-gray-500 dark:placeholder-gray-400
                    border border-gray-300 dark:border-white/10
                    focus:border-primary/50
                  "
                />
              </div>

              {/* EMAIL */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  className="
                    h-12 rounded-xl
                    bg-white dark:bg-black/20
                    text-black dark:text-white
                    placeholder-gray-500 dark:placeholder-gray-400
                    border border-gray-300 dark:border-white/10
                    focus:border-primary/50
                  "
                />
              </div>

              {/* MESSAGE */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea
                  name="message"
                  placeholder="How can I help you?"
                  required
                  className="
                    min-h-[150px] rounded-xl resize-none
                    bg-white dark:bg-black/20
                    text-black dark:text-white
                    placeholder-gray-600 dark:placeholder-gray-400
                    border border-gray-300 dark:border-white/10
                    focus:border-primary/50
                  "
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base rounded-xl bg-primary hover:bg-primary/90 text-white"
              >
                Send Message
              </Button>

            </form>
          </motion.div>
        </div>
      </div>

      {/* Popup */}
      <SuccessPopup open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
