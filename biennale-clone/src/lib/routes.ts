/**
 * Route definitions for the Biennale website
 * Based on SPEC.md route structure
 */

export const routes = {
  home: '/',

  // Program routes
  program: {
    index: '/programm',
    event: (slug: string) => `/programm/${slug}`,
  },

  // Festival routes
  festival: {
    index: '/festival',
    history: '/festival/history',
    team: '/festival/team',
  },

  // Info routes
  info: {
    index: '/info',
    venues: {
      index: '/info/venues',
      detail: (slug: string) => `/info/venues/${slug}`,
    },
    tickets: '/info/tickets',
    press: '/info/press',
  },

  // Archive routes
  archive: {
    index: '/archive',
    year: (year: number | string) => `/archive/${year}`,
    production: (year: number | string, slug: string) => `/archive/${year}/${slug}`,
  },

  // News routes
  news: {
    index: '/news',
    article: (slug: string) => `/news/${slug}`,
  },

  // Contact
  contact: '/contact',
} as const;

/**
 * Helper to get the current route path
 */
export function getCurrentRoute(pathname: string): string {
  return pathname;
}

/**
 * Helper to check if a route is active
 */
export function isRouteActive(pathname: string, routePath: string): boolean {
  if (routePath === '/') {
    return pathname === '/';
  }
  return pathname.startsWith(routePath);
}
