export type GlobalHop = {
  id: string;
  label: string;
  /** Approximate lat/lon for arc layout */
  lat: number;
  lon: number;
};

/** Trade / market hop order for Scene 3 Global */
export const GLOBAL_ROUTE: GlobalHop[] = [
  { id: "usa", label: "USA", lat: 37.09, lon: -95.71 },
  { id: "taiwan", label: "Taiwan", lat: 23.7, lon: 120.96 },
  { id: "japan", label: "Japan", lat: 36.2, lon: 138.25 },
  { id: "vietnam", label: "Vietnam", lat: 14.06, lon: 108.28 },
  { id: "europe", label: "Europe", lat: 50.11, lon: 8.68 },
];
