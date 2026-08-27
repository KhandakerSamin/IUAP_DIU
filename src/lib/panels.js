export const PANELS = [
  "Global Leaders Dialogue: The Future of Universities - From Traditional Institutions to AI-Native Ecosystems",
  "Panel 1: Building Entrepreneurial Universities for Sustainable Economic Growth",
  "Panel 2: Transforming Higher Education to Empower Women in an AI-Driven World",
  "Panel 3: Sustainable Universities for a Sustainable Planet",
  "Panel 4: Open Science, AI, and the Future of Academic Research",
];

// "Panel 3: Sustainable…" or "Panel Discussion 3:…" -> "Panel 3", for table chips.
export function shortPanelLabel(panel) {
  if (!panel) return "\u2014";
  if (panel.startsWith("Global Leaders Dialogue")) return "Global Leaders Dialogue";
  const match = /^Panel (?:Discussion )?(\d+)/i.exec(String(panel));
  return match ? `Panel ${match[1]}` : panel;
}
