class CustomError extends Error {
    constructor(
        statusCode = 500,
        message = "somrthing went wrong",
        error = [],
        authorized = true
    ) {
        super();
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
        this.success = false;
        this.authorized = authorized;
    }
}

export { CustomError };
