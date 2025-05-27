import models from "../models/index.js";

const { PaymentModel } = models;

export const getAllPayments = async () => {
  return await PaymentModel.findAll();
};

export const getPaymentById = async (id) => {
  return await PaymentModel.findByPk(id, {
    where: { is_active: true },
  });
};

export const createPayment = async (paymentData) => {
  const payment = await PaymentModel.create(paymentData);
  return payment;
};

export const updatePayment = async (id, updateData) => {
  const payment = await PaymentModel.findByPk(id, {
    where: { is_active: true },
  });
  if (!payment) return null;
  await payment.update(updateData);
  return payment;
};

export const inactivePayment = async (id) => {
  const payment = await PaymentModel.findByPk(id, {
    where: { is_active: true },
  });
  if (!payment) throw new Error("Payment not found");

  payment.is_active = 0;
  await payment.save();

  return payment;
};
