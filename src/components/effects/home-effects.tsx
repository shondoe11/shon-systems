"use client";

import dynamic from "next/dynamic";
import { cursorProps, useEffectsSettings } from "@/lib/effects-settings";
import { FINE_POINTER, REDUCED_MOTION, useMediaQuery } from "./use-media-query";

//& webgl/webgpu code loaded client-only aft hydration so never blocks first paint
const AeroShards = dynamic(() => import("@/components/reactbits/AeroShards"), { ssr: false });
const GlowCursor = dynamic(() => import("@/components/reactbits/GlowCursor"), { ssr: false });

//& everything user-tunable lives in lib/effects-settings.ts (defaults + the nav settings menu)
export function HomeEffects() {
  const reducedMotion = useMediaQuery(REDUCED_MOTION);
  const finePointer = useMediaQuery(FINE_POINTER);
  const { cursor, background } = useEffectsSettings();
  if (reducedMotion) return null;

  const shards = background.home;

  return (
    <>
      {background.enabled && (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
          {/* keyed so color/intensity changes rebuild gpu pipeline cleanly */}
          <AeroShards
            key={JSON.stringify(shards)}
            backgroundColor="#000000"
            shardColor={shards.shardColor}
            accentColor={shards.accentColor}
            glow={shards.glow}
            bloom={shards.bloom}
            speed={shards.speed}
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
