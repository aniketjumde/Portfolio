import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { DrawRule, EDITORIAL_EASE, MaskedLines, Reveal } from "@/components/motion/primitives";
import { SectionHeader } from "@/components/ui/section-header";
import { skillGroups } from "@/data/skills";

import { cn } from "@/lib/utils";

export function Expertise() {
  const [active, setActive] = useState(0);
  const group = skillGroups[active];

  return (
    <section id="expertise" className="relative">
      <div className="mx-auto w-full max-w-[104rem] px-4 sm:px-7">
        <DrawRule />

        <div className="grid gap-8 py-14 lg:grid-cols-[0.34fr_0.66fr] lg:gap-16 lg:py-20">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SectionHeader index="03" title="Expertise" />
            <MaskedLines
              as="h3"
              delay={0.1}
              className="display-lg mt-6"
              lines={[
                <span key="1">The toolkit,</span>,
                <span key="2" className="italic-accent text-[hsl(var(--oxide))]">
                  in full.
                </span>,
              ]}
            />
            <Reveal delay={0.15}>
              <p className="mt-4 max-w-sm text-[0.88rem] leading-relaxed text-[hsl(var(--ink-soft))]">
                Six categories, transcribed straight from the résumé. Select one to see
                what it covers.
              </p>
            </Reveal>
          </div>

          {/* Accordion index — a list, not tabs */}
          <div className="border-t border-[hsl(var(--rule))]">
            {skillGroups.map((g, i) => {
              const isOpen = i === active;
              return (
                <div key={g.id} className="border-b border-[hsl(var(--rule))]">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-expanded={isOpen}
                    aria-controls={`skill-panel-${g.id}`}
                    className="group flex w-full items-center gap-4 py-4 text-left"
                  >
                    <span
                      className={cn(
                        "font-mono text-[0.6rem] tracking-[0.16em] transition-colors",
                        isOpen
                          ? "text-[hsl(var(--oxide))]"
                          : "text-[hsl(var(--ink-faint))]",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span
                      className={cn(
                        "flex-1 font-display text-[1.35rem] font-semibold leading-none transition-colors duration-300 sm:text-[1.65rem]",
                        isOpen
                          ? "text-[hsl(var(--ink))]"
                          : "text-[hsl(var(--ink-faint))] group-hover:text-[hsl(var(--ink))]",
                      )}
                    >
                      {g.title}
                    </span>

                    <span className="hidden font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[hsl(var(--ink-faint))] sm:block">
                      {g.note}
                    </span>

                    <span
                      className={cn(
                        "font-mono text-[0.6rem] tabular-nums transition-colors",
                        isOpen
                          ? "text-[hsl(var(--oxide))]"
                          : "text-[hsl(var(--ink-faint))]",
                      )}
                    >
                      {String(g.items.length).padStart(2, "0")}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`skill-panel-${g.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: EDITORIAL_EASE }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-wrap gap-2 pb-5 pl-8 sm:pl-10">
                          {g.items.map((item, j) => (
                            <motion.span
                              key={item}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                delay: 0.05 + j * 0.035,
                                duration: 0.4,
                                ease: EDITORIAL_EASE,
                              }}
                              className="border border-[hsl(var(--rule))] bg-[hsl(var(--paper-2))] px-2.5 py-1.5 font-mono text-[0.66rem] tracking-[0.04em] text-[hsl(var(--ink-soft))] transition-colors hover:border-[hsl(var(--ink))] hover:text-[hsl(var(--ink))]"
                            >
                              {item}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
