'use client';

import { useState, useMemo } from 'react';
import { Container } from '@/components/ui/Container';
import { Heading1 } from '@/components/ui/Typography';
import { FilterBar } from '@/components/listings/FilterBar';
import { ItemCard } from '@/components/cards/ItemCard';
import { Pagination } from '@/components/listings/Pagination';
import programmData from '@/../../content/mock/programm.json';

const ITEMS_PER_PAGE = 9;

export default function ProgrammPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<{
    category?: string;
    sort?: string;
    search?: string;
  }>({
    sort: 'date',
  });

  // Filter and sort productions
  const filteredProductions = useMemo(() => {
    let result = [...programmData.productions];

    // Apply category filter
    if (filters.category) {
      result = result.filter((prod) => prod.categorySlug === filters.category);
    }

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (prod) =>
          prod.title.toLowerCase().includes(searchLower) ||
          prod.excerpt.toLowerCase().includes(searchLower) ||
          prod.composer?.toLowerCase().includes(searchLower) ||
          prod.director?.toLowerCase().includes(searchLower) ||
          prod.venue.toLowerCase().includes(searchLower)
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
        // Keep original order (by date)
        break;
    }

    return result;
  }, [filters]);

  // Paginate results
  const totalPages = Math.ceil(filteredProductions.length / ITEMS_PER_PAGE);
  const paginatedProductions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProductions.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProductions, currentPage]);

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
          background: 'linear-gradient(135deg, var(--color-primary-50) 0%, var(--color-secondary-50) 100%)',
        }}
      >
        <Container>
          <Heading1>Programm</Heading1>
          <p
            className="mt-4 text-lg max-w-3xl"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Explore our complete program of contemporary music theatre, opera, performance,
            and installations. Munich Biennale 2025 presents 24 groundbreaking productions
            from May 15 to June 30, 2025.
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
                style={{ color: 'var(--color-primary-600)' }}
              >
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span style={{ color: 'var(--color-text-primary)' }}>
                May 15 - June 30, 2025
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
                style={{ color: 'var(--color-primary-600)' }}
              >
                <path d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
              </svg>
              <span style={{ color: 'var(--color-text-primary)' }}>
                24 Productions
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
                style={{ color: 'var(--color-primary-600)' }}
              >
                <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <span style={{ color: 'var(--color-text-primary)' }}>
                16 World Premieres
              </span>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        {/* Filter Bar */}
        <FilterBar
          categories={programmData.categories}
          sortOptions={programmData.sortOptions}
          onFilterChange={handleFilterChange}
          showSearch={true}
          searchPlaceholder="Search productions, artists, venues..."
        />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            Showing {filteredProductions.length} {filteredProductions.length === 1 ? 'production' : 'productions'}
            {filters.category || filters.search ? ' matching your filters' : ''}
          </p>
        </div>

        {/* Productions Grid */}
        {paginatedProductions.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {paginatedProductions.map((production) => (
                <ItemCard
                  key={production.id}
                  href={`/programm/${production.id}`}
                  title={production.title}
                  image={production.image}
                  imageAspect="4/3"
                  badge={{
                    label: production.category,
                    variant: 'primary',
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
                      label: production.dates,
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
                          <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      ),
                      label: production.venue,
                    },
                  ]}
                  excerpt={production.excerpt}
                  footer={
                    <div className="flex flex-wrap gap-2 text-xs">
                      {production.composer && (
                        <div style={{ color: 'var(--color-text-secondary)' }}>
                          <span style={{ fontWeight: 'var(--font-weight-medium)' }}>
                            Composer:
                          </span>{' '}
                          {production.composer}
                        </div>
                      )}
                      {production.director && (
                        <div style={{ color: 'var(--color-text-secondary)' }}>
                          <span style={{ fontWeight: 'var(--font-weight-medium)' }}>
                            Director:
                          </span>{' '}
                          {production.director}
                        </div>
                      )}
                      {production.premiere && (
                        <div
                          className="ml-auto px-2 py-0.5 rounded text-xs"
                          style={{
                            backgroundColor: 'var(--color-secondary-100)',
                            color: 'var(--color-secondary-700)',
                            fontWeight: 'var(--font-weight-medium)',
                          }}
                        >
                          World Premiere
                        </div>
                      )}
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
              No productions found
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
