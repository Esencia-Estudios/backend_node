import { transporter } from '@/helpers/transport';
import { EmailDTO } from '@/dtos/email.dto'


export const sendEmail = async ({ to, subject, html }: EmailDTO) => {
    const info = await transporter.sendMail({
        from: `"Esencia Notificaciones" <${process.env.SMTP_USER}>`,
        to,
        subject,
        html,
    });

    return { messageId: info.messageId };
};
