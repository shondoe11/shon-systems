import type { Metadata } from "next";
import Link from "next/link";
import { FileText } from "lucide-react";
import { HomeEffects } from "@/components/effects/home-effects";
import { ExperienceItem } from "@/components/experience-item";
import { ProfileOrbit } from "@/components/profile-orbit";
import { ProjectCard } from "@/components/project-card";
import { HeroName } from "@/components/hero-name";
import { Section } from "@/components/section";
import { SocialLoop } from "@/components/social-loop";
import { about, featuredProjects, roles } from "@/lib/content";
import { site, socials } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${site.name} — ${site.role} in ${site.location}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} — ${site.role} in ${site.location}`,
    description: site.description,
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <HomeEffects />
      <div className="space-y-24 pb-8 pt-12 md:space-y-32 md:pt-20">
        <section
          aria-label="Introduction"
          className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8"
        >
          <div className="order-last lg:order-0 lg:col-span-4 lg:col-start-9 lg:justify-self-end">
            <ProfileOrbit />
          </div>

          <div className="space-y-8 lg:col-span-8 lg:col-start-1 lg:row-start-1">
            <HeroName name={site.name} />
            <div className="max-w-measure space-y-5">
              <p className="font-display text-xl leading-snug md:text-2xl">
                {site.role} in {site.location}. Before that, eight years
                shipping music products and campaigns at Sony Music, Huawei and
                YouTube Music.
              </p>
              <p className="leading-relaxed text-fg-muted">{site.tagline}</p>
              <p className="inline-flex items-center gap-2.5 text-sm">
                <span
                  aria-hidden="true"
                  className="relative grid size-2 place-items-center"
                >
                  <span className="animate-pulse-ring absolute inset-0 rounded-full bg-status" />
                  <span className="relative size-2 rounded-full bg-status shadow-[0_0_8px_var(--status),0_0_18px_var(--status)]" />
                </span>
                Open to software engineering roles
              </p>
            </div>
            <div className="max-w-measure">
              <SocialLoop />
            </div>
          </div>
        </section>

        <Section id="about" title="About">
          <div className="max-w-measure space-y-5 leading-relaxed text-fg-muted">
            {about.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </Section>

        <Section id="experience" title="Experience">
          <div className="divide-y divide-hairline">
            {roles.map((role) => (
              <ExperienceItem key={role.company} role={role} />
            ))}
          </div>
          <p className="mt-10 text-sm">
            <a
              href={socials.resume.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link inline-flex items-center gap-1.5"
            >
              <FileText size={15} strokeWidth={1.75} aria-hidden="true" />
              Full résumé
            </a>
          </p>
        </Section>

        <Section
          id="projects"
          title="Recent projects"
          aside={<p>Always building.</p>}
        >
          <div className="divide-y divide-hairline">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <p className="mt-10 text-sm">
            <Link href="/projects" className="link">
              See all projects
            </Link>
          </p>
        </Section>
      </div>
    </>
  );
}
