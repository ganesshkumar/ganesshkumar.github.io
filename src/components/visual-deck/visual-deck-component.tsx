"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { articleHref, type VisualDeck } from "@/lib/content";
import { cn } from "@/lib/utils";

export type VisualDeckComponentProps = {
  deck: VisualDeck;
  variant?: "compact" | "full";
  className?: string;
};

export function VisualDeckComponent({
  deck,
  variant = "full",
  className,
}: VisualDeckComponentProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const pointerStart = useRef<number | null>(null);
  const card = deck.cards[activeIndex];
  const hasMultipleCards = deck.cards.length > 1;

  function showPrevious() {
    setActiveIndex((current) => Math.max(0, current - 1));
  }

  function showNext() {
    setActiveIndex((current) =>
      Math.min(deck.cards.length - 1, current + 1),
    );
  }

  return (
    <div
      role="region"
      aria-roledescription={hasMultipleCards ? "carousel" : undefined}
      aria-label={deck.title}
      tabIndex={hasMultipleCards ? 0 : undefined}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") showPrevious();
        if (event.key === "ArrowRight") showNext();
      }}
      onPointerDown={(event) => {
        pointerStart.current = event.clientX;
      }}
      onPointerUp={(event) => {
        if (pointerStart.current === null) return;
        const distance = event.clientX - pointerStart.current;
        pointerStart.current = null;
        if (distance > 48) showPrevious();
        if (distance < -48) showNext();
      }}
      className={cn(
        "overflow-hidden border border-border bg-paper",
        variant === "full" ? "p-3 sm:p-5" : "p-2 sm:p-3",
        className,
      )}
    >
      <figure>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={card.id}
          src={card.image.src}
          alt={card.image.alt}
          width={1200}
          height={900}
          className="aspect-4/3 w-full bg-paper object-contain"
          loading={variant === "compact" ? "eager" : "lazy"}
          decoding="async"
        />
        <figcaption
          className={cn(
            "flex flex-col gap-1 border-t border-border",
            variant === "full" ? "px-2 pt-4 sm:px-3" : "px-1 pt-3",
          )}
        >
          <span className="font-heading font-bold text-ink">{card.title}</span>
          {variant === "full" && card.relatedArticleSlug ? (
            <Link
              href={articleHref(card.relatedArticleSlug)}
              className="w-fit text-sm font-medium text-link"
            >
              Read the related article
            </Link>
          ) : null}
        </figcaption>
      </figure>

      {hasMultipleCards ? (
        <div className="mt-4 flex items-center justify-between gap-4 border-t border-border pt-4">
          <Button
            variant="outline"
            size="icon"
            onClick={showPrevious}
            disabled={activeIndex === 0}
            aria-label="Show previous visual note"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </Button>
          <p
            aria-live="polite"
            className="text-sm tabular-nums text-muted-foreground"
          >
            Card {activeIndex + 1} of {deck.cards.length}
          </p>
          <Button
            variant="outline"
            size="icon"
            onClick={showNext}
            disabled={activeIndex === deck.cards.length - 1}
            aria-label="Show next visual note"
          >
            <ChevronRight className="size-5" aria-hidden />
          </Button>
        </div>
      ) : null}
    </div>
  );
}
