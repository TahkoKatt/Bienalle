'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { mainNavigation } from '@/lib/nav';
import { isRouteActive } from '@/lib/routes';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (href: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(href)) {
      newExpanded.delete(href);
    } else {
      newExpanded.add(href);
    }
    setExpandedItems(newExpanded);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity lg:hidden"
        style={{
          zIndex: 'var(--z-modal-backdrop)',
          animation: 'fadeIn 300ms ease-out',
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div
        id="mobile-menu"
        className="fixed top-16 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl overflow-y-auto lg:hidden"
        style={{
          zIndex: 'var(--z-modal)',
          animation: 'slideInRight 300ms ease-out',
        }}
        role="dialog"
        aria-label="Mobile navigation"
      >
        <nav className="p-6" aria-label="Mobile menu">
          {/* Search Field */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="search"
                placeholder="Search..."
                className="w-full px-4 py-3 pl-11 text-sm border rounded-lg transition-colors focus:outline-none focus:ring-2"
                style={{
                  borderColor: 'var(--color-border-medium)',
                  backgroundColor: 'var(--color-surface)',
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

          {/* Navigation Items */}
          <ul className="space-y-1">
            {mainNavigation.map((item) => {
              const isActive = isRouteActive(pathname, item.href);
              const hasChildren = item.children && item.children.length > 0;
              const isExpanded = expandedItems.has(item.href);

              return (
                <li key={item.href}>
                  {hasChildren ? (
                    // Item with children
                    <>
                      <button
                        onClick={() => toggleExpanded(item.href)}
                        className="flex items-center justify-between w-full px-4 py-3 text-base font-medium rounded-lg transition-colors"
                        style={{
                          color: isActive ? 'var(--color-primary-600)' : 'var(--color-text-primary)',
                          backgroundColor: isActive ? 'var(--color-primary-50)' : 'transparent',
                          fontWeight: 'var(--font-weight-medium)',
                        }}
                        aria-expanded={isExpanded}
                      >
                        <span>{item.label}</span>
                        <svg
                          className={`w-5 h-5 transition-transform ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Submenu */}
                      {isExpanded && (
                        <ul className="mt-1 ml-4 space-y-1" style={{ animation: 'fadeIn 200ms ease-out' }}>
                          {item.children?.map((child) => {
                            const childActive = pathname === child.href;
                            return (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={onClose}
                                  className="block px-4 py-2 text-sm rounded-lg transition-colors"
                                  style={{
                                    color: childActive ? 'var(--color-primary-600)' : 'var(--color-text-secondary)',
                                    backgroundColor: childActive ? 'var(--color-primary-50)' : 'transparent',
                                  }}
                                >
                                  {child.label}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </>
                  ) : (
                    // Simple item
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="block px-4 py-3 text-base font-medium rounded-lg transition-colors"
                      style={{
                        color: isActive ? 'var(--color-primary-600)' : 'var(--color-text-primary)',
                        backgroundColor: isActive ? 'var(--color-primary-50)' : 'transparent',
                        fontWeight: 'var(--font-weight-medium)',
                      }}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Footer Actions */}
          <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--color-border-light)' }}>
            <Link
              href="/contact"
              onClick={onClose}
              className="block w-full px-4 py-3 text-center text-sm font-medium text-white rounded-lg transition-colors"
              style={{
                backgroundColor: 'var(--color-primary-600)',
                fontWeight: 'var(--font-weight-medium)',
              }}
            >
              Contact Us
            </Link>
          </div>
        </nav>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
