const ApiError = require("./ApiError");

const extractJson = (text) => {
  const cleaned = text.replace(/```json/gi, "").replace(/```/g, "").trim();

  const firstBrace = cleaned.indexOf("{");
  const firstBracket = cleaned.indexOf("[");

  let start = -1;
  let end = -1;

  if (firstBracket !== -1 && (firstBrace === -1 || firstBracket < firstBrace)) {
    start = firstBracket;
    end = cleaned.lastIndexOf("]");
  } else {
    start = firstBrace;
    end = cleaned.lastIndexOf("}");
  }

  if (start === -1 || end === -1) {
    throw new ApiError(502, "AI response did not contain valid JSON");
  }

  const jsonString = cleaned.substring(start, end + 1);

  try {
    return JSON.parse(jsonString);
  } catch (error) {
    throw new ApiError(502, "Failed to parse AI response as JSON");
  }
};

module.exports = { extractJson };