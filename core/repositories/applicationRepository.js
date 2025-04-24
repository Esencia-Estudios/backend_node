import { ValidationError } from "../helpers/errorHandler.js";
import models from "../models/index.js";

class ApplicationRepository {
  constructor() {
    this.model = models?.ApplicationModel;
  }

  async getApplicationById(id) {
    return await this.model.findOne({
      where: {
        id,
        isActive: 1,
      },
      raw: true,
    });
  }

  async getApplications() {
    return await this.model.findAll({
      where: { isActive: 1 },
      raw: true,
    });
  }

  async createApplication(applicationData) {
    const existing = await this.model.findOne({
      where: {
        name: applicationData?.name,
        isActive: 1,
      },
      raw: true,
    });

    if (existing?.id) throw new ValidationError("Application exists already");

    return await this.model.create(applicationData);
  }

  async updateApplication(id, applicationData) {
    const application = await this.model.findByPk(id);
    if (!application) throw new ValidationError("Application not found");
    return await application.update(applicationData);
  }

  async deactivateApplication(id) {
    const application = await this.model.findByPk(id);
    if (!application) throw new ValidationError("Application not found");
    application.isActive = 0;
    return await application.save();
  }
}

export { ApplicationRepository };
