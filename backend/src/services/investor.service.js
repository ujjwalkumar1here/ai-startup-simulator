const InvestorSession = require("../models/investorSession.model");
const Simulation = require("../models/simulation.model");
const ApiError = require("../utils/ApiError");
const { generateContent } = require("./gemini.service");
const { extractJson } = require("../utils/aiJsonParser");
const {
  buildInvestorQuestionsPrompt,
  buildAnswerEvaluationPrompt,
  buildFinalReportPrompt,
} = require("../prompts/investor.prompt");

const TOTAL_QUESTIONS = 10;

const getOwnedSimulation = async (userId, simulationId) => {
  const simulation = await Simulation.findOne({ _id: simulationId, user: userId });

  if (!simulation) {
    throw new ApiError(404, "Simulation not found");
  }

  return simulation;
};

const getOwnedSession = async (userId, sessionId) => {
  const session = await InvestorSession.findOne({ _id: sessionId, user: userId });

  if (!session) {
    throw new ApiError(404, "Investor session not found");
  }

  return session;
};

const validateQuestionsResponse = (questions) => {
  if (!Array.isArray(questions) || questions.length !== TOTAL_QUESTIONS) {
    throw new ApiError(502, "AI did not return exactly 10 questions");
  }

  questions.forEach((q) => {
    if (typeof q.questionNumber !== "number" || !q.category || !q.question) {
      throw new ApiError(502, "AI returned malformed question data");
    }
  });
};

const validateEvaluationResponse = (evaluation) => {
  const requiredKeys = ["score", "strengths", "weaknesses", "improvements", "investorComment"];

  requiredKeys.forEach((key) => {
    if (evaluation[key] === undefined || evaluation[key] === null) {
      throw new ApiError(502, `AI evaluation missing required field: ${key}`);
    }
  });

  if (typeof evaluation.score !== "number") {
    throw new ApiError(502, "AI evaluation score must be a number");
  }

  ["strengths", "weaknesses", "improvements"].forEach((key) => {
    if (!Array.isArray(evaluation[key])) {
      throw new ApiError(502, `AI evaluation ${key} must be an array`);
    }
  });
};

const validateFinalReport = (report) => {
  const requiredKeys = [
    "overallScore",
    "decision",
    "majorRisks",
    "strongPoints",
    "weakPoints",
    "suggestions",
    "probabilityOfFunding",
  ];

  requiredKeys.forEach((key) => {
    if (report[key] === undefined || report[key] === null) {
      throw new ApiError(502, `AI final report missing required field: ${key}`);
    }
  });

  if (typeof report.overallScore !== "number") {
    throw new ApiError(502, "AI final report overallScore must be a number");
  }

  ["majorRisks", "strongPoints", "weakPoints", "suggestions"].forEach((key) => {
    if (!Array.isArray(report[key])) {
      throw new ApiError(502, `AI final report ${key} must be an array`);
    }
  });
};

const startInvestorSession = async (userId, simulationId) => {
  const simulation = await getOwnedSimulation(userId, simulationId);

  const prompt = buildInvestorQuestionsPrompt(simulation);
  const rawResponse = await generateContent(prompt);
  const parsed = extractJson(rawResponse);

  const questions = Array.isArray(parsed) ? parsed : parsed.questions;
  validateQuestionsResponse(questions);

  const session = await InvestorSession.create({
    user: userId,
    simulation: simulation._id,
    questions,
    answers: [],
    status: "in-progress",
  });

  return session;
};

const submitAnswer = async (userId, { sessionId, questionNumber, answer }) => {
  const session = await getOwnedSession(userId, sessionId);

  if (session.status === "completed") {
    throw new ApiError(400, "Investor session already completed");
  }

  const alreadyAnswered = session.answers.some((a) => a.questionNumber === questionNumber);
  if (alreadyAnswered) {
    throw new ApiError(400, "This question has already been answered");
  }

  const expectedQuestionNumber = session.answers.length + 1;
  if (questionNumber !== expectedQuestionNumber) {
    throw new ApiError(400, `Expected answer for question ${expectedQuestionNumber}`);
  }

  const question = session.questions.find((q) => q.questionNumber === questionNumber);
  if (!question) {
    throw new ApiError(404, "Question not found in this session");
  }

  const simulation = await Simulation.findById(session.simulation);
  if (!simulation) {
    throw new ApiError(404, "Associated simulation not found");
  }

  const evaluationPrompt = buildAnswerEvaluationPrompt({
    simulation,
    question: question.question,
    answer,
  });

  const rawEvaluation = await generateContent(evaluationPrompt);
  const evaluation = extractJson(rawEvaluation);
  validateEvaluationResponse(evaluation);

  session.answers.push({
    questionNumber,
    answer,
    score: evaluation.score,
    strengths: evaluation.strengths,
    weaknesses: evaluation.weaknesses,
    improvements: evaluation.improvements,
    investorComment: evaluation.investorComment,
  });

  let finalReport = null;
  let nextQuestion = null;

  if (session.answers.length === TOTAL_QUESTIONS) {
    const reportPrompt = buildFinalReportPrompt({
      simulation,
      questions: session.questions,
      answers: session.answers,
    });

    const rawReport = await generateContent(reportPrompt);
    finalReport = extractJson(rawReport);
    validateFinalReport(finalReport);

    session.feedback = finalReport;
    session.overallScore = finalReport.overallScore;
    session.decision = finalReport.decision;
    session.status = "completed";
  } else {
    nextQuestion = session.questions.find((q) => q.questionNumber === questionNumber + 1);
  }

  await session.save();

  return {
    feedback: evaluation,
    score: evaluation.score,
    nextQuestion,
    sessionCompleted: session.status === "completed",
    finalReport,
  };
};

const getSessionById = async (userId, sessionId) => {
  return getOwnedSession(userId, sessionId);
};

const getUserHistory = async (userId) => {
  return InvestorSession.find({ user: userId })
    .populate("simulation", "startupName industry")
    .sort({ createdAt: -1 });
};

module.exports = {
  startInvestorSession,
  submitAnswer,
  getSessionById,
  getUserHistory,
};
