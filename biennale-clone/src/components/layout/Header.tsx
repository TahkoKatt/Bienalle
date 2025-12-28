'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Container } from '@/components/ui';
import { mainNavigation } from '@/lib/nav';
import { isRouteActive } from '@/lib/routes';
import { MobileMenu } from './MobileMenu';
import { LanguageSwitcher } from './LanguageSwitcher';
import { NavDropdown } from './NavDropdown';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Detect scroll for sticky header effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-white/80 backdrop-blur-sm'
        }`}
        style={{
          borderColor: scrolled ? 'var(--color-border-medium)' : 'var(--color-border-light)',
          zIndex: 'var(--z-sticky)',
        }}
      >
        <Container>
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="text-xl font-bold tracking-tight transition-colors hover:opacity-80"
              style={{
                color: 'var(--color-primary-600)',
                fontWeight: 'var(--font-weight-bold)',
              }}
              aria-label="Biennale Home"
            >
              Biennale
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex lg:items-center lg:gap-8" aria-label="Main navigation">
              {mainNavigation.map((item) => {
                const isActive = isRouteActive(pathname, item.href);

                // Nav item with dropdown
                if (item.children && item.children.length > 0) {
                  return (
                    <NavDropdown
                      key={item.href}
                      label={item.label}
                      items={item.children}
                      isActive={isActive}
                    />
                  );
                }

                // Simple nav item
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium transition-colors relative group ${
                      isActive ? 'text-primary-600' : ''
                    }`}
                    style={{
                      color: isActive ? 'var(--color-primary-600)' : 'var(--color-text-primary)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    {item.label}
                    {/* Active indicator */}
                    <span
                      className={`absolute -bottom-5 left-0 right-0 h-0.5 transition-transform ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                      style={{ backgroundColor: 'var(--color-primary-600)' }}
                      aria-hidden="true"
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Search Button (Desktop) */}
              <button
                type="button"
                className="hidden lg:flex items-center justify-center w-9 h-9 rounded-md transition-colors hover:bg-neutral-100"
                aria-label="Search"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Language Switcher */}
              <LanguageSwitcher />

              {/* Mobile Menu Button */}
              <button
                type="button"
                className="lg:hidden flex items-center justify-center w-9 h-9 rounded-md transition-colors hover:bg-neutral-100"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <svg
                  className="w-6 h-6 transition-transform duration-300"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style={{
                    transform: mobileMenuOpen ? 'rotate(90deg)' : 'rotate(0)',
                  }}
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
        </Container>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
