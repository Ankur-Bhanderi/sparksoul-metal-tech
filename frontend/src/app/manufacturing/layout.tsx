import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manufacturing Process | SparkSoul Metal Tech Premium Manufacturing",
  description: "Discover our state-of-the-art manufacturing process, from pure brass casting and CNC machining to 7-layer electroplating and quality testing.",
};

export default function ManufacturingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
