const mongoose = require("mongoose");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const { validateStartInput, validateAnswerInput } = require("../validators/investor.validator");
const {
  startInvestorSession,
  submitAnswer,
  getSessionById,
  getUserHistory,
} = require("../services/investor.service");

const startSession = asyncHandler(async (req, res) => {
  const { simulationId } = req.body;

  validateStartInput({ simulationId });

  const session = await startInvestorSession(req.user._id, simulationId);

  res.status(201).json(
    new ApiResponse(
      201,
      {
        sessionId: session._id,
        questions: session.questions,
      },
      "Investor session started successfully"
    )
  );
});

const answerQuestion = asyncHandler(async (req, res) => {
  const { sessionId, questionNumber, answer } = req.body;

  validateAnswerInput({ sessionId, questionNumber, answer });

  const result = await submitAnswer(req.user._id, {
    sessionId,
    questionNumber,
    answer,
  });

  res
    .status(200)
    .json(new ApiResponse(200, result, "Answer evaluated successfully"));
});

const getSession = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid session id");
  }

  const session = await getSessionById(req.user._id, id);

  res
    .status(200)
    .json(new ApiResponse(200, session, "Investor session fetched successfully"));
});

const getHistory = asyncHandler(async (req, res) => {
  const sessions = await getUserHistory(req.user._id);

  res
    .status(200)
    .json(new ApiResponse(200, sessions, "Investor history fetched successfully"));
});

module.exports = { startSession, answerQuestion, getSession, getHistory };