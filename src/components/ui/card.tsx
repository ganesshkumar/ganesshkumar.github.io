import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card text-card-foreground",
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-1.5 p-6", className)} {...props} />
  );
}

function CardTitle({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("font-heading text-lg font-bold text-ink", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} />
  );
}

function CardContent({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}

function CardFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
  );
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
