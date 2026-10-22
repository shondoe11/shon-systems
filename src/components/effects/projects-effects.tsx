"use client";

import dynamic from "next/dynamic";
import { cursorProps, useEffectsSettings } from "@/lib/effects-settings";
import { FINE_POINTER, REDUCED_MOTION, useMediaQuery } from "./use-media-query";

//& webgl code loaded client-only after hydration so it never blocks first paint
const LiquidEther = dynamic(() => import("@/components/reactbits/LiquidEther"), { ssr: false });
const GlowCursor = dynamic(() => import("@/components/reactbits/GlowCursor"), { ssr: false });

//~ fixed sim tuning. takeoverDuration = how fast pointer wins over idle auto-drift, autoResumeDelay = how long before drift returns. colors/force/size come frm settings
const ETHER_FIXED = {
  backgroundColor: "#000000",
  autoIntensity: 2.0,
  autoSpeed: 0.4,
  takeoverDuration: 0.1,
  autoResumeDelay: 2500,
};

//& everything user-tunable lives in lib/effects-settings.ts (defaults + the nav settings menu)
export function ProjectsEffects() {
  const reducedMotion = useMediaQuery(REDUCED_MOTION);
  const finePointer = useMediaQuery(FINE_POINTER);
  const { cursor, background } = useEffectsSettings();
  if (reducedMotion) return null;

  const ether = background.projects;

  return (
    <>
      {background.enabled && (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
          {/* keyed so palette changes rebuild sim cleanly */}
          <LiquidEther
            key={ether.colors.join()}
            {...ETHER_FIXED}
            colors={[...ether.colors]}
            mouseForce={ether.mouseForce}
            cursorSize={ether.cursorSize}
          />
          <div className="scrim" />
        </div>
      )}
      {cursor.enabled && finePointer && (
        <GlowCursor global {...cursorProps(cursor)} />
      )}
    </>
  );
}
