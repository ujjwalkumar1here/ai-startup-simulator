const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const checkHealth = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json(new ApiResponse(200, null, "Server running successfully"));
});

module.exports = { checkHealth };