import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { DetailHero, MetaInfo, Sidebar, BodyContent } from '@/components/detail';
import newsData from '@/../../content/mock/news.json';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function NewsDetailPage({ params }: PageProps) {
  // Find article by slug
  const article = newsData.articles.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  // Check if this article has detailed body content
  const hasBodyContent = 'body' in article && article.body;

  return (
    <main>
      {/* Hero Section */}
      <DetailHero
        title={article.title}
        badge={{
          label: article.category,
          variant: 'secondary',
        }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'News', href: '/news' },
          { label: article.title, href: `/news/${article.slug}` },
        ]}
        image={article.image}
      >
        {/* Meta Information */}
        <div className="mt-6">
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
                label: 'Published',
                value: article.date,
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
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                ),
                label: 'Author',
                value: article.author,
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
                label: 'Read Time',
                value: article.readTime,
              },
            ]}
          />
        </div>
      </DetailHero>

      {/* Main Content */}
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Body Content */}
          <div className="lg:col-span-2">
            {/* Lead/Excerpt */}
            <div
              className="text-xl mb-8 pb-8 border-b"
              style={{
                color: 'var(--color-text-secondary)',
                borderColor: 'var(--color-border-light)',
                lineHeight: 'var(--line-height-relaxed)',
              }}
            >
              {article.excerpt}
            </div>

            {/* Article Body */}
            {hasBodyContent ? (
              <BodyContent>
                <div
                  style={{ whiteSpace: 'pre-wrap' }}
                  dangerouslySetInnerHTML={{ __html: article.body.replace(/\n\n/g, '</p><p>').replace(/^(.+)$/, '<p>$1</p>') }}
                />
              </BodyContent>
            ) : (
              <BodyContent>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  Full article content will be available soon.
                </p>
              </BodyContent>
            )}

            {/* Share Section */}
            <div
              className="mt-12 pt-8 border-t"
              style={{ borderColor: 'var(--color-border-light)' }}
            >
              <h3
                className="text-sm font-medium uppercase tracking-wide mb-4"
                style={{
                  color: 'var(--color-text-tertiary)',
                  fontWeight: 'var(--font-weight-medium)',
                }}
              >
                Share this article
              </h3>
              <div className="flex gap-3">
                {['Twitter', 'Facebook', 'LinkedIn', 'Email'].map((platform) => (
                  <button
                    key={platform}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    style={{
                      backgroundColor: 'var(--color-surface)',
                      color: 'var(--color-text-primary)',
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderColor: 'var(--color-border-medium)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar
              sections={[
                // About Author
                {
                  title: 'About the Author',
                  content: (
                    <div className="text-sm">
                      <div
                        className="font-medium mb-2"
                        style={{
                          color: 'var(--color-text-primary)',
                          fontWeight: 'var(--font-weight-medium)',
                        }}
                      >
                        {article.author}
                      </div>
                      <p style={{ color: 'var(--color-text-secondary)' }}>
                        {article.author === 'Festival Team'
                          ? 'The Munich Biennale team brings you the latest updates, announcements, and insights from the festival.'
                          : `${article.author} is a contributor to Munich Biennale, covering contemporary music theatre and performance art.`}
                      </p>
                    </div>
                  ),
                },

                // Related Articles
                {
                  title: 'Related Articles',
                  content: (
                    <div className="space-y-4">
                      {newsData.articles
                        .filter(
                          (a) =>
                            a.categorySlug === article.categorySlug && a.id !== article.id
                        )
                        .slice(0, 3)
                        .map((relatedArticle) => (
                          <Link
                            key={relatedArticle.id}
                            href={`/news/${relatedArticle.slug || relatedArticle.id}`}
                            className="block group"
                          >
                            <h4
                              className="text-sm font-medium mb-1 group-hover:opacity-70 transition-opacity"
                              style={{
                                color: 'var(--color-text-primary)',
                                fontWeight: 'var(--font-weight-medium)',
                              }}
                            >
                              {relatedArticle.title}
                            </h4>
                            <p
                              className="text-xs"
                              style={{ color: 'var(--color-text-tertiary)' }}
                            >
                              {relatedArticle.date}
                            </p>
                          </Link>
                        ))}
                      {newsData.articles.filter(
                        (a) => a.categorySlug === article.categorySlug && a.id !== article.id
                      ).length === 0 && (
                        <p
                          className="text-sm"
                          style={{ color: 'var(--color-text-secondary)' }}
                        >
                          No related articles available.
                        </p>
                      )}
                    </div>
                  ),
                },

                // Newsletter CTA
                {
                  title: 'Stay Updated',
                  content: (
                    <div className="space-y-4 text-sm">
                      <p style={{ color: 'var(--color-text-secondary)' }}>
                        Subscribe to our newsletter for the latest news, interviews, and
                        festival updates.
                      </p>
                      <form className="space-y-3">
                        <input
                          type="email"
                          placeholder="Your email"
                          className="w-full px-3 py-2 rounded-lg text-sm"
                          style={{
                            backgroundColor: 'var(--color-background)',
                            color: 'var(--color-text-primary)',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            borderColor: 'var(--color-border-medium)',
                          }}
                          required
                        />
                        <button
                          type="submit"
                          className="w-full px-4 py-2 rounded-lg text-sm font-medium transition-all hover:shadow-md"
                          style={{
                            backgroundColor: 'var(--color-secondary-600)',
                            color: 'var(--color-text-inverse)',
                            fontWeight: 'var(--font-weight-medium)',
                          }}
                        >
                          Subscribe
                        </button>
                      </form>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </Container>

      {/* Back to News */}
      <div
        className="py-8"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderTopWidth: '1px',
          borderTopStyle: 'solid',
          borderTopColor: 'var(--color-border-light)',
        }}
      >
        <Container>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-70"
            style={{
              color: 'var(--color-secondary-600)',
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
              <path d="M15 19l-7-7 7-7" />
            </svg>
            Back to All News
          </Link>
        </Container>
      </div>
    </main>
  );
}
