import Link from "next/link";
import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { SOCIAL_ICONS } from "@/lib/social-icons";
import type { NavLink } from "@/lib/navigation";

type FooterBrand = {
  name: string;
  bio: string;
};

export type FooterComponentProps = {
  brand: FooterBrand;
  quickLinks: NavLink[];
  categories: NavLink[];
  socialLinks: NavLink[];
  metaLinks: NavLink[];
  contactHref: string;
  year: number;
};

function externalProps(link: NavLink) {
  return link.external ? { target: "_blank", rel: "noreferrer" } : {};
}

function FooterLink({ link }: { link: NavLink }) {
  return (
    <Link
      href={link.href}
      {...externalProps(link)}
      className="text-sm text-muted-foreground no-underline transition-colors hover:text-brand"
    >
      {link.label}
    </Link>
  );
}

function FooterColumn({ title, links }: { title: string; links: NavLink[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-heading text-base font-bold text-ink">{title}</h2>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <FooterLink link={link} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FooterComponent({
  brand,
  quickLinks,
  categories,
  socialLinks,
  metaLinks,
  contactHref,
  year,
}: FooterComponentProps) {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <h2 className="font-heading text-base font-bold text-ink">
            {brand.name}
          </h2>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            {brand.bio}
          </p>
          <ul className="flex items-center gap-1">
            {socialLinks.map((social) => {
              const Icon = SOCIAL_ICONS[social.label] ?? Mail;
              return (
                <li key={social.href}>
                  <Link
                    href={social.href}
                    {...externalProps(social)}
                    aria-label={social.label}
                    className="inline-flex size-9 items-center justify-center rounded-md text-body transition-colors hover:text-brand"
                  >
                    <Icon className="size-4" aria-hidden />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <FooterColumn title="Quick Links" links={quickLinks} />
        <FooterColumn title="Categories" links={categories} />

        <div className="flex flex-col gap-4">
          <h2 className="font-heading text-base font-bold text-ink">
            Get in Touch
          </h2>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Have a question or want to collaborate? Feel free to reach out.
          </p>
          <Link href={contactHref} className={cn(buttonVariants(), "w-full")}>
            <Mail className="size-4" aria-hidden />
            Contact Me
          </Link>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row sm:px-6">
          <p className="text-sm text-muted-foreground">
            © 2013-{year} {brand.name}.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {metaLinks.map((link) => (
              <li key={link.href}>
                <FooterLink link={link} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
