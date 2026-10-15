"use client";

import dynamic from "next/dynamic";
import { useEffectsSettings } from "@/lib/effects-settings";
import { REDUCED_MOTION, useMediaQuery } from "./use-media-query";

const ClickSpark = dynamic(() => import("@/components/reactbits/ClickSpark"), { ssr: false });

//& site-wide: mounted 1x in root layout, fires every click/tap
//~ everything user-tunable lives in lib/effects-settings.ts (defaults + nav settings menu).
export function ClickSparkLayer() {
  const reducedMotion = useMediaQuery(REDUCED_MOTION);
  const { spark } = useEffectsSettings();
  if (reducedMotion || !spark.enabled) return null;
  return (
    <ClickSpark
      global
      sparkColor={spark.color}
      sparkCount={spark.count}
      sparkSize={spark.size}
      sparkRadius={spark.radius}
      duration={spark.duration}
    />
  );
}
