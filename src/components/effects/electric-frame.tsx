"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { useEffectsSettings } from "@/lib/effects-settings";
import { REDUCED_MOTION, useMediaQuery } from "./use-media-query";

const ElectricBorder = dynamic(() => import("@/components/reactbits/ElectricBorder"), { ssr: false });

const RADIUS = 14;

//& project card: animated electric border frame
//~ card content rendered directly (server-side, crawlable); border is childless client-only overlay laid on top, so turning it off never changes layout + ssr html keeps every heading & paragraph. a hairline sits underneath as no-js / reduced-motion look
export function ElectricFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reducedMotion = useMediaQuery(REDUCED_MOTION);
  const { borders } = useEffectsSettings();
  const active = borders.enabled && !reducedMotion;

  return (
    <div
      className={`relative border ${active ? "border-transparent" : "border-hairline"} ${className}`}
      style={{ borderRadius: RADIUS }}
    >
      <div className="p-5 md:p-7">{children}</div>
      {active && (
        <ElectricBorder
          color={borders.color}
          intensity={borders.intensity}
          speed={borders.speed}
          thickness={borders.thickness}
          borderRadius={RADIUS}
          style={{ position: "absolute", inset: -1, pointerEvents: "none" }}
        />
      )}
    </div>
  );
}
