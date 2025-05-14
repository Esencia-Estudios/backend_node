import models from "../models/index.js";

const { PaymentModel } = models;

/**
 * Obtener pago por su ID
 * @param {number} id - ID del pago
 * @returns {Promise<PaymentModel|null>}
 */
export const getPaymentById = async (id) => {
    return await PaymentModel.findByPk(id, {
        where: { is_active: true },
    });
};

/**
 * Crear un nuevo pago
 * @param {object} paymentData - Datos del nuevo pago
 * @returns {Promise<PaymentModel>}
 */
export const createPayment = async (paymentData) => {
    const newPayment = await PaymentModel.create(paymentData);
    return await getPaymentById(newPayment.id);
};

/**
 * Obtener todos los pagos activos
 * @returns {Promise<Array<PaymentModel>>}
 */
export const getAllPayments = async () => {
    return await PaymentModel.findAll({
        where: { is_active: true },
    });
};

/**
 * Actualizar un pago existente
 * @param {number} id - ID del pago
 * @param {object} updateData - Datos a actualizar
 * @returns {Promise<PaymentModel|null>}
 */
export const updatePayment = async (id, updateData) => {
    const payment = await PaymentModel.findByPk(id, {
        where: { is_active: true },
    });
    if (!payment) return null;
    await payment.update(updateData);
    return payment;
};

/**
 * Eliminar (desactivar) un pago
 * @param {number} id - ID del pago
 * @returns {Promise<PaymentModel>}
 * @throws {Error} Si no se encuentra el pago
 */
export const deletePayment = async (id) => {
    const payment = await PaymentModel.findByPk(id, {
        where: { is_active: true },
    });
    if (!payment) throw new Error("Payment not found");

    payment.is_active = false;
    await payment.save();

    return payment;
};
