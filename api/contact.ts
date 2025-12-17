import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sendMail } from "../lib/mail";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Allow only POST
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Safely parse body (important for Vercel)
    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const { name, email, message } = body || {};

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Send email
    const emailSent = await sendMail({
      to: process.env.EMAIL_USER || "",
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // Always return success to frontend (portfolio-friendly)
    return res.status(200).json({
      message: emailSent
        ? "Message sent successfully"
        : "Message received successfully",
    });
  } catch (error) {
    console.error("Contact API error:", error);

    // Still return success to avoid user-facing failure
    return res.status(200).json({
      message: "Message received successfully",
    });
  }
}
