import type { RepoStats } from "@/lib/github";

const fmtDate = new Intl.DateTimeFormat("en-SG", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

//& every num ships w visible label: old site showed bare "352" / "105"
export function RepoStatsList({ stats, repoName }: { stats: RepoStats; repoName: string }) {
  const items: { label: string; value: string; dateTime?: string }[] = [
    { label: "Stars", value: stats.stars.toLocaleString("en-SG") },
    { label: "Forks", value: stats.forks.toLocaleString("en-SG") },
  ];
  if (stats.language) items.push({ label: "Language", value: stats.language });
  items.push({
    label: "Last push",
    value: fmtDate.format(new Date(stats.pushedAt)),
    dateTime: stats.pushedAt,
  });

  return (
    <dl
      aria-label={`GitHub stats for ${repoName}`}
      className="tabular flex flex-wrap gap-x-6 gap-y-2 text-sm"
    >
      {items.map((it) => (
        <div key={it.label} className="flex items-baseline gap-1.5">
          <dt className="text-fg-faint">{it.label}</dt>
          <dd className="text-fg">
            {it.dateTime ? <time dateTime={it.dateTime}>{it.value}</time> : it.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
