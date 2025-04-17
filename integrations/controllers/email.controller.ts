import { sendEmail } from "../services/email.service";
import { ResponseHelper } from "../helpers/response";
import { validateEmail } from "../validators/email.validator";

export const sendEmailController = async (event: any) => {
    const { to, subject, html } = JSON.parse(event.body || "{}");

    if (!to || !subject || !html) {
        return ResponseHelper.badRequest("Faltan campos obligatorios");
    }

    if (!validateEmail(to)) {
        return ResponseHelper.badRequest("Correo destino no es válido");
    }

    const result = await sendEmail({ to, subject, html });
    return ResponseHelper.success({ messageId: result.messageId });
};
