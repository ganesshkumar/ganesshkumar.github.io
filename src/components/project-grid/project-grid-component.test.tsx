import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectGridComponent } from "./project-grid-component";
import type { ProjectSummary } from "@/lib/content";

const projects: ProjectSummary[] = [
  {
    slug: "alpha",
    title: "Project Alpha",
    description: "Does alpha things.",
    outcome: "Shipped alpha.",
    repoUrl: "https://github.com/example/alpha",
  },
  {
    slug: "beta",
    title: "Project Beta",
    description: "Does beta things.",
    outcome: "Shipped beta.",
    liveUrl: "https://beta.example.com",
    repoUrl: "https://github.com/example/beta",
  },
];

describe("ProjectGridComponent", () => {
  it("renders the section heading", () => {
    render(<ProjectGridComponent projects={projects} />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Projects" }),
    ).toBeInTheDocument();
  });

  it("links each project title to its primary URL", () => {
    render(<ProjectGridComponent projects={projects} />);
    expect(screen.getByRole("link", { name: "Project Alpha" })).toHaveAttribute(
      "href",
      "https://github.com/example/alpha",
    );
    expect(screen.getByRole("link", { name: "Project Beta" })).toHaveAttribute(
      "href",
      "https://beta.example.com",
    );
  });

  it("renders an all-projects action", () => {
    render(<ProjectGridComponent projects={projects} />);
    expect(
      screen.getByRole("link", { name: /all projects/i }),
    ).toHaveAttribute("href", "/projects");
  });

  it("renders nothing when there are no projects", () => {
    const { container } = render(<ProjectGridComponent projects={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
