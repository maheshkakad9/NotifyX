import nodemailer from "nodemailer";
import { logger } from "../utils/logger.js";

export const sendEmail = async (email: string, message: string) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });

    await transporter.sendMail({
        from: `"NotifyX" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "New Notification",
        text: message
    });

    logger(`Email sent to ${email}`);
};