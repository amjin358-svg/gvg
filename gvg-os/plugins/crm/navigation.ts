/** CRM plugin navigation */

export type NavEntry = {
  label: string;
  href: string;
  roles?: string[];
};

export const navigation: NavEntry[] = [
  { label: "客戶關係", href: "/crm" },
];

export default navigation;
