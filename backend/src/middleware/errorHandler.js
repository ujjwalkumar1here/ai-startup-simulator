const env = require("../config/env");

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode && err.statusCode >= 100 ? err.statusCode : 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors || [],
    stack: env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

module.exports = errorHandler;