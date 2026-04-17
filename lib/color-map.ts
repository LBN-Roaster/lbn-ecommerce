export const COLOR_MAP: Record<string, string> = {
  // Whites & neutrals
  Trắng: "#ffffff",
  "Trắng Nâu": "#c4a882",
  "Trắng Kem": "#f5f0e8",

  // Grays
  "Xám Chì": "#909090",
  "Xám Nhạt": "#b0b0b0",
  Xám: "#909090",
  "Xám Đen": "#6b6b6b",

  // Browns
  Nâu: "#8b5e3c",
  "Nâu Sẫm": "#5c3317",

  // Blacks
  Đen: "#1a1a1a",

  // Blues
  "Xanh Dương": "#1e88e5",
  "Xanh Navy": "#1a2a4a",
  "Xanh Nhạt": "#64b5f6",
  "Xanh Nhăn": "#002C5F",

  // Greens
  "Xanh Lá": "#43a047",
  "Xanh Rêu": "#6b7c4f",

  // Reds & pinks
  Đỏ: "#e53935",
  Hồng: "#e91e8c",

  // Yellows & golds
  Vàng: "#fdd835",
  "Vàng Đồng": "#b5862b",
};

/** Returns the CSS color string for a given color name, or undefined if not mapped. */
export function getColor(name: string): string | undefined {
  return COLOR_MAP[name];
}
