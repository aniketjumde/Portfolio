import { ArrowLeft, Compass } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { EASE } from "@/components/motion/reveal";

export default function NotFound() {
  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-background px-4">
      <div aria-hidden="true" className="absolute inset-0 bg-grid mask-fade-radial opacity-60" />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative max-w-md text-center"
      >
        <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-2xl border border-border/80 bg-card/60 text-primary backdrop-blur">
          <Compass className="h-6 w-6" />
        </div>

        <p className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-primary/80">
          Error 404
        </p>
        <h1 className="mt-3 text-[clamp(2rem,6vw,3rem)] font-semibold leading-tight tracking-tight">
          This page took a{" "}
          <span className="text-serif-accent text-gradient">wrong turn</span>
        </h1>
        <p className="mt-4 text-[0.92rem] leading-relaxed text-muted-foreground">
          The URL doesn't match anything here. Everything worth seeing lives on the
          home page.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild variant="accent">
            <a href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href="/#projects">See the work</a>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
