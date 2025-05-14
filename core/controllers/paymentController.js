import {
    getAllPaymentsService,
    getPaymentByIdService,
    createPaymentService,
    updatePaymentService,
    deletePaymentService,
} from "../services/paymentService.js";
import { authMiddleware } from "../middleware/validateBasicAuth.js";
import { ResponseHelper } from "../helpers/response.js";

/**
 * Obtener todos los pagos
 */
export const getPayments = async (event) => {
    const authError = authMiddleware(event);
    if (authError) return authError;

    try {
        const payments = await getAllPaymentsService();
        return ResponseHelper.success(payments);
    } catch (error) {
        return ResponseHelper.handleError(error);
    }
};

/**
 * Obtener pago por ID
 */
export const getPaymentById = async (event) => {
    const authError = authMiddleware(event);
    if (authError) return authError;

    try {
        const { id } = event.pathParameters;
        const payment = await getPaymentByIdService(id);
        return ResponseHelper.success(payment);
    } catch (error) {
        return ResponseHelper.handleError(error);
    }
};

/**
 * Crear nuevo pago
 */
export const createPayment = async (event) => {
    const authError = authMiddleware(event);
    if (authError) return authError;

    try {
        const data = JSON.parse(event.body);
        const newPayment = await createPaymentService(data);
        return ResponseHelper.success(newPayment);
    } catch (error) {
        return ResponseHelper.handleError(error);
    }
};

/**
 * Actualizar pago
 */
export const updatePayment = async (event) => {
    const authError = authMiddleware(event);
    if (authError) return authError;

    try {
        const { id } = event.pathParameters;
        const data = JSON.parse(event.body);
        const updatedPayment = await updatePaymentService(id, data);
        return ResponseHelper.success(updatedPayment);
    } catch (error) {
        return ResponseHelper.handleError(error);
    }
};

/**
 * Eliminar pago
 */
export const deletePayment = async (event) => {
    const authError = authMiddleware(event);
    if (authError) return authError;

    try {
        const { id } = event.pathParameters;
        const result = await deletePaymentService(id);
        return ResponseHelper.success(result);
    } catch (error) {
        return ResponseHelper.handleError(error);
    }
};
