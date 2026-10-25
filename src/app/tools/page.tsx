import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbsComponent } from "@/components/breadcrumbs";
import { buildSocialMetadata } from "@/lib/seo";

const description = "Small browser tools for everyday text and development tasks. No account needed.";
export const metadata: Metadata = {
  title: "Tools",
  description,
  alternates: { canonical: "/tools/" },
  ...buildSocialMetadata({ title: "Tools", description, path: "/tools/" }),
};

export default function ToolsPage() {
  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
        <BreadcrumbsComponent items={[{ label: "Home", href: "/" }, { label: "Tools" }]} />
        <h1 className="mt-6 font-heading text-4xl font-bold tracking-tight text-ink">Tools</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-body">{description}</p>
        <ul className="mt-10 divide-y divide-border border-y border-border">
          <li className="py-6">
            <h2 className="font-heading text-2xl font-bold"><Link href="/tools/ai-text-cleaner/">AI Text Cleaner</Link></h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-body">Remove invisible characters and normalize spaces, dashes and quotes. Choose the cleanup rules, compare the result and copy it. Your text stays in your browser.</p>
          </li>
        </ul>
      </div>
    </main>
  );
}
