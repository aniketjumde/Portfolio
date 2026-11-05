import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowUpRight, Check, Copy, Loader2, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Section } from "@/components/ui/section";
import { Reveal, StaggerGroup, StaggerItem, EASE } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { site, socials } from "@/data/site";
import {
  GithubIcon,
  GmailIcon,
  LeetcodeIcon,
  LinkedinIcon,
} from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const socialIcon = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  LeetCode: LeetcodeIcon,
  Email: GmailIcon,
} as const;

type Status = "idle" | "sending" | "success" | "error";

interface FormState {
  name: string;
  email: string;
  message: string;
}

const empty: FormState = { name: "", email: "", message: "" };

export function Contact() {
  const [form, setForm] = useState<FormState>(empty);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const canSubmit =
    form.name.trim().length >= 2 &&
    isValidEmail &&
    form.message.trim().length >= 10 &&
    status !== "sending";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload?.message ?? "Message could not be sent.");
      }

      setStatus("success");
      setForm(empty);
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <Section id="contact" divided>
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-primary/10 blur-[110px]" />

      <div className="relative grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        {/* ── Left: invitation ───────────────────────────── */}
        <div>
          <Reveal y={14}>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-primary/70" />
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-primary/90">
                07 — Contact
              </span>
            </div>
          </Reveal>

          <Reveal y={20} delay={0.05}>
            <h2 className="text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
              Let's build
              <br />
              <span className="text-serif-accent text-gradient">something solid.</span>
            </h2>
          </Reveal>

          <Reveal y={20} delay={0.1}>
            <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-muted-foreground">
              I'm currently looking for internship opportunities and full-time roles.
              If you have a problem worth solving properly, I'd like to hear about it.
            </p>
          </Reveal>

          {/* Direct channels */}
          <StaggerGroup className="mt-8 space-y-2.5" stagger={0.08}>
            <StaggerItem>
              <button
                type="button"
                onClick={copyEmail}
                className="group flex w-full items-center gap-3.5 rounded-2xl border border-border/70 bg-card/40 px-4 py-3.5 text-left transition-colors hover:border-primary/40 hover:bg-card/70"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-border/70 text-primary">
                  <GmailIcon className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[0.56rem] uppercase tracking-[0.16em] text-muted-foreground">
                    Email
                  </span>
                  <span className="block truncate text-[0.85rem] font-medium">
                    {site.email}
                  </span>
                </span>
                <span className="shrink-0 text-muted-foreground transition-colors group-hover:text-primary">
                  {copied ? (
                    <Check className="h-4 w-4 text-primary" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </span>
              </button>
            </StaggerItem>

            <StaggerItem>
              <a
                href={`tel:${site.phoneHref}`}
                className="group flex items-center gap-3.5 rounded-2xl border border-border/70 bg-card/40 px-4 py-3.5 transition-colors hover:border-primary/40 hover:bg-card/70"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-border/70 text-primary">
                  <Send className="h-3.5 w-3.5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[0.56rem] uppercase tracking-[0.16em] text-muted-foreground">
                    Phone
                  </span>
                  <span className="block text-[0.85rem] font-medium">{site.phone}</span>
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </a>
            </StaggerItem>
          </StaggerGroup>

          {/* Socials */}
          <Reveal delay={0.15} className="mt-7">
            <p className="mb-3 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-muted-foreground">
              Elsewhere
            </p>
            <div className="flex flex-wrap gap-2">
              {socials.map((social) => {
                const Icon = socialIcon[social.label as keyof typeof socialIcon];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/40 px-3.5 py-2 text-[0.78rem] text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-foreground"
                  >
                    <Icon className="h-3.5 w-3.5 transition-colors group-hover:text-primary" />
                    {social.label}
                  </a>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* ── Right: form ────────────────────────────────── */}
        <Reveal delay={0.1}>
          <div className="edge-light relative overflow-hidden rounded-[1.6rem] border border-border/80 bg-card/55 p-6 backdrop-blur-xl sm:p-8">
            <div
              aria-hidden="true"
              className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[hsl(var(--violet))]/15 blur-[80px]"
            />

            <form onSubmit={onSubmit} className="relative space-y-5" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  id="contact-name"
                  label="Name"
                  value={form.name}
                  placeholder="Ada Lovelace"
                  onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                  autoComplete="name"
                  required
                />
                <Field
                  id="contact-email"
                  label="Email"
                  type="email"
                  value={form.email}
                  placeholder="ada@example.com"
                  onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                  autoComplete="email"
                  required
                  invalid={form.email.length > 0 && !isValidEmail}
                  hint={form.email.length > 0 && !isValidEmail ? "Enter a valid email address" : undefined}
                />
              </div>

              <div>
                <div className="mb-2 flex items-baseline justify-between">
                  <label
                    htmlFor="contact-message"
                    className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground"
                  >
                    Message
                  </label>
                  <span className="font-mono text-[0.58rem] text-muted-foreground/50">
                    {form.message.length}/1000
                  </span>
                </div>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  maxLength={1000}
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Tell me what you're building and where you're stuck…"
                  className="w-full resize-none rounded-2xl border border-border/80 bg-background/40 px-4 py-3 text-[0.88rem] leading-relaxed text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-primary/50 focus:bg-background/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
                />
              </div>

              <AnimatePresence>
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <p
                      role="alert"
                      className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-[0.78rem] text-destructive"
                    >
                      <AlertCircle className="mt-px h-3.5 w-3.5 shrink-0" />
                      {error}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                type="submit"
                variant="accent"
                size="lg"
                disabled={!canSubmit}
                className="w-full"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send message
                    <Send className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                  </>
                )}
              </Button>

              <p className="text-center font-mono text-[0.6rem] text-muted-foreground/60">
                Goes straight to my inbox — no newsletter, no funnel.
              </p>
            </form>
          </div>
        </Reveal>
      </div>

      <SuccessDialog
        open={status === "success"}
        onClose={() => setStatus("idle")}
      />
    </Section>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  autoComplete,
  invalid,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  invalid?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={invalid || undefined}
        aria-describedby={hint ? `${id}-hint` : undefined}
        className={cn(
          "h-11 w-full rounded-xl border bg-background/40 px-3.5 text-[0.88rem] text-foreground placeholder:text-muted-foreground/50 transition-colors focus:bg-background/60 focus-visible:outline-none focus-visible:ring-2",
          invalid
            ? "border-destructive/50 focus-visible:ring-destructive/40"
            : "border-border/80 focus:border-primary/50 focus-visible:ring-ring/60",
        )}
      />
      {hint && (
        <p id={`${id}-hint`} className="mt-1.5 text-[0.68rem] text-destructive">
          {hint}
        </p>
      )}
    </div>
  );
}

/** Accessible confirmation modal: focus trap, Escape to close, backdrop click. */
function SuccessDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-title"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="relative w-full max-w-sm overflow-hidden rounded-[1.5rem] border border-border/80 bg-card p-7 text-center shadow-2xl"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full border border-primary/30 bg-primary/10">
              <Check className="h-6 w-6 text-primary" />
            </div>

            <h2 id="success-title" className="font-display text-lg font-semibold">
              Message sent
            </h2>
            <p className="mt-2 text-[0.85rem] leading-relaxed text-muted-foreground">
              Thanks for reaching out — I'll get back to you soon.
            </p>

            <Button onClick={onClose} variant="default" className="mt-6 w-full">
              Close
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
