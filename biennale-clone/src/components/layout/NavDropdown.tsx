'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import type { NavItem } from '@/lib/nav';

interface NavDropdownProps {
  label: string;
  items: NavItem[];
  isActive: boolean;
}

export function NavDropdown({ label, items, isActive }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Handle mouse enter with slight delay
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  // Handle mouse leave with slight delay
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1 text-sm font-medium transition-colors relative group ${
          isActive ? 'text-primary-600' : ''
        }`}
        style={{
          color: isActive ? 'var(--color-primary-600)' : 'var(--color-text-primary)',
          fontWeight: 'var(--font-weight-medium)',
        }}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{label}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>

        {/* Active indicator */}
        <span
          className={`absolute -bottom-5 left-0 right-0 h-0.5 transition-transform ${
            isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
          }`}
          style={{ backgroundColor: 'var(--color-primary-600)' }}
          aria-hidden="true"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute top-full left-0 mt-2 w-56 rounded-lg shadow-lg overflow-hidden"
          style={{
            backgroundColor: 'var(--color-background)',
            borderColor: 'var(--color-border-light)',
            boxShadow: 'var(--shadow-lg)',
            zIndex: 'var(--z-dropdown)',
            animation: 'fadeInDown 200ms ease-out',
          }}
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-2">
            {items.map((item) => {
              const itemActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2.5 text-sm transition-colors hover:bg-neutral-50"
                  style={{
                    color: itemActive ? 'var(--color-primary-600)' : 'var(--color-text-primary)',
                    backgroundColor: itemActive ? 'var(--color-primary-50)' : 'transparent',
                    fontWeight: itemActive ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)',
                  }}
                  role="menuitem"
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
