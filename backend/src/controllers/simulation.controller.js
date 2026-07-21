const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const mongoose = require("mongoose");
const { validateSimulationInput } = require("../validators/simulation.validator");
const {
  runSimulation,
  getUserSimulations,
  getSimulationById,
  deleteSimulationById,
} = require("../services/simulation.service");

const createSimulation = asyncHandler(async (req, res) => {
  const {
    startupName,
    idea,
    industry,
    targetAudience,
    businessModel,
    pricing,
    problemStatement,
    uniqueSellingProposition,
  } = req.body;

  validateSimulationInput(req.body);

  const simulation = await runSimulation(req.user._id, {
    startupName,
    idea,
    industry,
    targetAudience,
    businessModel,
    pricing,
    problemStatement,
    uniqueSellingProposition,
  });

  res
    .status(201)
    .json(new ApiResponse(201, simulation, "Simulation completed successfully"));
});

const listSimulations = asyncHandler(async (req, res) => {
  const simulations = await getUserSimulations(req.user._id);

  res
    .status(200)
    .json(new ApiResponse(200, simulations, "Simulations fetched successfully"));
});

const getSimulation = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid simulation id");
  }

  const simulation = await getSimulationById(req.user._id, id);

  res
    .status(200)
    .json(new ApiResponse(200, simulation, "Simulation fetched successfully"));
});

const deleteSimulation = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid simulation id");
  }

  await deleteSimulationById(req.user._id, id);

  res
    .status(200)
    .json(new ApiResponse(200, null, "Simulation deleted successfully"));
});

module.exports = {
  createSimulation,
  listSimulations,
  getSimulation,
  deleteSimulation,
};