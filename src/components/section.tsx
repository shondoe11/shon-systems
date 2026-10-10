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
      className="scroll-mt-24 border-t border-hairline pt-8 lg:grid lg:grid-cols-12 lg:gap-8"
    >
      <div className="mb-6 lg:col-span-3 lg:mb-0">
        <h2 id={headingId} className="font-display text-title font-medium">
          {title}
        </h2>
        {aside && <div className="mt-2 text-sm text-fg-muted">{aside}</div>}
      </div>
      <div className="lg:col-span-9">{children}</div>
    </section>
  );
}
