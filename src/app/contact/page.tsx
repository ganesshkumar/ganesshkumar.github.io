import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail } from "lucide-react";
import { IntroComponent } from "@/components/intro";
import { SectionHeaderComponent } from "@/components/section-header";
import { ContactFormComponent } from "@/components/contact-form";
import { SOCIAL_NAV } from "@/lib/navigation";
import { buildSocialMetadata } from "@/lib/seo";

const EMAIL = "rpganesshkumar@gmail.com";

const description =
  "Get in touch with Ganessh Kumar. Reach out with a general question, a collaboration idea, a speaking invitation or feedback on an article.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  ...buildSocialMetadata({ title: "Contact Ganessh Kumar", description, path: "/contact" }),
};

export default function ContactPage() {
  return (
    <main className="flex-1">
      <IntroComponent title="Get in touch" socials={SOCIAL_NAV}>
        <p>
          Have a question, a collaboration idea, a speaking invitation or
          feedback on something I wrote? I would like to hear it. Use the form
          below or email me directly, whichever is easier for you.
        </p>
      </IntroComponent>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 pb-16 sm:px-6">
        <section aria-labelledby="message-heading" className="flex flex-col gap-6">
          <SectionHeaderComponent
            title="Send me a message"
            headingId="message-heading"
            description="Tell me a little about what you need. Required fields are marked."
          />
          <ContactFormComponent />

          <div className="flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:gap-6">
            <p className="inline-flex items-center gap-2">
              <Clock className="size-4 text-brand" aria-hidden />
              I usually reply within a couple of days.
            </p>
            <p className="inline-flex items-center gap-2">
              <Mail className="size-4 text-brand" aria-hidden />
              Prefer email?{" "}
              <Link
                href={`mailto:${EMAIL}`}
                className="font-medium text-link no-underline hover:underline"
              >
                {EMAIL}
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
