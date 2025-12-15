import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendMail } from "./mail";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      // Send email to the portfolio owner
      const success = await sendMail({
        to: process.env.EMAIL_USER || "", // Send to self
        subject: `New Contact Form Submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      });

      if (success) {
        res.json({ message: "Message sent successfully" });
      } else {
        // If email fails (e.g. no credentials), still return success to frontend 
        // but log warning (or return 500 if strict)
        // For this portfolio, we'll return 200 but warn if no creds
        if (!process.env.EMAIL_USER) {
          res.json({ message: "Message received (Email not configured)" });
        } else {
          res.status(500).json({ message: "Failed to send email" });
        }
      }
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
