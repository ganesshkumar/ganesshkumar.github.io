import type { Metadata } from "next";
import Link from "next/link";
import { IntroComponent } from "@/components/intro";
import { ArticleList } from "@/components/article-list";
import { ProjectGrid } from "@/components/project-grid";
import { SOCIAL_NAV } from "@/lib/navigation";

export const metadata: Metadata = {
  title: {
    absolute: "Ganessh Kumar — Full-Stack Engineering Notes & Projects",
  },
  description:
    "Full-stack engineer at Microsoft. I build developer tools and write practical notes on full-stack development, distributed systems and AI agents.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main className="flex-1">
      <IntroComponent
        title="Hey, I'm Ganessh"
        tagline="Full-stack engineering, distributed systems and agentic systems."
        socials={SOCIAL_NAV}
      >
        <p>
          I&apos;m a software engineer at Microsoft, working on Microsoft Fabric.
          My focus is the horizontal platform: the shared data components that
          Fabric&apos;s workloads build on. It&apos;s distributed-systems work,
          the kind of plumbing that has to stay reliable while everything above
          it keeps moving.
        </p>
        <p>
          On the side, I build open-source plugins for Obsidian. Two I keep
          maintained are the{" "}
          <Link
            href="https://github.com/ganesshkumar/obsidian-table-editor"
            target="_blank"
            rel="noreferrer"
          >
            Markdown Table Editor
          </Link>{" "}
          and{" "}
          <Link
            href="https://github.com/ganesshkumar/obsidian-excel-to-markdown-table"
            target="_blank"
            rel="noreferrer"
          >
            Excel to Markdown
          </Link>
          . I also run{" "}
          <Link
            href="https://www.obsidianstats.com"
            target="_blank"
            rel="noreferrer"
          >
            Obsidian Stats
          </Link>
          , which helps you pick the right plugins for your workflow.
        </p>
        <p>
          Before Fabric, I spent a good while inside Microsoft Teams. The most
          interesting part was building agentic workflows that cut channel noise
          and the fatigue of keeping up. I also worked on the lifecycle of teams
          and channels, the notification system and a set of compliance
          features.
        </p>
        <p>
          Teaching has been part of it too. For about three and a half years,
          from 2016 to 2020, I mentored learners in the Machine Learning course
          on Coursera. That was before it retired the mentorship program.
        </p>
        <p>
          Most of what I learn ends up here, as{" "}
          <Link href="/articles">articles</Link> and{" "}
          <Link href="/projects">projects</Link>. For the fuller work history,
          I&apos;m on{" "}
          <Link
            href="https://www.linkedin.com/in/ganessh-kumar-r-p-676a4719"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </Link>
          .
        </p>
      </IntroComponent>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 pb-16 sm:px-6">
        <ArticleList />
        <ProjectGrid />
      </div>
    </main>
  );
}
