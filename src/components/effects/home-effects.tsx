"use client";

import dynamic from "next/dynamic";
import { FINE_POINTER, REDUCED_MOTION, useMediaQuery } from "./use-media-query";

//& webgl/webgpu code loaded client-only after hydration so it never blocks first paint
const AeroShards = dynamic(() => import("@/components/reactbits/AeroShards"), { ssr: false });
const GlowCursor = dynamic(() => import("@/components/reactbits/GlowCursor"), { ssr: false });

//~ retune here
const SHARDS = { backgroundColor: "#000000", shardColor: "#10B981", accentColor: "#06B6D4" };
const CURSOR = { secondaryColor: "#4611e3", fadeDuration: 100 };

export function HomeEffects() {
  const reducedMotion = useMediaQuery(REDUCED_MOTION);
  const finePointer = useMediaQuery(FINE_POINTER);
  if (reducedMotion) return null;

  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <AeroShards {...SHARDS} />
      </div>
      {finePointer && <GlowCursor global {...CURSOR} />}
    </>
  );
}
