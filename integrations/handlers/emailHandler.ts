import { sendEmailController } from "../controllers/emailController";

export const sendEmailHandler = async (event: any) => {
    return sendEmailController(event);
};
