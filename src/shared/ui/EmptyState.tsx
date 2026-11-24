import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
      {icon && (
        <div className="text-stone-600" aria-hidden="true">
          {icon}
        </div>
      )}
      <h2 className="text-xl font-bold">{title}</h2>
      {description && <p className="max-w-sm text-stone-600">{description}</p>}
      {action && (
        <div className="mt-2 flex flex-wrap justify-center gap-3">{action}</div>
      )}
    </div>
  );
}
