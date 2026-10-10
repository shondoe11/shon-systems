"use client";

import dynamic from "next/dynamic";
import { REDUCED_MOTION, useMediaQuery } from "./effects/use-media-query";

const TechText = dynamic(() => import("@/components/reactbits/TechText"), { ssr: false });

//~ retune here
const TECH = {
  fontWeight: 600,
  fontSize: 150,
  letterSpacing: -0.03,
  color: "#f2f2f2",
  accentColor: "#2dd4bf",
  reach: 200,
  reveal: "letter" as const,
  specks: 12,
  draggable: false,
  speed: 1,
};

//& canvas is decoration; real <h1> stays in dom (visually hidden) fr seo & screen readers. under reduced motion: plain heading shown instead
export function HeroName({ name }: { name: string }) {
  const reducedMotion = useMediaQuery(REDUCED_MOTION);

  if (reducedMotion) {
    return <h1 className="font-display text-display font-semibold">{name}</h1>;
  }

  return (
    <>
      <h1 className="sr-only">{name}</h1>
      {/* bleeds into page gutter; padding-left = gutter so glyphs start exactly at content edge */}
      <div
        aria-hidden="true"
        className="font-display -ml-5 h-[clamp(4.5rem,13vw,9.5rem)] w-[calc(100%+1.25rem)] pl-5 md:-ml-8 md:w-[calc(100%+2rem)] md:pl-8"
      >
        <TechText text={name} align="left" {...TECH} />
      </div>
    </>
  );
}
