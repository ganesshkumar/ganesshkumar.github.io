import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { IntroComponent } from "@/components/intro";
import { ReadingCtaComponent } from "@/components/reading-cta";
import { SectionHeaderComponent } from "@/components/section-header";
import { SOCIAL_NAV } from "@/lib/navigation";
import { buildSocialMetadata } from "@/lib/seo";

const description =
  "Ganessh Kumar is a full-stack software engineer at Microsoft. I build AI-powered solutions and modern web applications, create Obsidian plugins and write about software development.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  ...buildSocialMetadata({
    title: "About Ganessh Kumar",
    description,
    path: "/about",
    type: "profile",
  }),
};

type SkillGroup = { title: string; items: { name: string; icon: string }[] };

const skillIcon = (id: string) =>
  `https://skillicons.dev/icons?i=${id}&theme=light`;

const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Frontend",
    items: [
      { name: "TypeScript", icon: skillIcon("ts") },
      { name: "JavaScript", icon: skillIcon("js") },
      { name: "HTML", icon: skillIcon("html") },
      { name: "CSS", icon: skillIcon("css") },
      { name: "React", icon: skillIcon("react") },
      { name: "Next.js", icon: skillIcon("nextjs") },
      { name: "Redux", icon: skillIcon("redux") },
      { name: "Tailwind", icon: skillIcon("tailwind") },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", icon: skillIcon("nodejs") },
      { name: "NestJS", icon: skillIcon("nestjs") },
      { name: "Java", icon: skillIcon("java") },
      { name: "Kotlin", icon: skillIcon("kotlin") },
      { name: "Spring", icon: skillIcon("spring") },
      { name: "Python", icon: skillIcon("py") },
      { name: "Flask", icon: skillIcon("flask") },
      { name: "C#", icon: skillIcon("cs") },
      { name: ".NET", icon: skillIcon("dotnet") },
      { name: "GraphQL", icon: skillIcon("graphql") },
    ],
  },
  {
    title: "Database & Tools",
    items: [
      { name: "Prisma", icon: skillIcon("prisma") },
      { name: "Supabase", icon: skillIcon("supabase") },
      { name: "PostgreSQL", icon: skillIcon("postgres") },
      { name: "MongoDB", icon: skillIcon("mongodb") },
    ],
  },
  {
    title: "Cloud & DevOps",
    items: [
      { name: "AWS", icon: skillIcon("aws") },
      { name: "Azure", icon: skillIcon("azure") },
      { name: "Vercel", icon: skillIcon("vercel") },
      { name: "Docker", icon: skillIcon("docker") },
      { name: "Kubernetes", icon: skillIcon("kubernetes") },
      { name: "Ansible", icon: skillIcon("ansible") },
    ],
  },
  {
    title: "Operating Systems",
    items: [{ name: "Linux", icon: skillIcon("linux") }],
  },
];

type Patent = {
  id: string;
  number: string;
  status: string;
  title: string;
  summary: string;
  role: string;
  assignee: string;
  href: string;
};

const PATENTS: Patent[] = [
  {
    id: "US11755844B2",
    number: "US 11,755,844 B2",
    status: "Granted 2023",
    title: "Automatic summarization of content in electronic messages",
    summary:
      "A method for summarizing email automatically. It classifies each sentence as a decision, judgement, inference or fact, clusters the related ones, then builds a short summary from the highest-scoring cluster.",
    role: "Co-inventor",
    assignee: "Microsoft Technology Licensing, LLC",
    href: "https://patents.google.com/patent/US11755844B2/en",
  },
];

