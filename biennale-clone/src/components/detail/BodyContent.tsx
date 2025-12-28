import { ReactNode } from 'react';

interface BodyContentProps {
  children: ReactNode;
}

export function BodyContent({ children }: BodyContentProps) {
  return (
    <div
      className="prose prose-lg max-w-none"
      style={{
        color: 'var(--color-text-primary)',
        lineHeight: 'var(--line-height-relaxed)',
      }}
    >
      {children}
    </div>
  );
}
