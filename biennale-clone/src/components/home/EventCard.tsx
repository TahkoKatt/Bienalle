import Link from 'next/link';

interface EventCardProps {
  slug: string;
  title: string;
  composer: string;
  director: string;
  category: string;
  venue: string;
  date: string;
  time: string;
  image?: string;
  excerpt: string;
  featured?: boolean;
}

export function EventCard({
  slug,
  title,
  composer,
  director,
  category,
  venue,
  date,
  time,
  image,
  excerpt,
  featured = false,
}: EventCardProps) {
  // Format date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <Link
      href={`/programm/${slug}`}
      className="group block rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg"
      style={{
        backgroundColor: 'var(--color-background)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      {/* Image */}
      <div
        className="relative aspect-[4/3] overflow-hidden"
        style={{ backgroundColor: 'var(--color-neutral-200)' }}
      >
        {/* Category Badge */}
        <div
          className="absolute top-3 left-3 z-10 px-3 py-1 text-xs font-medium rounded-full"
          style={{
            backgroundColor: 'var(--color-primary-600)',
            color: 'var(--color-text-inverse)',
            fontWeight: 'var(--font-weight-medium)',
          }}
        >
          {category}
        </div>

        {/* Placeholder image */}
        {image ? (
          <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400" />
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
              <path d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
            </svg>
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3
          className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors line-clamp-2"
          style={{
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--color-text-primary)',
          }}
        >
          {title}
        </h3>

        {/* Credits */}
        <div
          className="text-sm mb-3 space-y-1"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          <p>Composer: {composer}</p>
          <p>Director: {director}</p>
        </div>

        {/* Excerpt */}
        {featured && (
          <p
            className="text-sm mb-4 line-clamp-2"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {excerpt}
          </p>
        )}

        {/* Meta info */}
        <div
          className="flex items-center gap-4 text-sm pt-3 border-t"
          style={{
            borderColor: 'var(--color-border-light)',
            color: 'var(--color-text-tertiary)',
          }}
        >
          <div className="flex items-center gap-1.5">
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
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg
              className="w-4 h-4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{venue}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
