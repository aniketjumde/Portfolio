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
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("Email credentials are missing");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Gmail App Password
    },
  });

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `New Contact Message from ${name}`,
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  });
}
