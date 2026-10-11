"use client";

import CountUp from "@/components/reactbits/CountUp";
import { REDUCED_MOTION, useMediaQuery } from "./effects/use-media-query";

//~ retune here
const COUNT = { duration: 1.6, separator: "," };

//& real num stays in dom (sr-only) fr seo & screen readers; animated span is decoration under reduced motion plain num is shown instead
export function StatNumber({ value, className }: { value: number; className?: string }) {
  const reducedMotion = useMediaQuery(REDUCED_MOTION);
  const formatted = value.toLocaleString("en-SG");

  if (reducedMotion) return <span className={className}>{formatted}</span>;

  return (
    <>
      <span className="sr-only">{formatted}</span>
      <span aria-hidden="true" className={className}>
        <CountUp to={value} from={0} {...COUNT} />
      </span>
    </>
  );
}
