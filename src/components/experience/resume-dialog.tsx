import { AnimatePresence, motion } from "framer-motion";
import { Download, FileText, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { EASE_OUT_EXPO } from "@/components/motion/easing";
import { profile } from "@/data/profile";
import { useScrollLock } from "@/hooks/use-site";

/**
 * Resume viewer.
 *
 * The résumé is a real PDF, so it is shown in an <iframe> pointed at the same
 * static file the download link uses — no react-pdf, no pdf.js, nothing to
 * bundle. Mobile browsers often refuse to render PDFs in a frame, so below the
 * `sm` breakpoint the dialog offers the document as an explicit open/download
 * instead of showing an empty box.
 *
 * Focus is trapped, Escape closes, and focus returns to whatever opened it.
 */
export function ResumeDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const nodes = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], iframe, [tabindex]:not([tabindex="-1"])',
      );
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [open, onClose]);

  // Nothing to portal into before the dialog opens, and nothing to portal
  // into during SSR. Creating the portal unconditionally crashes any render
  // where document.body is absent.
  if (!open) return null;
  if (typeof document === "undefined" || !document.body) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[160] grid place-items-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/78 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-title"
            initial={{ opacity: 0, y: 22, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.99 }}
            transition={{ duration: 0.42, ease: EASE_OUT_EXPO }}
            className="relative flex h-full max-h-[92vh] w-full max-w-3xl flex-col border border-[hsl(var(--edge))] bg-[hsl(var(--carbon-2))]"
          >
            {/* toolbar */}
            <div className="flex items-center justify-between gap-3 border-b border-[hsl(var(--edge))] px-4 py-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <FileText className="h-3.5 w-3.5 shrink-0 text-[hsl(var(--lime))]" />
                <div className="min-w-0">
                  <p
                    id="resume-title"
                    className="truncate font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[hsl(var(--chalk))]"
                  >
                    Aniket Jumde — Résumé
                  </p>
                  <p className="font-mono text-[0.52rem] tracking-[0.08em] text-[hsl(var(--fog))]">
                    PDF · one page
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={profile.resumeUrl}
                  download
                  className="hidden items-center gap-1.5 bg-[hsl(var(--lime))] px-3 py-1.5 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-[hsl(var(--carbon))] transition-opacity hover:opacity-90 sm:inline-flex"
                >
                  <Download className="h-3 w-3" />
                  Download
                </a>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close résumé"
                  className="grid h-8 w-8 place-items-center border border-[hsl(var(--edge))] text-[hsl(var(--ash))] transition-colors hover:border-[hsl(var(--chalk))]/40 hover:text-[hsl(var(--chalk))]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* document */}
            <div className="relative min-h-0 flex-1 overflow-hidden bg-[hsl(var(--carbon))]">
              {/* Desktop/tablet: the real PDF, browser-native. */}
              <iframe
                src={`${profile.resumeUrl}#view=FitH`}
                title="Aniket Jumde résumé (PDF)"
                className="hidden h-full w-full sm:block"
              />

              {/* Small screens: inline PDFs are unreliable, so offer the file. */}
              <div className="flex h-full flex-col items-center justify-center gap-5 p-8 text-center sm:hidden">
                <FileText className="h-10 w-10 text-[hsl(var(--lime))]" />
                <div>
                  <p className="font-grotesk text-[1.05rem] font-semibold">Aniket Jumde</p>
                  <p className="mt-1 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-[hsl(var(--fog))]">
                    Résumé · PDF · one page
                  </p>
                </div>
                <div className="flex w-full max-w-[16rem] flex-col gap-2">
                  <a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[hsl(var(--lime))] px-4 py-3 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[hsl(var(--carbon))]"
                  >
                    Open in a new tab
                  </a>
                  <a
                    href={profile.resumeUrl}
                    download
                    className="border border-[hsl(var(--edge))] px-4 py-3 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[hsl(var(--chalk))]"
                  >
                    Download PDF
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
