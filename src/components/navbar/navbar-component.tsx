"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavLink } from "@/lib/navigation";

type NavbarBrand = {
  name: string;
  wordmark: string;
  logo: string;
  home: string;
};

export type NavbarComponentProps = {
  brand: NavbarBrand;
  links: NavLink[];
  activePath: string;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
};

function isActiveLink(activePath: string, href: string): boolean {
  if (href === "/") return activePath === "/";
  return activePath === href || activePath.startsWith(`${href}/`);
}

function linkClasses(active: boolean, block = false): string {
  return cn(
    "px-3 py-2 text-sm font-medium no-underline decoration-2 underline-offset-[6px] transition-colors",
    block && "block",
    active
      ? "text-brand underline decoration-brand"
      : "text-body hover:text-ink hover:underline hover:decoration-brand",
  );
}

export function NavbarComponent({
  brand,
  links,
  activePath,
  isMenuOpen,
  onToggleMenu,
}: NavbarComponentProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-paper/90 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 sm:px-6"
      >
        <Link
          href={brand.home}
          aria-label={`${brand.name} — home`}
          className="inline-flex items-center gap-2 font-heading text-lg font-bold tracking-tight text-ink no-underline"
        >
          <Image
            src={brand.logo}
            alt=""
            width={36}
            height={36}
            priority
            className="size-9"
          />
          <span>{brand.wordmark}</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = isActiveLink(activePath, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={linkClasses(active)}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={onToggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="primary-menu"
          aria-label="Toggle menu"
          className="inline-flex items-center justify-center rounded-md p-2 text-body transition-colors hover:bg-surface hover:text-ink md:hidden"
        >
          {isMenuOpen ? (
            <X className="size-5" aria-hidden />
          ) : (
            <Menu className="size-5" aria-hidden />
          )}
        </button>
      </nav>

      <div
        id="primary-menu"
        hidden={!isMenuOpen}
        className="border-t border-border md:hidden"
      >
        <ul className="mx-auto flex w-full max-w-5xl flex-col px-4 py-2 sm:px-6">
          {links.map((link) => {
            const active = isActiveLink(activePath, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={linkClasses(active, true)}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
