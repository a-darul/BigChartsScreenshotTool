# BigChartsScreenshotTool

A tool to scrape and capture stock charts from [MarketWatch BigCharts](https://bigcharts.marketwatch.com/). 

## Features
- Input stock symbols to scrape.
- Automated screenshot generation with Playwright.
- Lightweight frontend built with Alpine.js and Pico.css.
- Screenshots stored in the repository or on external storage (Imgur API optional).

## How to Use
1. Clone this repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install dependencies:
   ```bash
   node backend/server.js
   ```
4. Access the frontend at `http://localhost:3000`.

## GitHub Actions
- Trigger scraping directly via GitHub Actions.
- Screenshots will be stored in the repository under `screenshots/`.

## Future Plans
- Add Imgur API integration for external screenshot storage.
