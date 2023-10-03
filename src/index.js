const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

const healthRouter = require('./routes/health-check');

app.get('/', (req, res) => {
	res.send('<a href="/health-check">Health<a>');
});

app.use('/health-check', healthRouter);

app.listen(PORT, () => {
	`Server is listening on ${PORT} port`;
});
