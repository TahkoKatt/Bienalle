'use client';

import { useState, useMemo } from 'react';
import { Container } from '@/components/ui/Container';
import { Heading1 } from '@/components/ui/Typography';
import { FilterBar } from '@/components/listings/FilterBar';
import { ItemCard } from '@/components/cards/ItemCard';
import { Pagination } from '@/components/listings/Pagination';
import newsData from '@/../../content/mock/news.json';

const ITEMS_PER_PAGE = 12;

export default function NewsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<{
    category?: string;
    sort?: string;
    search?: string;
  }>({
    sort: 'date',
  });

  // Filter and sort articles
  const filteredArticles = useMemo(() => {
    let result = [...newsData.articles];

    // Apply category filter
    if (filters.category) {
      result = result.filter((article) => article.categorySlug === filters.category);
    }

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (article) =>
          article.title.toLowerCase().includes(searchLower) ||
          article.excerpt.toLowerCase().includes(searchLower) ||
          article.author.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    switch (filters.sort) {
      case 'title':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'category':
        result.sort((a, b) => a.category.localeCompare(b.category));
        break;
      case 'date':
      default:
        // Sort by date (newest first)
        result.sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime());
        break;
    }

    return result;
  }, [filters]);

  // Paginate results
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredArticles, currentPage]);

  // Reset to page 1 when filters change
  const handleFilterChange = (newFilters: {
    category?: string;
    sort?: string;
    search?: string;
  }) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main>
      <div
        className="py-16"
        style={{
          background: 'linear-gradient(135deg, var(--color-secondary-50) 0%, var(--color-primary-50) 100%)',
        }}
      >
        <Container>
          <Heading1>News & Updates</Heading1>
          <p
            className="mt-4 text-lg max-w-3xl"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Stay informed with the latest announcements, artist interviews, behind-the-scenes
            insights, and reviews from Munich Biennale 2025. Discover the stories behind
            the performances.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm"
              style={{
                backgroundColor: 'var(--color-background)',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'var(--color-border-light)',
              }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ color: 'var(--color-secondary-600)' }}
              >
                <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <span style={{ color: 'var(--color-text-primary)' }}>
                {newsData.articles.length} Articles
              </span>
            </div>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm"
              style={{
                backgroundColor: 'var(--color-background)',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'var(--color-border-light)',
              }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ color: 'var(--color-secondary-600)' }}
              >
                <path d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              <span style={{ color: 'var(--color-text-primary)' }}>
                5 Categories
              </span>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        {/* Filter Bar */}
        <FilterBar
          categories={newsData.categories}
          sortOptions={newsData.sortOptions}
          onFilterChange={handleFilterChange}
          showSearch={true}
          searchPlaceholder="Search articles, authors, topics..."
        />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            Showing {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
            {filters.category || filters.search ? ' matching your filters' : ''}
          </p>
        </div>

        {/* Articles Grid */}
        {paginatedArticles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {paginatedArticles.map((article) => (
                <ItemCard
                  key={article.id}
                  href={`/news/${article.id}`}
                  title={article.title}
                  image={article.image}
                  imageAspect="16/9"
                  badge={{
                    label: article.category,
                    variant: 'secondary',
                  }}
                  meta={[
                    {
                      icon: (
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
                      ),
                      label: article.date,
                    },
                    {
                      icon: (
                        <svg
                          className="w-4 h-4"
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
                      label: article.author,
                    },
                  ]}
                  excerpt={article.excerpt}
                  footer={
                    <div className="flex items-center justify-between text-xs">
                      <div
                        className="flex items-center gap-1.5"
                        style={{ color: 'var(--color-text-tertiary)' }}
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
                          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{article.readTime}</span>
                      </div>
                      <button
                        className="inline-flex items-center gap-1 transition-colors hover:opacity-70"
                        style={{ color: 'var(--color-secondary-600)' }}
                      >
                        <span style={{ fontWeight: 'var(--font-weight-medium)' }}>
                          Read more
                        </span>
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
                      </button>
                    </div>
                  }
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <div
            className="text-center py-16 rounded-lg"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'var(--color-border-light)',
            }}
          >
            <svg
              className="w-16 h-16 mx-auto mb-4 opacity-30"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3
              className="text-lg mb-2"
              style={{
                color: 'var(--color-text-primary)',
                fontWeight: 'var(--font-weight-semibold)',
              }}
            >
              No articles found
            </h3>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Try adjusting your filters or search query
            </p>
          </div>
        )}
      </Container>
    </main>
  );
}
