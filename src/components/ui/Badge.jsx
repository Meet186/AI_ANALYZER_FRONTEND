import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium tracking-tight tabular",
  {
    variants: {
      tone: {
        neutral: "bg-[var(--surface-2)] text-[var(--ink-muted)] border border-[var(--border)]",
        accent: "bg-[var(--accent-soft)] text-[var(--accent-strong)]",
        success: "bg-[color-mix(in_srgb,var(--accent-soft)_80%,var(--surface))] text-[var(--success)]",
        warning: "bg-[color-mix(in_srgb,#f7ead6_80%,var(--surface))] text-[var(--warning)]",
        danger: "bg-[color-mix(in_srgb,#f8e3e0_80%,var(--surface))] text-[var(--danger)]",
        ink: "bg-[var(--ink)] text-[var(--bg)]",
      },
    },
    defaultVariants: { tone: "neutral" },
  }
);

export function Badge({ className, tone, ...props }) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}

export { badgeVariants };
