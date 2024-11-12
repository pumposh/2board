---
name: 2Board
slug: 2board
description: API-ify any data with 2Board, a source for interval based data collection and analysis.
framework: Nuxt
css: SCSS
database: Firebase Data Connect
---

# 2Board

🚧 Under Construction 🚧

## Setup

Make sure to install the dependencies:

```bash
bun i
# Globally install puppeteer browsers needed for local development -> installs to ~/.cache/puppeteer/browsers/...
npx puppeteer browsers install chrome
```

## Development Server

Start the development server on `http://localhost:4000`

```bash
bun dev
```

## Production

Build the application for production:

```bash
bun build
```

Locally preview production build:

```bash
bun preview
```

Add this in your env for local path

```bash
LOCAL_EXECUTABLE_PATH="/Users/big-chungus/.cache/puppeteer/chrome/mac_arm-130.0.6723.69/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing"
```
