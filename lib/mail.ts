import nodemailer from "nodemailer";

interface MailOptions {
    to: string;
    subject: string;
    text: string;
    html?: string;
}

export async function sendMail({ to, subject, text, html }: MailOptions): Promise<boolean> {
    // Check if credentials are provided
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn("Email credentials not found. Skipping email send.");
        console.log("EMAIL_USER exists:", !!process.env.EMAIL_USER);
        console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);
        return false;
    }

    try {
        // Create transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            // Additional options for better reliability
            pool: true,
            maxConnections: 1,
            rateDelta: 1000,
            rateLimit: 1
        });

        // Verify connection
        await transporter.verify();
        console.log("SMTP connection verified");

        // Send email
        const info = await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html: html || text,
            // Optional: Reply to the sender
            replyTo: process.env.EMAIL_USER.includes('@') ? process.env.EMAIL_USER : undefined
        });

        console.log("Email sent successfully. Message ID:", info.messageId);
        return true;
    } catch (error: any) {
        console.error("Error sending email:", error);
        
        // Log specific error details
        if (error.code) {
            console.error("Error code:", error.code);
        }
        if (error.response) {
            console.error("SMTP response:", error.response);
        }
        
        return false;
    }
}