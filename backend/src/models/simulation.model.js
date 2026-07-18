const mongoose = require("mongoose");

const simulationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startupName: {
      type: String,
      required: true,
      trim: true,
    },
    idea: {
      type: String,
      required: true,
      trim: true,
    },
    industry: {
      type: String,
      required: true,
      trim: true,
    },
    targetAudience: {
      type: String,
      required: true,
      trim: true,
    },
    businessModel: {
      type: String,
      required: true,
      trim: true,
    },
    pricing: {
      type: String,
      required: true,
      trim: true,
    },
    problemStatement: {
      type: String,
      required: true,
      trim: true,
    },
    uniqueSellingProposition: {
      type: String,
      required: true,
      trim: true,
    },
    analysis: {
      startupScore: {
        type: Number,
        required: true,
      },
      marketPotential: {
        type: String,
        required: true,
      },
      revenuePrediction: {
        type: String,
        required: true,
      },
      growthPrediction: {
        type: String,
        required: true,
      },
      cashFlow: {
        type: String,
        required: true,
      },
      strengths: {
        type: [String],
        default: [],
      },
      weaknesses: {
        type: [String],
        default: [],
      },
      risks: {
        type: [String],
        default: [],
      },
      recommendations: {
        type: [String],
        default: [],
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Simulation", simulationSchema);