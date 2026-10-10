import type { Metadata } from "next";
import { ProjectsEffects } from "@/components/effects/projects-effects";
import { ProjectCard } from "@/components/project-card";
import { WarpHeading } from "@/components/warp-heading";
import { projects } from "@/lib/content";
import { getProfileStats, getRepoStats } from "@/lib/github";
import { site, socials } from "@/lib/site";

const title = "Projects";
const description =
  "Every project Shawn Tan has shipped, with live GitHub repository stats: Music Re-Wrapped (Flask + React Spotify dashboard), MaskOFF (MERN job platform), Anything-Dash and a Blackjack browser game.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: `${title} — ${site.name}`,
    description,
    url: "/projects",
  },
};

const num = (n: number) => n.toLocaleString("en-SG");

export default async function ProjectsPage() {
  const [profile, ...repoStats] = await Promise.all([
    getProfileStats(),
    ...projects.map((p) => getRepoStats(p.repo.owner, p.repo.name)),
  ]);

  const profileItems = profile
    ? [
        { label: "Public repos", value: num(profile.publicRepos) },
        { label: "Followers", value: num(profile.followers) },
        ...(profile.commitsThisYear !== null
          ? [
              {
                label: `${profile.year} Contributions`,
                value: num(profile.commitsThisYear),
              },
            ]
          : []),
      ]
    : [];

  return (
    <>
      <ProjectsEffects />
      <div className="space-y-16 pb-8 pt-12 md:space-y-24 md:pt-24">
        <section aria-label="Overview" className="space-y-6">
          <WarpHeading text={title} />
          <div className="max-w-measure space-y-6">
            <p className="font-display text-xl leading-snug md:text-2xl">
              The full list, ever-growing.
            </p>
            {profileItems.length > 0 && (
              <dl
                aria-label={`GitHub profile stats for ${site.githubUser}`}
                className="tabular flex flex-wrap gap-x-8 gap-y-3"
              >
                {profileItems.map((it) => (
                  <div key={it.label}>
                    <dt className="text-sm text-fg-faint">{it.label}</dt>
                    <dd className="font-display text-2xl font-medium">
                      {it.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
            <p className="text-sm">
              <a
                href={socials.github.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                github.com/{site.githubUser}
              </a>
            </p>
          </div>
        </section>

        <section
          aria-label="All projects"
          className="border-t border-hairline pt-4"
        >
          <div className="divide-y divide-hairline">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                stats={repoStats[i]}
                detailed
                priority={i === 0}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
