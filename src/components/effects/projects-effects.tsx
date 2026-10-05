"use client";

import dynamic from "next/dynamic";
import { FINE_POINTER, REDUCED_MOTION, useMediaQuery } from "./use-media-query";

//& webgl code loaded client-only after hydration so it never blocks first paint
const LiquidEther = dynamic(() => import("@/components/reactbits/LiquidEther"), { ssr: false });
const GlowCursor = dynamic(() => import("@/components/reactbits/GlowCursor"), { ssr: false });

//& retune here
//~ brighter tints of preset palette (400-weight instead of 500) since the sim darkens them. mouseForce/cursorSize drive how hard the fluid reacts; takeoverDuration = how fast pointer wins over idle auto-drift, autoResumeDelay = how long before drift returns
const ETHER = {
  backgroundColor: "#000000",
  colors: ["#34D399", "#22D3EE", "#CBD5E1"],
  mouseForce: 40,
  cursorSize: 130,
  autoIntensity: 2.0,
  autoSpeed: 0.4,
  takeoverDuration: 0.1,
  autoResumeDelay: 2500,
};
const CURSOR = { secondaryColor: "#4611e3", fadeDuration: 100 };

export function ProjectsEffects() {
  const reducedMotion = useMediaQuery(REDUCED_MOTION);
  const finePointer = useMediaQuery(FINE_POINTER);
  if (reducedMotion) return null;

  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <LiquidEther {...ETHER} />
        <div className="scrim" />
      </div>
      {finePointer && <GlowCursor global {...CURSOR} />}
    </>
  );
}
