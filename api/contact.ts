import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sendMail } from "../lib/mail.js";

/** Field limits — mirrored by the client so users see them before submitting. */
const LIMITS = {
  name: 80,
  email: 160,
  message: 1000,
} as const;

/**
 * Best-effort in-memory throttle. Serverless instances are ephemeral, so this
 * is not a security boundary on its own — it stops naive repeat submissions
 * from a single warm instance. Pair with Vercel's firewall for real limits.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    hits.set(ip, recent);
    return true;
  }

  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic cleanup so the map cannot grow unbounded.
  if (hits.size > 500) {
    for (const [key, timestamps] of hits) {
      if (!timestamps.some((t) => now - t < WINDOW_MS)) hits.delete(key);
    }
  }

  return false;
}

/** Rejects values that look like header injection or obvious script payloads. */
function hasSuspiciousContent(value: string): boolean {
  return /[\r\n]/.test(value) || /<script|javascript:|data:text\/html/i.test(value);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(405).json({ message: "Method not allowed" });
  }

  const forwarded = req.headers["x-forwarded-for"];
  const ip =
    (Array.isArray(forwarded) ? forwarded[0] : forwarded)?.split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    "unknown";

  if (isRateLimited(ip)) {
    return res.status(429).json({
      message: "Too many messages sent recently. Please try again in a few minutes.",
    });
  }

  // Vercel parses JSON bodies automatically; tolerate string bodies too.
  let body: unknown = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ message: "Invalid request body" });
    }
  }

  const {
    name,
    email,
    message,
  } = (body ?? {}) as { name?: unknown; email?: unknown; message?: unknown };

  if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
    return res.status(400).json({ message: "All fields are required" });
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (
    trimmedName.length > LIMITS.name ||
    trimmedEmail.length > LIMITS.email ||
    trimmedMessage.length > LIMITS.message
  ) {
    return res.status(400).json({
      message: `Please keep your name under ${LIMITS.name}, email under ${LIMITS.email} and message under ${LIMITS.message} characters.`,
    });
  }

  if (trimmedName.length < 2) {
    return res.status(400).json({ message: "Please enter your name" });
  }

  if (trimmedMessage.length < 10) {
    return res.status(400).json({ message: "Please write a slightly longer message" });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  if (
    hasSuspiciousContent(trimmedName) ||
    hasSuspiciousContent(trimmedEmail) ||
    hasSuspiciousContent(trimmedMessage)
  ) {
    return res.status(400).json({ message: "Your message contains unsupported characters." });
  }

  try {
    await sendMail({
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
    });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Contact API Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again later.",
    });
  }
}
