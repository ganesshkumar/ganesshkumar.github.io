import rawSeries from "@/content/series.json";
import type {
  SeriesDefinition,
  VisualDeck,
  VisualDeckCard,
} from "@/lib/content";

function requiredString(
  value: unknown,
  field: string,
  source: string,
): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${source} requires a non-empty ${field}`);
  }
  return value.trim();
}

function parseDeckCard(
  value: unknown,
  source: string,
): VisualDeckCard {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${source} must be an object`);
  }
  const card = value as Record<string, unknown>;
  const image = card.image;
  if (!image || typeof image !== "object" || Array.isArray(image)) {
    throw new Error(`${source}.image must be an object`);
  }
  const imageRecord = image as Record<string, unknown>;
  const relatedArticleSlug =
    card.relatedArticleSlug === undefined
      ? undefined
      : requiredString(
          card.relatedArticleSlug,
          "relatedArticleSlug",
          source,
        );

  return {
    id: requiredString(card.id, "id", source),
    title: requiredString(card.title, "title", source),
    image: {
      src: requiredString(imageRecord.src, "image.src", source),
      alt: requiredString(imageRecord.alt, "image.alt", source),
    },
    ...(relatedArticleSlug ? { relatedArticleSlug } : {}),
  };
}

function parseVisualDeck(value: unknown, source: string): VisualDeck | undefined {
  if (value === undefined) return undefined;
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${source}.visualDeck must be an object`);
  }
  const deck = value as Record<string, unknown>;
  if (!Array.isArray(deck.cards) || deck.cards.length === 0) {
    throw new Error(`${source}.visualDeck.cards must contain at least one card`);
  }
  const cards = deck.cards.map((card, index) =>
    parseDeckCard(card, `${source}.visualDeck.cards[${index}]`),
  );
  const ids = new Set<string>();
  for (const card of cards) {
    if (ids.has(card.id)) {
      throw new Error(`${source}.visualDeck has duplicate card id "${card.id}"`);
    }
    ids.add(card.id);
  }
  return {
    title: requiredString(deck.title, "visualDeck.title", source),
    cards,
  };
}

function parseSeriesDefinition(
  value: unknown,
  index: number,
): SeriesDefinition {
  const source = `series[${index}]`;
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${source} must be an object`);
  }
  const data = value as Record<string, unknown>;
  const status = data.status;
  if (status !== "ongoing" && status !== "complete") {
    throw new Error(`${source}.status must be "ongoing" or "complete"`);
  }
  if (data.featured !== undefined && typeof data.featured !== "boolean") {
    throw new Error(`${source}.featured must be a boolean`);
  }
  const visualDeck = parseVisualDeck(data.visualDeck, source);
  let project: SeriesDefinition["project"];
  if (data.project !== undefined) {
    if (
      !data.project ||
      typeof data.project !== "object" ||
      Array.isArray(data.project)
    ) {
      throw new Error(`${source}.project must be an object`);
    }
    const projectData = data.project as Record<string, unknown>;
    project = {
      name: requiredString(projectData.name, "project.name", source),
      description: requiredString(
        projectData.description,
        "project.description",
        source,
      ),
      url: requiredString(projectData.url, "project.url", source),
    };
  }

  return {
    name: requiredString(data.name, "name", source),
    slug: requiredString(data.slug, "slug", source),
    description: requiredString(data.description, "description", source),
    status,
    ...(data.featured ? { featured: true } : {}),
    ...(project ? { project } : {}),
    ...(visualDeck ? { visualDeck } : {}),
  };
}

const definitions = (rawSeries as unknown[]).map(parseSeriesDefinition);
const slugs = new Set<string>();
let featuredCount = 0;

for (const definition of definitions) {
  if (slugs.has(definition.slug)) {
    throw new Error(`Duplicate series slug "${definition.slug}"`);
  }
  slugs.add(definition.slug);
  if (definition.featured) featuredCount += 1;
}

if (featuredCount > 1) {
  throw new Error("Only one series can be featured");
}

export function getSeriesDefinitions(): SeriesDefinition[] {
  return definitions;
}

export function getSeriesDefinition(
  slug: string,
): SeriesDefinition | undefined {
  return definitions.find((definition) => definition.slug === slug);
}
