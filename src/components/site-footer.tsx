import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-page px-5 pb-10 pt-16 md:px-8">
      <div className="flex flex-col gap-3 border-t border-hairline pt-6 text-sm text-fg-muted md:flex-row md:items-baseline md:justify-between">
        <p className="md:text-right">
          Built with Next.js, Tailwind CSS. Set in Bricolage Grotesque, Instrument Sans.
        </p>
        <p>
          &copy; {new Date().getFullYear()} {site.name}
        </p>

      </div>
    </footer>
  );
}
