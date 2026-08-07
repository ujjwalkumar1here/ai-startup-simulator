const express = require("express");
const {
  startSession,
  answerQuestion,
  getSession,
  getHistory,
  deleteSession,
} = require("../controllers/investor.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.use(protect);

router.post("/start", startSession);
router.post("/answer", answerQuestion);
router.get("/history", getHistory);
router.get("/session/:id", getSession);
router.delete("/session/:id", deleteSession);

module.exports = router;
