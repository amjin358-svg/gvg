/** Elevation — semantic stacking levels */

export const elevation = {
  base: {
    z: 0,
    shadow: "none",
  },
  raised: {
    z: 1,
    shadow: "0 1px 3px rgba(0,0,0,.08)",
  },
  overlay: {
    z: 10,
    shadow: "0 8px 20px rgba(0,0,0,.12)",
  },
  dropdown: {
    z: 1000,
    shadow: "0 8px 20px rgba(0,0,0,.12)",
  },
  sticky: {
    z: 1020,
    shadow: "0 1px 3px rgba(0,0,0,.08)",
  },
  modal: {
    z: 1050,
    shadow: "0 20px 40px rgba(0,0,0,.16)",
  },
  toast: {
    z: 1080,
    shadow: "0 8px 20px rgba(0,0,0,.12)",
  },
} as const;

export type ElevationToken = keyof typeof elevation;
