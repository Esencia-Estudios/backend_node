import { ApplicationModel } from '../models/index.js';

class ApplicationRepository {
    constructor() {
        this.model = ApplicationModel;
    }
}

export { ApplicationRepository };