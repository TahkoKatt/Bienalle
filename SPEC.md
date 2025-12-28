# Biennale Website Build Specification

**Based on:** Munich Biennale festival website patterns
**Framework:** Next.js 14+ with App Router
**Target:** Contemporary arts festival / cultural event platform

---

## 1. Route Map (Next.js App Router)

### Public Routes

```
app/
├── [locale]/                          # Internationalization (en, de)
│   ├── layout.tsx                     # Root layout with header/footer
│   ├── page.tsx                       # Homepage
│   ├── programm/                      # Events/Program
│   │   ├── page.tsx                   # Program listing (grid view)
│   │   └── [slug]/
│   │       └── page.tsx               # Event detail page
│   ├── festival/                      # About the Festival
│   │   ├── page.tsx                   # Festival overview
│   │   ├── history/
│   │   │   └── page.tsx               # Festival history
│   │   └── team/
│   │       └── page.tsx               # Team & organization
│   ├── info/                          # General Information
│   │   ├── page.tsx                   # Info hub
│   │   ├── venues/
│   │   │   ├── page.tsx               # Venues listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx           # Venue detail
│   │   ├── tickets/
│   │   │   └── page.tsx               # Ticketing info
│   │   └── press/
│   │       └── page.tsx               # Press & media
│   ├── archive/                       # Past Editions
│   │   ├── page.tsx                   # Archive overview
│   │   └── [year]/
│   │       ├── page.tsx               # Year overview
│   │       └── [slug]/
│   │           └── page.tsx           # Archived production
│   ├── news/                          # News & Updates
│   │   ├── page.tsx                   # News listing
│   │   └── [slug]/
│   │       └── page.tsx               # Article detail
│   └── contact/
│       └── page.tsx                   # Contact page
```

### Dynamic Segments

- `[locale]` - Language code (en, de)
- `[slug]` - URL-friendly identifier for events, venues, articles, etc.
- `[year]` - Archive year (2020, 2021, etc.)

### Route Patterns

```typescript
// Route examples with dynamic segments
/en                                    # Homepage (English)
/de                                    # Homepage (German)
/en/programm                           # Program listing
/en/programm/:slug                     # Event detail (e.g., /en/programm/orpheus-reloaded)
/en/info/venues/:slug                  # Venue detail (e.g., /en/info/venues/staatsoper)
/en/archive/:year                      # Archive by year (e.g., /en/archive/2024)
/en/archive/:year/:slug                # Archived production
/en/news/:slug                         # News article
```

---

## 2. Component Inventory (Atomic Design)

### Atoms

**Typography**
- `Heading` - h1, h2, h3, h4, h5, h6 with consistent styling
- `Text` - Body text, captions, labels
- `Link` - Styled anchor tags with hover states

**Buttons & Inputs**
- `Button` - Primary, secondary, outline variants
- `IconButton` - Icon-only buttons
- `Input` - Text input field
- `Textarea` - Multi-line text input
- `Select` - Dropdown select
- `Checkbox` - Checkbox input
- `Radio` - Radio button

**Media**
- `Image` - Next.js optimized image with lazy loading
- `Icon` - SVG icon component
- `Video` - Video player wrapper

**Layout Primitives**
- `Container` - Max-width content container
- `Stack` - Vertical spacing utility
- `Cluster` - Horizontal spacing utility
- `Spacer` - Vertical/horizontal spacing

### Molecules

**Navigation**
- `NavItem` - Single navigation link with active state
- `LanguageSwitch` - Language toggle (EN/DE)
- `Breadcrumb` - Breadcrumb navigation trail
- `Pagination` - Page navigation controls

**Content**
- `EventCard` - Event preview card (image, title, date, venue)
- `NewsCard` - News article preview
- `VenueCard` - Venue preview card
- `DateBadge` - Date display component
- `TagList` - Collection of tags/categories
- `SearchField` - Search input with icon

