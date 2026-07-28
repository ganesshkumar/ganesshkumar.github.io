import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FooterComponent } from "./footer-component";
import type { NavLink } from "@/lib/navigation";

const quickLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Articles", href: "/articles" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
];

const categories: NavLink[] = [
  { label: "Tech", href: "/articles?category=tech" },
  { label: "Programming", href: "/articles?category=programming" },
];

const socialLinks: NavLink[] = [
  { label: "GitHub", href: "https://github.com/ganesshkumar", external: true },
  { label: "Email", href: "mailto:rpganesshkumar@gmail.com", external: true },
];

const metaLinks: NavLink[] = [
  { label: "CodeBuss", href: "https://codebuss.com", external: true },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
];

const brand = {
  name: "Ganessh Kumar",
  bio: "Software engineer at Microsoft building developer tools.",
};

function renderFooter() {
  render(
    <FooterComponent
      brand={brand}
      quickLinks={quickLinks}
      categories={categories}
      socialLinks={socialLinks}
      metaLinks={metaLinks}
      contactHref="/contact"
      year={2026}
    />,
  );
}

describe("FooterComponent", () => {
  it("renders a contentinfo landmark", () => {
    renderFooter();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("renders quick links with canonical hrefs", () => {
    renderFooter();
    for (const link of quickLinks) {
      expect(screen.getByRole("link", { name: link.label })).toHaveAttribute(
        "href",
        link.href,
      );
    }
  });

  it("renders category links", () => {
    renderFooter();
    expect(screen.getByRole("link", { name: "Tech" })).toHaveAttribute(
      "href",
      "/articles?category=tech",
    );
  });

  it("labels social icon links and opens them safely", () => {
    renderFooter();
    const github = screen.getByRole("link", { name: "GitHub" });
    expect(github).toHaveAttribute("href", "https://github.com/ganesshkumar");
    expect(github).toHaveAttribute("target", "_blank");
    expect(github).toHaveAttribute("rel", "noreferrer");
  });

  it("renders a contact call to action", () => {
    renderFooter();
    expect(screen.getByRole("link", { name: /contact me/i })).toHaveAttribute(
      "href",
      "/contact",
    );
  });

  it("renders meta links", () => {
    renderFooter();
    expect(screen.getByRole("link", { name: "CodeBuss" })).toHaveAttribute(
      "href",
      "https://codebuss.com",
    );
    expect(
      screen.getByRole("link", { name: "Privacy Policy" }),
    ).toHaveAttribute("href", "/privacy");
  });

  it("shows the copyright range with the site name", () => {
    renderFooter();
    expect(
      screen.getByText(/© 2013-2026 Ganessh Kumar\./),
    ).toBeInTheDocument();
  });
});
