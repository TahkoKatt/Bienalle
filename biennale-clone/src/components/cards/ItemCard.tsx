import Link from 'next/link';
import { ReactNode } from 'react';

export interface ItemCardProps {
  href: string;
  title: string;
  image?: string;
  imageAspect?: '16/9' | '4/3' | '1/1';
  badge?: {
    label: string;
    variant?: 'primary' | 'secondary' | 'neutral';
  };
  meta?: {
    icon?: ReactNode;
    label: string;
  }[];
  excerpt?: string;
  footer?: ReactNode;
  featured?: boolean;
}

export function ItemCard({
  href,
  title,
  image,
  imageAspect = '4/3',
  badge,
  meta,
  excerpt,
  footer,
  featured = false,
}: ItemCardProps) {
  const aspectRatioClass = {
    '16/9': 'aspect-[16/9]',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
  }[imageAspect];

  const badgeColors = {
    primary: {
      bg: 'var(--color-primary-600)',
      text: 'var(--color-text-inverse)',
    },
    secondary: {
      bg: 'var(--color-secondary-600)',
      text: 'var(--color-text-inverse)',
    },
    neutral: {
      bg: 'var(--color-neutral-200)',
      text: 'var(--color-text-primary)',
    },
  };

  return (
    <Link
      href={href}
      className="group block rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg"
      style={{
        backgroundColor: 'var(--color-background)',
        boxShadow: featured ? 'var(--shadow-md)' : 'var(--shadow-sm)',
      }}
    >
      {/* Image */}
      <div
        className={`relative ${aspectRatioClass} overflow-hidden`}
        style={{ backgroundColor: 'var(--color-neutral-200)' }}
      >
        {/* Badge */}
        {badge && (
          <div
            className="absolute top-3 left-3 z-10 px-3 py-1 text-xs font-medium rounded-full"
            style={{
              backgroundColor: badgeColors[badge.variant || 'primary'].bg,
              color: badgeColors[badge.variant || 'primary'].text,
              fontWeight: 'var(--font-weight-medium)',
            }}
          >
            {badge.label}
          </div>
        )}

        {/* Image Placeholder */}
        {image ? (
          <div className="w-full h-full bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400" />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <svg
              className="w-16 h-16 opacity-30"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3
          className={`font-semibold mb-3 group-hover:text-primary-600 transition-colors ${
            featured ? 'text-xl line-clamp-2' : 'text-lg line-clamp-2'
          }`}
          style={{
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--color-text-primary)',
          }}
        >
          {title}
        </h3>

        {/* Meta Information */}
        {meta && meta.length > 0 && (
          <div
            className="flex flex-wrap items-center gap-4 text-sm mb-3"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            {meta.map((item, index) => (
              <div key={index} className="flex items-center gap-1.5">
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Excerpt */}
        {excerpt && (
          <p
            className={`text-sm mb-4 ${featured ? 'line-clamp-3' : 'line-clamp-2'}`}
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {excerpt}
          </p>
        )}

        {/* Footer */}
        {footer && (
          <div className="pt-3 border-t" style={{ borderColor: 'var(--color-border-light)' }}>
            {footer}
          </div>
        )}
      </div>
    </Link>
  );
}
