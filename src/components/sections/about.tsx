import { motion } from "framer-motion";
import { Code2, GraduationCap, Target, Terminal } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { EASE_OUT_EXPO } from "@/components/motion/easing";
import { profile } from "@/data/profile";
import { education } from "@/data/timeline";
import { allSkills } from "@/data/skills";

const pillars = [
  {
    icon: Code2,
    title: "What I build",
    body: "Full-stack Java systems — a PostgreSQL schema underneath, Servlets and JSP above it, and an interface that stays honest about what the data allows.",
  },
  {
    icon: Terminal,
    title: "How I work",
    body: "Settle the data model first: the tables, the relationships, the constraints that stop bad rows existing at all. Everything above that layer gets simpler once it's right.",
  },
  {
    icon: Target,
    title: "Where I'm headed",
    body: "An internship or full-time role on a real codebase, contributing to production systems and learning from engineers who have shipped more than I have.",
  },
  {
    icon: GraduationCap,
    title: "What I'm studying",
    body: `${education.degree} at ${education.school}, ${education.period}. Currently holding a ${education.cgpa} CGPA across the degree.`,
  },
];

export function About() {
  return (
    <section id="about" className="section relative">
      <div className="shell relative z-10">
        <SectionHeading
          eyebrow="01 — About me"
          title="Behind"
          accent="the code"
          lede="A short version of who I am, what I actually work with, and what I'm looking for next."
        />

        <div className="mx-auto mt-12 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
            className="text-center text-[1.02rem] leading-[1.8] text-[hsl(var(--ash))]"
          >
            {profile.summary}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.08 }}
            className="mt-5 text-center text-[1.02rem] leading-[1.8] text-[hsl(var(--ash))]"
          >
            I care more about whether the schema holds up under a bad input than about how
            the landing page animates. That preference is why most of what I&apos;ve built
            lives in the backend: role-based access, question banks, record constraints,
            and the small decisions that keep data trustworthy.
          </motion.p>
        </div>

        {/* Pillars */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: i * 0.07 }}
              className="card card-lit p-5 transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-[hsl(var(--violet))]/12 text-[hsl(var(--violet))]">
                <p.icon className="h-[1.15rem] w-[1.15rem]" />
              </span>
              <h3 className="mt-4 text-[0.98rem] font-semibold text-white">{p.title}</h3>
              <p className="mt-2 text-[0.875rem] leading-[1.7] text-[hsl(var(--ash))]">{p.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Ticker of everything in the stack */}
        <div className="mt-12 overflow-hidden border-y border-[hsl(0_0%_100%/0.08)] py-3">
          <div className="flex w-max gap-8 motion-safe:animate-[marquee_38s_linear_infinite]">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex shrink-0 items-center gap-8">
                {allSkills.map((s) => (
                  <span
                    key={`${dup}-${s}`}
                    className="flex shrink-0 items-center gap-8 text-[0.8rem] font-medium text-[hsl(var(--fog))]"
                  >
                    {s}
                    <span aria-hidden="true" className="text-[hsl(var(--violet))]/70">
                      /
                    </span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
