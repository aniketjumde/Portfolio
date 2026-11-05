import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE_OUT_EXPO } from "@/components/motion/easing";

const WORDS = ["BUILD", "SHIP", "REFINE"];

/**
 * Cinematic entrance. Counts 0→100, flashes the three-word sequence, then wipes
 * upward to reveal the page. Runs once per session; skipped entirely for
 * reduced-motion users.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [word, setWord] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(false);
      onDone();
      return;
    }

    let raf = 0;
    const start = performance.now();
    const DURATION = 1400;

    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      // ease so the counter decelerates near 100
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 100));

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => {
          setVisible(false);
          window.setTimeout(onDone, 620);
        }, 220);
      }
    };

    raf = requestAnimationFrame(tick);
    const wordTimer = window.setInterval(() => {
      setWord((w) => (w + 1) % WORDS.length);
    }, 420);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(wordTimer);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col justify-between bg-[hsl(var(--carbon))] px-5 py-6 sm:px-8"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          aria-hidden="true"
        >
          <div className="flex items-start justify-between">
            <span className="meta">Aniket Jumde</span>
            <span className="meta">Portfolio — 2026</span>
          </div>

          <div className="flex flex-1 items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={WORDS[word]}
                initial={{ y: "60%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-60%", opacity: 0 }}
                transition={{ duration: 0.32, ease: EASE_OUT_EXPO }}
                className="poster text-[clamp(3rem,14vw,10rem)] leading-none text-[hsl(var(--chalk))]"
              >
                {WORDS[word]}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="flex items-end justify-between">
            <span className="meta">Java · Systems · Interfaces</span>
            <span className="poster text-[clamp(2rem,7vw,4.5rem)] leading-none tabular-nums text-[hsl(var(--lime))]">
              {String(count).padStart(3, "0")}
            </span>
          </div>

          {/* progress hairline */}
          <div className="absolute inset-x-0 bottom-0 h-px bg-[hsl(var(--edge))]">
            <motion.div
              className="h-full origin-left bg-[hsl(var(--lime))]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: count / 100 }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
