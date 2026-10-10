"use client";

import dynamic from "next/dynamic";
import { REDUCED_MOTION, useMediaQuery } from "./use-media-query";

const ClickSpark = dynamic(() => import("@/components/reactbits/ClickSpark"), { ssr: false });

//~ retune here
const SPARK = { sparkColor: "#fff80d", sparkSize: 10, sparkRadius: 15, sparkCount: 8, duration: 400 };

//& site-wide: mounted 1x in root layout, fires every click/tap
export function ClickSparkLayer() {
  const reducedMotion = useMediaQuery(REDUCED_MOTION);
  if (reducedMotion) return null;
  return <ClickSpark global {...SPARK} />;
}
