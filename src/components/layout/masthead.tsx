import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X, Moon, Sun, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { navigation, profile } from "@/data/profile";
import { useActiveSection, useScrollLock, useScrollY } from "@/hooks/use-editorial";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import { EDITORIAL_EASE } from "@/components/motion/primitives";

const ids = navigation.map((n) => n.href.replace("#", ""));

export function Masthead() {
  const [open, setOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const { theme, toggle } = useTheme();
  const active = useActiveSection(ids);
  const y = useScrollY();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useScrollLock(open);

  useEffect(() => {
    setCondensed(y > 30);
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
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EDITORIAL_EASE, delay: 0.3 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={cn(
            "relative z-10 transition-all duration-500",
            condensed
              ? "border-b border-[hsl(var(--rule))] bg-[hsl(var(--paper))]/92 backdrop-blur-md"
              : "border-b border-transparent",
          )}
        >
          <div className="mx-auto flex w-full max-w-[104rem] items-center justify-between gap-4 px-4 py-3.5 sm:px-7">
            {/* Wordmark */}
            <a
              href="#introduction"
              className="group flex shrink-0 items-baseline gap-2.5"
              aria-label={`${profile.name} — back to top`}
            >
              <span className="font-display text-[1.05rem] font-semibold leading-none tracking-tight">
                {profile.name}
              </span>
              <span className="hidden font-mono text-[0.58rem] uppercase tracking-[0.2em] text-[hsl(var(--ink-faint))] sm:inline">
                {profile.role}
              </span>
            </a>

            {/* Desktop index */}
            <nav aria-label="Sections" className="hidden items-center gap-0.5 lg:flex">
              {navigation.map((item) => {
                const id = item.href.replace("#", "");
                const isActive = active === id;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "group relative px-2.5 py-1.5 font-mono text-[0.63rem] uppercase tracking-[0.14em] transition-colors duration-300",
                      isActive
                        ? "text-[hsl(var(--ink))]"
                        : "text-[hsl(var(--ink-faint))] hover:text-[hsl(var(--ink))]",
                    )}
                  >
                    <span className="mr-1 text-[hsl(var(--oxide))]">{item.index}</span>
                    {item.name}
                    {isActive && (
                      <motion.span
                        layoutId="masthead-underline"
                        transition={{ type: "spring", stiffness: 400, damping: 34 }}
                        className="absolute inset-x-1 -bottom-0.5 h-px bg-[hsl(var(--oxide))]"
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Controls */}
            <div className="flex shrink-0 items-center gap-1.5">
              <button
                type="button"
                onClick={toggle}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                className="grid h-8 w-8 place-items-center border border-[hsl(var(--rule))] text-[hsl(var(--ink-soft))] transition-colors hover:border-[hsl(var(--ink))] hover:text-[hsl(var(--ink))]"
              >
                {theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
              </button>

              <a
                href={profile.resumeUrl}
                download
                className="hidden items-center gap-1.5 border border-[hsl(var(--ink))] bg-[hsl(var(--ink))] px-3.5 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[hsl(var(--paper))] transition-colors hover:bg-transparent hover:text-[hsl(var(--ink))] sm:inline-flex"
              >
                Résumé
                <ArrowUpRight className="h-3 w-3" />
              </a>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-index"
                aria-label={open ? "Close index" : "Open index"}
                className="grid h-8 w-8 place-items-center border border-[hsl(var(--rule))] lg:hidden"
              >
                {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Reading progress */}
          <motion.div
            aria-hidden="true"
            className="h-px origin-left bg-[hsl(var(--oxide))]"
            style={{ scaleX: progress }}
          />
        </div>
      </motion.header>

      {/* Full-screen mobile index */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-index"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.65, ease: EDITORIAL_EASE }}
            className="fixed inset-0 z-40 flex flex-col bg-[hsl(var(--paper))] pt-20 lg:hidden"
          >
            <div className="flex-1 overflow-y-auto px-6 pb-8">
              <p className="label mb-6 border-b border-[hsl(var(--rule))] pb-3">
                Index — {navigation.length} sections
              </p>

              <nav aria-label="Mobile sections">
                <ul>
                  {navigation.map((item, i) => (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.18 + i * 0.05,
                        duration: 0.5,
                        ease: EDITORIAL_EASE,
                      }}
                      className="border-b border-[hsl(var(--rule))]"
                    >
                      <a
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-baseline justify-between gap-4 py-4"
                      >
                        <span className="flex items-baseline gap-4">
                          <span className="font-mono text-[0.6rem] text-[hsl(var(--oxide))]">
                            {item.index}
                          </span>
                          <span className="font-display text-[1.65rem] font-semibold leading-none">
                            {item.name}
                          </span>
                        </span>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-[hsl(var(--ink-faint))]" />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-8 space-y-3"
              >
                <a
                  href={profile.resumeUrl}
                  download
                  className="flex items-center justify-center gap-2 bg-[hsl(var(--ink))] px-4 py-3.5 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-[hsl(var(--paper))]"
                >
                  Download résumé (PDF)
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="block break-all text-center font-mono text-[0.7rem] text-[hsl(var(--ink-soft))] underline underline-offset-4"
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
