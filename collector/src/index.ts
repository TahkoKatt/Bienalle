import * as path from 'path';
import { Collector } from './collector';
import { readUrlsFromFile, log } from './utils';

async function main() {
  const urlsFile = process.argv[2] || './urls.txt';
  const urlsFilePath = path.resolve(urlsFile);

  log(`Starting Biennale Clone Kit Collector`);
  log(`Reading URLs from: ${urlsFilePath}`);

  try {
    // Read URLs from file
    const urls = readUrlsFromFile(urlsFilePath);

    if (urls.length === 0) {
      log('No URLs found in file', 'error');
      process.exit(1);
    }

    log(`Found ${urls.length} URL(s) to collect`);

    // Initialize collector
    const collector = new Collector('./reference');
    await collector.initialize();

    // Collect all URLs
    const results = await collector.collectUrls(urls);

    // Clean up
    await collector.close();

    // Print summary
    collector.printSummary(results);

    // Exit with appropriate code
    const hasFailures = results.some(r => !r.success);
    process.exit(hasFailures ? 1 : 0);
  } catch (error) {
    log(`Fatal error: ${error instanceof Error ? error.message : String(error)}`, 'error');
    process.exit(1);
  }
}

main();
