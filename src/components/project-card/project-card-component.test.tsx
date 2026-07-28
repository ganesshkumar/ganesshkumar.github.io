import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectCardComponent } from "./project-card-component";
import type { ProjectSummary } from "@/lib/content";

const project: ProjectSummary = {
  slug: "pi-hole-azure",
  title: "Pi-hole on Azure Container Instances",
  description: "Network-wide ad blocking without a home server.",
  outcome: "Cut ads on every device for about $3/month.",
  stack: ["Azure", "Docker"],
  status: "shipped",
  repoUrl: "https://github.com/ganesshkumar/pi-hole-azure",
  liveUrl: "https://pi-hole.example.com",
};

describe("ProjectCardComponent", () => {
  it("links the title to the live site, opening it externally", () => {
    render(<ProjectCardComponent project={project} />);
    const link = screen.getByRole("link", { name: project.title });
    expect(link).toHaveAttribute("href", project.liveUrl);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer");
  });

  it("falls back to the repository when there is no live URL", () => {
    render(<ProjectCardComponent project={{ ...project, liveUrl: undefined }} />);
    expect(screen.getByRole("link", { name: project.title })).toHaveAttribute(
      "href",
      project.repoUrl,
    );
  });

  it("renders the description", () => {
    render(<ProjectCardComponent project={project} />);
    expect(
      screen.getByText(/Network-wide ad blocking/i),
    ).toBeInTheDocument();
  });

  it("links to the live site and the repository", () => {
    render(<ProjectCardComponent project={project} />);
    expect(screen.getByRole("link", { name: "Visit" })).toHaveAttribute(
      "href",
      project.liveUrl,
    );
    expect(screen.getByRole("link", { name: /GitHub/i })).toHaveAttribute(
      "href",
      project.repoUrl,
    );
  });

  it("omits the live link when there is no live URL", () => {
    render(
      <ProjectCardComponent project={{ ...project, liveUrl: undefined }} />,
    );
    expect(screen.queryByRole("link", { name: "Visit" })).toBeNull();
  });

  it("renders the requested heading level", () => {
    render(<ProjectCardComponent project={project} headingLevel={2} />);
    expect(
      screen.getByRole("heading", { level: 2, name: project.title }),
    ).toBeInTheDocument();
  });
});
