import { Link } from "wouter";
import { motion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/components/motion/easing";
import { profile } from "@/data/profile";

export default function NotFound() {
  return (
    <div className="noise relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[hsl(var(--carbon))] px-6 text-[hsl(var(--chalk))]">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden />

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        className="meta-lime relative"
      >
        Error 404 — Off the grid
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.08 }}
        className="poster-xl relative mt-4 text-center"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-4 max-w-md text-center font-grotesk text-[0.95rem] leading-relaxed text-[hsl(var(--ash))]"
      >
        This page never made it past the wireframe. The rest of {profile.name.split(" ")[0]}&apos;s
        work is still live.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45, ease: EASE_OUT_EXPO }}
        className="relative mt-8 flex flex-wrap items-center justify-center gap-3"
      >
        <Link
          href="/"
          className="btn-lime inline-flex items-center justify-center px-6 py-3 font-mono text-[0.66rem] uppercase tracking-[0.18em]"
        >
          Return home
        </Link>
        <Link
          href="/#work"
          className="btn-ghost inline-flex items-center justify-center px-6 py-3 font-mono text-[0.66rem] uppercase tracking-[0.18em]"
        >
          View work
        </Link>
      </motion.div>
    </div>
  );
}
