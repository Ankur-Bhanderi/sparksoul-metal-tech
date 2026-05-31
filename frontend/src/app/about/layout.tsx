import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | SparkSoul Metal Tech Premium Manufacturing",
  description: "Learn about SparkSoul Metal Tech's legacy, vision, and mission as a global leader in luxury brass bathroom fittings.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
