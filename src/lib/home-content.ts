import {
  BrainCircuit,
  ChartColumn,
  Cpu,
  Music,
  Scissors,
  Sheet,
  Table,
} from "lucide-react";
import { getAllArticles } from "@/lib/articles";
import type { ArticleSummary, ProjectSummary } from "@/lib/content";

/**
 * Project content for the home page and projects index.
 */
const OBSIDIAN_ICON = {
  src: "/assets/images/projects/icons/obsidian.png",
  alt: "Obsidian",
} as const;

const RECENT_PROJECTS: ProjectSummary[] = [
  {
    slug: "pico-gpt",
    icon: BrainCircuit,
    title: "Pico GPT",
    description:
      "A minimal GPT-2-inspired language model built from scratch.",
    image: {
      src: "/assets/images/projects/pico-gpt.webp",
      alt: "Pico GPT processes tokens to predict the next token",
    },
    problem:
      "A full-sized language model hides too much when I want to trace how tokens, attention, Transformer blocks, training and generation fit together.",
    outcome:
      "A 232,608-parameter decoder-only model with character tokenization, learned embeddings, causal attention, training, validation and text generation.",
    stack: ["Python", "PyTorch", "Transformers"],
    status: "shipped",
    featured: true,
    tags: ["gpt-2", "llm", "machine-learning"],
    repoUrl: "https://github.com/ganesshkumar/pico-gpt",
  },
  {
    slug: "obsidian-stats",
    icon: ChartColumn,
    iconImage: OBSIDIAN_ICON,
    image: {
      src: "/assets/images/projects/obsidian-stats-illustration.webp",
      alt: "Obsidian Stats plugin analytics dashboard",
    },
    title: "Obsidian Stats",
    description: "Explore and analyze the Obsidian plugin ecosystem.",
    problem:
      "There was no simple way to explore the Obsidian plugin ecosystem, compare plugins or keep track of what is new and worth trying.",
    outcome: "A public directory and analytics site for Obsidian plugins.",
    stack: ["Next.js", "TypeScript"],
    status: "shipped",
    featured: true,
    repoUrl: "https://github.com/ganesshkumar/obsidian-plugins-stats-ui",
    liveUrl: "https://www.obsidianstats.com",
  },
  {
    slug: "obsidian-markdown-table-editor",
    icon: Table,
    iconImage: OBSIDIAN_ICON,
    image: {
      src: "/assets/images/projects/obsidian-markdown-table-editor-illustration.webp",
      alt: "Obsidian Markdown Table Editor editing a table",
    },
    title: "Obsidian Markdown Table Editor",
    description: "Create and edit markdown tables inside Obsidian.",
    problem:
      "Building and reshaping markdown tables by hand inside a note is slow and easy to get wrong.",
    outcome: "A published Obsidian community plugin.",
    stack: ["TypeScript", "Obsidian API"],
    status: "shipped",
    featured: true,
    repoUrl: "https://github.com/ganesshkumar/obsidian-table-editor",
  },
  {
    slug: "obsidian-excel-to-markdown",
    icon: Sheet,
    iconImage: OBSIDIAN_ICON,
    image: {
      src: "/assets/images/projects/obsidian-excel-to-markdown-illustration.webp",
      alt: "Spreadsheet data converted into a Markdown table",
    },
    title: "Obsidian Excel to Markdown",
    description: "Paste Excel, Sheets, Numbers and Calc data as markdown tables.",
    problem:
      "Moving a table out of a spreadsheet into a note means reformatting every row into markdown by hand.",
    outcome: "A published Obsidian plugin for spreadsheet-to-table conversion.",
    stack: ["TypeScript", "Obsidian API"],
    status: "shipped",
    featured: true,
    repoUrl: "https://github.com/ganesshkumar/obsidian-excel-to-markdown-table",
  },
  {
    slug: "obsidian-clipper-maker",
    icon: Scissors,
    iconImage: OBSIDIAN_ICON,
    title: "Obsidian Clipper Maker",
    description: "A bookmarklet to clip web content straight into your vault.",
    image: {
      src: "/assets/images/projects/obsidian-clipper-maker-illustration.webp",
      alt: "Obsidian Clipper Maker moving web content into a note",
    },
    problem:
      "Saving something from the web into Obsidian usually turns into a copy, paste and cleanup chore.",
    outcome: "A bookmarklet generator for saving the web to Obsidian.",
    stack: ["TypeScript"],
    status: "shipped",
    repoUrl: "https://github.com/ganesshkumar/obsidian-bookmarklet-maker",
    liveUrl: "https://obsidian-clipper-maker.ganesshkumar.com",
  },
  {
    slug: "computer-0.1",
    icon: Cpu,
    title: "Computer 0.1",
    description: "Building a modern computer from scratch, from NAND gates up.",
    image: {
      src: "/assets/images/projects/computer-0.1-illustration.webp",
      alt: "Computer 0.1 progressing from a logic gate to running assembly",
    },
    problem:
      "I wanted to understand how a computer really works, from logic gates up to running real code.",
    outcome:
      "Von Neumann hardware complete, with an assembler from assembly to binary.",
    stack: ["Hardware", "Assembly"],
    status: "in-progress",
    repoUrl: "https://github.com/ganesshkumar/Computer-0.1",
  },
  {
    slug: "nathas",
    icon: Music,
    iconImage: {
      src: "/assets/images/projects/icons/slack.png",
      alt: "Slack",
    },
    title: "Nathas",
    description: "A Slack bot that streams your team's song requests.",
    image: {
      src: "/assets/images/projects/nathas-illustration.webp",
      alt: "Nathas turns team chat requests into streamed music",
    },
    problem:
      "Sharing music with a team in Slack meant leaving the channel to queue songs somewhere else.",
    outcome: "A Slack music bot that placed 3rd at a hackathon.",
    stack: ["Node.js", "Slack API"],
    status: "shipped",
    repoUrl: "https://github.com/TeamSven/nathas",
  },
];

export function getRecentArticles(
  excludedSeriesSlug?: string,
): ArticleSummary[] {
  const articles = getAllArticles();
  return (
    excludedSeriesSlug
      ? articles.filter(
          (article) => article.series?.slug !== excludedSeriesSlug,
        )
      : articles
  ).slice(0, 10);
}

export function getRecentProjects(): ProjectSummary[] {
  return RECENT_PROJECTS;
}

/**
 * The curated project set shown on the /projects index. Same seed as the home
 * grid today; kept as its own accessor so the projects page can diverge later
 * (more projects, archived tier) without touching the home surface.
 */
export function getShowcaseProjects(): ProjectSummary[] {
  return RECENT_PROJECTS;
}
