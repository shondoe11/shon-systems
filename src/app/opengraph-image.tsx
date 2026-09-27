import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = `${site.name}, ${site.role} in ${site.location}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    heading: site.name,
    sub: `${site.role} in ${site.location}. Product and marketing background at Google, Huawei and Sony Music.`,
  });
}
