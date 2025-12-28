import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { DetailHero, MetaInfo, Sidebar, BodyContent } from '@/components/detail';
import programmData from '@/../../content/mock/programm.json';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function ProgrammDetailPage({ params }: PageProps) {
  // Find production by slug
  const production = programmData.productions.find((p) => p.slug === params.slug);

  if (!production) {
    notFound();
  }

  // Check if this production has detailed body content
  const hasBodyContent = 'body' in production && production.body;

  return (
    <main>
      {/* Hero Section */}
      <DetailHero
        title={production.title}
        subtitle={production.excerpt}
        badge={{
          label: production.category,
          variant: 'primary',
        }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Programm', href: '/programm' },
          { label: production.title, href: `/programm/${production.slug}` },
        ]}
        image={production.image}
      >
        {/* Meta Information */}
        <div className="mt-8">
          <MetaInfo
            items={[
              {
                icon: (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                label: 'Dates',
                value: production.dates,
              },
              {
                icon: (
                  <svg
                    className="w-5 h-5"
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
                ),
                label: 'Venue',
                value: production.venue,
              },
              {
                icon: (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                label: 'Duration',
                value: production.duration,
              },
              ...(production.premiere
                ? [
                    {
                      icon: (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      ),
                      label: 'Status',
                      value: (
                        <span
                          className="inline-block px-2 py-1 text-xs rounded"
                          style={{
                            backgroundColor: 'var(--color-secondary-100)',
                            color: 'var(--color-secondary-700)',
                            fontWeight: 'var(--font-weight-semibold)',
                          }}
                        >
                          World Premiere
                        </span>
                      ),
                    },
                  ]
                : []),
            ]}
          />
        </div>
      </DetailHero>

      {/* Main Content */}
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Body Content */}
          <div className="lg:col-span-2">
            {hasBodyContent ? (
              <div className="space-y-8">
                {/* About Section */}
                {production.body.about && (
                  <section>
                    <h2
                      className="text-2xl font-semibold mb-4"
                      style={{
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      About the Production
                    </h2>
                    <BodyContent>
                      <div style={{ whiteSpace: 'pre-wrap' }}>{production.body.about}</div>
                    </BodyContent>
                  </section>
                )}

                {/* Production Details */}
                {production.body.production && (
                  <section>
                    <h2
                      className="text-2xl font-semibold mb-4"
                      style={{
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      Production Details
                    </h2>
                    <BodyContent>
                      <div style={{ whiteSpace: 'pre-wrap' }}>{production.body.production}</div>
                    </BodyContent>
                  </section>
                )}

                {/* Creative Team */}
                {production.body.creative && (
                  <section>
                    <h2
                      className="text-2xl font-semibold mb-4"
                      style={{
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      Creative Background
                    </h2>
                    <BodyContent>
                      <div style={{ whiteSpace: 'pre-wrap' }}>{production.body.creative}</div>
                    </BodyContent>
                  </section>
                )}
              </div>
            ) : (
              <BodyContent>
                <p>{production.excerpt}</p>
                <p className="mt-4" style={{ color: 'var(--color-text-secondary)' }}>
                  Detailed information about this production will be available soon.
                </p>
              </BodyContent>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar
              sections={[
                // Creative Team
                {
                  title: 'Creative Team',
                  content: (
                    <div className="space-y-3 text-sm">
                      {production.composer && (
                        <div>
                          <div
                            className="text-xs uppercase tracking-wide mb-1"
                            style={{ color: 'var(--color-text-tertiary)' }}
                          >
                            Composer
                          </div>
                          <div style={{ color: 'var(--color-text-primary)' }}>
                            {production.composer}
                          </div>
                        </div>
                      )}
                      {production.director && (
                        <div>
                          <div
                            className="text-xs uppercase tracking-wide mb-1"
                            style={{ color: 'var(--color-text-tertiary)' }}
                          >
                            Director
                          </div>
                          <div style={{ color: 'var(--color-text-primary)' }}>
                            {production.director}
                          </div>
                        </div>
                      )}
                      {'performers' in production && production.performers && (
                        <div>
                          <div
                            className="text-xs uppercase tracking-wide mb-1"
                            style={{ color: 'var(--color-text-tertiary)' }}
                          >
                            Performers
                          </div>
                          <ul className="space-y-1">
                            {production.performers.map((performer, index) => (
                              <li key={index} style={{ color: 'var(--color-text-primary)' }}>
                                {performer}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ),
                },

                // Performance Schedule
                ...('schedule' in production && production.schedule
                  ? [
                      {
                        title: 'Performance Schedule',
                        content: (
                          <div className="space-y-2 text-sm">
                            {production.schedule.map((perf, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between py-2 border-b"
                                style={{ borderColor: 'var(--color-border-light)' }}
                              >
                                <span style={{ color: 'var(--color-text-primary)' }}>
                                  {perf.date}
                                </span>
                                <span
                                  style={{
                                    color: 'var(--color-text-secondary)',
                                    fontWeight: 'var(--font-weight-medium)',
                                  }}
                                >
                                  {perf.time}
                                </span>
                              </div>
                            ))}
                          </div>
                        ),
                      },
                    ]
                  : []),

                // Ticket Information
                {
                  title: 'Ticket Information',
                  content: (
                    <div className="space-y-4 text-sm">
                      {'ticketPrice' in production && production.ticketPrice && (
                        <div>
                          <div
                            className="text-xs uppercase tracking-wide mb-1"
                            style={{ color: 'var(--color-text-tertiary)' }}
                          >
                            Price Range
                          </div>
                          <div
                            className="text-lg font-semibold"
                            style={{
                              color: 'var(--color-primary-600)',
                              fontWeight: 'var(--font-weight-semibold)',
                            }}
                          >
                            {production.ticketPrice}
                          </div>
                        </div>
                      )}
                      {'language' in production && production.language && (
                        <div>
                          <div
                            className="text-xs uppercase tracking-wide mb-1"
                            style={{ color: 'var(--color-text-tertiary)' }}
                          >
                            Language
                          </div>
                          <div style={{ color: 'var(--color-text-primary)' }}>
                            {production.language}
                          </div>
                        </div>
                      )}
                      <Link
                        href="/tickets"
                        className="inline-block w-full px-4 py-3 rounded-lg text-center font-medium transition-all hover:shadow-lg"
                        style={{
                          backgroundColor: 'var(--color-primary-600)',
                          color: 'var(--color-text-inverse)',
                          fontWeight: 'var(--font-weight-medium)',
                        }}
                      >
                        Get Tickets
                      </Link>
                      <p
                        className="text-xs text-center"
                        style={{ color: 'var(--color-text-tertiary)' }}
                      >
                        Student rush tickets €10
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </Container>
    </main>
  );
}