**Media**
- `ImageGallery` - Image carousel/slider
- `VideoEmbed` - Embedded video player
- `AudioPlayer` - Audio playback controls

**Forms**
- `FormField` - Input with label and error message
- `NewsletterForm` - Email signup form

### Organisms

**Navigation & Layout**
- `Header` - Site header with logo, nav, language switch
- `Footer` - Site footer with links, contact, social
- `MobileMenu` - Mobile navigation drawer
- `FilterBar` - Event filtering controls (date, category, venue)

**Content Sections**
- `Hero` - Homepage hero section
- `EventGrid` - Grid of event cards with filtering
- `EventDetail` - Full event information display
- `ArticleContent` - Rich text article content
- `Timeline` - Historical timeline component
- `TeamGrid` - Team member grid with photos
- `VenueMap` - Interactive venue location map
- `ArchiveExplorer` - Archive browsing interface
- `ContactForm` - Full contact form with validation

**Special Components**
- `CalendarView` - Calendar-based event browser
- `SeasonHighlights` - Featured events carousel
- `TicketWidget` - External ticketing integration
- `PressKit` - Downloadable press materials

---

## 3. Layout Patterns

### Global Layout Structure

```
┌─────────────────────────────────────────┐
│            Header                       │
│  [Logo]  Nav  Nav  Nav    [Lang] [Menu]│
├─────────────────────────────────────────┤
│                                         │
│            Page Content                 │
│                                         │
│                                         │
├─────────────────────────────────────────┤
│            Footer                       │
│   Links | Contact | Social | Newsletter│
└─────────────────────────────────────────┘
```

### Header Layout

**Desktop (≥1024px)**
```
┌────────────────────────────────────────────────────┐
│ [Logo]    Programm  Festival  Info  Archive  News │
│                                   [DE/EN] [Search] │
└────────────────────────────────────────────────────┘
```

**Mobile (<1024px)**
```
┌──────────────────────┐
│ [Logo]    [DE/EN] [☰]│
└──────────────────────┘
```

### Footer Layout

**Three-column layout on desktop, stacked on mobile**

```
┌────────────────────────────────────────────────────┐
│  Festival           Quick Links      Stay Updated  │
│  Address            Programm         Newsletter:   │
│  Phone              Info             [Email Input] │
│  Email              Contact          [Subscribe]   │
│                     Press                          │
│                                                    │
│  [Social Icons]                    [Sponsors]     │
└────────────────────────────────────────────────────┘
```

### Homepage Layout

1. **Hero Section** - Full-width image/video + festival title + CTA
2. **Season Intro** - Centered text block with dates
3. **Highlights** - 3-4 featured events in grid
4. **About** - Brief festival description
5. **News** - Latest 3 news items
6. **Newsletter** - Signup form
7. **Partners** - Sponsor logos grid

### Program Listing Page

1. **Page Header** - Title + intro text
2. **Filter Bar** - Date range, venue, category filters
3. **Event Grid** - 3-column grid (desktop), 1-column (mobile)
4. **Load More** - Pagination or infinite scroll

### Event Detail Page

```
┌───────────────────────────────────┐
│  Breadcrumb                       │
├───────────────────────────────────┤
│  [Large Event Image]              │
├───────────────────────────────────┤
│  Event Title                      │
│  Composer/Artist                  │
│  Date | Time | Venue              │
│  [Book Tickets Button]            │
├───────────────────────────────────┤
│  Description (Rich Text)          │
├───────────────────────────────────┤
│  Credits                          │
│  - Director                       │
│  - Performers                     │
│  - etc.                           │
├───────────────────────────────────┤
│  Image Gallery                    │
├───────────────────────────────────┤
│  Related Events                   │
└───────────────────────────────────┘
```

### Grid Patterns

