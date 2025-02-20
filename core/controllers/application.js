import { getApplicationService } from '../services/applicationService.js';
import { ResponseHelper } from '../helpers/response.js'

const getApplication = async (event) => {
    try {
        const id = event?.pathParameters?.id;
        const application = await getApplicationService(id);
        return application
    } catch (error) {
        return ResponseHelper.handleError(error)
    }
}

export { getApplication };