const express = require('express');
const routes = require('./routes');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/screenshots', express.static(path.join(__dirname, '../screenshots')));
app.use(routes);

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
