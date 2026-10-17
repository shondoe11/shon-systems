"use client";

import Image from "next/image";
import { MotionConfig } from "motion/react";
import CircularText from "@/components/reactbits/CircularText";

//& trailing separator so last word joins first w/o gap whn ring closes
const ORBIT_TEXT = "PYTHON • JAVASCRIPT • TYPESCRIPT • BASH • SQL • ";

export function ProfileOrbit() {
  return (
    //~ `reducedMotion="user"` stops spin fr ppl who asked their os fr less motion
    <MotionConfig reducedMotion="user">
      {/* overflow-hidden: each ring letter = full-size rotated square, rotated boxes extend pg's scroll area. clipping to circle costs nothing visually (glyphs sit on ring). */}
      <div className="relative mx-auto size-72 overflow-hidden rounded-full xl:size-88">
        <CircularText
          text={ORBIT_TEXT}
          spinDuration={5}
          onHover="slowDown"
          className="size-full text-fg transition-colors duration-300 hover:text-orbit-hover"
          letterClassName="font-display text-sm font-bold tracking-[0.18em] xl:text-base"
        />
        <Image
          src="/shawn-tan.jpeg"
          alt="Shawn Tan"
          width={1600}
          height={1600}
          priority
          sizes="(min-width: 1280px) 18rem, 14rem"
          className="absolute left-1/2 top-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-hairline object-cover xl:size-72"
        />
      </div>
    </MotionConfig>
  );
}
