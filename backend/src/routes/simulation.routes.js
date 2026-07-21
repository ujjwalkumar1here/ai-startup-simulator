const express = require("express");
const {
  createSimulation,
  listSimulations,
  getSimulation,
  deleteSimulation,
} = require("../controllers/simulation.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.use(protect);

router.post("/", createSimulation);
router.get("/", listSimulations);
router.get("/:id", getSimulation);
router.delete("/:id", deleteSimulation);

module.exports = router;