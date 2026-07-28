import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium no-underline transition-all disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_2px_0_var(--color-brand-edge)] hover:bg-brand-hover active:translate-y-[2px] active:shadow-none",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[0_2px_0_var(--color-secondary-edge)] hover:bg-secondary-hover active:translate-y-[2px] active:shadow-none",
        outline:
          "border border-border bg-transparent text-ink shadow-[0_2px_0_var(--color-neutral-edge)] hover:bg-surface active:translate-y-[2px] active:shadow-none",
        ghost: "text-body hover:bg-surface hover:text-ink",
        link: "text-link underline underline-offset-4 hover:decoration-[3px]",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        default: "h-10 px-4 text-sm",
        lg: "h-11 px-6 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonVariants>;

function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
