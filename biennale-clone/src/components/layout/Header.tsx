'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Container } from '@/components/ui';
import { mainNavigation, languages } from '@/lib/nav';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm"
      style={{
        borderColor: 'var(--color-border-light)',
        zIndex: 'var(--z-sticky)',
      }}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tight"
            style={{
              color: 'var(--color-primary-600)',
              fontWeight: 'var(--font-weight-bold)',
            }}
          >
            Biennale
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:items-center lg:gap-8">
            {mainNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary-600"
                style={{
                  color: 'var(--color-text-primary)',
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Language Switcher & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center gap-1">
              {languages.map((lang, index) => (
                <span key={lang.code}>
                  <button
                    className="px-2 py-1 text-sm font-medium transition-colors"
                    style={{
                      color: index === 0 ? 'var(--color-primary-600)' : 'var(--color-text-secondary)',
                    }}
                  >
                    {lang.label}
                  </button>
                  {index < languages.length - 1 && (
                    <span style={{ color: 'var(--color-border-medium)' }}>/</span>
                  )}
                </span>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t py-4" style={{ borderColor: 'var(--color-border-light)' }}>
            <nav className="flex flex-col gap-4">
              {mainNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-base font-medium"
                  style={{ color: 'var(--color-text-primary)' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}
