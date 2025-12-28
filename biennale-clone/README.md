# Biennale Clone - Next.js App

A modern, accessible cultural festival website built with Next.js 15, TypeScript, and Tailwind CSS, based on the comprehensive SPEC.md design system.

## Features

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Design System** with CSS variables from SPEC.md
- **Component Library** with Container, Grid, Typography helpers
- **Responsive Design** mobile-first approach
- **Accessibility** WCAG 2.1 AA compliant components
- **SEO Optimized** with proper metadata

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## Project Structure

```
biennale-clone/
├── src/
│   ├── app/
│   │   ├── (site)/              # Site group with layout
│   │   │   ├── layout.tsx       # Header + Footer layout
│   │   │   └── page.tsx         # Homepage
│   │   └── layout.tsx           # Root layout
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx       # Site header with navigation
│   │   │   └── Footer.tsx       # Site footer
│   │   └── ui/
│   │       ├── Container.tsx    # Max-width container
│   │       ├── Grid.tsx         # Responsive grid
│   │       └── Typography.tsx   # Heading and text components
│   ├── lib/
│   │   ├── routes.ts            # Route definitions
│   │   └── nav.ts               # Navigation configuration
│   └── styles/
│       └── globals.css          # Global styles + CSS variables
├── public/                      # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## Design System

The project implements a comprehensive design system based on SPEC.md:

### CSS Variables

All design tokens are defined as CSS variables in `globals.css`:

- **Colors**: Primary, secondary, neutral palettes with 50-900 scales
- **Typography**: Font families, sizes, weights, line heights, letter spacing
- **Spacing**: 4px-based spacing scale (0-64)
- **Borders**: Radius values (sm to full)
- **Shadows**: Elevation system (xs to 2xl)
- **Transitions**: Durations and easing functions
- **Z-Index**: Layering scale

### Components

#### Layout Components

- `Container` - Responsive max-width container with padding
- `Grid` - Configurable responsive grid system

#### Typography Components

- `Heading1-6` - Semantic heading components
- `Text` - Body text with primary color
- `TextSecondary` - Secondary text color
- `TextSmall` - Smaller text size
- `Lead` - Large intro/lead text

#### Layout Components

- `Header` - Sticky header with navigation and language switcher
- `Footer` - Footer with links, newsletter, and copyright

## Navigation

Navigation is configured in `src/lib/nav.ts`:

- Main navigation items for header
- Footer sections with links
- Language options (EN/DE)

Routes are defined in `src/lib/routes.ts` following the SPEC.md structure.

## Styling Approach

The project uses a hybrid approach:

1. **CSS Variables** for design tokens
2. **Tailwind CSS** for utility classes
3. **Inline Styles** for token-based values (e.g., `color: var(--color-primary-600)`)

This ensures consistency with the design system while leveraging Tailwind's utilities.

## Accessibility

- Semantic HTML5 elements
- ARIA labels where needed
- Keyboard navigation support
- Focus indicators on interactive elements
- Responsive images with alt text
- Color contrast ratios meet WCAG AA standards

## Future Development

Based on SPEC.md, the following features are planned:

- [ ] Program listing page with filtering
- [ ] Event detail pages
- [ ] Venue pages with maps
- [ ] News/blog section
- [ ] Archive browser
- [ ] Search functionality
- [ ] Internationalization (i18n)
- [ ] CMS integration
- [ ] Performance optimizations

## License

MIT
