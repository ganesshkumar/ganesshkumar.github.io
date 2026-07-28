import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { projectPrimaryUrl, type ProjectSummary } from "@/lib/content";

export type ProjectCardComponentProps = {
  project: ProjectSummary;
  headingLevel?: 2 | 3;
  className?: string;
};

export function ProjectCardComponent({
  project,
  headingLevel = 3,
  className,
}: ProjectCardComponentProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const primaryUrl = projectPrimaryUrl(project);
  const Icon = project.icon;
  const hasLinks = Boolean(project.liveUrl || project.repoUrl);

  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden shadow-sm transition hover:border-brand/40 hover:shadow-md",
        className,
      )}
    >
      {project.image ? (
        <div className="relative aspect-video w-full bg-surface">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col gap-3 p-5">
        <Heading className="flex items-center gap-2 font-heading text-lg font-bold leading-snug">
          {project.iconImage ? (
            <span className="relative size-6 shrink-0">
              <Image
                src={project.iconImage.src}
                alt=""
                fill
                sizes="24px"
                className="object-contain"
              />
            </span>
          ) : Icon ? (
            <Icon className="size-5 shrink-0 text-brand" aria-hidden />
          ) : null}
          {primaryUrl ? (
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
          )}
        </Heading>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        {hasLinks ? (
          <div className="mt-auto flex items-center gap-2 pt-2">
            {project.liveUrl ? (
              <>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(buttonVariants({ size: "sm" }), "flex-1")}
                >
                  <ExternalLink className="size-4" aria-hidden />
                  Visit
                </a>
                {project.repoUrl ? (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="View code on GitHub"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "w-8 shrink-0 px-0",
                    )}
                  >
                    <Github className="size-4" aria-hidden />
                  </a>
                ) : null}
              </>
            ) : project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "w-full",
                )}
              >
                <Github className="size-4" aria-hidden />
                View Code
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </Card>
  );
}
