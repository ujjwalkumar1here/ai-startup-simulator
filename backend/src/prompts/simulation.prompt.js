const buildSimulationPrompt = ({
  startupName,
  idea,
  industry,
  targetAudience,
  businessModel,
  pricing,
  problemStatement,
  uniqueSellingProposition,
}) => {
  return `You are an experienced Startup Mentor and Venture Capitalist with 20 years of experience evaluating early-stage startups.

Analyze the following startup idea and return a professional, realistic evaluation.

Startup Name: ${startupName}
Idea: ${idea}
Industry: ${industry}
Target Audience: ${targetAudience}
Business Model: ${businessModel}
Pricing: ${pricing}
Problem Statement: ${problemStatement}
Unique Selling Proposition: ${uniqueSellingProposition}

Evaluate the startup on market potential, revenue prediction, growth prediction, cash flow outlook, strengths, weaknesses, risks, and recommendations.

You must respond with ONLY valid JSON. Do not include markdown formatting, code fences, explanations, or any text outside the JSON object.

Return the JSON in exactly this structure:

{
  "startupScore": 0,
  "marketPotential": "",
  "revenuePrediction": "",
  "growthPrediction": "",
  "cashFlow": "",
  "strengths": [],
  "weaknesses": [],
  "risks": [],
  "recommendations": []
}

Rules:
- "startupScore" must be a number between 0 and 100.
- "marketPotential", "revenuePrediction", "growthPrediction", and "cashFlow" must be concise professional paragraphs (2-3 sentences each).
- "strengths", "weaknesses", "risks", and "recommendations" must each be arrays of 3 to 5 short string items.
- Return ONLY the raw JSON object, nothing else.`;
};

module.exports = { buildSimulationPrompt };