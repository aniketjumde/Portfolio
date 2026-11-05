import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowUpRight, Check, Copy, Loader2, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DrawLine, PosterLinesOnScroll, Rise } from "@/components/motion/text";
import { EASE_OUT_EXPO } from "@/components/motion/easing";
import { profile, socials } from "@/data/profile";
import { GithubIcon, GmailIcon, LeetcodeIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { cn } from "@/lib/utils";

const iconMap = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  LeetCode: LeetcodeIcon,
  Email: GmailIcon,
} as const;

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
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
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden">
      {/* ambient */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="ambient-a absolute bottom-[-20%] left-1/2 h-[30rem] w-[45rem] -translate-x-1/2 rounded-full bg-[hsl(var(--lime))]/[0.06] blur-[130px]" />
      </div>

      <div className="relative mx-auto w-full max-w-[104rem] px-5 sm:px-8">
        <DrawLine />

        <div className="py-16 lg:py-24">
          <Rise>
            <p className="meta mb-4">
              <span className="text-[hsl(var(--lime))]">05</span> — Contact
            </p>
          </Rise>

          <PosterLinesOnScroll
            as="h2"
            className="poster-xl"
            lines={[
              <span key="1">LET'S</span>,
              <span key="2">BUILD</span>,
              <span key="3" className="text-[hsl(var(--lime))]">
                SOMETHING.
              </span>,
            ]}
          />

          <div className="mt-12 grid gap-12 lg:grid-cols-[0.45fr_0.55fr] lg:gap-16">
            {/* Channels */}
            <div>
              <Rise delay={0.05}>
                <p className="max-w-md font-grotesk text-[1.02rem] leading-[1.6] text-[hsl(var(--ash))]">
                  I'm currently looking for internship opportunities and full-time roles.
                  If you have a system that needs building properly, I'd like to hear about it.
                </p>
              </Rise>

              <Rise delay={0.1} className="mt-8">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="group flex w-full items-center justify-between gap-4 border-b border-[hsl(var(--edge))] pb-3 text-left transition-colors hover:border-[hsl(var(--lime))]"
                  aria-label="Copy email address"
                >
                  <span className="min-w-0">
                    <span className="meta block">Email</span>
                    <span className="mt-1.5 block break-all font-grotesk text-[1.1rem] font-medium tracking-[-0.02em] text-[hsl(var(--chalk))] transition-colors group-hover:text-[hsl(var(--lime))] sm:text-[1.3rem]">
                      {profile.email}
                    </span>
                  </span>
                  <span className="shrink-0 text-[hsl(var(--fog))] transition-colors group-hover:text-[hsl(var(--lime))]">
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </span>
                </button>
              </Rise>

              <Rise delay={0.15} className="mt-6">
                <a
                  href={`tel:${profile.phoneHref}`}
                  className="group flex items-center justify-between gap-4 border-b border-[hsl(var(--edge))] pb-3 transition-colors hover:border-[hsl(var(--lime))]"
                >
                  <span>
                    <span className="meta block">Phone</span>
                    <span className="mt-1.5 block font-grotesk text-[1.05rem] font-medium tracking-[-0.02em] text-[hsl(var(--chalk))]">
                      {profile.phone}
                    </span>
                  </span>
                  <span className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-[hsl(var(--fog))]">
                    Call
                  </span>
                </a>
              </Rise>

              <Rise delay={0.2} className="mt-8">
                <p className="meta mb-3">Elsewhere</p>
                <div className="grid grid-cols-2 gap-px border border-[hsl(var(--edge))] bg-[hsl(var(--edge))]">
                  {socials.map((s) => {
                    const Icon = iconMap[s.label as keyof typeof iconMap];
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        target={s.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2.5 bg-[hsl(var(--carbon))] px-3.5 py-3 transition-colors hover:bg-[hsl(var(--carbon-2))]"
                      >
                        <Icon className="h-3.5 w-3.5 shrink-0 text-[hsl(var(--fog))] transition-colors group-hover:text-[hsl(var(--lime))]" />
                        <span className="min-w-0">
                          <span className="block font-mono text-[0.6rem] uppercase tracking-[0.12em] text-[hsl(var(--chalk))]">
                            {s.label}
                          </span>
                          <span className="block truncate font-mono text-[0.55rem] text-[hsl(var(--fog))]">
                            {s.handle}
                          </span>
                        </span>
                      </a>
                    );
                  })}
                </div>
              </Rise>
            </div>

            {/* Form */}
            <Rise delay={0.1}>
              <form
                onSubmit={onSubmit}
                noValidate
                className="border border-[hsl(var(--edge))] bg-[hsl(var(--carbon-2))] p-6 sm:p-8"
              >
                <p className="meta mb-6">Or send a note</p>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    id="ct-name"
                    label="Name"
                    value={form.name}
                    onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                    placeholder="Your name"
                    autoComplete="name"
                  />
                  <Field
                    id="ct-email"
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
                    <label htmlFor="ct-message" className="meta">
                      Message
                    </label>
                    <span className="font-mono text-[0.55rem] text-[hsl(var(--fog))]">
                      {form.message.length}/1000
                    </span>
                  </div>
                  <textarea
                    id="ct-message"
                    rows={5}
                    maxLength={1000}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder="What are you building, and where is it stuck?"
                    className="w-full resize-none border border-[hsl(var(--edge))] bg-[hsl(var(--carbon))] px-3.5 py-3 text-[0.88rem] leading-relaxed text-[hsl(var(--chalk))] transition-colors placeholder:text-[hsl(var(--fog))] focus:border-[hsl(var(--lime))] focus-visible:outline-none"
                  />
                </div>

                <AnimatePresence>
                  {status === "error" && (
                    <motion.p
                      role="alert"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 flex items-start gap-2 overflow-hidden border-l-2 border-[hsl(var(--lime))] pl-3 text-[0.78rem] text-[hsl(var(--ash))]"
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
                    "group mt-6 inline-flex w-full items-center justify-center gap-2.5 px-6 py-3.5 font-mono text-[0.64rem] uppercase tracking-[0.18em] transition-all duration-300",
                    ready
                      ? "bg-[hsl(var(--lime))] text-[hsl(var(--carbon))] hover:shadow-[0_14px_44px_-14px_hsl(76_100%_57%/0.6)]"
                      : "cursor-not-allowed border border-[hsl(var(--edge))] text-[hsl(var(--fog))]",
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

                <p className="mt-3 text-center font-mono text-[0.55rem] tracking-[0.06em] text-[hsl(var(--fog))]">
                  Goes directly to my inbox.
                </p>
              </form>
            </Rise>
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
      <label htmlFor={id} className="meta mb-2 block">
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
          "h-11 w-full border bg-[hsl(var(--carbon))] px-3.5 text-[0.88rem] text-[hsl(var(--chalk))] transition-colors placeholder:text-[hsl(var(--fog))] focus-visible:outline-none",
          invalid
            ? "border-[hsl(var(--lime))]"
            : "border-[hsl(var(--edge))] focus:border-[hsl(var(--lime))]",
        )}
      />
      {hint && (
        <p id={`${id}-hint`} className="mt-1.5 text-[0.68rem] text-[hsl(var(--lime))]">
          {hint}
        </p>
      )}
    </div>
  );
}

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
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
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
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="sent-title"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            className="relative w-full max-w-sm border border-[hsl(var(--edge))] bg-[hsl(var(--carbon-2))] p-7"
          >
            <button
              ref={btnRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 text-[hsl(var(--fog))] transition-colors hover:text-[hsl(var(--chalk))]"
            >
              <X className="h-4 w-4" />
            </button>

            <p className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-[hsl(var(--lime))]">
              Received
            </p>
            <h2 id="sent-title" className="mt-3 font-grotesk text-[1.6rem] font-semibold tracking-[-0.03em]">
              Message sent.
            </h2>
            <p className="mt-2 text-[0.86rem] leading-relaxed text-[hsl(var(--ash))]">
              Thanks for reaching out — I'll reply as soon as I can.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full bg-[hsl(var(--lime))] px-4 py-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[hsl(var(--carbon))] transition-opacity hover:opacity-90"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
