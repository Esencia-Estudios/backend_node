import { NotFoundError } from "../helpers/errorHandler.js";
import { ApplicationRepository } from "../repositories/applicationRepository.js";

const Repository = new ApplicationRepository();

const getApplicationsService = async () => {
  try {
    const applications = await Repository.getApplications();
    return applications;
  } catch (error) {
    throw error;
  }
};

const getApplicationService = async (id) => {
  try {
    const application = await Repository.getApplicationById(id);

    if (!application) {
      throw new NotFoundError("Application not found");
    }

    return application;
  } catch (error) {
    throw error;
  }
};

const createApplicationService = async (applicationData) => {
  try {
    const createdApplication = await Repository.createApplication(
      applicationData
    );
    return createdApplication;
  } catch (error) {
    throw error;
  }
};

const updateApplicationService = async (id, applicationData) => {
  try {
    const createdApplication = await Repository.updateApplication(
      id,
      applicationData
    );
    return createdApplication;
  } catch (error) {
    throw error;
  }
};

const deactivateApplicationService = async (id) => {
  try {
    const deactivateApplication = await Repository.deactivateApplication(id);
    return deactivateApplication;
  } catch (error) {
    throw error;
  }
};

export {
  getApplicationService,
  getApplicationsService,
  createApplicationService,
  updateApplicationService,
  deactivateApplicationService,
};
