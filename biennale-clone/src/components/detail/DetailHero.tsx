import { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';

interface DetailHeroProps {
  title: string;
  subtitle?: string;
  badge?: {
    label: string;
    variant?: 'primary' | 'secondary' | 'neutral';
  };
  breadcrumbs?: {
    label: string;
    href: string;
  }[];
  image?: boolean;
  children?: ReactNode;
}

export function DetailHero({
  title,
  subtitle,
  badge,
  breadcrumbs,
  image = false,
  children,
}: DetailHeroProps) {
  const badgeColors = {
    primary: {
      bg: 'var(--color-primary-100)',
      text: 'var(--color-primary-700)',
    },
    secondary: {
      bg: 'var(--color-secondary-100)',
      text: 'var(--color-secondary-700)',
    },
    neutral: {
      bg: 'var(--color-neutral-200)',
      text: 'var(--color-text-primary)',
    },
  };

  return (
    <div className="relative">
      {/* Background Image */}
      {image && (
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: 'linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-secondary-600) 100%)',
            opacity: 0.1,
          }}
        />
      )}

      <Container className="py-12 md:py-16 lg:py-20">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="flex items-center gap-2">
                  {index > 0 && (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      style={{ color: 'var(--color-text-tertiary)' }}
                    >
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                  <a
                    href={crumb.href}
                    className="transition-colors hover:opacity-70"
                    style={{
                      color:
                        index === breadcrumbs.length - 1
                          ? 'var(--color-text-secondary)'
                          : 'var(--color-primary-600)',
                    }}
                  >
                    {crumb.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Badge */}
        {badge && (
          <div className="mb-4">
            <span
              className="inline-block px-3 py-1 text-sm font-medium rounded-full"
              style={{
                backgroundColor: badgeColors[badge.variant || 'primary'].bg,
                color: badgeColors[badge.variant || 'primary'].text,
                fontWeight: 'var(--font-weight-medium)',
              }}
            >
              {badge.label}
            </span>
          </div>
        )}

        {/* Title */}
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-4xl"
          style={{
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--color-text-primary)',
            lineHeight: 'var(--line-height-tight)',
          }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p
            className="text-xl md:text-2xl mb-6 max-w-3xl"
            style={{
              color: 'var(--color-text-secondary)',
              lineHeight: 'var(--line-height-normal)',
            }}
          >
            {subtitle}
          </p>
        )}

        {/* Additional Content */}
        {children}
      </Container>
    </div>
  );
}
