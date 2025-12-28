# Header Implementation Documentation

## Overview

The header implementation provides a complete navigation solution with:
- Sticky positioning with scroll effects
- Desktop navigation with dropdown menus
- Animated mobile menu with backdrop
- Language switcher
- Search button
- Active route highlighting
- Full accessibility support (WCAG 2.1 AA)

## Components

### 1. Header (`Header.tsx`)

Main header component with sticky behavior and responsive design.

**Features:**
- Sticky positioning that remains at top of viewport
- Scroll detection that changes background opacity/blur when scrolled
- Logo linking to homepage
- Desktop navigation (hidden on mobile)
- Search button (desktop only)
- Language switcher
- Mobile menu toggle button

**Behavior:**
- Background changes from `bg-white/80` to `bg-white/95` when scrolled > 20px
- Shadow appears when scrolled
- Border color intensifies on scroll
- Mobile menu closes automatically when route changes
- Body scroll locked when mobile menu is open

**Props:** None (self-contained)

**Usage:**
```tsx
import { Header } from '@/components/layout';

<Header />
```

---

### 2. MobileMenu (`MobileMenu.tsx`)

Full-screen slide-in mobile navigation with backdrop.

**Features:**
- Slides in from right with smooth animation
- Semi-transparent backdrop with blur effect
- Search field at top
- Expandable/collapsible submenu items
- Active route highlighting
- CTA button at bottom
- Keyboard accessible (ESC to close)

**Animations:**
- Backdrop: fade-in (300ms)
- Panel: slide-in from right (300ms)
- Submenu expand: fade-in (200ms)

**Props:**
```typescript
interface MobileMenuProps {
  isOpen: boolean;      // Controls menu visibility
  onClose: () => void;  // Callback when menu should close
}
```

**Usage:**
```tsx
<MobileMenu
  isOpen={mobileMenuOpen}
  onClose={() => setMobileMenuOpen(false)}
/>
```

---

### 3. LanguageSwitcher (`LanguageSwitcher.tsx`)

Dropdown language selector with globe icon.

**Features:**
- Button shows current language + globe icon
- Dropdown with all available languages
- Check mark next to active language
- Closes on click outside or ESC key
- Smooth dropdown animation

**State:**
- Manages current language selection
- Dropdown open/closed state
- Click outside detection

**Props:** None (self-contained)

**Usage:**
```tsx
import { LanguageSwitcher } from '@/components/layout';

<LanguageSwitcher />
```

**Note:** Currently logs language changes to console. Integration with i18n library needed for production.

---

### 4. NavDropdown (`NavDropdown.tsx`)

Desktop navigation dropdown for items with children.

**Features:**
- Hover to open (with 150ms delay on close)
- Click to toggle
- Active state highlighting
- Smooth animation
- Keyboard accessible (ESC to close)

**Props:**
```typescript
interface NavDropdownProps {
  label: string;        // Dropdown button text
  items: NavItem[];     // Array of child navigation items
  isActive: boolean;    // Whether parent route is active
}
```

**Usage:**
```tsx
<NavDropdown
  label="Info"
  items={[
    { label: 'Venues', href: '/info/venues' },
    { label: 'Tickets', href: '/info/tickets' },
  ]}
  isActive={pathname.startsWith('/info')}
/>
```

---

## Styling & Design Tokens

All components use CSS variables from the design system (`globals.css`):

**Colors:**
```css
--color-primary-600       /* Brand color for logo, active states */
--color-primary-50        /* Light background for active items */
--color-text-primary      /* Main text color */
--color-text-secondary    /* Secondary text color */
--color-background        /* Main background */
--color-border-light      /* Light borders */
--color-border-medium     /* Medium borders */
```

**Spacing:**
```css
--space-4, --space-6, --space-8  /* Consistent spacing */
```

**Z-Index:**
```css
--z-sticky: 1100          /* Header sticky layer */
--z-dropdown: 1000        /* Dropdown menus */
--z-modal-backdrop: 1300  /* Mobile menu backdrop */
--z-modal: 1400           /* Mobile menu panel */
```

**Shadows:**
```css
--shadow-sm, --shadow-lg  /* Elevation */
```

**Typography:**
```css
--font-weight-medium      /* 500 for nav items */
--font-weight-bold        /* 700 for logo */
```

---

## Responsive Behavior

### Breakpoints

- **Mobile:** < 1024px
  - Hamburger menu button visible
  - Desktop nav hidden
  - Search button hidden
  - Language switcher shows icon only

- **Desktop:** ≥ 1024px
  - Full navigation visible
  - Mobile menu button hidden
  - Search button visible
  - Language switcher shows text

### Mobile Menu

- Fixed position, full height
- Max width: 32rem (512px)
- Slides from right edge
- Backdrop covers entire viewport
- Prevents body scroll when open

---

## Accessibility Features

### ARIA Attributes

- `aria-label` on logo, search, menu buttons
- `aria-expanded` on dropdowns and mobile menu
- `aria-haspopup` on dropdown triggers
- `aria-controls` linking mobile button to menu
- `role="menu"` and `role="menuitem"` on dropdowns
- `role="dialog"` on mobile menu panel

### Keyboard Navigation

- **TAB:** Navigate through interactive elements
- **ENTER/SPACE:** Activate buttons and links
- **ESC:** Close dropdowns and mobile menu
- **Arrow Keys:** (Future) Navigate within dropdowns

