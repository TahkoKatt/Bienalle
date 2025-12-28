'use client';

import { useState, useRef, useEffect } from 'react';
import { languages, type Language } from '@/lib/nav';

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Close dropdown on Escape key
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

  const handleLanguageChange = (langCode: Language) => {
    setCurrentLang(langCode);
    setIsOpen(false);
    // TODO: Implement actual language switching logic
    // This would typically update the locale in your i18n system
    console.log('Language changed to:', langCode);
  };

  const currentLanguage = languages.find((lang) => lang.code === currentLang);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Language Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-neutral-100"
        style={{
          color: 'var(--color-text-primary)',
          fontWeight: 'var(--font-weight-medium)',
        }}
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* Globe Icon */}
        <svg
          className="w-4 h-4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>

        <span className="hidden sm:inline">{currentLanguage?.label}</span>

        {/* Chevron */}
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
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-32 rounded-lg shadow-lg overflow-hidden"
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
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className="w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-neutral-50"
              style={{
                color: lang.code === currentLang ? 'var(--color-primary-600)' : 'var(--color-text-primary)',
                backgroundColor: lang.code === currentLang ? 'var(--color-primary-50)' : 'transparent',
                fontWeight: lang.code === currentLang ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)',
              }}
              role="menuitem"
            >
              <div className="flex items-center justify-between">
                <span>{lang.label}</span>
                {lang.code === currentLang && (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </button>
          ))}
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
