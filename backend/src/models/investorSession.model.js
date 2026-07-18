const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    questionNumber: { type: Number, required: true },
    category: { type: String, required: true },
    question: { type: String, required: true },
  },
  { _id: false }
);

const answerSchema = new mongoose.Schema(
  {
    questionNumber: { type: Number, required: true },
    answer: { type: String, required: true },
    score: { type: Number, required: true },
    strengths: { type: [String], default: [] },
    weaknesses: { type: [String], default: [] },
    improvements: { type: [String], default: [] },
    investorComment: { type: String, required: true },
  },
  { _id: false }
);

const feedbackSchema = new mongoose.Schema(
  {
    overallScore: { type: Number, required: true },
    decision: { type: String, required: true },
    majorRisks: { type: [String], default: [] },
    strongPoints: { type: [String], default: [] },
    weakPoints: { type: [String], default: [] },
    suggestions: { type: [String], default: [] },
    probabilityOfFunding: { type: String, required: true },
  },
  { _id: false }
);

const investorSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    simulation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Simulation",
      required: true,
    },
    questions: {
      type: [questionSchema],
      default: [],
    },
    answers: {
      type: [answerSchema],
      default: [],
    },
    feedback: {
      type: feedbackSchema,
      default: null,
    },
    overallScore: {
      type: Number,
      default: null,
    },
    decision: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ["in-progress", "completed"],
      default: "in-progress",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InvestorSession", investorSessionSchema);