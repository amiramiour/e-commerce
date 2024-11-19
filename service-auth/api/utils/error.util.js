class AppError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
    }
}

const errorHandler = (err, res) => {
    const { statusCode, message } = err;
    res.status(statusCode || 500).json({
        status: 'error',
        statusCode: statusCode || 500,
        message: message || 'Une erreur est survenue sur le serveur.'
    });
};

module.exports = { AppError, errorHandler };
