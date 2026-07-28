"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { PRIMARY_NAV, SITE } from "@/lib/navigation";
import { NavbarComponent } from "./navbar-component";

/**
 * Wires routing state (active path) and the mobile menu toggle,
 * then renders the presentational navbar.
 */
export function NavbarContainer() {
  const pathname = usePathname() ?? "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <NavbarComponent
      brand={{ name: SITE.name, wordmark: SITE.wordmark, home: SITE.home }}
      links={PRIMARY_NAV}
      activePath={pathname}
      isMenuOpen={isMenuOpen}
      onToggleMenu={() => setIsMenuOpen((open) => !open)}
    />
  );
}
