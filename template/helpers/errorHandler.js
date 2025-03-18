class NotFoundError extends Error {
    constructor(message = 'Resource not found') {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = 404;
    }
}

class ValidationError extends Error {
    constructor(message = 'Invalid data') {
        super(message);
        this.name = 'ValidationError';
        this.statusCode = 400;
    }
}

export { NotFoundError, ValidationError };