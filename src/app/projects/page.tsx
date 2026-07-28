import type { Metadata } from "next";
import { ArchiveHeaderComponent } from "@/components/archive-header";
import { SectionHeaderComponent } from "@/components/section-header";
import { ProjectRowComponent } from "@/components/project-row";
import { ReadingCtaComponent } from "@/components/reading-cta";
import { getShowcaseProjects } from "@/lib/home-content";
import { buildProjectsJsonLd, buildSocialMetadata, serializeJsonLd } from "@/lib/seo";

const description =
  "The tools, plugins and experiments I have built. Each one says what it does, the problem it solves and where the code lives.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects" },
  ...buildSocialMetadata({ title: "Projects", description, path: "/projects" }),
};

export default function ProjectsPage() {
  const projects = getShowcaseProjects();
  const featured = projects.filter((project) => project.featured);
  const more = projects.filter((project) => !project.featured);
  const jsonLd = buildProjectsJsonLd(projects, description);

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
        <ArchiveHeaderComponent title="Projects">
          <p>
            These are the things I build when an itch needs scratching: Obsidian
            plugins I use daily, a Slack bot, a computer wired up from NAND
            gates. Each one below says what it does, the problem it solves and
            where the code lives. There are no separate case-study pages, so the
            story sits right here.
          </p>
        </ArchiveHeaderComponent>

        {featured.length > 0 ? (
          <section
            aria-label="Featured projects"
            className="mt-12 divide-y divide-border/50"
          >
            {featured.map((project) => (
              <ProjectRowComponent
                key={project.slug}
                project={project}
                variant="featured"
                className="py-10 first:pt-0 last:pb-0"
              />
            ))}
          </section>
        ) : null}

        {more.length > 0 ? (
          <section aria-labelledby="more-projects-heading" className="mt-16">
            <SectionHeaderComponent
              title="More projects"
              headingId="more-projects-heading"
              description="A few more things I have built."
            />
            <ul className="mt-6 divide-y divide-border/50 border-y border-border/50">
              {more.map((project) => (
                <li key={project.slug} className="py-6">
                  <ProjectRowComponent project={project} variant="compact" />
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <ReadingCtaComponent
          className="mt-16"
          title="More of how I think"
          description="Most of these started as something I wrote about. The articles are where I work through the problems in detail."
          primaryCta={{ label: "Read the articles", href: "/articles" }}
          secondaryCta={{ label: "About me", href: "/about" }}
        />
      </div>
    </main>
  );
}
