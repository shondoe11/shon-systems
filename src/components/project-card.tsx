import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { IoLogoGithub } from "react-icons/io5";
import type { Project } from "@/lib/content";
import type { RepoStats } from "@/lib/github";
import { RepoStatsList } from "./repo-stats";
import { TagList } from "./tag";

export function ProjectCard({
  project,
  stats,
  detailed = false,
  priority = false,
}: {
  project: Project;
  stats?: RepoStats | null;
  detailed?: boolean;
  priority?: boolean;
}) {
  const live = project.live;
  const primaryHref = live?.status === "online" ? live.href : project.repo.href;
  const headingId = `project-${project.slug}`;

  return (
    <article
      aria-labelledby={headingId}
      className="grid gap-5 py-10 first:pt-0 last:pb-0 md:grid-cols-12 md:gap-8"
    >
      <a
        href={primaryHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${project.name}`}
        tabIndex={-1}
        className="md:col-span-5"
      >
        <Image
          src={project.image.src}
          alt={project.image.alt}
          width={project.image.width}
          height={project.image.height}
          priority={priority}
          sizes="(min-width: 1024px) 28rem, (min-width: 768px) 40vw, 100vw"
          className="aspect-[16/10] w-full rounded-sm border border-hairline object-cover object-top"
        />
      </a>

      <div className="space-y-4 md:col-span-7">
        <h3 id={headingId} className="font-display text-xl font-medium leading-snug">
          <a href={primaryHref} target="_blank" rel="noopener noreferrer" className="link">
            {project.name}
          </a>
        </h3>
        <p className="text-[0.9375rem] leading-relaxed text-fg-muted">
          {detailed ? project.description : project.summary}
        </p>

        <TagList tags={project.tags} label={`Tech stack for ${project.name}`} />

        {detailed && stats && <RepoStatsList stats={stats} repoName={project.name} />}

        <ul aria-label={`Links for ${project.name}`} className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <li>
            <a
              href={project.repo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link inline-flex items-center gap-1.5"
            >
              <IoLogoGithub size={15} aria-hidden="true" />
              {project.repo.owner === "shondoe11" ? "Source" : `Source (${project.repo.owner})`}
            </a>
          </li>
          {live &&
            (live.status === "online" ? (
              <li>
                <a
                  href={live.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link inline-flex items-center gap-1.5"
                >
                  <ExternalLink size={15} strokeWidth={1.75} aria-hidden="true" />
                  Live
                </a>
              </li>
            ) : (
              <li className="inline-flex items-center gap-1.5 text-fg-faint">
                <span
                  aria-hidden="true"
                  className="inline-block size-1.5 rounded-full bg-fg-faint"
                />
                Live demo currently offline
              </li>
            ))}
        </ul>
      </div>
    </article>
  );
}
