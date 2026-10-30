import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = `Projects by ${site.name}: Toilets with Bidets SG, Music Re-Wrapped, MaskOFF, Anything-Dash and a Blackjack browser game`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    heading: "Projects",
    sub: `Toilets with Bidets SG, Music Re-Wrapped, MaskOFF, Anything-Dash and Blackjack, with live GitHub stats. By ${site.name}.`,
  });
}
