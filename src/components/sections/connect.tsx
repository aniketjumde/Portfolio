import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Loader2, Send, X, AlertCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DrawRule, MaskedLines, Reveal } from "@/components/motion/primitives";
import { SectionHeader } from "@/components/ui/section-header";
import { profile, socials } from "@/data/profile";
import { GithubIcon, LinkedinIcon, LeetcodeIcon, GmailIcon } from "@/components/ui/brand-icons";
import { EDITORIAL_EASE } from "@/components/motion/primitives";
import { cn } from "@/lib/utils";

const socialIcons = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  LeetCode: LeetcodeIcon,
  Email: GmailIcon,
} as const;

type Status = "idle" | "sending" | "sent" | "error";

export function Connect() {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const ready =
    form.name.trim().length >= 2 &&
    validEmail &&
    form.message.trim().length >= 10 &&
    status !== "sending";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!ready) return;
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
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked */
    }
  }

  return (
    <section id="connect" className="relative">
      <div className="mx-auto w-full max-w-[104rem] px-4 sm:px-7">
        <DrawRule />

        <div className="py-14 lg:py-20">
          <SectionHeader index="07" title="Let's Connect" />

          <MaskedLines
            as="h3"
            delay={0.1}
            className="display-xl mt-6 max-w-5xl"
            lines={[
              <span key="1">Have a problem</span>,
              <span key="2">
                worth{" "}
                <span className="italic-accent text-[hsl(var(--oxide))]">solving?</span>
              </span>,
            ]}
          />

          <div className="mt-12 grid gap-12 lg:grid-cols-[0.44fr_0.56fr] lg:gap-16">
            {/* ── Direct channels ─────────────────────────── */}
            <div>
              <Reveal delay={0.1}>
                <p className="max-w-md text-[0.95rem] leading-[1.7] text-[hsl(var(--ink-soft))]">
                  I'm currently looking for internship opportunities and full-time
                  roles. If you have a system that needs building properly, I'd like to
                  hear about it.
                </p>
              </Reveal>

              {/* Email — primary */}
              <Reveal delay={0.15} className="mt-8">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="group flex w-full items-center justify-between gap-4 border-b border-[hsl(var(--ink))] pb-3 text-left"
                  aria-label="Copy email address"
                >
                  <span className="min-w-0">
                    <span className="label block">Email</span>
                    <span className="mt-1.5 block break-all font-display text-[1.15rem] font-semibold leading-tight transition-colors group-hover:text-[hsl(var(--oxide))] sm:text-[1.35rem]">
                      {profile.email}
                    </span>
                  </span>
                  <span className="shrink-0 text-[hsl(var(--ink-faint))] transition-colors group-hover:text-[hsl(var(--oxide))]">
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </span>
                </button>
              </Reveal>

              {/* Phone */}
              <Reveal delay={0.2} className="mt-6">
                <a
                  href={`tel:${profile.phoneHref}`}
                  className="group flex items-center justify-between gap-4 border-b border-[hsl(var(--rule))] pb-3"
                >
                  <span>
                    <span className="label block">Phone</span>
                    <span className="mt-1.5 block font-display text-[1.05rem] font-semibold transition-colors group-hover:text-[hsl(var(--oxide))]">
                      {profile.phone}
                    </span>
                  </span>
                  <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[hsl(var(--ink-faint))]">
                    Call
                  </span>
                </a>
              </Reveal>

              {/* Social index */}
              <Reveal delay={0.25} className="mt-8">
                <p className="label mb-3">Elsewhere</p>
                <div className="grid grid-cols-2 gap-px border border-[hsl(var(--rule))] bg-[hsl(var(--rule))]">
                  {socials.map((s) => {
                    const Icon = socialIcons[s.label as keyof typeof socialIcons];
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        target={s.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2.5 bg-[hsl(var(--paper))] px-3.5 py-3 transition-colors hover:bg-[hsl(var(--paper-2))]"
                      >
                        <Icon className="h-3.5 w-3.5 shrink-0 text-[hsl(var(--ink-faint))] transition-colors group-hover:text-[hsl(var(--oxide))]" />
                        <span className="min-w-0">
                          <span className="block font-mono text-[0.6rem] uppercase tracking-[0.12em]">
                            {s.label}
                          </span>
                          <span className="block truncate font-mono text-[0.56rem] text-[hsl(var(--ink-faint))]">
                            {s.handle}
                          </span>
                        </span>
                      </a>
                    );
                  })}
                </div>
              </Reveal>
            </div>

            {/* ── Form ────────────────────────────────────── */}
            <Reveal delay={0.15}>
              <form
                onSubmit={onSubmit}
                className="border border-[hsl(var(--rule))] bg-[hsl(var(--paper-2))] p-6 sm:p-8"
                noValidate
              >
                <p className="label mb-6">Or send a note</p>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    id="c-name"
                    label="Name"
                    value={form.name}
                    onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                    placeholder="Your name"
                    autoComplete="name"
                  />
                  <Field
                    id="c-email"
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                    placeholder="you@example.com"
                    autoComplete="email"
                    invalid={form.email.length > 0 && !validEmail}
                    hint={form.email.length > 0 && !validEmail ? "Enter a valid email" : undefined}
                  />
                </div>

                <div className="mt-5">
                  <div className="mb-2 flex items-baseline justify-between">
                    <label
                      htmlFor="c-message"
                      className="label"
                    >
                      Message
                    </label>
                    <span className="font-mono text-[0.56rem] text-[hsl(var(--ink-faint))]">
                      {form.message.length}/1000
                    </span>
                  </div>
                  <textarea
                    id="c-message"
                    rows={5}
                    maxLength={1000}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder="What are you building, and where is it stuck?"
                    className="w-full resize-none border border-[hsl(var(--rule))] bg-[hsl(var(--paper))] px-3.5 py-3 text-[0.88rem] leading-relaxed transition-colors placeholder:text-[hsl(var(--ink-faint))]/70 focus:border-[hsl(var(--ink))] focus-visible:outline-none"
                  />
                </div>

                <AnimatePresence>
                  {status === "error" && (
                    <motion.p
                      role="alert"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 flex items-start gap-2 overflow-hidden border-l-2 border-[hsl(var(--destructive,0_70%_45%))] pl-3 text-[0.78rem] text-[hsl(var(--oxide))]"
                    >
                      <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={!ready}
                  className={cn(
                    "group mt-6 inline-flex w-full items-center justify-center gap-2.5 px-6 py-3.5 font-mono text-[0.64rem] uppercase tracking-[0.18em] transition-colors duration-300",
                    ready
                      ? "bg-[hsl(var(--ink))] text-[hsl(var(--paper))] hover:bg-[hsl(var(--oxide))]"
                      : "cursor-not-allowed border border-[hsl(var(--rule))] text-[hsl(var(--ink-faint))]",
                  )}
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Sending
                    </>
                  ) : (
                    <>
                      Send message
                      <Send className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>

                <p className="mt-3 text-center font-mono text-[0.56rem] tracking-[0.06em] text-[hsl(var(--ink-faint))]">
                  Goes directly to my inbox.
                </p>
              </form>
            </Reveal>
          </div>
        </div>
      </div>

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
      <label htmlFor={id} className="label mb-2 block">
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
        className={cn(
          "h-11 w-full border bg-[hsl(var(--paper))] px-3.5 text-[0.88rem] transition-colors placeholder:text-[hsl(var(--ink-faint))]/70 focus-visible:outline-none",
          invalid
            ? "border-[hsl(var(--oxide))]"
            : "border-[hsl(var(--rule))] focus:border-[hsl(var(--ink))]",
        )}
      />
      {hint && (
        <p id={`${id}-hint`} className="mt-1.5 text-[0.68rem] text-[hsl(var(--oxide))]">
          {hint}
        </p>
      )}
    </div>
  );
}

/** Confirmation, styled as a printed card rather than a glass modal. */
function SentDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    btnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const nodes = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, textarea, [tabindex]:not([tabindex="-1"])',
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
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previous?.focus();
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
            className="absolute inset-0 bg-[hsl(var(--ink))]/45 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="sent-title"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: EDITORIAL_EASE }}
            className="relative w-full max-w-sm border border-[hsl(var(--ink))] bg-[hsl(var(--paper))] p-7"
          >
            <button
              ref={btnRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 text-[hsl(var(--ink-faint))] transition-colors hover:text-[hsl(var(--ink))]"
            >
              <X className="h-4 w-4" />
            </button>

            <span className="tick">Received</span>
            <h2 id="sent-title" className="mt-3 font-display text-[1.6rem] font-semibold leading-tight">
              Message sent.
            </h2>
            <p className="mt-2 text-[0.86rem] leading-relaxed text-[hsl(var(--ink-soft))]">
              Thanks for reaching out — I'll reply as soon as I can.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full bg-[hsl(var(--ink))] px-4 py-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[hsl(var(--paper))] transition-colors hover:bg-[hsl(var(--oxide))]"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
