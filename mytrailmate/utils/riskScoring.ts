export type RiskInput = {
  fitness: number;           // 0–10
  experience: number;        // 0–10
  gear: number;              // 0–10
  health: number;            // 0–10
  weather: number;           // 0–10
};

export type RiskResult = {
  overallScore: number;
  categoryScores: {
    label: string;
    score: number;
    status: string;
    suggestion: string;
  }[];
  overallStatus: string;
  overallAdvice: string;
};

export const calculateRisk = (input: RiskInput): RiskResult => {
  const weights = {
    fitness: 1,
    experience: 1,
    gear: 1,
    health: 1,
    weather: 1,
  };

  const categories = [
    { key: "fitness", label: "Physical Fitness", suggestion: "Work on stamina." },
    { key: "experience", label: "Trekking Experience", suggestion: "Try beginner trails first." },
    { key: "gear", label: "Gear Preparedness", suggestion: "Upgrade essential gear." },
    { key: "health", label: "Health Readiness", suggestion: "Ensure you're medically fit." },
    { key: "weather", label: "Weather Adaptation", suggestion: "Pack clothes for cold/wet weather." },
  ];

  const results = categories.map((cat) => {
    const score = input[cat.key as keyof RiskInput];
    const status =
      score >= 8 ? "Great" :
      score >= 6 ? "Good" :
      score >= 4 ? "Fair" : "Needs Improvement";
    return {
      label: cat.label,
      score,
      status,
      suggestion: score < 7 ? cat.suggestion : "",
    };
  });

  const totalWeighted = Object.keys(weights).reduce((acc, key) => acc + (input[key as keyof RiskInput] * weights[key as keyof typeof weights]), 0);
  const overallScore = Math.round(totalWeighted / 5);

  let overallStatus = "Low Risk";
  let overallAdvice = "You're well-prepared!";
  if (overallScore < 40) {
    overallStatus = "High Risk";
    overallAdvice = "Prepare better before trekking.";
  } else if (overallScore < 70) {
    overallStatus = "Moderate Risk";
    overallAdvice = "You're good to go, but take a few precautions.";
  }

  return {
    overallScore,
    categoryScores: results,
    overallStatus,
    overallAdvice,
  };
};
