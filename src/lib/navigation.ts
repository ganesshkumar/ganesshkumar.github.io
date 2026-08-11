/**
 * Site navigation data — single source of truth for nav surfaces.
 * Aligned with the route map and navigation contract:
 * docs/content-and-information-architecture/route-map.md
 */

export type NavLink = {
  label: string;
  href: string;
  /** External links open in a new tab with a safe rel. */
  external?: boolean;
};

export const SITE = {
  name: "Ganessh Kumar",
  wordmark: "GK",
  logo: "/android-chrome-192x192.png",
  tagline: "Articles, projects, and notes on software engineering.",
  bio: "Software engineer at Microsoft. I build developer tools and write practical notes on full-stack development, distributed systems and AI agents.",
  home: "/",
  /** Canonical production origin (no trailing slash). Used for metadata, canonical URLs and structured data. */
  url: "https://www.ganesshkumar.com",
} as const;

/**
 * Fixed top navigation. Contract: exactly these five destinations.
 * The wordmark links home; secondary surfaces never enter the top nav.
 */
export const PRIMARY_NAV: NavLink[] = [
  { label: "Articles", href: "/articles" },
  { label: "Projects", href: "/projects" },
  { label: "Bookshelf", href: "/bookshelf" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Legal links live in the footer only. */
export const LEGAL_NAV: NavLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

/** External / social links. */
export const SOCIAL_NAV: NavLink[] = [
  { label: "GitHub", href: "https://github.com/ganesshkumar", external: true },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ganessh-kumar-r-p-676a4719",
    external: true,
  },
  { label: "X", href: "https://x.com/ganesshkumar", external: true },
  { label: "Email", href: "mailto:rpganesshkumar@gmail.com", external: true },
];

/** Footer: quick links to the primary destinations. */
export const FOOTER_QUICK_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Articles", href: "/articles" },
  { label: "Projects", href: "/projects" },
  { label: "Bookshelf", href: "/bookshelf" },
  { label: "About", href: "/about" },
];

/** Footer: article category filters. */
export const FOOTER_CATEGORIES: NavLink[] = [
  { label: "Tech", href: "/articles?category=tech" },
  { label: "Programming", href: "/articles?category=programming" },
  { label: "Tutorials", href: "/articles?category=tutorials" },
  { label: "Reviews", href: "/articles?category=reviews" },
];

/** Footer meta row: related sites and legal pages. */
export const FOOTER_META_NAV: NavLink[] = [
  { label: "CodeBuss", href: "https://codebuss.com", external: true },
  {
    label: "ObsidianStats",
    href: "https://www.obsidianstats.com",
    external: true,
  },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
];
