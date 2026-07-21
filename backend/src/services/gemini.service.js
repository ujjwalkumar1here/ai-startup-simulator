const { GoogleGenAI } = require("@google/genai");
const env = require("../config/env");
const ApiError = require("../utils/ApiError");

const requestTimeoutMs = 30000;

const fallbackModels = [
  env.GEMINI_MODEL,
  "gemini-3.5-flash",
  "gemini-3-flash-preview",
  "gemini-3.1-flash-lite-preview",
  "gemini-flash-latest",
  "gemini-2.0-flash",
].filter((model, index, models) => model && models.indexOf(model) === index);

const getErrorMessage = (error) => {
  if (!error?.message) {
    return "Unknown Gemini error";
  }

  try {
    return JSON.parse(error.message)?.error?.message || error.message;
  } catch {
    return error.message;
  }
};

const logGeminiError = (model, error) => {
  console.error("[Gemini] generateContent failed", {
    model,
    status: error.status,
    message: getErrorMessage(error),
  });
};

const shouldTryNextModel = (error) => {
  return [404, 429, 500, 502, 503, 504].includes(error.status);
};

const generateContent = async (prompt) => {
  if (!env.GEMINI_API_KEY) {
    throw new ApiError(500, "GEMINI_API_KEY is not configured");
  }

  const genAI = new GoogleGenAI({
    apiKey: env.GEMINI_API_KEY,
    httpOptions: { timeout: requestTimeoutMs },
  });
  let lastError;

  for (const model of fallbackModels) {
    try {
      const response = await genAI.models.generateContent({
        model,
        contents: prompt,
      });

      const responseText = response?.text;

      if (!responseText) {
        throw new ApiError(502, "AI service returned an empty response");
      }

      return responseText;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      lastError = error;
      logGeminiError(model, error);

      if (!shouldTryNextModel(error)) {
        break;
      }
    }
  }

  const statusCode = lastError?.status === 429 ? 429 : 502;
  const message =
    lastError?.status === 429
      ? "AI service quota exceeded"
      : "Failed to communicate with AI service";

  throw new ApiError(statusCode, message, [
    {
      service: "gemini",
      status: lastError?.status,
      message: getErrorMessage(lastError),
    },
  ]);
};

module.exports = { generateContent };
