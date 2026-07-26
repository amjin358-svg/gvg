/** AI Center plugin navigation */

export type NavEntry = {
  label: string;
  href: string;
  roles?: string[];
};

export const navigation: NavEntry[] = [
  { label: "AI 中心", href: "/ai" },
];

export default navigation;
