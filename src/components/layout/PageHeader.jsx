import { cn } from "@/lib/utils";

export function PageHeader({ title, description, actions, className }) {
  return (
    <div className={cn("flex items-end justify-between gap-4 mb-6 px-1", className)}>
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--ink-muted)] mb-2">
          Workspace
        </p>
        <h2 className="font-display text-[clamp(24px,2.6vw,34px)] font-semibold tracking-[-0.04em] text-[var(--ink)]">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-[var(--ink-muted)] mt-1">{description}</p>
        )}
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  );
}
