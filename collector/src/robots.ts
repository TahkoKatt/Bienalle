import robotsParser from 'robots-parser';

interface RobotsCache {
  [origin: string]: any;
}

const robotsCache: RobotsCache = {};

/**
 * Fetches and parses robots.txt for a given URL
 */
export async function getRobotsParser(url: string): Promise<any> {
  try {
    const urlObj = new URL(url);
    const origin = `${urlObj.protocol}//${urlObj.hostname}`;
    const robotsUrl = `${origin}/robots.txt`;

    // Check cache first
    if (robotsCache[origin]) {
      return robotsCache[origin];
    }

    // Fetch robots.txt
    const response = await fetch(robotsUrl);
    const robotsTxt = response.ok ? await response.text() : '';

    // Parse robots.txt
    const parser = robotsParser(robotsUrl, robotsTxt);
    robotsCache[origin] = parser;

    return parser;
  } catch (error) {
    // If robots.txt fails to load, allow all
    return robotsParser('', '');
  }
}

/**
 * Checks if a URL is allowed to be crawled according to robots.txt
 */
export async function isAllowedByRobots(url: string, userAgent = 'BiennaleCloneBot'): Promise<boolean> {
  try {
    const parser = await getRobotsParser(url);
    return parser.isAllowed(url, userAgent) ?? true;
  } catch (error) {
    // Default to allowing if check fails
    return true;
  }
}

/**
 * Gets the crawl delay from robots.txt (in seconds)
 */
export async function getCrawlDelay(url: string, userAgent = 'BiennaleCloneBot'): Promise<number> {
  try {
    const parser = await getRobotsParser(url);
    const delay = parser.getCrawlDelay(userAgent);
    return delay ?? 2; // Default to 2 seconds
  } catch (error) {
    return 2; // Default to 2 seconds
  }
}
