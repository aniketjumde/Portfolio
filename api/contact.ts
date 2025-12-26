import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sendMail } from "../lib/mail.js";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await sendMail({
      name,
      email,
      message,
    });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Contact API Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
}
