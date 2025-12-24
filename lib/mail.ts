import nodemailer from "nodemailer";

interface SendMailProps {
  name: string;
  email: string;
  message: string;
}

export async function sendMail({
  name,
  email,
  message,
}: SendMailProps): Promise<void> {
  // Validate environment variables
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("Email credentials are missing. Please set EMAIL_USER and EMAIL_PASS environment variables.");
  }

  // Create transporter with Gmail SMTP
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Gmail App Password
    },
  });

  // Verify transporter configuration
  try {
    await transporter.verify();
  } catch (error) {
    console.error("Email transporter verification failed:", error);
    throw new Error("Email service configuration error. Please check your credentials.");
  }

  // Send email
  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email, // Allow replying directly to the sender
      subject: `New Contact Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;">
              <strong style="color: #4F46E5;">Name:</strong> ${name}
            </p>
            <p style="margin: 10px 0;">
              <strong style="color: #4F46E5;">Email:</strong> 
              <a href="mailto:${email}" style="color: #4F46E5;">${email}</a>
            </p>
            <div style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #4F46E5;">
              <strong style="color: #4F46E5;">Message:</strong>
              <p style="margin-top: 10px; color: #333; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            This email was sent from your portfolio contact form.
          </p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send email:", error);
    throw new Error("Failed to send email. Please try again later.");
  }
}
