class NotFoundError extends Error {
    statusCode: number;
    constructor(message = 'Resource not found') {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = 404;
    }
}

class ValidationError extends Error {
    statusCode: number;
    constructor(message = 'Invalid data') {
        super(message);
        this.name = 'ValidationError';
        this.statusCode = 400;
    }
}

export { NotFoundError, ValidationError };