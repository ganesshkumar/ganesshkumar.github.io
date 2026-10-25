import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { TEXT_CLEANER_EXAMPLES } from "@/lib/text-cleaner-examples";
import { cleanText } from "@/lib/text-cleaner";
import CleanerPage, { metadata } from "./page";

const title = "AI Text Cleaner: Remove Hidden Characters & Emojis";
const image = {
  url: "https://www.ganesshkumar.com/assets/images/tools/ai-text-cleaner-social.png",
  alt: "AI Text Cleaner: inspect hidden characters, clean punctuation and optionally remove emojis. Free and private in your browser.",
  width: 1200,
  height: 630,
};

describe("AI Text Cleaner SEO", () => {
  it("ships the social PNG at its declared dimensions", () => {
    const bytes = readFileSync(path.join(process.cwd(), "public/assets/images/tools/ai-text-cleaner-social.png"));
    expect(bytes.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
    expect(bytes.readUInt32BE(16)).toBe(image.width);
    expect(bytes.readUInt32BE(20)).toBe(image.height);
  });
  it("renders crawlable instructions and examples verified against the real cleaner", () => {
    render(<CleanerPage />);
    const howTo = screen.getByRole("region", { name: "How to use AI Text Cleaner" });
    expect(within(howTo).getAllByRole("listitem")).toHaveLength(3);
    expect(howTo).toHaveTextContent("Original text");
    expect(howTo).toHaveTextContent("Clean text");
    expect(howTo).toHaveTextContent("Copy cleaned text");
    const table = screen.getByRole("table", { name: "Text cleanup examples" });
    expect(within(table).getAllByRole("row")).toHaveLength(TEXT_CLEANER_EXAMPLES.length + 1);
    for (const example of TEXT_CLEANER_EXAMPLES) {
      expect(cleanText(example.input, example.options).text).toBe(example.output);
      expect(table).toHaveTextContent(example.inputDisplay);
      expect(table).toHaveTextContent(example.output);
      expect(table).toHaveTextContent(example.rule);
    }
  });
  it("links page, application, author and breadcrumbs without ratings or reviews", () => {
    const { container } = render(<CleanerPage />);
    const raw = container.querySelector('script[type="application/ld+json"]')?.textContent;
    expect(raw).toBeTruthy();
    const json = JSON.parse(raw!);
    const graph = json["@graph"] as Record<string, unknown>[];
    const url = "https://www.ganesshkumar.com/tools/ai-text-cleaner/";
    expect(graph.find((node) => node["@type"] === "WebPage")).toMatchObject({
      "@id": `${url}#webpage`, url, name: title, inLanguage: "en",
      mainEntity: { "@id": `${url}#application` },
      breadcrumb: { "@id": `${url}#breadcrumb` },
    });
    expect(graph.find((node) => node["@type"] === "WebApplication")).toMatchObject({
      "@id": `${url}#application`, url, name: "AI Text Cleaner",
      mainEntityOfPage: { "@id": `${url}#webpage` },
      author: { "@id": "https://www.ganesshkumar.com/#person" },
      image: image.url, featureList: expect.arrayContaining(["Hidden character inspection", "Optional emoji removal"]),
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    });
    expect(graph.find((node) => node["@type"] === "Person")).toMatchObject({ name: "Ganessh Kumar" });
    expect(graph.find((node) => node["@type"] === "BreadcrumbList")).toHaveProperty("@id", `${url}#breadcrumb`);
    expect(raw).not.toMatch(/aggregateRating|ratingValue|"review"|"Review"|"FAQPage"/);
  });
  it("uses a descriptive title and a dedicated large social preview", () => {
    expect(metadata.title).toEqual({ absolute: title });
    expect(metadata.description).toContain("hidden characters");
    expect(metadata.description).toContain("emojis");
    expect(metadata.alternates?.canonical).toBe("/tools/ai-text-cleaner/");
    expect(metadata.openGraph).toMatchObject({ title, images: [image] });
    expect(metadata.twitter).toMatchObject({ title, card: "summary_large_image", images: [image] });
  });
});
