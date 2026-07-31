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
        title="Hey, I'm Ganessh Kumar"
        tagline="Full-stack engineering, distributed systems and agentic systems."
        socials={SOCIAL_NAV}
      >
        <p>
          I am a software engineer at Microsoft, working on{" "}
          <Link
            href="https://www.microsoft.com/en-us/microsoft-fabric"
            target="_blank"
            rel="noreferrer"
          >
            Microsoft Fabric
          </Link>
          . I build distributed systems, agentic workflows and developer tools
          that make complex work easier.
        </p>
        <p>
          Before Fabric, I worked on{" "}
          <Link
            href="https://www.microsoft.com/microsoft-teams/"
            target="_blank"
            rel="noreferrer"
          >
            Microsoft Teams
          </Link>
          , including agentic workflows that reduced channel noise,
          notifications, lifecycle management and compliance features. Outside
          work, I build Obsidian plugins and run{" "}
          <Link
            href="https://obsidian-plugin-stats.ganesshkumar.com"
            target="_blank"
            rel="noreferrer"
          >
            ObsidianStats
          </Link>
          .
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
