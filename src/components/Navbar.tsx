"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface NavLink {
  url: string;
  text: string;
}

interface NavbarProps {
  links: NavLink[];
  logo?: React.ReactNode;
  /**
   * The current page url (pathname). Used to highlight the active link.
   * For static sites, pass the current pathname from the page.
   */
  currentUrl?: string;
}

const THEME_KEY = "theme";


export const Navbar: React.FC<NavbarProps> = ({ links, logo, currentUrl: currentUrlProp }) => {
  const [theme, setTheme] = useState<string | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string | undefined>(currentUrlProp);

  // Read theme and infer currentUrl if not provided
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Theme
      const stored = localStorage.getItem(THEME_KEY);
      if (stored) {
        setTheme(stored);
        document.documentElement.classList.toggle("dark", stored === "dark");
      } else {
        // Default to system preference
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setTheme(prefersDark ? "dark" : "light");
        document.documentElement.classList.toggle("dark", prefersDark);
      }
      // Infer currentUrl if not provided
      if (!currentUrlProp) {
        setCurrentUrl(window.location.pathname);
      }
    }
  }, [currentUrlProp]);

  // Toggle theme and persist
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem(THEME_KEY, newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    }
  };

  return (
    <nav className="w-full flex items-center justify-between px-4 py-2 bg-background">
      {/* Logo */}
      <div className="flex items-center min-w-[48px]">
        <Link href="/" className="flex items-center">
          {logo}
        </Link>
      </div>
      {/* Links */}
      <ul className="flex-1 flex justify-center gap-6">
        {links.map((link) => (
          <li key={link.url}>
            <Link
              href={link.url}
              className={
                "px-3 py-1 rounded transition-colors " +
                (currentUrl === link.url
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "hover:bg-muted text-muted-foreground")
              }
              aria-current={currentUrl === link.url ? "page" : undefined}
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
      {/* Theme Toggle */}
      {/* <Button
        onClick={toggleTheme}
        className="ml-4"
        aria-label="Toggle dark/light mode"
        variant="ghost"
      >
        {theme === "dark" ? "🌙" : "☀️"}
      </Button> */}
    </nav>
  );
};

export default Navbar;
