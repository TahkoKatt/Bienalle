import Link from 'next/link';

interface HeroProps {
  title: string;
  subtitle: string;
  dates: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
}

export function Hero({ title, subtitle, dates, description, primaryCta, secondaryCta }: HeroProps) {
  return (
    <section
      className="relative py-20 md:py-32 lg:py-40 overflow-hidden"
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-primary-600) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Dates Badge */}
          <div className="mb-6">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
              style={{
                backgroundColor: 'var(--color-primary-100)',
                color: 'var(--color-primary-700)',
                fontWeight: 'var(--font-weight-medium)',
              }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {dates}
            </span>
          </div>

          {/* Subtitle */}
          <p
            className="text-lg md:text-xl mb-4"
            style={{
              color: 'var(--color-primary-600)',
              fontWeight: 'var(--font-weight-semibold)',
            }}
          >
            {subtitle}
          </p>

          {/* Main Title */}
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
            style={{
              fontWeight: 'var(--font-weight-bold)',
              lineHeight: 'var(--line-height-tight)',
              color: 'var(--color-text-primary)',
            }}
          >
            {title}
          </h1>

          {/* Description */}
          <p
            className="text-lg md:text-xl mb-8 leading-relaxed"
            style={{
              color: 'var(--color-text-secondary)',
              lineHeight: 'var(--line-height-relaxed)',
            }}
          >
            {description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg text-base font-medium transition-all hover:shadow-lg hover:scale-105"
              style={{
                backgroundColor: 'var(--color-primary-600)',
                color: 'var(--color-text-inverse)',
                fontWeight: 'var(--font-weight-medium)',
              }}
            >
              {primaryCta.label}
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              href={secondaryCta.href}
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg text-base font-medium border-2 transition-all hover:shadow-md"
              style={{
                borderColor: 'var(--color-border-dark)',
                color: 'var(--color-text-primary)',
                fontWeight: 'var(--font-weight-medium)',
              }}
            >
              {secondaryCta.label}
            </Link>
          </div>
        </div>

        {/* Decorative Element */}
        <div
          className="absolute right-0 bottom-0 w-1/3 h-1/3 opacity-10 hidden lg:block"
          aria-hidden="true"
        >
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="80" stroke="var(--color-primary-600)" strokeWidth="2" />
            <circle cx="100" cy="100" r="60" stroke="var(--color-primary-600)" strokeWidth="2" />
            <circle cx="100" cy="100" r="40" stroke="var(--color-primary-600)" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </section>
  );
}
