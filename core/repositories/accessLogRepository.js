import models from "../models/index.js";

export class AccessLogRepository {
  constructor() {
    this.model = models?.AccessLogModel;
  }

  async getAccessLogs() {
    return await this.model.findAll();
  }
}
