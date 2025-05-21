import { authMiddleware } from "../middleware/validateBasicAuth.js";
import { ResponseHelper } from "../helpers/response.js";
import { createPayment } from "../repositories/paymentRepository.js";
import { webhookStripeService } from "../services/webhookStripeService.js";

export const webhook = async (event) => {
  const authError = authMiddleware(event);
  if (authError) return authError;
  try {
    const data = JSON.parse(event.body);
    const response = await webhookStripeService(data);
    return ResponseHelper.success(response);
  } catch (error) {
    return ResponseHelper.handleError(error);
  }
};
