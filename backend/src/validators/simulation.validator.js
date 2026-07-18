const ApiError = require("../utils/ApiError");

const requiredFields = [
  "startupName",
  "idea",
  "industry",
  "targetAudience",
  "businessModel",
  "pricing",
  "problemStatement",
  "uniqueSellingProposition",
];

const validateSimulationInput = (body) => {
  const errors = [];

  requiredFields.forEach((field) => {
    if (!body[field] || !String(body[field]).trim()) {
      errors.push(`${field} is required`);
    }
  });

  if (errors.length > 0) {
    throw new ApiError(400, "Validation failed", errors);
  }
};

module.exports = { validateSimulationInput };