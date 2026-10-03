"use client";

import dynamic from "next/dynamic";
import { FINE_POINTER, REDUCED_MOTION, useMediaQuery } from "./use-media-query";

//& webgl code loaded client-only after hydration so it never blocks first paint
const LiquidEther = dynamic(() => import("@/components/reactbits/LiquidEther"), { ssr: false });
const SplashCursor = dynamic(() => import("@/components/reactbits/SplashCursor"), { ssr: false });

//~ retune here
const ETHER = { backgroundColor: "#000000", colors: ["#10B981", "#06B6D4", "#94a3b8"] };

export function ProjectsEffects() {
  const reducedMotion = useMediaQuery(REDUCED_MOTION);
  const finePointer = useMediaQuery(FINE_POINTER);
  if (reducedMotion) return null;

  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <LiquidEther {...ETHER} />
      </div>
      {finePointer && <SplashCursor />}
    </>
  );
}
