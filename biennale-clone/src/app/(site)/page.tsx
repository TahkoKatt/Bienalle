import { Container, Grid, Heading1, Heading2, Text, Lead } from '@/components/ui';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="py-20 md:py-32"
        style={{ backgroundColor: 'var(--color-surface)' }}
      >
        <Container>
          <div className="max-w-3xl">
            <Heading1 className="mb-6">
              Contemporary Arts Festival 2025
            </Heading1>
            <Lead className="mb-8">
              Experience groundbreaking performances, opera, and contemporary arts
              from May 15 - June 30, 2025 across Munich&apos;s most prestigious venues.
            </Lead>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/programm"
                className="inline-flex items-center px-6 py-3 rounded-lg font-medium text-white transition-colors"
                style={{
                  backgroundColor: 'var(--color-primary-600)',
                  fontWeight: 'var(--font-weight-medium)',
                }}
              >
                View Program
              </Link>
              <Link
                href="/info/tickets"
                className="inline-flex items-center px-6 py-3 rounded-lg font-medium border transition-colors"
                style={{
                  borderColor: 'var(--color-border-dark)',
                  color: 'var(--color-text-primary)',
                  fontWeight: 'var(--font-weight-medium)',
                }}
              >
                Get Tickets
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Season Intro */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <Heading2 className="mb-6">
              Season 2025: Transformation
            </Heading2>
            <Text className="text-lg">
              This year&apos;s festival explores themes of transformation, identity, and
              renewal through innovative productions by emerging and established artists
              from around the world.
            </Text>
          </div>
        </Container>
      </section>

      {/* Highlights */}
      <section
        className="py-16 md:py-24"
        style={{ backgroundColor: 'var(--color-surface)' }}
      >
        <Container>
          <Heading2 className="mb-12 text-center">
            Featured Productions
          </Heading2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="group cursor-pointer"
              >
                <div
                  className="aspect-[4/3] mb-4 rounded-lg overflow-hidden"
                  style={{ backgroundColor: 'var(--color-neutral-200)' }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <Text
                      className="text-sm"
                      style={{ color: 'var(--color-text-tertiary)' }}
                    >
                      Production Image {i}
                    </Text>
                  </div>
                </div>
                <h3
                  className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors"
                  style={{ fontWeight: 'var(--font-weight-semibold)' }}
                >
                  Production Title {i}
                </h3>
                <p
                  className="text-sm mb-2"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Composer Name • Director Name
                </p>
                <p
                  className="text-sm"
                  style={{ color: 'var(--color-text-tertiary)' }}
                >
                  May {15 + i * 5}, 2025 • Staatsoper
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/programm"
              className="inline-flex items-center text-sm font-medium"
              style={{
                color: 'var(--color-primary-600)',
                fontWeight: 'var(--font-weight-medium)',
              }}
            >
              View Full Program →
            </Link>
          </div>
        </Container>
      </section>

      {/* About */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Heading2 className="mb-6">About the Festival</Heading2>
            <Text className="mb-4">
              The Biennale is a leading platform for contemporary opera and musical
              theater, commissioning and presenting world premieres and innovative
              interpretations of existing works.
            </Text>
            <Text className="mb-6">
              Founded in 1988, the festival has become an essential destination for
              artists, audiences, and industry professionals seeking to experience
              the future of opera and performance.
            </Text>
            <Link
              href="/festival"
              className="inline-flex items-center text-sm font-medium"
              style={{
                color: 'var(--color-primary-600)',
                fontWeight: 'var(--font-weight-medium)',
              }}
            >
              Learn More →
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
