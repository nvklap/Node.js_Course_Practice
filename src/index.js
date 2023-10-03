const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Epam Node js Course',
			version: '1.0.0',
		},
		servers: [
			{ url: 'http://localhost:3000', description: 'Development server' },
		],
	},
	apis: ['./src/routes/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);

const app = express();
const PORT = process.env.PORT || 3000;

const healthRouter = require('./routes/health-check');

app.get('/', (req, res) => {
	res.send('<a href="/health-check">Health<a>');
});

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use('/health-check', healthRouter);

app.listen(PORT, () => {
	`Server is listening on ${PORT} port`;
});
