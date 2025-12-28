import { Container, Heading2, Heading3, Text } from '@/components/ui';
import { Hero, EventCard, NewsCard, StatCard } from '@/components/home';
import Link from 'next/link';
import homeData from '@/../../content/mock/home.json';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        title={homeData.hero.title}
        subtitle={homeData.hero.subtitle}
        dates={homeData.hero.dates}
        description={homeData.hero.description}
        primaryCta={homeData.hero.cta.primary}
        secondaryCta={homeData.hero.cta.secondary}
      />

      {/* Season Theme Section */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div
              className="inline-block px-4 py-1 mb-4 text-sm font-medium rounded-full"
              style={{
                backgroundColor: 'var(--color-primary-50)',
                color: 'var(--color-primary-700)',
                fontWeight: 'var(--font-weight-medium)',
              }}
            >
              Season {homeData.season.year}
            </div>
            <Heading2 className="mb-6">{homeData.season.theme}</Heading2>
            <Text className="text-lg" style={{ lineHeight: 'var(--line-height-relaxed)' }}>
              {homeData.season.description}
            </Text>
          </div>
        </Container>
      </section>

      {/* Featured Productions */}
      <section
        className="py-16 md:py-24"
        style={{ backgroundColor: 'var(--color-surface)' }}
      >
        <Container>
          <div className="flex items-end justify-between mb-12">
            <div>
              <Heading2 className="mb-2">Featured Productions</Heading2>
              <Text style={{ color: 'var(--color-text-secondary)' }}>
                Discover this season&apos;s most anticipated performances
              </Text>
            </div>
            <Link
              href="/programm"
              className="hidden md:inline-flex items-center gap-1 text-sm font-medium transition-colors"
              style={{
                color: 'var(--color-primary-600)',
                fontWeight: 'var(--font-weight-medium)',
              }}
            >
              View All
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
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {homeData.featured.map((event) => (
              <EventCard
                key={event.id}
                slug={event.slug}
                title={event.title}
                composer={event.composer}
                director={event.director}
                category={event.category}
                venue={event.venue}
                date={event.date}
                time={event.time}
                image={event.image}
                excerpt={event.excerpt}
                featured={event.featured}
              />
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link
              href="/programm"
              className="inline-flex items-center gap-1 text-sm font-medium"
              style={{
                color: 'var(--color-primary-600)',
                fontWeight: 'var(--font-weight-medium)',
              }}
            >
              View All Productions
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
            </Link>
          </div>
        </Container>
      </section>

      {/* Festival Stats */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard
              value={homeData.stats.productions}
              label="Productions"
              icon={
                <svg
                  className="w-8 h-8"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
              }
            />
            <StatCard
              value={homeData.stats.worldPremieres}
              label="World Premieres"
              icon={
                <svg
                  className="w-8 h-8"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              }
            />
            <StatCard
              value={homeData.stats.artists}
              label="International Artists"
              icon={
                <svg
                  className="w-8 h-8"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
            />
            <StatCard
              value={homeData.stats.venues}
              label="Venues"
              icon={
                <svg
                  className="w-8 h-8"
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
              }
            />
          </div>
        </Container>
      </section>

      {/* Program Overview */}
      <section
        className="py-16 md:py-24"
        style={{ backgroundColor: 'var(--color-surface)' }}
      >
        <Container>
          <div className="max-w-4xl mx-auto">
            <Heading2 className="mb-8 text-center">Explore by Category</Heading2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {homeData.program.categories.map((category) => (
                <Link
                  key={category.name}
                  href={`/programm?category=${category.name.toLowerCase()}`}
                  className="group p-6 rounded-lg text-center transition-all hover:shadow-md"
                  style={{
                    backgroundColor: 'var(--color-background)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'var(--color-border-light)',
                  }}
                >
                  <div
                    className="text-2xl font-bold mb-2 group-hover:text-primary-600 transition-colors"
                    style={{
                      color: 'var(--color-primary-600)',
                      fontWeight: 'var(--font-weight-bold)',
                    }}
                  >
                    {category.count}
                  </div>
                  <div
                    className="text-sm font-medium"
                    style={{
                      color: 'var(--color-text-secondary)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    {category.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Latest News */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="flex items-end justify-between mb-12">
            <div>
              <Heading2 className="mb-2">Latest News</Heading2>
              <Text style={{ color: 'var(--color-text-secondary)' }}>
                Stay updated with festival announcements and stories
              </Text>
            </div>
            <Link
              href="/news"
              className="hidden md:inline-flex items-center gap-1 text-sm font-medium"
              style={{
                color: 'var(--color-primary-600)',
                fontWeight: 'var(--font-weight-medium)',
              }}
            >
              View All
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
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {homeData.news.map((article) => (
              <NewsCard
                key={article.id}
                slug={article.slug}
                title={article.title}
                category={article.category}
                date={article.date}
                excerpt={article.excerpt}
                image={article.image}
              />
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link
              href="/news"
              className="inline-flex items-center gap-1 text-sm font-medium"
              style={{
                color: 'var(--color-primary-600)',
                fontWeight: 'var(--font-weight-medium)',
              }}
            >
              View All News
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
            </Link>
          </div>
        </Container>
      </section>

      {/* About Section */}
      <section
        className="py-16 md:py-24"
        style={{ backgroundColor: 'var(--color-surface)' }}
      >
        <Container>
          <div className="max-w-3xl mx-auto">
            <Heading3 className="mb-6">{homeData.about.title}</Heading3>
            <Text className="mb-6 text-lg" style={{ lineHeight: 'var(--line-height-relaxed)' }}>
              {homeData.about.description}
            </Text>
            <Link
              href={homeData.about.link.href}
              className="inline-flex items-center gap-1 text-sm font-medium"
              style={{
                color: 'var(--color-primary-600)',
                fontWeight: 'var(--font-weight-medium)',
              }}
            >
              {homeData.about.link.label}
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
            </Link>
          </div>
        </Container>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 md:py-24">
        <Container>
          <div
            className="max-w-4xl mx-auto p-8 md:p-12 rounded-2xl text-center"
            style={{
              backgroundColor: 'var(--color-primary-600)',
              color: 'var(--color-text-inverse)',
            }}
          >
            <Heading2 className="mb-4" style={{ color: 'var(--color-text-inverse)' }}>
              Never Miss a Performance
            </Heading2>
            <Text className="mb-8 text-lg" style={{ color: 'var(--color-primary-100)' }}>
              Subscribe to our newsletter for exclusive updates, behind-the-scenes content, and early
              ticket access.
            </Text>
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-base"
                style={{
                  backgroundColor: 'var(--color-background)',
                  color: 'var(--color-text-primary)',
                  borderWidth: '2px',
                  borderStyle: 'solid',
                  borderColor: 'transparent',
                }}
                required
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-lg text-base font-medium transition-all hover:shadow-lg"
                style={{
                  backgroundColor: 'var(--color-background)',
                  color: 'var(--color-primary-600)',
                  fontWeight: 'var(--font-weight-medium)',
                }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </Container>
      </section>
    </>
  );
}
