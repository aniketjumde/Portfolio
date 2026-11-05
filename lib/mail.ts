import nodemailer from "nodemailer";

interface SendMailProps {
  name: string;
  email: string;
  message: string;
}

/** Escapes user input before it is interpolated into the HTML email body. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendMail({ name, email, message }: SendMailProps): Promise<void> {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("Email configuration missing. Please set EMAIL_USER and EMAIL_PASS environment variables.");
    throw new Error("Email service is not configured properly");
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail App Password
      },
    });

    const info = await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Contact Message from ${name}`.slice(0, 150),
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111827;">
          <h2 style="color: #0f172a; border-bottom: 2px solid #10b981; padding-bottom: 12px; margin: 0 0 20px;">
            New contact form submission
          </h2>
          <table style="width: 100%; border-collapse: collapse; background: #f8fafc; border-radius: 8px;">
            <tr>
              <td style="padding: 14px 16px; width: 90px; color: #64748b; font-size: 13px;">Name</td>
              <td style="padding: 14px 16px; font-weight: 600;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 14px 16px; color: #64748b; font-size: 13px; border-top: 1px solid #e2e8f0;">Email</td>
              <td style="padding: 14px 16px; border-top: 1px solid #e2e8f0;">
                <a href="mailto:${safeEmail}" style="color: #0ea5e9;">${safeEmail}</a>
              </td>
            </tr>
          </table>
          <div style="margin: 24px 0;">
            <p style="color: #64748b; font-size: 13px; margin: 0 0 8px;">Message</p>
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-left: 3px solid #10b981; border-radius: 6px; padding: 16px; line-height: 1.65; font-size: 14px; white-space: normal;">
              ${safeMessage}
            </div>
          </div>
          <p style="color: #94a3b8; font-size: 11px; margin-top: 28px; border-top: 1px solid #e2e8f0; padding-top: 14px;">
            Sent from the contact form at aniketjumdeportfolio.vercel.app
          </p>
        </div>
      `,
      text: `New contact form submission\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    console.log("Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Failed to send email:", error);
    if (error instanceof Error) {
      throw new Error(`Email sending failed: ${error.message}`);
    }
    throw new Error("Failed to send email");
  }
}
