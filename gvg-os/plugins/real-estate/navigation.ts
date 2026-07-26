/** Real Estate plugin navigation */

export type NavEntry = {
  label: string;
  href: string;
  roles?: string[];
};

export const navigation: NavEntry[] = [
  { label: "不動產", href: "/real-estate" },
];

export default navigation;
