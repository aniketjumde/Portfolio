import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendMail } from '../lib/mail';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle OPTIONS preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ 
            message: 'Method not allowed',
            allowed: ['POST']
        });
    }

    // Parse JSON body
    let body;
    try {
        body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    } catch (error) {
        return res.status(400).json({ message: 'Invalid JSON format' });
    }

    const { name, email, message } = body;

    // Validation
    if (!name || !email || !message) {
        return res.status(400).json({ 
            message: "All fields are required",
            fields: { name, email, message }
        });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email address" });
    }

    try {
        // Send email to the portfolio owner
        const success = await sendMail({
            to: process.env.EMAIL_USER || "",
            subject: `New Contact Form Submission from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
                    <h3 style="color: #333;">New Contact Form Submission</h3>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Message:</strong></p>
                    <p style="background: #f5f5f5; padding: 10px; border-radius: 3px;">${message.replace(/\n/g, '<br>')}</p>
                    <hr style="margin: 20px 0;">
                    <p style="color: #666; font-size: 12px;">Sent from your portfolio website</p>
                </div>
            `,
        });

        if (success) {
            return res.status(200).json({ 
                success: true,
                message: "Message sent successfully!" 
            });
        } else {
            // If no credentials, still return success for demo purposes
            if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
                console.warn('Email credentials not configured');
                return res.status(200).json({ 
                    success: true,
                    message: "Message received (email notifications not configured)",
                    demo: true
                });
            }
            return res.status(500).json({ 
                success: false,
                message: "Failed to send email. Please try again later." 
            });
        }
    } catch (error: any) {
        console.error("Contact form error:", error);
        return res.status(500).json({ 
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}