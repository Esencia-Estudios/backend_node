import { transporter } from '@/helpers/transport';

type EmailPayload = {
    to: string;
    subject: string;
    html: string;
};

export const sendEmail = async ({ to, subject, html }: EmailPayload) => {
    const info = await transporter.sendMail({
        from: `"Esencia Notificaciones" <${process.env.SMTP_USER}>`,
        to,
        subject,
        html,
    });

    return { messageId: info.messageId };
};
