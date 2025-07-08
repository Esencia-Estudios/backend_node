class ResponseHelper {
    private static _createResponse(
        statusCode: number,
        status: 'success' | 'error',
        message: string,
        data: unknown = null,
        error: unknown = null
    ) {
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

    static success<T>(data: T, message: string = 'Success') {
        return this._createResponse(200, 'success', message, data);
    }

    static created<T>(data: T, message: string = 'Resource created successfully') {
        return this._createResponse(201, 'success', message, data);
    }

    static badRequest(error: unknown, message: string = 'Bad Request') {
        return this._createResponse(400, 'error', message, null, error);
    }

    static unauthorized(message: string = 'Unauthorized') {
        return this._createResponse(401, 'error', message);
    }

    static forbidden(message: string = 'Forbidden') {
        return this._createResponse(403, 'error', message);
    }

    static notFound(message: string = 'Resource not found') {
        return this._createResponse(404, 'error', message);
    }

    static internalServerError(error: unknown, message: string = 'Internal Server Error') {
        return this._createResponse(500, 'error', message, null, error);
    }

    static handleError(error: any) {
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
                return this.internalServerError(error, error.message || 'Unexpected error');
        }
    }
}

export { ResponseHelper };
