export type ColorValue = string | [string, string];

export const COLOR_MAP: Record<string, ColorValue> = {
  // Whites & neutrals
  Trắng: "#ffffff",
  "Trắng Nâu": ["#ffffff", "#8b5e3c"],
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

  // Roaster colors
  "Wrinkled Blue": "#121469",
  "Sand White": "#F3F3F3",
  "White Brown":  ["#ffffff", "#8b5e3c"],
  "Xingfa Grey": "#5B5B5B",
  "Charcoal Grey": "#6E6D6A",
  "Dark Grey": "#2E2E2E",
};

/** Returns the color value for a given name, or undefined if not mapped. */
export function getColor(name: string): ColorValue | undefined {
  return COLOR_MAP[name];
}

/** Returns the CSS background style for a color value. */
export function colorToStyle(color: ColorValue): { background?: string; backgroundColor?: string } {
  if (Array.isArray(color)) {
    return {
      background: `linear-gradient(135deg, ${color[0]} 50%, ${color[1]} 50%)`,
    };
  }
  return { backgroundColor: color };
}
