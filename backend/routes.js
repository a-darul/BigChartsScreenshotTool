const fs = require('fs');
const path = require('path');
const express = require('express');
const scrapeStocks = require('./scraper');

const router = express.Router();

router.get('/api/screenshots', (req, res) => {
	const screenshotsPath = path.join(__dirname, '../screenshots');
	fs.readdir(screenshotsPath, (err, files) => {
		if (err) return res.status(500).send('Failed to list screenshots');
		const images = files.filter(file => file.endsWith('.png'));
		res.json(images);
	});
});

router.post('/api/scrape', async (req, res) => {
	const { stocks } = req.body;
	if (!stocks || !stocks.length) {
		return res.status(400).json({ error: 'No stocks provided' });
	}

	scrapeStocks(stocks).then(results => {
		console.log('Scraping completed:', results);
	}).catch(err => {
		console.error('Scraping error:', err);
	});

	res.json(stocks.map(stock => ({ stock, status: 'Scraping in process' })));
});

module.exports = router;
