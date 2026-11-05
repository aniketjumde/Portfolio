import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, Moon, Sun, X, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { navigation, site } from "@/data/site";
import { useActiveSection, useScrollY } from "@/hooks/use-portfolio";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { EASE } from "@/components/motion/reveal";

const sectionIds = navigation.map((n) => n.href.replace("#", ""));

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const [progress, setProgress] = useState(0);
  const { theme, toggle } = useTheme();
  const active = useActiveSection(sectionIds);
  const scrollY = useScrollY();
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (v) => setProgress(v));

  useEffect(() => {
    setCondensed(scrollY > 24);
  }, [scrollY]);

  // Lock body scroll while the mobile sheet is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={cn(
            "mx-auto transition-all duration-500",
            condensed ? "mt-3 max-w-6xl px-3 sm:px-5" : "mt-0 max-w-full px-0",
          )}
        >
          <nav
            aria-label="Primary"
            className={cn(
              "relative flex items-center justify-between transition-all duration-500",
              condensed
                ? "surface rounded-full px-4 py-2.5 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.85)] sm:px-5"
                : "border-b border-transparent px-5 py-4 sm:px-8",
            )}
          >
            {/* Monogram + name */}
            <a
              href="#home"
              className="group flex items-center gap-2.5 rounded-full pr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`${site.name} — back to top`}
            >
              <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl bg-[linear-gradient(135deg,hsl(var(--jade)),hsl(var(--cyan)))] font-mono text-[0.78rem] font-bold text-[hsl(228_30%_5%)] shadow-[0_6px_20px_-8px_hsl(var(--jade)/0.8)]">
                {site.initials}
                <span className="absolute inset-0 translate-y-full bg-white/25 transition-transform duration-500 group-hover:translate-y-0" />
              </span>
              <span className="hidden text-[0.95rem] font-semibold tracking-tight sm:block">
                {site.name}
              </span>
            </a>

            {/* Desktop links */}
            <div className="hidden items-center gap-1 lg:flex">
              {navigation.map((link) => {
                const id = link.href.replace("#", "");
                const isActive = active === id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 text-[0.82rem] font-medium transition-colors duration-300",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        className="absolute inset-0 -z-10 rounded-full border border-border/80 bg-secondary/70"
                      />
                    )}
                    {link.name}
                  </a>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={toggle}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                className="grid h-9 w-9 place-items-center rounded-full border border-border/70 text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={theme}
                    initial={{ rotate: -70, opacity: 0, scale: 0.6 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 70, opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.28, ease: EASE }}
                    className="grid place-items-center"
                  >
                    {theme === "dark" ? (
                      <Sun className="h-4 w-4" />
                    ) : (
                      <Moon className="h-4 w-4" />
                    )}
                  </motion.span>
                </AnimatePresence>
              </button>

              <Button
                asChild
                size="sm"
                variant="accent"
                className="hidden sm:inline-flex"
              >
                <a href={site.resumeUrl} target="_blank" rel="noopener noreferrer">
                  Resume
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
              </Button>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-menu"
                className="grid h-9 w-9 place-items-center rounded-full border border-border/70 text-foreground transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
              >
                {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </nav>
        </div>

        {/* Scroll progress */}
        <motion.div
          aria-hidden="true"
          className="mx-auto h-px origin-left bg-[linear-gradient(90deg,hsl(var(--jade)),hsl(var(--cyan)),hsl(var(--violet)))]"
          style={{ scaleX: progress, opacity: condensed ? 1 : 0 }}
        />
      </motion.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm lg:hidden"
              aria-hidden="true"
            />
            <motion.div
              key="sheet"
              id="mobile-menu"
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.42, ease: EASE }}
              className="fixed inset-x-3 top-[4.75rem] z-50 overflow-hidden rounded-3xl border border-border/80 bg-card/95 p-2 shadow-2xl backdrop-blur-xl lg:hidden"
            >
              <ul className="flex flex-col">
                {navigation.map((link, i) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.045, duration: 0.4, ease: EASE }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-[1.02rem] font-medium text-foreground/90 transition-colors hover:bg-secondary/70 hover:text-foreground"
                    >
                      {link.name}
                      <span className="font-mono text-[0.65rem] text-muted-foreground/60">
                        0{i + 1}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-2 border-t border-border/70 p-3">
                <Button asChild variant="accent" className="w-full">
                  <a
                    href={site.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                  >
                    Download Resume
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
