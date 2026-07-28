import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projectPrimaryUrl, type ProjectSummary } from "@/lib/content";

export type ProjectRowVariant = "featured" | "compact";

export type ProjectRowComponentProps = {
  project: ProjectSummary;
  variant?: ProjectRowVariant;
  headingLevel?: 2 | 3;
  className?: string;
};

function ProjectMedia({
  project,
  variant,
}: {
  project: ProjectSummary;
  variant: ProjectRowVariant;
}) {
  const Icon = project.icon;

  if (variant === "compact") {
    return (
      <div className="flex size-12 shrink-0 items-center justify-center border border-border bg-surface">
        {project.iconImage ? (
          <Image
            src={project.iconImage.src}
            alt=""
            width={28}
            height={28}
            className="object-contain"
          />
        ) : Icon ? (
          <Icon className="size-6 text-brand" aria-hidden />
        ) : null}
      </div>
    );
  }

  if (project.image) {
    return (
      <div className="relative aspect-video w-full overflow-hidden bg-surface">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes="(min-width: 1024px) 360px, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className="flex aspect-video w-full items-center justify-center border border-border bg-surface">
      {project.iconImage ? (
        <Image
          src={project.iconImage.src}
          alt=""
          width={64}
          height={64}
          className="object-contain"
        />
      ) : Icon ? (
        <Icon className="size-16 text-brand" aria-hidden />
      ) : null}
    </div>
  );
}

function ProjectActions({
  project,
  size,
}: {
  project: ProjectSummary;
  size: "default" | "sm";
}) {
  const { liveUrl, repoUrl } = project;
  if (!liveUrl && !repoUrl) return null;

  return (
    <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
      {liveUrl ? (
        <a
          href={liveUrl}
          target="_blank"
          rel="noreferrer"
          className={cn(buttonVariants({ size }))}
        >
          <ExternalLink className="size-4" aria-hidden />
          Visit
        </a>
      ) : null}
      {repoUrl ? (
        <a
          href={repoUrl}
          target="_blank"
          rel="noreferrer"
          className={cn(buttonVariants({ variant: "outline", size }))}
        >
          <Github className="size-4" aria-hidden />
          {liveUrl ? "Code" : "View code"}
        </a>
      ) : null}
    </div>
  );
}

export function ProjectRowComponent({
  project,
  variant = "featured",
  headingLevel,
  className,
}: ProjectRowComponentProps) {
  const isFeatured = variant === "featured";
  const level = headingLevel ?? (isFeatured ? 2 : 3);
  const Heading = level === 2 ? "h2" : "h3";
  const Icon = project.icon;
  const primaryUrl = projectPrimaryUrl(project);
  const lead = project.problem ?? project.description;

  const title = primaryUrl ? (
    <a
      href={primaryUrl}
      target="_blank"
      rel="noreferrer"
      className="text-brand no-underline hover:text-brand-hover"
    >
      {project.title}
    </a>
  ) : (
    <span className="text-brand">{project.title}</span>
  );

  if (!isFeatured) {
    return (
      <article className={cn("flex items-start gap-4", className)}>
        <ProjectMedia project={project} variant="compact" />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Heading className="font-heading text-lg font-bold leading-snug">
            {title}
          </Heading>
          <p className="text-sm leading-relaxed text-body">
            {project.description}
          </p>
          {project.stack && project.stack.length > 0 ? (
            <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
              {project.stack.map((item) => (
                <li key={item}>
                  <Badge variant="outline">{item}</Badge>
                </li>
              ))}
            </ul>
          ) : null}
          <ProjectActions project={project} size="sm" />
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)]",
        className,
      )}
    >
      <ProjectMedia project={project} variant="featured" />
      <div className="flex flex-col gap-3">
        <Heading className="flex items-center gap-2.5 font-heading text-2xl font-bold leading-tight">
          {project.iconImage ? (
            <span className="relative inline-flex size-6 shrink-0 items-center justify-center">
              <Image
                src={project.iconImage.src}
                alt=""
                width={24}
                height={24}
                className="object-contain"
              />
            </span>
          ) : Icon ? (
            <Icon className="size-6 shrink-0 text-brand" aria-hidden />
          ) : null}
          {title}
        </Heading>
        <p className="text-base leading-relaxed text-body sm:text-lg">{lead}</p>
        <p className="leading-relaxed text-muted-foreground">
          {project.outcome}
        </p>
        {project.stack && project.stack.length > 0 ? (
          <ul className="flex flex-wrap gap-1.5 pt-1" aria-label="Tech stack">
            {project.stack.map((item) => (
              <li key={item}>
                <Badge variant="outline">{item}</Badge>
              </li>
            ))}
          </ul>
        ) : null}
        <ProjectActions project={project} size="default" />
      </div>
    </article>
  );
}
