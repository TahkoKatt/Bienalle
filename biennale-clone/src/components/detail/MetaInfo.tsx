import { ReactNode } from 'react';

interface MetaItem {
  icon?: ReactNode;
  label: string;
  value: string | ReactNode;
}

interface MetaInfoProps {
  items: MetaItem[];
  layout?: 'horizontal' | 'vertical';
}

export function MetaInfo({ items, layout = 'horizontal' }: MetaInfoProps) {
  const isHorizontal = layout === 'horizontal';

  return (
    <div
      className={`flex ${
        isHorizontal
          ? 'flex-wrap items-center gap-6'
          : 'flex-col gap-4'
      }`}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={`flex items-start gap-2 ${
            isHorizontal ? '' : 'pb-4 border-b'
          }`}
          style={
            !isHorizontal
              ? { borderColor: 'var(--color-border-light)' }
              : undefined
          }
        >
          {item.icon && (
            <div
              className="flex-shrink-0 mt-0.5"
              style={{ color: 'var(--color-primary-600)' }}
            >
              {item.icon}
            </div>
          )}
          <div className="flex-1">
            <div
              className="text-xs font-medium uppercase tracking-wide mb-1"
              style={{
                color: 'var(--color-text-tertiary)',
                fontWeight: 'var(--font-weight-medium)',
              }}
            >
              {item.label}
            </div>
            {typeof item.value === 'string' ? (
              <div
                className="text-sm"
                style={{
                  color: 'var(--color-text-primary)',
                  fontWeight: 'var(--font-weight-medium)',
                }}
              >
                {item.value}
              </div>
            ) : (
              item.value
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
