import Link from "next/link";

const nav = [
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/projects" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-page items-center justify-between px-5 py-3 md:px-8">
        <a
          href="#top"
          aria-label="Back to top"
          className="nav-box size-9 font-display text-sm font-semibold tracking-tight text-fg"
        >
          ST
        </a>
        <nav aria-label="Primary" className="flex items-center gap-2 text-sm">
          {nav.map((item) => (
            <Link key={item.label} href={item.href} className="nav-box px-3 py-1.5">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
