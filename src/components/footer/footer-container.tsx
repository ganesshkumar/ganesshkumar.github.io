import {
  SITE,
  FOOTER_QUICK_LINKS,
  FOOTER_CATEGORIES,
  SOCIAL_NAV,
  FOOTER_META_NAV,
} from "@/lib/navigation";
import { FooterComponent } from "./footer-component";

/**
 * Assembles footer link data and the current year, then renders the
 * presentational footer. No client state is needed, so this stays a
 * server component (the year is resolved at build time for the export).
 */
export function FooterContainer() {
  return (
    <FooterComponent
      brand={{ name: SITE.name, bio: SITE.bio }}
      quickLinks={FOOTER_QUICK_LINKS}
      categories={FOOTER_CATEGORIES}
      socialLinks={SOCIAL_NAV}
      metaLinks={FOOTER_META_NAV}
      contactHref="/contact"
      year={new Date().getFullYear()}
    />
  );
}
