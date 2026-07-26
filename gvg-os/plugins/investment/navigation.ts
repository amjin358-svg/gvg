/** Investment plugin navigation */

export type NavEntry = {
  label: string;
  href: string;
  roles?: string[];
};

export const navigation: NavEntry[] = [
  { label: "投資", href: "/investment" },
];

export default navigation;
