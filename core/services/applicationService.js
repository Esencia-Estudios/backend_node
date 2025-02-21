import { NotFoundError } from '../helpers/errorHandler.js';
import { ApplicationRepository } from '../repositories/applicationRepository.js'

const getApplicationService = async (id) => {
    try {
        const Repository = new ApplicationRepository();
        const application =  await Repository.model.findByPk(id);

        if (!application) {
            throw new NotFoundError('Application not found');
        }

        return application;
    } catch (error) {
        throw error;
    }
}

export { getApplicationService }