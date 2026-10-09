import type { ContactInfo } from "@/types/contact";
import nodemailer from "nodemailer";
import type { Mail, SMTPSentMessageInfo } from "nodemailer";
import { logger } from "./logger";

let transporter: Mail<SMTPSentMessageInfo> | null = null;

function createTransporter() {
    transporter ??= nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 467,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
}

export default async function sendEmail(data: ContactInfo) {
    // Lazzy loaded transporter
    createTransporter();
    if (!transporter) throw new Error("Transporter not ready!");

    // Send message
    const info = await transporter.sendMail({
        from: `"Atlas Portfolio" <${process.env.FROM_EMAIL}>`,
        to: process.env.TO_EMAIL,
        subject: `Nouveau message de <${data.email}>`,
        text: `
		Nom: ${data.name}

		${data.message}`,
    });
    logger("INFO", "Message sent: %s", info.messageId);
}
