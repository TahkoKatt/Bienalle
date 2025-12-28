import { chromium, Browser, Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';
import { urlToSlug, ensureDir, delay, log } from './utils';
import { isAllowedByRobots, getCrawlDelay } from './robots';

export interface CollectionResult {
  url: string;
  slug: string;
  success: boolean;
  error?: string;
}

export interface PageMetadata {
  title: string;
  url: string;
  allLinks: string[];
}

export class Collector {
  private browser: Browser | null = null;
  private readonly desktopViewport = { width: 1440, height: 900 };
  private readonly mobileViewport = { width: 390, height: 844 };
  private readonly referenceDir: string;

  constructor(referenceDir = './reference') {
    this.referenceDir = referenceDir;
    this.ensureDirectories();
  }

  private ensureDirectories(): void {
    ensureDir(path.join(this.referenceDir, 'screens', 'desktop'));
    ensureDir(path.join(this.referenceDir, 'screens', 'mobile'));
    ensureDir(path.join(this.referenceDir, 'html'));
    ensureDir(path.join(this.referenceDir, 'meta'));
  }

  async initialize(): Promise<void> {
    log('Launching browser...');
    this.browser = await chromium.launch({
      headless: true,
    });
  }

  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  private async collectPage(url: string, retryCount = 0): Promise<CollectionResult> {
    const slug = urlToSlug(url);
    const maxRetries = 1;

    try {
      // Check robots.txt
      const allowed = await isAllowedByRobots(url);
      if (!allowed) {
        log(`Blocked by robots.txt: ${url}`, 'error');
        return { url, slug, success: false, error: 'Blocked by robots.txt' };
      }

      // Get crawl delay
      const crawlDelay = await getCrawlDelay(url);
      const delayMs = Math.max(crawlDelay * 1000, 2000); // Minimum 2 seconds

      if (!this.browser) {
        throw new Error('Browser not initialized');
      }

      const context = await this.browser.newContext();
      const page = await context.newPage();

      try {
        // Navigate to the page
        log(`Collecting: ${url}`);
        await page.goto(url, {
          waitUntil: 'networkidle',
          timeout: 30000,
        });

        // Wait a bit for any lazy-loaded content
        await delay(1000);

        // Collect desktop screenshot
        await page.setViewportSize(this.desktopViewport);
        await delay(500);
        const desktopPath = path.join(
          this.referenceDir,
          'screens',
          'desktop',
          `${slug}.png`
        );
        await page.screenshot({
          path: desktopPath,
          fullPage: true,
        });
        log(`  → Desktop screenshot saved: ${desktopPath}`);

        // Collect mobile screenshot
        await page.setViewportSize(this.mobileViewport);
        await delay(500);
        const mobilePath = path.join(
          this.referenceDir,
          'screens',
          'mobile',
          `${slug}.png`
        );
        await page.screenshot({
          path: mobilePath,
          fullPage: true,
        });
        log(`  → Mobile screenshot saved: ${mobilePath}`);

        // Collect HTML
        const html = await page.content();
        const htmlPath = path.join(this.referenceDir, 'html', `${slug}.html`);
        fs.writeFileSync(htmlPath, html, 'utf-8');
        log(`  → HTML saved: ${htmlPath}`);

        // Collect metadata
        const metadata = await this.extractMetadata(page, url);
        const metaPath = path.join(this.referenceDir, 'meta', `${slug}.json`);
        fs.writeFileSync(metaPath, JSON.stringify(metadata, null, 2), 'utf-8');
        log(`  → Metadata saved: ${metaPath}`);

        await context.close();

        // Respect crawl delay
        log(`  → Waiting ${delayMs}ms before next request...`);
        await delay(delayMs);

        log(`Successfully collected: ${url}`, 'success');
        return { url, slug, success: true };
      } catch (error) {
        await context.close();
        throw error;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      log(`Failed to collect ${url}: ${errorMessage}`, 'error');

      // Retry once if this is the first attempt
      if (retryCount < maxRetries) {
        log(`  → Retrying (${retryCount + 1}/${maxRetries})...`);
        await delay(3000);
        return this.collectPage(url, retryCount + 1);
      }

      return {
        url,
        slug,
        success: false,
        error: errorMessage,
      };
    }
  }

  private async extractMetadata(page: Page, url: string): Promise<PageMetadata> {
    const title = await page.title();

    // Extract all links
    const allLinks = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a[href]'));
      return links
        .map(link => (link as HTMLAnchorElement).href)
        .filter(href => href && href.startsWith('http'));
    });

    // Remove duplicates
    const uniqueLinks = Array.from(new Set(allLinks));

    return {
      title,
      url,
      allLinks: uniqueLinks,
    };
  }

  async collectUrls(urls: string[]): Promise<CollectionResult[]> {
    const results: CollectionResult[] = [];

    for (const url of urls) {
      const result = await this.collectPage(url);
      results.push(result);
    }

    return results;
  }

  printSummary(results: CollectionResult[]): void {
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    console.log('\n' + '='.repeat(60));
    console.log('COLLECTION SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total URLs: ${results.length}`);
    console.log(`Successful: ${successful}`);
    console.log(`Failed: ${failed}`);

    if (failed > 0) {
      console.log('\nFailed URLs:');
      results
        .filter(r => !r.success)
        .forEach(r => {
          console.log(`  - ${r.url}`);
          console.log(`    Error: ${r.error}`);
        });
    }

    console.log('='.repeat(60) + '\n');
  }
}
