class ResponseHelper {
    static _createResponse(statusCode, status, message, data = null, error = null) {
        const body = {
            status,
            message,
            data,
            error: error || false,
        };

        return {
            statusCode,
            body: JSON.stringify(body),
        };
    }

    static success(data, message = 'Success') {
        return this._createResponse(200, 'success', message, data);
    }

    static created(data, message = 'Resource created successfully') {
        return this._createResponse(201, 'success', message, data);
    }

    static badRequest(error, message = 'Bad Request') {
        return this._createResponse(400, 'error', message, null, error);
    }

    static unauthorized(message = 'Unauthorized') {
        return this._createResponse(401, 'error', message);
    }

    static forbidden(message = 'Forbidden') {
        return this._createResponse(403, 'error', message);
    }

    static notFound(message = 'Resource not found') {
        return this._createResponse(404, 'error', message);
    }

    static internalServerError(error, message = 'Internal Server Error') {
        return this._createResponse(500, 'error', message, null, error);
    }

    static handleError(error) {
        switch (error.name) {
            case 'NotFoundError':
                return this.notFound(error.message);
            case 'ValidationError':
                return this.badRequest(error, error.message);
            case 'UnauthorizedError':
                return this.unauthorized(error.message);
            case 'ForbiddenError':
                return this.forbidden(error.message);
            default:
                return this.internalServerError(error.message || 'Unexpected error', error.message);
        }
    }
}

export { ResponseHelper };