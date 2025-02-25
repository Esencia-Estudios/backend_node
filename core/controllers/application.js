import { getApplicationsService, getApplicationService } from '../services/applicationService.js';
import { ResponseHelper } from '../helpers/response.js'

const getApplications = async (event) => {
    try {
        const applications = await getApplicationsService();
        return applications
    } catch (error) {
        return ResponseHelper.handleError(error)
    }
}

const getApplication = async (event) => {
    try {
        const id = event?.pathParameters?.id;
        const application = await getApplicationService(id);
        return application
    } catch (error) {
        return ResponseHelper.handleError(error)
    }
}

export { getApplications, getApplication };