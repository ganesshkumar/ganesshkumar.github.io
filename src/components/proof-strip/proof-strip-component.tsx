import { cn } from "@/lib/utils";

export type ProofItem = { value: string; label: string };

export type ProofStripComponentProps = {
  items: ProofItem[];
  label?: string;
  className?: string;
};

export function ProofStripComponent({
  items,
  label = "By the numbers",
  className,
}: ProofStripComponentProps) {
  if (items.length === 0) return null;

  return (
    <section aria-label={label} className={cn("w-full", className)}>
      <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col gap-1">
            <dt className="order-2 text-sm text-muted-foreground">
              {item.label}
            </dt>
            <dd className="order-1 font-heading text-3xl font-bold tracking-tight text-ink">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
