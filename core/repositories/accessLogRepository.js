import { ValidationError } from '../helpers/errorHandler.js';
import { AccessLogModel } from '../models/index.js';

export class AccessLogRepository {
    constructor() {
        this.model = AccessLogModel;
    }

    async getAccessLogs() {
        try {
            return await this.model.findAll();
        } catch (error) {
            throw error;
        }
    }
}