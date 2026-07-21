const express = require("express");
const healthRoutes = require("./health.routes");
const authRoutes = require("./auth.routes");
const simulationRoutes = require("./simulation.routes");
const investorRoutes = require("./investor.routes");

const router = express.Router();

router.use("/", healthRoutes);
router.use("/auth", authRoutes);
router.use("/simulations", simulationRoutes);
router.use("/investor", investorRoutes);

module.exports = router;