**Event Grid (Desktop: 3 columns)**
```
┌─────────┐  ┌─────────┐  ┌─────────┐
│ Image   │  │ Image   │  │ Image   │
│ Title   │  │ Title   │  │ Title   │
│ Date    │  │ Date    │  │ Date    │
│ Venue   │  │ Venue   │  │ Venue   │
└─────────┘  └─────────┘  └─────────┘
```

---

## 4. Design Tokens (CSS Variables)

### Color Palette

```css
:root {
  /* Primary Colors - Festival brand colors */
  --color-primary-50: #f5f3ff;
  --color-primary-100: #ede9fe;
  --color-primary-200: #ddd6fe;
  --color-primary-300: #c4b5fd;
  --color-primary-400: #a78bfa;
  --color-primary-500: #8b5cf6;  /* Main brand color */
  --color-primary-600: #7c3aed;
  --color-primary-700: #6d28d9;
  --color-primary-800: #5b21b6;
  --color-primary-900: #4c1d95;

  /* Secondary Colors - Accent */
  --color-secondary-50: #fef2f2;
  --color-secondary-100: #fee2e2;
  --color-secondary-200: #fecaca;
  --color-secondary-300: #fca5a5;
  --color-secondary-400: #f87171;
  --color-secondary-500: #ef4444;  /* Accent color */
  --color-secondary-600: #dc2626;
  --color-secondary-700: #b91c1c;
  --color-secondary-800: #991b1b;
  --color-secondary-900: #7f1d1d;

  /* Neutral Colors */
  --color-neutral-0: #ffffff;
  --color-neutral-50: #fafafa;
  --color-neutral-100: #f5f5f5;
  --color-neutral-200: #e5e5e5;
  --color-neutral-300: #d4d4d4;
  --color-neutral-400: #a3a3a3;
  --color-neutral-500: #737373;
  --color-neutral-600: #525252;
  --color-neutral-700: #404040;
  --color-neutral-800: #262626;
  --color-neutral-900: #171717;
  --color-neutral-950: #0a0a0a;

  /* Semantic Colors */
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;

  /* Background & Surface */
  --color-background: var(--color-neutral-0);
  --color-surface: var(--color-neutral-50);
  --color-surface-elevated: var(--color-neutral-0);

  /* Text Colors */
  --color-text-primary: var(--color-neutral-900);
  --color-text-secondary: var(--color-neutral-600);
  --color-text-tertiary: var(--color-neutral-500);
  --color-text-inverse: var(--color-neutral-0);

  /* Border Colors */
  --color-border-light: var(--color-neutral-200);
  --color-border-medium: var(--color-neutral-300);
  --color-border-dark: var(--color-neutral-400);
}

/* Dark Mode (optional) */
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: var(--color-neutral-950);
    --color-surface: var(--color-neutral-900);
    --color-surface-elevated: var(--color-neutral-800);
    --color-text-primary: var(--color-neutral-50);
    --color-text-secondary: var(--color-neutral-300);
    --color-text-tertiary: var(--color-neutral-400);
    --color-border-light: var(--color-neutral-800);
    --color-border-medium: var(--color-neutral-700);
    --color-border-dark: var(--color-neutral-600);
  }
}
```

### Typography

```css
:root {
  /* Font Families */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-serif: 'Playfair Display', Georgia, serif;
  --font-mono: 'JetBrains Mono', 'Courier New', monospace;

  /* Font Sizes (Type Scale) */
  --font-size-xs: 0.75rem;      /* 12px */
  --font-size-sm: 0.875rem;     /* 14px */
  --font-size-base: 1rem;       /* 16px */
  --font-size-lg: 1.125rem;     /* 18px */
  --font-size-xl: 1.25rem;      /* 20px */
  --font-size-2xl: 1.5rem;      /* 24px */
  --font-size-3xl: 1.875rem;    /* 30px */
  --font-size-4xl: 2.25rem;     /* 36px */
  --font-size-5xl: 3rem;        /* 48px */
  --font-size-6xl: 3.75rem;     /* 60px */
  --font-size-7xl: 4.5rem;      /* 72px */

  /* Line Heights */
  --line-height-tight: 1.25;
  --line-height-snug: 1.375;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;
  --line-height-loose: 2;

  /* Font Weights */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;

  /* Letter Spacing */
  --letter-spacing-tight: -0.025em;
  --letter-spacing-normal: 0em;
  --letter-spacing-wide: 0.025em;
  --letter-spacing-wider: 0.05em;
  --letter-spacing-widest: 0.1em;
}
```

