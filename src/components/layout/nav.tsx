import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
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
  const active = useActiveSection(ids);
  const y = useScrollY();
  const condensed = y > 24;

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });

  useScrollLock(open);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* reading progress */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-[hsl(var(--violet))] shadow-[0_0_12px_hsl(var(--violet))]"
      />

      <header className="fixed inset-x-0 top-0 z-[60]">
        <div
          className={cn(
            "transition-all duration-300",
            condensed
              ? "border-b border-[hsl(0_0%_100%/0.08)] bg-[hsl(var(--ink))]/80 backdrop-blur-xl"
              : "border-b border-transparent bg-transparent",
          )}
        >
          <nav
            aria-label="Primary"
            className="shell flex h-16 items-center justify-between gap-4 md:h-[4.5rem]"
          >
            {/* Wordmark */}
            <a
              href="#home"
              className="group flex shrink-0 items-center gap-2"
              aria-label={`${profile.name} — back to top`}
            >
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-[hsl(var(--violet))] text-[0.8rem] font-extrabold text-white shadow-[0_6px_20px_-6px_hsl(var(--violet))]">
                {profile.monogram}
              </span>
              <span className="hidden text-[0.95rem] font-semibold tracking-tight text-white sm:block">
                {profile.shortName}
                <span className="text-[hsl(var(--violet))]">.</span>
              </span>
            </a>

            {/* Desktop links */}
            <div className="hidden items-center gap-7 md:flex">
              {navigation.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  data-active={active === item.id}
                  aria-current={active === item.id ? "true" : undefined}
                  className="nav-link"
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={openResume}
                className="btn btn-primary hidden !px-5 !py-2.5 !text-[0.82rem] sm:inline-flex"
              >
                Résumé
              </button>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="grid h-10 w-10 place-items-center rounded-lg border border-[hsl(0_0%_100%/0.14)] text-white transition-colors hover:border-[hsl(var(--violet))]/60 md:hidden"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: EASE_OUT_EXPO }}
            className="fixed inset-x-0 top-16 z-[55] border-b border-[hsl(0_0%_100%/0.08)] bg-[hsl(var(--ink))]/97 backdrop-blur-xl md:hidden"
          >
            <ul className="shell flex flex-col py-2">
              {navigation.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.3 }}
                  className="border-b border-[hsl(0_0%_100%/0.06)] last:border-0"
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-3.5 text-[1.05rem] font-medium text-white/90"
                  >
                    {item.name}
                    <span className="font-mono text-[0.65rem] text-[hsl(var(--fog))]">
                      {item.index}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="shell pb-5 pt-1">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openResume();
                }}
                className="btn btn-primary w-full"
              >
                View résumé
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
