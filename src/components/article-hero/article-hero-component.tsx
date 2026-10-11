import { cn } from "@/lib/utils";
import type { ArticleImage } from "@/lib/content";
import Link from "next/link";

export type ArticleHeroComponentProps = {
  title: string;
  eyebrow?: string;
  eyebrowHref?: string;
  image?: ArticleImage;
  className?: string;
};

/**
 * The article header banner: the cover image with the title (the page h1)
 * overlaid on a legibility gradient. When no cover image resolves, a branded
 * dark panel stands in so the header still reads as intentional. The title is
 * always real, crawlable text regardless of the image.
 */
export function ArticleHeroComponent({
  title,
  eyebrow,
  eyebrowHref,
  image,
  className,
}: ArticleHeroComponentProps) {
  return (
    <div
      className={cn(
        "relative isolate flex flex-col justify-end overflow-hidden bg-zinc-900",
        image
          ? "min-h-[500px] md:min-h-[600px]"
          : "min-h-[20rem] md:min-h-[26rem]",
        className,
      )}
    >
      {image ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.src}
            alt={image.alt}
            className="absolute inset-0 size-full object-cover"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-black/85 via-black/45 to-black/20"
          />
        </>
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(75%_120%_at_12%_0%,rgba(239,68,68,0.30),transparent_62%)]"
        />
      )}

      <div className="relative flex flex-col gap-3 p-6 sm:p-9 lg:p-10">
        {eyebrow ? (
          eyebrowHref ? (
            <Link
              href={eyebrowHref}
              className="w-fit font-heading text-xs font-bold uppercase tracking-[0.14em] text-red-300 underline-offset-4 hover:decoration-2"
            >
              {eyebrow}
            </Link>
          ) : (
            <p className="font-heading text-xs font-bold uppercase tracking-[0.14em] text-red-300">
              {eyebrow}
            </p>
          )
        ) : null}
        <h1 className="max-w-3xl font-heading text-3xl font-bold leading-tight text-white [text-shadow:0_1px_3px_rgb(0_0_0/45%)] sm:text-4xl lg:text-5xl">
          {title}
        </h1>
      </div>
    </div>
  );
}
