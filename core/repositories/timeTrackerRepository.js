import { ValidationError } from '../helpers/errorHandler.js';
import { TimeTrackerModel } from '../models/index.js';

class TimeTrackerRepository {
    constructor() {
        this.model = TimeTrackerModel;
    }

    /**
     * Obtiene un registro de seguimiento de tiempo por ID
     * @param {number} id - ID del registro
     * @returns {Promise<Object|null>}
     */
    async getTimeTrackerById(id) {
        try {
            const timeTracker = await this.model.findOne({
                where: { id, active: true },
                raw: true
            });

            if (!timeTracker) throw new ValidationError("Time Tracker not found or inactive");

            return timeTracker;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Obtiene un registro de seguimiento de tiempo por ID user
     * @param {number} user_id - ID del usuario
     * @returns {Promise<Object|null>}
     */
    async getTimeTrackerByIdUser(user_id) {
        try {
            const timeTrackerByUser = await this.model.findAll({
                where: { user_id, active: true },
                raw: true
            });

            if (!timeTrackerByUser) throw new ValidationError("Time Tracker by User not found or inactive");

            return timeTrackerByUser;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Obtiene todos los registros de seguimiento de tiempo
     * @returns {Promise<Array>}
     */
    async getTimeTrackers() {
        try {
            return await this.model.findAll({
                where: { active: true },
                raw: true
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Crea un nuevo registro de seguimiento de tiempo
     * @param {Object} timeTrackerData - Datos del registro
     * @returns {Promise<Object>}
     */
    async createTimeTracker(timeTrackerData) {
        try {
            return await this.model.create(timeTrackerData);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Actualiza un registro de seguimiento de tiempo por ID
     * @param {number} id - ID del registro
     * @param {Object} timeTrackerData - Datos a actualizar
     * @returns {Promise<Object|null>}
     */
    async updateTimeTracker(id, timeTrackerData) {
        try {
            const timeTracker = await this.model.findByPk(id);
            if (!timeTracker) throw new ValidationError("Time Tracker not found");

            return await timeTracker.update(timeTrackerData);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Elimina (desactiva) un registro de seguimiento de tiempo por ID
     * @param {number} id - ID del registro
     * @returns {Promise<Object|null>}
     */
    async deactivateTimeTracker(id) {
        try {
            const timeTracker = await this.model.findByPk(id);
            if (!timeTracker) throw new ValidationError("Time Tracker not found");

            return await timeTracker.update({ active: false });
        } catch (error) {
            throw error;
        }
    }
}

export { TimeTrackerRepository };
