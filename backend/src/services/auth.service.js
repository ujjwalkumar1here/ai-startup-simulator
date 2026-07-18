const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const { generateToken } = require("../utils/jwt");

const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "Email is already registered");
  }

  const user = await User.create({ name, email, password });
  const token = generateToken({ id: user._id });

  const userResponse = {
    _id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  return { user: userResponse, token };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = generateToken({ id: user._id });

  const userResponse = {
    _id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  return { user: userResponse, token };
};

module.exports = { registerUser, loginUser };