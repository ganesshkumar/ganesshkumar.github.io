import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type PageHeadingComponentProps = {
  children: ReactNode;
  className?: string;
};

/**
 * The primary page title (h1). Shared by every top-level page header so the
 * size, weight and brand color stay identical across the site.
 */
export function PageHeadingComponent({
  children,
  className,
}: PageHeadingComponentProps) {
  return (
    <h1
      className={cn(
        "font-heading text-4xl font-bold tracking-tight text-brand sm:text-5xl",
        className,
      )}
    >
      {children}
    </h1>
  );
}
