import type { Metadata } from "next";
import { BreadcrumbsComponent } from "@/components/breadcrumbs";
import { TextCleanerComponent } from "@/components/text-cleaner/text-cleaner-component";
import { absoluteUrl, buildSocialMetadata, serializeJsonLd } from "@/lib/seo";

const path = "/tools/ai-text-cleaner/";
const description = "Inspect hidden characters, clean text with safer presets, and optionally remove emojis. Review every change. Free browser-only text cleanup from Exort.";
export const metadata: Metadata = {
  title: "AI Text Cleaner",
  description,
  alternates: { canonical: path },
  ...buildSocialMetadata({ title: "AI Text Cleaner", description, path }),
};

export default function CleanerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "AI Text Cleaner",
        description,
        url: absoluteUrl(path),
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires JavaScript",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Tools", item: absoluteUrl("/tools/") },
          { "@type": "ListItem", position: 3, name: "AI Text Cleaner", item: absoluteUrl(path) },
        ],
      },
    ],
  };
  return (
    <main className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
        <BreadcrumbsComponent items={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools/" }, { label: "AI Text Cleaner" }]} />
        <h1 className="mt-6 font-heading text-4xl font-bold tracking-tight text-ink">AI Text Cleaner</h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-body">Inspect hidden characters, choose what to clean, and review each change. Start with conservative cleanup or opt into punctuation and emoji removal.</p>
        <p className="mt-3 text-sm text-muted-foreground">No account. No text uploads. Cleanup runs in your browser and is not saved when you leave or reload.</p>
        <TextCleanerComponent />
        <section className="mt-12 max-w-3xl border-t border-border pt-8" aria-labelledby="about-cleaner">
          <h2 id="about-cleaner" className="font-heading text-2xl font-bold text-ink">What this tool does</h2>
          <div className="mt-4 space-y-4 leading-relaxed text-body">
            <p>Conservative cleanup preserves punctuation, joiners and emojis. It removes selected control characters and converts special spaces to ordinary spaces. Plain-text cleanup also replaces dash variations and curly quotes. Advanced rules and emoji removal are separate opt-ins.</p>
            <p>This is character cleanup, not an AI detector. It does not guarantee removal of AI watermarks or change whether a detector labels text as AI-generated. These characters can also appear in human-written text.</p>
            <p>Show hidden characters to inspect names, code points, positions and planned actions before cleaning. The change report highlights each actual edit. Emoji removal handles complete recognized sequences, not just individual symbols.</p>
            <p>This tool does not protect code blocks or inline code. Selected rules apply everywhere. Line breaks, tabs and Markdown backticks stay unchanged.</p>
            <p>Originally built as Exort. The sanitizer now lives here, with a lighter interface. Special spaces are replaced instead of deleted to keep words apart.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
