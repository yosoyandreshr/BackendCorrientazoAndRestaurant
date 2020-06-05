const ErrorHandlerMiddleware = module.exports;

ErrorHandlerMiddleware.MainHandler = (err, req, res, next) => {
  const logName = 'ErrorHandlerMiddleware.MainHandler';
  const logger = req.log || console;

  if (logger.error) {
    logger.error(logName, `Error with message ${err.message} and stack: ${err.stack}`);
  } else {
    logger(logName, `Error with message ${err.message} and stack: ${err.stack}`);
  }

  const { status = 500, message = 'Error', code = 500 } = err;

  res.status(status).send({ error: { message, code } });
  next();
};

ErrorHandlerMiddleware.BaseError = function BaseError(message, code, status, stack) {
  this.message = message;
  this.status = status || code;
  this.code = code;
  this.stack = stack || new Error().stack;
};

ErrorHandlerMiddleware.UnauthorizedError = function UnauthorizedError(message) {
  return new ErrorHandlerMiddleware.BaseError(message, 401, 401);
};

ErrorHandlerMiddleware.BadRequestError = function BadRequestError(message) {
  return new ErrorHandlerMiddleware.BaseError(message, 400, 400);
};

ErrorHandlerMiddleware.NotFound = function NotFound(message) {
  return new ErrorHandlerMiddleware.BaseError(message, 404, 404);
};
