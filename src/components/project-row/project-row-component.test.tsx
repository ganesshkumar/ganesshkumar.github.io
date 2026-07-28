import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectRowComponent } from "./project-row-component";
import type { ProjectSummary } from "@/lib/content";

const featured: ProjectSummary = {
  slug: "obsidian-stats",
  title: "Obsidian Stats",
  description: "Explore and analyze the Obsidian plugin ecosystem.",
  problem:
    "There was no simple way to explore the Obsidian plugin ecosystem.",
  outcome: "A public directory and analytics site for Obsidian plugins.",
  stack: ["Next.js", "TypeScript"],
  status: "shipped",
  featured: true,
  image: { src: "/assets/images/projects/obsidian-stats.png", alt: "Obsidian Stats" },
  iconImage: { src: "/assets/images/projects/icons/obsidian.png", alt: "Obsidian" },
  repoUrl: "https://github.com/ganesshkumar/obsidian-plugins-stats-ui",
  liveUrl: "https://www.obsidianstats.com",
};

const compact: ProjectSummary = {
  slug: "nathas",
  title: "Nathas",
  description: "A Slack bot that streams your team's song requests.",
  problem: "Sharing music with a team in Slack meant leaving the channel.",
  outcome: "A Slack music bot that placed 3rd at a hackathon.",
  stack: ["Node.js", "Slack API"],
  status: "shipped",
  repoUrl: "https://github.com/TeamSven/nathas",
};

describe("ProjectRowComponent", () => {
  it("links the featured title to the live site and opens it externally", () => {
    render(<ProjectRowComponent project={featured} />);
    const link = screen.getByRole("link", { name: featured.title });
    expect(link).toHaveAttribute("href", featured.liveUrl);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer");
  });

  it("falls back to the repository when there is no live URL", () => {
    render(<ProjectRowComponent project={{ ...featured, liveUrl: undefined }} />);
    expect(screen.getByRole("link", { name: featured.title })).toHaveAttribute(
      "href",
      featured.repoUrl,
    );
    expect(screen.getByRole("link", { name: /View code/i })).toHaveAttribute(
      "href",
      featured.repoUrl,
    );
  });

  it("leads the featured row with the problem and shows the outcome", () => {
    render(<ProjectRowComponent project={featured} />);
    expect(screen.getByText(featured.problem as string)).toBeInTheDocument();
    expect(screen.getByText(featured.outcome)).toBeInTheDocument();
  });

  it("renders the stack and status on the featured row", () => {
    render(<ProjectRowComponent project={featured} />);
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Shipped")).toBeInTheDocument();
  });

  it("renders both visit and code actions when both URLs exist", () => {
    render(<ProjectRowComponent project={featured} />);
    expect(screen.getByRole("link", { name: "Visit" })).toHaveAttribute(
      "href",
      featured.liveUrl,
    );
    expect(screen.getByRole("link", { name: "Code" })).toHaveAttribute(
      "href",
      featured.repoUrl,
    );
  });

  it("uses an h2 for the featured heading", () => {
    render(<ProjectRowComponent project={featured} />);
    expect(
      screen.getByRole("heading", { level: 2, name: featured.title }),
    ).toBeInTheDocument();
  });

  it("renders the compact variant with the description and an h3", () => {
    render(<ProjectRowComponent project={compact} variant="compact" />);
    expect(
      screen.getByRole("heading", { level: 3, name: compact.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(compact.description)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: compact.title })).toHaveAttribute(
      "href",
      compact.repoUrl,
    );
  });

  it("renders the title as plain text when the project has no links", () => {
    render(
      <ProjectRowComponent
        project={{ ...featured, liveUrl: undefined, repoUrl: undefined }}
      />,
    );
    expect(screen.queryByRole("link", { name: featured.title })).toBeNull();
    expect(
      screen.getByRole("heading", { level: 2, name: featured.title }),
    ).toBeInTheDocument();
  });
});
