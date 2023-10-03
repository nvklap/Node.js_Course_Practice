const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.send('<a href="/health-check">Health<a>');
});

app.listen(PORT, () => {
	`Server is listening on ${PORT} port`;
});
