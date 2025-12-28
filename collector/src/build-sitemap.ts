import * as fs from 'fs';
import * as path from 'path';
import { log } from './utils';

interface PageMetadata {
  title: string;
  url: string;
  allLinks: string[];
}

interface RoutePattern {
  pattern: string;
  examples: string[];
  count: number;
}

interface SiteGroup {
  domain: string;
  urls: Array<{
    url: string;
    title: string;
    path: string;
  }>;
}

/**
 * Reads all metadata JSON files from the reference/meta directory
 */
function readMetadataFiles(metaDir: string): PageMetadata[] {
  if (!fs.existsSync(metaDir)) {
    log(`Metadata directory not found: ${metaDir}`, 'error');
    return [];
  }

  const files = fs.readdirSync(metaDir).filter(f => f.endsWith('.json'));
  const metadata: PageMetadata[] = [];

  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(metaDir, file), 'utf-8');
      const data: PageMetadata = JSON.parse(content);
      metadata.push(data);
    } catch (error) {
      log(`Failed to read ${file}: ${error}`, 'error');
    }
  }

  return metadata;
}

/**
 * Groups URLs by domain and path prefix
 */
function groupUrlsByPrefix(metadata: PageMetadata[]): SiteGroup[] {
  const groups: { [domain: string]: SiteGroup } = {};

  for (const page of metadata) {
    try {
      const urlObj = new URL(page.url);
      const domain = urlObj.hostname.replace(/^www\./, '');

      if (!groups[domain]) {
        groups[domain] = {
          domain,
          urls: [],
        };
      }

      groups[domain].urls.push({
        url: page.url,
        title: page.title,
        path: urlObj.pathname,
      });
    } catch (error) {
      log(`Invalid URL: ${page.url}`, 'error');
    }
  }

  // Sort URLs within each group by path
  for (const domain in groups) {
    groups[domain].urls.sort((a, b) => a.path.localeCompare(b.path));
  }

  // Convert to array and sort by domain
  return Object.values(groups).sort((a, b) => a.domain.localeCompare(b.domain));
}

/**
 * Extracts route patterns from URLs
 * Attempts to identify dynamic segments (numeric IDs, UUIDs, etc.)
 */
function extractRoutePatterns(metadata: PageMetadata[]): RoutePattern[] {
  const patternMap: { [pattern: string]: { examples: Set<string>; count: number } } = {};

  for (const page of metadata) {
    try {
      const urlObj = new URL(page.url);
      const pathname = urlObj.pathname;

      // Convert path to pattern
      const pattern = pathname
        .split('/')
        .map(segment => {
          // Replace numeric segments with :id
          if (/^\d+$/.test(segment)) {
            return ':id';
          }
          // Replace UUID-like segments with :uuid
          if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(segment)) {
            return ':uuid';
          }
          // Replace hash-like segments with :hash
          if (/^[0-9a-f]{32,}$/i.test(segment)) {
            return ':hash';
          }
          // Keep the segment as-is
          return segment;
        })
        .join('/');

      const key = `${urlObj.hostname}${pattern}`;

      if (!patternMap[key]) {
        patternMap[key] = {
          examples: new Set(),
          count: 0,
        };
      }

      patternMap[key].examples.add(page.url);
      patternMap[key].count++;
    } catch (error) {
      log(`Invalid URL for pattern extraction: ${page.url}`, 'error');
    }
  }

  // Convert to array format
  const patterns: RoutePattern[] = [];
  for (const [pattern, data] of Object.entries(patternMap)) {
    patterns.push({
      pattern,
      examples: Array.from(data.examples).slice(0, 3), // Keep max 3 examples
      count: data.count,
    });
  }

  // Sort by count (descending) and then by pattern
  patterns.sort((a, b) => {
    if (b.count !== a.count) {
      return b.count - a.count;
    }
    return a.pattern.localeCompare(b.pattern);
  });

  return patterns;
}

/**
 * Generates a markdown sitemap
 */
function generateSitemap(groups: SiteGroup[]): string {
  let markdown = '# Site Map\n\n';
  markdown += `Generated: ${new Date().toISOString()}\n\n`;
  markdown += `Total URLs: ${groups.reduce((sum, g) => sum + g.urls.length, 0)}\n\n`;
  markdown += '---\n\n';

  for (const group of groups) {
    markdown += `## ${group.domain}\n\n`;
    markdown += `**${group.urls.length} page(s)**\n\n`;

    // Group by path prefix (first path segment)
    const pathGroups: { [prefix: string]: typeof group.urls } = {};

    for (const url of group.urls) {
      const segments = url.path.split('/').filter(s => s);
      const prefix = segments.length > 0 ? `/${segments[0]}` : '/';

      if (!pathGroups[prefix]) {
        pathGroups[prefix] = [];
      }
      pathGroups[prefix].push(url);
    }

    // Sort prefixes
    const sortedPrefixes = Object.keys(pathGroups).sort();

    for (const prefix of sortedPrefixes) {
      const urls = pathGroups[prefix];
      markdown += `### ${prefix}\n\n`;

      for (const url of urls) {
        markdown += `- [${url.title}](${url.url})\n`;
        markdown += `  \`${url.path}\`\n`;
      }

      markdown += '\n';
    }

    markdown += '---\n\n';
  }

  return markdown;
}

/**
 * Main execution
 */
async function main() {
  const metaDir = path.resolve('./reference/meta');
  const outputDir = path.resolve('./reference');

  log('Building sitemap from metadata files...');

  // Read all metadata
  const metadata = readMetadataFiles(metaDir);

  if (metadata.length === 0) {
    log('No metadata files found. Run the collector first.', 'error');
    process.exit(1);
  }

  log(`Found ${metadata.length} page(s)`);

  // Group URLs by prefix
  const groups = groupUrlsByPrefix(metadata);

  // Generate sitemap.md
  const sitemap = generateSitemap(groups);
  const sitemapPath = path.join(outputDir, 'sitemap.md');
  fs.writeFileSync(sitemapPath, sitemap, 'utf-8');
  log(`Sitemap generated: ${sitemapPath}`, 'success');

  // Extract route patterns
  const patterns = extractRoutePatterns(metadata);

  // Generate routes.json
  const routesPath = path.join(outputDir, 'routes.json');
  fs.writeFileSync(routesPath, JSON.stringify(patterns, null, 2), 'utf-8');
  log(`Routes generated: ${routesPath}`, 'success');

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('SITEMAP BUILD SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total pages: ${metadata.length}`);
  console.log(`Unique domains: ${groups.length}`);
  console.log(`Unique route patterns: ${patterns.length}`);
  console.log('='.repeat(60) + '\n');
}

main();
