export const PANELS = [
  "Panel Discussion 1: Building Entrepreneurial Universities for Sustainable Economic Growth",
  "Panel Discussion 2: Transforming Higher Education to Empower Women in an AI-Driven World",
  "Panel Discussion 3: Sustainable Universities for a Sustainable Planet",
  "Panel Discussion 4: Open Science, AI, and the Future of Academic Research",
  "Panel Discussion 5: One Student, One AI: Preparing Every Learner for an AI-Powered World",
];

// "Panel Discussion 3: Sustainable…" -> "Panel 3", for table chips.
export function shortPanelLabel(panel) {
  const match = /^Panel Discussion (\d+)/.exec(String(panel || ""));
  return match ? `Panel ${match[1]}` : panel || "\u2014";
}
