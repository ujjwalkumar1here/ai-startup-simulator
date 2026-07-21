const Simulation = require("../models/simulation.model");
const ApiError = require("../utils/ApiError");
const { buildSimulationPrompt } = require("../prompts/simulation.prompt");
const { generateContent } = require("./gemini.service");
const { extractJson } = require("../utils/aiJsonParser");

const requiredAnalysisKeys = [
  "startupScore",
  "marketPotential",
  "revenuePrediction",
  "growthPrediction",
  "cashFlow",
  "strengths",
  "weaknesses",
  "risks",
  "recommendations",
];

const validateAnalysis = (analysis) => {
  requiredAnalysisKeys.forEach((key) => {
    if (analysis[key] === undefined || analysis[key] === null) {
      throw new ApiError(502, `AI response missing required field: ${key}`);
    }
  });

  if (typeof analysis.startupScore !== "number") {
    throw new ApiError(502, "AI response startupScore must be a number");
  }

  ["strengths", "weaknesses", "risks", "recommendations"].forEach((key) => {
    if (!Array.isArray(analysis[key])) {
      throw new ApiError(502, `AI response ${key} must be an array`);
    }
  });
};

const runSimulation = async (userId, payload) => {
  const prompt = buildSimulationPrompt(payload);
  const rawResponse = await generateContent(prompt);
  const analysis = extractJson(rawResponse);

  validateAnalysis(analysis);

  const simulation = await Simulation.create({
    user: userId,
    ...payload,
    analysis,
  });

  return simulation;
};

const getUserSimulations = async (userId) => {
  return Simulation.find({ user: userId }).sort({ createdAt: -1 });
};

const getSimulationById = async (userId, simulationId) => {
  const simulation = await Simulation.findOne({ _id: simulationId, user: userId });

  if (!simulation) {
    throw new ApiError(404, "Simulation not found");
  }

  return simulation;
};

const deleteSimulationById = async (userId, simulationId) => {
  const simulation = await Simulation.findOneAndDelete({ _id: simulationId, user: userId });

  if (!simulation) {
    throw new ApiError(404, "Simulation not found");
  }

  return simulation;
};

module.exports = {
  runSimulation,
  getUserSimulations,
  getSimulationById,
  deleteSimulationById,
};