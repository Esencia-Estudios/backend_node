import { sendEmail } from "../services/emailService";
import { ResponseHelper } from "../helpers/response";
import { validateEmail } from "../validators/emailValidator";
import { APIGatewayProxyEvent } from "aws-lambda";

export const sendEmailController = async (event: APIGatewayProxyEvent) => {
    try {
        console.log("emailSendController loaded successfully");
        const { to, subject, html } = JSON.parse(event.body || "{}");

        if (!to || !subject || !html) {
            return ResponseHelper.badRequest(null, "Faltan campos obligatorios");
        }

        if (!validateEmail(to)) {
            return ResponseHelper.badRequest(null, "Correo destino no es válido");
        }

        const result = await sendEmail({ to, subject, html });
        return ResponseHelper.success({ messageId: result.messageId }, "Correo enviado con éxito");
    } catch (error: any) {
        console.log("🤷‍♂️🤷‍♂️");
        return ResponseHelper.handleError(error);
    }
};
