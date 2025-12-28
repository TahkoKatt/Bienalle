import Link from 'next/link';
import { Container } from '@/components/ui';
import { footerNavigation } from '@/lib/nav';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t mt-auto"
      style={{
        borderColor: 'var(--color-border-light)',
        backgroundColor: 'var(--color-surface)',
      }}
    >
      <Container>
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
          {footerNavigation.map((section) => (
            <div key={section.title}>
              <h3
                className="text-sm font-semibold mb-4"
                style={{
                  color: 'var(--color-text-primary)',
                  fontWeight: 'var(--font-weight-semibold)',
                }}
              >
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors"
                      style={{
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div
          className="border-t py-8"
          style={{ borderColor: 'var(--color-border-light)' }}
        >
          <div className="max-w-md">
            <h3
              className="text-sm font-semibold mb-3"
              style={{
                color: 'var(--color-text-primary)',
                fontWeight: 'var(--font-weight-semibold)',
              }}
            >
              Stay Updated
            </h3>
            <p
              className="text-sm mb-4"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Subscribe to our newsletter for the latest updates and announcements.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 text-sm border rounded-md"
                style={{
                  borderColor: 'var(--color-border-medium)',
                  backgroundColor: 'var(--color-background)',
                }}
              />
              <button
                className="px-4 py-2 text-sm font-medium text-white rounded-md transition-colors"
                style={{
                  backgroundColor: 'var(--color-primary-600)',
                  fontWeight: 'var(--font-weight-medium)',
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="border-t py-6 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: 'var(--color-border-light)' }}
        >
          <p className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
            © {currentYear} Biennale. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-sm"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              Terms
            </Link>
            <Link
              href="/accessibility"
              className="text-sm"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              Accessibility
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
