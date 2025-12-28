# Biennale Clone Kit

A web page collector tool built with Node.js and Playwright that captures screenshots, HTML content, and metadata from websites.

## Features

- 📸 Full-page screenshots (desktop 1440x900 and mobile 390x844)
- 📄 Rendered HTML content capture
- 🔗 Metadata extraction (title, URL, all links)
- 🤖 Respects robots.txt
- ⏱️ Rate limiting with configurable delays (2-3s minimum)
- 🔄 Automatic retry on failures (1 retry attempt)
- 📊 Detailed logging and summary reports

## Installation (macOS)

### Prerequisites

Ensure you have Node.js installed (v18 or higher recommended):

```bash
node --version
```

If you don't have Node.js, install it using Homebrew:

```bash
brew install node
```

### Setup

1. Clone or navigate to the repository:

```bash
cd biennale-clone-kit
```

2. Install dependencies:

```bash
npm install
```

3. Install Playwright browsers:

```bash
npx playwright install chromium
```

## Usage

### 1. Create your URLs file

Create a `urls.txt` file in the project root with one URL per line:

```txt
https://example.com
https://example.com/about
https://another-site.com
```

Lines starting with `#` are treated as comments and ignored.

### 2. Run the collector

```bash
npm run collect
```

Or specify a custom URLs file:

```bash
npm run build
node collector/dist/index.js path/to/your-urls.txt
```

### 3. Development mode

For faster iteration during development:

```bash
npm run dev
```

### 4. Build sitemap and routes

After collecting pages, generate a sitemap and route patterns:

```bash
npm run sitemap
```

This creates:
- `reference/sitemap.md` - Organized sitemap grouped by domain and path prefix
- `reference/routes.json` - Unique route patterns with dynamic segment detection

## Output Structure

The collector creates the following directory structure:

```
reference/
├── screens/
│   ├── desktop/
│   │   └── example-com.png
│   └── mobile/
│       └── example-com.png
├── html/
│   └── example-com.html
├── meta/
│   └── example-com.json
├── sitemap.md           # Generated sitemap (run npm run sitemap)
└── routes.json          # Generated route patterns (run npm run sitemap)
```

### Metadata JSON Format

Each collected page has a metadata file:

```json
{
  "title": "Example Domain",
  "url": "https://example.com",
  "allLinks": [
    "https://example.com/about",
    "https://example.com/contact"
  ]
}
```

### Sitemap Output (sitemap.md)

Groups all collected URLs by domain and path prefix:

```markdown
# Site Map

## example.com

### /
- [Example Domain](https://example.com)
  `/`

### /about
- [About Us](https://example.com/about)
  `/about`
```

### Routes Output (routes.json)

Analyzes URL patterns and identifies dynamic segments:

```json
[
  {
    "pattern": "example.com/users/:id",
    "examples": [
      "https://example.com/users/123",
      "https://example.com/users/456"
    ],
    "count": 2
  }
]
```

Dynamic segments detected:
- `:id` - Numeric IDs
- `:uuid` - UUID format (e.g., `550e8400-e29b-41d4-a716-446655440000`)
- `:hash` - Hash strings (32+ hex characters)

## Configuration

### Rate Limiting

The collector automatically:
- Checks robots.txt for each domain
- Respects crawl-delay directives
- Enforces a minimum 2-second delay between requests
- Uses default 2-3 second delays when robots.txt is unavailable

### Retry Logic

- Each URL is retried once on failure
- 3-second delay before retry attempts
- Failures are logged with error details

## Project Structure

```
biennale-clone-kit/
├── collector/
│   ├── src/
│   │   ├── index.ts          # Main entry point
│   │   ├── collector.ts      # Core collection logic
│   │   ├── build-sitemap.ts  # Sitemap and route generator
│   │   ├── robots.ts         # robots.txt handling
│   │   └── utils.ts          # Utility functions
│   └── dist/                 # Compiled JavaScript (generated)
├── reference/                # Output directory
│   ├── screens/
│   │   ├── desktop/
│   │   └── mobile/
│   ├── html/
│   ├── meta/
│   ├── sitemap.md            # Generated sitemap
│   └── routes.json           # Generated routes
├── urls.txt                  # Input URLs file
├── package.json
├── tsconfig.json
└── README.md
```

## Commands Reference

| Command | Description |
|---------|-------------|
| `npm install` | Install all dependencies |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run the compiled collector |
| `npm run collect` | Build and run (recommended) |
| `npm run dev` | Run in development mode with ts-node |
| `npm run sitemap` | Build sitemap.md and routes.json from metadata |
| `npm run sitemap:dev` | Run sitemap builder in development mode |

## Troubleshooting

### "URLs file not found"

Make sure `urls.txt` exists in the project root or specify the correct path:

```bash
node collector/dist/index.js ./path/to/urls.txt
```

### "Browser not found"

Install Playwright browsers:

```bash
npx playwright install chromium
```

### Network timeouts

The collector waits up to 30 seconds for pages to load. If you have slow connections, pages may timeout. These will be retried once automatically.

## License

MIT