### Spacing Scale

```css
:root {
  /* Spacing Scale (based on 4px grid) */
  --space-0: 0;
  --space-1: 0.25rem;    /* 4px */
  --space-2: 0.5rem;     /* 8px */
  --space-3: 0.75rem;    /* 12px */
  --space-4: 1rem;       /* 16px */
  --space-5: 1.25rem;    /* 20px */
  --space-6: 1.5rem;     /* 24px */
  --space-8: 2rem;       /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-20: 5rem;      /* 80px */
  --space-24: 6rem;      /* 96px */
  --space-32: 8rem;      /* 128px */
  --space-40: 10rem;     /* 160px */
  --space-48: 12rem;     /* 192px */
  --space-56: 14rem;     /* 224px */
  --space-64: 16rem;     /* 256px */

  /* Container Widths */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1536px;
}
```

### Border Radius

```css
:root {
  --radius-none: 0;
  --radius-sm: 0.125rem;    /* 2px */
  --radius-base: 0.25rem;   /* 4px */
  --radius-md: 0.375rem;    /* 6px */
  --radius-lg: 0.5rem;      /* 8px */
  --radius-xl: 0.75rem;     /* 12px */
  --radius-2xl: 1rem;       /* 16px */
  --radius-3xl: 1.5rem;     /* 24px */
  --radius-full: 9999px;
}
```

### Shadows

```css
:root {
  /* Box Shadows */
  --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  --shadow-base: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  --shadow-2xl: 0 50px 100px -20px rgba(0, 0, 0, 0.25);
  --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);
}
```

### Transitions

```css
:root {
  /* Transition Durations */
  --duration-fast: 150ms;
  --duration-base: 200ms;
  --duration-slow: 300ms;
  --duration-slower: 500ms;

  /* Transition Timing Functions */
  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Z-Index Scale

```css
:root {
  --z-base: 0;
  --z-dropdown: 1000;
  --z-sticky: 1100;
  --z-fixed: 1200;
  --z-modal-backdrop: 1300;
  --z-modal: 1400;
  --z-popover: 1500;
  --z-tooltip: 1600;
}
```

---

## 5. Content Models (TypeScript Types)

### Core Models

```typescript
// ============================================================================
// Shared Types
// ============================================================================

export type Locale = 'en' | 'de';

export interface LocalizedString {
  en: string;
  de: string;
}

export interface SEO {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
}

export interface Image {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  credit?: string;
  blurhash?: string;
}

export interface Link {
  label: string;
  href: string;
  external?: boolean;
}

// ============================================================================
// Event / Production
// ============================================================================

export interface Event {
  id: string;
  slug: string;
  title: LocalizedString;
  subtitle?: LocalizedString;
  description: LocalizedString;
  longDescription?: LocalizedString; // Rich text

  // Event Details
  composer?: string;
  director?: string;
  performers: Person[];
  credits: Credit[];

  // Scheduling
  performances: Performance[];
  duration?: number; // in minutes

  // Categorization
  category: EventCategory;
  tags: string[];

  // Venue
  venue: Venue;

  // Media
  featuredImage?: Image;
  gallery?: Image[];
  videoUrl?: string;
  audioUrl?: string;

  // Ticketing
  ticketUrl?: string;
  ticketPrice?: {
    min: number;
    max: number;
    currency: string;
  };
  soldOut?: boolean;

