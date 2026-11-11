"use client";

import { IoDocumentText, IoLogoGithub, IoLogoInstagram, IoLogoLinkedin, IoMail } from "react-icons/io5";
import LogoLoop, { type LogoItem } from "@/components/reactbits/LogoLoop";
import { site, socials } from "@/lib/site";

//& loop replaces static row of social links. each item is real anchor
//~ (aria-label carries destination) so it stays navigable by keyboard * crawlers
const items: LogoItem[] = [
  { node: <IoLogoGithub />, href: socials.github.href, ariaLabel: "GitHub, shondoe11" },
  { node: <IoLogoLinkedin />, href: socials.linkedin.href, ariaLabel: "LinkedIn, Shawn Tan" },
  { node: <IoMail />, href: socials.email.href, ariaLabel: `Email ${site.email}` },
  { node: <IoDocumentText />, href: socials.resume.href, ariaLabel: "Résumé (PDF)" },
  { node: <IoLogoInstagram />, href: socials.instagram.href, ariaLabel: "Instagram, shtcj11" },
];

export function SocialLoop() {
  return (
    <LogoLoop
      logos={items}
      speed={40}
      logoHeight={26}
      gap={56}
      pauseOnHover
      ariaLabel="Contact and profiles"
      //~ edges fade via mask (transparent), not component's painted black gradients, so bg art shows through instead of black bars
      className="text-fg-muted [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] [&_a:hover]:text-signal [&_a]:transition-colors [&_a]:duration-200"
    />
  );
}