### Focus Management

- Visible focus indicators on all interactive elements
- Focus trap in mobile menu (recommended)
- Logical tab order maintained

### Screen Reader Support

- Descriptive labels on icon-only buttons
- State announcements (expanded/collapsed)
- Decorative elements marked as `aria-hidden`

---

## Active Route Highlighting

Uses `usePathname()` from Next.js and `isRouteActive()` helper:

**Desktop Navigation:**
```tsx
const isActive = isRouteActive(pathname, item.href);
// Applies primary color + bottom border indicator
```

**Mobile Navigation:**
```tsx
const isActive = pathname === item.href;
// Applies primary color + background tint
```

**Visual Indicators:**
- Active text color changes to primary
- Bottom border appears (desktop)
- Background tint appears (mobile)
- Hover effects on inactive items

---

## Animations

### Header Scroll Effect
```css
transition: all 300ms ease-out
```
- Background opacity: 80% → 95%
- Backdrop blur: sm → md
- Shadow: none → sm
- Border color: light → medium

### Mobile Menu
```css
/* Backdrop */
animation: fadeIn 300ms ease-out

/* Panel */
animation: slideInRight 300ms ease-out
```

### Dropdowns
```css
animation: fadeInDown 200ms ease-out
```
- Fade in from 0 to 100% opacity
- Translate from -10px to 0

### Submenu Expand
```css
animation: fadeIn 200ms ease-out
```

---

## Integration with Navigation Config

Header components consume navigation data from `@/lib/nav.ts`:

```typescript
// Main navigation items
export const mainNavigation: NavItem[];

// Language options
export const languages: { code: string; label: string }[];
```

Routes are defined in `@/lib/routes.ts` with helper functions for dynamic segments.

---

## Performance Considerations

### Scroll Listener
- Uses `{ passive: true }` for better scroll performance
- Throttles unnecessary re-renders
- Cleanup on unmount

### Click Outside Detection
- Only active when dropdown/menu is open
- Removed when closed to prevent memory leaks

### Animations
- Hardware-accelerated (transform, opacity)
- No layout thrashing
- Smooth 60fps animations

---

## Future Enhancements

1. **Search Integration**
   - Modal search overlay
   - Keyboard shortcut (⌘K / Ctrl+K)
   - Search results with keyboard navigation

2. **i18n Integration**
   - Connect language switcher to next-intl or react-i18next
   - Persist language preference
   - Language-specific routes

3. **Mega Menu**
   - Rich dropdown with images/descriptions
   - Multi-column layouts for large menus

4. **Scroll Direction**
   - Hide header on scroll down
   - Show on scroll up
   - Always show at top

5. **Notifications Badge**
   - Unread count indicator
   - Dropdown with notifications

6. **User Menu**
   - Login/logout
   - Profile dropdown
   - Account settings

---

## Testing Checklist

### Desktop
- [ ] Sticky header stays at top when scrolling
- [ ] Scroll effects trigger at 20px
- [ ] Logo links to homepage
- [ ] All nav links work correctly
- [ ] Dropdowns open on hover/click
- [ ] Active route highlighted correctly
- [ ] Language switcher works
- [ ] Search button clickable (placeholder)

### Mobile
- [ ] Hamburger button opens menu
- [ ] Menu slides in smoothly
- [ ] Backdrop visible and clickable
- [ ] Body scroll locked when menu open
- [ ] Submenu items expand/collapse
- [ ] Active routes highlighted
- [ ] Menu closes on link click
- [ ] Menu closes on route change
- [ ] ESC key closes menu

### Accessibility
- [ ] All buttons have labels
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader announces states
- [ ] ARIA attributes correct
- [ ] Color contrast meets WCAG AA
- [ ] No keyboard traps

### Cross-Browser
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile Safari
- [ ] Chrome Android

---

## Known Limitations

1. **Language Switching:** Currently only updates UI state, doesn't change actual content
2. **Search:** Button is placeholder, no search functionality implemented
3. **Focus Trap:** Mobile menu doesn't trap focus (recommended for accessibility)
4. **Scroll Direction:** Header always visible, doesn't hide on scroll down
5. **Persistent State:** Language preference not persisted to localStorage/cookies

---

## Code Examples

### Adding a New Navigation Item

```typescript
// lib/nav.ts
export const mainNavigation: NavItem[] = [
  // ... existing items
  {
    label: 'Support',
    href: '/support',
    children: [
      { label: 'FAQ', href: '/support/faq' },
      { label: 'Contact', href: '/support/contact' },
    ],
  },
];
```

### Customizing Scroll Threshold

```typescript
// Header.tsx
const handleScroll = () => {
  setScrolled(window.scrollY > 50); // Change from 20 to 50
};
```

### Changing Animation Duration

```css
/* In component styles */
animation: slideInRight 500ms ease-out; /* Change from 300ms */
```

---

## Related Files

- `src/components/layout/Header.tsx` - Main header component
- `src/components/layout/MobileMenu.tsx` - Mobile navigation panel
- `src/components/layout/LanguageSwitcher.tsx` - Language dropdown
- `src/components/layout/NavDropdown.tsx` - Desktop dropdown menu
- `src/lib/nav.ts` - Navigation configuration
- `src/lib/routes.ts` - Route helpers
- `src/styles/globals.css` - Design tokens

---

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Chrome Android 90+

All features use standard CSS and JavaScript - no experimental features.
