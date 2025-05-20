import { NotFoundError } from "../helpers/errorHandler.js";
import { TimeTrackerRepository } from "../repositories/timeTrackerRepository.js";

const Repository = new TimeTrackerRepository();

const getTimeTrackersService = async () => {
  try {
    const timeTrackers = await Repository.getTimeTrackers();
    return timeTrackers;
  } catch (error) {
    throw error;
  }
};

const getTimeTrackerService = async (id) => {
  try {
    const timeTracker = await Repository.getTimeTrackerById(id);

    if (!timeTracker) {
      throw new NotFoundError("Time Tracker not found");
    }

    return timeTracker;
  } catch (error) {
    throw error;
  }
};

const getTimeTrackerServiceByUser = async (user_id) => {
  try {
    const timeTrackerByUser = await Repository.getTimeTrackerByIdUser(user_id);

    if (!timeTrackerByUser) {
      throw new NotFoundError("Time Tracker By User not found");
    }

    return timeTrackerByUser;
  } catch (error) {
    throw error;
  }
};

const createTimeTrackerService = async (timeTrackerData) => {
  try {
    const createdTimeTracker = await Repository.createTimeTracker(
      timeTrackerData
    );
    return createdTimeTracker;
  } catch (error) {
    throw error;
  }
};

const updateTimeTrackerService = async (id, timeTrackerData) => {
  try {
    const updatedTimeTracker = await Repository.updateTimeTracker(
      id,
      timeTrackerData
    );
    return updatedTimeTracker;
  } catch (error) {
    throw error;
  }
};

const deactivateTimeTrackerService = async (id) => {
  try {
    const deactivatedTimeTracker = await Repository.deactivateTimeTracker(id);
    return deactivatedTimeTracker;
  } catch (error) {
    throw error;
  }
};

export {
  getTimeTrackerService,
  getTimeTrackersService,
  createTimeTrackerService,
  updateTimeTrackerService,
  deactivateTimeTrackerService,
  getTimeTrackerServiceByUser,
};
