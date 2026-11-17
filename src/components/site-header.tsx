import Link from "next/link";
import { SettingsMenu } from "./effects/settings-menu";

//& `tip` is hover tooltip (css, see `.nav-box[data-tip]`); `tone: "teal"`
const nav = [
  { label: "About", href: "/#about", tip: "jump to..", tone: undefined },
  { label: "Experience", href: "/#experience", tip: "jump to..", tone: undefined },
  { label: "Projects", href: "/projects", tip: "full project list", tone: "teal" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-page items-center justify-between px-5 py-3 md:px-8">
        <Link
          href="/"
          aria-label="ST, home"
          data-tip="home"
          className="nav-box size-9 font-display text-sm font-semibold tracking-tight text-fg"
        >
          ST
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-1.5 text-xs sm:gap-2 sm:text-sm">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              data-tip={item.tip}
              data-tone={item.tone}
              className="nav-box px-2.5 py-1.5 sm:px-3"
            >
              {item.label}
            </Link>
          ))}
          <SettingsMenu />
        </nav>
      </div>
    </header>
  );
}
