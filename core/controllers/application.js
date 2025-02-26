import {
  getApplicationsService,
  getApplicationService,
  createApplicationService,
  updateApplicationService,
  deactivateApplicationService
} from "../services/applicationService.js";
import { validateApplicationSchema } from "../validations/applicationValidations.js";
import { ResponseHelper } from "../helpers/response.js";
import { ValidationError } from "../helpers/errorHandler.js";

const getApplications = async (event) => {
  try {
    const applications = await getApplicationsService();
    return ResponseHelper.success(applications);
  } catch (error) {
    return ResponseHelper.handleError(error);
  }
};

const getApplication = async (event) => {
  try {
    const id = event?.pathParameters?.id;
    const application = await getApplicationService(id);
    return ResponseHelper.success(application);
  } catch (error) {
    return ResponseHelper.handleError(error);
  }
};

const createApplication = async (event) => {
  try {
    const payload = JSON.parse(event.body);
    const validateData = await validateApplicationSchema(payload);
    const application = await createApplicationService(validateData);
    return ResponseHelper.success(application);
  } catch (error) {
    return ResponseHelper.handleError(error);
  }
};

const updateApplication = async (event) => {
  try {
    const applicationId = event.pathParameters?.id;
    if (!applicationId) throw ValidationError("Params id is required");

    const payload = JSON.parse(event.body);
    const validateData = await validateApplicationSchema(payload);
    const application = await updateApplicationService(
      applicationId,
      validateData
    );
    return ResponseHelper.success(application);
  } catch (error) {
    return ResponseHelper.handleError(error);
  }
};

const deactivateApplication = async (event) => {
  try {
    const applicationId = event.pathParameters?.id;
    if (!applicationId) throw ValidationError("Params id is required");

    const application = await deactivateApplicationService(applicationId);
    return ResponseHelper.success(application);
  } catch (error) {
    return ResponseHelper.handleError(error);
  }
};

export {
  getApplications,
  getApplication,
  createApplication,
  updateApplication,
  deactivateApplication
};
