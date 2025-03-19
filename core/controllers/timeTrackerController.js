import {
  getTimeTrackersService,
  getTimeTrackerService,
  createTimeTrackerService,
  updateTimeTrackerService,
  deactivateTimeTrackerService
} from "../services/timeTrackerService.js";
import { ResponseHelper } from "../helpers/response.js";
import { ValidationError } from "../helpers/errorHandler.js";

const getTimeTrackers = async (event) => {
  try {
    const timeTrackers = await getTimeTrackersService();
    return ResponseHelper.success(timeTrackers);
  } catch (error) {
    return ResponseHelper.handleError(error);
  }
};

const getTimeTracker = async (event) => {
  try {
    const id = event?.pathParameters?.id;
    if (!id) throw new ValidationError("Params id is required");

    const timeTracker = await getTimeTrackerService(id);
    return ResponseHelper.success(timeTracker);
  } catch (error) {
    return ResponseHelper.handleError(error);
  }
};

const createTimeTracker = async (event) => {
  try {
    const payload = JSON.parse(event.body);
    const timeTracker = await createTimeTrackerService(payload);
    return ResponseHelper.success(timeTracker);
  } catch (error) {
    return ResponseHelper.handleError(error);
  }
};

const updateTimeTracker = async (event) => {
  try {
    const timeTrackerId = event.pathParameters?.id;
    if (!timeTrackerId) throw new ValidationError("Params id is required");

    const payload = JSON.parse(event.body);
    const timeTracker = await updateTimeTrackerService(timeTrackerId, payload);
    return ResponseHelper.success(timeTracker);
  } catch (error) {
    return ResponseHelper.handleError(error);
  }
};

const deactivateTimeTracker = async (event) => {
  try {
    const timeTrackerId = event.pathParameters?.id;
    if (!timeTrackerId) throw new ValidationError("Params id is required");

    const timeTracker = await deactivateTimeTrackerService(timeTrackerId);
    return ResponseHelper.success(timeTracker);
  } catch (error) {
    return ResponseHelper.handleError(error);
  }
};

export {
  getTimeTrackers,
  getTimeTracker,
  createTimeTracker,
  updateTimeTracker,
  deactivateTimeTracker
};
