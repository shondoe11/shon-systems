"use client";

import dynamic from "next/dynamic";
import { REDUCED_MOTION, useMediaQuery } from "./effects/use-media-query";

const WarpText = dynamic(() => import("@/components/reactbits/WarpText"), { ssr: false });

//~ retune here
const WARP = {
  color: "#f2f2f2",
  fontWeight: 600,
  fontSize: "clamp(3rem, 9vw, 6.5rem)",
  letterSpacing: "-0.03em",
  lineHeight: 0.95,
  warpStrength: 0.08,
  warpScale: 1.7,
  speed: 0.55,
  pointerInfluence: 0.42,
  pointerStrength: 0.38,
  refraction: 0.018,
  ripple: true,
};

//& canvas is decoration; real <h1> stays in dom (visually hidden) fr seo & screen readers. under reduced motion: plain heading shown instead
export function WarpHeading({ text }: { text: string }) {
  const reducedMotion = useMediaQuery(REDUCED_MOTION);

  if (reducedMotion) {
    return <h1 className="font-display text-display font-semibold">{text}</h1>;
  }

  return (
    <>
      <h1 className="sr-only">{text}</h1>
      {/* bleeds into page gutter; padding-left = gutter so glyphs start exactly at content edge */}
      <div
        aria-hidden="true"
        className="font-display -ml-5 w-[calc(100%+1.25rem)] md:-ml-8 md:w-[calc(100%+2rem)]"
      >
        <WarpText
          text={text}
          align="left"
          {...WARP}
          className="pl-5 md:pl-8"
          style={{ minHeight: 0, height: "clamp(3.5rem, 10vw, 7.5rem)" }}
        />
      </div>
    </>
  );
}
