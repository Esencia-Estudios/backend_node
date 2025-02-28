import {
  getAccessLogService
} from "../services/accessLogService.js";
import { ResponseHelper } from "../helpers/response.js";

export const getAccessLogs = async (event) => {
  try {
    const logs = await getAccessLogService();
    return ResponseHelper.success(logs);
  } catch (error) {
    return ResponseHelper.handleError(error);
  }
};