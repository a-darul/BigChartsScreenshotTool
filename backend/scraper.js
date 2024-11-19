const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function scrapeStocks(stocks) {
	const browser = await chromium.launch({ headless: false });
	const page = await browser.newPage();
	const url = `https://bigcharts.marketwatch.com/advchart/frames/frames.asp?symb=ID%3AAALI&insttype=&time=8&freq=1`

	await page.goto(url);

	await page.waitForSelector('.indicators');

	// Indicators: EMA (20, 50, 200), Volume+, MACD
	await page.click('text=indicators');
	await page.selectOption('#ma', 'EMA (3-line)');
	await page.fill('#maval', '20,50,200');
	await page.selectOption('#lf', 'Volume+');
	await page.selectOption('#lf2', 'MACD');

	// Chart Style: Candlestick, Big
	await page.click('text=chart style');
	await page.selectOption('#type', 'Candlestick');
	await page.selectOption('#size', 'Big');

	// Apply settings
	await page.click('#storesettings');

	const results = [];

	// Loop through stock symbols
	for (const stock of stocks) {
		try {
			console.log(`Processing stock: ${stock}`);
			// Input the stock symbol
			await page.fill('#symb', `ID:${stock}`);
			await page.click('.drawchart');

			// Wait for the chart to render
			await page.waitForSelector('td.padded.vatop img', { timeout: 10000 });
			const chartImg = await page.$('td.padded.vatop img');

			// Extract the `src` attribute of the image
			const chartSrc = await chartImg.getAttribute('src');

			// Download the image and save it locally
			const screenshotPath = path.join(__dirname, '../screenshots', `${stock}.png`);
			const response = await page.request.get(chartSrc);
			const buffer = await response.body();
			fs.writeFileSync(screenshotPath, buffer);

			console.log(`Saved screenshot for stock: ${stock}`);
			results.push({ name: stock, imageUrl: `/screenshots/${stock}.png`, status: 'Success' });
		} catch (error) {
			console.error(`Error scraping stock: ${stock}`, error);
			results.push({ name: stock, status: 'Error', error: error.message });
		}
	}

	await browser.close();
	return results;
}


module.exports = scrapeStocks;
