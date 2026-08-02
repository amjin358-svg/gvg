import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Brand Kit",
  description: "Redirects to GVG Design System.",
};

/** Legacy Brand Kit URL → Design System logo section */
export default function BrandKitPage() {
  redirect("/design/logo");
}
