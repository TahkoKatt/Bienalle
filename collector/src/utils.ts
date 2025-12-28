import * as fs from 'fs';
import * as path from 'path';

/**
 * Converts a URL to a filesystem-safe slug
 */
export function urlToSlug(url: string): string {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.replace(/^www\./, '');
    const pathname = urlObj.pathname.replace(/\/$/, '');

    let slug = hostname + pathname;

    // Replace special characters with hyphens
    slug = slug
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    // Limit length
    if (slug.length > 200) {
      slug = slug.substring(0, 200);
    }

    return slug || 'index';
  } catch (error) {
    // Fallback for invalid URLs
    return url
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 200) || 'index';
  }
}

/**
 * Ensures a directory exists, creating it if necessary
 */
export function ensureDir(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Delays execution for a specified number of milliseconds
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Reads URLs from a file (one URL per line)
 */
export function readUrlsFromFile(filePath: string): string[] {
  if (!fs.existsSync(filePath)) {
    throw new Error(`URLs file not found: ${filePath}`);
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  return content
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#'));
}

/**
 * Logs a message with timestamp
 */
export function log(message: string, level: 'info' | 'error' | 'success' = 'info'): void {
  const timestamp = new Date().toISOString();
  const prefix = level === 'error' ? '❌' : level === 'success' ? '✓' : 'ℹ';
  console.log(`[${timestamp}] ${prefix} ${message}`);
}
