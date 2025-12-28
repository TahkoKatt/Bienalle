import { ReactNode } from 'react';

interface SidebarSection {
  title: string;
  content: ReactNode;
}

interface SidebarProps {
  sections: SidebarSection[];
}

export function Sidebar({ sections }: SidebarProps) {
  return (
    <aside className="space-y-6">
      {sections.map((section, index) => (
        <div
          key={index}
          className="p-6 rounded-lg"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'var(--color-border-light)',
          }}
        >
          <h3
            className="text-lg font-semibold mb-4"
            style={{
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-text-primary)',
            }}
          >
            {section.title}
          </h3>
          <div>{section.content}</div>
        </div>
      ))}
    </aside>
  );
}
