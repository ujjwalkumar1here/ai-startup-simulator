const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const env = require("../config/env");
const { validateRegisterInput, validateLoginInput } = require("../validators/auth.validator");
const { registerUser, loginUser } = require("../services/auth.service");

const cookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  validateRegisterInput({ name, email, password });

  const { user, token } = await registerUser({ name, email, password });

  res
    .status(201)
    .cookie("token", token, cookieOptions)
    .json(new ApiResponse(201, user, "User registered successfully"));
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  validateLoginInput({ email, password });

  const { user, token } = await loginUser({ email, password });

  res
    .status(200)
    .cookie("token", token, cookieOptions)
    .json(new ApiResponse(200, user, "Login successful"));
});

const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", cookieOptions);
  res.status(200).json(new ApiResponse(200, null, "Logout successful"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    avatar: req.user.avatar,
    role: req.user.role,
    createdAt: req.user.createdAt,
    updatedAt: req.user.updatedAt,
  };

  res.status(200).json(new ApiResponse(200, user, "Current user fetched successfully"));
});

module.exports = { register, login, logout, getCurrentUser };