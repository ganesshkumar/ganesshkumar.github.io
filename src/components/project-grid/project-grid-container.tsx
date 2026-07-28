import { getRecentProjects } from "@/lib/home-content";
import { ProjectGridComponent } from "./project-grid-component";

/**
 * Selects recent projects and renders the presentational card grid.
 * Data currently comes from seed content; swap the accessor for the
 * real project source when it lands.
 */
export function ProjectGridContainer() {
  return (
    <ProjectGridComponent
      projects={getRecentProjects()}
      description="Things I have built and shipped."
    />
  );
}