export default function AboutPage() {
  return (
    <main className="flex-1">
      <IntroComponent title="About me" socials={SOCIAL_NAV}>
        <p>
          I am <strong>Ganessh Kumar</strong> and I am a software engineer
          at <strong>Microsoft</strong>. I am a full-stack developer passionate
          about building AI-powered solutions and modern web applications, with a
          strong emphasis on performance and user experience.
        </p>
        <p>
          I am currently working on{" "}
          <Link
            href="https://www.microsoft.com/en-us/microsoft-fabric"
            target="_blank"
            rel="noreferrer"
          >
            Microsoft Fabric
          </Link>
          , a unified analytics platform that empowers organizations to get the
          most value from their data and accelerate their AI journey. I love
          creating solutions that make people&apos;s lives easier and more
          productive.
        </p>
        <p>
          Before Fabric, I spent a good amount of time working on{" "}
          <Link
            href="https://www.microsoft.com/microsoft-teams/"
            target="_blank"
            rel="noreferrer"
          >
            Microsoft Teams
          </Link>
          . The most interesting part was building agentic workflows that cut
          channel noise and the fatigue of keeping up. I also worked on the
          lifecycle of teams and channels, the notification system and a set of
          compliance features.
        </p>
        <p>
          In my free time, I enjoy building{" "}
          <Link
            href="https://obsidian-plugin-stats.ganesshkumar.com"
            target="_blank"
            rel="noreferrer"
          >
            ObsidianStats
          </Link>
          , a platform to find the best Obsidian plugins for a workflow and also
          to stay up-to-date on Obsidian plugins and themes. I also love creating
          plugins for <strong>Obsidian</strong>. I have created a few plugins
          that enhance the functionality of Obsidian, such as:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <Link
              href="https://github.com/ganesshkumar/obsidian-excel-to-markdown-table"
              target="_blank"
              rel="noreferrer"
            >
              Obsidian Excel to Markdown table
            </Link>
          </li>
          <li>
            <Link
              href="https://github.com/ganesshkumar/obsidian-table-editor"
              target="_blank"
              rel="noreferrer"
            >
              Obsidian Markdown Table Editor
            </Link>
          </li>
          <li>
            <Link
              href="https://github.com/ganesshkumar/obsidian-bookmarklet-maker"
              target="_blank"
              rel="noreferrer"
            >
              Obsidian Bookmarklet Maker
            </Link>
          </li>
        </ul>
        <p>
          You can find all my plugins on the Obsidian community hub or on my{" "}
          <Link
            href="https://github.com/ganesshkumar"
            target="_blank"
            rel="noreferrer"
          >
            GitHub page
          </Link>
          . I hope you find them useful and feel free to give me feedback or
          suggestions.
        </p>
        <p>
          Teaching has been part of it too. For about three and a half years,
          from 2016 to 2020, I mentored learners in the Machine Learning course
          on Coursera. That was before it retired the mentorship program.
        </p>
        <p>
          On this website, I will share my thoughts and experiences on software
          development, my learnings, productivity, Obsidian, and other topics
          that interest me. I hope you enjoy reading my posts and learn something
          new along the way. Thank you for visiting and stay tuned for more!
        </p>
      </IntroComponent>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 pb-16 sm:px-6">
        <section
          aria-labelledby="patents-heading"
          className="flex flex-col gap-8"
        >
          <SectionHeaderComponent
            title="Patents"
            headingId="patents-heading"
            description="Research from my work that made it into the patent record."
          />
          <ul className="flex flex-col gap-4">
            {PATENTS.map((patent) => (
              <li key={patent.id}>
                <article className="flex flex-col gap-3 border border-border bg-surface p-5 sm:p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.06em] text-muted-foreground">
                    {patent.number} · {patent.status}
                  </p>
                  <h3 className="font-heading text-xl font-bold tracking-tight text-ink">
                    <Link
                      href={patent.href}
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors hover:text-brand"
                    >
                      {patent.title}
                    </Link>
                  </h3>
                  <p className="text-body">{patent.summary}</p>
                  <p className="text-sm text-muted-foreground">
                    {patent.role} · {patent.assignee}
                  </p>
                  <Link
                    href={patent.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-link no-underline hover:underline"
                  >
                    View on Google Patents
                    <ExternalLink className="size-4" aria-hidden />
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="skills-heading"
          className="flex flex-col gap-8"
        >
          <SectionHeaderComponent
            title="Skills"
            headingId="skills-heading"
            description="Languages, frameworks and tools I reach for."
          />
          <div className="flex flex-col gap-8">
            {SKILL_GROUPS.map((group) => (
              <div key={group.title} className="flex flex-col gap-3">
                <h3 className="font-heading text-xs font-bold uppercase tracking-[0.06em] text-muted-foreground">
                  {group.title}
                </h3>
                <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                  {group.items.map((skill) => (
                    <li
                      key={skill.name}
                      className="flex items-center gap-2 border border-border bg-surface px-3 py-2 text-sm font-medium text-body"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={skill.icon}
                        alt=""
                        width={20}
                        height={20}
                        loading="lazy"
                        className="size-5 shrink-0"
                      />
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <ReadingCtaComponent
          title="See what I've been working on"
          description="The articles are where I think out loud about engineering. The projects are where it ships. Both are better proof than anything I could claim on this page."
          primaryCta={{ label: "Read the articles", href: "/articles" }}
          secondaryCta={{ label: "Browse the projects", href: "/projects" }}
        />
      </div>
    </main>
  );
}
