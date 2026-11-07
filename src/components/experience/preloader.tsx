import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE_OUT_EXPO } from "@/components/motion/easing";

const WORDS = ["DESIGN", "DEVELOP", "DEPLOY"];

/**
 * Brief entrance: a counter to 100 behind the initials, then a fade.
 *
 * Kept short (1.1s) because a long preloader is a tax on every visit. Skipped
 * entirely for reduced-motion users, who see content immediately.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [word, setWord] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
      onDone();
      return;
    }

    let raf = 0;
    const start = performance.now();
    const DURATION = 1100;

    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100));

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => {
          setVisible(false);
          window.setTimeout(onDone, 450);
        }, 120);
      }
    };

    raf = requestAnimationFrame(tick);
    const wordTimer = window.setInterval(() => setWord((w) => (w + 1) % WORDS.length), 340);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(wordTimer);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] grid place-items-center bg-[hsl(var(--ink))]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-5">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
              className="grid h-14 w-14 place-items-center rounded-2xl bg-[hsl(var(--violet))] text-[1.1rem] font-extrabold text-white shadow-[0_0_50px_-8px_hsl(var(--violet))]"
            >
              AJ
            </motion.div>

            <div className="h-5 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={WORDS[word]}
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -18, opacity: 0 }}
                  transition={{ duration: 0.24, ease: EASE_OUT_EXPO }}
                  className="text-center font-mono text-[0.7rem] uppercase tracking-[0.28em] text-[hsl(var(--ash))]"
                >
                  {WORDS[word]}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="h-px w-40 overflow-hidden bg-white/10">
              <motion.div
                className="h-full origin-left bg-[hsl(var(--violet))]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: count / 100 }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>

            <p className="font-mono text-[0.65rem] tabular-nums text-[hsl(var(--fog))]">
              {String(count).padStart(3, "0")}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
