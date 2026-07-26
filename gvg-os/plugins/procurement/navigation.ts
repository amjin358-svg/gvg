/** Procurement plugin navigation */

export type NavEntry = {
  label: string;
  href: string;
  roles?: string[];
};

export const navigation: NavEntry[] = [
  { label: "全球採購", href: "/procurement" },
];

export default navigation;
