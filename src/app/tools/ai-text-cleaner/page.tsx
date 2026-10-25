import type { Metadata } from "next";
import { BreadcrumbsComponent } from "@/components/breadcrumbs";
import { TextCleanerComponent } from "@/components/text-cleaner/text-cleaner-component";
import { absoluteUrl, buildSocialMetadata, serializeJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/navigation";
import { TEXT_CLEANER_EXAMPLES } from "@/lib/text-cleaner-examples";

const path = "/tools/ai-text-cleaner/";
const title = "AI Text Cleaner: Remove Hidden Characters & Emojis";
const description = "Remove hidden characters and emojis, normalize spaces and punctuation, and inspect every change. Free text cleanup in your browser. No signup or text uploads.";
const image = {
  url: absoluteUrl("/assets/images/tools/ai-text-cleaner-social.png"),
  alt: "AI Text Cleaner: inspect hidden characters, clean punctuation and optionally remove emojis. Free and private in your browser.",
  width: 1200,
  height: 630,
};
const social = buildSocialMetadata({ title, description, path });
export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: { ...social.openGraph, images: [image] },
  twitter: { ...social.twitter, card: "summary_large_image", images: [image] },
};

export default function CleanerPage() {
  const canonical = absoluteUrl(path);
  const personId = `${SITE.url}/#person`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: title,
        description,
        inLanguage: "en",
        isPartOf: { "@type": "WebSite", "@id": `${SITE.url}/#website`, url: `${SITE.url}/`, name: SITE.name },
        mainEntity: { "@id": `${canonical}#application` },
        breadcrumb: { "@id": `${canonical}#breadcrumb` },
      },
      {
        "@type": "WebApplication",
        "@id": `${canonical}#application`,
        mainEntityOfPage: { "@id": `${canonical}#webpage` },
        author: { "@id": personId },
        image: image.url,
        inLanguage: "en",
        featureList: [
          "Hidden character inspection",
          "Conservative and plain-text cleanup presets",
          "Optional emoji removal",
          "Space and punctuation normalization",
          "Change reports and before-and-after previews",
          "Local browser processing without text uploads",
        ],
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
        "@id": `${canonical}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Tools", item: absoluteUrl("/tools/") },
          { "@type": "ListItem", position: 3, name: "AI Text Cleaner", item: absoluteUrl(path) },
        ],
      },
      {
        "@type": "Person",
        "@id": personId,
        name: SITE.name,
        url: absoluteUrl("/about/"),
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
        <section className="mt-12 max-w-3xl border-t border-border pt-8" aria-labelledby="how-to-use">
          <h2 id="how-to-use" className="font-heading text-2xl font-bold text-ink">How to use AI Text Cleaner</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-6 leading-relaxed text-body">
            <li>Paste AI-generated or copied text into <strong>Original text</strong>.</li>
            <li>Start with conservative cleanup. Use <strong>Show hidden characters</strong> to inspect formatting. Select plain-text cleanup or enable individual rules only when needed. <strong>Remove emojis</strong> is off by default.</li>
            <li>Select <strong>Clean text</strong>, review the change report and before-and-after previews, then select <strong>Copy cleaned text</strong>.</li>
          </ol>
        </section>
        <section className="mt-10" aria-labelledby="cleanup-examples">
          <h2 id="cleanup-examples" className="font-heading text-2xl font-bold text-ink">Text cleanup examples</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-body">Hidden characters, punctuation and emojis need different rules. Each example shows the required option. The bracketed name makes an invisible character visible; it is not part of the copied output.</p>
          <div className="mt-4 overflow-x-auto" role="region" aria-label="Cleanup examples table" tabIndex={0}>
            <table aria-label="Text cleanup examples" className="w-full min-w-[36rem] border-collapse text-left text-sm text-body">
              <thead className="border-b border-border bg-surface"><tr>
                <th scope="col" className="p-3">Original text</th>
                <th scope="col" className="p-3">Cleaned text</th>
                <th scope="col" className="p-3">Selected rule</th>
              </tr></thead>
              <tbody>{TEXT_CLEANER_EXAMPLES.map((example) => <tr key={example.rule} className="border-b border-border">
                <td className="p-3"><code>{example.inputDisplay}</code></td>
                <td className="p-3"><code>{example.output}</code></td>
                <td className="p-3">{example.rule}</td>
              </tr>)}</tbody>
            </table>
          </div>
        </section>
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
