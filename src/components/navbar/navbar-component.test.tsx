import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NavbarComponent, type NavbarComponentProps } from "./navbar-component";
import type { NavLink } from "@/lib/navigation";

const links: NavLink[] = [
  { label: "Articles", href: "/articles" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const brand = { name: "Ganessh Kumar", wordmark: "GK", home: "/" };

function renderNavbar(overrides: Partial<NavbarComponentProps> = {}) {
  const onToggleMenu = vi.fn();
  render(
    <NavbarComponent
      brand={brand}
      links={links}
      activePath="/articles"
      isMenuOpen={false}
      onToggleMenu={onToggleMenu}
      {...overrides}
    />,
  );
  return { onToggleMenu };
}

describe("NavbarComponent", () => {
  it("renders the brand wordmark linking home", () => {
    renderNavbar();
    const brandLink = screen.getByRole("link", { name: /home/i });
    expect(brandLink).toHaveAttribute("href", "/");
    expect(brandLink).toHaveTextContent("GK");
  });

  it("renders every primary link with its href", () => {
    renderNavbar();
    for (const link of links) {
      const anchor = screen.getAllByRole("link", { name: link.label })[0];
      expect(anchor).toHaveAttribute("href", link.href);
    }
  });

  it("marks the active link with aria-current", () => {
    renderNavbar({ activePath: "/projects" });
    const active = screen.getAllByRole("link", { name: "Projects" })[0];
    expect(active).toHaveAttribute("aria-current", "page");
    const inactive = screen.getAllByRole("link", { name: "About" })[0];
    expect(inactive).not.toHaveAttribute("aria-current");
  });

  it("treats nested routes as active for the parent link", () => {
    renderNavbar({ activePath: "/articles/some-post" });
    const active = screen.getAllByRole("link", { name: "Articles" })[0];
    expect(active).toHaveAttribute("aria-current", "page");
  });

  it("calls onToggleMenu when the menu button is pressed", async () => {
    const { onToggleMenu } = renderNavbar();
    await userEvent.click(screen.getByRole("button", { name: /toggle menu/i }));
    expect(onToggleMenu).toHaveBeenCalledTimes(1);
  });

  it("exposes an accessible primary navigation landmark", () => {
    renderNavbar();
    expect(
      screen.getByRole("navigation", { name: "Primary" }),
    ).toBeInTheDocument();
  });
});
