const mongoose = require("mongoose");
const ApiError = require("../utils/ApiError");

const validateStartInput = ({ simulationId }) => {
  const errors = [];

  if (!simulationId) {
    errors.push("simulationId is required");
  } else if (!mongoose.Types.ObjectId.isValid(simulationId)) {
    errors.push("simulationId is invalid");
  }

  if (errors.length > 0) {
    throw new ApiError(400, "Validation failed", errors);
  }
};

const validateAnswerInput = ({ sessionId, questionNumber, answer }) => {
  const errors = [];

  if (!sessionId) {
    errors.push("sessionId is required");
  } else if (!mongoose.Types.ObjectId.isValid(sessionId)) {
    errors.push("sessionId is invalid");
  }

  if (questionNumber === undefined || questionNumber === null) {
    errors.push("questionNumber is required");
  } else if (
    typeof questionNumber !== "number" ||
    questionNumber < 1 ||
    questionNumber > 10
  ) {
    errors.push("questionNumber must be a number between 1 and 10");
  }

  if (!answer || !String(answer).trim()) {
    errors.push("answer is required");
  }

  if (errors.length > 0) {
    throw new ApiError(400, "Validation failed", errors);
  }
};

module.exports = { validateStartInput, validateAnswerInput };