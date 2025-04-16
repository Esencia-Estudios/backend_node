import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // ej: smtp.gmail.com
    port: Number(process.env.SMTP_PORT), // ej: 587
    secure: false, // true para 465, false para 587
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

