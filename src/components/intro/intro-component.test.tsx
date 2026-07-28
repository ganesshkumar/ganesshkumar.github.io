import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { IntroComponent } from "./intro-component";
import type { NavLink } from "@/lib/navigation";

const socials: NavLink[] = [
  { label: "GitHub", href: "https://github.com/ganesshkumar", external: true },
];

describe("IntroComponent", () => {
  it("renders the greeting as the page heading", () => {
    render(
      <IntroComponent title="Hey, I'm Ganessh" tagline="tag" socials={socials}>
        <p>Intro</p>
      </IntroComponent>,
    );
    expect(
      screen.getByRole("heading", { level: 1, name: "Hey, I'm Ganessh" }),
    ).toBeInTheDocument();
  });

  it("renders the tagline and prose", () => {
    render(
      <IntroComponent
        title="Hi"
        tagline="Full-stack engineering"
        socials={socials}
      >
        <p>Intro prose here</p>
      </IntroComponent>,
    );
    expect(screen.getByText("Full-stack engineering")).toBeInTheDocument();
    expect(screen.getByText("Intro prose here")).toBeInTheDocument();
  });

  it("renders social links that open safely in a new tab", () => {
    render(
      <IntroComponent title="Hi" tagline="t" socials={socials}>
        <p>x</p>
      </IntroComponent>,
    );
    const gh = screen.getByRole("link", { name: "GitHub" });
    expect(gh).toHaveAttribute("href", "https://github.com/ganesshkumar");
    expect(gh).toHaveAttribute("target", "_blank");
    expect(gh).toHaveAttribute("rel", "noreferrer");
  });
});
