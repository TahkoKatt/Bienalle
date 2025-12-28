/**
 * Navigation configuration for the Biennale website
 * Defines header and footer navigation items
 */

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface FooterSection {
  title: string;
  links: { label: string; href: string }[];
}

/**
 * Main navigation items for the header
 */
export const mainNavigation: NavItem[] = [
  {
    label: 'Programm',
    href: '/programm',
  },
  {
    label: 'Festival',
    href: '/festival',
    children: [
      { label: 'Overview', href: '/festival' },
      { label: 'History', href: '/festival/history' },
      { label: 'Team', href: '/festival/team' },
    ],
  },
  {
    label: 'Info',
    href: '/info',
    children: [
      { label: 'General Info', href: '/info' },
      { label: 'Venues', href: '/info/venues' },
      { label: 'Tickets', href: '/info/tickets' },
      { label: 'Press', href: '/info/press' },
    ],
  },
  {
    label: 'Archive',
    href: '/archive',
  },
  {
    label: 'News',
    href: '/news',
  },
];

/**
 * Footer navigation sections
 */
export const footerNavigation: FooterSection[] = [
  {
    title: 'Festival',
    links: [
      { label: 'Programm', href: '/programm' },
      { label: 'Festival Info', href: '/festival' },
      { label: 'Archive', href: '/archive' },
      { label: 'News', href: '/news' },
    ],
  },
  {
    title: 'Information',
    links: [
      { label: 'Venues', href: '/info/venues' },
      { label: 'Tickets', href: '/info/tickets' },
      { label: 'Press', href: '/info/press' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Follow',
    links: [
      { label: 'Facebook', href: '#' },
      { label: 'Instagram', href: '#' },
      { label: 'Twitter', href: '#' },
      { label: 'YouTube', href: '#' },
    ],
  },
];

/**
 * Language options
 */
export const languages = [
  { code: 'en', label: 'EN' },
  { code: 'de', label: 'DE' },
] as const;

export type Language = typeof languages[number]['code'];
