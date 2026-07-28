import { SectionHeaderComponent } from "@/components/section-header";
import { ProjectCardComponent } from "@/components/project-card";
import type { ProjectSummary } from "@/lib/content";

export type ProjectGridComponentProps = {
  projects: ProjectSummary[];
  title?: string;
  description?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
};

export function ProjectGridComponent({
  projects,
  title = "Projects",
  description,
  viewAllHref = "/projects",
  viewAllLabel = "All Projects",
}: ProjectGridComponentProps) {
  if (projects.length === 0) return null;

  return (
    <section aria-labelledby="projects-heading">
      <SectionHeaderComponent
        title={title}
        description={description}
        headingId="projects-heading"
        action={{ label: viewAllLabel, href: viewAllHref }}
      />
      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <li key={project.slug} className="h-full">
            <ProjectCardComponent project={project} className="h-full" />
          </li>
        ))}
      </ul>
    </section>
  );
}
