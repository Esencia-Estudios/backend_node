import { ValidationError } from "../helpers/errorHandler.js";
import models from "../models/index.js";

class TimeTrackerRepository {
  constructor() {
    this.model = models?.TimeTrackerModel;
  }

  /**
   * Obtiene un registro de seguimiento de tiempo por ID
   * @param {number} id - ID del registro
   * @returns {Promise<Object|null>}
   */
  async getTimeTrackerById(id) {
    const timeTracker = await this.model.findOne({
      where: { id, isActive: true },
      raw: true,
    });

    if (!timeTracker)
      throw new ValidationError("Time Tracker not found or inactive");

    return timeTracker;
  }

  /**
   * Obtiene un registro de seguimiento de tiempo por ID user
   * @param {number} user_id - ID del usuario
   * @returns {Promise<Object|null>}
   */
  async getTimeTrackerByIdUser(user_id) {
    const timeTrackerByUser = await this.model.findAll({
      where: { user_id, isActive: true },
      raw: true,
    });

    if (!timeTrackerByUser)
      throw new ValidationError("Time Tracker by User not found or inactive");

    return timeTrackerByUser;
  }

  /**
   * Obtiene todos los registros de seguimiento de tiempo
   * @returns {Promise<Array>}
   */
  async getTimeTrackers() {
    return await this.model.findAll({
      where: { isActive: true },
      raw: true,
    });
  }

  /**
   * Crea un nuevo registro de seguimiento de tiempo
   * @param {Object} timeTrackerData - Datos del registro
   * @returns {Promise<Object>}
   */
  async createTimeTracker(timeTrackerData) {
    return await this.model.create(timeTrackerData);
  }

  /**
   * Actualiza un registro de seguimiento de tiempo por ID
   * @param {number} id - ID del registro
   * @param {Object} timeTrackerData - Datos a actualizar
   * @returns {Promise<Object|null>}
   */
  async updateTimeTracker(id, timeTrackerData) {
    const timeTracker = await this.model.findByPk(id);
    if (!timeTracker) throw new ValidationError("Time Tracker not found");

    return await timeTracker.update(timeTrackerData);
  }

  /**
   * Elimina (desactiva) un registro de seguimiento de tiempo por ID
   * @param {number} id - ID del registro
   * @returns {Promise<Object|null>}
   */
  async deactivateTimeTracker(id) {
    const timeTracker = await this.model.findByPk(id);
    if (!timeTracker) throw new ValidationError("Time Tracker not found");

    return await timeTracker.update({ isActive: false });
  }
}

export { TimeTrackerRepository };
