import type { ReactNode } from "react";

export function Section({
  id,
  title,
  aside,
  children,
}: {
  id: string;
  title: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="scroll-mt-24 border-t border-hairline pt-8 md:grid md:grid-cols-12 md:gap-8"
    >
      <div className="mb-6 md:col-span-3 md:mb-0">
        <h2 id={headingId} className="font-display text-title font-medium">
          {title}
        </h2>
        {aside && <div className="mt-2 text-sm text-fg-muted">{aside}</div>}
      </div>
      <div className="md:col-span-9">{children}</div>
    </section>
  );
}
