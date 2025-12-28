'use client';

import { useState } from 'react';

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface FilterBarProps {
  categories?: FilterOption[];
  sortOptions?: FilterOption[];
  onFilterChange?: (filters: { category?: string; sort?: string; search?: string }) => void;
  showSearch?: boolean;
  searchPlaceholder?: string;
}

export function FilterBar({
  categories = [],
  sortOptions = [],
  onFilterChange,
  showSearch = true,
  searchPlaceholder = 'Search...',
}: FilterBarProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSort, setSelectedSort] = useState<string>('date');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onFilterChange?.({
      category: category === 'all' ? undefined : category,
      sort: selectedSort,
      search: searchQuery,
    });
  };

  const handleSortChange = (sort: string) => {
    setSelectedSort(sort);
    onFilterChange?.({
      category: selectedCategory === 'all' ? undefined : selectedCategory,
      sort,
      search: searchQuery,
    });
  };

  const handleSearchChange = (search: string) => {
    setSearchQuery(search);
    onFilterChange?.({
      category: selectedCategory === 'all' ? undefined : selectedCategory,
      sort: selectedSort,
      search,
    });
  };

  return (
    <div
      className="mb-8 p-6 rounded-lg"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'var(--color-border-light)',
      }}
    >
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        {showSearch && (
          <div className="flex-1">
            <div className="relative">
              <input
                type="search"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full px-4 py-2.5 pl-11 text-sm rounded-lg transition-colors focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: 'var(--color-background)',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: 'var(--color-border-medium)',
                  color: 'var(--color-text-primary)',
                }}
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ color: 'var(--color-text-tertiary)' }}
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        )}

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="flex-none">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full lg:w-auto px-4 py-2.5 text-sm rounded-lg transition-colors focus:outline-none focus:ring-2 appearance-none pr-10"
              style={{
                backgroundColor: 'var(--color-background)',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'var(--color-border-medium)',
                color: 'var(--color-text-primary)',
                fontWeight: 'var(--font-weight-medium)',
              }}
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                  {category.count !== undefined && ` (${category.count})`}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Sort */}
        {sortOptions.length > 0 && (
          <div className="flex-none">
            <select
              value={selectedSort}
              onChange={(e) => handleSortChange(e.target.value)}
              className="w-full lg:w-auto px-4 py-2.5 text-sm rounded-lg transition-colors focus:outline-none focus:ring-2 appearance-none pr-10"
              style={{
                backgroundColor: 'var(--color-background)',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'var(--color-border-medium)',
                color: 'var(--color-text-primary)',
                fontWeight: 'var(--font-weight-medium)',
              }}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Active Filters */}
      {(selectedCategory !== 'all' || searchQuery) && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            Active filters:
          </span>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => handleCategoryChange('all')}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-sm rounded-full transition-colors"
              style={{
                backgroundColor: 'var(--color-primary-100)',
                color: 'var(--color-primary-700)',
              }}
            >
              <span>{categories.find((c) => c.value === selectedCategory)?.label}</span>
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          {searchQuery && (
            <button
              onClick={() => handleSearchChange('')}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-sm rounded-full transition-colors"
              style={{
                backgroundColor: 'var(--color-primary-100)',
                color: 'var(--color-primary-700)',
              }}
            >
              <span>&quot;{searchQuery}&quot;</span>
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
