import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { EDITORIAL_EASE, MaskedLines } from "@/components/motion/primitives";

export default function NotFound() {
  return (
    <div className="grain relative grid min-h-screen place-items-center bg-[hsl(var(--paper))] px-5 text-[hsl(var(--ink))]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: EDITORIAL_EASE }}
        className="relative w-full max-w-2xl"
      >
        <div className="flex items-center gap-3 border-b border-[hsl(var(--rule))] pb-3">
          <span className="tick">404</span>
          <span className="h-px w-8 bg-[hsl(var(--oxide))]" />
          <span className="label">Page not found</span>
        </div>

        <MaskedLines
          as="h1"
          delay={0.15}
          className="display-lg mt-8"
          lines={[
            <span key="1">This page</span>,
            <span key="2">
              isn't{" "}
              <span className="italic-accent text-[hsl(var(--oxide))]">printed</span>.
            </span>,
          ]}
        />

        <p className="mt-6 max-w-md text-[0.92rem] leading-relaxed text-[hsl(var(--ink-soft))]">
          The address you followed doesn't match anything in this portfolio.
          Everything worth reading lives on the first page.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-[hsl(var(--ink))] px-5 py-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[hsl(var(--paper))] transition-colors hover:bg-[hsl(var(--oxide))]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to the cover
          </a>
          <a
            href="/#projects"
            className="inline-flex items-center gap-2 border border-[hsl(var(--ink))] px-5 py-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] transition-colors hover:bg-[hsl(var(--ink))] hover:text-[hsl(var(--paper))]"
          >
            See the work
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
