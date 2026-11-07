import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { ResumeDialog } from "@/components/experience/resume-dialog";

interface ResumeContextValue {
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

const ResumeContext = createContext<ResumeContextValue | null>(null);

/**
 * One dialog instance for the whole app. Every "Résumé" button on the page
 * opens this instead of each mounting its own iframe — three iframes would
 * mean three PDF fetches.
 */
export function ResumeProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen]);

  return (
    <ResumeContext.Provider value={value}>
      {children}
      <ResumeDialog open={isOpen} onClose={close} />
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResume must be used inside <ResumeProvider>");
  return ctx;
}
