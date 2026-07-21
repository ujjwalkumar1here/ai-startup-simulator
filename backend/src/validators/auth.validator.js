const validator = require("validator");
const ApiError = require("../utils/ApiError");

const validateRegisterInput = ({ name, email, password }) => {
  const errors = [];

  if (!name || !name.trim()) errors.push("Name is required");
  if (!email || !email.trim()) errors.push("Email is required");
  if (email && !validator.isEmail(email)) errors.push("Invalid email address");
  if (!password) errors.push("Password is required");
  if (password && password.length < 8)
    errors.push("Password must be at least 8 characters");

  if (errors.length > 0) {
    throw new ApiError(400, "Validation failed", errors);
  }
};

const validateLoginInput = ({ email, password }) => {
  const errors = [];

  if (!email || !email.trim()) errors.push("Email is required");
  if (email && !validator.isEmail(email)) errors.push("Invalid email address");
  if (!password) errors.push("Password is required");

  if (errors.length > 0) {
    throw new ApiError(400, "Validation failed", errors);
  }
};

module.exports = { validateRegisterInput, validateLoginInput };
