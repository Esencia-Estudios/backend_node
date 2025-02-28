import { AccessLogRepository } from "../repositories/accessLogRepository.js";

const Repository = new AccessLogRepository();

export const getAccessLogService = async () => {
  try {
    const logs = await Repository.getAccessLogs();
    return logs;
  } catch (error) {
    throw error;
  }
};