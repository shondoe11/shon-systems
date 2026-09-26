import type { Role } from "@/lib/content";
import { TagList } from "./tag";

export function ExperienceItem({ role }: { role: Role }) {
  return (
    <article className="grid gap-3 py-8 first:pt-0 last:pb-0 md:grid-cols-[7rem_1fr] md:gap-6">
      <p className="tabular text-sm text-fg-muted">
        <time dateTime={role.start}>{role.start}</time>
        <span aria-hidden="true"> – </span>
        <span className="sr-only">to</span>
        <time dateTime={role.end}>{role.end}</time>
      </p>
      <div className="space-y-3">
        <h3 className="font-display text-lg font-medium leading-snug">
          {role.title}
          <span className="text-fg-muted"> at </span>
          <a
            href={role.href}
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            {role.company}
          </a>
        </h3>
        <p className="text-[0.9375rem] leading-relaxed text-fg-muted">
          {role.description}
        </p>
        <TagList tags={role.tags} label={`Skills used at ${role.company}`} />
      </div>
    </article>
  );
}
