import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Check, Copy, Loader2, Mail, MapPin, Phone, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { EASE_OUT_EXPO } from "@/components/motion/easing";
import { profile } from "@/data/profile";
import { useScrollLock } from "@/hooks/use-site";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const emailValid = EMAIL_RE.test(form.email);
  const canSend =
    form.name.trim().length >= 2 &&
    emailValid &&
    form.message.trim().length >= 10 &&
    status !== "sending";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSend) return;

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
        throw new Error(payload?.message ?? "Could not send the message.");
      }

      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Email me directly instead.",
      );
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the mailto link beside it still works */
    }
  }

  return (
    <section id="contact" className="section relative">
      <div className="shell relative z-10">
        <SectionHeading
          eyebrow="07 — Contact"
          title="Let's build"
          accent="something"
          lede="Open to internships and full-time roles. The fastest route is email — the form goes to the same inbox."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          {/* ── Channels ──────────────────────────────────── */}
          <div className="flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
              className="card p-5"
            >
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-[hsl(var(--violet))]">
                Email
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="mt-2 block break-all text-[0.95rem] font-medium text-white transition-colors hover:text-[hsl(var(--violet))]"
              >
                {profile.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-[hsl(0_0%_100%/0.14)] px-2.5 py-1.5 text-[0.72rem] font-medium text-[hsl(var(--ash))] transition-colors hover:border-[hsl(var(--violet))]/60 hover:text-white"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-400" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" /> Copy address
                  </>
                )}
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.06 }}
              className="card p-5"
            >
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-[hsl(var(--violet))]">
                Direct
              </p>
              <ul className="mt-3 space-y-2.5">
                <li>
                  <a
                    href={`tel:${profile.phoneHref}`}
                    className="flex items-center gap-2.5 text-[0.88rem] text-[hsl(var(--ash))] transition-colors hover:text-white"
                  >
                    <Phone className="h-3.5 w-3.5 text-[hsl(var(--fog))]" />
                    {profile.phone}
                  </a>
                </li>
                <li className="flex items-center gap-2.5 text-[0.88rem] text-[hsl(var(--ash))]">
                  <MapPin className="h-3.5 w-3.5 text-[hsl(var(--fog))]" />
                  {profile.location}
                </li>
                <li>
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-2.5 text-[0.88rem] text-[hsl(var(--ash))] transition-colors hover:text-white"
                  >
                    <Mail className="h-3.5 w-3.5 text-[hsl(var(--fog))]" />
                    Reply within a day or two
                  </a>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.12 }}
              className="card flex items-center gap-3 p-5"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <p className="text-[0.85rem] text-[hsl(var(--ash))]">{profile.availability}</p>
            </motion.div>
          </div>

          {/* ── Form ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: EASE_OUT_EXPO, delay: 0.08 }}
            className="card p-5 sm:p-6"
          >
            <form onSubmit={onSubmit} noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  id="cf-name"
                  label="Name"
                  value={form.name}
                  onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                  placeholder="Your name"
                  autoComplete="name"
                />
                <Field
                  id="cf-email"
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                  placeholder="you@example.com"
                  autoComplete="email"
                  invalid={form.email.length > 0 && !emailValid}
                  hint={form.email.length > 0 && !emailValid ? "Enter a valid email" : undefined}
                />
              </div>

              <div className="mt-4">
                <div className="mb-1.5 flex items-baseline justify-between">
                  <label
                    htmlFor="cf-message"
                    className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-[hsl(var(--ash))]"
                  >
                    Message
                  </label>
                  <span className="font-mono text-[0.62rem] text-[hsl(var(--fog))]">
                    {form.message.length}/1000
                  </span>
                </div>
                <textarea
                  id="cf-message"
                  rows={6}
                  maxLength={1000}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="What are you building, and where is it stuck?"
                  className="field resize-none"
                />
              </div>

              <AnimatePresence>
                {status === "error" && (
                  <motion.p
                    role="alert"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 flex items-start gap-2 overflow-hidden text-[0.8rem] text-red-300"
                  >
                    <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={!canSend}
                className={cn(
                  "btn mt-5 w-full",
                  canSend ? "btn-primary" : "btn-ghost cursor-not-allowed opacity-55",
                )}
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending
                  </>
                ) : (
                  <>
                    Send message
                    <Send className="h-3.5 w-3.5" />
                  </>
                )}
              </button>

              <p className="mt-3 text-center text-[0.7rem] text-[hsl(var(--fog))]">
                Goes straight to my inbox. Or email{" "}
                <a
                  href={`mailto:${profile.email}`}
                  className="text-[hsl(var(--violet))] underline-offset-2 hover:underline"
                >
                  directly
                </a>
                .
              </p>
            </form>
          </motion.div>
        </div>
      </div>

      <p aria-live="polite" className="sr-only">
        {status === "sent" ? "Your message was sent." : ""}
      </p>

      <SentDialog open={status === "sent"} onClose={() => setStatus("idle")} />
    </section>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
  invalid,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  invalid?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-[hsl(var(--ash))]"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={invalid || undefined}
        aria-describedby={hint ? `${id}-hint` : undefined}
        className="field"
      />
      {hint && (
        <p id={`${id}-hint`} className="mt-1.5 text-[0.7rem] text-red-300">
          {hint}
        </p>
      )}
    </div>
  );
}

function SentDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    // remember what had focus so it can be restored on dismissal
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const nodes = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], [tabindex]:not([tabindex="-1"])',
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

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[150] grid place-items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="sent-title"
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
            className="card relative w-full max-w-sm p-6 text-center"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 text-[hsl(var(--fog))] transition-colors hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-500/15 text-emerald-400">
              <Check className="h-5 w-5" />
            </span>
            <h2 id="sent-title" className="mt-4 text-[1.25rem] font-bold">
              Message sent
            </h2>
            <p className="mt-2 text-[0.87rem] leading-relaxed text-[hsl(var(--ash))]">
              Thanks for reaching out — I&apos;ll reply as soon as I can.
            </p>
            <button type="button" onClick={onClose} className="btn btn-primary mt-5 w-full">
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