  // Status
  status: 'draft' | 'published' | 'archived';
  featured?: boolean;

  // Metadata
  seo: SEO;
  publishedAt: string; // ISO date
  updatedAt: string; // ISO date
}

export type EventCategory =
  | 'opera'
  | 'musical-theatre'
  | 'performance'
  | 'installation'
  | 'workshop'
  | 'talk'
  | 'other';

export interface Performance {
  id: string;
  eventId: string;
  date: string; // ISO date
  time: string; // HH:mm format
  venue: Venue;
  soldOut?: boolean;
  cancelled?: boolean;
  ticketUrl?: string;
}

// ============================================================================
// Person (Artist, Performer, Team Member)
// ============================================================================

export interface Person {
  id: string;
  slug: string;
  name: string;
  role?: LocalizedString; // e.g., "Director", "Soprano", etc.
  bio?: LocalizedString;
  photo?: Image;
  website?: string;
  social?: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
}

export interface Credit {
  role: LocalizedString; // e.g., "Music Director", "Set Design"
  person: Person;
}

// ============================================================================
// Venue
// ============================================================================

export interface Venue {
  id: string;
  slug: string;
  name: LocalizedString;
  shortName?: string;
  description?: LocalizedString;

  // Location
  address: Address;
  coordinates?: {
    lat: number;
    lng: number;
  };

  // Details
  capacity?: number;
  accessibility?: LocalizedString;
  facilities?: string[];

  // Media
  images?: Image[];

  // Contact
  website?: string;
  phone?: string;
  email?: string;

  // Metadata
  seo: SEO;
}

export interface Address {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

// ============================================================================
// News / Article
// ============================================================================

export interface Article {
  id: string;
  slug: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  content: LocalizedString; // Rich text / Markdown

  // Categorization
  category: ArticleCategory;
  tags: string[];

  // Media
  featuredImage?: Image;
  gallery?: Image[];

  // Author
  author?: Person;

  // Dates
  publishedAt: string; // ISO date
  updatedAt: string; // ISO date

  // Relations
  relatedEvents?: string[]; // Event IDs

  // Metadata
  seo: SEO;
  featured?: boolean;
  status: 'draft' | 'published' | 'archived';
}

export type ArticleCategory =
  | 'news'
  | 'announcement'
  | 'interview'
  | 'review'
  | 'behind-the-scenes';

// ============================================================================
// Archive
// ============================================================================

export interface ArchivedEdition {
  id: string;
  year: number;
  theme?: LocalizedString;
  description?: LocalizedString;

  // Productions from that year
  productions: ArchivedProduction[];

  // Media
  photos?: Image[];
  videos?: string[]; // Video URLs

  // Documents
  program?: string; // PDF URL
  pressReview?: string; // PDF URL
}

export interface ArchivedProduction {
  id: string;
  slug: string;
  title: string;
  composer?: string;
  director?: string;
  venue?: string;
  dates?: string;
  description?: string;
  images?: Image[];
}

// ============================================================================
// Team / Organization
// ============================================================================

export interface TeamMember {
  id: string;
  person: Person;
  position: LocalizedString;
  department?: string;
  order?: number; // For sorting
}

export interface Organization {
  name: LocalizedString;
  description?: LocalizedString;
  logo?: Image;
  website?: string;
}

// ============================================================================
// Pages (Static Content)
// ============================================================================

export interface Page {
  id: string;
  slug: string;
  title: LocalizedString;
  content: LocalizedString; // Rich text
  sections?: PageSection[];

  // Metadata
  seo: SEO;
  template?: 'default' | 'full-width' | 'sidebar';
  publishedAt: string;
  updatedAt: string;
}

export interface PageSection {
  id: string;
  type: 'text' | 'image' | 'video' | 'gallery' | 'cta' | 'team' | 'partners';
  content: any; // Type depends on section type
  order: number;
}

// ============================================================================
// Settings / Configuration
// ============================================================================

export interface SiteSettings {
  festival: {
    name: LocalizedString;
    tagline?: LocalizedString;
    currentEdition: {
      year: number;
      startDate: string; // ISO date
      endDate: string; // ISO date
      theme?: LocalizedString;
    };
  };

