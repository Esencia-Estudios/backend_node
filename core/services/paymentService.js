import * as PaymentRepository from "../repositories/paymentRepository.js";
import { NotFoundError } from "../helpers/errorHandler.js";

/**
 * Obtener pago por ID
 * @param {number} id - ID del pago
 * @returns {Promise<object>}
 * @throws {NotFoundError} Si no se encuentra el pago
 */
export const getPaymentByIdService = async (id) => {
    const payment = await PaymentRepository.getPaymentById(id);
    if (!payment) {
        throw new NotFoundError(`Payment with ID ${id} not found`);
    }
    return payment;
};

/**
 * Crear un nuevo pago
 * @param {object} data - Datos del pago
 * @returns {Promise<object>}
 */
export const createPaymentService = async (data) => {
    const newPayment = await PaymentRepository.createPayment(data);
    return newPayment;
};

/**
 * Actualizar pago
 * @param {number} id - ID del pago
 * @param {object} data - Datos a actualizar
 * @returns {Promise<object>}
 * @throws {NotFoundError} Si no se encuentra el pago
 */
export const updatePaymentService = async (id, data) => {
    const updatedPayment = await PaymentRepository.updatePayment(id, data);
    if (!updatedPayment) {
        throw new NotFoundError(`Payment with ID ${id} not found`);
    }
    return updatedPayment;
};

/**
 * Eliminar (desactivar) un pago
 * @param {number} id - ID del pago
 * @returns {Promise<object>}
 * @throws {NotFoundError} Si no se encuentra el pago
 */
export const deletePaymentService = async (id) => {
    const deleted = await PaymentRepository.deletePayment(id);
    if (!deleted) {
        throw new NotFoundError(`Payment with ID ${id} not found`);
    }
    return { message: "Payment deleted successfully" };
};

/**
 * Obtener todos los pagos activos
 * @returns {Promise<Array<object>>}
 */
export const getAllPaymentsService = async () => {
    return await PaymentRepository.getAllPayments();
};
