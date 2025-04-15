import { ValidationError } from '../helpers/errorHandler.js';
import { ApplicationModel } from '../models/index.js';

class ApplicationRepository {
    constructor() {
        this.model = ApplicationModel;
    }

    async getApplicationById(id) {
        try {
            return await this.model.findOne({
                where: {
                    id,
                    isActive: 1
                },
                raw: true
            });
        } catch (e) {
            throw e;
        }
    }

    async getApplications() {
        try {
            return await this.model.findAll({
                where: { isActive: 1 },
                raw: true
            });
        } catch (error) {
            throw error;
        }
    }

    async createApplication(applicationData) {
        try {

            const existing = await this.model.findOne({
                where: {
                    name: applicationData?.name,
                    isActive: 1
                },
                raw: true
            });

            if (existing?.id) throw new ValidationError('Application exists already')

            return await this.model.create(applicationData);
        } catch (error) {
            throw error;
        }
    }

    async updateApplication(id, applicationData) {
        try {
            const application = await this.model.findByPk(id);
            if (!application) throw new ValidationError("Application not found");
            return await application.update(applicationData);
        } catch (error) {
            throw error;
        }
    }

    async deactivateApplication(id) {
        try {
            const application = await this.model.findByPk(id);
            if (!application) throw new ValidationError("Application not found");
            application.isActive = 0;
            return await application.save();
        } catch (error) {
            throw error;
        }
    }
}

export { ApplicationRepository };