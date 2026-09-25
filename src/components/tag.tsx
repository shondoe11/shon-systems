import type { Tag as TagT } from "@/lib/content";

const tone: Record<TagT["kind"], string> = {
  engineering: "text-signal border-signal/30",
  product: "text-warm border-warm/30",
};

export function TagList({ tags, label }: { tags: TagT[]; label: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-1.5">
      {tags.map((t) => (
        <li
          key={t.label}
          className={`rounded-full border px-2.5 py-0.5 text-[0.8125rem] leading-5 ${tone[t.kind]}`}
        >
          {t.label}
        </li>
      ))}
    </ul>
  );
}
