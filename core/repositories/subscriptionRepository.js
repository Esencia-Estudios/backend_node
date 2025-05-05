import models from "../models/index.js";

const { SubscriptionModel } = models;

// Obtener suscripción por ID
export const getSubscriptionById = async (id) => {
    return await SubscriptionModel.findByPk(id, {
        where: { isActive: true },
    });
};

// Crear una nueva suscripción
export const createSubscription = async (subscriptionData) => {
    const newSubscription = await SubscriptionModel.create(subscriptionData);
    return await getSubscriptionById(newSubscription.id);
};

// Obtener todas las suscripciones
export const getAllSubscriptions = async () => {
    return await SubscriptionModel.findAll();
};

// Actualizar una suscripción
export const updateSubscription = async (id, updateData) => {
    const subscription = await SubscriptionModel.findByPk(id, {
        where: { isActive: true },
    });
    if (!subscription) return null;
    await subscription.update(updateData);
    return subscription;
};

// Eliminar una suscripción
export const deleteSubscription = async (id) => {
    const subscription = await SubscriptionModel.findByPk(id, {
        where: { isActive: true },
    });
    if (!subscription) throw new Error("Subscription not found");

    subscription.isActive = 0;
    await subscription.save();

    return subscription;
};