  contact: {
    email: string;
    phone: string;
    address: Address;
  };

  social: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
    linkedin?: string;
  };

  navigation: {
    header: NavigationItem[];
    footer: FooterSection[];
  };

  partners: Organization[];
}

export interface NavigationItem {
  label: LocalizedString;
  href: string;
  children?: NavigationItem[];
}

export interface FooterSection {
  title: LocalizedString;
  links: Link[];
}

// ============================================================================
// API Response Types
// ============================================================================

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  code: string;
  details?: any;
}

// ============================================================================
// Form Types
// ============================================================================

export interface NewsletterSubscription {
  email: string;
  locale: Locale;
  consent: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  consent: boolean;
}

// ============================================================================
// Filter & Search Types
// ============================================================================

export interface EventFilters {
  category?: EventCategory[];
  venue?: string[];
  dateFrom?: string;
  dateTo?: string;
  tags?: string[];
  search?: string;
}

export interface SearchResult {
  type: 'event' | 'article' | 'venue' | 'person';
  id: string;
  title: string;
  excerpt?: string;
  url: string;
  image?: string;
}
```

---

## 6. Acceptance Criteria

### Responsive Design

#### Breakpoints

```css
/* Mobile First Approach */
--breakpoint-sm: 640px;   /* Small tablets */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Desktops */
--breakpoint-xl: 1280px;  /* Large desktops */
--breakpoint-2xl: 1536px; /* Extra large */
```

#### Requirements

- [ ] **Mobile (320px - 639px)**
  - [ ] Single column layout
  - [ ] Hamburger menu navigation
  - [ ] Touch-friendly tap targets (min 44x44px)
  - [ ] Readable text without zooming (min 16px base)
  - [ ] Images scale appropriately
  - [ ] Forms are easy to fill on small screens
  - [ ] Event cards stack vertically

- [ ] **Tablet (640px - 1023px)**
  - [ ] 2-column grid for event listings
  - [ ] Collapsible navigation or full menu
  - [ ] Optimized image sizes
  - [ ] Comfortable reading width for text content

- [ ] **Desktop (1024px+)**
  - [ ] 3-column grid for event listings
  - [ ] Full navigation menu visible
  - [ ] Optimal line length for reading (60-80 characters)
  - [ ] Hover states for interactive elements
  - [ ] Multi-column footer layout

- [ ] **General Responsive Requirements**
  - [ ] No horizontal scrolling at any viewport width
  - [ ] Fluid typography (clamp() or responsive units)
  - [ ] Flexible images (max-width: 100%)
  - [ ] Appropriate whitespace at all sizes
  - [ ] Consistent spacing system
  - [ ] Test on real devices (iOS, Android)
  - [ ] Landscape orientation support

### Accessibility (WCAG 2.1 Level AA)

#### Perceivable

- [ ] **Text Alternatives**
  - [ ] All images have descriptive alt text
  - [ ] Decorative images use empty alt=""
  - [ ] Icons have accessible labels
  - [ ] Form inputs have associated labels

- [ ] **Color & Contrast**
  - [ ] Text contrast ratio ≥ 4.5:1 (normal text)
  - [ ] Text contrast ratio ≥ 3:1 (large text 18pt+)
  - [ ] UI component contrast ratio ≥ 3:1
  - [ ] Color not used as only means of conveying information
  - [ ] Focus indicators clearly visible

- [ ] **Adaptable Content**
  - [ ] Semantic HTML5 elements used correctly
  - [ ] Proper heading hierarchy (h1 → h6)
  - [ ] Meaningful reading order without CSS
  - [ ] Content readable at 200% zoom
  - [ ] No loss of information when CSS disabled

- [ ] **Distinguishable**
  - [ ] Text resizable up to 200% without loss of content
  - [ ] Line height at least 1.5x font size
  - [ ] Paragraph spacing at least 2x font size
  - [ ] Letter spacing at least 0.12x font size
  - [ ] No background audio auto-play

#### Operable

- [ ] **Keyboard Accessible**
  - [ ] All functionality available via keyboard
  - [ ] Logical tab order through interactive elements
  - [ ] Visible focus indicator on all interactive elements
  - [ ] No keyboard traps
  - [ ] Skip navigation link provided
  - [ ] Dropdown menus keyboard navigable

- [ ] **Enough Time**
  - [ ] No time limits or adjustable time limits
  - [ ] Animations can be paused
  - [ ] Auto-updating content can be paused/stopped

- [ ] **Seizures & Physical Reactions**
  - [ ] No content flashes more than 3 times per second
  - [ ] Parallax effects can be disabled
  - [ ] Respect prefers-reduced-motion

- [ ] **Navigable**
  - [ ] Descriptive page titles
  - [ ] Link purpose clear from text or context
  - [ ] Multiple navigation methods (menu, search, breadcrumb)
  - [ ] Breadcrumb navigation on deep pages
  - [ ] Current page indicated in navigation
  - [ ] Consistent navigation across site

#### Understandable

- [ ] **Readable**
  - [ ] Page language set (lang attribute)
  - [ ] Language of parts identified when different
  - [ ] Clear, simple language
  - [ ] Abbreviations explained on first use

- [ ] **Predictable**
  - [ ] Consistent navigation location
  - [ ] Consistent component identification
  - [ ] No change of context on focus
  - [ ] No automatic context changes without warning

- [ ] **Input Assistance**
  - [ ] Form errors identified and described
  - [ ] Labels or instructions for user input
  - [ ] Error suggestions provided
  - [ ] Confirmation for important actions
  - [ ] Form validation both client and server-side

#### Robust

- [ ] **Compatible**
  - [ ] Valid HTML5
  - [ ] ARIA landmarks used correctly
  - [ ] ARIA roles, states, properties valid
  - [ ] Status messages announced to screen readers
  - [ ] Tested with screen readers (NVDA, JAWS, VoiceOver)

### Performance

- [ ] **Core Web Vitals**
  - [ ] LCP (Largest Contentful Paint) < 2.5s
  - [ ] FID (First Input Delay) < 100ms
  - [ ] CLS (Cumulative Layout Shift) < 0.1
  - [ ] INP (Interaction to Next Paint) < 200ms

- [ ] **Loading Performance**
  - [ ] Image optimization (WebP/AVIF with fallbacks)
  - [ ] Lazy loading for images below the fold
  - [ ] Critical CSS inlined
  - [ ] JavaScript code splitting
  - [ ] Font loading strategy (font-display: swap)
  - [ ] Resource hints (preconnect, dns-prefetch)

- [ ] **Bundle Size**
  - [ ] Initial JS bundle < 200KB (gzipped)
  - [ ] CSS bundle < 50KB (gzipped)
  - [ ] Tree shaking enabled
  - [ ] No unused dependencies

### Browser Support

- [ ] Chrome (last 2 versions)
- [ ] Firefox (last 2 versions)
- [ ] Safari (last 2 versions)
- [ ] Edge (last 2 versions)
- [ ] Mobile Safari iOS (last 2 versions)
- [ ] Chrome Android (last 2 versions)

### SEO

- [ ] Semantic HTML structure
- [ ] Descriptive meta titles (50-60 characters)
- [ ] Descriptive meta descriptions (150-160 characters)
- [ ] Open Graph tags for social sharing
- [ ] Twitter Card tags
- [ ] Canonical URLs set
- [ ] XML sitemap generated
- [ ] robots.txt configured
- [ ] Structured data (JSON-LD) for events
- [ ] 404 page designed
- [ ] Redirects for moved content

### Internationalization

- [ ] URL structure supports locales (/en/, /de/)
- [ ] Content fully translatable
- [ ] Date/time formatting locale-aware
- [ ] Currency formatting locale-aware
- [ ] Language switcher accessible
- [ ] hreflang tags for alternate languages
- [ ] RTL support if needed (future)

### Security

- [ ] HTTPS enforced
- [ ] Content Security Policy headers
- [ ] XSS protection
- [ ] CSRF protection on forms
- [ ] Secure headers (HSTS, X-Frame-Options, etc.)
- [ ] Input validation and sanitization
- [ ] No sensitive data in URLs or client-side code
- [ ] Rate limiting on API endpoints

### Quality Assurance

- [ ] **Testing**
  - [ ] Unit tests for utilities and helpers
  - [ ] Component tests for UI components
  - [ ] E2E tests for critical user flows
  - [ ] Visual regression testing
  - [ ] Accessibility automated testing (axe-core)
  - [ ] Manual accessibility testing
  - [ ] Cross-browser testing
  - [ ] Mobile device testing

- [ ] **Code Quality**
  - [ ] ESLint configured and passing
  - [ ] Prettier for code formatting
  - [ ] TypeScript strict mode enabled
  - [ ] No console.log in production
  - [ ] Proper error boundaries
  - [ ] Loading and error states handled

---

## 7. Technical Stack Recommendations

### Core Framework
- **Next.js 14+** with App Router
- **React 18+**
- **TypeScript 5+**

### Styling
- **Tailwind CSS** or **CSS Modules**
- **CSS Variables** for design tokens
- **Framer Motion** for animations

### Content Management
- **Contentful** or **Sanity.io** for headless CMS
- **MDX** for rich text content
- **next-intl** for internationalization

### Data Fetching
- **React Query** or **SWR** for client-side fetching
- **Next.js Server Components** for server-side rendering

### Forms
- **React Hook Form** for form handling
- **Zod** for validation

### Testing
- **Vitest** for unit tests
- **Testing Library** for component tests
- **Playwright** for E2E tests
- **axe-core** for accessibility testing

### Deployment
- **Vercel** or **Netlify** for hosting
- **Cloudinary** or **Imgix** for image optimization
- **Vercel Analytics** for performance monitoring

---

## 8. Implementation Phases

### Phase 1: Foundation (Week 1-2)
- Set up Next.js project with TypeScript
- Configure design tokens and global styles
- Implement basic layout (Header, Footer, Container)
- Set up routing structure
- Configure internationalization

### Phase 2: Core Pages (Week 3-4)
- Homepage with hero and highlights
- Program listing page with filters
- Event detail page
- Basic CMS integration

### Phase 3: Content Pages (Week 5-6)
- Info pages (about, venues, tickets)
- News/blog functionality
- Contact page with form
- Archive pages

### Phase 4: Enhancement (Week 7-8)
- Advanced filtering and search
- Image galleries and media players
- Newsletter integration
- Performance optimization

### Phase 5: Polish (Week 9-10)
- Accessibility audit and fixes
- Cross-browser testing
- Content population
- SEO optimization
- Final QA and launch preparation

---

## Notes

This specification provides a comprehensive blueprint for building a modern, accessible, and performant cultural festival website. All components should be built with reusability, maintainability, and user experience in mind.

**Placeholder content strategy:**
- Use Lorem Ipsum for body text
- Generic titles like "Production Title #1"
- Placeholder images from Unsplash or similar
- Sample dates for upcoming season
- Fictional artist and venue names

**Key principles:**
- Mobile-first responsive design
- Accessibility as a core requirement, not an afterthought
- Performance budget enforcement
- Semantic HTML and proper document structure
- Progressive enhancement
- Graceful degradation
