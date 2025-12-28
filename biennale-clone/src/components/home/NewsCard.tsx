import Link from 'next/link';

interface NewsCardProps {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image?: string;
}

export function NewsCard({ slug, title, category, date, excerpt, image }: NewsCardProps) {
  // Format date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Link
      href={`/news/${slug}`}
      className="group flex flex-col rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg"
      style={{
        backgroundColor: 'var(--color-background)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      {/* Image */}
      <div
        className="relative aspect-[16/9] overflow-hidden"
        style={{ backgroundColor: 'var(--color-neutral-200)' }}
      >
        {image ? (
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-400" />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <svg
              className="w-12 h-12 opacity-30"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="flex-1 p-5 flex flex-col">
        {/* Category & Date */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-xs font-medium px-2 py-1 rounded"
            style={{
              backgroundColor: 'var(--color-primary-50)',
              color: 'var(--color-primary-700)',
              fontWeight: 'var(--font-weight-medium)',
            }}
          >
            {category}
          </span>
          <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
            {formattedDate}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-lg font-semibold mb-2 group-hover:text-primary-600 transition-colors line-clamp-2"
          style={{
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--color-text-primary)',
          }}
        >
          {title}
        </h3>

        {/* Excerpt */}
        <p
          className="text-sm line-clamp-3 flex-1"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {excerpt}
        </p>

        {/* Read more link */}
        <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--color-border-light)' }}>
          <span
            className="inline-flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all"
            style={{
              color: 'var(--color-primary-600)',
              fontWeight: 'var(--font-weight-medium)',
            }}
          >
            Read More
            <svg
              className="w-4 h-4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
