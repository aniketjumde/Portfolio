import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navigation, profile } from "@/data/profile";
import { useActiveSection, useScrollLock, useScrollY } from "@/hooks/use-site";
import { useResume } from "@/hooks/use-resume";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/components/motion/easing";

const ids = navigation.map((n) => n.id);

export function Nav() {
  const { open: openResume } = useResume();
  const [open, setOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const active = useActiveSection(ids);
  const y = useScrollY();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });

  useScrollLock(open);

  useEffect(() => {
    setCondensed(y > 40);
  }, [y]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* Top progress hairline */}
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-[hsl(var(--lime))]"
        style={{ scaleX: progress }}
      />

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={cn(
            "transition-all duration-500",
            condensed
              ? "mx-auto mt-3 max-w-[100rem] px-3 sm:px-5"
              : "mx-auto mt-0 max-w-[104rem] px-0",
          )}
        >
          <nav
            aria-label="Primary"
            className={cn(
              "flex items-center justify-between transition-all duration-500",
              condensed
                ? "border border-[hsl(var(--edge))] bg-[hsl(var(--carbon-2))]/85 px-4 py-2.5 backdrop-blur-xl sm:px-5"
                : "border-b border-transparent px-5 py-4 sm:px-8",
            )}
          >
            {/* Monogram */}
            <a
              href="#top"
              aria-label={`${profile.name} — back to top`}
              className="group flex items-center gap-2.5"
            >
              <span className="grid h-8 w-8 place-items-center bg-[hsl(var(--lime))] font-mono text-[0.7rem] font-bold text-[hsl(var(--carbon))]">
                {profile.monogram}
              </span>
              <span className="hidden font-grotesk text-[0.92rem] font-semibold tracking-tight sm:block">
                {profile.name}
              </span>
            </a>

            {/* Desktop links with sliding indicator */}
            <div className="hidden items-center gap-0.5 lg:flex">
              {navigation.map((item) => {
                const isActive = active === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative px-3 py-1.5 font-mono text-[0.64rem] uppercase tracking-[0.16em] transition-colors duration-300",
                      isActive
                        ? "text-[hsl(var(--lime))]"
                        : "text-[hsl(var(--ash))] hover:text-[hsl(var(--chalk))]",
                    )}
                  >
                    {item.name}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        className="absolute inset-x-2 -bottom-0.5 h-px bg-[hsl(var(--lime))]"
                      />
                    )}
                  </a>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <a
                href="#contact"
                className="hidden items-center gap-1.5 bg-[hsl(var(--chalk))] px-4 py-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[hsl(var(--carbon))] transition-colors hover:bg-[hsl(var(--lime))] sm:inline-flex"
              >
                Hire me
                <ArrowUpRight className="h-3 w-3" />
              </a>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? "Close menu" : "Open menu"}
                className="grid h-9 w-9 place-items-center border border-[hsl(var(--edge))] text-[hsl(var(--chalk))] transition-colors hover:border-[hsl(var(--chalk))]/40 lg:hidden"
              >
                {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            className="fixed inset-0 z-40 flex flex-col bg-[hsl(var(--carbon))] pt-[4.5rem] lg:hidden"
          >
            <div className="flex-1 overflow-y-auto px-5 pb-8">
              <p className="meta border-b border-[hsl(var(--edge))] pb-3">Index</p>
              <nav aria-label="Mobile">
                <ul>
                  {navigation.map((item, i) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12 + i * 0.05, duration: 0.5, ease: EASE_OUT_EXPO }}
                      className="border-b border-[hsl(var(--edge))]"
                    >
                      <a
                        href={`#${item.id}`}
                        onClick={() => setOpen(false)}
                        className="flex items-baseline justify-between gap-3 py-4"
                      >
                        <span className="flex items-baseline gap-3">
                          <span className="font-mono text-[0.6rem] text-[hsl(var(--lime))]">
                            {item.index}
                          </span>
                          <span className="poster text-[2rem] leading-none">{item.name}</span>
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-[hsl(var(--fog))]" />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-7 space-y-3"
              >
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openResume();
                  }}
                  className="flex w-full items-center justify-center gap-2 bg-[hsl(var(--lime))] px-4 py-3.5 font-mono text-[0.64rem] uppercase tracking-[0.18em] text-[hsl(var(--carbon))]"
                >
                  View résumé (PDF)
                </button>
                <a
                  href={`mailto:${profile.email}`}
                  className="block break-all text-center font-mono text-[0.7rem] text-[hsl(var(--ash))] underline underline-offset-4"
                >
                  {profile.email}
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
