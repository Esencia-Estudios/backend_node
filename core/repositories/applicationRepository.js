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
                    status: 'active'
                },
                raw: true
            });
        }catch (e) {
            throw new Error('Error fetching application from database: ', e);
        }
    }

    async getApplications() {
        try {
            return await this.model.findAll({
                where: { status: 'active' },
                raw: true
            });
        } catch (error) {
            throw new Error('Error fetching applications from database: ', error);
        }
    }

    async createApplication(applicationData) {
        try {
            return await this.model.create(applicationData);
        } catch (error) {
            throw new Error('Error creating application: ', error);
        }
    }

    async updateApplication(id, applicationData) {
        try {
            const application = await this.model.findByPk(id);
            if (!application) throw new Error("Application not found");
            return await application.update(applicationData);
        } catch (error) {
            throw new Error("Error updating application: ", error);
        }
    }

    async deactivateApplication(id) {
        try {
            const application = await this.model.findByPk(id);
            if (!application) throw new Error("Application not found");
            application.status = 'inactive';
            return await application.save();
        } catch (error) {
            throw new Error("Error deactivating application: ", error);
        }
    }
}

export { ApplicationRepository };